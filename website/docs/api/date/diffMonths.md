---
id: diffMonths
title: diffMonths
description: 'Calculates the number of months between two dates.'
---

# `diffMonths`

Calculates the number of months between two dates.

## Parameters

| Parameter | Type  | Description       |
| --------- | ----- | ----------------- |
| `date1`   | `any` | - The first date  |
| `date2`   | `any` | - The second date |

## Returns

- **Type**: `any`
- **Description**: The number of months between the two dates (positive if date1 > date2)

## Examples

```typescript
* diffMonths(new Date('2024-04-15'), new Date('2024-01-15')) // => 3
 * diffMonths(new Date('2024-01-15'), new Date('2024-04-15')) // => -3
```

## Interactive Example

```tsx live
function diffMonthsExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`diffMonths` Example</h4>
      <p>Calculates the number of months between two dates.</p>
    </div>
  );
}
```
