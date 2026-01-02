---
id: isNumber
title: isNumber
description: 'Checks if value is classified as a Number primitive or object.'
---

# `isNumber`

Checks if value is classified as a Number primitive or object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a number, else false

## 示例

```typescript
* isNumber(3) // => true
 * isNumber(new Number(3)) // => true
 * isNumber(NaN) // => true
 * isNumber(Infinity) // => true
 * isNumber('3') // => false
```

## 交互式示例

```tsx live
function isNumberExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isNumber` Example</h4>
      <p>Checks if value is classified as a Number primitive or object.</p>
    </div>
  );
}
```
