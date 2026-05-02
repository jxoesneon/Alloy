[**@ferroui/engine**](../../../README.md)

***

> **signToken**(`payload`, `opts?`): `string`

Defined in: [engine/src/auth/jwt.ts:118](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/auth/jwt.ts#L118)

## Parameters

### payload

`Omit`\<[`JwtPayload`](../interfaces/JwtPayload.md), `"iat"` \| `"exp"`\>

### opts?

`Pick`\<[`AuthOptions`](../interfaces/AuthOptions.md), `"secret"` \| `"expiresIn"`\> = `{}`

## Returns

`string`
