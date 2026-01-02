---
id: clamp
title: clamp
description: 'Clamps number within the inclusive lower and upper bounds.'
---

# `clamp`

Clamps number within the inclusive lower and upper bounds.

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `number`  | `any` | - The number to clamp |
| `lower`   | `any` | - The lower bound     |
| `upper`   | `any` | - The upper bound     |

## Returns

- **Type**: `any`
- **Description**: Returns the clamped number

## Examples

```typescript
* clamp(10, 5, 15) // => 10
 * clamp(3, 5, 15) // => 5
 * clamp(20, 5, 15) // => 15
```

## Interactive Example

```tsx live
function clampExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`clamp` Example</h4>
      <p>Clamps number within the inclusive lower and upper bounds.</p>
    </div>
  );
}
```
