---
id: filter
title: filter
description: 'Iterates over an array and returns a promise that resolves with an array of elements that pass the predicate test. Supports concurrency limiting.'
---

# `filter`

Iterates over an array and returns a promise that resolves with an array of elements
that pass the predicate test. Supports concurrency limiting.

## Parameters

| Parameter     | Type  | Description                                                            |
| ------------- | ----- | ---------------------------------------------------------------------- |
| `array`       | `any` | - The array to iterate over                                            |
| `predicate`   | `any` | - The function to test each element (can be async or return a promise) |
| `concurrency` | `any` | - The maximum number of concurrent operations (default: Infinity)      |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves with an array of elements that passed the test

## Examples

```typescript
* const numbers = [1, 2, 3, 4, 5];
 * const evens = await filter(numbers, (n) => n % 2 === 0);
 *
 *
```

```typescript
* const users = await filter(userIds, (id) => checkUserActive(id), 2); // Max 2 concurrent checks
```

## Interactive Example

```tsx live
function filterExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`filter` Example</h4>
      <p>
        Iterates over an array and returns a promise that resolves with an array of elements that pass the predicate
        test. Supports concurrency limiting.
      </p>
    </div>
  );
}
```
