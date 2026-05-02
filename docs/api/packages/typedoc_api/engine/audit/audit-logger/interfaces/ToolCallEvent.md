[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/audit/audit-logger.ts:27](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L27)

## Extends

- `BaseAuditEvent`

## Properties

### args

> **args**: `Record`\<`string`, `unknown`\>

Defined in: [engine/src/audit/audit-logger.ts:30](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L30)

***

### durationMs

> **durationMs**: `number`

Defined in: [engine/src/audit/audit-logger.ts:32](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L32)

***

### error?

> `optional` **error?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:33](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L33)

***

### requestId

> **requestId**: `string`

Defined in: [engine/src/audit/audit-logger.ts:22](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L22)

#### Inherited from

`BaseAuditEvent.requestId`

***

### success

> **success**: `boolean`

Defined in: [engine/src/audit/audit-logger.ts:31](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L31)

***

### timestamp?

> `optional` **timestamp?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:24](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L24)

#### Inherited from

`BaseAuditEvent.timestamp`

***

### toolName

> **toolName**: `string`

Defined in: [engine/src/audit/audit-logger.ts:29](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L29)

***

### type

> **type**: [`TOOL_CALL`](../enumerations/AuditEventType.md#tool_call)

Defined in: [engine/src/audit/audit-logger.ts:28](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L28)

#### Overrides

`BaseAuditEvent.type`

***

### userId

> **userId**: `string`

Defined in: [engine/src/audit/audit-logger.ts:23](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L23)

#### Inherited from

`BaseAuditEvent.userId`
