---
id: parallel
title: parallel
description: 'Executes multiple promises in parallel with a concurrency limit'
---

# `parallel`

Executes multiple promises in parallel with a concurrency limit. This is a practical utility for managing concurrent operations, controlling resource usage, and preventing overwhelming external services.

## Syntax

```typescript
function parallel<T>(tasks: Array<() => Promise<T> | T>, concurrency?: number): Promise<T[]>;
```

## Parameters

| Parameter     | Type                           | Required | Default    | Description                                       |
| ------------- | ------------------------------ | -------- | ---------- | ------------------------------------------------- |
| `tasks`       | `Array<() => Promise<T> \| T>` | ✅       | -          | Array of functions that return promises or values |
| `concurrency` | `number`                       | ❌       | `Infinity` | Maximum number of concurrent promises to execute  |

## Return Value

- **Type**: `Promise<T[]>`
- **Description**: Returns a promise that resolves with an array of results in the same order as tasks. If any task fails, the promise rejects immediately with that error.

## Examples

### Basic Usage

```typescript
import { parallel } from '@rabjs/kit';

// Example 1: Execute all tasks concurrently
const results = await parallel([() => fetchUser(1), () => fetchUser(2), () => fetchUser(3)]);
console.log(results); // [user1, user2, user3] in order

// Example 2: With concurrency limit
const results = await parallel([() => fetchUser(1), () => fetchUser(2), () => fetchUser(3)], 2); // Max 2 concurrent requests
console.log(results); // [user1, user2, user3]
```

### Advanced Usage

```typescript
// Example 3: Mixed sync and async tasks
const results = await parallel([
  () => 'sync value',
  async () => await fetchData(),
  () => Promise.resolve('promise value'),
  () => expensiveComputation(),
]);

// Example 4: Processing large datasets with concurrency control
async function processUsers(userIds: number[]) {
  const tasks = userIds.map((id) => () => fetchAndProcessUser(id));
  return parallel(tasks, 5); // Process max 5 users concurrently
}

const processedUsers = await processUsers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### Real-world Application Scenarios

```typescript
// Example 5: Batch API calls with concurrency control
async function fetchMultipleResources(urls: string[], maxConcurrent: number = 3) {
  const tasks = urls.map((url) => () => fetch(url).then((res) => res.json()));
  return parallel(tasks, maxConcurrent);
}

const data = await fetchMultipleResources(['/api/users', '/api/posts', '/api/comments', '/api/tags'], 2);

// Example 6: Database operations with concurrency limit
async function bulkInsertWithConcurrency(records: any[], batchSize: number = 10) {
  const tasks = records.map((record) => () => db.insert(record));
  return parallel(tasks, batchSize);
}

// Example 7: Image processing with concurrency control
async function processImages(imagePaths: string[], maxConcurrent: number = 4) {
  const tasks = imagePaths.map(
    (path) => () =>
      loadImage(path)
        .then((img) => resizeImage(img))
        .then((img) => compressImage(img)),
  );
  return parallel(tasks, maxConcurrent);
}

// Example 8: Parallel data fetching with retry logic
async function fetchDataWithRetry(dataIds: string[]) {
  const tasks = dataIds.map(
    (id) => () =>
      retry(() => fetchData(id), {
        maxAttempts: 3,
        delay: 500,
      }),
  );
  return parallel(tasks, 5);
}

// Example 9: Timeout-protected parallel execution
async function fetchWithTimeout(urls: string[], timeoutMs: number = 5000) {
  const tasks = urls.map(
    (url) => () =>
      timeout(
        fetch(url).then((r) => r.json()),
        timeoutMs,
      ),
  );
  return parallel(tasks, 3);
}
```

## Interactive Example

```tsx live
function ParallelExample() {
  const [taskCount, setTaskCount] = React.useState(6);
  const [concurrency, setConcurrency] = React.useState(3);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const tasks = Array.from({ length: taskCount }, (_, i) => () => {
      const delay = Math.random() * 2000 + 500; // 500-2500ms
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: i + 1,
            delay: Math.round(delay),
            timestamp: new Date().toLocaleTimeString(),
          });
        }, delay);
      });
    });

    try {
      const startTime = Date.now();
      const results = await parallel(tasks, concurrency);
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        results,
        stats: {
          taskCount,
          concurrency,
          totalTime: duration,
          estimatedParallel: Math.ceil(results.reduce((sum, r) => sum + r.delay, 0) / concurrency),
        },
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>parallel Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Number of Tasks: </label>
          <input
            type="number"
            value={taskCount}
            onChange={(e) => setTaskCount(Math.max(1, Number(e.target.value)))}
            min="1"
            max="20"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Concurrency: </label>
          <input
            type="number"
            value={concurrency}
            onChange={(e) => setConcurrency(Math.max(1, Number(e.target.value)))}
            min="1"
            max="20"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
      </div>
      <button
        onClick={handleExecute}
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
        {loading ? 'Executing...' : 'Execute Parallel'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Execution Stats:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>Total Time: {result.duration}ms</div>
                  <div>Tasks: {result.stats.taskCount}</div>
                  <div>Concurrency: {result.stats.concurrency}</div>
                </div>
              </div>
              <div>
                <strong>Results:</strong>
                <div style={{ fontSize: '12px', marginTop: '5px', maxHeight: '200px', overflow: 'auto' }}>
                  {result.results.map((r, idx) => (
                    <div
                      key={idx}
                      style={{ padding: '4px', background: '#f9f9f9', marginBottom: '4px', borderRadius: '2px' }}
                    >
                      Task {r.id}: {r.delay}ms - {r.timestamp}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={{ color: 'red' }}>Error: {result.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
```

## Notes

- ⚠️ **Concurrency Limit**: Setting concurrency to a reasonable value prevents resource exhaustion
- 💡 **Performance Tip**: For I/O-bound operations, higher concurrency is beneficial; for CPU-bound, match your CPU cores
- 🔒 **Error Handling**: If any task fails, the entire promise rejects immediately; use try-catch to handle
- 📚 **Best Practice**: Use concurrency limits when making external API calls to respect rate limits
- ⚠️ **Order Preservation**: Results are returned in the same order as tasks, regardless of completion order

## Related Functions

- [`series`](./series) - Execute multiple promises sequentially
- [`map`](./map) - Async map with concurrency control
- [`retry`](./retry) - Retry operations with exponential backoff
- [`timeout`](./timeout) - Add timeout control to promises

## Version History

- **v1.0.0** - Initial version
