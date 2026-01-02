---
id: sum
title: sum
description: 'Computes the sum of the values in array.'
---

# `sum`

Computes the sum of the values in array.

## Parameters

| Parameter | Type  | Description                   |
| --------- | ----- | ----------------------------- |
| `numbers` | `any` | - The array of numbers to sum |

## Returns

- **Type**: `any`
- **Description**: Returns the sum

## Examples

```typescript
* sum([1, 2, 3, 4]) // => 10
 * sum([]) // => 0
 * sum([1.5, 2.5, 3]) // => 7
```

## Interactive Example

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
