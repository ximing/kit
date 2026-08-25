# @rabjs/kit

[中文](./README.zh-CN.md)

![Build Status](https://github.com/ximing/kit/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/%40rabjs%2Fkit.svg)](https://badge.fury.io/js/%40rabjs%2Fkit)
[![codecov](https://codecov.io/gh/ximing/kit/branch/main/graph/badge.svg)](https://codecov.io/gh/ximing/kit)

Typed lodash-shaped utilities for humans and coding agents.

| Claim                                               | lodash                | es-toolkit | @rabjs/kit 1.0                    |
| --------------------------------------------------- | --------------------- | ---------- | --------------------------------- |
| lodash-shaped names / arity                         | yes                   | mostly     | yes, explicit                     |
| TypeScript-native, no `any` in public APIs          | no                    | yes        | yes                               |
| Immutable by default                                | no (`remove` mutates) | mixed      | yes                               |
| Dual ESM + CJS, generated `exports`                 | CJS-first             | yes        | yes (tsdown)                      |
| Agent assets (`llms.txt`, skills, plugin manifests) | no                    | no         | yes                               |
| Interactive Vite catalog docs                       | no                    | partial    | catalog-first + per-fn playground |

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

## Coding agent plugins

This library is meant to be used from coding agents as well as by people. Point an agent at [`llms.txt`](./llms.txt) or the [agent guide](https://ximing.github.io/kit/guide/agents).

[Agent Skills](https://code.claude.com/docs/en/claude-code/skills) live in [`skills/`](./skills):

| Skill                                                         | Purpose                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`using-rabjs-kit`](./skills/using-rabjs-kit)                 | When to pick kit vs native APIs, import styles, immutable `remove`. |
| [`adding-kit-function`](./skills/adding-kit-function)         | File layout, JSDoc, Vitest, catalog regen — for work in this repo.  |
| [`migrating-lodash-to-kit`](./skills/migrating-lodash-to-kit) | Name map, `remove` mutation difference, no `_.chain` / `fp`.        |

The skills are plain `SKILL.md` documents with no runtime dependency, so the same files work across coding tools. Installation differs by tool — if you use more than one, install separately for each. Copy-paste UI: [docs → Skills](https://ximing.github.io/kit/skills#install).

Do not copy them into `~/.grok/skills` or `~/.agents/skills`. Use the plugin command for your tool instead.

### Claude Code

```bash
/plugin marketplace add ximing/kit
/plugin install kit@kit
```

Or manually: `cp -r skills/using-rabjs-kit skills/adding-kit-function skills/migrating-lodash-to-kit ~/.claude/skills/`

### Codex App / Codex CLI

This repository doubles as a Codex plugin marketplace (see [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)), so no official listing is needed:

```bash
codex plugin marketplace add ximing/kit
codex plugin add kit@kit
```

In the Codex app or TUI you can also open `/plugins` and search for `kit` after adding the marketplace.

### Cursor

The plugin manifest lives at [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json). In Cursor Agent chat run `/add-plugin kit`, or search for `kit` in the plugin marketplace. Manually, copy the skill directories into `.cursor/skills/` of your project.

### Grok Build CLI

This repository is a Grok plugin marketplace (see [`.grok-plugin/marketplace.json`](.grok-plugin/marketplace.json)):

```bash
grok plugin marketplace add ximing/kit
grok plugin install kit --trust
```

You can also install the plugin directly from the repo:

```bash
grok plugin install ximing/kit --trust
```

### Kimi Code

```text
/plugins install https://github.com/ximing/kit
```

Then start a fresh session (`/new`) so the plugin loads.

### OpenCode

Working in this repository, [`.opencode/plugins/kit.js`](.opencode/plugins/kit.js) registers `skills/` automatically. In another project, add the plugin to `opencode.json` (global or project-level):

```json
{
  "plugin": ["kit@git+https://github.com/ximing/kit.git"]
}
```

If git install does not load (this package's `main` is the library, not the plugin), point OpenCode at the skills directory instead:

```json
{
  "skills": ["./path/to/kit/skills"]
}
```

### Pi

```bash
pi install git:github.com/ximing/kit
```

The package manifest in [`package.json`](package.json) declares the `skills/` directory for Pi's native skill discovery.

## Docs

Documentation: [https://ximing.github.io/kit/](https://ximing.github.io/kit/)

See [CONTRIBUTING.md](./CONTRIBUTING.md) to add a function or send a PR.

## License

MIT
