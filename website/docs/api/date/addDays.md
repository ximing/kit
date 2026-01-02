---
id: addDays
title: addDays
description: 'Adds the specified number of days to the given date.'
---

# `addDays`

Adds the specified number of days to the given date.

## Parameters

| Parameter | Type  | Description                                   |
| --------- | ----- | --------------------------------------------- |
| `date`    | `any` | - The date to modify                          |
| `amount`  | `any` | - The number of days to add (can be negative) |

## Returns

- **Type**: `any`
- **Description**: A new Date object with the days added

## Examples

```typescript
* addDays(new Date('2024-01-15'), 5) // => Date object for 2024-01-20
 * addDays(new Date('2024-01-15'), -3) // => Date object for 2024-01-12
```

## Interactive Example

```tsx live
function addDaysExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`addDays` Example</h4>
      <p>Adds the specified number of days to the given date.</p>
    </div>
  );
}
```
