[**@ferroui/telemetry**](../../README.md)

***

> **withLlmCall**\<`T`\>(`info`, `fn`): `Promise`\<`T`\>

Defined in: [wrappers.ts:10](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/wrappers.ts#L10)

Wraps an LLM call with instrumentation

## Type Parameters

### T

`T`

## Parameters

### info

[`LlmCallInfo`](../../types/interfaces/LlmCallInfo.md)

### fn

(`span`) => `Promise`\<`T`\>

## Returns

`Promise`\<`T`\>
