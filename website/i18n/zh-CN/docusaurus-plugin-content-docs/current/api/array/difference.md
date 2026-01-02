---
id: difference
title: difference
description: 'Creates an array of unique values that are in the first array but not in the other arrays'
---

# `difference`

Creates an array of unique values that are in the first array but not in the other arrays

## 参数

| 参数     | 类型  | 描述                  |
| -------- | ----- | --------------------- |
| `array`  | `any` | The array to process  |
| `arrays` | `any` | The arrays to exclude |

## 返回值

- **类型**: `any`
- **描述**: A new array of unique values

## 示例

```typescript
* difference([1, 2, 3], [2, 3, 4]); // [1]
 * difference([1, 2, 3, 4], [2, 4], [3]); // [1]
```

## 交互式示例

```tsx live
function differenceExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`difference` Example</h4>
      <p>Creates an array of unique values that are in the first array but not in the other arrays</p>
    </div>
  );
}
```
