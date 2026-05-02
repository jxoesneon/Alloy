[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/cache/cache-backend.ts:60](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L60)

Cache Backend Abstraction — Semantic Caching spec §4

Provides a common interface for cache storage and implementations
for in-memory, Redis, and SQLite backends.

## Implements

- [`CacheBackend`](../interfaces/CacheBackend.md)

## Constructors

### Constructor

> **new RedisCacheBackend**(`client`): `RedisCacheBackend`

Defined in: [engine/src/cache/cache-backend.ts:61](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L61)

#### Parameters

##### client

`Redis`

#### Returns

`RedisCacheBackend`

## Properties

### client

> `private` **client**: `Redis`

Defined in: [engine/src/cache/cache-backend.ts:61](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L61)

## Methods

### clear()

> **clear**(): `Promise`\<`void`\>

Defined in: [engine/src/cache/cache-backend.ts:79](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L79)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`CacheBackend`](../interfaces/CacheBackend.md).[`clear`](../interfaces/CacheBackend.md#clear)

***

### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [engine/src/cache/cache-backend.ts:71](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L71)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`CacheBackend`](../interfaces/CacheBackend.md).[`delete`](../interfaces/CacheBackend.md#delete)

***

### get()

> **get**(`key`): `Promise`\<`string` \| `null`\>

Defined in: [engine/src/cache/cache-backend.ts:63](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L63)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `null`\>

#### Implementation of

[`CacheBackend`](../interfaces/CacheBackend.md).[`get`](../interfaces/CacheBackend.md#get)

***

### keys()

> **keys**(`pattern?`): `Promise`\<`string`[]\>

Defined in: [engine/src/cache/cache-backend.ts:75](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L75)

#### Parameters

##### pattern?

`string`

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`CacheBackend`](../interfaces/CacheBackend.md).[`keys`](../interfaces/CacheBackend.md#keys)

***

### set()

> **set**(`key`, `value`, `ttlMs`): `Promise`\<`void`\>

Defined in: [engine/src/cache/cache-backend.ts:67](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L67)

#### Parameters

##### key

`string`

##### value

`string`

##### ttlMs

`number`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`CacheBackend`](../interfaces/CacheBackend.md).[`set`](../interfaces/CacheBackend.md#set)
