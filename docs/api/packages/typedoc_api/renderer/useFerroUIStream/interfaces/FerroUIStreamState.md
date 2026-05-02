[**@ferroui/renderer**](../../README.md)

***

Defined in: [renderer/src/useFerroUIStream.ts:5](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L5)

## Properties

### cacheHit

> **cacheHit**: `boolean`

Defined in: [renderer/src/useFerroUIStream.ts:17](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L17)

Cache hit indicator.

***

### error

> **error**: `string` \| `null`

Defined in: [renderer/src/useFerroUIStream.ts:11](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L11)

Error from the stream or pipeline.

***

### layout

> **layout**: `FerroUIComponent` \| `null`

Defined in: [renderer/src/useFerroUIStream.ts:7](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L7)

Current layout tree (may be partial during streaming).

***

### loading

> **loading**: `boolean`

Defined in: [renderer/src/useFerroUIStream.ts:9](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L9)

Whether the stream is actively receiving data.

***

### phase

> **phase**: `1` \| `2` \| `null`

Defined in: [renderer/src/useFerroUIStream.ts:13](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L13)

Phase currently in progress (1 = data gathering, 2 = UI generation).

***

### toolCalls

> **toolCalls**: `object`[]

Defined in: [renderer/src/useFerroUIStream.ts:15](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/useFerroUIStream.ts#L15)

Tool calls made during Phase 1.

#### args

> **args**: `unknown`

#### name

> **name**: `string`

#### result?

> `optional` **result?**: `unknown`
