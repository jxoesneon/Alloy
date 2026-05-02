[**@ferroui/renderer**](../../README.md)

***

Defined in: [renderer/src/FerroUIRenderer.tsx:9](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L9)

## Properties

### fallback?

> `optional` **fallback?**: `ComponentType`\<\{ `props?`: `Record`\<`string`, `unknown`\>; `type`: `string`; \}\>

Defined in: [renderer/src/FerroUIRenderer.tsx:17](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L17)

Optional fallback component when a type is not found in the registry.

***

### layout

> **layout**: `FerroUIComponent` \| \{ `layout`: `FerroUIComponent`; `locale`: `string`; `metadata?`: \{ `cacheHit?`: `boolean`; `generatedAt`: `string`; `latencyMs?`: `number`; `model?`: `string`; `provider?`: `string`; `publicKey?`: `string`; `repairAttempts?`: `number`; `signature?`: `string`; \}; `requestId`: `string`; `schemaVersion`: `string`; \}

Defined in: [renderer/src/FerroUIRenderer.tsx:11](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L11)

The root layout object or root component tree.

***

### metadata?

> `optional` **metadata?**: `object`

Defined in: [renderer/src/FerroUIRenderer.tsx:13](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L13)

Optional metadata if passing only the component tree.

#### cacheHit?

> `optional` **cacheHit?**: `boolean`

#### generatedAt

> **generatedAt**: `string`

#### latencyMs?

> `optional` **latencyMs?**: `number`

#### model?

> `optional` **model?**: `string`

#### provider?

> `optional` **provider?**: `string`

#### publicKey?

> `optional` **publicKey?**: `string`

#### repairAttempts?

> `optional` **repairAttempts?**: `number`

#### signature?

> `optional` **signature?**: `string`

***

### overrides?

> `optional` **overrides?**: `Record`\<`string`, `ComponentType`\<`any`\>\>

Defined in: [renderer/src/FerroUIRenderer.tsx:22](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L22)

Optional override map: type → React component (takes priority over registry).

***

### strictProvenance?

> `optional` **strictProvenance?**: `boolean`

Defined in: [renderer/src/FerroUIRenderer.tsx:15](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L15)

If true, enables signature verification.
