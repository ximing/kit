---
id: inRange
title: inRange
description: "Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with start then set to 0."
---

# `inRange`

Checks if n is between start and up to, but not including, end.
If end is not specified, it's set to start with start then set to 0.

## 参数

| 参数     | 类型  | 描述                                  |
| -------- | ----- | ------------------------------------- |
| `number` | `any` | - The number to check                 |
| `start`  | `any` | - The start of the range              |
| `end`    | `any` | - The end of the range (not included) |

## 返回值

- **类型**: `any`
- **描述**: Returns true if number is in the range, else false

## 示例

```typescript
* inRange(3, 2, 4) // => true
 * inRange(4, 2, 4) // => false
 * inRange(2, 2, 4) // => true
```

## 交互式示例

```tsx live
function inRangeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`inRange` Example</h4>
      <p>
        Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with
        start then set to 0.
      </p>
    </div>
  );
}
```
