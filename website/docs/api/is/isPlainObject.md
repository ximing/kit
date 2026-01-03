---
id: isPlainObject
title: isPlainObject
description: 'Checks if a value is a plain object'
---

# `isPlainObject`

检查一个值是否为普通对象。普通对象是由 Object 构造函数创建的对象或原型链为 null 的对象。

## 语法

```typescript
function isPlainObject(value: unknown): value is Record<string, any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Record<string, any>`（类型守卫）
- **描述**: 如果值是普通对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isPlainObject } from '@rabjs/kit';

console.log(isPlainObject({})); // true
console.log(isPlainObject({ a: 1 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(() => {})); // false
console.log(isPlainObject(new Date())); // false
```

### 实际应用场景

```typescript
function deepMerge(target: unknown, source: unknown) {
  if (isPlainObject(target) && isPlainObject(source)) {
    return Object.assign({}, target, source);
  }
  return source;
}

// 配置验证
function validateConfig(config: unknown) {
  if (!isPlainObject(config)) {
    throw new Error('配置必须是普通对象');
  }
  return config as Record<string, any>;
}
```

## 版本历史

- **v0.0.1** - 初始版本
