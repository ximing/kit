---
id: chunk
title: chunk
description: 'Splits an array into chunks of a specified size'
---

# `chunk`

Splits an array into chunks of a specified size

## 参数

| 参数    | 类型  | 描述                   |
| ------- | ----- | ---------------------- |
| `array` | `any` | The array to chunk     |
| `size`  | `any` | The size of each chunk |

## 返回值

- **类型**: `any`
- **描述**: An array of chunks

## 示例

```typescript
* chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]
```

## 交互式示例

```tsx live
function chunkExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`chunk` Example</h4>
      <p>Splits an array into chunks of a specified size</p>
    </div>
  );
}
```
