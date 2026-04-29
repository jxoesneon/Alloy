/**
 * Shared utilities for FerroUI monorepo.
 * Main entry point (Browser Safe).
 */
import crypto from "node:crypto";

export * from "./utils.js";

/**
 * Returns a unique request ID.
 * @deprecated Use crypto.randomUUID() directly or import from @ferroui/shared/node-crypto for server-side.
 */
export function generateRequestId(): string {
  // Use globalThis safely for modern environments
  if (
    typeof globalThis !== "undefined" &&
    (globalThis as any).crypto?.randomUUID
  ) {
    return (globalThis as any).crypto.randomUUID();
  }
  return crypto.randomUUID();
}
