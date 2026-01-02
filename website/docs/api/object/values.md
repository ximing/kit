---
id: values
title: values
description: 'Creates an array of the own enumerable property values of object'
---

# `values`

Creates an array of the own enumerable property values of object

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `obj`     | `any` | - The object to query |

## Returns

- **Type**: `any`
- **Description**: Returns the array of property values

## Examples

```typescript
* values({ a: 1, b: 2, c: 3 }); // [1, 2, 3]
```

## Interactive Example

```tsx live
function valuesExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`values` Example</h4>
      <p>Creates an array of the own enumerable property values of object</p>
    </div>
  );
}
```
