# @rabjs/kit

[English](./README.md)

![Build Status](https://github.com/ximing/kit/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/%40rabjs%2Fkit.svg)](https://badge.fury.io/js/%40rabjs%2Fkit)
[![codecov](https://codecov.io/gh/ximing/kit/branch/main/graph/badge.svg)](https://codecov.io/gh/ximing/kit)

给人和 coding agent 用的、lodash 风格的 TypeScript 工具库。

| 对比项                                        | lodash                    | es-toolkit | @rabjs/kit 1.0                   |
| --------------------------------------------- | ------------------------- | ---------- | -------------------------------- |
| lodash 风格的函数名 / 参数顺序                | 是                        | 大多是     | 是，明确对齐                     |
| TypeScript 原生，公开 API 不含 `any`          | 否                        | 是         | 是                               |
| 默认不可变                                    | 否（`remove` 会改原数组） | 混用       | 是                               |
| 双格式 ESM + CJS，自动生成 `exports`          | 以 CJS 为主               | 是         | 是（tsdown）                     |
| Agent 资源（`llms.txt`、skills、`AGENTS.md`） | 否                        | 否         | 是                               |
| 可交互的 Vite 目录文档                        | 否                        | 部分       | 目录优先 + 每个函数的 playground |

## 安装

```bash
pnpm add @rabjs/kit
```

```bash
npm install @rabjs/kit
```

```bash
yarn add @rabjs/kit
```

需要 Node.js `>= 20`。

## 导入

根入口、分类入口、或函数深路径 — 仅具名导出：

```ts
import { chunk, retry } from '@rabjs/kit';
import { chunk } from '@rabjs/kit/array';
import { chunk } from '@rabjs/kit/array/chunk';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## 1.0 破坏性变更

- **没有 default export。** 不支持 `import kit from '@rabjs/kit'`。请用具名导入（或 `import * as kit`）。
- **`remove` 不会修改原数组。** 返回匹配项，输入数组保持不变。这与 lodash 不同。

```ts
import { remove } from '@rabjs/kit';

const arr = [1, 2, 3, 4, 5];
remove(arr, (n) => n > 3); // [4, 5]
arr; // [1, 2, 3, 4, 5]
```

## 分类

每类列出 3–5 个代表函数（完整列表见 [`llms.txt`](./llms.txt) 和 [文档目录](https://ximing.github.io/kit/)）：

- **array** — `chunk`、`compact`、`uniq`、`flatten`、`remove`
- **object** — `cloneDeep`、`get`、`set`、`pick`、`merge`
- **string** — `camelCase`、`kebabCase`、`template`、`truncate`
- **function** — `debounce`、`throttle`、`memoize`、`curry`
- **number** — `clamp`、`random`、`range`、`sum`
- **is** — `isArray`、`isEmpty`、`isNil`、`isPlainObject`
- **date** — `format`、`parse`、`addDays`、`diffDays`
- **promise** — `delay`、`retry`、`timeout`、`parallel`
- **collection** — `groupBy`、`sortBy`、`partition`、`keyBy`
- **math** — `max`、`min`、`maxBy`、`sumBy`

## Agent

本库同时面向人和 coding agent。

- API 索引：[`llms.txt`](./llms.txt)
- 仓库 skills：[`skills/`](./skills/)（`using-rabjs-kit`、`adding-kit-function`、`migrating-lodash-to-kit`）
- Agent 指南：[https://ximing.github.io/kit/guide/agents](https://ximing.github.io/kit/guide/agents)

Skills 只放在本仓库里。不要复制到 `~/.grok/skills` 或 `~/.agents/skills`。

## 文档

文档站点：[https://ximing.github.io/kit/](https://ximing.github.io/kit/)

添加函数或提交 PR 请看 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## License

MIT
