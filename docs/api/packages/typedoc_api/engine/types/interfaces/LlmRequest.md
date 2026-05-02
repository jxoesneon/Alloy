[**@ferroui/engine**](../../README.md)

***

Defined in: [engine/src/types.ts:17](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L17)

## Properties

### conversationContext?

> `optional` **conversationContext?**: `string`[]

Defined in: [engine/src/types.ts:20](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L20)

***

### enablePromptCache?

> `optional` **enablePromptCache?**: `boolean`

Defined in: [engine/src/types.ts:34](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L34)

When true, marks the system prompt as a candidate for provider-level
prompt caching (Anthropic ephemeral cache / OpenAI cached prefix).

***

### jsonMode?

> `optional` **jsonMode?**: `boolean`

Defined in: [engine/src/types.ts:29](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L29)

When true, instructs the provider to return valid JSON only.
- OpenAI: sets response_format = { type: 'json_object' }
- Anthropic: wraps response in a structured_json tool call
- Other providers: no-op (rely on prompt instruction)

***

### maxTokens?

> `optional` **maxTokens?**: `number`

Defined in: [engine/src/types.ts:22](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L22)

***

### systemPrompt

> **systemPrompt**: `string`

Defined in: [engine/src/types.ts:18](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L18)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [engine/src/types.ts:21](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L21)

***

### userPrompt

> **userPrompt**: `string`

Defined in: [engine/src/types.ts:19](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/types.ts#L19)
