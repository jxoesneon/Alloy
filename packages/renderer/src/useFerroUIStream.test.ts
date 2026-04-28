/**
 * @vitest-environment jsdom
 */
<<<<<<< HEAD
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFerroUIStream } from './useFerroUIStream.js';
import * as schema from '@ferroui/schema';

vi.mock('@ferroui/schema', () => ({
  validateLayout: vi.fn(),
}));

describe('useFerroUIStream', () => {
=======
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFerroUIStream } from "./useFerroUIStream.js";
import * as schema from "@ferroui/schema";

vi.mock("@ferroui/schema", () => ({
  validateLayout: vi.fn(),
}));

describe("useFerroUIStream", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  let globalFetchMock: any;
  let abortSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
<<<<<<< HEAD
    abortSpy = vi.spyOn(AbortController.prototype, 'abort');
=======
    abortSpy = vi.spyOn(AbortController.prototype, "abort");
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    globalFetchMock = vi.fn();
    globalThis.fetch = globalFetchMock as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createStreamReader = (chunks: string[]) => {
    let index = 0;
    return {
      read: vi.fn().mockImplementation(() => {
        if (index >= chunks.length) {
          return Promise.resolve({ done: true, value: undefined });
        }
        const text = chunks[index++];
<<<<<<< HEAD
        return Promise.resolve({ done: false, value: new TextEncoder().encode(text) });
      })
    };
  };

  it('initializes with default state', () => {
=======
        return Promise.resolve({
          done: false,
          value: new TextEncoder().encode(text),
        });
      }),
    };
  };

  it("initializes with default state", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    const { result } = renderHook(() => useFerroUIStream());
    expect(result.current.loading).toBe(false);
    expect(result.current.layout).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.phase).toBeNull();
    expect(result.current.toolCalls).toEqual([]);
    expect(result.current.cacheHit).toBe(false);
  });

<<<<<<< HEAD
  it('handles abort correctly', () => {
=======
  it("handles abort correctly", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    const { result } = renderHook(() => useFerroUIStream());
    act(() => {
      result.current.abort();
    });
    // Shouldn't crash if no active request
<<<<<<< HEAD
    
    // Start request to set abort controller
    globalFetchMock.mockResolvedValueOnce(new Promise(() => {})); // pending promise
    act(() => {
      result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });
    
    expect(result.current.loading).toBe(true);
    
=======

    // Start request to set abort controller
    globalFetchMock.mockResolvedValueOnce(new Promise(() => {})); // pending promise
    act(() => {
      result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });

    expect(result.current.loading).toBe(true);

>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    act(() => {
      result.current.abort();
    });
    expect(abortSpy).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

<<<<<<< HEAD
  it('handles fetch error (non-ok response)', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
      json: () => Promise.reject(new Error('Parse error'))
    });

    const { result } = renderHook(() => useFerroUIStream());
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Bad Request');
    
    // With successful json parsing
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Specific error' })
    });
    
    await act(async () => {
      await result.current.send('test2', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });
    
    expect(result.current.error).toBe('Specific error');
  });

  it('handles missing body in response', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: null
    });

    const { result } = renderHook(() => useFerroUIStream());
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('No stream body');
  });

  it('handles network error', async () => {
    globalFetchMock.mockRejectedValueOnce(new Error('Network failure'));

    const { result } = renderHook(() => useFerroUIStream());
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network failure');
  });

  it('ignores AbortError', async () => {
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    globalFetchMock.mockRejectedValueOnce(abortError);

    const { result } = renderHook(() => useFerroUIStream());
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
=======
  it("handles fetch error (non-ok response)", async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      statusText: "Bad Request",
      json: () => Promise.reject(new Error("Parse error")),
    });

    const { result } = renderHook(() => useFerroUIStream());

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Bad Request");

    // With successful json parsing
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Specific error" }),
    });

    await act(async () => {
      await result.current.send("test2", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });

    expect(result.current.error).toBe("Specific error");
  });

  it("handles missing body in response", async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: null,
    });

    const { result } = renderHook(() => useFerroUIStream());

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("No stream body");
  });

  it("handles network error", async () => {
    globalFetchMock.mockRejectedValueOnce(new Error("Network failure"));

    const { result } = renderHook(() => useFerroUIStream());

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Network failure");
  });

  it("ignores AbortError", async () => {
    const abortError = new Error("Aborted");
    abortError.name = "AbortError";
    globalFetchMock.mockRejectedValueOnce(abortError);

    const { result } = renderHook(() => useFerroUIStream());

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    // Error should not be set
    expect(result.current.error).toBeNull();
  });

