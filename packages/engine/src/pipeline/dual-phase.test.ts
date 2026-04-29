import { describe, it, expect, vi, beforeEach } from "vitest";
import { redactPII, runDualPhasePipeline } from "./dual-phase.js";
import { RequestContext, EngineConfig } from "../types.js";

// Mock dependencies
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

describe("redactPII", () => {
  it("redacts common PII from strings", () => {
    // Phone regex in implementation is \d{3}-\d{3}-\d{4} (10 digits)
    const input =
      "My email is test@example.com and phone is 555-555-0199. SSN: 123-45-6789.";
    const output = redactPII(input);
    expect(output).toContain("[REDACTED_EMAIL]");
    expect(output).toContain("[REDACTED_PHONE]");
    expect(output).toContain("[REDACTED_SSN]");
  });

  it("redacts PII from nested objects and arrays", () => {
    const input = {
      user: {
        email: "secret@hidden.com",
        other: "info",
      },
      tags: ["data", "admin@ferroui.com"],
    };
    const output = redactPII(input);
    expect(output.user.email).toBe("[REDACTED_SENSITIVE_KEY]");
    expect(output.tags[1]).toBe("[REDACTED_EMAIL]");
  });

  it("handles stringified JSON recursively", () => {
    const inner = JSON.stringify({ email: "test@test.com" });
    const output = redactPII(inner);
    expect(output).toContain("[REDACTED_SENSITIVE_KEY]");
  });

  it("skips non-plain objects", () => {
    const date = new Date();
    expect(redactPII(date)).toBe(date);

    const error = new Error("test");
    expect(redactPII(error)).toBe(error);
  });

  it("handles null and undefined", () => {
    expect(redactPII(null)).toBeNull();
    expect(redactPII(undefined)).toBeUndefined();
  });
});

describe("runDualPhasePipeline", () => {
  let mockProvider: any;
  const context: RequestContext = {
    requestId: "req-123",
    userId: "user-456",
    permissions: ["read:data"],
    locale: "en",
  };
  const config: EngineConfig = {
    cacheEnabled: true,
    maxRepairAttempts: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockProvider = {
      id: "mock-llm",
      completePrompt: vi.fn().mockResolvedValue({
        content: JSON.stringify({ toolCalls: [] }),
        tokens: { input: 10, output: 20 },
      }),
      processPrompt: vi.fn().mockImplementation(async function* () {
        yield '{"type": "Dashboard", "children": []}';
        return { tokens: { input: 50, output: 100 } };
      }),
      estimateCost: vi.fn(() => 1),
      estimateTokens: vi.fn(() => 50),
    };
  });

  it("executes a basic successful pipeline", async () => {
    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(chunks.some((c) => c.type === "phase" && c.phase === 1)).toBe(true);
    expect(chunks.some((c) => c.type === "phase" && c.phase === 2)).toBe(true);
    expect(chunks.some((c) => c.type === "layout_chunk")).toBe(true);
    expect(chunks.some((c) => c.type === "complete")).toBe(true);
  });

  it("blocks suspicious prompts via firewall", async () => {
    const { checkPromptFirewall } =
      await import("../security/prompt-firewall.js");
    (checkPromptFirewall as any).mockResolvedValueOnce({
      blocked: true,
      reason: "Injection",
      provider: "Lakera",
    });

    const gen = runDualPhasePipeline(
      mockProvider,
      "DROP TABLE users",
      context,
      config,
    );
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(
      chunks.some(
        (c) => c.type === "error" && c.error?.code === "PROMPT_INJECTION",
      ),
    ).toBe(true);
  });

  it("handles tool calls and redaction", async () => {
    mockProvider.completePrompt.mockResolvedValueOnce({
      content: JSON.stringify({
        toolCalls: [{ name: "get_weather", args: { city: "London" } }],
      }),
      tokens: { input: 10, output: 20 },
    });

    const { executeTool } = await import("@ferroui/tools");
    (executeTool as any).mockResolvedValueOnce({
      temp: 20,
      secret: "pii@pii.com",
    });

    const gen = runDualPhasePipeline(
      mockProvider,
      "What is the weather?",
      context,
      config,
    );
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(chunks.some((c) => c.type === "tool_call")).toBe(true);
    expect(chunks.some((c) => c.type === "tool_output")).toBe(true);
  });

  it("serves from cache if available", async () => {
    const { semanticCache } = await import("../cache/semantic-cache.js");
    (semanticCache.get as any).mockResolvedValueOnce({ type: "CachedLayout" });

    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(
      chunks.some(
        (c) =>
          c.type === "layout_chunk" &&
          (c as any).layout?.type === "CachedLayout",
      ),
    ).toBe(true);
    expect(mockProvider.processPrompt).not.toHaveBeenCalled();
  });

  it("truncates tool calls when budget exceeded", async () => {
    const manyTools = Array(10).fill({ name: "tool", args: {} });
    mockProvider.completePrompt.mockResolvedValueOnce({
      content: JSON.stringify({ toolCalls: manyTools }),
      tokens: { input: 10, output: 20 },
    });

    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(
      chunks.some(
        (c) => c.type === "error" && c.error?.code === "TOOL_BUDGET_EXCEEDED",
      ),
    ).toBe(true);
  });

  it("detects sensitive tool data and bypasses cache", async () => {
    mockProvider.completePrompt.mockResolvedValueOnce({
      content: JSON.stringify({
        toolCalls: [{ name: "get_secret", args: {} }],
      }),
      tokens: { input: 10, output: 20 },
    });

    const { isToolSensitive } = await import("@ferroui/tools");
    (isToolSensitive as any).mockReturnValueOnce(true);

    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    for await (const _ of gen) {
      // Exhaust the generator to trigger all side effects
    }

    const { semanticCache } = await import("../cache/semantic-cache.js");
    expect(semanticCache.get).not.toHaveBeenCalled();
  });

  it("handles tool execution errors", async () => {
    mockProvider.completePrompt.mockResolvedValueOnce({
      content: JSON.stringify({ toolCalls: [{ name: "fail_tool", args: {} }] }),
      tokens: { input: 10, output: 20 },
    });

    const { executeTool } = await import("@ferroui/tools");
    (executeTool as any).mockRejectedValueOnce(new Error("Tool failed"));

    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(
      chunks.some(
        (c) => c.type === "tool_output" && (c as any).toolOutput.result.error,
      ),
    ).toBe(true);
  });

  it("stops if phase 2 budget is exceeded", async () => {
    const { dailyBudgetStore } = await import("../middleware/tenant-quota.js");
    (dailyBudgetStore.checkBudget as any).mockReturnValueOnce(false);

    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    expect(
      chunks.some(
        (c) => c.type === "error" && c.error?.code === "BUDGET_EXCEEDED",
      ),
    ).toBe(true);
  });

  it("triggers repair if phase 2 returns invalid JSON", async () => {
    mockProvider.processPrompt.mockImplementationOnce(async function* () {
      yield "Not JSON";
      return { tokens: { input: 50, output: 100 } };
    });

    const { repairLayout } = await import("../validation/repair.js");
    (repairLayout as any).mockResolvedValueOnce({
      type: "RepairedLayout",
      metadata: {},
    });

    const gen = runDualPhasePipeline(mockProvider, "Hello", context, config);
    const chunks = [];
    for await (const chunk of gen) {
      chunks.push(chunk);
    }

    const finalChunk = chunks.find(
      (c) => c.type === "layout_chunk" && (c as any).layout,
    );
    expect((finalChunk as any).layout.type).toBe("RepairedLayout");
  });
});
