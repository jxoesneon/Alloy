/**
 * Pact Contract Tests (B.5)
 * Consumer-driven contract tests for LLM provider integrations
 * @see https://pact.io/
 */

import { describe, it, expect } from "vitest";
import { PactV3, MatchersV3 } from "@pact-foundation/pact";
import * as path from "path";

// Mock provider clients for contract testing
const PROVIDER_NAME = "anthropic-provider";
const CONSUMER_NAME = "ferroui-engine";

describe("LLM Provider Contracts", () => {
  const provider = new PactV3({
    consumer: CONSUMER_NAME,
    provider: PROVIDER_NAME,
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "error",
  });

  describe("Anthropic Messages API Contract", () => {
    it("should create a message with valid request/response", async () => {
      provider.addInteraction({
        states: [{ description: "API is available" }],
        uponReceiving: "a valid messages request",
        withRequest: {
          method: "POST",
          path: "/v1/messages",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "valid-api-key",
            "anthropic-version": "2023-06-01",
          },
          body: {
            model: "claude-3-sonnet-20240229",
            max_tokens: 1024,
            messages: [{ role: "user", content: "Hello, Claude" }],
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            id: MatchersV3.string("msg_01ABC123"),
            type: "message",
            role: "assistant",
            content: [
              { type: "text", text: "Hello! How can I help you today?" },
            ],
            model: "claude-3-sonnet-20240229",
            stop_reason: "end_turn",
            usage: {
              input_tokens: MatchersV3.number(12),
              output_tokens: MatchersV3.number(10),
            },
          },
        },
      });

      await provider.executeTest(async (mockServer) => {
        const response = await fetch(`${mockServer.url}/v1/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "valid-api-key",
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1024,
            messages: [{ role: "user", content: "Hello, Claude" }],
          }),
        });

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.type).toBe("message");
        expect(body.role).toBe("assistant");
      });
    });
  });
});
