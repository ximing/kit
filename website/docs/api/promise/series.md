---
id: series
title: series
description: "Executes multiple promises in series (one after another)."
---

# `series`

Executes multiple promises in series (one after another).

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `tasks` | `any` | - An array of functions that return promises |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves with an array of results in the same order as tasks

## Examples

```typescript
* const results = await series([
 *   () => fetchUser(1),
 *   () => fetchUser(2),
 *   () => fetchUser(3)
 * ]); // Executes one after another
 *
 *
```

```typescript
* const results = await series([
 *   () => delay(100, 'a'),
 *   () => delay(50, 'b'),
 *   () => delay(150, 'c')
 * ]); // Total time: 300ms
```

## Interactive Example

```tsx live
function SeriesExample() {
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const tasks = [
    { name: 'Task A', duration: 800 },
    { name: 'Task B', duration: 600 },
    { name: 'Task C', duration: 1000 },
    { name: 'Task D', duration: 400 },
  ];

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setProgress([]);
    const startTime = Date.now();

    const results = await series(
      tasks.map((task) => async () => {
        const msg = `Started: ${task.name} (${task.duration}ms)`;
        setProgress((prev) => [...prev, msg]);
        
        await delay(task.duration);
        
        const resultMsg = `Completed: ${task.name}`;
        setProgress((prev) => [...prev, resultMsg]);
        
        return `${task.name} result`;
      })
    );

    const elapsed = Date.now() - startTime;
    setResult(results);
    setProgress((prev) => [...prev, `\nTotal time: ${elapsed}ms`]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Series Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>Tasks (executed one after another):</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '14px' }}>
            {tasks.map((task, index) => (
              <li key={index}>
                {task.name}: {task.duration}ms
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
            Expected total time: {tasks.reduce((sum, t) => sum + t.duration, 0)}ms
          </p>
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
          {loading ? 'Executing...' : 'Execute Series Tasks'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        {progress.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <strong>Progress:</strong>
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '12px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {progress.join('\n')}
            </pre>
          </div>
        )}
        {result && (
          <div style={{ marginTop: '10px' }}>
            <p>
              <strong>Results:</strong>
            </p>
            <pre style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
```

