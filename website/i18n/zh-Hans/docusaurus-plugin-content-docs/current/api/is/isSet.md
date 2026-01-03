---
id: isSet
title: isSet
description: '检查值是否为 Set 对象'
---

# `isSet`

检查一个值是否为 Set 对象。

## 语法

```typescript
function isSet(value: unknown): value is Set<any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Set<any>`（类型守卫）
- **描述**: 如果值是 Set 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isSet } from '@rabjs/kit';

console.log(isSet(new Set()));           // true
console.log(isSet(new Set([1, 2, 3])); // true
console.log(isSet([]));                  // false
console.log(isSet(new WeakSet()));       // false
```

### 实际应用场景

```typescript
function getUnique(data: unknown): any[] {
  if (isSet(data)) {
    return Array.from(data);
  }
  return [];
}

// 去重处理
function deduplicateArray(arr: any[]) {
  const uniqueSet = new Set(arr);
  if (isSet(uniqueSet)) {
    return Array.from(uniqueSet);
  }
  return arr;
}
```

## 版本历史

- **v1.0.0** - 初始版本
