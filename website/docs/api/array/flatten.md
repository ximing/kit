---
id: flatten
title: flatten
description: 'Flattens an array to a specified depth'
---

# `flatten`

Flattens an array to a specified depth

## Parameters

| Parameter | Type  | Description                          |
| --------- | ----- | ------------------------------------ |
| `array`   | `any` | The array to flatten                 |
| `depth`   | `any` | The depth to flatten to (default: 1) |

## Returns

- **Type**: `any`
- **Description**: A new flattened array

## Examples

```typescript
* flatten([1, [2, 3], [4, [5]]]); // [1, 2, 3, 4, [5]]
 * flatten([1, [2, 3], [4, [5]]], 2); // [1, 2, 3, 4, 5]
```

## Interactive Example

```tsx live
function flattenExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`flatten` Example</h4>
      <p>Flattens an array to a specified depth</p>
    </div>
  );
}
```
