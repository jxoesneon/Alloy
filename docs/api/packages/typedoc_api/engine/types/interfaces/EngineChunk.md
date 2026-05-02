[**@ferroui/engine**](../../README.md)

***

Defined in: [engine/src/types.ts:46](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L46)

## Properties

### content?

> `optional` **content?**: `string`

Defined in: [engine/src/types.ts:55](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L55)

***

### error?

> `optional` **error?**: `object`

Defined in: [engine/src/types.ts:65](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L65)

#### code

> **code**: `string`

#### message

> **message**: `string`

#### retryable

> **retryable**: `boolean`

***

### layout?

> `optional` **layout?**: `Partial`\<\{ `layout`: `FerroUIComponent`; `locale`: `string`; `metadata?`: \{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}; `requestId`: `string`; `schemaVersion`: `string`; \}\>

Defined in: [engine/src/types.ts:64](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L64)

***

### phase?

> `optional` **phase?**: `1` \| `2`

Defined in: [engine/src/types.ts:54](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L54)

***

### publicKey?

> `optional` **publicKey?**: `string`

Defined in: [engine/src/types.ts:73](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L73)

Public key used to verify the signature

***

### signature?

> `optional` **signature?**: `string`

Defined in: [engine/src/types.ts:71](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L71)

Ed25519 signature of the chunk content (for layout_chunks)

***

### toolCall?

> `optional` **toolCall?**: `object`

Defined in: [engine/src/types.ts:56](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L56)

#### args

> **args**: `any`

#### name

> **name**: `string`

***

### toolOutput?

> `optional` **toolOutput?**: `object`

Defined in: [engine/src/types.ts:60](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L60)

#### name

> **name**: `string`

#### result

> **result**: `any`

***

### type

> **type**: `"phase"` \| `"tool_call"` \| `"tool_output"` \| `"layout_chunk"` \| `"complete"` \| `"error"`

Defined in: [engine/src/types.ts:47](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L47)
