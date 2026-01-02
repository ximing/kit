---
id: round
title: round
description: 'Rounds number to precision.'
---

# `round`

Rounds number to precision.

## Parameters

| Parameter   | Type  | Description                              |
| ----------- | ----- | ---------------------------------------- |
| `number`    | `any` | - The number to round                    |
| `precision` | `any` | - The precision to round to (default: 0) |

## Returns

- **Type**: `any`
- **Description**: Returns the rounded number

## Examples

```typescript
* round(4.006) // => 4
 * round(4.006, 2) // => 4.01
 * round(4060, -2) // => 4100
```

## Interactive Example

```tsx live
function roundExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`round` Example</h4>
      <p>Rounds number to precision.</p>
    </div>
  );
}
```
