[**@ferroui/engine**](../../../README.md)

***

> **runDualPhasePipeline**(`initialProvider`, `inputPrompt`, `context`, `config`): `AsyncGenerator`\<[`EngineChunk`](../../../types/interfaces/EngineChunk.md), `void`, `undefined`\>

Defined in: [engine/src/pipeline/dual-phase.ts:97](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/pipeline/dual-phase.ts#L97)

## Parameters

### initialProvider

[`LlmProvider`](../../../providers/base/interfaces/LlmProvider.md)

### inputPrompt

`string`

### context

[`RequestContext`](../../../types/interfaces/RequestContext.md)

### config

[`EngineConfig`](../../../types/interfaces/EngineConfig.md)

## Returns

`AsyncGenerator`\<[`EngineChunk`](../../../types/interfaces/EngineChunk.md), `void`, `undefined`\>
