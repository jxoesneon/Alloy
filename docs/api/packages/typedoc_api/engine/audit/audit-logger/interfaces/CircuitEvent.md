[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/audit/audit-logger.ts:62](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L62)

## Extends

- `BaseAuditEvent`

## Properties

### consecutiveFailures

> **consecutiveFailures**: `number`

Defined in: [engine/src/audit/audit-logger.ts:64](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L64)

***

### requestId

> **requestId**: `string`

Defined in: [engine/src/audit/audit-logger.ts:22](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L22)

#### Inherited from

`BaseAuditEvent.requestId`

***

### timestamp?

> `optional` **timestamp?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:24](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L24)

#### Inherited from

`BaseAuditEvent.timestamp`

***

### type

> **type**: [`CIRCUIT_OPEN`](../enumerations/AuditEventType.md#circuit_open) \| [`CIRCUIT_RESET`](../enumerations/AuditEventType.md#circuit_reset)

Defined in: [engine/src/audit/audit-logger.ts:63](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L63)

#### Overrides

`BaseAuditEvent.type`

***

### userId

> **userId**: `string`

Defined in: [engine/src/audit/audit-logger.ts:23](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L23)

#### Inherited from

`BaseAuditEvent.userId`
