---
id: map
title: map
description: 'Iterates over an array and returns a promise that resolves with an array of mapped values'
---

# `map`

Iterates over an array and returns a promise that resolves with an array of mapped values. Supports concurrency limiting for controlled async transformations.

## Syntax

```typescript
function map<T, U>(array: T[], mapper: (value: T, index: number) => Promise<U> | U, concurrency?: number): Promise<U[]>;
```

## Parameters

| Parameter     | Type                                           | Required | Default    | Description                                                              |
| ------------- | ---------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------ |
| `array`       | `T[]`                                          | ✅       | -          | The array to iterate over                                                |
| `mapper`      | `(value: T, index: number) => Promise<U> \| U` | ✅       | -          | The function to apply to each element (can be async or return a promise) |
| `concurrency` | `number`                                       | ❌       | `Infinity` | The maximum number of concurrent operations                              |

## Return Value

- **Type**: `Promise<U[]>`
- **Description**: Returns a promise that resolves with an array of mapped values in the same order as the input array. If any mapper fails, the promise rejects immediately.

## Examples

### Basic Usage

```typescript
import { map } from '@rabjs/kit';

// Example 1: Simple async mapping
const ids = [1, 2, 3];
const users = await map(ids, (id) => fetchUser(id));
console.log(users); // [user1, user2, user3]

// Example 2: Mapping with concurrency limit
const numbers = [1, 2, 3, 4, 5];
const doubled = await map(numbers, (n) => Promise.resolve(n * 2), 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Advanced Usage

```typescript
// Example 3: Using index in mapper
const items = ['a', 'b', 'c'];
const indexed = await map(items, (item, index) => ({
  item,
  index,
  processed: true,
}));

// Example 4: Chaining async operations
const results = await map(
  urls,
  (url) => fetch(url).then((r) => r.json()),
  3, // Max 3 concurrent requests
);

// Example 5: Complex transformation
const transformed = await map(
  records,
  async (record) => {
    const processed = await processRecord(record);
    const saved = await saveToDatabase(processed);
    return saved;
  },
  5, // Max 5 concurrent operations
);
```

### Real-world Application Scenarios

```typescript
// Example 6: Fetching user details with concurrency control
async function enrichUsersWithDetails(userIds: number[]) {
  return map(
    userIds,
    async (userId) => {
      const user = await fetchUser(userId);
      const profile = await fetchUserProfile(userId);
      const settings = await fetchUserSettings(userId);
      return { ...user, profile, settings };
    },
    3, // Max 3 concurrent enrichment operations
  );
}

// Example 7: Batch processing with transformation
async function processBatch(items: Item[], batchSize: number = 10) {
  return map(
    items,
    async (item) => {
      const validated = validateItem(item);
      if (!validated) throw new Error(`Invalid item: ${item.id}`);
      return transformItem(item);
    },
    batchSize,
  );
}

// Example 8: Image processing pipeline
async function processImageBatch(imagePaths: string[]) {
  return map(
    imagePaths,
    async (path) => {
      const image = await loadImage(path);
      const resized = await resizeImage(image, { width: 800, height: 600 });
      const compressed = await compressImage(resized);
      const url = await uploadImage(compressed);
      return { path, url };
    },
    4, // Max 4 concurrent image operations
  );
}

// Example 9: API data transformation
async function fetchAndTransformData(endpoints: string[]) {
  return map(
    endpoints,
    async (endpoint) => {
      const response = await fetch(`/api${endpoint}`);
      const data = await response.json();
      return {
        endpoint,
        data,
        fetchedAt: new Date(),
        count: Array.isArray(data) ? data.length : 1,
      };
    },
    5,
  );
}

// Example 10: Database migration with progress
async function migrateRecords(records: any[], concurrency: number = 10) {
  let processed = 0;
  return map(
    records,
    async (record) => {
      const migrated = migrateRecord(record);
      const saved = await db.save(migrated);
      processed++;
      console.log(`Migrated ${processed}/${records.length}`);
      return saved;
    },
    concurrency,
  );
}
```

## Interactive Example

```tsx live
function MapExample() {
  const [itemCount, setItemCount] = React.useState(10);
  const [concurrency, setConcurrency] = React.useState(3);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const items = Array.from({ length: itemCount }, (_, i) => i + 1);

    try {
      const startTime = Date.now();
      const results = await map(
        items,
        (item) => {
          const delay = Math.random() * 1000 + 300;
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                input: item,
                output: item * 2,
                delay: Math.round(delay),
              });
            }, delay);
          });
        },
        concurrency,
      );
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        results,
        stats: {
          itemCount,
          concurrency,
          totalTime: duration,
          avgDelay: Math.round(results.reduce((sum, r) => sum + r.delay, 0) / results.length),
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
      <h4>map Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Number of Items: </label>
          <input
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(Math.max(1, Number(e.target.value)))}
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
        {loading ? 'Processing...' : 'Execute Map'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Execution Stats:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>Total Time: {result.duration}ms</div>
                  <div>Items: {result.stats.itemCount}</div>
                  <div>Concurrency: {result.stats.concurrency}</div>
                  <div>Avg Delay: {result.stats.avgDelay}ms</div>
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
                      {r.input} → {r.output} ({r.delay}ms)
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

- ⚠️ **Concurrency Control**: Set appropriate concurrency to balance performance and resource usage
- 💡 **Performance Tip**: For network operations, concurrency of 3-5 is usually optimal
- 🔒 **Error Handling**: If any mapper fails, the entire promise rejects; use try-catch
- 📚 **Best Practice**: Use concurrency limits to respect API rate limits and prevent resource exhaustion
- ⚠️ **Order Preservation**: Results are returned in the same order as input items

## Related Functions

- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`series`](./series) - Execute tasks sequentially
- [`filter`](./filter) - Async filter with concurrency control
- [`reduce`](./reduce) - Async reduce operation

## Version History

- **v1.0.0** - Initial version
