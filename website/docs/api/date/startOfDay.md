---
id: startOfDay
title: startOfDay
description: 'Returns a new Date object set to the start of the day (00:00:00.000).'
---

# `startOfDay`

Returns a new Date object set to the start of the day (00:00:00.000).

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `date`    | `any` | - The date to modify |

## Returns

- **Type**: `any`
- **Description**: A new Date object set to the start of the day

## Examples

```typescript
* startOfDay(new Date('2024-01-15T14:30:45.123Z'))
 * // => Date object for 2024-01-15T00:00:00.000Z
```

## Interactive Example

```tsx live
function startOfDayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`startOfDay` Example</h4>
      <p>Returns a new Date object set to the start of the day (00:00:00.000).</p>
    </div>
  );
}
```
