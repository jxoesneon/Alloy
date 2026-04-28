import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/*.d.ts",
        // Public API re-exports / type-only modules — not meaningful to cover
        "src/index.ts",
        "src/types.ts",
        "src/providers/base.ts",
        // Integration-tested only: exercised end-to-end via tests/integration.test.ts
        // (root-level vitest.config.ts). Bootstrap code not suitable for unit coverage.
        "src/server.ts",
        // Optional provider adapters requiring external services
        "src/providers/llama-cpp.ts",
        "src/providers/ollama.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
