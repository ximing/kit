---
id: isSet
title: isSet
description: 'Checks if value is a Set object.'
---

# `isSet`

Checks if value is a Set object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a Set object, else false

## 示例

```typescript
* isSet(new Set()) // => true
 * isSet(new Set([1, 2, 3])) // => true
 * isSet([]) // => false
 * isSet(new WeakSet()) // => false
```

## 交互式示例

```tsx live
function isSetExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isSet` Example</h4>
      <p>Checks if value is a Set object.</p>
    </div>
  );
}
```