<<<<<<< HEAD
  it('processes stream chunks successfully', async () => {
=======
  it("processes stream chunks successfully", async () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    const chunks = [
      `data: {"type": "phase", "phase": 1}\n\n`,
      `data: {"type": "tool_call", "toolCall": {"name": "get_data", "args": {"a": 1}}}\n\n`,
      `data: {"type": "tool_output", "toolOutput": {"name": "get_data", "result": "success"}}\n\n`,
      `data: {"type": "layout_chunk", "layout": {"type": "button"}}\n\n`,
      `data: {"type": "complete", "layout": {"type": "button", "metadata": {"cacheHit": true}}}\n\n`,
      `data: {"type": "error", "error": {"message": "non-fatal", "retryable": true}}\n\n`,
      `data: {"type": "error", "error": {"message": "fatal"}}\n\n`,
      `data: invalid_json\n\n`,
<<<<<<< HEAD
      `not_data\n\n`
    ];

    vi.mocked(schema.validateLayout).mockReturnValueOnce({ valid: true, data: { type: 'button' } } as any);
=======
      `not_data\n\n`,
    ];

    vi.mocked(schema.validateLayout).mockReturnValueOnce({
      valid: true,
      data: { type: "button" },
    } as any);
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)

    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: {
<<<<<<< HEAD
        getReader: () => createStreamReader(chunks)
      }
    });

    const { result } = renderHook(() => useFerroUIStream({ endpoint: '/custom' }));
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
=======
        getReader: () => createStreamReader(chunks),
      },
    });

    const { result } = renderHook(() =>
      useFerroUIStream({ endpoint: "/custom" }),
    );

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    // Validate state updates
    expect(result.current.phase).toBe(1);
    expect(result.current.toolCalls).toEqual([
<<<<<<< HEAD
      { name: 'get_data', args: { a: 1 }, result: 'success' }
    ]);
    expect(result.current.layout).toEqual({ type: 'button', metadata: { cacheHit: true } });
    expect(result.current.cacheHit).toBe(true);
    expect(result.current.error).toBe('fatal'); // Last error received
    expect(result.current.loading).toBe(false);
  });

  it('handles layout validation failure', async () => {
    const chunks = [
      `data: {"type": "layout_chunk", "layout": {"type": "invalid"}}\n\n`
    ];

    vi.mocked(schema.validateLayout).mockReturnValueOnce({ valid: false, errors: ['bad type'] } as any);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
=======
      { name: "get_data", args: { a: 1 }, result: "success" },
    ]);
    expect(result.current.layout).toEqual({
      type: "button",
      metadata: { cacheHit: true },
    });
    expect(result.current.cacheHit).toBe(true);
    expect(result.current.error).toBe("fatal"); // Last error received
    expect(result.current.loading).toBe(false);
  });

  it("handles layout validation failure", async () => {
    const chunks = [
      `data: {"type": "layout_chunk", "layout": {"type": "invalid"}}\n\n`,
    ];

    vi.mocked(schema.validateLayout).mockReturnValueOnce({
      valid: false,
      errors: ["bad type"],
    } as any);
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)

    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: {
<<<<<<< HEAD
        getReader: () => createStreamReader(chunks)
      }
    });

    const { result } = renderHook(() => useFerroUIStream());
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.error).toBe('Received invalid layout structure from engine');
  });

  it('completes when exiting loop and resets loading', async () => {
=======
        getReader: () => createStreamReader(chunks),
      },
    });

    const { result } = renderHook(() => useFerroUIStream());

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.error).toBe(
      "Received invalid layout structure from engine",
    );
  });

  it("completes when exiting loop and resets loading", async () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    // Empty stream shouldn't leave it loading
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: {
<<<<<<< HEAD
        getReader: () => createStreamReader([])
      }
    });

    const { result } = renderHook(() => useFerroUIStream());
    
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
=======
        getReader: () => createStreamReader([]),
      },
    });

    const { result } = renderHook(() => useFerroUIStream());

    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    expect(result.current.loading).toBe(false);
  });

<<<<<<< HEAD
  it('handles empty errBody fallback to Request failed', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}) // No error property
    });
    const { result } = renderHook(() => useFerroUIStream());
    await act(async () => {
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
    });
    expect(result.current.error).toBe('Request failed');
  });

  it('handles stream with unmatched tool output and layout fallbacks', async () => {
=======
  it("handles empty errBody fallback to Request failed", async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}), // No error property
    });
    const { result } = renderHook(() => useFerroUIStream());
    await act(async () => {
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
    });
    expect(result.current.error).toBe("Request failed");
  });

  it("handles stream with unmatched tool output and layout fallbacks", async () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    const chunks = [
      `data: {"type": "tool_call", "toolCall": {"name": "get_data", "args": {}}}\n\n`,
      // Provide an output name that doesn't match
      `data: {"type": "tool_output", "toolOutput": {"name": "wrong_data", "result": "success"}}\n\n`,
      // Provide a complete without layout
<<<<<<< HEAD
      `data: {"type": "complete"}\n\n`
=======
      `data: {"type": "complete"}\n\n`,
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    ];
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: {
<<<<<<< HEAD
        getReader: () => createStreamReader(chunks)
      }
=======
        getReader: () => createStreamReader(chunks),
      },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    const { result } = renderHook(() => useFerroUIStream());
    await act(async () => {
<<<<<<< HEAD
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
=======
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    expect(result.current.toolCalls[0].result).toBeUndefined(); // Didn't match
    expect(result.current.cacheHit).toBe(false); // Defaulted to false
  });

<<<<<<< HEAD
  it('handles trailing buffer without newline correctly', async () => {
    const chunks = [
      `data: {"type": "phase", "phase": 1}` // No double newline
=======
  it("handles trailing buffer without newline correctly", async () => {
    const chunks = [
      `data: {"type": "phase", "phase": 1}`, // No double newline
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    ];
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      body: {
<<<<<<< HEAD
        getReader: () => createStreamReader(chunks)
      }
=======
        getReader: () => createStreamReader(chunks),
      },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    const { result } = renderHook(() => useFerroUIStream());
    await act(async () => {
<<<<<<< HEAD
      await result.current.send('test', { userId: '1', requestId: '1', permissions: [], locale: 'en' });
=======
      await result.current.send("test", {
        userId: "1",
        requestId: "1",
        permissions: [],
        locale: "en",
      });
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });

    // Should process without crashing, phase is still null because chunk didn't parse (no \\n\\n)
    expect(result.current.phase).toBeNull();
  });
});
