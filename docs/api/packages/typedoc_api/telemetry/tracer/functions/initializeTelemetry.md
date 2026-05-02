[**@ferroui/telemetry**](../../README.md)

***

> **initializeTelemetry**(`serviceName?`): `BasicTracerProvider`

Defined in: [tracer.ts:30](https://github.com/jxoesneon/FerroUI/blob/43f31a9c88cc61ac36f959f0f168a9323f8272f2/packages/telemetry/src/tracer.ts#L30)

Initializes the telemetry SDK — traces + metrics — with OTLP or console exporters.
Call once at server startup before any instrumented code runs.

## Parameters

### serviceName?

`string` = `'ferroui-ui'`

## Returns

`BasicTracerProvider`
