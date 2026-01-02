---
id: get
title: get
description: 'Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.'
---

# `get`

Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

## Parameters

| Parameter      | Type  | Description                                                |
| -------------- | ----- | ---------------------------------------------------------- |
| `obj`          | `any` | - The object to query                                      |
| `path`         | `any` | - The path of the property to get (can be string or array) |
| `defaultValue` | `any` | - The value returned if the resolved value is undefined    |

## Returns

- **Type**: `any`
- **Description**: Returns the resolved value

## Examples

```typescript
* const obj = { a: { b: { c: 3 } } };
 * get(obj, 'a.b.c'); // 3
 * get(obj, ['a', 'b', 'c']); // 3
 * get(obj, 'a.b.d', 'default'); // 'default'
```

## Interactive Example

```tsx live
function getExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`get` Example</h4>
      <p>
        Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
      </p>
    </div>
  );
}
```
