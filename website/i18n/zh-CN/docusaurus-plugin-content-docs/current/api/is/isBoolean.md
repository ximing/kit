---
id: isBoolean
title: isBoolean
description: 'Checks if value is classified as a Boolean primitive or object.'
---

# `isBoolean`

Checks if value is classified as a Boolean primitive or object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a boolean, else false

## 示例

```typescript
* isBoolean(false) // => true
 * isBoolean(true) // => true
 * isBoolean(new Boolean(true)) // => false (primitive check only)
 * isBoolean(1) // => false
```

## 交互式示例

```tsx live
function isBooleanExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isBoolean` Example</h4>
      <p>Checks if value is classified as a Boolean primitive or object.</p>
    </div>
  );
}
```
