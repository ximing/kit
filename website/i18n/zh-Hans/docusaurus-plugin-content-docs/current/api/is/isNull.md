---
id: isNull
title: isNull
description: '检查值是否为 null'
---

# `isNull`

检查一个值是否为 `null`。

## 语法

```typescript
function isNull(value: unknown): value is null;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is null`（类型守卫）
- **描述**: 如果值是 `null` 返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isNull } from '@rabjs/kit';

console.log(isNull(null)); // true
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
```

## 版本历史

- **v1.0.0** - 初始版本
