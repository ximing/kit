---
id: isString
title: isString
description: 'Checks if a value is a string'
---

# `isString`

检查一个值是否为字符串类型。

## 语法

```typescript
function isString(value: unknown): value is string;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is string`（类型守卫）
- **描述**: 如果值是字符串返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isString } from '@rabjs/kit';

console.log(isString('abc'));           // true
console.log(isString(new String('abc')); // false
console.log(isString(123));             // false
```

### 实际应用场景

```typescript
function processInput(input: unknown): string {
  if (isString(input)) {
    return input.trim();
  }
  return String(input);
}

// URL 处理
function isValidUrl(url: unknown): boolean {
  if (isString(url)) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
```

## 版本历史

- **v0.0.1** - 初始版本
