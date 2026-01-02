---
id: min
title: min
description: 'Computes the minimum value of array. If array is empty or falsey, undefined is returned.'
---

# `min`

Computes the minimum value of array.
If array is empty or falsey, undefined is returned.

## Parameters

| Parameter | Type  | Description                                    |
| --------- | ----- | ---------------------------------------------- |
| `numbers` | `any` | - The array of numbers to get the minimum from |

## Returns

- **Type**: `any`
- **Description**: Returns the minimum value

## Examples

```typescript
* min([1, 2, 3, 4]) // => 1
 * min([]) // => undefined
 * min([1.5, 2.5, 3]) // => 1.5
```

## Interactive Example

```tsx live
function minExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`min` Example</h4>
      <p>Computes the minimum value of array. If array is empty or falsey, undefined is returned.</p>
    </div>
  );
}
```
