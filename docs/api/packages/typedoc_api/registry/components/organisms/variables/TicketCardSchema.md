[**@ferroui/registry**](../../../README.md)

***

> `const` **TicketCardSchema**: `ZodObject`\<\{ `aria`: `ZodObject`\<\{ `label`: `ZodString`; \}, `$strip`\>; `assignee`: `ZodOptional`\<`ZodString`\>; `id`: `ZodString`; `priority`: `ZodOptional`\<`ZodEnum`\<\{ `critical`: `"critical"`; `high`: `"high"`; `low`: `"low"`; `medium`: `"medium"`; \}\>\>; `status`: `ZodEnum`\<\{ `closed`: `"closed"`; `in_progress`: `"in_progress"`; `open`: `"open"`; `resolved`: `"resolved"`; \}\>; `title`: `ZodString`; \}, `$strip`\>

Defined in: [components/organisms.ts:166](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/registry/src/components/organisms.ts#L166)
