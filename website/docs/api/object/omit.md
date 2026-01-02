---
id: omit
title: omit
description: 'Creates an object composed of properties that are not omitted'
---

# `omit`

Creates an object composed of properties that are not omitted

## Parameters

| Parameter | Type  | Description                 |
| --------- | ----- | --------------------------- |
| `obj`     | `any` | - The source object         |
| `keys`    | `any` | - The property keys to omit |

## Returns

- **Type**: `any`
- **Description**: Returns the new object

## Examples

```typescript
* const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['a', 'c']); // { b: 2 }
```

## Interactive Example

```tsx live
function omitExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`omit` Example</h4>
      <p>Creates an object composed of properties that are not omitted</p>
    </div>
  );
}
```
