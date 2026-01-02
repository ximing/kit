---
id: memoize
title: memoize
description: 'Creates a function that memoizes the result of func. If resolver is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function.'
---

# `memoize`

Creates a function that memoizes the result of func.
If resolver is provided, it determines the cache key for storing the result
based on the arguments provided to the memoized function.

## Parameters

| Parameter  | Type  | Description                                        |
| ---------- | ----- | -------------------------------------------------- |
| `func`     | `any` | - The function to have its output memoized         |
| `resolver` | `any` | - The function to resolve the cache key (optional) |

## Returns

- **Type**: `any`
- **Description**: Returns the new memoized function

## Examples

```typescript
* const fibonacci = memoize((n: number): number => {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * });
 * fibonacci(10); // Calculates and caches
 * fibonacci(10); // Returns cached result
 *
 *
```

```typescript
* // With custom resolver
 * const memoized = memoize(
 *   (a: number, b: number) => a + b,
 *   (a: number, b: number) => `${a}-${b}`
 * );
 * memoized(1, 2); // => 3 (calculates)
 * memoized(1, 2); // => 3 (cached)
```

## Interactive Example

```tsx live
function memoizeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`memoize` Example</h4>
      <p>
        Creates a function that memoizes the result of func. If resolver is provided, it determines the cache key for
        storing the result based on the arguments provided to the memoized function.
      </p>
    </div>
  );
}
```
