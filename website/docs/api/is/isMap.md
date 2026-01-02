---
id: isMap
title: isMap
description: 'Checks if value is a Map object.'
---

# `isMap`

Checks if value is a Map object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a Map object, else false

## Examples

```typescript
* isMap(new Map()) // => true
 * isMap(new Map([['a', 1]])) // => true
 * isMap({}) // => false
 * isMap(new WeakMap()) // => false
```

## Interactive Example

```tsx live
function isMapExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isMap` Example</h4>
      <p>Checks if value is a Map object.</p>
    </div>
  );
}
```
