---
id: median
title: median
description: 'Computes the median of the values in array.'
---

# `median`

Computes the median of the values in array.

## 参数

| 参数      | 类型  | 描述                                      |
| --------- | ----- | ----------------------------------------- |
| `numbers` | `any` | - The array of numbers to get median from |

## 返回值

- **类型**: `any`
- **描述**: Returns the median

## 示例

```typescript
* median([1, 2, 3, 4, 5]) // => 3
 * median([1, 2, 3, 4]) // => 2.5
 * median([]) // => 0
```

## 交互式示例

```tsx live
function medianExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`median` Example</h4>
      <p>Computes the median of the values in array.</p>
    </div>
  );
}
```
