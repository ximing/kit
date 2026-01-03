---
id: isPromise
title: isPromise
description: '检查值是否为 Promise 对象'
---

# `isPromise`

检查一个值是否为 Promise 对象。

## 语法

```typescript
function isPromise(value: unknown): value is Promise<any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Promise<any>`（类型守卫）
- **描述**: 如果值是 Promise 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isPromise } from '@rabjs/kit';

console.log(isPromise(Promise.resolve(1)));    // true
console.log(isPromise(new Promise(() => {})); // true
console.log(isPromise(async () => {}));        // false
console.log(isPromise({ then: () => {} }));    // false
```

### 实际应用场景

```typescript
function handleResult(result: unknown) {
  if (isPromise(result)) {
    return result.then((data) => console.log(data));
  }
  console.log(result);
}

// 异步处理
async function executeAsync(fn: unknown, args: any[]) {
  const result = typeof fn === 'function' ? fn(...args) : null;
  if (isPromise(result)) {
    return await result;
  }
  return result;
}
```

## 版本历史

- **v1.0.0** - 初始版本
