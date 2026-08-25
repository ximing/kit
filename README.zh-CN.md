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
| Agent 资源（`llms.txt`、skills、plugin 清单） | 否                        | 否         | 是                               |
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

## 编程 Agent Plugins

本库同时面向人和 coding agent。把 [`llms.txt`](./llms.txt) 或 [Agent 指南](https://ximing.github.io/kit/zh/guide/agents) 指给 agent。

[Agent Skills](https://code.claude.com/docs/en/claude-code/skills) 在 [`skills/`](./skills)：

| Skill                                                         | 作用                                                       |
| ------------------------------------------------------------- | ---------------------------------------------------------- |
| [`using-rabjs-kit`](./skills/using-rabjs-kit)                 | 何时用 kit、何时用原生 API，导入方式，不可变的 `remove`。  |
| [`adding-kit-function`](./skills/adding-kit-function)         | 文件布局、JSDoc、Vitest、更新目录 — 给改这个仓库用。       |
| [`migrating-lodash-to-kit`](./skills/migrating-lodash-to-kit) | 名称对照、`remove` 是否修改原数组、没有 `_.chain` / `fp`。 |

这些 skill 是纯 `SKILL.md` 文档，零运行时依赖，同一份文件可在各个编程工具中通用。各工具安装方式不同——如果同时使用多个工具，请分别为每个工具安装。可复制的安装命令：[文档 → Skills](https://ximing.github.io/kit/zh/skills#install)。

不要把 skill 复制到 `~/.grok/skills` 或 `~/.agents/skills`。请用对应工具的 plugin 命令安装。

### Claude Code

```bash
/plugin marketplace add ximing/kit
/plugin install kit@kit
```

或手动安装：`cp -r skills/using-rabjs-kit skills/adding-kit-function skills/migrating-lodash-to-kit ~/.claude/skills/`

### Codex App / Codex CLI

本仓库自身就是一个 Codex 插件市场（见 [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)），无需官方上架：

```bash
codex plugin marketplace add ximing/kit
codex plugin add kit@kit
```

在 Codex App 或 TUI 中，添加市场后也可以打开 `/plugins` 搜索 `kit` 安装。

### Cursor

插件清单在 [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json)。在 Cursor Agent 对话框中执行 `/add-plugin kit`，或在插件市场搜索 `kit`。也可以手动把 skill 目录拷贝到项目的 `.cursor/skills/` 下。

### Grok Build CLI

本仓库自身就是一个 Grok 插件市场（见 [`.grok-plugin/marketplace.json`](.grok-plugin/marketplace.json)）：

```bash
grok plugin marketplace add ximing/kit
grok plugin install kit --trust
```

也可以直接从仓库安装：

```bash
grok plugin install ximing/kit --trust
```

### Kimi Code

```text
/plugins install https://github.com/ximing/kit
```

安装后新开会话（`/new`）使插件生效。

### OpenCode

在本仓库里开发时，[`.opencode/plugins/kit.js`](.opencode/plugins/kit.js) 会自动注册 `skills/`。在其他项目中，把插件加到 `opencode.json`（全局或项目级）：

```json
{
  "plugin": ["kit@git+https://github.com/ximing/kit.git"]
}
```

如果 git 安装没有加载（本包的 `main` 指向的是工具库，不是插件），改为把 OpenCode 指到 skills 目录：

```json
{
  "skills": ["./path/to/kit/skills"]
}
```

### Pi

```bash
pi install git:github.com/ximing/kit
```

[`package.json`](package.json) 中的包清单为 Pi 的原生 skill 发现声明了 `skills/` 目录。

## 文档

文档站点：[https://ximing.github.io/kit/](https://ximing.github.io/kit/)

添加函数或提交 PR 请看 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## License

MIT
