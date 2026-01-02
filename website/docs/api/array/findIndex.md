---
id: findIndex
title: findIndex
description: 'Finds the index of the first element that matches the predicate'
---

# `findIndex`

Finds the index of the first element that matches the predicate

## Parameters

| Parameter   | Type  | Description                       |
| ----------- | ----- | --------------------------------- |
| `array`     | `any` | The array to search               |
| `predicate` | `any` | The function to test each element |

## Returns

- **Type**: `any`
- **Description**: The index of the first matching element, or -1 if not found

## Examples

```typescript
* findIndex([1, 2, 3, 4], (item) => item > 2); // 2
 * findIndex([1, 2, 3], (item) => item > 5); // -1
```

## Interactive Example

```tsx live
function findIndexExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`findIndex` Example</h4>
      <p>Finds the index of the first element that matches the predicate</p>
    </div>
  );
}
```
