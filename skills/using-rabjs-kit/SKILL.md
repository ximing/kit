---
name: using-rabjs-kit
description: Use when writing application code that needs array, object, string, function, or promise helpers, or when choosing between native JavaScript APIs and @rabjs/kit.
---

# Using @rabjs/kit

```bash
pnpm add @rabjs/kit
```

## Imports

Named exports only. Three equivalent styles:

```ts
import { chunk, retry } from '@rabjs/kit';
import { chunk } from '@rabjs/kit/array';
import { chunk } from '@rabjs/kit/array/chunk';
```

Do **not** `import kit from '@rabjs/kit'` — there is no default export. `import * as kit from '@rabjs/kit'` is a namespace import, not a default.

Signatures, summaries, and the rest of the catalog: repo [`llms.txt`](../../llms.txt) or https://ximing.github.io/kit/.

## Native vs kit

Prefer the language builtin when it is the same operation:

| Need                        | Use                                  |
| --------------------------- | ------------------------------------ |
| Flatten one or more levels  | `array.flat(depth)`                  |
| Map then flatten            | `array.flatMap(...)`                 |
| Own keys / values / entries | `Object.keys` / `values` / `entries` |
| Pad a string                | `string.padStart` / `padEnd`         |
| Array check                 | `Array.isArray`                      |

Use `@rabjs/kit` when the operation is not a builtin, needs path/deep semantics, or you want lodash-shaped types:

- `groupBy`, `keyBy`, `partition`, `sortBy`, `orderBy`
- `cloneDeep`, `mergeDeep`, `get`, `set`
- `retry`, `timeout`, `delay` (optional `AbortSignal`)
- `debounce`, `throttle`, `memoize`
- `remove(array, predicate)` — returns matching items; **does not mutate** `array`

Replacing `lodash` / `lodash-es`: [`migrating-lodash-to-kit`](../migrating-lodash-to-kit/SKILL.md).
