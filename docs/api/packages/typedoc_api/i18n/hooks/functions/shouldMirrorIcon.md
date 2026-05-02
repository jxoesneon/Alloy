[**@ferroui/i18n**](../../README.md)

***

> **shouldMirrorIcon**(`iconName`, `direction`): `boolean`

Defined in: [hooks.ts:69](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/i18n/src/hooks.ts#L69)

Determines if an icon should be mirrored for RTL layouts.
Per i18n Guide §4.4

## Parameters

### iconName

`string`

The icon identifier

### direction

`"ltr"` \| `"rtl"`

The current text direction ('ltr' | 'rtl')

## Returns

`boolean`

true if the icon should be CSS-mirrored (transform: scaleX(-1))
