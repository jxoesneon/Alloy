/**
 * FerroUI Per-Tenant Quota Middleware — D1
 *
 * Enforces per-tenant request quotas from environment config or a quota registry.
 * Quota state is stored in Redis when available, in-memory otherwise.
 *
 * Env configuration:
 *   TENANT_QUOTA_DEFAULT_RPM=60     — default per-tenant requests per minute
 *   TENANT_QUOTA_<TENANTID>_RPM=N   — override for a specific tenant ID
 *
 * The tenantId is read from the validated request body context.tenantId
 * (falls back to "default" for backward compat).
 */

import type { Request, Response, NextFunction } from "express";
import { securityManager } from "../security/manager.js";

export interface TenantBudget {
  dailyCostLimitCents: number;
  maxSafetyEventsPerDay: number;
}

export const PROVIDER_PRICING: Record<
  string,
  { input: number; output: number }
> = {
  anthropic: { input: 0.003, output: 0.015 }, // per 1K tokens
  openai: { input: 0.005, output: 0.015 },
  google: { input: 0.0035, output: 0.0105 },
  ollama: { input: 0, output: 0 },
  "llama-cpp": { input: 0, output: 0 },
};

interface QuotaBucket {
  count: number;
  windowStart: number;
}

interface BudgetUsage {
  cents: number;
  safetyEvents: number;
  lastReset: number;
}

// TTL-aware in-memory storage to prevent leaks (Efficiency Fix)
const inMemoryBuckets = new Map<string, QuotaBucket>();
const inMemoryUsage = new Map<string, BudgetUsage>();

// Optional Redis client for horizontal scaling
let _redisClient: any = undefined;

export function setQuotaRedisClient(client: any): void {
  _redisClient = client;
}

/**
 * DailyBudgetStore tracks per-tenant cost (in cents) and safety events.
 * Reset is triggered when a request comes in on a new calendar day.
 */
export class DailyBudgetStore {
  async getUsage(tenantId: string): Promise<BudgetUsage> {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const redisKey = `ferroui:budget:${tenantId}:${startOfDay}`;

    if (_redisClient) {
      const cached = await _redisClient.get(redisKey);
      if (cached) return JSON.parse(cached);
    }

    let current = inMemoryUsage.get(tenantId);
    if (!current || current.lastReset < startOfDay) {
      current = { cents: 0, safetyEvents: 0, lastReset: Date.now() };
      inMemoryUsage.set(tenantId, current);
    }
    return current;
  }

  async incrementCents(tenantId: string, cents: number): Promise<void> {
    const usage = await this.getUsage(tenantId);
    usage.cents += cents;
    await this.saveUsage(tenantId, usage);
  }

  async checkBudget(
    tenantId: string,
    estimatedCents: number,
  ): Promise<boolean> {
    const budget = getTenantBudget(tenantId);
    const usage = await this.getUsage(tenantId);
    return usage.cents + estimatedCents <= budget.dailyCostLimitCents;
  }

  async recordSafetyEvent(tenantId: string): Promise<void> {
    const usage = await this.getUsage(tenantId);
    usage.safetyEvents += 1;
    await this.saveUsage(tenantId, usage);

    const budget = getTenantBudget(tenantId);
    if (usage.safetyEvents >= budget.maxSafetyEventsPerDay) {
      console.error(
        "[Safety] Daily safety event limit exceeded for tenant %s.",
        securityManager.sanitizeForLog(tenantId),
      );
    }
  }

  async isSafetyBlocked(tenantId: string): Promise<boolean> {
    const budget = getTenantBudget(tenantId);
    const usage = await this.getUsage(tenantId);
    return usage.safetyEvents >= budget.maxSafetyEventsPerDay;
  }

  private async saveUsage(tenantId: string, usage: BudgetUsage): Promise<void> {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const redisKey = `ferroui:budget:${tenantId}:${startOfDay}`;

    if (_redisClient) {
      // TTL: 2 days (to allow for timezone overlaps)
      await _redisClient.set(redisKey, JSON.stringify(usage), "EX", 172800);
    } else {
      inMemoryUsage.set(tenantId, usage);
      // Periodic cleanup of in-memory maps
      if (inMemoryUsage.size > 1000) {
        const now = Date.now();
        for (const [key, val] of inMemoryUsage.entries()) {
          if (now - val.lastReset > 86400000) inMemoryUsage.delete(key);
        }
      }
    }
  }

