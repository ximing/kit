---
id: sampleSize
title: sampleSize
description: 'Gets n random elements at unique keys from collection up to the size of collection'
---

# `sampleSize`

Gets n random elements at unique keys from collection up to the size of collection

## 参数

| 参数         | 类型  | 描述                               |
| ------------ | ----- | ---------------------------------- |
| `collection` | `any` | - The collection to sample         |
| `n`          | `any` | - The number of elements to sample |

## 返回值

- **类型**: `any`
- **描述**: Returns the array of sampled elements

## 示例

```typescript
* const arr = [1, 2, 3, 4, 5];
 * sampleSize(arr, 2); // => random 2 elements from arr
```

## 交互式示例

```tsx live
function sampleSizeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`sampleSize` Example</h4>
      <p>Gets n random elements at unique keys from collection up to the size of collection</p>
    </div>
  );
}
```
