---
id: isError
title: isError
description: 'Checks if value is an Error object.'
---

# `isError`

Checks if value is an Error object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is an Error object, else false

## Examples

```typescript
* isError(new Error()) // => true
 * isError(new TypeError()) // => true
 * isError('error') // => false
 * isError({ message: 'error' }) // => false
```

## Interactive Example

```tsx live
function isErrorExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isError` Example</h4>
      <p>Checks if value is an Error object.</p>
    </div>
  );
}
```
