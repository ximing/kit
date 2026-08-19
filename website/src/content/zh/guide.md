# 指南

给人和 coding agent 用的、lodash 风格的 TypeScript 工具库。需要 Node.js `>= 20`，以及支持 ES2020 的现代浏览器。

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

## 导入方式

仅具名导出。三种等价写法：

```ts
import { chunk, retry } from '@rabjs/kit';
import { chunk } from '@rabjs/kit/array';
import { chunk } from '@rabjs/kit/array/chunk';
```

不要 `import kit from '@rabjs/kit'` — 没有 default export。`import * as kit from '@rabjs/kit'` 是命名空间导入，不是 default。

## Tree-shaking

包设置了 `"sideEffects": false`，并发布按函数生成的 `exports`。具名导入和深路径都可以摇树。选和项目其余代码一致的写法即可。

## 1.0 破坏性变更

- **没有 default export。** 不支持 `import kit from '@rabjs/kit'`。
- **`remove` 不会修改原数组。** 返回匹配项，输入数组保持不变。这与 lodash 不同。

```ts
import { remove } from '@rabjs/kit';

const arr = [1, 2, 3, 4, 5];
remove(arr, (n) => n > 3); // [4, 5]
arr; // [1, 2, 3, 4, 5]
```

留下的元素：`arr.filter((item, i) => !predicate(item, i))` 或 `partition`。

- **`RetryOptions.backoff`** 是数字倍率（默认 `1`），不是 `'linear' | 'exponential'`。
- tsdown 双格式 ESM + CJS。不要手改 `package.json` 的 `exports`。

`delay`、`timeout`、`retry` 接受可选的 `AbortSignal`。不传时行为与以前相同。

## 接下来

- [API 目录](/kit/zh/api)
- [Agent 指南](/kit/zh/guide/agents)
- [Skills](/kit/zh/skills)
