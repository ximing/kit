---
id: isDate
title: isDate
description: 'Checks if a value is a Date object'
---

# `isDate`

检查一个值是否为 Date 对象。

## 语法

```typescript
function isDate(value: unknown): value is Date;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Date`（类型守卫）
- **描述**: 如果值是 Date 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isDate } from '@rabjs/kit';

console.log(isDate(new Date())); // true
console.log(isDate(Date.now())); // false
console.log(isDate('2023-01-01')); // false
console.log(isDate(null)); // false
```

### 实际应用场景

```typescript
function formatDate(value: unknown): string {
  if (isDate(value)) {
    return value.toISOString();
  }
  return String(value);
}

// API 响应处理
function processResponse(data: unknown) {
  if (isDate(data)) {
    return data.getTime();
  }
  return data;
}
```

## 版本历史

- **v0.0.1** - 初始版本
