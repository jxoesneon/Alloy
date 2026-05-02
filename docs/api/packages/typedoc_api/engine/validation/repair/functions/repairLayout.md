[**@ferroui/engine**](../../../README.md)

***

> **repairLayout**(`provider`, `originalPrompt`, `invalidLayout`, `errors`, `context`, `attempt?`, `maxAttempts?`): `Promise`\<\{ `layout`: `FerroUIComponent`; `locale`: `string`; `metadata?`: \{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}; `requestId`: `string`; `schemaVersion`: `string`; \}\>

Defined in: [engine/src/validation/repair.ts:66](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/validation/repair.ts#L66)

Self-healing repair loop

## Parameters

### provider

[`LlmProvider`](../../../providers/base/interfaces/LlmProvider.md)

### originalPrompt

`string`

### invalidLayout

`any`

### errors

`ValidationIssue`[]

### context

[`RequestContext`](../../../types/interfaces/RequestContext.md)

### attempt?

`number` = `1`

### maxAttempts?

`number` = `3`

## Returns

`Promise`\<\{ `layout`: `FerroUIComponent`; `locale`: `string`; `metadata?`: \{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}; `requestId`: `string`; `schemaVersion`: `string`; \}\>
