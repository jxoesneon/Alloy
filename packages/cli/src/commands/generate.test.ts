import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { generateCommand } from "./generate.js";
import fs from "fs-extra";
import ora from "ora";

vi.mock("fs-extra");
vi.mock("ora");
vi.mock("handlebars", () => {
  return {
    default: {
      compile: vi.fn(() => vi.fn(() => "compiled template result")),
    },
  };
});

describe("generateCommand", () => {
  let consoleErrorMock: Mock;
  let processExitMock: Mock;
  let oraStartMock: Mock;
  let oraSucceedMock: Mock;
  let oraFailMock: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
    processExitMock = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {}) as any);

    oraSucceedMock = vi.fn();
    oraFailMock = vi.fn();
    oraStartMock = vi.fn().mockReturnValue({
      succeed: oraSucceedMock,
      fail: oraFailMock,
    });
    vi.mocked(ora).mockImplementation(() => ({ start: oraStartMock }) as any);

    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.pathExists).mockResolvedValue(true as never);
    vi.mocked(fs.ensureDir).mockResolvedValue(undefined as never);
    vi.mocked(fs.mkdir).mockResolvedValue(undefined as never);
    vi.mocked(fs.readFile).mockResolvedValue("template content" as never);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("component", () => {
    it("should generate a full component successfully", async () => {
      await generateCommand.parseAsync([
        "node",
        "generate",
        "component",
        "button",
        "--tier",
        "atom",
      ]);

      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.mkdir).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalledTimes(6); // index, schema, types, README, stories, test
      expect(fs.writeFile).toHaveBeenCalledTimes(6);
      expect(oraSucceedMock).toHaveBeenCalledWith(
        expect.stringContaining("Generated"),
      );
    });

    it("should fail if directory already exists", async () => {
      const error = new Error("EEXIST");
      (error as any).code = "EEXIST";
      vi.mocked(fs.mkdir).mockRejectedValue(error);

      await generateCommand.parseAsync([
        "node",
        "generate",
        "component",
        "button",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Component directory already exists"),
      );
      expect(processExitMock).toHaveBeenCalledWith(1);
    });

    it("should respect --no-stories and --no-tests", async () => {
      await generateCommand.parseAsync([
        "node",
        "generate",
        "component",
        "button",
        "--no-stories",
        "--no-tests",
      ]);

      expect(fs.readFile).toHaveBeenCalledTimes(4); // index, schema, types, README
      expect(fs.writeFile).toHaveBeenCalledTimes(4);
    });

    it("should handle fs errors gracefully", async () => {
      vi.mocked(fs.ensureDir).mockRejectedValue(new Error("Permission denied"));

      await generateCommand.parseAsync([
        "node",
        "generate",
        "component",
        "button",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Failed to generate component."),
      );
      expect(consoleErrorMock).toHaveBeenCalledWith("Permission denied");
      expect(processExitMock).toHaveBeenCalledWith(1);
    });
  });

  describe("tool", () => {
    it("should generate a full tool successfully", async () => {
      await generateCommand.parseAsync([
        "node",
        "generate",
        "tool",
        "fetchData",
      ]);

      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.mkdir).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalledTimes(5); // index, schema, test, README, mock
      expect(fs.writeFile).toHaveBeenCalledTimes(5);
      expect(oraSucceedMock).toHaveBeenCalledWith(
        expect.stringContaining("Generated"),
      );
    });

    it("should respect --no-mock flag", async () => {
      await generateCommand.parseAsync([
        "node",
        "generate",
        "tool",
        "fetchData",
        "--no-mock",
      ]);

      expect(fs.readFile).toHaveBeenCalledTimes(4);
    });

    it("should fail if directory already exists", async () => {
      const error = new Error("EEXIST");
      (error as any).code = "EEXIST";
      vi.mocked(fs.mkdir).mockRejectedValue(error);

      await generateCommand.parseAsync([
        "node",
        "generate",
        "tool",
        "fetchData",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Tool directory already exists"),
      );
      expect(processExitMock).toHaveBeenCalledWith(1);
    });

    it("should handle generic errors in tool generation", async () => {
      vi.mocked(fs.mkdir).mockRejectedValue(new Error("Generic Error"));

      await generateCommand.parseAsync([
        "node",
        "generate",
        "tool",
        "fetchData",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Failed to generate tool."),
      );
      expect(consoleErrorMock).toHaveBeenCalledWith("Generic Error");
      expect(processExitMock).toHaveBeenCalledWith(1);
    });
  });

  describe("prompt", () => {
    it("should generate a prompt successfully", async () => {
      await generateCommand.parseAsync([
        "node",
        "generate",
        "prompt",
        "System Expert",
        "-v",
        "2",
      ]);

      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        { flag: "wx" },
      );
      expect(oraSucceedMock).toHaveBeenCalledWith(
        expect.stringContaining("Generated system-expert"),
      );
    });

    it("should fallback to default template if template file does not exist", async () => {
      const error = new Error("ENOENT");
      (error as any).code = "ENOENT";
      vi.mocked(fs.readFile).mockRejectedValueOnce(error);

      await generateCommand.parseAsync([
        "node",
        "generate",
        "prompt",
        "System Expert",
      ]);

      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
    });

    it("should throw error if template reading fails with non-ENOENT error", async () => {
      const error = new Error("Permission Denied");
      (error as any).code = "EACCES";
      vi.mocked(fs.readFile).mockRejectedValueOnce(error);

      await generateCommand.parseAsync([
        "node",
        "generate",
        "prompt",
        "System Expert",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Failed to generate prompt."),
      );
      expect(consoleErrorMock).toHaveBeenCalledWith("Permission Denied");
    });

    it("should fail if prompt file already exists", async () => {
      const error = new Error("EEXIST");
      (error as any).code = "EEXIST";
      vi.mocked(fs.writeFile).mockRejectedValue(error);

      await generateCommand.parseAsync([
        "node",
        "generate",
        "prompt",
        "System Expert",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Prompt file already exists"),
      );
      expect(processExitMock).toHaveBeenCalledWith(1);
    });

    it("should handle generic errors in prompt generation", async () => {
      vi.mocked(fs.writeFile).mockRejectedValue(
        new Error("Generic Write Error"),
      );

      await generateCommand.parseAsync([
        "node",
        "generate",
        "prompt",
        "System Expert",
      ]);

      expect(oraFailMock).toHaveBeenCalledWith(
        expect.stringContaining("Failed to generate prompt."),
      );
      expect(consoleErrorMock).toHaveBeenCalledWith("Generic Write Error");
      expect(processExitMock).toHaveBeenCalledWith(1);
    });
  });
});
