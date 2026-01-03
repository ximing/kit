---
id: memoize
title: memoize
description: 'Creates a function that memoizes the result of func based on arguments'
---

# `memoize`

Creates a function that memoizes the result of func. The memoized function caches the results based on the arguments provided. If a resolver function is provided, it determines the cache key for storing the result. This is useful for expensive computations or repeated function calls with the same arguments.

## Syntax

```typescript
function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any,
): T & { cache: Map<any, ReturnType<T>> };
```

## Parameters

| Parameter  | Type                                | Required | Default     | Description                                          |
| ---------- | ----------------------------------- | -------- | ----------- | ---------------------------------------------------- |
| `func`     | `T extends (...args: any[]) => any` | ✅       | -           | The function to have its output memoized             |
| `resolver` | `(...args: Parameters<T>) => any`   | ❌       | `undefined` | The function to resolve the cache key from arguments |

## Returns

- **Type**: `T & { cache: Map<any, ReturnType<T>> }`
- **Description**: A memoized function with a `cache` property that is a Map containing cached results. The cache can be cleared by calling `cache.clear()`.

## Examples

### Basic Usage

```typescript
import { memoize } from '@rabjs/kit';

// Example 1: Memoize expensive computation
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Calculates and caches
console.log(fibonacci(10)); // Returns cached result
console.log(fibonacci.cache.size); // => 11 (cached results)

// Example 2: Memoize API calls
const fetchUser = memoize(async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

await fetchUser(1); // Fetches from API
await fetchUser(1); // Returns cached result
```

### Advanced Usage

```typescript
// Example 3: Custom resolver for complex arguments
const memoizedAdd = memoize(
  (a: number, b: number) => a + b,
  (a: number, b: number) => `${a}-${b}`, // Custom cache key
);

console.log(memoizedAdd(1, 2)); // => 3 (calculates)
console.log(memoizedAdd(1, 2)); // => 3 (cached)

// Example 4: Memoize with object arguments
const calculateTotal = memoize(
  (items: { price: number; qty: number }[]) => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },
  (items) => JSON.stringify(items), // Use JSON string as cache key
);

const items = [{ price: 10, qty: 2 }];
console.log(calculateTotal(items)); // Calculates
console.log(calculateTotal(items)); // Cached

// Example 5: Clear cache when needed
const expensiveComputation = memoize((x: number) => {
  console.log('Computing for', x);
  return x * x;
});

expensiveComputation(5); // Computing for 5
expensiveComputation(5); // Cached
expensiveComputation.cache.clear(); // Clear cache
expensiveComputation(5); // Computing for 5 (recalculates)
```

### Real-World Application

```typescript
// Example 6: Memoized selector in state management
function useMemoizedSelector() {
  const getFilteredUsers = memoize(
    (users: any[], minAge: number) => {
      console.log('Filtering users...');
      return users.filter((user) => user.age >= minAge);
    },
    (users, minAge) => `${users.length}-${minAge}`, // Cache key
  );

  // Simulate state updates
  const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 20 },
  ];

  console.log(getFilteredUsers(users, 25)); // Filters
  console.log(getFilteredUsers(users, 25)); // Cached
  console.log(getFilteredUsers(users, 20)); // Different key, filters again

  return getFilteredUsers;
}

useMemoizedSelector();
```

## Interactive Example

```tsx live
function MemoizeExample() {
  const [input, setInput] = React.useState('5');
  const [cacheSize, setCacheSize] = React.useState(0);
  const [computeCount, setComputeCount] = React.useState(0);

  const fibonacci = React.useMemo(() => {
    return memoize((n) => {
      setComputeCount((prev) => prev + 1);
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    });
  }, []);

  const handleCompute = () => {
    const n = parseInt(input);
    if (!isNaN(n) && n >= 0) {
      fibonacci(n);
      setCacheSize(fibonacci.cache.size);
    }
  };

  const handleClear = () => {
    fibonacci.cache.clear();
    setCacheSize(0);
    setComputeCount(0);
  };

  React.useEffect(() => {
    handleCompute();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Memoize Interactive Example - Fibonacci</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Calculate Fibonacci(n):</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          min="0"
          max="20"
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Result:</strong> {fibonacci(parseInt(input) || 0)}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Cache Size:</strong> {cacheSize}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Computations:</strong> {computeCount}
      </div>
      <button onClick={handleClear} style={{ padding: '5px 10px' }}>
        Clear Cache
      </button>
    </div>
  );
}
```

## Notes

- ⚠️ **Cache Key**: By default, only the first argument is used as the cache key. Use a custom resolver for complex arguments.
- 💡 **Performance Tip**: Memoization is most effective for pure functions (functions with no side effects).
- 🔒 **Memory Consideration**: The cache grows indefinitely. For long-running applications, consider clearing the cache periodically.
- 🐛 **Common Mistake**: Not providing a resolver for functions with multiple or complex arguments, leading to incorrect caching.
- 📚 **Best Practice**: Use memoization for expensive computations like recursive functions or complex calculations.

## Related Functions

- [`debounce`](./debounce) - Delays execution until after wait time of inactivity
- [`throttle`](./throttle) - Invokes at most once per wait interval
- [`once`](./once) - Restricts a function to execute only once

## Version History

- **v1.0.0** - Initial version
