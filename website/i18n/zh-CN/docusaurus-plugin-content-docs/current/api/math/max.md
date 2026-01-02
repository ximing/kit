---
id: max
title: max
description: 'Computes the maximum value of array. If array is empty or falsey, undefined is returned.'
---

# `max`

Computes the maximum value of array.
If array is empty or falsey, undefined is returned.

## 参数

| 参数      | 类型  | 描述                                           |
| --------- | ----- | ---------------------------------------------- |
| `numbers` | `any` | - The array of numbers to get the maximum from |

## 返回值

- **类型**: `any`
- **描述**: Returns the maximum value

## 示例

```typescript
* max([1, 2, 3, 4]) // => 4
 * max([]) // => undefined
 * max([1.5, 2.5, 3]) // => 3
```

## 交互式示例

```tsx live
function maxExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`max` Example</h4>
      <p>Computes the maximum value of array. If array is empty or falsey, undefined is returned.</p>
    </div>
  );
}
```
