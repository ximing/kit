---
id: endOfDay
title: endOfDay
description: 'Returns a new Date object set to the end of the day (23:59:59.999).'
---

# `endOfDay`

Returns a new Date object set to the end of the day (23:59:59.999).

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `date`    | `any` | - The date to modify |

## Returns

- **Type**: `any`
- **Description**: A new Date object set to the end of the day

## Examples

```typescript
* endOfDay(new Date('2024-01-15T14:30:45.123Z'))
 * // => Date object for 2024-01-15T23:59:59.999Z
```

## Interactive Example

```tsx live
function EndOfDayExample() {
  const baseDate = new Date('2024-01-15T14:30:45.123Z');
  const endDate = endOfDay(baseDate);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date EndOfDay Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Date:</strong> {format(baseDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          <strong>End of Day (23:59):</strong> {format(endDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </div>
  );
}
```
