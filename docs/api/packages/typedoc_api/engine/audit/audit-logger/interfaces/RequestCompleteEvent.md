[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/audit/audit-logger.ts:36](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L36)

## Extends

- `BaseAuditEvent`

## Properties

### cacheHit?

> `optional` **cacheHit?**: `boolean`

Defined in: [engine/src/audit/audit-logger.ts:41](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L41)

***

### durationMs

> **durationMs**: `number`

Defined in: [engine/src/audit/audit-logger.ts:39](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L39)

***

### hasSensitiveData?

> `optional` **hasSensitiveData?**: `boolean`

Defined in: [engine/src/audit/audit-logger.ts:42](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L42)

***

### isSuspicious?

> `optional` **isSuspicious?**: `boolean`

Defined in: [engine/src/audit/audit-logger.ts:43](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L43)

***

### repairAttempts?

> `optional` **repairAttempts?**: `number`

Defined in: [engine/src/audit/audit-logger.ts:40](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L40)

***

### requestId

> **requestId**: `string`

Defined in: [engine/src/audit/audit-logger.ts:22](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L22)

#### Inherited from

`BaseAuditEvent.requestId`

***

### success

> **success**: `boolean`

Defined in: [engine/src/audit/audit-logger.ts:38](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L38)

***

### tenantId?

> `optional` **tenantId?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:44](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L44)

***

### timestamp?

> `optional` **timestamp?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:24](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L24)

#### Inherited from

`BaseAuditEvent.timestamp`

***

### type

> **type**: [`REQUEST_COMPLETE`](../enumerations/AuditEventType.md#request_complete)

Defined in: [engine/src/audit/audit-logger.ts:37](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L37)

#### Overrides

`BaseAuditEvent.type`

***

### userId

> **userId**: `string`

Defined in: [engine/src/audit/audit-logger.ts:23](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L23)

#### Inherited from

`BaseAuditEvent.userId`
