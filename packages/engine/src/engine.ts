import { RequestContext, EngineChunk, EngineConfig } from "./types.js";
import { LlmProvider } from "./providers/base.js";
import { runDualPhasePipeline } from "./pipeline/dual-phase.js";
import { tracer } from "@ferroui/telemetry";
import CryptoJS from "crypto-js";

export class FerroUIEngine {
  private provider: LlmProvider;
  private config: EngineConfig;

  constructor(provider: LlmProvider, config?: Partial<EngineConfig>) {
    this.provider = provider;
    this.config = {
      maxRepairAttempts: 3,
      cacheEnabled: true,
      toolTimeoutMs: 3000,
      ...config,
    };
  }

  /**
   * Main entry point for the FerroUI engine.
   * Processes a user prompt through the Dual-Phase Pipeline.
   */
  public async *process(
    prompt: string,
    context: RequestContext,
  ): AsyncGenerator<EngineChunk, void, undefined> {
    const promptHash = CryptoJS.SHA256(prompt.trim().toLowerCase()).toString();
    const span = tracer.startSpan("FerroUIEngine.process", {
      attributes: {
        "ferroui.prompt_hash": promptHash,
        "ferroui.userId_hash": CryptoJS.SHA256(context.userId).toString(),
        "ferroui.requestId": context.requestId,
      },
    });

    try {
      yield* runDualPhasePipeline(this.provider, prompt, context, this.config);
    } catch (error: any) {
      // Record exception with PII scrubbing (simulated here, but recording typed error)
      span.recordException(
        error instanceof Error ? error : new Error(String(error)),
      );

      const errorMessage = error?.message || "An unexpected error occurred.";
      const errorCode = error?.code || "ENGINE_FAILURE";

      // Determine if this is an unrecoverable failure (e.g. max repair attempts exceeded)
      const isUnrecoverable =
        errorMessage.includes("repair") ||
        errorMessage.includes("max attempts") ||
        errorCode === "REPAIR_FAILED";

      if (isUnrecoverable) {
        // Yield Safe Mode Layout instead of raw error chunk
        yield {
          type: "layout_chunk",
          layout: this.getSafeModeLayout(context.requestId, context.locale),
        };
        yield { type: "complete", content: "Fallback: Safe Mode Active" };
      } else {
        yield {
          type: "error",
          error: {
            code: "ENGINE_FAILURE",
            message: errorMessage,
            retryable: false,
          },
        };
      }
    } finally {
      span.end();
    }
  }

  /**
   * Generates a static, pre-built layout for use in Safe Mode.
   */
  private getSafeModeLayout(requestId: string, locale: string): any {
    return {
      schemaVersion: "1.0",
      requestId,
      locale,
      layout: {
        type: "Dashboard",
        id: "safe-mode-dashboard",
        children: [
          {
            type: "StatusBanner",
            id: "safe-mode-banner",
            props: {
              status: "error",
              title: "System in Safe Mode",
              message:
                "FerroUI encountered an unrecoverable error during UI generation. Repair attempts have been exhausted to prevent further instability.",
            },
          },
        ],
      },
    };
  }

  public setProvider(provider: LlmProvider): void {
    this.provider = provider;
  }

  public updateConfig(config: Partial<EngineConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }
}
