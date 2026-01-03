---
id: isRegExp
title: isRegExp
description: 'Checks if a value is a RegExp object'
---

# `isRegExp`

检查一个值是否为正则表达式对象。

## 语法

```typescript
function isRegExp(value: unknown): value is RegExp;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is RegExp`（类型守卫）
- **描述**: 如果值是正则表达式对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isRegExp } from '@rabjs/kit';

console.log(isRegExp(/abc/)); // true
console.log(isRegExp(new RegExp('abc'))); // true
console.log(isRegExp('/abc/')); // false
```

### 实际应用场景

```typescript
function testPattern(pattern: unknown, str: string): boolean {
  if (isRegExp(pattern)) {
    return pattern.test(str);
  }
  return false;
}

// 验证规则
function validateEmail(email: unknown) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (isRegExp(emailRegex) && typeof email === 'string') {
    return emailRegex.test(email);
  }
  return false;
}
```

## 版本历史

- **v0.0.1** - 初始版本
