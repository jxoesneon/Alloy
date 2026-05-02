[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/providers/router.ts:41](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L41)

## Implements

- [`LlmProvider`](../../base/interfaces/LlmProvider.md)

## Constructors

### Constructor

> **new ProviderRouter**(`providers`): `ProviderRouter`

Defined in: [engine/src/providers/router.ts:47](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L47)

#### Parameters

##### providers

[`RoutedProvider`](../interfaces/RoutedProvider.md)[]

#### Returns

`ProviderRouter`

## Properties

### contextWindowTokens

> `readonly` **contextWindowTokens**: `number`

Defined in: [engine/src/providers/router.ts:43](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L43)

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`contextWindowTokens`](../../base/interfaces/LlmProvider.md#contextwindowtokens)

***

### health

> `private` **health**: `Map`\<`string`, [`ProviderHealth`](../interfaces/ProviderHealth.md)\>

Defined in: [engine/src/providers/router.ts:45](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L45)

***

### id

> `readonly` **id**: `"router"` = `"router"`

Defined in: [engine/src/providers/router.ts:42](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L42)

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`id`](../../base/interfaces/LlmProvider.md#id)

***

### providers

> `private` `readonly` **providers**: [`RoutedProvider`](../interfaces/RoutedProvider.md)[]

Defined in: [engine/src/providers/router.ts:47](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L47)

## Methods

### completePrompt()

> **completePrompt**(`req`): `Promise`\<[`LlmResponse`](../../../types/interfaces/LlmResponse.md)\>

Defined in: [engine/src/providers/router.ts:138](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L138)

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

Defined in: [engine/src/providers/router.ts:161](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L161)

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

Defined in: [engine/src/providers/router.ts:154](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L154)

Estimates tokens for a given text.

#### Parameters

##### text

`string`

#### Returns

`number`

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`estimateTokens`](../../base/interfaces/LlmProvider.md#estimatetokens)

***

### getHealth()

> `private` **getHealth**(`providerId`): [`ProviderHealth`](../interfaces/ProviderHealth.md)

Defined in: [engine/src/providers/router.ts:60](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L60)

#### Parameters

##### providerId

`string`

#### Returns

[`ProviderHealth`](../interfaces/ProviderHealth.md)

***

### getHealthSnapshot()

> **getHealthSnapshot**(): `Record`\<`string`, [`ProviderHealth`](../interfaces/ProviderHealth.md) & `object`\>

Defined in: [engine/src/providers/router.ts:92](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L92)

Optional health status.

#### Returns

`Record`\<`string`, [`ProviderHealth`](../interfaces/ProviderHealth.md) & `object`\>

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`getHealthSnapshot`](../../base/interfaces/LlmProvider.md#gethealthsnapshot)

***

### isHealthy()

> `private` **isHealthy**(`providerId`): `boolean`

Defined in: [engine/src/providers/router.ts:100](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L100)

#### Parameters

##### providerId

`string`

#### Returns

`boolean`

***

### processPrompt()

> **processPrompt**(`req`): `AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>

Defined in: [engine/src/providers/router.ts:118](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L118)

Processes a prompt and returns an AsyncGenerator for streaming content.
Yields content chunks and eventually returns the final response object.

#### Parameters

##### req

[`LlmRequest`](../../../types/interfaces/LlmRequest.md)

#### Returns

`AsyncGenerator`\<`string`, [`LlmResponse`](../../../types/interfaces/LlmResponse.md), `undefined`\>

#### Implementation of

[`LlmProvider`](../../base/interfaces/LlmProvider.md).[`processPrompt`](../../base/interfaces/LlmProvider.md#processprompt)

***

### recordFailure()

> `private` **recordFailure**(`providerId`): `void`

Defined in: [engine/src/providers/router.ts:77](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L77)

#### Parameters

##### providerId

`string`

#### Returns

`void`

***

### recordSuccess()

> `private` **recordSuccess**(`providerId`): `void`

Defined in: [engine/src/providers/router.ts:70](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L70)

#### Parameters

##### providerId

`string`

#### Returns

`void`

***

### selectCandidates()

> `private` **selectCandidates**(): [`RoutedProvider`](../interfaces/RoutedProvider.md)[]

Defined in: [engine/src/providers/router.ts:112](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/providers/router.ts#L112)

#### Returns

[`RoutedProvider`](../interfaces/RoutedProvider.md)[]
