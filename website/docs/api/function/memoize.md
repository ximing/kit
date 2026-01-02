---
id: memoize
title: memoize
description: "Creates a function that memoizes the result of func. If resolver is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function."
---

# `memoize`

Creates a function that memoizes the result of func.
If resolver is provided, it determines the cache key for storing the result
based on the arguments provided to the memoized function.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `func` | `any` | - The function to have its output memoized |
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
function MemoizeExample() {
  const [n, setN] = useState(5);
  const [callCount, setCallCount] = useState(0);

  // Create a fibonacci function with call counter
  const fibonacci = React.useMemo(() => {
    let internalCallCount = 0;

    const fib = memoize((num)=> {
      internalCallCount++;
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    });

    // Store the call count getter on the function
    (fib as any).getCallCount = () => internalCallCount;

    return fib;
  }, []);

  const handleCalculate = () => {
    const result = fibonacci(n);
    setCallCount((fibonacci as any).getCallCount());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Memoize Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Fibonacci N: </label>
        <input
          type="number"
          min="0"
          max="20"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleCalculate}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Calculate
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input (N):</strong> {n}
        </p>
        <p>
          <strong>Fibonacci({n}):</strong> {fibonacci(n)}
        </p>
        <p>
          <strong>Function Call Count:</strong> {callCount}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Try calling with the same number again - the cached result will be returned instantly without recalculating.
        </p>
      </div>
    </div>
  );
}
```

