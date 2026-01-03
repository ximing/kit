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
function DiffDaysExample() {
  const [daysDiff, setDaysDiff] = useState(5);

  const date1 = new Date('2024-01-20');
  const date2 = new Date('2024-01-15');
  const result = diffDays(date1, date2);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date DiffDays Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Date 1:</strong> {format(date1, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Date 2:</strong> {format(date2, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Days Difference (Date1 - Date2):</strong> {result} days
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>(Positive means Date 1 is later than Date 2)</p>
      </div>
    </div>
  );
}
```
