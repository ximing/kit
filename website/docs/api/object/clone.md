---
id: clone
title: clone
description: 'Creates a shallow copy of value'
---

# `clone`

Creates a shallow copy of value

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to clone |

## Returns

- **Type**: `any`
- **Description**: Returns the cloned value

## Examples

```typescript
* const obj = { a: 1, b: { c: 2 } };
 * const cloned = clone(obj);
 * cloned.a = 10;
 * console.log(obj.a); // 1
 * console.log(cloned.b === obj.b); // true (shallow copy)
```

## Interactive Example

```tsx live
function cloneExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`clone` Example</h4>
      <p>Creates a shallow copy of value</p>
    </div>
  );
}
```
