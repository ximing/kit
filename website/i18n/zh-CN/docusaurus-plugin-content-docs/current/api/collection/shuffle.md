---
id: shuffle
title: shuffle
description: 'Creates an array of shuffled values, using a version of the Fisher-Yates shuffle'
---

# `shuffle`

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle

## 参数

| 参数         | 类型  | 描述                        |
| ------------ | ----- | --------------------------- |
| `collection` | `any` | - The collection to shuffle |

## 返回值

- **类型**: `any`
- **描述**: Returns the new shuffled array

## 示例

```typescript
* const arr = [1, 2, 3, 4, 5];
 * shuffle(arr); // => shuffled array
```

## 交互式示例

```tsx live
function shuffleExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`shuffle` Example</h4>
      <p>Creates an array of shuffled values, using a version of the Fisher-Yates shuffle</p>
    </div>
  );
}
```
