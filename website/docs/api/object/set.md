---
id: set
title: set
description: "Sets the value at path of object. If a portion of path doesn't exist, it's created."
---

# `set`

Sets the value at path of object. If a portion of path doesn't exist, it's created.

## Parameters

| Parameter | Type  | Description                                                |
| --------- | ----- | ---------------------------------------------------------- |
| `obj`     | `any` | - The object to modify                                     |
| `path`    | `any` | - The path of the property to set (can be string or array) |
| `value`   | `any` | - The value to set                                         |

## Returns

- **Type**: `any`
- **Description**: Returns the object

## Examples

```typescript
* const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * set(obj, ['x', 'y', 'z'], 5);
 * set(obj, 'a.b.d[0]', 6);
```

## Interactive Example

```tsx live
function setExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`set` Example</h4>
      <p>Sets the value at path of object. If a portion of path doesn't exist, it's created.</p>
    </div>
  );
}
```
