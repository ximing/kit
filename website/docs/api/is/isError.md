---
id: isError
title: isError
description: 'Checks if a value is an Error object'
---

# `isError`

检查一个值是否为 Error 对象或其子类。

## 语法

```typescript
function isError(value: unknown): value is Error;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Error`（类型守卫）
- **描述**: 如果值是 Error 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isError } from '@rabjs/kit';

console.log(isError(new Error())); // true
console.log(isError(new TypeError())); // true
console.log(isError(new ReferenceError())); // true
console.log(isError('error')); // false
console.log(isError({ message: 'error' })); // false
```

### 实际应用场景

```typescript
function handleException(error: unknown) {
  if (isError(error)) {
    console.error('错误信息:', error.message);
    console.error('堆栈:', error.stack);
  } else {
    console.error('未知错误:', error);
  }
}

// Promise 错误处理
async function safeExecute(fn: () => Promise<any>) {
  try {
    return await fn();
  } catch (error) {
    if (isError(error)) {
      console.error(`执行失败: ${error.message}`);
    }
    throw error;
  }
}
```

## 版本历史

- **v1.0.0** - 初始版本
