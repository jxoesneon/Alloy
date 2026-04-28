<<<<<<< HEAD
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { handlers } = vi.hoisted(() => ({ handlers: {} as Record<string, any> }));

vi.mock('@modelcontextprotocol/sdk/server/index.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@modelcontextprotocol/sdk/server/index.js')>();
=======
import { describe, it, expect, vi, beforeEach } from "vitest";

const { handlers } = vi.hoisted(() => ({
  handlers: {} as Record<string, any>,
}));

vi.mock("@modelcontextprotocol/sdk/server/index.js", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("@modelcontextprotocol/sdk/server/index.js")
    >();
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  class MockServer extends actual.Server {
    setRequestHandler(schema: any, handler: any) {
      handlers[schema.shape?.method?.value ?? schema.method] = handler;
      super.setRequestHandler(schema, handler);
    }
  }
  return { ...actual, Server: MockServer };
});

<<<<<<< HEAD
vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => {
=======
vi.mock("@modelcontextprotocol/sdk/server/stdio.js", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  return {
    StdioServerTransport: class StdioServerTransport {
      start() {}
      close() {}
      send() {}
    },
  };
});

<<<<<<< HEAD
vi.mock('@ferroui/schema', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@ferroui/schema')>();
=======
vi.mock("@ferroui/schema", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@ferroui/schema")>();
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  return {
    ...actual,
    validateLayout: vi.fn().mockReturnValue({ valid: true }),
  };
});

<<<<<<< HEAD
vi.mock('@ferroui/tools', () => ({
  getToolsForUser: vi.fn().mockReturnValue([]),
}));

vi.mock('@ferroui/engine', () => {
=======
vi.mock("@ferroui/tools", () => ({
  getToolsForUser: vi.fn().mockReturnValue([]),
}));

vi.mock("@ferroui/engine", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  return {
    AnthropicProvider: class AnthropicProvider {},
    OpenAIProvider: class OpenAIProvider {},
    runDualPhasePipeline: vi.fn(),
  };
});

<<<<<<< HEAD
import { server, getProvider, main } from './index.js';
import * as toolsModule from '@ferroui/tools';
import * as engineModule from '@ferroui/engine';
=======
import { server, getProvider, main } from "./index.js";
import * as toolsModule from "@ferroui/tools";
import * as engineModule from "@ferroui/engine";
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)

// We need to map the methods manually because schema.shape.method.value might not be available.
// In SDK v1.29, they use Zod schemas. Let's just extract the method from the schema or hardcode mapping.
// Actually, the schemas exported by SDK have the method name. But let's just intercept the calls to setRequestHandler.
// Wait, `schema.shape.method.value` works for zod literal schemas. If not, we can just use an array of handlers in the mock and match by the schema.

