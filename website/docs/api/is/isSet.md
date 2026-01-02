---
id: isSet
title: isSet
description: 'Checks if value is a Set object.'
---

# `isSet`

Checks if value is a Set object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a Set object, else false

## Examples

```typescript
* isSet(new Set()) // => true
 * isSet(new Set([1, 2, 3])) // => true
 * isSet([]) // => false
 * isSet(new WeakSet()) // => false
```

## Interactive Example

```tsx live
function isSetExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isSet` Example</h4>
      <p>Checks if value is a Set object.</p>
    </div>
  );
}
```
