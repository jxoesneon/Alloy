[**@ferroui/schema**](../../README.md)

***

> `const` **EngineChunkSchema**: `ZodDiscriminatedUnion`\<\[`ZodObject`\<\{ `content`: `ZodOptional`\<`ZodString`\>; `phase`: `ZodNumber`; `type`: `ZodLiteral`\<[`PHASE`](../enumerations/EngineChunkType.md#phase)\>; \}, `$strip`\>, `ZodObject`\<\{ `toolCall`: `ZodObject`\<\{ `args`: `ZodRecord`\<`ZodString`, `ZodUnknown`\>; `name`: `ZodString`; \}, `$strip`\>; `type`: `ZodLiteral`\<[`TOOL_CALL`](../enumerations/EngineChunkType.md#tool_call)\>; \}, `$strip`\>, `ZodObject`\<\{ `toolOutput`: `ZodObject`\<\{ `name`: `ZodString`; `result`: `ZodUnknown`; \}, `$strip`\>; `type`: `ZodLiteral`\<[`TOOL_OUTPUT`](../enumerations/EngineChunkType.md#tool_output)\>; \}, `$strip`\>\], `"type"`\>

Defined in: [engine-chunk.ts:63](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/schema/src/engine-chunk.ts#L63)
