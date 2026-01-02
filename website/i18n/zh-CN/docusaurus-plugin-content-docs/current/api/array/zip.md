---
id: zip
title: zip
description: 'Creates an array of grouped elements, the first of which contains the first elements of the given arrays'
---

# `zip`

Creates an array of grouped elements, the first of which contains the first elements of the given arrays

## 参数

| 参数     | 类型  | 描述                  |
| -------- | ----- | --------------------- |
| `arrays` | `any` | The arrays to process |

## 返回值

- **类型**: `any`
- **描述**: A new array of grouped elements

## 示例

```typescript
* zip(['a', 'b', 'c'], [1, 2, 3]); // [['a', 1], ['b', 2], ['c', 3]]
 * zip(['a', 'b'], [1, 2, 3]); // [['a', 1], ['b', 2]]
```

## 交互式示例

```tsx live
function zipExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`zip` Example</h4>
      <p>Creates an array of grouped elements, the first of which contains the first elements of the given arrays</p>
    </div>
  );
}
```
