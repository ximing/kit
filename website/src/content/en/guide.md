# Guide

Typed lodash-shaped utilities for humans and coding agents. Requires Node.js `>= 20` and evergreen browsers (ES2020).

## Install

```bash
pnpm add @rabjs/kit
```

```bash
npm install @rabjs/kit
```

```bash
yarn add @rabjs/kit
```

## Import styles

Named exports only. Three equivalent styles:

```ts
import { chunk, retry } from '@rabjs/kit';
import { chunk } from '@rabjs/kit/array';
import { chunk } from '@rabjs/kit/array/chunk';
```

Do not `import kit from '@rabjs/kit'` — there is no default export. `import * as kit from '@rabjs/kit'` is a namespace import, not a default.

## Tree-shaking

The package sets `"sideEffects": false` and publishes generated per-function `exports`. Named imports and deep paths both tree-shake. Prefer the style that matches the rest of your codebase.

## 1.0 breaking notes

- **No default export.** `import kit from '@rabjs/kit'` is not supported.
- **`remove` does not mutate.** It returns the matching items and leaves the input array unchanged. This differs from lodash.

```ts
import { remove } from '@rabjs/kit';

const arr = [1, 2, 3, 4, 5];
remove(arr, (n) => n > 3); // [4, 5]
arr; // [1, 2, 3, 4, 5]
```

Keepers: `arr.filter((item, i) => !predicate(item, i))` or `partition`.

- **`RetryOptions.backoff`** is a numeric multiplier (default `1`), not `'linear' | 'exponential'`.
- Dual ESM + CJS from tsdown. Do not hand-edit `package.json` `exports`.

`delay`, `timeout`, and `retry` accept an optional `AbortSignal`. Omitting it keeps the previous behavior.

## Coding agents

Install this repository as a plugin so an agent in another project knows kit conventions. Per-tool commands: [Skills](/kit/skills#install).

## Next

- [API catalog](/kit/api)
- [Agent guide](/kit/guide/agents)
- [Skills](/kit/skills)
