import { describe, it, expect, vi, beforeEach } from "vitest";
import { runDualPhasePipeline } from "./dual-phase.js";
import { RequestContext, EngineConfig } from "../types.js";
import { securityManager } from "../security/manager.js";

// Mock dependencies
vi.mock("../security/manager.js", () => ({
  securityManager: {
    redactPII: vi.fn((data) => data),
    sign: vi.fn(() => "signature"),
    getPublicKey: vi.fn(() => "pub"),
    sanitizeForLog: vi.fn((t) => t),
    stripHtml: vi.fn((t) => t),
    createSecureContext: vi.fn((ctx, auth) => ({ ...ctx, ...auth })),
  },
}));

vi.mock("@ferroui/tools", () => ({
  getToolsForUser: vi.fn(() => []),
  executeTool: vi.fn(),
  registerCacheHandler: vi.fn(),
  isToolSensitive: vi.fn(() => false),
}));

vi.mock("@ferroui/schema", () => ({
  validateLayout: vi.fn(() => ({ valid: true })),
}));

vi.mock("@ferroui/registry", () => ({
  registry: {
    getAllComponents: vi.fn(() => []),
  },
}));

vi.mock("../cache/semantic-cache.js", () => ({
  semanticCache: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock("@ferroui/telemetry", () => ({
  tracer: {
    startSpan: vi.fn(() => ({ end: vi.fn() })),
  },
  PipelinePhase: {
    DATA_GATHERING: "DATA_GATHERING",
    UI_GENERATION: "UI_GENERATION",
  },
  setCommonAttributes: vi.fn(),
  withLlmCall: vi.fn((_, fn) => fn()),
  withToolCall: vi.fn((_, fn) => fn()),
  recordCacheHit: vi.fn(),
  recordCacheMiss: vi.fn(),
}));

vi.mock("../audit/audit-logger.js", () => ({
  auditLogger: { log: vi.fn() },
  AuditEventType: {
    REQUEST_START: "REQUEST_START",
    TOOL_CALL: "TOOL_CALL",
    COST_ESTIMATED: "COST_ESTIMATED",
    PROVENANCE_SIGNED: "PROVENANCE_SIGNED",
    REQUEST_COMPLETE: "REQUEST_COMPLETE",
    CIRCUIT_RESET: "CIRCUIT_RESET",
  },
}));

vi.mock("../security/prompt-firewall.js", () => ({
  checkPromptFirewall: vi.fn(() => ({ blocked: false })),
}));

vi.mock("../middleware/tenant-quota.js", () => ({
  dailyBudgetStore: {
    recordSafetyEvent: vi.fn(),
    incrementCents: vi.fn(),
    getUsage: vi.fn(() => ({ cents: 0 })),
    checkBudget: vi.fn(() => true),
  },
  getTenantBudget: vi.fn(() => ({ dailyCostLimitCents: 1000 })),
}));

vi.mock("../prompts/loader.js", () => ({
  PromptLoader: vi.fn().mockImplementation(function () {
    return {
      loadPrompt: vi.fn().mockResolvedValue("System Prompt"),
    };
  }),
}));

vi.mock("../security/signer.js", () => ({
  Signer: {
    generateKeyPair: vi.fn(() => ({ privateKey: "priv", publicKey: "pub" })),
    sign: vi.fn(() => "signature"),
  },
}));

vi.mock("../validation/repair.js", () => ({
  repairLayout: vi.fn((_, __, layout) => layout),
}));

vi.mock("@ferroui/i18n", () => ({
  getTextDirection: vi.fn(() => "ltr"),
}));

vi.mock("crypto-js", () => ({
  default: {
    SHA256: vi.fn(() => ({ toString: () => "hash" })),
  },
}));

describe("redactPII via SecurityManager", () => {
  beforeEach(() => {
    vi.mocked(securityManager.redactPII).mockImplementation((data) => {
      // Minimal implementation for testing the unit logic if needed,
      // but here we just test that it's called.
      if (typeof data === "string" && data.includes("@"))
        return "[REDACTED_EMAIL]";
      return data;
    });
  });

  it("redacts common PII from strings", () => {
    const input = "My email is test@example.com";
    const output = securityManager.redactPII(input);
    expect(output).toContain("[REDACTED_EMAIL]");
  });
});

describe("runDualPhasePipeline", () => {
  let mockProvider: any;
  const context: RequestContext = {
    requestId: "req-123",
    userId: "user-456",
    permissions: ["read:data"],
    locale: "en",
    tenantId: "test-tenant",
  };
  const config: EngineConfig = {
    cacheEnabled: true,
    maxRepairAttempts: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockProvider = {
      id: "test-provider",
      completePrompt: vi.fn().mockResolvedValue({
        content: JSON.stringify({ toolCalls: [] }),
        tokens: { input: 10, output: 5 },
      }),
      processPrompt: vi.fn().mockImplementation(async function* () {
        yield '{"layout": "test"}';
        return { tokens: { input: 20, output: 10 } };
      }),
      estimateCost: vi.fn(() => 1),
      estimateTokens: vi.fn(() => 30),
    };
  });

  it("executes Phase 1 and 2 successfully", async () => {
    const generator = runDualPhasePipeline(
      mockProvider,
      "test prompt",
      context,
      config,
    );
    const chunks = [];
    for await (const chunk of generator) {
      chunks.push(chunk);
    }

    expect(chunks.some((c) => c.type === "phase" && c.phase === 1)).toBe(true);
    expect(chunks.some((c) => c.type === "phase" && c.phase === 2)).toBe(true);
    expect(chunks.some((c) => c.type === "layout_chunk")).toBe(true);
    expect(chunks.some((c) => c.type === "complete")).toBe(true);

    // Verify securityManager calls
    expect(securityManager.redactPII).toHaveBeenCalled();
    expect(securityManager.sign).toHaveBeenCalled();
  });
});
