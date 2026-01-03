---
id: isNil
title: isNil
description: '检查值是否为 null 或 undefined'
---

# `isNil`

检查一个值是否为 `null` 或 `undefined`。

## 语法

```typescript
function isNil(value: unknown): value is null | undefined;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is null | undefined`（类型守卫）
- **描述**: 如果值是 `null` 或 `undefined` 返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isNil } from '@rabjs/kit';

console.log(isNil(null)); // true
console.log(isNil(undefined)); // true
console.log(isNil(void 0)); // true
console.log(isNil(0)); // false
console.log(isNil('')); // false
```

### 实际应用场景

```typescript
function getOrDefault(value: unknown, defaultValue: any) {
  return isNil(value) ? defaultValue : value;
}

// 参数验证
function processData(data: unknown) {
  if (!isNil(data)) {
    console.log('处理数据:', data);
  } else {
    console.log('数据为空');
  }
}
```

## 版本历史

- **v0.0.1** - 初始版本
