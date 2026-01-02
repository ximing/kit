---
id: invert
title: invert
description: 'Creates an object composed of the inverted keys and values of object'
---

# `invert`

Creates an object composed of the inverted keys and values of object

## Parameters

| Parameter | Type  | Description            |
| --------- | ----- | ---------------------- |
| `obj`     | `any` | - The object to invert |

## Returns

- **Type**: `any`
- **Description**: Returns the new inverted object

## Examples

```typescript
* invert({ a: 1, b: 2, c: 1 }); // { '1': 'c', '2': 'b' }
```

## Interactive Example

```tsx live
function invertExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`invert` Example</h4>
      <p>Creates an object composed of the inverted keys and values of object</p>
    </div>
  );
}
```
