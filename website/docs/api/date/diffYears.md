---
id: diffYears
title: diffYears
description: 'Calculates the number of years between two dates.'
---

# `diffYears`

Calculates the number of years between two dates.

## Parameters

| Parameter | Type  | Description       |
| --------- | ----- | ----------------- |
| `date1`   | `any` | - The first date  |
| `date2`   | `any` | - The second date |

## Returns

- **Type**: `any`
- **Description**: The number of years between the two dates (positive if date1 > date2)

## Examples

```typescript
* diffYears(new Date('2026-01-15'), new Date('2024-01-15')) // => 2
 * diffYears(new Date('2024-01-15'), new Date('2026-01-15')) // => -2
```

## Interactive Example

```tsx live
function diffYearsExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`diffYears` Example</h4>
      <p>Calculates the number of years between two dates.</p>
    </div>
  );
}
```
