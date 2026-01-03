---
id: isUndefined
title: isUndefined
description: '检查值是否为 undefined'
---

# `isUndefined`

检查一个值是否为 `undefined`。

## 语法

```typescript
function isUndefined(value: unknown): value is undefined;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is undefined`（类型守卫）
- **描述**: 如果值是 `undefined` 返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isUndefined } from '@rabjs/kit';

console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true
console.log(isUndefined(null)); // false
console.log(isUndefined(0)); // false
```

## 版本历史

- **v0.0.1** - 初始版本
