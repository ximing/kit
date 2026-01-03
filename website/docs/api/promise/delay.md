---
id: delay
title: delay
description: 'Returns a promise that resolves after a specified delay with an optional value.'
---

# `delay`

Returns a promise that resolves after a specified delay with an optional value.

## Parameters

| Parameter | Type  | Description                                               |
| --------- | ----- | --------------------------------------------------------- |
| `ms`      | `any` | - The number of milliseconds to delay                     |
| `value`   | `any` | - The optional value to resolve with (default: undefined) |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves after the delay

## Examples

```typescript
* await delay(1000); // Waits 1 second
 *
 *
```

```typescript
* const result = await delay(500, 'Hello');
 * console.log(result); // 'Hello' after 500ms
```

## Interactive Example

```tsx live
function DelayExample() {
  const [delayMs, setDelayMs] = useState(1000);
  const [message, setMessage] = useState('Hello!');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setElapsedTime(null);
    const start = Date.now();
    setStartTime(start);

    await delay(delayMs, message);

    const elapsed = Date.now() - start;
    setElapsedTime(elapsed);
    setResult(message);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Delay Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Delay (ms): </label>
          <input
            type="number"
            min="100"
            max="5000"
            step="100"
            value={delayMs}
            onChange={(e) => setDelayMs(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Message: </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '200px' }}
          />
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
          {loading ? 'Waiting...' : 'Execute Delay'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        {loading && <p style={{ color: '#ff9800' }}>⏳ Waiting for {delayMs}ms...</p>}
        {result && (
          <div>
            <p style={{ color: '#4caf50', fontWeight: 'bold' }}>✓ Resolved with: "{result}"</p>
            <p style={{ fontSize: '14px', color: '#666' }}>Actual elapsed time: {elapsedTime}ms</p>
          </div>
        )}
      </div>
    </div>
  );
}
```
