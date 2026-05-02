[**@ferroui/schema**](../../README.md)

***

> `const` **FerroUIConfigSchema**: `ZodObject`\<\{ `dev`: `ZodOptional`\<`ZodObject`\<\{ `enginePort`: `ZodDefault`\<`ZodNumber`\>; `hotReload`: `ZodDefault`\<`ZodBoolean`\>; `inspectorPort`: `ZodDefault`\<`ZodNumber`\>; `port`: `ZodDefault`\<`ZodNumber`\>; \}, `$strip`\>\>; `framework`: `ZodOptional`\<`ZodObject`\<\{ `defaultProvider`: `ZodDefault`\<`ZodEnum`\<\{ `anthropic`: `"anthropic"`; `google`: `"google"`; `ollama`: `"ollama"`; `openai`: `"openai"`; \}\>\>; `schemaVersion`: `ZodDefault`\<`ZodString`\>; \}, `$strip`\>\>; `providers`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodObject`\<\{ `apiKey`: `ZodOptional`\<`ZodString`\>; `baseUrl`: `ZodOptional`\<`ZodString`\>; `model`: `ZodOptional`\<`ZodString`\>; \}, `$strip`\>\>\>; `registry`: `ZodOptional`\<`ZodObject`\<\{ `exclude`: `ZodDefault`\<`ZodArray`\<`ZodString`\>\>; `paths`: `ZodDefault`\<`ZodArray`\<`ZodString`\>\>; \}, `$strip`\>\>; `telemetry`: `ZodOptional`\<`ZodObject`\<\{ `enabled`: `ZodDefault`\<`ZodBoolean`\>; `exporter`: `ZodDefault`\<`ZodEnum`\<\{ `console`: `"console"`; `jaeger`: `"jaeger"`; `otlp`: `"otlp"`; \}\>\>; `jaegerUrl`: `ZodOptional`\<`ZodString`\>; \}, `$strip`\>\>; `tools`: `ZodOptional`\<`ZodObject`\<\{ `paths`: `ZodDefault`\<`ZodArray`\<`ZodString`\>\>; `timeout`: `ZodDefault`\<`ZodNumber`\>; \}, `$strip`\>\>; `validation`: `ZodOptional`\<`ZodObject`\<\{ `maxRepairAttempts`: `ZodDefault`\<`ZodNumber`\>; `strict`: `ZodDefault`\<`ZodBoolean`\>; \}, `$strip`\>\>; \}, `$strip`\>

Defined in: [config.ts:6](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/schema/src/config.ts#L6)

ferroui.config.ts schema — mirrors PRD-002 §6.1 ferroui.config.js specification.
