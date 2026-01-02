---
id: orderBy
title: orderBy
description: 'This method is like sortBy except that it allows specifying the sort orders of the iteratees to sort by'
---

# `orderBy`

This method is like sortBy except that it allows specifying the sort orders of the iteratees to sort by

## Parameters

| Parameter    | Type  | Description                                      |
| ------------ | ----- | ------------------------------------------------ |
| `collection` | `any` | - The collection to iterate over                 |
| `iteratees`  | `any` | - The iteratees to sort by                       |
| `orders`     | `any` | - The sort orders of iteratees ('asc' or 'desc') |

## Returns

- **Type**: `any`
- **Description**: Returns the new sorted array

## Examples

```typescript
* const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ];
 * orderBy(users, ['age'], ['desc']);
 * // => [{name: 'John', age: 30}, {name: 'Jane', age: 25}]
```

## Interactive Example

```tsx live
function orderByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`orderBy` Example</h4>
      <p>This method is like sortBy except that it allows specifying the sort orders of the iteratees to sort by</p>
    </div>
  );
}
```
