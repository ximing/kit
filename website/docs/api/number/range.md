---
id: range
title: range
description: 'Creates an array of numbers progressing from start up to, but not including, end. If step is negative, the array will be in descending order.'
---

# `range`

Creates an array of numbers progressing from start up to, but not including, end.
If step is negative, the array will be in descending order.

## Parameters

| Parameter | Type  | Description                                           |
| --------- | ----- | ----------------------------------------------------- |
| `start`   | `any` | - The start of the range                              |
| `end`     | `any` | - The end of the range (not included)                 |
| `step`    | `any` | - The value to increment or decrement by (default: 1) |

## Returns

- **Type**: `any`
- **Description**: Returns the range of numbers

## Examples

```typescript
* range(0, 5) // => [0, 1, 2, 3, 4]
 * range(0, 10, 2) // => [0, 2, 4, 6, 8]
 * range(5, 0, -1) // => [5, 4, 3, 2, 1]
```

## Interactive Example

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
