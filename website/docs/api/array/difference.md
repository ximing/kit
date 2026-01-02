---
id: difference
title: difference
description: 'Creates an array of unique values that are in the first array but not in the other arrays'
---

# `difference`

Creates an array of unique values that are in the first array but not in the other arrays

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `array`   | `any` | The array to process  |
| `arrays`  | `any` | The arrays to exclude |

## Returns

- **Type**: `any`
- **Description**: A new array of unique values

## Examples

```typescript
* difference([1, 2, 3], [2, 3, 4]); // [1]
 * difference([1, 2, 3, 4], [2, 4], [3]); // [1]
```

## Interactive Example

```tsx live
function differenceExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`difference` Example</h4>
      <p>Creates an array of unique values that are in the first array but not in the other arrays</p>
    </div>
  );
}
```
