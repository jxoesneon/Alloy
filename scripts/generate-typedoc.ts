import { spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const packages = [
  "engine",
  "schema",
  "registry",
  "tools",
  "i18n",
  "telemetry",
  "tokens",
  "renderer",
  "cli",
  "shared",
  "mcp-server",
  "vscode-extension",
];

async function main() {
  console.log("> Generating TypeDoc for all packages...");

  for (const pkg of packages) {
    const pkgPath = path.join(ROOT, "packages", pkg);
    if (!fs.existsSync(pkgPath)) {
      console.warn(`! Package ${pkg} not found at ${pkgPath}, skipping.`);
      continue;
    }

    const outDir = path.join(
      ROOT,
      "docs",
      "api",
      "packages",
      "typedoc_api",
      pkg,
    );
    console.log(`  - @ferroui/${pkg} -> ${outDir}`);

    try {
      // Use glob pattern to include all source files
      const entry = path.join(pkgPath, "src", "**", "*.{ts,tsx}");

      const tsconfig = path.join(pkgPath, "tsconfig.json");

      const posixEntry = entry.split(path.sep).join("/");
      const posixOutDir = outDir.split(path.sep).join("/");

      const args = [
        "exec",
        "typedoc",
        "--out",
        posixOutDir,
        "--plugin",
        "typedoc-plugin-markdown",
        posixEntry,
        "--hidePageTitle",
        "--hideBreadcrumbs",
        "--entryPointStrategy",
        "expand",
        "--cleanOutputDir",
        "true",
        "--excludeInternal",
        "false",
        "--excludePrivate",
        "false",
        "--excludeProtected",
        "false",
        "--excludeExternals",
        "false",
        "--exclude",
        "**/*.test.ts",
        "--exclude",
        "**/__tests__/*",
      ];

      if (fs.existsSync(tsconfig)) {
        args.push("--tsconfig", tsconfig.split(path.sep).join("/"));
      }

      spawnSync("pnpm", args, {
        stdio: "inherit",
        cwd: ROOT,
        shell: process.platform === "win32", // Required for .cmd files on Windows
      });
    } catch (err) {
      console.error(`    x Failed to generate TypeDoc for ${pkg}:`, err);
    }
  }
  console.log("OK TypeDoc generation complete.");
}

main().catch(console.error);
