import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  vi,
  beforeEach,
} from "vitest";
import type { AddressInfo } from "net";
import jwt from "jsonwebtoken";
import { createServer } from "./server.js";
import { FerroUIEngine } from "./engine.js";

const mockProcess = vi.fn();

// Mock the engine to control its behavior
vi.mock("./engine.js", () => {
  return {
    FerroUIEngine: vi.fn().mockImplementation(function () {
      return {
        process: mockProcess,
      };
    }),
  };
});

const TEST_JWT_SECRET = "your-test-secret-min32chars-here!!";

function signTestToken(payload: any): string {
  return jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: "1h" });
}

function authHeader(
  userId = "user-test-001",
  permissions = ["read"],
): { Authorization: string } {
  const token = signTestToken({ sub: userId, userId, permissions });
  return { Authorization: `Bearer ${token}` };
}

describe("Server Circuit Breaker & Stream Signing", () => {
  let baseUrl: string;
  let serverInstance: any;
  let mockEngineInstance: any;

  beforeAll(async () => {
    process.env.JWT_SECRET = TEST_JWT_SECRET;
    const { server } = createServer({ port: 0 });
    serverInstance = server;
    await new Promise<void>((resolve) => server.on("listening", resolve));
    const addr = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${addr.port}`;

    // Get the mock instance
    mockEngineInstance = (FerroUIEngine as any).mock.results[0].value;
  });

  afterAll(() => {
    serverInstance?.close();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Universal Stream Signing: every chunk contains signature and publicKey", async () => {
    // Setup mock engine to yield some chunks
    mockEngineInstance.process.mockImplementation(async function* () {
      yield { type: "phase", phase: 1, content: "test" };
      yield { type: "complete" };
    });

    const res = await fetch(`${baseUrl}/api/ferroui/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        prompt: "hello",
        context: {
          userId: "u1",
          requestId: "req-sig-1",
          permissions: [],
          locale: "en",
        },
      }),
    });

    expect(res.status).toBe(200);
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let chunksCount = 0;

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            expect(data).toHaveProperty("signature");
            expect(data).toHaveProperty("publicKey");
            chunksCount++;
          }
        }
      }
    }
    expect(chunksCount).toBeGreaterThanOrEqual(2);
  });

  it("Circuit Breaker: triggers on 3 failures and returns 503 on /readyz", async () => {
    // Ensure we are starting from a clean state (reset if needed)
    await fetch(`${baseUrl}/admin/circuit-reset`, {
      method: "POST",
      headers: authHeader("admin", ["system.admin"]),
    });

    // Verify initial state
    const initialReady = await fetch(`${baseUrl}/readyz`);
    expect(initialReady.status).toBe(200);

    // Make engine.process throw an error
    mockEngineInstance.process.mockImplementation(() => {
      throw new Error("LLM failure");
    });

    // Trigger 3 failures
    for (let i = 0; i < 3; i++) {
      await fetch(`${baseUrl}/api/ferroui/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({
          prompt: "hello",
          context: {
            userId: "u1",
            requestId: `req-fail-${i}`,
            permissions: [],
            locale: "en",
          },
        }),
      });
    }

    // Verify /readyz is now 503
    const readyRes = await fetch(`${baseUrl}/readyz`);
    expect(readyRes.status).toBe(503);
    const readyBody = (await readyRes.json()) as any;
    expect(readyBody.circuitOpen).toBe(true);
    expect(readyBody.consecutiveFailures).toBeGreaterThanOrEqual(3);

    // Verify /api/ferroui/process returns 503 while circuit is open
    const processRes = await fetch(`${baseUrl}/api/ferroui/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        prompt: "hello",
        context: {
          userId: "u1",
          requestId: "req-blocked",
          permissions: [],
          locale: "en",
        },
      }),
    });
    expect(processRes.status).toBe(503);

    // Reset the circuit
    const resetRes = await fetch(`${baseUrl}/admin/circuit-reset`, {
      method: "POST",
      headers: authHeader("admin", ["system.admin"]),
    });
    expect(resetRes.status).toBe(200);

    // Verify /readyz is 200 again
    const finalReady = await fetch(`${baseUrl}/readyz`);
    expect(finalReady.status).toBe(200);
    const finalReadyBody = (await finalReady.json()) as any;
    expect(finalReadyBody.circuitOpen).toBe(false);
    expect(finalReadyBody.consecutiveFailures).toBe(0);
  });
});
