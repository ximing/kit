---
id: memoize
title: memoize
description: 'Creates a function that memoizes the result of func. If resolver is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function.'
---

# `memoize`

Creates a function that memoizes the result of func.
If resolver is provided, it determines the cache key for storing the result
based on the arguments provided to the memoized function.

## 参数

| 参数       | 类型  | 描述                                               |
| ---------- | ----- | -------------------------------------------------- |
| `func`     | `any` | - The function to have its output memoized         |
| `resolver` | `any` | - The function to resolve the cache key (optional) |

## 返回值

- **类型**: `any`
- **描述**: Returns the new memoized function

## 示例

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

## 交互式示例

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
