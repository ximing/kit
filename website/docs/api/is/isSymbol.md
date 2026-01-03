---
id: isSymbol
title: isSymbol
description: 'Checks if a value is a symbol'
---

# `isSymbol`

检查一个值是否为 Symbol 类型。

## 语法

```typescript
function isSymbol(value: unknown): value is symbol;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is symbol`（类型守卫）
- **描述**: 如果值是 Symbol 返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isSymbol } from '@rabjs/kit';

console.log(isSymbol(Symbol('test'))); // true
console.log(isSymbol(Symbol.iterator)); // true
console.log(isSymbol('test')); // false
console.log(isSymbol({})); // false
```

### 实际应用场景

```typescript
function getSymbolName(value: unknown): string {
  if (isSymbol(value)) {
    return value.toString();
  }
  return String(value);
}

// 对象键处理
function processObjectKeys(obj: Record<string | symbol, any>) {
  Object.keys(obj).forEach((key) => {
    if (!isSymbol(key)) {
      console.log(`字符串键: ${key}`);
    }
  });
}
```

## 版本历史

- **v1.0.0** - 初始版本
