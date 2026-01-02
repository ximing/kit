---
id: intersection
title: intersection
description: 'Creates an array of unique values that are included in all given arrays'
---

# `intersection`

Creates an array of unique values that are included in all given arrays

## 参数

| 参数     | 类型  | 描述                  |
| -------- | ----- | --------------------- |
| `arrays` | `any` | The arrays to process |

## 返回值

- **类型**: `any`
- **描述**: A new array of unique values present in all arrays

## 示例

```typescript
* intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
 * intersection([1, 2, 3], [2, 3, 4], [2, 3, 5]); // [2, 3]
```

## 交互式示例

```tsx live
function intersectionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`intersection` Example</h4>
      <p>Creates an array of unique values that are included in all given arrays</p>
    </div>
  );
}
```
