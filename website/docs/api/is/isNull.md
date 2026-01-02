---
id: isNull
title: isNull
description: 'Checks if value is null.'
---

# `isNull`

Checks if value is null.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is null, else false

## Examples

```typescript
* isNull(null) // => true
 * isNull(undefined) // => false
 * isNull(0) // => false
 * isNull('') // => false
```

## Interactive Example

```tsx live
function isNullExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isNull` Example</h4>
      <p>Checks if value is null.</p>
    </div>
  );
}
```
