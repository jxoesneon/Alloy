[**@ferroui/engine**](../../../README.md)

***

> **tenantQuotaMiddleware**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: [engine/src/middleware/tenant-quota.ts:197](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/middleware/tenant-quota.ts#L197)

Express middleware that enforces per-tenant request quotas and budgets.
Must be placed after JSON body parsing so `req.body.context.tenantId` is available.
Skips quota enforcement on non-API paths.

## Parameters

### req

`Request`

### res

`Response`

### next

`NextFunction`

## Returns

`Promise`\<`void`\>
