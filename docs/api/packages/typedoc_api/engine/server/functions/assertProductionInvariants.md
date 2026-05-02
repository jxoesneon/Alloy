[**@ferroui/engine**](../../README.md)

***

> **assertProductionInvariants**(`env?`): `void`

Defined in: [engine/src/server.ts:159](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/server.ts#L159)

Production-mode invariants (F-026 hardening).
Throws early if any unsafe configuration would ship to prod.
Exported for test coverage of the guard logic itself.

## Parameters

### env?

`ProcessEnv` = `process.env`

## Returns

`void`
