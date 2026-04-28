<<<<<<< HEAD
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { doctorCommand } from './doctor.js';
import { execSync } from 'node:child_process';
import fs from 'fs-extra';

vi.mock('node:child_process');
vi.mock('fs-extra');

describe('doctorCommand', () => {
=======
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { doctorCommand } from "./doctor.js";
import { execSync } from "node:child_process";
import fs from "fs-extra";

vi.mock("node:child_process");
vi.mock("fs-extra");

describe("doctorCommand", () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  let consoleLogMock: Mock;
  let consoleErrorMock: Mock;
  let processExitMock: Mock;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    vi.clearAllMocks();
    originalEnv = { ...process.env };
<<<<<<< HEAD
    consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    processExitMock = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
=======
    consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
    processExitMock = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {}) as any);
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

<<<<<<< HEAD
  it('should output json and pass all checks in a healthy environment', async () => {
    process.env.OPENAI_API_KEY = 'fake-key';

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === 'string') {
        if (cmd.includes('node')) return 'v18.17.0';
        if (cmd.includes('pnpm')) return '8.6.0';
        if (cmd.includes('tsc')) return 'Version 5.0.4';
        if (cmd.includes('git')) return 'git version 2.39.2';
        if (cmd.includes('curl')) return 'ok';
      }
      return '';
    });

    await doctorCommand.parseAsync(['node', 'doctor', '--json']);
=======
  it("should output json and pass all checks in a healthy environment", async () => {
    process.env.OPENAI_API_KEY = "fake-key";

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === "string") {
        if (cmd.includes("node")) return "v18.17.0";
        if (cmd.includes("pnpm")) return "8.6.0";
        if (cmd.includes("tsc")) return "Version 5.0.4";
        if (cmd.includes("git")) return "git version 2.39.2";
        if (cmd.includes("curl")) return "ok";
      }
      return "";
    });

    await doctorCommand.parseAsync(["node", "doctor", "--json"]);
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)

    expect(consoleLogMock).toHaveBeenCalled();
    const callArgs = consoleLogMock.mock.calls[0][0];
    const results = JSON.parse(callArgs);

    expect(Array.isArray(results)).toBe(true);
    // Node.js
<<<<<<< HEAD
    const nodeResult = results.find((r: any) => r.name === 'Node.js');
    expect(nodeResult.passed).toBe(true);
    
    // API key
    const apiKeyResult = results.find((r: any) => r.name === 'LLM API key (OPENAI or ANTHROPIC)');
=======
    const nodeResult = results.find((r: any) => r.name === "Node.js");
    expect(nodeResult.passed).toBe(true);

    // API key
    const apiKeyResult = results.find(
      (r: any) => r.name === "LLM API key (OPENAI or ANTHROPIC)",
    );
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    expect(apiKeyResult.passed).toBe(true);

    expect(processExitMock).not.toHaveBeenCalled();
  });

