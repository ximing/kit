---
id: isMap
title: isMap
description: 'Checks if a value is a Map object'
---

# `isMap`

检查一个值是否为 Map 对象。

## 语法

```typescript
function isMap(value: unknown): value is Map<any, any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Map<any, any>`（类型守卫）
- **描述**: 如果值是 Map 对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isMap } from '@rabjs/kit';

console.log(isMap(new Map()));           // true
console.log(isMap(new Map([['a', 1]])); // true
console.log(isMap({}));                  // false
console.log(isMap(new WeakMap()));       // false
```

### 实际应用场景

```typescript
function processData(data: unknown) {
  if (isMap(data)) {
    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  } else {
    console.log('不是 Map 对象');
  }
}

// 缓存实现
class Cache {
  private store: Map<string, any> = new Map();

  set(key: string, value: any) {
    if (this.store instanceof Map) {
      this.store.set(key, value);
    }
  }

  get(key: string) {
    return this.store.get(key);
  }
}
```

## 版本历史

- **v1.0.0** - 初始版本
