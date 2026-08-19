# @rabjs/kit

[中文](./README.zh-CN.md)

![Build Status](https://github.com/ximing/kit/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/%40rabjs%2Fkit.svg)](https://badge.fury.io/js/%40rabjs%2Fkit)
[![codecov](https://codecov.io/gh/ximing/kit/branch/main/graph/badge.svg)](https://codecov.io/gh/ximing/kit)

Typed lodash-shaped utilities for humans and coding agents.

| Claim                                          | lodash                | es-toolkit | @rabjs/kit 1.0                    |
| ---------------------------------------------- | --------------------- | ---------- | --------------------------------- |
| lodash-shaped names / arity                    | yes                   | mostly     | yes, explicit                     |
| TypeScript-native, no `any` in public APIs     | no                    | yes        | yes                               |
| Immutable by default                           | no (`remove` mutates) | mixed      | yes                               |
| Dual ESM + CJS, generated `exports`            | CJS-first             | yes        | yes (tsdown)                      |
| Agent assets (`llms.txt`, skills, `AGENTS.md`) | no                    | no         | yes                               |
| Interactive Vite catalog docs                  | no                    | partial    | catalog-first + per-fn playground |

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

Requires Node.js `>= 20`.

## Import

Root, category, or deep path — named exports only:

```ts
import { chunk, retry } from '@rabjs/kit';
import { chunk } from '@rabjs/kit/array';
import { chunk } from '@rabjs/kit/array/chunk';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## Breaking in 1.0

- **No default export.** `import kit from '@rabjs/kit'` is not supported. Use named imports (or `import * as kit`).
- **`remove` does not mutate.** It returns the matching items and leaves the input array unchanged. This differs from lodash.

```ts
import { remove } from '@rabjs/kit';

const arr = [1, 2, 3, 4, 5];
remove(arr, (n) => n > 3); // [4, 5]
arr; // [1, 2, 3, 4, 5]
```

## Categories

Representative functions (full list in [`llms.txt`](./llms.txt) and the [docs catalog](https://ximing.github.io/kit/)):

- **array** — `chunk`, `compact`, `uniq`, `flatten`, `remove`
- **object** — `cloneDeep`, `get`, `set`, `pick`, `merge`
- **string** — `camelCase`, `kebabCase`, `template`, `truncate`
- **function** — `debounce`, `throttle`, `memoize`, `curry`
- **number** — `clamp`, `random`, `range`, `sum`
- **is** — `isArray`, `isEmpty`, `isNil`, `isPlainObject`
- **date** — `format`, `parse`, `addDays`, `diffDays`
- **promise** — `delay`, `retry`, `timeout`, `parallel`
- **collection** — `groupBy`, `sortBy`, `partition`, `keyBy`
- **math** — `max`, `min`, `maxBy`, `sumBy`

## Agents

This library is meant to be used from coding agents as well as by people.

- API index: [`llms.txt`](./llms.txt)
- Repo skills: [`skills/`](./skills/) (`using-rabjs-kit`, `adding-kit-function`, `migrating-lodash-to-kit`)
- Agent guide: [https://ximing.github.io/kit/guide/agents](https://ximing.github.io/kit/guide/agents)

Skills live only in this repository. Do not copy them into `~/.grok/skills` or `~/.agents/skills`.

## Docs

Documentation: [https://ximing.github.io/kit/](https://ximing.github.io/kit/)

See [CONTRIBUTING.md](./CONTRIBUTING.md) to add a function or send a PR.

## License

MIT
