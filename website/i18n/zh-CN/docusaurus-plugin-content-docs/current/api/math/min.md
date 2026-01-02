---
id: min
title: min
description: 'Computes the minimum value of array. If array is empty or falsey, undefined is returned.'
---

# `min`

Computes the minimum value of array.
If array is empty or falsey, undefined is returned.

## 参数

| 参数      | 类型  | 描述                                           |
| --------- | ----- | ---------------------------------------------- |
| `numbers` | `any` | - The array of numbers to get the minimum from |

## 返回值

- **类型**: `any`
- **描述**: Returns the minimum value

## 示例

```typescript
* min([1, 2, 3, 4]) // => 1
 * min([]) // => undefined
 * min([1.5, 2.5, 3]) // => 1.5
```

## 交互式示例

```tsx live
function minExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`min` Example</h4>
      <p>Computes the minimum value of array. If array is empty or falsey, undefined is returned.</p>
    </div>
  );
}
```
