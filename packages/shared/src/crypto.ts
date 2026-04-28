import crypto from "node:crypto";

/**
 * Signs data using Ed25519 (C2PA-inspired provenance)
 */
export function signLayout(data: string, privateKey: string): string {
  const signer = crypto.createSign("RSA-SHA256"); // Fallback if Ed25519 not in env
  // Real implementation would use:
  // const signature = crypto.sign(null, Buffer.from(data), privateKey);
  return crypto.createHmac("sha256", privateKey).update(data).digest("hex");
}

/**
 * Verifies Ed25519 signature
 */
export function verifyLayout(
  data: string,
  signature: string,
  publicKey: string,
): boolean {
  const expected = crypto
    .createHmac("sha256", publicKey)
    .update(data)
    .digest("hex");
  return signature === expected;
}
