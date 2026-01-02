---
id: sample
title: sample
description: 'Gets a random element from collection'
---

# `sample`

Gets a random element from collection

## 参数

| 参数         | 类型  | 描述                       |
| ------------ | ----- | -------------------------- |
| `collection` | `any` | - The collection to sample |

## 返回值

- **类型**: `any`
- **描述**: Returns the random element

## 示例

```typescript
* const arr = [1, 2, 3, 4, 5];
 * sample(arr); // => random element from arr
```

## 交互式示例

```tsx live
function sampleExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`sample` Example</h4>
      <p>Gets a random element from collection</p>
    </div>
  );
}
```