  resetAll(): void {
    inMemoryUsage.clear();
  }
}

export const dailyBudgetStore = new DailyBudgetStore();

function getTenantRpm(tenantId: string): number {
  const override = process.env[`TENANT_QUOTA_${tenantId.toUpperCase()}_RPM`];
  if (override) return parseInt(override, 10);
  return parseInt(process.env.TENANT_QUOTA_DEFAULT_RPM ?? "60", 10);
}

export function getTenantBudget(tenantId: string): TenantBudget {
  const costLimit =
    process.env[`TENANT_BUDGET_${tenantId.toUpperCase()}_DAILY_COST_CENTS`];
  const safetyLimit =
    process.env[`TENANT_BUDGET_${tenantId.toUpperCase()}_MAX_SAFETY_EVENTS`];

  return {
    dailyCostLimitCents: costLimit
      ? parseInt(costLimit, 10)
      : parseInt(
          process.env.TENANT_BUDGET_DEFAULT_DAILY_COST_CENTS ?? "1000",
          10,
        ),
    maxSafetyEventsPerDay: safetyLimit
      ? parseInt(safetyLimit, 10)
      : parseInt(
          process.env.TENANT_BUDGET_DEFAULT_MAX_SAFETY_EVENTS ?? "5",
          10,
        ),
  };
}

async function checkRpm(tenantId: string, rpm: number): Promise<boolean> {
  const now = Date.now();
  const windowMs = 60_000;

  if (_redisClient) {
    const redisKey = `ferroui:rpm:${tenantId}:${Math.floor(now / windowMs)}`;
    const count = await _redisClient.incr(redisKey);
    if (count === 1) {
      await _redisClient.expire(redisKey, 65); // Just over 1 min
    }
    return count <= rpm;
  }

  const existing = inMemoryBuckets.get(tenantId);
  if (!existing || now - existing.windowStart >= windowMs) {
    inMemoryBuckets.set(tenantId, { count: 1, windowStart: now });
    return true;
  }

  if (existing.count >= rpm) return false;

  existing.count++;
  return true;
}

/**
 * Express middleware that enforces per-tenant request quotas and budgets.
 * Must be placed after JSON body parsing so `req.body.context.tenantId` is available.
 * Skips quota enforcement on non-API paths.
 */
export async function tenantQuotaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.path.startsWith("/api/")) {
    next();
    return;
  }

  const auth = (req as any).auth;
  const tenantId: string =
    auth?.tenantId ??
    (req.body?.context?.tenantId as string | undefined) ??
    "default";

  // 1. Check Daily Cost Budget
  const budget = getTenantBudget(tenantId);
  const usage = await dailyBudgetStore.getUsage(tenantId);

  if (usage.cents >= budget.dailyCostLimitCents) {
    res.status(402).json({
      error: "Daily cost budget exceeded",
      tenantId,
      limit: budget.dailyCostLimitCents,
      current: usage.cents,
    });
    return;
  }

  // 2. Check Daily Safety Event Limit
  if (await dailyBudgetStore.isSafetyBlocked(tenantId)) {
    console.warn(
      "[Metric] ferroui.safety.budget_exceeded tenant=%s",
      securityManager.sanitizeForLog(tenantId),
    );
    res.status(429).json({
      error: "Daily safety event limit exceeded",
      tenantId,
      limit: budget.maxSafetyEventsPerDay,
    });
    return;
  }

  // 3. Check Request Rate (RPM)
  const rpm = getTenantRpm(tenantId);
  const allowed = await checkRpm(tenantId, rpm);

  if (!allowed) {
    res.status(429).json({
      error: "Tenant quota exceeded",
      tenantId,
      retryAfter: 60,
    });
    return;
  }

  res.setHeader("X-Tenant-Id", tenantId);
  res.setHeader("X-Tenant-Quota-Limit", rpm);
  res.setHeader("X-Tenant-Daily-Budget-Limit", budget.dailyCostLimitCents);
  res.setHeader("X-Tenant-Daily-Budget-Usage", usage.cents);
  next();
}
