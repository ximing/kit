---
id: flatten
title: flatten
description: 'Flattens an array to a specified depth'
---

# `flatten`

Flattens an array to a specified depth

## 参数

| 参数    | 类型  | 描述                                 |
| ------- | ----- | ------------------------------------ |
| `array` | `any` | The array to flatten                 |
| `depth` | `any` | The depth to flatten to (default: 1) |

## 返回值

- **类型**: `any`
- **描述**: A new flattened array

## 示例

```typescript
* flatten([1, [2, 3], [4, [5]]]); // [1, 2, 3, 4, [5]]
 * flatten([1, [2, 3], [4, [5]]], 2); // [1, 2, 3, 4, 5]
```

## 交互式示例

```tsx live
function flattenExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`flatten` Example</h4>
      <p>Flattens an array to a specified depth</p>
    </div>
  );
}
```
