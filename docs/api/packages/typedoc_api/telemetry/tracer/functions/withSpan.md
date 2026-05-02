[**@ferroui/telemetry**](../../README.md)

***

> **withSpan**\<`T`\>(`name`, `fn`, `options?`, `ctx?`): `Promise`\<`T`\>

Defined in: [tracer.ts:84](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/tracer.ts#L84)

Executes a function within a span

## Type Parameters

### T

`T`

## Parameters

### name

`string`

### fn

(`span`) => `Promise`\<`T`\>

### options?

`SpanOptions`

### ctx?

`Context`

## Returns

`Promise`\<`T`\>
