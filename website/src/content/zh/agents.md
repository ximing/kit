# Agent

@rabjs/kit 同时面向人和 coding agent。把仓库（或本站）指给 agent，skills 留在仓库里。

## llms.txt

[`llms.txt`](https://github.com/ximing/kit/blob/main/llms.txt) 是生成的纯文本索引：每个公开函数的名称、参数和一行摘要。用来选导入，不必先读源码。

由 `pnpm docs:catalog` 从 JSDoc 重新生成。不要手改。

## Skills

三个 skill 在 [`skills/`](https://github.com/ximing/kit/tree/main/skills)：

- [`using-rabjs-kit`](https://github.com/ximing/kit/blob/main/skills/using-rabjs-kit/SKILL.md) — 何时用 kit、何时用原生 API，导入方式，不可变的 `remove`。
- [`adding-kit-function`](https://github.com/ximing/kit/blob/main/skills/adding-kit-function/SKILL.md) — 文件布局、JSDoc、Vitest、更新目录。
- [`migrating-lodash-to-kit`](https://github.com/ximing/kit/blob/main/skills/migrating-lodash-to-kit/SKILL.md) — 名称对照、`remove` 是否修改原数组、没有 `_.chain` / `fp`。

Skills **只放在本仓库里**。不要复制到 `~/.grok/skills` 或 `~/.agents/skills`。

`Use when` 说明见 [Skills 页](/kit/zh/skills)。

## 在本仓库里改代码

[`AGENTS.md`](https://github.com/ximing/kit/blob/main/AGENTS.md) 是给改这个仓库的 agent 看的约定：仅具名导出、一个文件一个函数、JSDoc + 测试 + `pnpm docs:catalog`，永远不要手改 `exports`。
