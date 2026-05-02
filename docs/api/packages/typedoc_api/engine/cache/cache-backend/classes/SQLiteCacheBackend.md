[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/cache/cache-backend.ts:88](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L88)

Cache Backend Abstraction — Semantic Caching spec §4

Provides a common interface for cache storage and implementations
for in-memory, Redis, and SQLite backends.

## Implements

- [`CacheBackend`](../interfaces/CacheBackend.md)

## Constructors

### Constructor

> **new SQLiteCacheBackend**(`db`): `SQLiteCacheBackend`

Defined in: [engine/src/cache/cache-backend.ts:89](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L89)

#### Parameters

##### db

`Database`

#### Returns

`SQLiteCacheBackend`

## Properties

### db

> `private` **db**: `Database`

Defined in: [engine/src/cache/cache-backend.ts:89](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L89)

## Methods

### clear()

> **clear**(): `Promise`\<`void`\>

Defined in: [engine/src/cache/cache-backend.ts:151](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L151)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`CacheBackend`](../interfaces/CacheBackend.md).[`clear`](../interfaces/CacheBackend.md#clear)

***

### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [engine/src/cache/cache-backend.ts:125](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L125)

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

Defined in: [engine/src/cache/cache-backend.ts:103](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L103)

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

Defined in: [engine/src/cache/cache-backend.ts:129](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L129)

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

Defined in: [engine/src/cache/cache-backend.ts:116](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/cache/cache-backend.ts#L116)

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
