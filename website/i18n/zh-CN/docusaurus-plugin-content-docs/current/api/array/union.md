---
id: union
title: union
description: 'Creates an array of unique values that are in any of the given arrays'
---

# `union`

Creates an array of unique values that are in any of the given arrays

## 参数

| 参数     | 类型  | 描述                  |
| -------- | ----- | --------------------- |
| `arrays` | `any` | The arrays to process |

## 返回值

- **类型**: `any`
- **描述**: A new array of unique values from all arrays

## 示例

```typescript
* union([1, 2, 3], [2, 3, 4]); // [1, 2, 3, 4]
 * union([1, 2], [3, 4], [2, 5]); // [1, 2, 3, 4, 5]
```

## 交互式示例

```tsx live
function unionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`union` Example</h4>
      <p>Creates an array of unique values that are in any of the given arrays</p>
    </div>
  );
}
```
