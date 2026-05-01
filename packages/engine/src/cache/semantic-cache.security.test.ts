import { describe, it, expect, beforeEach } from "vitest";
import { SemanticCache } from "./semantic-cache.js";
import { FerroUILayout } from "@ferroui/schema";

function makeLayout(requestId: string): FerroUILayout {
  return {
    schemaVersion: "1.0",
    requestId,
    locale: "en",
    layout: {
      id: "root",
      type: "container",
      props: {},
      children: [],
    } as unknown as FerroUILayout["layout"],
    metadata: { generatedAt: new Date().toISOString() },
  };
}

describe("SemanticCache Security", () => {
  let cache: SemanticCache;

  beforeEach(async () => {
    (
      SemanticCache as unknown as { instance: SemanticCache | undefined }
    ).instance = undefined;
    cache = SemanticCache.getInstance();
    await cache.clear();
  });

  it("invalidatePattern should escape regex special characters", async () => {
    const layout = makeLayout("security-layout");
    const toolOutputs = {
      "user-data": { result: "data", classification: "PUBLIC" },
    };
    // Cache an entry with tool "user-data"
    await cache.set("users", [], "u1", toolOutputs, layout, "PUBLIC");

    // If "user.data" is not escaped, it will match "user-data" because "." matches "-"
    await cache.invalidatePattern("user.data");

    // It should STILL be in cache because "user.data" (literal) != "user-data"
    const hit = await cache.get("users", [], "u1", toolOutputs);
    expect(hit).toBeDefined();
    expect(hit?.requestId).toBe("security-layout");
  });

  it("invalidatePattern should still support wildcard *", async () => {
    const layout = makeLayout("wildcard-layout");
    const toolOutputs = {
      "user.login": { result: "ok", classification: "PUBLIC" },
      "user.logout": { result: "ok", classification: "PUBLIC" },
    };
    await cache.set("user-actions", [], "u1", toolOutputs, layout, "PUBLIC");

    await cache.invalidatePattern("user.*");

    const miss = await cache.get("user-actions", [], "u1", toolOutputs);
    expect(miss).toBeUndefined();
  });

  it("invalidatePattern should handle regex injection attempts", async () => {
    // This could cause ReDoS or unexpected behavior if not escaped
    const dangerousPattern = "a(".repeat(100) + "b" + ")".repeat(100);
    await expect(
      cache.invalidatePattern(dangerousPattern),
    ).resolves.not.toThrow();
  });
});
