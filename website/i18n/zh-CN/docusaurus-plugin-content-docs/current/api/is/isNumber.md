---
id: isNumber
title: isNumber
description: '检查值是否为数字'
---

# `isNumber`

检查一个值是否为数字类型。包括整数、浮点数、`NaN` 和 `Infinity`。

## 语法

```typescript
function isNumber(value: unknown): value is number;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is number`（类型守卫）
- **描述**: 如果值是数字类型返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isNumber } from '@rabjs/kit';

console.log(isNumber(3)); // true
console.log(isNumber(-3.14)); // true
console.log(isNumber(NaN)); // true
console.log(isNumber(Infinity)); // true
console.log(isNumber('3')); // false
```

### 实际应用场景

```typescript
function calculatePercentage(value: unknown): number | null {
  if (isNumber(value) && !isNaN(value) && isFinite(value)) {
    return Math.min(100, Math.max(0, value));
  }
  return null;
}

// 参数验证
function setWidth(width: unknown) {
  if (isNumber(width) && width > 0) {
    document.body.style.width = width + 'px';
  }
}
```

## 版本历史

- **v1.0.0** - 初始版本
