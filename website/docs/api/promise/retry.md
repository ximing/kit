---
id: retry
title: retry
description: "Retries a function until it succeeds or max attempts are reached."
---

# `retry`

Retries a function until it succeeds or max attempts are reached.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `fn` | `any` | - The function to retry (can be async or return a promise) |
| `options` | `any` | - The options object |
| `options` | `any` | .maxAttempts - Maximum number of attempts (default: 3) |
| `options` | `any` | .delay - Delay between attempts in milliseconds (default: 1000) |
| `options` | `any` | .backoff - Backoff multiplier for exponential backoff (default: 1, no backoff) |
| `options` | `any` | .onRetry - Callback function called on each retry with the attempt number and error |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves with the function result or rejects with the last error

## Examples

```typescript
* const result = await retry(() => fetchData(), { maxAttempts: 5, delay: 1000 });
 *
 *
```

```typescript
* const result = await retry(() => fetchData(), {
 *   maxAttempts: 5,
 *   delay: 1000,
 *   backoff: 2, // exponential backoff
 *   onRetry: (attempt, error) => console.log(`Attempt ${attempt} failed: ${error.message}`)
 * });
```

## Interactive Example

```tsx live
function RetryExample() {
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [delayMs, setDelayMs] = useState(1000);
  const [backoff, setBackoff] = useState(1);
  const [failureRate, setFailureRate] = useState(0.6);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    setLogs([]);
    let attemptCount = 0;

    try {
      const mockFetch = () => {
        attemptCount++;
        const shouldFail = Math.random() < failureRate;
        
        if (shouldFail) {
          throw new Error(`Request failed (attempt ${attemptCount})`);
        }
        
        return 'Success! Data fetched';
      };

      const data = await retry(mockFetch, {
        maxAttempts,
        delay,
        onRetry: (attempt, error) => {
          const waitTime = delayMs * Math.pow(backoff, attempt - 1);
          const msg = `Attempt ${attempt} failed: ${error.message}\nRetrying in ${waitTime}ms...`;
          setLogs((prev) => [...prev, msg]);
        }
      });

      setResult(data);
      setLogs((prev) => [...prev, `✓ Succeeded after ${attemptCount} attempt(s)`]);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLogs((prev) => [...prev, `✗ All ${maxAttempts} attempts failed`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Retry Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Max Attempts: </label>
          <input
            type="number"
            min="1"
            max="10"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Delay (ms): </label>
          <input
            type="number"
            min="100"
            max="3000"
            step="100"
            value={delayMs}
            onChange={(e) => setDelayMs(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '80px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Backoff: </label>
          <input
            type="number"
            min="1"
            max="3"
            step="0.5"
            value={backoff}
            onChange={(e) => setBackoff(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
          <span style={{ marginLeft: '5px', fontSize: '12px', color: '#666' }}>
            (1=no backoff, 2=exponential)
          </span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Failure Rate: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={failureRate}
            onChange={(e) => setFailureRate(Number(e.target.value))}
            disabled={loading}
            style={{ width: '150px', verticalAlign: 'middle' }}
          />
          <span style={{ marginLeft: '10px' }}>{(failureRate * 100).toFixed(0)}%</span>
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
          {loading ? 'Retrying...' : 'Test Retry Logic'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        {logs.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <strong>Logs:</strong>
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '12px',
              maxHeight: '200px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {logs.join('\n\n')}
            </pre>
          </div>
        )}
        {result && (
          <p style={{ marginTop: '10px', color: '#4caf50', fontWeight: 'bold' }}>
            ✓ Result: {result}
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

