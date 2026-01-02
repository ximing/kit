---
id: isNil
title: isNil
description: 'Checks if value is null or undefined.'
---

# `isNil`

Checks if value is null or undefined.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is null or undefined, else false

## Examples

```typescript
* isNil(null) // => true
 * isNil(undefined) // => true
 * isNil(void 0) // => true
 * isNil(0) // => false
 * isNil('') // => false
```

## Interactive Example

```tsx live
function isNilExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isNil` Example</h4>
      <p>Checks if value is null or undefined.</p>
    </div>
  );
}
```
