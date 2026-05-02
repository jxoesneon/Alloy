[**@ferroui/renderer**](../../README.md)

***

> `const` **FerroUIRenderer**: `React.FC`\<[`FerroUIRendererProps`](../interfaces/FerroUIRendererProps.md)\>

Defined in: [renderer/src/FerroUIRenderer.tsx:270](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/renderer/src/FerroUIRenderer.tsx#L270)

FerroUIRenderer — the core layout renderer.

Takes an FerroUILayout root component and recursively renders it
using the component registry, with optional overrides and fallback.

## Example

```tsx
<FerroUIRenderer layout={ferrouiLayout} strictProvenance />
```
