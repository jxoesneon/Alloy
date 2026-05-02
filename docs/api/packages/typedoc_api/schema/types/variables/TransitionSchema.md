[**@ferroui/schema**](../../README.md)

***

> `const` **TransitionSchema**: `ZodObject`\<\{ `action`: `ZodOptional`\<`ZodDiscriminatedUnion`\<\[`ZodObject`\<\{ `payload`: `ZodObject`\<\{ `params`: `ZodOptional`\<`ZodRecord`\<..., ...\>\>; `path`: `ZodString`; \}, `$strip`\>; `type`: `ZodLiteral`\<`"NAVIGATE"`\>; \}, `$strip`\>, `ZodObject`\<\{ `payload`: `ZodObject`\<\{ `duration`: `ZodOptional`\<`ZodNumber`\>; `message`: `ZodString`; `variant`: `ZodEnum`\<\{ `error`: ...; `info`: ...; `success`: ...; `warning`: ...; \}\>; \}, `$strip`\>; `type`: `ZodLiteral`\<`"SHOW_TOAST"`\>; \}, `$strip`\>, `ZodObject`\<\{ `payload`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `type`: `ZodLiteral`\<`"REFRESH"`\>; \}, `$strip`\>, `ZodObject`\<\{ `payload`: `ZodObject`\<\{ `args`: `ZodRecord`\<`ZodString`, `ZodUnknown`\>; `tool`: `ZodString`; \}, `$strip`\>; `type`: `ZodLiteral`\<`"TOOL_CALL"`\>; \}, `$strip`\>, `ZodObject`\<\{ `payload`: `ZodObject`\<\{ `id`: `ZodString`; `state`: `ZodRecord`\<`ZodString`, `ZodUnknown`\>; \}, `$strip`\>; `type`: `ZodLiteral`\<`"STATE_UPDATE"`\>; \}, `$strip`\>\], `"type"`\>\>; `condition`: `ZodOptional`\<`ZodString`\>; `target`: `ZodString`; \}, `$strip`\>

Defined in: [types.ts:83](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/schema/src/types.ts#L83)

Layout Actions State Machines (RFC-001)
