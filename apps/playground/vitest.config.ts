import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ferroui/renderer": resolve(__dirname, "../../packages/renderer/src"),
      "@ferroui/registry": resolve(__dirname, "../../packages/registry/src"),
      "@ferroui/schema": resolve(__dirname, "../../packages/schema/src"),
    },
  },
  test: {
    name: "playground",
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.d.ts",
        "**/setupTests.ts",
        "**/main.tsx",
      ],
    },
  },
});
