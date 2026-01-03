---
id: isWeakMap
title: isWeakMap
description: 'Checks if a value is a WeakMap object'
---

# `isWeakMap`

检查一个值是否为 WeakMap 对象。

## 语法

```typescript
function isWeakMap(value: unknown): value is WeakMap<any, any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is WeakMap<any, any>`（类型守卫）
- **描述**: 如果值是 WeakMap 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isWeakMap } from '@rabjs/kit';

console.log(isWeakMap(new WeakMap())); // true
console.log(isWeakMap(new Map())); // false
console.log(isWeakMap({})); // false
```

### 实际应用场景

```typescript
// 私有数据存储
class PrivateData {
  private data = new WeakMap<object, any>();

  set(obj: object, value: any) {
    if (isWeakMap(this.data)) {
      this.data.set(obj, value);
    }
  }

  get(obj: object) {
    if (isWeakMap(this.data)) {
      return this.data.get(obj);
    }
  }
}
```

## 版本历史

- **v0.0.1** - 初始版本
