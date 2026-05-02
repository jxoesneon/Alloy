[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/cache/semantic-cache.ts:26](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L26)

## Constructors

### Constructor

> `private` **new SemanticCache**(): `SemanticCache`

Defined in: [engine/src/cache/semantic-cache.ts:32](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L32)

#### Returns

`SemanticCache`

## Properties

### backend

> `private` **backend**: [`CacheBackend`](../../cache-backend/interfaces/CacheBackend.md)

Defined in: [engine/src/cache/semantic-cache.ts:28](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L28)

***

### maxSize

> `private` **maxSize**: `number` = `1000`

Defined in: [engine/src/cache/semantic-cache.ts:30](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L30)

***

### usageOrder

> `private` **usageOrder**: `Set`\<`string`\>

Defined in: [engine/src/cache/semantic-cache.ts:29](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L29)

***

### instance

> `private` `static` **instance**: `SemanticCache`

Defined in: [engine/src/cache/semantic-cache.ts:27](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L27)

## Methods

### clear()

> **clear**(): `Promise`\<`void`\>

Defined in: [engine/src/cache/semantic-cache.ts:262](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L262)

#### Returns

`Promise`\<`void`\>

***

### generateKey()

> `private` **generateKey**(`prompt`, `permissions`, `userId`, `toolOutputs`, `classification`): `string`

Defined in: [engine/src/cache/semantic-cache.ts:223](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L223)

#### Parameters

##### prompt

`string`

##### permissions

`string`[]

##### userId

`string`

##### toolOutputs

`Record`\<`string`, `unknown`\>

##### classification

[`DataClassification`](../type-aliases/DataClassification.md)

#### Returns

`string`

***

### get()

> **get**(`prompt`, `permissions`, `userId`, `toolOutputs`): `Promise`\<\{ `layout`: `FerroUIComponent`; `locale`: `string`; `metadata?`: \{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}; `requestId`: `string`; `schemaVersion`: `string`; \} \| `undefined`\>

Defined in: [engine/src/cache/semantic-cache.ts:69](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L69)

#### Parameters

##### prompt

`string`

##### permissions

`string`[]

##### userId

`string`

##### toolOutputs

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<\{ `layout`: `FerroUIComponent`; `locale`: `string`; `metadata?`: \{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}; `requestId`: `string`; `schemaVersion`: `string`; \} \| `undefined`\>

***

### invalidate()

> **invalidate**(`toolName`, `params?`): `Promise`\<`void`\>

Defined in: [engine/src/cache/semantic-cache.ts:179](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L179)

#### Parameters

##### toolName

`string`

##### params?

`unknown`

#### Returns

`Promise`\<`void`\>

***

### invalidatePattern()

> **invalidatePattern**(`pattern`): `Promise`\<`void`\>

Defined in: [engine/src/cache/semantic-cache.ts:205](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L205)

#### Parameters

##### pattern

`string`

#### Returns

`Promise`\<`void`\>

***

### resolveClassification()

> `private` **resolveClassification**(`toolOutputs`): [`DataClassification`](../type-aliases/DataClassification.md)

Defined in: [engine/src/cache/semantic-cache.ts:55](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L55)

#### Parameters

##### toolOutputs

`Record`\<`string`, `unknown`\>

#### Returns

[`DataClassification`](../type-aliases/DataClassification.md)

***

### set()

> **set**(`prompt`, `permissions`, `userId`, `toolOutputs`, `layout`, `classification`): `Promise`\<`void`\>

Defined in: [engine/src/cache/semantic-cache.ts:136](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L136)

#### Parameters

##### prompt

`string`

##### permissions

`string`[]

##### userId

`string`

##### toolOutputs

`Record`\<`string`, `unknown`\>

##### layout

###### layout

`FerroUIComponent`

###### locale

`string`

###### metadata?

\{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}

###### metadata.cacheHit?

`boolean`

###### metadata.generatedAt

`string`

###### metadata.latencyMs?

`number`

###### metadata.model?

`string`

###### metadata.provider?

`string`

###### metadata.publicKey?

`string`

###### metadata.repairAttempts?

`number`

###### metadata.signature?

`string`

###### requestId

`string`

###### schemaVersion

`string`

##### classification

[`DataClassification`](../type-aliases/DataClassification.md)

#### Returns

`Promise`\<`void`\>

***

### setBackend()

> **setBackend**(`backend`): `void`

Defined in: [engine/src/cache/semantic-cache.ts:41](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L41)

#### Parameters

##### backend

[`CacheBackend`](../../cache-backend/interfaces/CacheBackend.md)

#### Returns

`void`

***

### setMaxSize()

> **setMaxSize**(`size`): `void`

Defined in: [engine/src/cache/semantic-cache.ts:46](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L46)

#### Parameters

##### size

`number`

#### Returns

`void`

***

### signEntry()

> `private` **signEntry**(`layout`, `toolOutputs`, `timestamp`): `string`

Defined in: [engine/src/cache/semantic-cache.ts:118](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L118)

#### Parameters

##### layout

###### layout

`FerroUIComponent`

###### locale

`string`

###### metadata?

\{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}

###### metadata.cacheHit?

`boolean`

###### metadata.generatedAt

`string`

###### metadata.latencyMs?

`number`

###### metadata.model?

`string`

###### metadata.provider?

`string`

###### metadata.publicKey?

`string`

###### metadata.repairAttempts?

`number`

###### metadata.signature?

`string`

###### requestId

`string`

###### schemaVersion

`string`

##### toolOutputs

`Record`\<`string`, `unknown`\>

##### timestamp

`number`

#### Returns

`string`

***

### touch()

> `private` **touch**(`key`): `void`

Defined in: [engine/src/cache/semantic-cache.ts:50](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L50)

#### Parameters

##### key

`string`

#### Returns

`void`

***

### verifyEntry()

> `private` **verifyEntry**(`entry`): `boolean`

Defined in: [engine/src/cache/semantic-cache.ts:127](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L127)

#### Parameters

##### entry

[`CacheEntry`](../interfaces/CacheEntry.md)

#### Returns

`boolean`

***

### getInstance()

> `static` **getInstance**(): `SemanticCache`

Defined in: [engine/src/cache/semantic-cache.ts:34](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/semantic-cache.ts#L34)

#### Returns

`SemanticCache`
