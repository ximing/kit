---
id: keys
title: keys
description: 'Creates an array of the own enumerable property names of object'
---

# `keys`

Creates an array of the own enumerable property names of object

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `obj`     | `any` | - The object to query |

## Returns

- **Type**: `any`
- **Description**: Returns the array of property names

## Examples

```typescript
* keys({ a: 1, b: 2, c: 3 }); // ['a', 'b', 'c']
```

## Interactive Example

```tsx live
function keysExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`keys` Example</h4>
      <p>Creates an array of the own enumerable property names of object</p>
    </div>
  );
}
```
