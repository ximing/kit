---
id: filter
title: filter
description: 'Iterates over an array and returns a promise that resolves with an array of elements that pass the predicate test. Supports concurrency limiting.'
---

# `filter`

Iterates over an array and returns a promise that resolves with an array of elements
that pass the predicate test. Supports concurrency limiting.

## 参数

| 参数          | 类型  | 描述                                                                   |
| ------------- | ----- | ---------------------------------------------------------------------- |
| `array`       | `any` | - The array to iterate over                                            |
| `predicate`   | `any` | - The function to test each element (can be async or return a promise) |
| `concurrency` | `any` | - The maximum number of concurrent operations (default: Infinity)      |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves with an array of elements that passed the test

## 示例

```typescript
* const numbers = [1, 2, 3, 4, 5];
 * const evens = await filter(numbers, (n) => n % 2 === 0);
 *
 *
```

```typescript
* const users = await filter(userIds, (id) => checkUserActive(id), 2); // Max 2 concurrent checks
```

## 交互式示例

```tsx live
function FilterExample() {
  const [concurrency, setConcurrency] = useState(2);
  const [result, setResult] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setProgress([]);
    const startTime = Date.now();

    const filtered = await filter(
      numbers,
      async (num) => {
        const msg = `Checking ${num}...`;
        setProgress((prev) => [...prev, msg]);

        // Simulate async operation
        await delay(300);

        const isEven = num % 2 === 0;
        const resultMsg = `${num} is ${isEven ? 'even ✓' : 'odd ✗'}`;
        setProgress((prev) => [...prev, resultMsg]);

        return isEven;
      },
      concurrency,
    );

    const elapsed = Date.now() - startTime;
    setResult(filtered);
    setProgress((prev) => [...prev, `\nCompleted in ${elapsed}ms`]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Filter Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Concurrency: </label>
          <input
            type="number"
            min="1"
            max="8"
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>(max {concurrency} at a time)</span>
        </div>
        <button
          onClick={handleExecute}
          disabled={loading}
          style={{
            padding: '8px 20px',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Filtering...' : 'Filter Even Numbers'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(numbers)}
        </p>
        {progress.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <strong>Progress:</strong>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '12px',
                maxHeight: '200px',
                overflow: 'auto',
              }}
            >
              {progress.join('\n')}
            </pre>
          </div>
        )}
        {result && (
          <p style={{ marginTop: '10px' }}>
            <strong>Result:</strong>{' '}
            <span style={{ color: '#1976d2', fontWeight: 'bold' }}>{JSON.stringify(result)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
```
