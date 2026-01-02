---
id: intersection
title: intersection
description: 'Creates an array of unique values that are included in all given arrays'
---

# `intersection`

Creates an array of unique values that are included in all given arrays

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `arrays`  | `any` | The arrays to process |

## Returns

- **Type**: `any`
- **Description**: A new array of unique values present in all arrays

## Examples

```typescript
* intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
 * intersection([1, 2, 3], [2, 3, 4], [2, 3, 5]); // [2, 3]
```

## Interactive Example

```tsx live
function intersectionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`intersection` Example</h4>
      <p>Creates an array of unique values that are included in all given arrays</p>
    </div>
  );
}
```
