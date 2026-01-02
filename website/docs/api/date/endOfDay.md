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
function endOfDayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`endOfDay` Example</h4>
      <p>Returns a new Date object set to the end of the day (23:59:59.999).</p>
    </div>
  );
}
```
