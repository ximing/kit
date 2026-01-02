---
id: repeat
title: repeat
description: 'Repeats the given string n times.'
---

# `repeat`

Repeats the given string n times.

## 参数

| 参数  | 类型  | 描述                                       |
| ----- | ----- | ------------------------------------------ |
| `str` | `any` | - The string to repeat                     |
| `n`   | `any` | - The number of times to repeat the string |

## 返回值

- **类型**: `any`
- **描述**: The repeated string

## 示例

```typescript
* repeat('*', 3) // => '***'
 * repeat('abc', 2) // => 'abcabc'
 * repeat('abc', 0) // => ''
```

## 交互式示例

```tsx live
function repeatExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`repeat` Example</h4>
      <p>Repeats the given string n times.</p>
    </div>
  );
}
```
