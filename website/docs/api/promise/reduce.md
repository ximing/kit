---
id: reduce
title: reduce
description: 'Iterates over an array and reduces it to a single value using an async reducer function.'
---

# `reduce`

Iterates over an array and reduces it to a single value using an async reducer function.

## Parameters

| Parameter      | Type  | Description                                                              |
| -------------- | ----- | ------------------------------------------------------------------------ |
| `array`        | `any` | - The array to reduce                                                    |
| `reducer`      | `any` | - The function to reduce each element (can be async or return a promise) |
| `initialValue` | `any` | - The initial value for the accumulator                                  |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves with the final accumulated value

## Examples

```typescript
* const sum = await reduce(
 *   [1, 2, 3, 4],
 *   (acc, value) => Promise.resolve(acc + value),
 *   0
 * ); // => 10
 *
 *
```

```typescript
* const users = await reduce(
 *   [1, 2, 3],
 *   async (acc, id) => {
 *     const user = await fetchUser(id);
 *     return [...acc, user];
 *   },
 *   []
 * );
```

## Interactive Example

```tsx live
function reduceExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`reduce` Example</h4>
      <p>Iterates over an array and reduces it to a single value using an async reducer function.</p>
    </div>
  );
}
```
