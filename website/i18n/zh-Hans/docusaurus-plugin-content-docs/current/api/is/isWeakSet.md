---
id: isWeakSet
title: isWeakSet
description: '检查值是否为 WeakSet 对象'
---

# `isWeakSet`

检查一个值是否为 WeakSet 对象。

## 语法

```typescript
function isWeakSet(value: unknown): value is WeakSet<any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is WeakSet<any>`（类型守卫）
- **描述**: 如果值是 WeakSet 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isWeakSet } from '@rabjs/kit';

console.log(isWeakSet(new WeakSet())); // true
console.log(isWeakSet(new Set())); // false
console.log(isWeakSet({})); // false
```

### 实际应用场景

```typescript
// 对象追踪
class ObjectTracker {
  private tracked = new WeakSet<object>();

  track(obj: object) {
    if (isWeakSet(this.tracked)) {
      this.tracked.add(obj);
    }
  }

  isTracked(obj: object): boolean {
    if (isWeakSet(this.tracked)) {
      return this.tracked.has(obj);
    }
    return false;
  }
}
```

## 版本历史

- **v0.0.1** - 初始版本
