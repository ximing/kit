---
id: range
title: range
description: 'Creates an array of numbers progressing from start up to, but not including, end. If step is negative, the array will be in descending order.'
---

# `range`

Creates an array of numbers progressing from start up to, but not including, end.
If step is negative, the array will be in descending order.

## 参数

| 参数    | 类型  | 描述                                                  |
| ------- | ----- | ----------------------------------------------------- |
| `start` | `any` | - The start of the range                              |
| `end`   | `any` | - The end of the range (not included)                 |
| `step`  | `any` | - The value to increment or decrement by (default: 1) |

## 返回值

- **类型**: `any`
- **描述**: Returns the range of numbers

## 示例

```typescript
* range(0, 5) // => [0, 1, 2, 3, 4]
 * range(0, 10, 2) // => [0, 2, 4, 6, 8]
 * range(5, 0, -1) // => [5, 4, 3, 2, 1]
```

## 交互式示例

```tsx live
function rangeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`range` Example</h4>
      <p>
        Creates an array of numbers progressing from start up to, but not including, end. If step is negative, the array
        will be in descending order.
      </p>
    </div>
  );
}
```
