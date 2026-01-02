---
id: mean
title: mean
description: 'Computes the mean (average) of the values in array.'
---

# `mean`

Computes the mean (average) of the values in array.

## 参数

| 参数      | 类型  | 描述                              |
| --------- | ----- | --------------------------------- |
| `numbers` | `any` | - The array of numbers to average |

## 返回值

- **类型**: `any`
- **描述**: Returns the mean

## 示例

```typescript
* mean([1, 2, 3, 4]) // => 2.5
 * mean([]) // => 0
 * mean([5]) // => 5
```

## 交互式示例

```tsx live
function meanExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`mean` Example</h4>
      <p>Computes the mean (average) of the values in array.</p>
    </div>
  );
}
```
