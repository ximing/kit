---
id: isMap
title: isMap
description: 'Checks if value is a Map object.'
---

# `isMap`

Checks if value is a Map object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a Map object, else false

## 示例

```typescript
* isMap(new Map()) // => true
 * isMap(new Map([['a', 1]])) // => true
 * isMap({}) // => false
 * isMap(new WeakMap()) // => false
```

## 交互式示例

```tsx live
function isMapExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isMap` Example</h4>
      <p>Checks if value is a Map object.</p>
    </div>
  );
}
```
