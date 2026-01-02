---
id: max
title: max
description: 'Computes the maximum value of array. If array is empty or falsey, undefined is returned.'
---

# `max`

Computes the maximum value of array.
If array is empty or falsey, undefined is returned.

## Parameters

| Parameter | Type  | Description                                    |
| --------- | ----- | ---------------------------------------------- |
| `numbers` | `any` | - The array of numbers to get the maximum from |

## Returns

- **Type**: `any`
- **Description**: Returns the maximum value

## Examples

```typescript
* max([1, 2, 3, 4]) // => 4
 * max([]) // => undefined
 * max([1.5, 2.5, 3]) // => 3
```

## Interactive Example

```tsx live
function maxExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`max` Example</h4>
      <p>Computes the maximum value of array. If array is empty or falsey, undefined is returned.</p>
    </div>
  );
}
```
