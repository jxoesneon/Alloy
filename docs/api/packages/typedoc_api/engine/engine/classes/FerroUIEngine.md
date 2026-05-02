[**@ferroui/engine**](../../README.md)

***

Defined in: [engine/src/engine.ts:7](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L7)

## Constructors

### Constructor

> **new FerroUIEngine**(`provider`, `config?`): `FerroUIEngine`

Defined in: [engine/src/engine.ts:11](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L11)

#### Parameters

##### provider

[`LlmProvider`](../../providers/base/interfaces/LlmProvider.md)

##### config?

`Partial`\<[`EngineConfig`](../../types/interfaces/EngineConfig.md)\>

#### Returns

`FerroUIEngine`

## Properties

### config

> `private` **config**: [`EngineConfig`](../../types/interfaces/EngineConfig.md)

Defined in: [engine/src/engine.ts:9](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L9)

***

### provider

> `private` **provider**: [`LlmProvider`](../../providers/base/interfaces/LlmProvider.md)

Defined in: [engine/src/engine.ts:8](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L8)

## Methods

### getSafeModeLayout()

> `private` **getSafeModeLayout**(`requestId`, `locale`): `any`

Defined in: [engine/src/engine.ts:80](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L80)

Generates a static, pre-built layout for use in Safe Mode.

#### Parameters

##### requestId

`string`

##### locale

`string`

#### Returns

`any`

***

### process()

> **process**(`prompt`, `context`): `AsyncGenerator`\<[`EngineChunk`](../../types/interfaces/EngineChunk.md), `void`, `undefined`\>

Defined in: [engine/src/engine.ts:25](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L25)

Main entry point for the FerroUI engine.
Processes a user prompt through the Dual-Phase Pipeline.

#### Parameters

##### prompt

`string`

##### context

[`RequestContext`](../../types/interfaces/RequestContext.md)

#### Returns

`AsyncGenerator`\<[`EngineChunk`](../../types/interfaces/EngineChunk.md), `void`, `undefined`\>

***

### setProvider()

> **setProvider**(`provider`): `void`

Defined in: [engine/src/engine.ts:104](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L104)

#### Parameters

##### provider

[`LlmProvider`](../../providers/base/interfaces/LlmProvider.md)

#### Returns

`void`

***

### updateConfig()

> **updateConfig**(`config`): `void`

Defined in: [engine/src/engine.ts:108](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/engine.ts#L108)

#### Parameters

##### config

`Partial`\<[`EngineConfig`](../../types/interfaces/EngineConfig.md)\>

#### Returns

`void`
