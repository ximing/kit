---
id: median
title: median
description: 'Computes the median of the values in array.'
---

# `median`

Computes the median of the values in array.

## Parameters

| Parameter | Type  | Description                               |
| --------- | ----- | ----------------------------------------- |
| `numbers` | `any` | - The array of numbers to get median from |

## Returns

- **Type**: `any`
- **Description**: Returns the median

## Examples

```typescript
* median([1, 2, 3, 4, 5]) // => 3
 * median([1, 2, 3, 4]) // => 2.5
 * median([]) // => 0
```

## Interactive Example

```tsx live
function medianExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`median` Example</h4>
      <p>Computes the median of the values in array.</p>
    </div>
  );
}
```
