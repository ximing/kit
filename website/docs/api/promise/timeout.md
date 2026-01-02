---
id: timeout
title: timeout
description: "Returns a promise that rejects if the given promise doesn't settle within the specified time."
---

# `timeout`

Returns a promise that rejects if the given promise doesn't settle within the specified time.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `promise` | `any` | - The promise to wrap with a timeout |
| `ms` | `any` | - The timeout in milliseconds |
| `message` | `any` | - The error message to use when timeout occurs (default: 'Promise timeout') |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves or rejects based on the original promise or timeout

## Examples

```typescript
* try {
 *   const result = await timeout(fetchData(), 5000);
 * } catch (error) {
 *   console.log(error.message); // 'Promise timeout'
 * }
 *
 *
```

```typescript
* const result = await timeout(fetchData(), 5000, 'Request took too long');
```

## Interactive Example

```tsx live
function TimeoutExample() {
  const [timeoutMs, setTimeoutMs] = useState(2000);
  const [operationMs, setOperationMs] = useState(1500);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Simulate an async operation
      const operation = delay(operationMs, 'Operation completed successfully!');
      
      // Wrap it with timeout
      const data = await timeout(
        operation,
        timeoutMs,
        `Operation timed out after ${timeoutMs}ms`
      );

      setResult(data as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const willTimeout = operationMs > timeoutMs;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Timeout Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Timeout (ms): </label>
          <input
            type="number"
            min="500"
            max="5000"
            step="100"
            value={timeoutMs}
            onChange={(e) => setTimeoutMs(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Operation Duration (ms): </label>
          <input
            type="number"
            min="500"
            max="5000"
            step="100"
            value={operationMs}
            onChange={(e) => setOperationMs(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          backgroundColor: willTimeout ? '#ffebee' : '#e8f5e9',
          border: `1px solid ${willTimeout ? '#ef5350' : '#66bb6a'}`
        }}>
          <strong>Prediction:</strong>{' '}
          {willTimeout ? (
            <span style={{ color: '#d32f2f' }}>
              ⚠️ Will timeout ({operationMs}ms {'>'} {timeoutMs}ms)
            </span>
          ) : (
            <span style={{ color: '#388e3c' }}>
              ✓ Will complete in time ({operationMs}ms {'<='} {timeoutMs}ms)
            </span>
          )}
        </div>
        <button
          onClick={handleExecute}
          disabled={loading}
          style={{
            padding: '8px 20px',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Running...' : 'Test Timeout'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        {loading && (
          <p style={{ color: '#ff9800' }}>
            ⏳ Operation in progress...
          </p>
        )}
        {result && (
          <p style={{ marginTop: '10px', color: '#4caf50', fontWeight: 'bold' }}>
            ✓ Success: {result}
          </p>
        )}
        {error && (
          <p style={{ marginTop: '10px', color: '#f44336', fontWeight: 'bold' }}>
            ✗ Error: {error}
          </p>
        )}
      </div>
    </div>
  );
}
```

