---
id: addMonths
title: addMonths
description: 'Adds the specified number of months to the given date.'
---

# `addMonths`

Adds the specified number of months to the given date.

## Parameters

| Parameter | Type  | Description                                     |
| --------- | ----- | ----------------------------------------------- |
| `date`    | `any` | - The date to modify                            |
| `amount`  | `any` | - The number of months to add (can be negative) |

## Returns

- **Type**: `any`
- **Description**: A new Date object with the months added

## Examples

```typescript
* addMonths(new Date('2024-01-15'), 3) // => Date object for 2024-04-15
 * addMonths(new Date('2024-01-15'), -2) // => Date object for 2023-11-15
```

## Interactive Example

```tsx live
function addMonthsExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`addMonths` Example</h4>
      <p>Adds the specified number of months to the given date.</p>
    </div>
  );
}
```
