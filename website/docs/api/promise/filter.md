---
id: filter
title: filter
description: 'Iterates over an array and returns a promise that resolves with an array of elements that pass the predicate test'
---

# `filter`

Iterates over an array and returns a promise that resolves with an array of elements that pass the predicate test. Supports concurrency limiting for controlled async filtering operations.

## Syntax

```typescript
function filter<T>(
  array: T[],
  predicate: (value: T, index: number) => Promise<boolean> | boolean,
  concurrency?: number,
): Promise<T[]>;
```

## Parameters

| Parameter     | Type                                                       | Required | Default    | Description                                                          |
| ------------- | ---------------------------------------------------------- | -------- | ---------- | -------------------------------------------------------------------- |
| `array`       | `T[]`                                                      | ✅       | -          | The array to iterate over                                            |
| `predicate`   | `(value: T, index: number) => Promise<boolean> \| boolean` | ✅       | -          | The function to test each element (can be async or return a promise) |
| `concurrency` | `number`                                                   | ❌       | `Infinity` | The maximum number of concurrent operations                          |

## Return Value

- **Type**: `Promise<T[]>`
- **Description**: Returns a promise that resolves with an array of elements that passed the predicate test, in the same order as the input array. If any predicate fails, the promise rejects immediately.

## Examples

### Basic Usage

```typescript
import { filter } from '@rabjs/kit';

// Example 1: Simple filtering
const numbers = [1, 2, 3, 4, 5];
const evens = await filter(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4]

// Example 2: Async filtering with concurrency control
const userIds = [1, 2, 3, 4, 5];
const activeUsers = await filter(
  userIds,
  (id) => checkUserActive(id),
  2, // Max 2 concurrent checks
);
console.log(activeUsers); // [1, 3, 5] (assuming these are active)
```

### Advanced Usage

```typescript
// Example 3: Using index in predicate
const items = ['apple', 'banana', 'orange', 'grape'];
const longNames = await filter(items, (item, index) => item.length > 5);

// Example 4: Complex async validation
const users = await filter(
  userIds,
  async (id) => {
    const user = await fetchUser(id);
    return user.status === 'active' && user.verified;
  },
  3,
);

// Example 5: Filtering with side effects
const validated = await filter(
  records,
  async (record) => {
    try {
      await validateRecord(record);
      return true;
    } catch (error) {
      logError(record.id, error);
      return false;
    }
  },
  5,
);
```

### Real-world Application Scenarios

```typescript
// Example 6: Filtering valid email addresses
async function filterValidEmails(emails: string[]) {
  return filter(
    emails,
    async (email) => {
      try {
        const result = await verifyEmail(email);
        return result.isValid;
      } catch {
        return false;
      }
    },
    5, // Max 5 concurrent email verifications
  );
}

// Example 7: Filtering accessible URLs
async function filterAccessibleUrls(urls: string[]) {
  return filter(
    urls,
    async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
        return response.ok;
      } catch {
        return false;
      }
    },
    3,
  );
}

// Example 8: Database query filtering
async function filterByDatabaseCriteria(ids: number[], criteria: any) {
  return filter(
    ids,
    async (id) => {
      const record = await db.findById(id);
      return record && matchesCriteria(record, criteria);
    },
    10, // Batch size for database queries
  );
}

// Example 9: Permission-based filtering
async function filterAccessibleResources(resourceIds: string[], userId: string) {
  return filter(
    resourceIds,
    async (resourceId) => {
      const hasAccess = await checkUserAccess(userId, resourceId);
      return hasAccess;
    },
    5,
  );
}

// Example 10: Image validation filtering
async function filterValidImages(imagePaths: string[]) {
  return filter(
    imagePaths,
    async (path) => {
      try {
        const image = await loadImage(path);
        return image.width >= 800 && image.height >= 600;
      } catch {
        return false;
      }
    },
    3, // Max 3 concurrent image loads
  );
}

// Example 11: API response filtering with retry
async function filterWithRetry(items: any[], predicate: (item: any) => Promise<boolean>) {
  return filter(
    items,
    async (item) => {
      for (let i = 0; i < 3; i++) {
        try {
          return await predicate(item);
        } catch (error) {
          if (i === 2) return false;
          await new Promise((r) => setTimeout(r, 100 * (i + 1)));
        }
      }
      return false;
    },
    3,
  );
}
```

## Interactive Example

```tsx live
function FilterExample() {
  const [itemCount, setItemCount] = React.useState(10);
  const [concurrency, setConcurrency] = React.useState(3);
  const [threshold, setThreshold] = React.useState(50);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const items = Array.from({ length: itemCount }, (_, i) => ({
      id: i + 1,
      value: Math.random() * 100,
    }));

    try {
      const startTime = Date.now();
      const filtered = await filter(
        items,
        (item) => {
          // Simulate async operation
          return new Promise((resolve) => {
            setTimeout(
              () => {
                resolve(item.value >= threshold);
              },
              Math.random() * 500 + 100,
            );
          });
        },
        concurrency,
      );
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        original: items,
        filtered,
        stats: {
          totalItems: items.length,
          filteredCount: filtered.length,
          concurrency,
          totalTime: duration,
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
      <h4>filter Interactive Example</h4>
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
        <div style={{ marginBottom: '10px' }}>
          <label>Threshold Value: </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            min="0"
            max="100"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>(Keep values ≥ {threshold})</span>
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
        {loading ? 'Filtering...' : 'Execute Filter'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Filter Stats:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>Total Items: {result.stats.totalItems}</div>
                  <div>Filtered Count: {result.stats.filteredCount}</div>
                  <div>Concurrency: {result.stats.concurrency}</div>
                  <div>Total Time: {result.stats.totalTime}ms</div>
                </div>
              </div>
              <div>
                <strong>Filtered Results:</strong>
                <div style={{ fontSize: '12px', marginTop: '5px', maxHeight: '200px', overflow: 'auto' }}>
                  {result.filtered.length > 0 ? (
                    result.filtered.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ padding: '4px', background: '#f9f9f9', marginBottom: '4px', borderRadius: '2px' }}
                      >
                        ID {item.id}: {item.value.toFixed(2)}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#999' }}>No items match the criteria</div>
                  )}
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
- 💡 **Performance Tip**: For async predicates, concurrency of 3-5 is usually optimal
- 🔒 **Error Handling**: If any predicate fails, the entire promise rejects; use try-catch
- 📚 **Best Practice**: Use concurrency limits to respect API rate limits and prevent resource exhaustion
- ⚠️ **Order Preservation**: Results are returned in the same order as input items

## Related Functions

- [`map`](./map) - Async map with concurrency control
- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`series`](./series) - Execute tasks sequentially
- [`reduce`](./reduce) - Async reduce operation

## Version History

- **v1.0.0** - Initial version
