[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/providers/base.ts:3](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L3)

## Properties

### contextWindowTokens

> `readonly` **contextWindowTokens**: `number`

Defined in: [engine/src/providers/base.ts:5](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L5)

***

### id

> `readonly` **id**: `string`

Defined in: [engine/src/providers/base.ts:4](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L4)

## Methods

### completePrompt()

> **completePrompt**(`req`): `Promise`\<[`LlmResponse`](../../../types/interfaces/LlmResponse.md)\>

Defined in: [engine/src/providers/base.ts:18](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L18)

Non-streaming version for simpler tasks like repair or small data generation.

#### Parameters

##### req

[`LlmRequest`](../../../types/interfaces/LlmRequest.md)

#### Returns

`Promise`\<[`LlmResponse`](../../../types/interfaces/LlmResponse.md)\>

***

### estimateCost()

> **estimateCost**(`tokens`): `number`

Defined in: [engine/src/providers/base.ts:28](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L28)

Estimates cost (in cents) for a given token count.

#### Parameters

##### tokens

###### input

`number`

###### output

`number`

#### Returns

`number`

***

### estimateTokens()

> **estimateTokens**(`text`): `number`

Defined in: [engine/src/providers/base.ts:23](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L23)

Estimates tokens for a given text.

#### Parameters

##### text

`string`

#### Returns

`number`

***

### getHealthSnapshot()?

> `optional` **getHealthSnapshot**(): `Record`\<`string`, `any`\>

Defined in: [engine/src/providers/base.ts:33](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L33)

Optional health status.

#### Returns

`Record`\<`string`, `any`\>

***

### processPrompt()

> **processPrompt**(`req`): `AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>

Defined in: [engine/src/providers/base.ts:11](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/base.ts#L11)

Processes a prompt and returns an AsyncGenerator for streaming content.
Yields content chunks and eventually returns the final response object.

#### Parameters

##### req

[`LlmRequest`](../../../types/interfaces/LlmRequest.md)

#### Returns

`AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>
