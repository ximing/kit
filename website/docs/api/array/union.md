---
id: union
title: union
description: 'Creates an array of unique values that are in any of the given arrays'
---

# `union`

Creates an array of unique values that are in any of the given arrays

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `arrays`  | `any` | The arrays to process |

## Returns

- **Type**: `any`
- **Description**: A new array of unique values from all arrays

## Examples

```typescript
* union([1, 2, 3], [2, 3, 4]); // [1, 2, 3, 4]
 * union([1, 2], [3, 4], [2, 5]); // [1, 2, 3, 4, 5]
```

## Interactive Example

```tsx live
function unionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`union` Example</h4>
      <p>Creates an array of unique values that are in any of the given arrays</p>
    </div>
  );
}
```
