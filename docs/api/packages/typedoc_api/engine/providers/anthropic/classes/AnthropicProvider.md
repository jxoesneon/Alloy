[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/providers/anthropic.ts:27](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L27)

## Implements

- [`LlmProvider`](../../base/interfaces/LlmProvider.md)

## Constructors

### Constructor

> **new AnthropicProvider**(`options?`): `AnthropicProvider`

Defined in: [engine/src/providers/anthropic.ts:33](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L33)

#### Parameters

##### options?

[`AnthropicProviderOptions`](../interfaces/AnthropicProviderOptions.md) = `{}`

#### Returns

`AnthropicProvider`

## Properties

### client

> `private` **client**: `Anthropic`

Defined in: [engine/src/providers/anthropic.ts:30](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L30)

***

### contextWindowTokens

> `readonly` **contextWindowTokens**: `200000` = `200000`

Defined in: [engine/src/providers/anthropic.ts:29](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L29)

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`contextWindowTokens`](../../base/interfaces/LlmProvider.md#contextwindowtokens)

***

### id

> `readonly` **id**: `"anthropic"` = `'anthropic'`

Defined in: [engine/src/providers/anthropic.ts:28](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L28)

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`id`](../../base/interfaces/LlmProvider.md#id)

***

### model

> `private` **model**: `string`

Defined in: [engine/src/providers/anthropic.ts:31](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L31)

## Methods

### buildSystemParam()

> `private` **buildSystemParam**(`systemPrompt`, `enablePromptCache?`): `string` \| `ContentBlockParam`[]

Defined in: [engine/src/providers/anthropic.ts:41](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L41)

Builds system param — adds ephemeral cache_control when enablePromptCache is set (B2)

#### Parameters

##### systemPrompt

`string`

##### enablePromptCache?

`boolean`

#### Returns

`string` \| `ContentBlockParam`[]

***

### completePrompt()

> **completePrompt**(`req`): `Promise`\<[`LlmResponse`](../../../types/interfaces/LlmResponse.md)\>

Defined in: [engine/src/providers/anthropic.ts:118](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L118)

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

Defined in: [engine/src/providers/anthropic.ts:174](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L174)

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

Defined in: [engine/src/providers/anthropic.ts:170](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L170)

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

Defined in: [engine/src/providers/anthropic.ts:55](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/anthropic.ts#L55)

Processes a prompt and returns an AsyncGenerator for streaming content.
Yields content chunks and eventually returns the final response object.

#### Parameters

##### req

[`LlmRequest`](../../../types/interfaces/LlmRequest.md)

#### Returns

`AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`processPrompt`](../../base/interfaces/LlmProvider.md#processprompt)
