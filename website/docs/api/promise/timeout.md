---
id: timeout
title: timeout
description: "Returns a promise that rejects if the given promise doesn't settle within the specified time"
---

# `timeout`

Returns a promise that rejects if the given promise doesn't settle within the specified time. This is a practical utility for controlling promise execution time and preventing operations from hanging indefinitely.

## Syntax

```typescript
function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>;
```

## Parameters

| Parameter | Type         | Required | Default             | Description                                  |
| --------- | ------------ | -------- | ------------------- | -------------------------------------------- |
| `promise` | `Promise<T>` | ✅       | -                   | The promise to wrap with a timeout           |
| `ms`      | `number`     | ✅       | -                   | The timeout duration in milliseconds         |
| `message` | `string`     | ❌       | `'Promise timeout'` | The error message to use when timeout occurs |

## Return Value

- **Type**: `Promise<T>`
- **Description**: Returns a promise that resolves or rejects based on the original promise or timeout. If the timeout is reached before the promise settles, it rejects with a timeout error.

## Examples

### Basic Usage

```typescript
import { timeout } from '@rabjs/kit';

// Example 1: Simple timeout with default message
try {
  const result = await timeout(fetchData(), 5000);
  console.log(result); // Data fetched within 5 seconds
} catch (error) {
  console.error(error.message); // 'Promise timeout'
}

// Example 2: Timeout with custom error message
try {
  const response = await timeout(fetchAPI(), 3000, 'API request took too long');
  console.log(response); // API response
} catch (error) {
  console.error(error.message); // 'API request took too long'
}
```

### Advanced Usage

```typescript
// Example 3: Timeout with multiple operations
async function fetchWithTimeout(url: string, timeoutMs: number = 5000) {
  try {
    const response = await timeout(fetch(url), timeoutMs, `Request to ${url} timed out`);
    return await response.json();
  } catch (error) {
    if (error.message.includes('timed out')) {
      console.warn('Request timeout, using cached data...');
      return getCachedData(url);
    }
    throw error;
  }
}

// Example 4: Combining multiple timeouts
const [user, posts, comments] = await Promise.all([
  timeout(fetchUser(userId), 3000, 'User fetch timeout'),
  timeout(fetchPosts(userId), 3000, 'Posts fetch timeout'),
  timeout(fetchComments(userId), 3000, 'Comments fetch timeout'),
]);
```

### Real-world Application Scenarios

```typescript
// Example 5: Database query timeout
async function queryWithTimeout(query: string, timeoutMs: number = 10000) {
  return timeout(db.query(query), timeoutMs, `Database query exceeded ${timeoutMs}ms timeout`);
}

// Example 6: File upload with timeout
async function uploadFileWithTimeout(file: File, uploadUrl: string) {
  const formData = new FormData();
  formData.append('file', file);

  return timeout(
    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    }),
    30000, // 30 second timeout for file upload
    'File upload timed out',
  );
}

// Example 7: Cascading timeouts for reliability
async function reliableFetch(url: string, retries: number = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await timeout(
        fetch(url),
        5000 + i * 1000, // Increase timeout on each retry
        `Attempt ${i + 1} timed out after ${5000 + i * 1000}ms`,
      );
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// Example 8: Timeout with cleanup
async function operationWithCleanup(operation: Promise<any>) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timeout')), 5000);
  });

  try {
    return await timeout(operation, 5000, 'Operation exceeded time limit');
  } finally {
    // Cleanup logic here
    console.log('Operation cleanup completed');
  }
}
```

## Interactive Example

```tsx live
function TimeoutExample() {
  const [duration, setDuration] = React.useState(3000);
  const [operationTime, setOperationTime] = React.useState(2000);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);

    // Create a simulated operation
    const operation = new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Operation completed after ${operationTime}ms`);
      }, operationTime);
    });

    try {
      const result = await timeout(operation, duration, `Timeout exceeded: ${duration}ms`);
      setResult({
        success: true,
        message: result,
        status: 'Operation completed successfully',
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
        status: 'Operation timed out',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>timeout Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Timeout Duration (ms): </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Math.max(100, Number(e.target.value)))}
            min="100"
            step="100"
            style={{ width: '100px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{duration}ms</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Operation Duration (ms): </label>
          <input
            type="number"
            value={operationTime}
            onChange={(e) => setOperationTime(Math.max(100, Number(e.target.value)))}
            min="100"
            step="100"
            style={{ width: '100px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{operationTime}ms</span>
        </div>
      </div>
      <div style={{ marginBottom: '15px', fontSize: '12px', color: '#666' }}>
        <div>
          {operationTime <= duration ? (
            <span style={{ color: 'green' }}>✓ Operation will complete before timeout</span>
          ) : (
            <span style={{ color: 'red' }}>✗ Operation will timeout</span>
          )}
        </div>
      </div>
      <button
        onClick={handleTest}
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
        {loading ? 'Running...' : 'Test Timeout'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          <div style={{ marginBottom: '5px' }}>
            <strong>Status:</strong>
            <span
              style={{
                marginLeft: '10px',
                color: result.success ? 'green' : 'red',
              }}
            >
              {result.status}
            </span>
          </div>
          <div>
            <strong>Message:</strong>
            <div
              style={{ marginTop: '5px', padding: '8px', background: '#f9f9f9', borderRadius: '4px', fontSize: '12px' }}
            >
              {result.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Notes

- ⚠️ **Original Promise**: The original promise continues to execute even if timeout is reached; use cleanup logic if needed
- 💡 **Performance Tip**: Set reasonable timeouts based on expected operation duration to catch hanging operations
- 🔒 **Error Handling**: Timeout errors are distinguishable from other errors by their message
- 📚 **Best Practice**: Use custom error messages to identify which operation timed out
- ⚠️ **Resource Management**: Be aware that the original promise may still consume resources after timeout

## Related Functions

- [`retry`](./retry) - Retry operations with exponential backoff
- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`series`](./series) - Execute multiple promises sequentially
- [`delay`](./delay) - Delay promise resolution

## Version History

- **v0.0.1** - Initial version
