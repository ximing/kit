---
id: isEmpty
title: isEmpty
description: 'Checks if value is empty. A value is considered empty if it is one of the following: - null or undefined - empty string - empty array - empty object (no enumerable properties) - NaN'
---

# `isEmpty`

Checks if value is empty. A value is considered empty if it is one of the following:

- null or undefined
- empty string
- empty array
- empty object (no enumerable properties)
- NaN

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is empty, else false

## 示例

```typescript
* isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty('') // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty(NaN) // => true
 * isEmpty(0) // => false
 * isEmpty(false) // => false
 * isEmpty([0]) // => false
 * isEmpty({ a: 1 }) // => false
```

## 交互式示例

```tsx live
function isEmptyExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isEmpty` Example</h4>
      <p>
        Checks if value is empty. A value is considered empty if it is one of the following: - null or undefined - empty
        string - empty array - empty object (no enumerable properties) - NaN
      </p>
    </div>
  );
}
```
