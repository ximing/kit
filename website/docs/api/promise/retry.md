---
id: retry
title: retry
description: 'Retries a function until it succeeds or max attempts are reached'
---

# `retry`

Retries a function until it succeeds or max attempts are reached. This is a practical utility for handling transient failures, network errors, and unreliable operations with customizable retry strategies including exponential backoff.

## Syntax

```typescript
function retry<T>(
  fn: () => T | Promise<T>,
  options?: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (attempt: number, error: Error) => void;
  },
): Promise<T>;
```

## Parameters

| Parameter             | Type                                      | Required | Default | Description                                                                  |
| --------------------- | ----------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------- |
| `fn`                  | `() => T \| Promise<T>`                   | ✅       | -       | The function to retry (can be async or return a promise)                     |
| `options`             | `object`                                  | ❌       | -       | Configuration options for retry behavior                                     |
| `options.maxAttempts` | `number`                                  | ❌       | `3`     | Maximum number of attempts before giving up                                  |
| `options.delay`       | `number`                                  | ❌       | `1000`  | Delay between attempts in milliseconds                                       |
| `options.backoff`     | `number`                                  | ❌       | `1`     | Backoff multiplier for exponential backoff (1 = no backoff, 2 = exponential) |
| `options.onRetry`     | `(attempt: number, error: Error) => void` | ❌       | -       | Callback function called on each retry with attempt number and error         |

## Return Value

- **Type**: `Promise<T>`
- **Description**: Returns a promise that resolves with the function result if successful, or rejects with the last error if all attempts fail.

## Examples

### Basic Usage

```typescript
import { retry } from '@rabjs/kit';

// Example 1: Simple retry with default settings
const data = await retry(() => fetchData());
console.log(data); // Data fetched successfully

// Example 2: Retry with custom max attempts
const result = await retry(() => fetchAPI(), { maxAttempts: 5 });
console.log(result); // API response after up to 5 attempts
```

### Advanced Usage

```typescript
// Example 3: Exponential backoff strategy
const data = await retry(() => fetchData(), {
  maxAttempts: 5,
  delay: 1000,
  backoff: 2, // 1000ms, 2000ms, 4000ms, 8000ms
  onRetry: (attempt, error) => {
    console.log(`Attempt ${attempt} failed: ${error.message}`);
  },
});

// Example 4: With async function
const user = await retry(
  async () => {
    const response = await fetch('/api/user');
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
  { maxAttempts: 3, delay: 500 },
);
```

### Real-world Application Scenarios

```typescript
// Example 5: Database connection retry
async function connectToDatabase() {
  return retry(() => db.connect(), {
    maxAttempts: 5,
    delay: 2000,
    backoff: 1.5,
    onRetry: (attempt, error) => {
      console.warn(`Database connection attempt ${attempt} failed: ${error.message}`);
    },
  });
}

// Example 6: API call with intelligent retry
async function fetchUserWithRetry(userId: string) {
  return retry(
    async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (response.status === 429) {
        throw new Error('Rate limited - will retry');
      }
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
    {
      maxAttempts: 4,
      delay: 1000,
      backoff: 2,
      onRetry: (attempt, error) => {
        logger.info(`Retry attempt ${attempt}: ${error.message}`);
      },
    },
  );
}

// Example 7: Batch operation with retry
async function processBatchWithRetry(items: any[], processor: (item: any) => Promise<void>) {
  for (const item of items) {
    try {
      await retry(() => processor(item), {
        maxAttempts: 3,
        delay: 500,
      });
    } catch (error) {
      console.error(`Failed to process item after retries:`, error);
      // Handle failure appropriately
    }
  }
}
```

## Interactive Example

```tsx live
function RetryExample() {
  const [attempts, setAttempts] = React.useState(3);
  const [delay, setDelay] = React.useState(500);
  const [backoff, setBackoff] = React.useState(1);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRetry = async () => {
    setLoading(true);
    setResult(null);

    let attemptCount = 0;
    const logs = [];

    try {
      const result = await retry(
        () => {
          attemptCount++;
          // Simulate random failure (60% chance to fail on first 2 attempts)
          if (attemptCount <= 2 && Math.random() < 0.6) {
            throw new Error(`Simulated failure on attempt ${attemptCount}`);
          }
          return `Success on attempt ${attemptCount}!`;
        },
        {
          maxAttempts: attempts,
          delay: delay,
          backoff: backoff,
          onRetry: (attempt, error) => {
            logs.push(`Attempt ${attempt} failed: ${error.message}`);
          },
        },
      );

      setResult({
        success: true,
        message: result,
        logs: logs,
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
        logs: logs,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>retry Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Max Attempts: </label>
          <input
            type="number"
            value={attempts}
            onChange={(e) => setAttempts(Math.max(1, Number(e.target.value)))}
            min="1"
            max="10"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Delay (ms): </label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Math.max(0, Number(e.target.value)))}
            min="0"
            step="100"
            style={{ width: '80px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Backoff Multiplier: </label>
          <input
            type="number"
            value={backoff}
            onChange={(e) => setBackoff(Math.max(1, Number(e.target.value)))}
            min="1"
            step="0.5"
            style={{ width: '80px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
      </div>
      <button
        onClick={handleRetry}
        disabled={loading}
        style={{
          padding: '8px 16px',
          background: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Retrying...' : 'Start Retry'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Result:</strong>
            <div style={{ color: result.success ? 'green' : 'red', marginTop: '5px' }}>{result.message}</div>
          </div>
          {result.logs.length > 0 && (
            <div>
              <strong>Retry Logs:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {result.logs.map((log, idx) => (
                  <li key={idx} style={{ fontSize: '12px', color: '#666' }}>
                    {log}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

## Notes

- ⚠️ **Exponential Backoff**: With `backoff: 2` and `delay: 1000`, retry delays are: 1000ms, 2000ms, 4000ms, 8000ms
- 💡 **Performance Tip**: Use exponential backoff for external API calls to avoid overwhelming the server
- 🔒 **Error Handling**: The function rejects with the last error if all attempts fail
- 📚 **Best Practice**: Implement the `onRetry` callback to log retry attempts for debugging
- ⚠️ **Caution**: Be careful with backoff multipliers - they can lead to very long delays with many attempts

## Related Functions

- [`timeout`](./timeout) - Adds timeout control to promises
- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`series`](./series) - Execute multiple promises sequentially
- [`map`](./map) - Async map with concurrency control

## Version History

- **v1.0.0** - Initial version
