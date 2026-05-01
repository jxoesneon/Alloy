import { describe, it, expect, vi, beforeEach } from "vitest";
import { promptCommand } from "../prompt.js";
import * as fs from "node:fs/promises";
import { spawnSync } from "node:child_process";

vi.mock("node:fs/promises");
vi.mock("node:child_process");
vi.mock("ora", () => ({
  default: vi.fn(() => ({
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
  })),
}));

describe("Prompt CLI Command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("list", () => {
    it("should list available prompt versions", async () => {
      vi.mocked(fs.readdir).mockResolvedValue([
        { name: "v1.0", isDirectory: () => true },
        { name: "v1.1", isDirectory: () => true },
        { name: "README.md", isDirectory: () => false },
      ] as any);
      vi.mocked(fs.readFile).mockResolvedValue("1.0");

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      await promptCommand.parseAsync(["node", "prompt", "list"]);

      expect(fs.readdir).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("v1.0"));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("v1.1"));
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("pinned"),
      );
    });
  });

  describe("diff", () => {
    it("should show differences between two versions", async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(spawnSync).mockReturnValue({
        stdout: "diff content",
        status: 0,
      } as any);

      await promptCommand.parseAsync(["node", "prompt", "diff", "1.0", "1.1"]);

      expect(fs.access).toHaveBeenCalledTimes(2);
      expect(spawnSync).toHaveBeenCalledWith(
        "diff",
        ["-u", "-r", expect.any(String), expect.stringContaining("v1.1")],
        expect.any(Object),
      );
    });
  });

  describe("rollback", () => {
    it("should pin engine to a specific version", async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      await promptCommand.parseAsync(["node", "prompt", "rollback", "1.1"]);

      expect(fs.access).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining(".prompt-version"),
        "1.1",
        "utf-8",
      );
    });

    it("should fail if version does not exist", async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error("Not found"));
      const exitSpy = vi.spyOn(process, "exit").mockImplementation((() => {
        throw new Error("Exit 1");
      }) as any);

      await expect(
        promptCommand.parseAsync(["node", "prompt", "rollback", "9.9"]),
      ).rejects.toThrow("Exit 1");

      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });
});
