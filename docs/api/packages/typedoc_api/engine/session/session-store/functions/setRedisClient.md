[**@ferroui/engine**](../../../README.md)

***

> **setRedisClient**(`client`): `void`

Defined in: [engine/src/session/session-store.ts:109](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/session/session-store.ts#L109)

Optionally inject a Redis client before the session store is created.
Call this during server startup if REDIS_URL is set.

## Parameters

### client

[`RedisSessionClientLike`](../interfaces/RedisSessionClientLike.md)

## Returns

`void`
