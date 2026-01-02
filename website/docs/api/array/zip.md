---
id: zip
title: zip
description: 'Creates an array of grouped elements, the first of which contains the first elements of the given arrays'
---

# `zip`

Creates an array of grouped elements, the first of which contains the first elements of the given arrays

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `arrays`  | `any` | The arrays to process |

## Returns

- **Type**: `any`
- **Description**: A new array of grouped elements

## Examples

```typescript
* zip(['a', 'b', 'c'], [1, 2, 3]); // [['a', 1], ['b', 2], ['c', 3]]
 * zip(['a', 'b'], [1, 2, 3]); // [['a', 1], ['b', 2]]
```

## Interactive Example

```tsx live
function zipExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`zip` Example</h4>
      <p>Creates an array of grouped elements, the first of which contains the first elements of the given arrays</p>
    </div>
  );
}
```
