[**@ferroui/engine**](../../../README.md)

***

Defined in: [engine/src/prompts/loader.ts:15](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/prompts/loader.ts#L15)

PromptLoader dynamically loads versioned markdown system prompts 
and handles template variable replacement.

## Constructors

### Constructor

> **new PromptLoader**(`version?`): `PromptLoader`

Defined in: [engine/src/prompts/loader.ts:19](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/prompts/loader.ts#L19)

#### Parameters

##### version?

`string`

#### Returns

`PromptLoader`

## Properties

### baseDir

> `private` **baseDir**: `string`

Defined in: [engine/src/prompts/loader.ts:17](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/prompts/loader.ts#L17)

***

### pinnedVersion

> `private` `static` **pinnedVersion**: `string` \| `null` = `null`

Defined in: [engine/src/prompts/loader.ts:16](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/prompts/loader.ts#L16)

## Methods

### loadPrompt()

> **loadPrompt**(`name`, `variables`): `Promise`\<`string`\>

Defined in: [engine/src/prompts/loader.ts:54](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/prompts/loader.ts#L54)

Loads a prompt by name and replaces placeholders with provided variables.

#### Parameters

##### name

`string`

The name of the prompt file (without .md extension)

##### variables

`Record`\<`string`, `string`\>

A map of variable names to their values to replace in the prompt

#### Returns

`Promise`\<`string`\>

The processed prompt content

***

### setPinnedVersion()

> `static` **setPinnedVersion**(`version`): `void`

Defined in: [engine/src/prompts/loader.ts:43](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/engine/src/prompts/loader.ts#L43)

Sets a specific version to be used by all new instances of PromptLoader.
This overrides the environment variable but can still be overridden by constructor arguments.

#### Parameters

##### version

`string` \| `null`

The version string (e.g. "1.1") or null to clear pinning

#### Returns

`void`
