---
title: "@ferroui/shared"
---

# @ferroui/shared

Internal utilities shared across FerroUI packages.

- **Source:** [`packages/shared`](https://github.com/jxoesneon/FerroUI/tree/main/packages/shared)
- **package.json:** [view on GitHub](https://github.com/jxoesneon/FerroUI/blob/main/packages/shared/package.json)

## Generated API

**@ferroui/shared**

---

# @ferroui/shared

Shared utilities, types, and constants for FerroUI.

```mermaid
graph TD
    S[FerroUI Shared] --> U[Utilities]
    S --> C[Constants]
    S --> T[Types]
    subgraph FerroUI Shared Library
        U
        C
        T
    end
```

## Installation

```bash
pnpm add @ferroui/shared
```

## Usage

```typescript
import { deepMerge, type AnyMap } from "@ferroui/shared";

const base = { a: 1, b: { c: 2 } };
const override = { b: { d: 3 } };

const merged = deepMerge(base, override);
// { a: 1, b: { c: 2, d: 3 } }
```

## API Reference

Varies by module.

## Configuration

N/A

## Examples

```typescript
import { deepMerge } from "@ferroui/shared";
```
