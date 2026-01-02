---
id: isWeakSet
title: isWeakSet
description: 'Checks if value is a WeakSet object.'
---

# `isWeakSet`

Checks if value is a WeakSet object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a WeakSet object, else false

## Examples

```typescript
* isWeakSet(new WeakSet()) // => true
 * isWeakSet(new Set()) // => false
 * isWeakSet({}) // => false
```

## Interactive Example

```tsx live
function isWeakSetExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isWeakSet` Example</h4>
      <p>Checks if value is a WeakSet object.</p>
    </div>
  );
}
```
