<<<<<<< HEAD
import { describe, it, expect, vi, beforeEach } from 'vitest';
import app from './index.js';

const mockGenerateContent = vi.fn();

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function() {
=======
import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "./index.js";

const mockGenerateContent = vi.fn();

vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function () {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      return {
        getGenerativeModel: () => ({
          generateContent: mockGenerateContent,
        }),
      };
    }),
  };
});

<<<<<<< HEAD
describe('Edge App', () => {
=======
describe("Edge App", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => '```json\n{"type":"Dashboard","id":"test"}\n```',
      },
    });
  });

<<<<<<< HEAD
  describe('POST /api/layout', () => {
    it('returns 500 if API key is missing', async () => {
      const res = await app.request('/api/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test' }),
      }, {
        GEMINI_API_KEY: '',
      });
      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ error: 'API Key missing' });
    });

    it('synthesizes layout and returns SSE', async () => {
      const res = await app.request('/api/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test', requestId: 'req-123' }),
      }, {
        GEMINI_API_KEY: 'test-key',
        FERROUI_DEBUG: 'true',
      });
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/event-stream');
      
      const body = await res.text();
      expect(body).toContain('data: ');
      expect(body).toContain('req-123');
    });

    it('handles synthesis error', async () => {
      mockGenerateContent.mockRejectedValueOnce(new Error('AI failed'));

      const res = await app.request('/api/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test' }),
      }, {
        GEMINI_API_KEY: 'test-key',
      });
      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: 'Synthesis failed', details: 'AI failed' });
    });

    it('handles synthesis string error', async () => {
      mockGenerateContent.mockRejectedValueOnce('String error');
      const res = await app.request('/api/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test' }),
      }, { GEMINI_API_KEY: 'test-key' });
      expect(res.status).toBe(500);
      expect((await res.json()).details).toBe('String error');
    });

    it('handles empty prompt fallback', async () => {
      const res = await app.request('/api/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: '' }),
      }, { GEMINI_API_KEY: 'test-key' });
      expect(res.status).toBe(200);
    });

    it('does not log if debug is false', async () => {
      const res = await app.request('/api/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test' }),
      }, { GEMINI_API_KEY: 'test-key' });
=======
  describe("POST /api/layout", () => {
    it("returns 500 if API key is missing", async () => {
      const res = await app.request(
        "/api/layout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "test" }),
        },
        {
          GEMINI_API_KEY: "",
        },
      );
      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ error: "API Key missing" });
    });

    it("synthesizes layout and returns SSE", async () => {
      const res = await app.request(
        "/api/layout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "test", requestId: "req-123" }),
        },
        {
          GEMINI_API_KEY: "test-key",
          FERROUI_DEBUG: "true",
        },
      );
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toContain("text/event-stream");

      const body = await res.text();
      expect(body).toContain("data: ");
      expect(body).toContain("req-123");
    });

    it("handles synthesis error", async () => {
      mockGenerateContent.mockRejectedValueOnce(new Error("AI failed"));

      const res = await app.request(
        "/api/layout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "test" }),
        },
        {
          GEMINI_API_KEY: "test-key",
        },
      );
      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Synthesis failed", details: "AI failed" });
    });

    it("handles synthesis string error", async () => {
      mockGenerateContent.mockRejectedValueOnce("String error");
      const res = await app.request(
        "/api/layout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "test" }),
        },
        { GEMINI_API_KEY: "test-key" },
      );
      expect(res.status).toBe(500);
      expect((await res.json()).details).toBe("String error");
    });

    it("handles empty prompt fallback", async () => {
      const res = await app.request(
        "/api/layout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "" }),
        },
        { GEMINI_API_KEY: "test-key" },
      );
      expect(res.status).toBe(200);
    });

    it("does not log if debug is false", async () => {
      const res = await app.request(
        "/api/layout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "test" }),
        },
        { GEMINI_API_KEY: "test-key" },
      );
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      expect(res.status).toBe(200);
    });
  });

<<<<<<< HEAD
  describe('GET /api/stream', () => {
    it('returns SSE stream', async () => {
      const res = await app.request('/api/stream', {}, { GEMINI_API_KEY: 'k' });
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/event-stream');
=======
  describe("GET /api/stream", () => {
    it("returns SSE stream", async () => {
      const res = await app.request("/api/stream", {}, { GEMINI_API_KEY: "k" });
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toContain("text/event-stream");
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      // Just check headers, body will be endless
      // Can't read full body because it's endless `while(true)`.
      // Let's just cancel it.
    });
  });

<<<<<<< HEAD
  describe('POST /api/tools/call', () => {
=======
  describe("POST /api/tools/call", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    let globalFetchMock: any;

    beforeEach(() => {
      globalFetchMock = vi.fn();
<<<<<<< HEAD
      globalThis.fetch = globalFetchMock as any;
    });

    it('calls engine and returns result', async () => {
=======
      global.fetch = globalFetchMock as any;
    });

    it("calls engine and returns result", async () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      globalFetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, data: 123 }),
      });

<<<<<<< HEAD
      const res = await app.request('/api/tools/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'my_tool', args: {} }),
      }, {
        GEMINI_API_KEY: 'key',
        FERROUI_ENGINE_URL: 'http://custom-engine',
      });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ success: true, data: 123 });
      expect(globalFetchMock).toHaveBeenCalledWith('http://custom-engine/api/tools/call', expect.any(Object));
    });

    it('handles non-ok engine response', async () => {
=======
      const res = await app.request(
        "/api/tools/call",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: "my_tool", args: {} }),
        },
        {
          GEMINI_API_KEY: "key",
          FERROUI_ENGINE_URL: "http://custom-engine",
        },
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ success: true, data: 123 });
      expect(globalFetchMock).toHaveBeenCalledWith(
        "http://custom-engine/api/tools/call",
        expect.any(Object),
      );
    });

    it("handles non-ok engine response", async () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      globalFetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

<<<<<<< HEAD
      const res = await app.request('/api/tools/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'my_tool', args: {} }),
      }, {
        GEMINI_API_KEY: 'key',
      });

      expect(res.status).toBe(502);
      expect(await res.json()).toEqual({ success: false, error: 'Engine responded 404' });
    });

    it('handles fetch error', async () => {
      globalFetchMock.mockRejectedValueOnce(new Error('Network error'));

      const res = await app.request('/api/tools/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'my_tool', args: {} }),
      }, {
        GEMINI_API_KEY: 'key',
      });

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({ success: false, error: 'Network error' });
=======
      const res = await app.request(
        "/api/tools/call",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: "my_tool", args: {} }),
        },
        {
          GEMINI_API_KEY: "key",
        },
      );

      expect(res.status).toBe(502);
      expect(await res.json()).toEqual({
        success: false,
        error: "Engine responded 404",
      });
    });

    it("handles fetch error", async () => {
      globalFetchMock.mockRejectedValueOnce(new Error("Network error"));

      const res = await app.request(
        "/api/tools/call",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: "my_tool", args: {} }),
        },
        {
          GEMINI_API_KEY: "key",
        },
      );

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({
        success: false,
        error: "Network error",
      });
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });
  });
});
