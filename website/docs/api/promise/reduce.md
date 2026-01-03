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
function ReduceExample() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const numbers = [1, 2, 3, 4, 5];

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setProgress([]);
    const startTime = Date.now();

    const sum = await reduce(
      numbers,
      async (acc, num) => {
        const msg = `Adding ${num} to ${acc}...`;
        setProgress((prev) => [...prev, msg]);

        // Simulate async operation
        await delay(300);

        const newAcc = acc + num;
        const resultMsg = `${acc} + ${num} = ${newAcc}`;
        setProgress((prev) => [...prev, resultMsg]);

        return newAcc;
      },
      0,
    );

    const elapsed = Date.now() - startTime;
    setResult(sum);
    setProgress((prev) => [...prev, `\nCompleted in ${elapsed}ms`]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Reduce Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(numbers)}
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>Operation: Sum all numbers (async)</p>
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
          {loading ? 'Reducing...' : 'Calculate Sum'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
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
        {result !== null && (
          <p style={{ marginTop: '10px' }}>
            <strong>Final Result:</strong>{' '}
            <span style={{ fontSize: '18px', color: '#1976d2', fontWeight: 'bold' }}>{result}</span>
          </p>
        )}
      </div>
    </div>
  );
}
```