<<<<<<< HEAD
describe('MCP Server', () => {
=======
describe("MCP Server", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  beforeEach(() => {
    vi.clearAllMocks();
  });

<<<<<<< HEAD
  describe('getProvider', () => {
    it('returns Anthropic by default', () => {
=======
  describe("getProvider", () => {
    it("returns Anthropic by default", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      delete process.env.LLM_PROVIDER;
      expect(getProvider()).toBeInstanceOf(engineModule.AnthropicProvider);
    });

<<<<<<< HEAD
    it('returns OpenAI when set', () => {
      process.env.LLM_PROVIDER = 'openai';
=======
    it("returns OpenAI when set", () => {
      process.env.LLM_PROVIDER = "openai";
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      expect(getProvider()).toBeInstanceOf(engineModule.OpenAIProvider);
      delete process.env.LLM_PROVIDER;
    });
  });

<<<<<<< HEAD
  describe('List Tools', () => {
    it('lists all defined tools', async () => {
      const handler = handlers['tools/list'];
      const response = await handler({ params: {} });
      expect(response.tools.length).toBe(4);
      expect(response.tools.map((t: any) => t.name)).toContain('ferroui_generate_layout');
    });
  });

  describe('Call Tool: ferroui_generate_layout', () => {
    it('fails with invalid args', async () => {
      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_generate_layout', arguments: {} }
      });
      expect(response.isError).toBe(true);
      expect(response.content[0].text).toContain('Invalid arguments');
    });

    it('generates layout with layout_chunk and complete', async () => {
      async function* mockGenerator() {
        yield { type: 'layout_chunk', content: '{"a":' };
        yield { type: 'layout_chunk', content: '1}' };
        yield { type: 'complete', layout: { type: 'Dashboard' } };
      }
      vi.mocked(engineModule.runDualPhasePipeline).mockReturnValue(mockGenerator() as any);

      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_generate_layout', arguments: { prompt: 'test' } }
=======
  describe("List Tools", () => {
    it("lists all defined tools", async () => {
      const handler = handlers["tools/list"];
      const response = await handler({ params: {} });
      expect(response.tools.length).toBe(4);
      expect(response.tools.map((t: any) => t.name)).toContain(
        "ferroui_generate_layout",
      );
    });
  });

  describe("Call Tool: ferroui_generate_layout", () => {
    it("fails with invalid args", async () => {
      const handler = handlers["tools/call"];
      const response = await handler({
        params: { name: "ferroui_generate_layout", arguments: {} },
      });
      expect(response.isError).toBe(true);
      expect(response.content[0].text).toContain("Invalid arguments");
    });

    it("generates layout with layout_chunk and complete", async () => {
      async function* mockGenerator() {
        yield { type: "layout_chunk", content: '{"a":' };
        yield { type: "layout_chunk", content: "1}" };
        yield { type: "complete", layout: { type: "Dashboard" } };
      }
      vi.mocked(engineModule.runDualPhasePipeline).mockReturnValue(
        mockGenerator() as any,
      );

      const handler = handlers["tools/call"];
      const response = await handler({
        params: {
          name: "ferroui_generate_layout",
          arguments: { prompt: "test" },
        },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      });

      expect(response.isError).toBeUndefined();
      expect(response.content[0].text).toContain('"type": "Dashboard"');
    });

<<<<<<< HEAD
    it('generates layout parsing chunks if complete does not have layout', async () => {
      async function* mockGenerator() {
        yield { type: 'layout_chunk', content: '{"b":2}' };
        yield { type: 'complete' };
      }
      vi.mocked(engineModule.runDualPhasePipeline).mockReturnValue(mockGenerator() as any);

      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_generate_layout', arguments: { prompt: 'test' } }
=======
    it("generates layout parsing chunks if complete does not have layout", async () => {
      async function* mockGenerator() {
        yield { type: "layout_chunk", content: '{"b":2}' };
        yield { type: "complete" };
      }
      vi.mocked(engineModule.runDualPhasePipeline).mockReturnValue(
        mockGenerator() as any,
      );

      const handler = handlers["tools/call"];
      const response = await handler({
        params: {
          name: "ferroui_generate_layout",
          arguments: { prompt: "test" },
        },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      });

      expect(response.isError).toBeUndefined();
      expect(response.content[0].text).toContain('"b": 2');
    });

<<<<<<< HEAD
    it('handles generator error chunk', async () => {
      async function* mockGenerator() {
        yield { type: 'error', error: new Error('generation error') };
      }
      vi.mocked(engineModule.runDualPhasePipeline).mockReturnValue(mockGenerator() as any);

      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_generate_layout', arguments: { prompt: 'test' } }
      });

      expect(response.isError).toBe(true);
      expect(response.content[0].text).toContain('Pipeline error: generation error');
    });

    it('handles thrown error', async () => {
      vi.mocked(engineModule.runDualPhasePipeline).mockImplementation(() => {
        throw new Error('thrown error');
      });

      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_generate_layout', arguments: { prompt: 'test' } }
      });

      expect(response.isError).toBe(true);
      expect(response.content[0].text).toContain('Generation failed: thrown error');
    });
  });

  describe('Call Tool: ferroui_validate_layout', () => {
    it('fails with missing args', async () => {
      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_validate_layout', arguments: null as any }
=======
    it("handles generator error chunk", async () => {
      async function* mockGenerator() {
        yield { type: "error", error: new Error("generation error") };
      }
      vi.mocked(engineModule.runDualPhasePipeline).mockReturnValue(
        mockGenerator() as any,
      );

      const handler = handlers["tools/call"];
      const response = await handler({
        params: {
          name: "ferroui_generate_layout",
          arguments: { prompt: "test" },
        },
      });

      expect(response.isError).toBe(true);
      expect(response.content[0].text).toContain(
        "Pipeline error: generation error",
      );
    });

    it("handles thrown error", async () => {
      vi.mocked(engineModule.runDualPhasePipeline).mockImplementation(() => {
        throw new Error("thrown error");
      });

      const handler = handlers["tools/call"];
      const response = await handler({
        params: {
          name: "ferroui_generate_layout",
          arguments: { prompt: "test" },
        },
      });

      expect(response.isError).toBe(true);
      expect(response.content[0].text).toContain(
        "Generation failed: thrown error",
      );
    });
  });

  describe("Call Tool: ferroui_validate_layout", () => {
    it("fails with missing args", async () => {
      const handler = handlers["tools/call"];
      const response = await handler({
        params: { name: "ferroui_validate_layout", arguments: null as any },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      });
      expect(response.isError).toBe(true);
    });

<<<<<<< HEAD
    it('validates layout successfully', async () => {
      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_validate_layout', arguments: { layout: { type: 'Dashboard' } } }
=======
    it("validates layout successfully", async () => {
      const handler = handlers["tools/call"];
      const response = await handler({
        params: {
          name: "ferroui_validate_layout",
          arguments: { layout: { type: "Dashboard" } },
        },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      });
      expect(response.isError).toBeUndefined();
      expect(response.content[0].text).toContain('"valid": true');
    });
  });

<<<<<<< HEAD
  describe('Call Tool: ferroui_list_tools', () => {
    it('lists tools', async () => {
      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_list_tools', arguments: { permissions: ['all'] } }
      });
      expect(response.isError).toBeUndefined();
      expect(vi.mocked(toolsModule.getToolsForUser)).toHaveBeenCalledWith(['all']);
    });
  });

  describe('Call Tool: ferroui_list_components', () => {
    it('lists components', async () => {
      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'ferroui_list_components', arguments: {} }
      });
      expect(response.isError).toBeUndefined();
      expect(response.content[0].text).toContain('Dashboard');
    });
  });

  describe('Call Tool: unknown', () => {
    it('returns error', async () => {
      const handler = handlers['tools/call'];
      const response = await handler({
        params: { name: 'unknown_tool', arguments: {} }
=======
  describe("Call Tool: ferroui_list_tools", () => {
    it("lists tools", async () => {
      const handler = handlers["tools/call"];
      const response = await handler({
        params: {
          name: "ferroui_list_tools",
          arguments: { permissions: ["all"] },
        },
      });
      expect(response.isError).toBeUndefined();
      expect(vi.mocked(toolsModule.getToolsForUser)).toHaveBeenCalledWith([
        "all",
      ]);
    });
  });

  describe("Call Tool: ferroui_list_components", () => {
    it("lists components", async () => {
      const handler = handlers["tools/call"];
      const response = await handler({
        params: { name: "ferroui_list_components", arguments: {} },
      });
      expect(response.isError).toBeUndefined();
      expect(response.content[0].text).toContain("Dashboard");
    });
  });

  describe("Call Tool: unknown", () => {
    it("returns error", async () => {
      const handler = handlers["tools/call"];
      const response = await handler({
        params: { name: "unknown_tool", arguments: {} },
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      });
      expect(response.isError).toBe(true);
    });
  });

<<<<<<< HEAD
  describe('Resources', () => {
    it('lists resources', async () => {
      const handler = handlers['resources/list'];
=======
  describe("Resources", () => {
    it("lists resources", async () => {
      const handler = handlers["resources/list"];
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      const response = await handler({ params: {} });
      expect(response.resources.length).toBe(2);
    });

<<<<<<< HEAD
    it('reads schema resource', async () => {
      const handler = handlers['resources/read'];
      const response = await handler({
        params: { uri: 'ferroui://schema' }
      });
      expect(response.contents[0].text).toContain('FerroUILayout');
    });

    it('reads components resource', async () => {
      const handler = handlers['resources/read'];
      const response = await handler({
        params: { uri: 'ferroui://components' }
      });
      expect(response.contents[0].text).toContain('Dashboard');
    });

    it('throws on unknown resource', async () => {
      const handler = handlers['resources/read'];
      await expect(handler({
        params: { uri: 'ferroui://unknown' }
      })).rejects.toThrow();
    });
  });

  describe('Startup', () => {
    it('main connects to transport', async () => {
      const connectSpy = vi.spyOn(server, 'connect').mockResolvedValue(undefined);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      await main();
      expect(connectSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Server running'));
=======
    it("reads schema resource", async () => {
      const handler = handlers["resources/read"];
      const response = await handler({
        params: { uri: "ferroui://schema" },
      });
      expect(response.contents[0].text).toContain("FerroUILayout");
    });

    it("reads components resource", async () => {
      const handler = handlers["resources/read"];
      const response = await handler({
        params: { uri: "ferroui://components" },
      });
      expect(response.contents[0].text).toContain("Dashboard");
    });

    it("throws on unknown resource", async () => {
      const handler = handlers["resources/read"];
      await expect(
        handler({
          params: { uri: "ferroui://unknown" },
        }),
      ).rejects.toThrow();
    });
  });

  describe("Startup", () => {
    it("main connects to transport", async () => {
      const connectSpy = vi
        .spyOn(server, "connect")
        .mockResolvedValue(undefined);
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      await main();
      expect(connectSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Server running"),
      );
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    });
  });
});
