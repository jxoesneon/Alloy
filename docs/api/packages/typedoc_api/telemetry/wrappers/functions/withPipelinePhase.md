[**@ferroui/telemetry**](../../README.md)

***

> **withPipelinePhase**\<`T`\>(`phase`, `fn`, `requestId?`): `Promise`\<`T`\>

Defined in: [wrappers.ts:87](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/wrappers.ts#L87)

Wraps a pipeline phase with instrumentation

## Type Parameters

### T

`T`

## Parameters

### phase

[`PipelinePhase`](../../types/enumerations/PipelinePhase.md)

### fn

(`span`) => `Promise`\<`T`\>

### requestId?

`string`

## Returns

`Promise`\<`T`\>
