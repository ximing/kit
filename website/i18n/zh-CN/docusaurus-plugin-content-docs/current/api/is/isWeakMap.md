---
id: isWeakMap
title: isWeakMap
description: 'Checks if value is a WeakMap object.'
---

# `isWeakMap`

Checks if value is a WeakMap object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a WeakMap object, else false

## 示例

```typescript
* isWeakMap(new WeakMap()) // => true
 * isWeakMap(new Map()) // => false
 * isWeakMap({}) // => false
```

## 交互式示例

```tsx live
function isWeakMapExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isWeakMap` Example</h4>
      <p>Checks if value is a WeakMap object.</p>
    </div>
  );
}
```
