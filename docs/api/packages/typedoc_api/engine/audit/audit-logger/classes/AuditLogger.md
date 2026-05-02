[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/audit/audit-logger.ts:120](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L120)

## Constructors

### Constructor

> **new AuditLogger**(`options?`): `AuditLogger`

Defined in: [engine/src/audit/audit-logger.ts:132](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L132)

#### Parameters

##### options?

[`AuditLoggerOptions`](../interfaces/AuditLoggerOptions.md) = `{}`

#### Returns

`AuditLogger`

## Properties

### db?

> `private` `optional` **db?**: `any`

Defined in: [engine/src/audit/audit-logger.ts:127](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L127)

***

### events

> `private` **events**: [`AuditEvent`](../type-aliases/AuditEvent.md)[] = `[]`

Defined in: [engine/src/audit/audit-logger.ts:125](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L125)

***

### filePath?

> `private` `optional` **filePath?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:122](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L122)

***

### hmacSecret?

> `private` `optional` **hmacSecret?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:124](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L124)

***

### lastHash

> `private` **lastHash**: `string` \| `null` = `null`

Defined in: [engine/src/audit/audit-logger.ts:128](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L128)

***

### output

> `private` **output**: `"memory"` \| `"sqlite"` \| `"console"` \| `"file"`

Defined in: [engine/src/audit/audit-logger.ts:121](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L121)

***

### ROTATE\_AFTER\_LINES

> `private` `readonly` **ROTATE\_AFTER\_LINES**: `10000` = `10_000`

Defined in: [engine/src/audit/audit-logger.ts:130](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L130)

***

### sqlitePath?

> `private` `optional` **sqlitePath?**: `string`

Defined in: [engine/src/audit/audit-logger.ts:123](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L123)

***

### writeCount

> `private` **writeCount**: `number` = `0`

Defined in: [engine/src/audit/audit-logger.ts:129](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L129)

***

### instance?

> `private` `static` `optional` **instance?**: `AuditLogger`

Defined in: [engine/src/audit/audit-logger.ts:126](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L126)

## Methods

### clear()

> **clear**(): `void`

Defined in: [engine/src/audit/audit-logger.ts:306](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L306)

#### Returns

`void`

***

### computeHmac()

> `private` **computeHmac**(`data`): `string`

Defined in: [engine/src/audit/audit-logger.ts:169](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L169)

#### Parameters

##### data

`string`

#### Returns

`string`

***

### getEvents()

> **getEvents**(`limit?`): [`AuditEvent`](../type-aliases/AuditEvent.md)[]

Defined in: [engine/src/audit/audit-logger.ts:297](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L297)

#### Parameters

##### limit?

`number`

#### Returns

[`AuditEvent`](../type-aliases/AuditEvent.md)[]

***

### initSqlite()

> `private` **initSqlite**(): `void`

Defined in: [engine/src/audit/audit-logger.ts:143](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L143)

#### Returns

`void`

***

### log()

> **log**(`event`): `void`

Defined in: [engine/src/audit/audit-logger.ts:218](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L218)

#### Parameters

##### event

[`AuditEvent`](../type-aliases/AuditEvent.md)

#### Returns

`void`

***

### rotateFileIfNeeded()

> `private` **rotateFileIfNeeded**(): `void`

Defined in: [engine/src/audit/audit-logger.ts:180](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L180)

#### Returns

`void`

***

### toJsonLines()

> **toJsonLines**(): `string`[]

Defined in: [engine/src/audit/audit-logger.ts:302](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L302)

#### Returns

`string`[]

***

### verifyChain()

> **verifyChain**(): `object`

Defined in: [engine/src/audit/audit-logger.ts:263](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L263)

#### Returns

`object`

##### reason?

> `optional` **reason?**: `string`

##### tamperedAt?

> `optional` **tamperedAt?**: `number`

##### valid

> **valid**: `boolean`

***

### getInstance()

> `static` **getInstance**(): `AuditLogger`

Defined in: [engine/src/audit/audit-logger.ts:197](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L197)

#### Returns

`AuditLogger`

***

### resetInstance()

> `static` **resetInstance**(): `void`

Defined in: [engine/src/audit/audit-logger.ts:214](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/audit/audit-logger.ts#L214)

#### Returns

`void`
