---
id: isArray
title: isArray
description: 'Checks if value is classified as an Array object.'
---

# `isArray`

Checks if value is classified as an Array object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is an array, else false

## Examples

```typescript
* isArray([1, 2, 3]) // => true
 * isArray('abc') // => false
 * isArray({ length: 0 }) // => false
```

## Interactive Example

```tsx live
function isArrayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isArray` Example</h4>
      <p>Checks if value is classified as an Array object.</p>
    </div>
  );
}
```
