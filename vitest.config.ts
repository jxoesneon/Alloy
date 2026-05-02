import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Root-level vitest config — only for tests/ directory (integration tests).
 * Package-level unit tests have their own vitest.config.ts under each package.
 */
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts"],
    exclude: ["packages/**", "apps/**", "node_modules/**"],
    testTimeout: 30000,
    hookTimeout: 30000,
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    alias: {
      "@ferroui/engine": path.resolve(__dirname, "./packages/engine/src"),
      "@ferroui/registry": path.resolve(__dirname, "./packages/registry/src"),
      "@ferroui/schema": path.resolve(__dirname, "./packages/schema/src"),
      "@ferroui/tools": path.resolve(__dirname, "./packages/tools/src"),
      "@ferroui/telemetry": path.resolve(__dirname, "./packages/telemetry/src"),
      "@ferroui/i18n": path.resolve(__dirname, "./packages/i18n/src"),
      "@ferroui/renderer": path.resolve(__dirname, "./packages/renderer/src"),
    },
  },
});
