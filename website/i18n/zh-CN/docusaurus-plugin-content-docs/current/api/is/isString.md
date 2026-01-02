---
id: isString
title: isString
description: 'Checks if value is classified as a String primitive or object.'
---

# `isString`

Checks if value is classified as a String primitive or object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a string, else false

## 示例

```typescript
* isString('abc') // => true
 * isString(new String('abc')) // => true
 * isString(123) // => false
```

## 交互式示例

```tsx live
function isStringExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isString` Example</h4>
      <p>Checks if value is classified as a String primitive or object.</p>
    </div>
  );
}
```
