---
id: isWeakMap
title: isWeakMap
description: 'Checks if value is a WeakMap object.'
---

# `isWeakMap`

Checks if value is a WeakMap object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a WeakMap object, else false

## Examples

```typescript
* isWeakMap(new WeakMap()) // => true
 * isWeakMap(new Map()) // => false
 * isWeakMap({}) // => false
```

## Interactive Example

```tsx live
function isWeakMapExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isWeakMap` Example</h4>
      <p>Checks if value is a WeakMap object.</p>
    </div>
  );
}
```
