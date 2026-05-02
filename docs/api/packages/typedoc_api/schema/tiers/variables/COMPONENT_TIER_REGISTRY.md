[**@ferroui/schema**](../../README.md)

***

> `const` **COMPONENT\_TIER\_REGISTRY**: `Record`\<`string`, [`ComponentTier`](../../types/enumerations/ComponentTier.md)\>

Defined in: [tiers.ts:23](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/schema/src/tiers.ts#L23)

Static fallback registry of component tier classifications.
Used when the runtime @ferroui/registry is not available.
Prefer calling syncTiersFromRegistry() at startup to populate from runtime.
