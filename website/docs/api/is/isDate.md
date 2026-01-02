---
id: isDate
title: isDate
description: 'Checks if value is a Date object.'
---

# `isDate`

Checks if value is a Date object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a Date object, else false

## Examples

```typescript
* isDate(new Date()) // => true
 * isDate(Date.now()) // => false
 * isDate('2023-01-01') // => false
```

## Interactive Example

```tsx live
function isDateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isDate` Example</h4>
      <p>Checks if value is a Date object.</p>
    </div>
  );
}
```
