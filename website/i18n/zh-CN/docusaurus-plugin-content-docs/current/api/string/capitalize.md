---
id: capitalize
title: capitalize
description: 'Converts the first character of string to upper case and the remainder to lower case.'
---

# `capitalize`

Converts the first character of string to upper case and the remainder to lower case.

## 参数

| 参数  | 类型  | 描述                       |
| ----- | ----- | -------------------------- |
| `str` | `any` | - The string to capitalize |

## 返回值

- **类型**: `any`
- **描述**: The capitalized string

## 示例

```typescript
* capitalize('FRED') // => 'Fred'
 * capitalize('foo') // => 'Foo'
```

## 交互式示例

```tsx live
function capitalizeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`capitalize` Example</h4>
      <p>Converts the first character of string to upper case and the remainder to lower case.</p>
    </div>
  );
}
```
