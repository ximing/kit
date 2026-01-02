---
id: isError
title: isError
description: 'Checks if value is an Error object.'
---

# `isError`

Checks if value is an Error object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is an Error object, else false

## 示例

```typescript
* isError(new Error()) // => true
 * isError(new TypeError()) // => true
 * isError('error') // => false
 * isError({ message: 'error' }) // => false
```

## 交互式示例

```tsx live
function isErrorExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isError` Example</h4>
      <p>Checks if value is an Error object.</p>
    </div>
  );
}
```
