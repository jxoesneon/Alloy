[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/providers/ollama.ts:18](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L18)

## Implements

- [`LlmProvider`](../../base/interfaces/LlmProvider.md)

## Constructors

### Constructor

> **new OllamaProvider**(`options?`): `OllamaProvider`

Defined in: [engine/src/providers/ollama.ts:24](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L24)

#### Parameters

##### options?

[`OllamaProviderOptions`](../interfaces/OllamaProviderOptions.md) = `{}`

#### Returns

`OllamaProvider`

## Properties

### baseURL

> `private` **baseURL**: `string`

Defined in: [engine/src/providers/ollama.ts:21](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L21)

***

### contextWindowTokens

> `readonly` **contextWindowTokens**: `128000` = `128000`

Defined in: [engine/src/providers/ollama.ts:20](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L20)

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`contextWindowTokens`](../../base/interfaces/LlmProvider.md#contextwindowtokens)

***

### id

> `readonly` **id**: `"ollama"` = `'ollama'`

Defined in: [engine/src/providers/ollama.ts:19](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L19)

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`id`](../../base/interfaces/LlmProvider.md#id)

***

### model

> `private` **model**: `string`

Defined in: [engine/src/providers/ollama.ts:22](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L22)

## Methods

### completePrompt()

> **completePrompt**(`req`): `Promise`\<[`LlmResponse`](../../../types/interfaces/LlmResponse.md)\>

Defined in: [engine/src/providers/ollama.ts:79](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L79)

Non-streaming version for simpler tasks like repair or small data generation.

#### Parameters

##### req

[`LlmRequest`](../../../types/interfaces/LlmRequest.md)

#### Returns

`Promise`\<[`LlmResponse`](../../../types/interfaces/LlmResponse.md)\>

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`completePrompt`](../../base/interfaces/LlmProvider.md#completeprompt)

***

### estimateCost()

> **estimateCost**(`tokens`): `number`

Defined in: [engine/src/providers/ollama.ts:110](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L110)

Estimates cost (in cents) for a given token count.

#### Parameters

##### tokens

###### input

`number`

###### output

`number`

#### Returns

`number`

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`estimateCost`](../../base/interfaces/LlmProvider.md#estimatecost)

***

### estimateTokens()

> **estimateTokens**(`text`): `number`

Defined in: [engine/src/providers/ollama.ts:106](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L106)

Estimates tokens for a given text.

#### Parameters

##### text

`string`

#### Returns

`number`

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`estimateTokens`](../../base/interfaces/LlmProvider.md#estimatetokens)

***

### processPrompt()

> **processPrompt**(`req`): `AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>

Defined in: [engine/src/providers/ollama.ts:29](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/ollama.ts#L29)

Processes a prompt and returns an AsyncGenerator for streaming content.
Yields content chunks and eventually returns the final response object.

#### Parameters

##### req

[`LlmRequest`](../../../types/interfaces/LlmRequest.md)

#### Returns

`AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`processPrompt`](../../base/interfaces/LlmProvider.md#processprompt)
