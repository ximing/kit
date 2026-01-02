---
id: sum
title: sum
description: 'Computes the sum of the values in array.'
---

# `sum`

Computes the sum of the values in array.

## 参数

| 参数      | 类型  | 描述                          |
| --------- | ----- | ----------------------------- |
| `numbers` | `any` | - The array of numbers to sum |

## 返回值

- **类型**: `any`
- **描述**: Returns the sum

## 示例

```typescript
* sum([1, 2, 3, 4]) // => 10
 * sum([]) // => 0
 * sum([1.5, 2.5, 3]) // => 7
```

## 交互式示例

```tsx live
function sumExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`sum` Example</h4>
      <p>Computes the sum of the values in array.</p>
    </div>
  );
}
```
