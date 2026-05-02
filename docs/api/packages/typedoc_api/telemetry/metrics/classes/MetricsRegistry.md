[**@ferroui/telemetry**](../../README.md)

***

Defined in: [metrics.ts:62](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L62)

Common metrics registry

## Constructors

### Constructor

> `private` **new MetricsRegistry**(): `MetricsRegistry`

Defined in: [metrics.ts:92](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L92)

#### Returns

`MetricsRegistry`

## Properties

### cacheHits

> `readonly` **cacheHits**: `Counter`

Defined in: [metrics.ts:70](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L70)

***

### cacheMisses

> `readonly` **cacheMisses**: `Counter`

Defined in: [metrics.ts:71](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L71)

***

### llmCalls

> `readonly` **llmCalls**: `Counter`

Defined in: [metrics.ts:74](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L74)

***

### llmCost

> `readonly` **llmCost**: `Counter`

Defined in: [metrics.ts:78](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L78)

***

### llmDuration

> `readonly` **llmDuration**: `Histogram`

Defined in: [metrics.ts:75](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L75)

***

### llmTokensInput

> `readonly` **llmTokensInput**: `Counter`

Defined in: [metrics.ts:76](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L76)

***

### llmTokensOutput

> `readonly` **llmTokensOutput**: `Counter`

Defined in: [metrics.ts:77](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L77)

***

### meter

> `private` **meter**: `Meter`

Defined in: [metrics.ts:64](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L64)

***

### requestsDuration

> `readonly` **requestsDuration**: `Histogram`

Defined in: [metrics.ts:68](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L68)

***

### requestsErrors

> `readonly` **requestsErrors**: `Counter`

Defined in: [metrics.ts:69](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L69)

***

### requestsTotal

> `readonly` **requestsTotal**: `Counter`

Defined in: [metrics.ts:67](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L67)

***

### toolsCalls

> `readonly` **toolsCalls**: `Counter`

Defined in: [metrics.ts:81](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L81)

***

### toolsDuration

> `readonly` **toolsDuration**: `Histogram`

Defined in: [metrics.ts:82](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L82)

***

### toolsErrors

> `readonly` **toolsErrors**: `Counter`

Defined in: [metrics.ts:83](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L83)

***

### toolsTimeout

> `readonly` **toolsTimeout**: `Counter`

Defined in: [metrics.ts:84](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L84)

***

### validationFailed

> `readonly` **validationFailed**: `Counter`

Defined in: [metrics.ts:88](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L88)

***

### validationHallucinations

> `readonly` **validationHallucinations**: `Counter`

Defined in: [metrics.ts:90](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L90)

***

### validationRepairs

> `readonly` **validationRepairs**: `Counter`

Defined in: [metrics.ts:89](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L89)

***

### validationTotal

> `readonly` **validationTotal**: `Counter`

Defined in: [metrics.ts:87](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L87)

***

### instance

> `private` `static` **instance**: `MetricsRegistry`

Defined in: [metrics.ts:63](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L63)

## Methods

### getInstance()

> `static` **getInstance**(): `MetricsRegistry`

Defined in: [metrics.ts:166](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/metrics.ts#L166)

#### Returns

`MetricsRegistry`
