---
id: isWeakSet
title: isWeakSet
description: 'Checks if value is a WeakSet object.'
---

# `isWeakSet`

Checks if value is a WeakSet object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a WeakSet object, else false

## 示例

```typescript
* isWeakSet(new WeakSet()) // => true
 * isWeakSet(new Set()) // => false
 * isWeakSet({}) // => false
```

## 交互式示例

```tsx live
function isWeakSetExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isWeakSet` Example</h4>
      <p>Checks if value is a WeakSet object.</p>
    </div>
  );
}
```
