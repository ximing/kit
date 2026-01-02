---
id: mean
title: mean
description: 'Computes the mean (average) of the values in array.'
---

# `mean`

Computes the mean (average) of the values in array.

## Parameters

| Parameter | Type  | Description                       |
| --------- | ----- | --------------------------------- |
| `numbers` | `any` | - The array of numbers to average |

## Returns

- **Type**: `any`
- **Description**: Returns the mean

## Examples

```typescript
* mean([1, 2, 3, 4]) // => 2.5
 * mean([]) // => 0
 * mean([5]) // => 5
```

## Interactive Example

```tsx live
function meanExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`mean` Example</h4>
      <p>Computes the mean (average) of the values in array.</p>
    </div>
  );
}
```
