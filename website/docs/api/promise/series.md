---
id: series
title: series
description: 'Executes multiple promises in series (one after another)'
---

# `series`

Executes multiple promises in series (one after another). This is useful for tasks that have dependencies or need to be executed sequentially to maintain order or prevent resource conflicts.

## Syntax

```typescript
function series<T>(tasks: Array<() => Promise<T> | T>): Promise<T[]>;
```

## Parameters

| Parameter | Type                           | Required | Default | Description                                       |
| --------- | ------------------------------ | -------- | ------- | ------------------------------------------------- |
| `tasks`   | `Array<() => Promise<T> \| T>` | ✅       | -       | Array of functions that return promises or values |

## Return Value

- **Type**: `Promise<T[]>`
- **Description**: Returns a promise that resolves with an array of results in the same order as tasks. If any task fails, the promise rejects immediately with that error.

## Examples

### Basic Usage

```typescript
import { series } from '@rabjs/kit';

// Example 1: Execute tasks sequentially
const results = await series([() => fetchUser(1), () => fetchUser(2), () => fetchUser(3)]);
console.log(results); // [user1, user2, user3]

// Example 2: Sequential operations with dependencies
const results = await series([() => createDatabase(), () => initializeTables(), () => seedData()]);
```

### Advanced Usage

```typescript
// Example 3: Building a chain of dependent operations
async function setupApplication() {
  return series([() => connectToDatabase(), () => loadConfiguration(), () => initializeCache(), () => startServer()]);
}

// Example 4: Processing with state accumulation
let state = { step: 0 };
const results = await series([
  () => {
    state.step = 1;
    return 'step 1 complete';
  },
  () => {
    state.step = 2;
    return 'step 2 complete';
  },
  () => {
    state.step = 3;
    return 'step 3 complete';
  },
]);
```

### Real-world Application Scenarios

```typescript
// Example 5: Database migration workflow
async function runMigrations() {
  return series([
    () => db.createTable('users'),
    () => db.createTable('posts'),
    () => db.createTable('comments'),
    () => db.createIndex('users', 'email'),
    () => db.createIndex('posts', 'user_id'),
    () => db.seedData('users', initialUsers),
  ]);
}

// Example 6: Multi-step authentication process
async function authenticateUser(credentials: any) {
  return series([
    () => validateCredentials(credentials),
    () => lookupUser(credentials.email),
    () => verifyPassword(credentials.password),
    () => generateToken(),
    () => updateLastLogin(),
  ]);
}

// Example 7: Data processing pipeline with sequential steps
async function processDataFile(filePath: string) {
  return series([
    () => readFile(filePath),
    () => parseData(),
    () => validateData(),
    () => transformData(),
    () => saveToDatabase(),
    () => generateReport(),
  ]);
}

// Example 8: API synchronization workflow
async function syncExternalAPI() {
  return series([
    () => fetchRemoteData(),
    () => compareWithLocal(),
    () => identifyChanges(),
    () => updateLocalDatabase(),
    () => notifySubscribers(),
    () => logSyncEvent(),
  ]);
}

// Example 9: Sequential batch operations
async function processBatchSequentially(batches: any[][]) {
  return series(batches.map((batch) => () => Promise.all(batch.map((item) => processItem(item)))));
}

// Example 10: Cleanup and teardown in reverse order
async function setupAndTeardown() {
  const resources = [];

  try {
    const results = await series([
      () => acquireResource('database').then((r) => (resources.push(r), r)),
      () => acquireResource('cache').then((r) => (resources.push(r), r)),
      () => acquireResource('logger').then((r) => (resources.push(r), r)),
      () => runMainTask(resources),
    ]);
    return results;
  } finally {
    // Cleanup in reverse order
    await series(resources.reverse().map((resource) => () => resource.release()));
  }
}
```

## Interactive Example

```tsx live
function SeriesExample() {
  const [taskCount, setTaskCount] = React.useState(4);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const tasks = Array.from({ length: taskCount }, (_, i) => () => {
      const delay = Math.random() * 1000 + 300;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            taskId: i + 1,
            delay: Math.round(delay),
            timestamp: new Date().toLocaleTimeString(),
          });
        }, delay);
      });
    });

    try {
      const startTime = Date.now();
      const results = await series(tasks);
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        results,
        stats: {
          taskCount,
          totalTime: duration,
          avgTime: Math.round(duration / taskCount),
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
      <h4>series Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Number of Tasks: </label>
          <input
            type="number"
            value={taskCount}
            onChange={(e) => setTaskCount(Math.max(1, Number(e.target.value)))}
            min="1"
            max="10"
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
        {loading ? 'Executing...' : 'Execute Series'}
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
                  <div>Average per Task: {result.stats.avgTime}ms</div>
                </div>
              </div>
              <div>
                <strong>Results (Sequential Order):</strong>
                <div style={{ fontSize: '12px', marginTop: '5px', maxHeight: '200px', overflow: 'auto' }}>
                  {result.results.map((r, idx) => (
                    <div
                      key={idx}
                      style={{ padding: '4px', background: '#f9f9f9', marginBottom: '4px', borderRadius: '2px' }}
                    >
                      Task {r.taskId}: {r.delay}ms - {r.timestamp}
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

- ⚠️ **Sequential Execution**: Tasks execute one after another; total time is sum of all task times
- 💡 **Performance Tip**: Use `parallel` for independent tasks to improve performance
- 🔒 **Error Handling**: If any task fails, the entire promise rejects; use try-catch
- 📚 **Best Practice**: Use series for tasks with dependencies or when order matters
- ⚠️ **Resource Management**: Series execution is slower but safer for resource-constrained operations

## Related Functions

- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`map`](./map) - Async map with concurrency control
- [`filter`](./filter) - Async filter with concurrency control
- [`reduce`](./reduce) - Async reduce operation

## Version History

- **v1.0.0** - Initial version
