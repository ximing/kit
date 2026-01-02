---
id: pick
title: pick
description: 'Creates an object composed of the picked object properties'
---

# `pick`

Creates an object composed of the picked object properties

## Parameters

| Parameter | Type  | Description                 |
| --------- | ----- | --------------------------- |
| `obj`     | `any` | - The source object         |
| `keys`    | `any` | - The property keys to pick |

## Returns

- **Type**: `any`
- **Description**: Returns the new object

## Examples

```typescript
* const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']); // { a: 1, c: 3 }
```

## Interactive Example

```tsx live
function pickExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`pick` Example</h4>
      <p>Creates an object composed of the picked object properties</p>
    </div>
  );
}
```
