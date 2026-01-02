---
id: isArray
title: isArray
description: 'Checks if value is classified as an Array object.'
---

# `isArray`

Checks if value is classified as an Array object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is an array, else false

## 示例

```typescript
* isArray([1, 2, 3]) // => true
 * isArray('abc') // => false
 * isArray({ length: 0 }) // => false
```

## 交互式示例

```tsx live
function isArrayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isArray` Example</h4>
      <p>Checks if value is classified as an Array object.</p>
    </div>
  );
}
```