<<<<<<< HEAD
  it('should output warnings but not exit 1 for optional failures', async () => {
    process.env.OPENAI_API_KEY = 'fake-key';

    vi.mocked(fs.existsSync).mockImplementation((path: any) => {
      // Missing eslint
      if (typeof path === 'string' && path.includes('.eslint')) return false;
      if (typeof path === 'string' && path.includes('eslint.config')) return false;
=======
  it("should output warnings but not exit 1 for optional failures", async () => {
    process.env.OPENAI_API_KEY = "fake-key";

    vi.mocked(fs.existsSync).mockImplementation((path: any) => {
      // Missing eslint
      if (typeof path === "string" && path.includes(".eslint")) return false;
      if (typeof path === "string" && path.includes("eslint.config"))
        return false;
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
      return true; // everything else exists
    });

    vi.mocked(execSync).mockImplementation((cmd: any) => {
<<<<<<< HEAD
      if (typeof cmd === 'string') {
        if (cmd.includes('node')) return 'v18.17.0';
        if (cmd.includes('pnpm')) return '8.6.0';
        if (cmd.includes('tsc')) return 'Version 5.0.4';
        if (cmd.includes('git')) return 'git version 2.39.2';
        if (cmd.includes('curl')) throw new Error('Not running'); // Ollama failing
      }
      return '';
    });

    await doctorCommand.parseAsync(['node', 'doctor']);

    // Should print warnings but pass overall since these are warnings
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('⚠'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Environment looks good!'));
    expect(processExitMock).not.toHaveBeenCalled();
  });

  it('should fail and exit 1 if Node version is too old', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === 'string' && cmd.includes('node')) return 'v16.20.0'; // Too old
      return 'ok';
    });

    await doctorCommand.parseAsync(['node', 'doctor']);

    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('✖'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Some checks failed.'));
    expect(processExitMock).toHaveBeenCalledWith(1);
  });

  it('should handle missing commands gracefully', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === 'string' && cmd.includes('node')) throw new Error('not found');
      return 'ok';
    });

    await doctorCommand.parseAsync(['node', 'doctor']);

    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('not found'));
    expect(processExitMock).toHaveBeenCalledWith(1);
  });

  it('should return true for semverMeetsMin when a part is greater than min', async () => {
    process.env.OPENAI_API_KEY = 'fake-key';
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === 'string') {
        if (cmd.includes('node')) return 'v20.0.0';
        if (cmd.includes('pnpm')) return '8.6.0';
        if (cmd.includes('tsc')) return 'Version 5.0.4';
        if (cmd.includes('git')) return 'git version 2.39.2';
        if (cmd.includes('curl')) return 'ok';
      }
      return '';
    });
    await doctorCommand.parseAsync(['node', 'doctor']);
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Environment looks good!'));
  });

  it('should handle all tools missing and no env', async () => {
=======
      if (typeof cmd === "string") {
        if (cmd.includes("node")) return "v18.17.0";
        if (cmd.includes("pnpm")) return "8.6.0";
        if (cmd.includes("tsc")) return "Version 5.0.4";
        if (cmd.includes("git")) return "git version 2.39.2";
        if (cmd.includes("curl")) throw new Error("Not running"); // Ollama failing
      }
      return "";
    });

    await doctorCommand.parseAsync(["node", "doctor"]);

    // Should print warnings but pass overall since these are warnings
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("⚠"));
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("Environment looks good!"),
    );
    expect(processExitMock).not.toHaveBeenCalled();
  });

  it("should fail and exit 1 if Node version is too old", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === "string" && cmd.includes("node")) return "v16.20.0"; // Too old
      return "ok";
    });

    await doctorCommand.parseAsync(["node", "doctor"]);

    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("✖"));
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("Some checks failed."),
    );
    expect(processExitMock).toHaveBeenCalledWith(1);
  });

  it("should handle missing commands gracefully", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === "string" && cmd.includes("node"))
        throw new Error("not found");
      return "ok";
    });

    await doctorCommand.parseAsync(["node", "doctor"]);

    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("not found"),
    );
    expect(processExitMock).toHaveBeenCalledWith(1);
  });

  it("should return true for semverMeetsMin when a part is greater than min", async () => {
    process.env.OPENAI_API_KEY = "fake-key";
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === "string") {
        if (cmd.includes("node")) return "v20.0.0";
        if (cmd.includes("pnpm")) return "8.6.0";
        if (cmd.includes("tsc")) return "Version 5.0.4";
        if (cmd.includes("git")) return "git version 2.39.2";
        if (cmd.includes("curl")) return "ok";
      }
      return "";
    });
    await doctorCommand.parseAsync(["node", "doctor"]);
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("Environment looks good!"),
    );
  });

  it("should handle all tools missing and no env", async () => {
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    vi.mocked(fs.existsSync).mockReturnValue(false); // everything missing
    vi.mocked(execSync).mockImplementation((cmd: any) => {
<<<<<<< HEAD
      throw new Error('Not found');
    });

    await doctorCommand.parseAsync(['node', 'doctor']);
    expect(processExitMock).toHaveBeenCalledWith(1);
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('✖ Node.js: not found'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('⚠ pnpm: not found'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('✖ TypeScript: not found'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('✖ Git: not found'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('✖ tsconfig.json: missing'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('⚠ ESLint configuration: missing'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('⚠ .env file: missing'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('⚠ LLM API key (OPENAI or ANTHROPIC): not set'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('✖ @ferroui/schema package: missing'));
  });

  it('should handle git found but not repo', async () => {
    process.env.OPENAI_API_KEY = 'fake-key';
    vi.mocked(fs.existsSync).mockImplementation((p) => {
      if (typeof p === 'string' && p.includes('.git')) return false; // not a repo
      return true;
    });
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === 'string' && cmd.includes('node')) return 'v18.17.0';
      if (typeof cmd === 'string' && cmd.includes('git')) return 'git version 2.39.2';
      return 'ok';
    });
    await doctorCommand.parseAsync(['node', 'doctor']);
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('⚠ Git repository: not initialized'));
=======
      throw new Error("Not found");
    });

    await doctorCommand.parseAsync(["node", "doctor"]);
    expect(processExitMock).toHaveBeenCalledWith(1);
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("✖ Node.js: not found"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("⚠ pnpm: not found"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("✖ TypeScript: not found"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("✖ Git: not found"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("✖ tsconfig.json: missing"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("⚠ ESLint configuration: missing"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("⚠ .env file: missing"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("⚠ LLM API key (OPENAI or ANTHROPIC): not set"),
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("✖ @ferroui/schema package: missing"),
    );
  });

  it("should handle git found but not repo", async () => {
    process.env.OPENAI_API_KEY = "fake-key";
    vi.mocked(fs.existsSync).mockImplementation((p) => {
      if (typeof p === "string" && p.includes(".git")) return false; // not a repo
      return true;
    });
    vi.mocked(execSync).mockImplementation((cmd: any) => {
      if (typeof cmd === "string" && cmd.includes("node")) return "v18.17.0";
      if (typeof cmd === "string" && cmd.includes("git"))
        return "git version 2.39.2";
      return "ok";
    });
    await doctorCommand.parseAsync(["node", "doctor"]);
    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("⚠ Git repository: not initialized"),
    );
>>>>>>> 35868da (chore: final cleanup and enterprise alignment)
  });
});
