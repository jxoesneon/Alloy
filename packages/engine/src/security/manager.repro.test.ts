import { describe, it, expect } from "vitest";
import { securityManager } from "./manager.js";
import { Signer } from "./signer.js";

describe("SecurityManager Vulnerability Remediation", () => {
  describe("Prototype Pollution (js/remote-property-injection)", () => {
    it("is NOT vulnerable to prototype pollution via redactPII", () => {
      const payload = JSON.parse('{"__proto__": {"polluted": "yes"}}');
      securityManager.redactPII(payload);
      
      // @ts-expect-error: Intentional input for testing pollution
      expect({}.polluted).toBeUndefined();
    });

    it("is NOT vulnerable to prototype pollution via constructor in redactPII", () => {
      const payload = JSON.parse('{"constructor": {"prototype": {"polluted": "yes"}}}');
      securityManager.redactPII(payload);
      
      // @ts-expect-error: Intentional input for testing pollution
      expect({}.polluted).toBeUndefined();
    });
  });

  describe("Incomplete Sanitization (js/incomplete-multi-character-sanitization)", () => {
    it("correctly sanitizes multi-character injection in stripHtml", () => {
      const payload = "<<script>alert(1)</script>";
      const sanitized = securityManager.stripHtml(payload);
      
      expect(sanitized).toBe("alert(1)"); 
    });
    
    it("correctly handles malformed tags", () => {
        const payload = "<script/src=x onerror=alert(1)>"; 
        const sanitized = securityManager.stripHtml(payload);
        expect(sanitized).not.toContain("<script");
        expect(sanitized).not.toContain(">");
    });
  });

  describe("SecurityManager General Functionality", () => {
    it("handles non-string, non-object data", () => {
        expect(securityManager.redactPII(123)).toBe(123);
        expect(securityManager.redactPII(null)).toBe(null);
    });

    it("redacts sensitive keys", () => {
        const payload = { password: "secret123", other: "data" };
        const redacted = securityManager.redactPII(payload);
        expect(redacted.password).toBe("[REDACTED_SENSITIVE_KEY]");
        expect(redacted.other).toBe("data");
    });

    it("redacts PII in strings within objects", () => {
        const payload = { info: "Contact at test@example.com" };
        const redacted = securityManager.redactPII(payload);
        expect(redacted.info).toBe("Contact at [REDACTED_EMAIL]");
    });

    it("redacts stringified JSON", () => {
        const payload = JSON.stringify({ email: "test@example.com" });
        const redacted = securityManager.redactPII(payload);
        expect(redacted).toContain("[REDACTED_SENSITIVE_KEY]");
    });

    it("sanitizes for logs", () => {
        expect(securityManager.sanitizeForLog("line1\nline2")).toBe("line1 line2");
    });

    it("creates secure context", () => {
        const auth = { sub: "user-1", tenantId: "t-1", permissions: ["p1"] };
        const ctx = securityManager.createSecureContext({ extra: "data" }, auth);
        expect(ctx.userId).toBe("user-1");
        expect(ctx.tenantId).toBe("t-1");
        expect(ctx.permissions).toEqual(["p1"]);
        // @ts-expect-error: Intentional input for testing structure
        expect(ctx.extra).toBe("data");
    });

    it("manages key pair", () => {
        const pub = securityManager.getPublicKey();
        expect(pub).toBeDefined();
        const { publicKey, privateKey } = Signer.generateKeyPair();
        securityManager.setKeyPair(publicKey, privateKey);
        expect(securityManager.getPublicKey()).toBe(publicKey);
    });
    
    it("signs data", () => {
        const sig = securityManager.sign("data");
        expect(sig).toBeDefined();
        expect(typeof sig).toBe("string");
    });
  });
});
