---
id: diffDays
title: diffDays
description: 'Calculates the number of days between two dates.'
---

# `diffDays`

Calculates the number of days between two dates.

## Parameters

| Parameter | Type  | Description       |
| --------- | ----- | ----------------- |
| `date1`   | `any` | - The first date  |
| `date2`   | `any` | - The second date |

## Returns

- **Type**: `any`
- **Description**: The number of days between the two dates (positive if date1 > date2)

## Examples

```typescript
* diffDays(new Date('2024-01-20'), new Date('2024-01-15')) // => 5
 * diffDays(new Date('2024-01-15'), new Date('2024-01-20')) // => -5
```

## Interactive Example

```tsx live
function diffDaysExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`diffDays` Example</h4>
      <p>Calculates the number of days between two dates.</p>
    </div>
  );
}
```
