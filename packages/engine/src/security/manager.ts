import { Signer } from "./signer.js";
import { RequestContext } from "../types.js";

/**
 * SecurityManager centralizes all hardening logic for the FerroUI Engine.
 * It manages the server's root-of-trust key pair, performs sanitization,
 * and handles PII redaction to prevent data leaks.
 */
export class SecurityManager {
  private static instance: SecurityManager;
  private readonly serverKeyPair: { publicKey: string; privateKey: string };

  private constructor() {
    // Phase 4: Use a stable key pair for the lifetime of the process.
    // In production, this would be loaded from a KMS.
    this.serverKeyPair = Signer.generateKeyPair();
  }

  /**
   * Overrides the default ephemeral key pair with a stable one (e.g. from env).
   */
  setKeyPair(publicKey: string, privateKey: string): void {
    (this as any).serverKeyPair = { publicKey, privateKey };
  }

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  getPublicKey(): string {
    return this.serverKeyPair.publicKey;
  }

  /**
   * Signs a data chunk with the server's private key.
   */
  sign(data: string): string {
    return Signer.sign(data, this.serverKeyPair.privateKey);
  }

  /**
   * Neutralizes potential log injection vectors by removing line breaks.
   */
  sanitizeForLog(text: string): string {
    return String(text).replace(/\n|\r/g, " ");
  }

  /**
   * Strips all HTML tags from a string to prevent injection in LLM prompts.
   * Uses a non-backtracking pattern and handles malformed/multi-character injections.
   */
  stripHtml(text: string): string {
    if (typeof text !== "string") return "";
    let sanitized = text.trim();
    // Non-regex, safe stripping for simple tags
    while (sanitized.indexOf("<") !== -1 && sanitized.indexOf(">") !== -1) {
      const start = sanitized.indexOf("<");
      const end = sanitized.indexOf(">", start);
      if (end === -1) break;
      sanitized = sanitized.substring(0, start) + sanitized.substring(end + 1);
    }
    return sanitized;
  }

  /**
   * Redacts PII (Personally Identifiable Information) from data objects or strings.
   * Handles recursive traversal of objects and stringified JSON.
   */
  redactPII(data: any): any {
    if (!data) return data;

    if (typeof data === "string") {
      // Robustness: Attempt to parse stringified JSON first
      try {
        if (data.startsWith("{") || data.startsWith("[")) {
          const parsed = JSON.parse(data);
          return JSON.stringify(this.redactPII(parsed));
        }
      } catch {
        // Not valid JSON, proceed to standard string redaction
      }

      // Non-backtracking, safer regexes for PII
      return data
        .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[REDACTED_EMAIL]")
        .replace(/\d{3}-\d{2}-\d{4}/g, "[REDACTED_SSN]")
        .replace(/(?:\d{4}-){3}\d{4}/g, "[REDACTED_CARD]")
        .replace(/[A-Z]{2}\d{2}[A-Z0-9]{11,30}/g, "[REDACTED_IBAN]")
        .replace(/\d{1,3}(?:\.\d{1,3}){3}/g, "[REDACTED_IP]")
        .replace(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, "[REDACTED_PHONE]");
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.redactPII(item));
    }

    if (typeof data === "object") {
      // Prevent prototype pollution by avoiding polluted keys
      const redacted: Record<string, any> = Object.create(null);
      for (const [key, value] of Object.entries(data)) {
        if (key === "__proto__" || key === "constructor") continue;

        const lowerKey = key.toLowerCase();

        // Sensitivity based on keys + recursive redaction of values
        if (
          [
            "ssn",
            "email",
            "password",
            "secret",
            "token",
            "card",
            "creditcard",
            "iban",
          ].some((k) => lowerKey.includes(k))
        ) {
          redacted[key] = "[REDACTED_SENSITIVE_KEY]";
        } else {
          redacted[key] = this.redactPII(value);
        }
      }
      return redacted;
    }

    return data;
  }

  /**
   * Strictly validates and constructs a RequestContext from a verified JWT payload.
   */
  createSecureContext(bodyContext: any, auth: any): RequestContext {
    return {
      ...bodyContext,
      userId: auth.sub ?? auth.userId, // Strictly from JWT
      tenantId: auth.tenantId ?? "default", // CRITICAL: Force from JWT, prevent spoofing
      permissions: auth.permissions ?? [], // Strictly from JWT
    };
  }
}

export const securityManager = SecurityManager.getInstance();
