---
id: reduce
title: reduce
description: 'Iterates over an array and reduces it to a single value using an async reducer function'
---

# `reduce`

Iterates over an array and reduces it to a single value using an async reducer function. This is useful for accumulating values, aggregating data, and complex transformations where each step depends on the previous result.

## Syntax

```typescript
function reduce<T, U>(
  array: T[],
  reducer: (accumulator: U, value: T, index: number) => Promise<U> | U,
  initialValue: U,
): Promise<U>;
```

## Parameters

| Parameter      | Type                                                           | Required | Default | Description                                                            |
| -------------- | -------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------- |
| `array`        | `T[]`                                                          | ✅       | -       | The array to reduce                                                    |
| `reducer`      | `(accumulator: U, value: T, index: number) => Promise<U> \| U` | ✅       | -       | The function to reduce each element (can be async or return a promise) |
| `initialValue` | `U`                                                            | ✅       | -       | The initial value for the accumulator                                  |

## Return Value

- **Type**: `Promise<U>`
- **Description**: Returns a promise that resolves with the final accumulated value. If any reducer call fails, the promise rejects immediately.

## Examples

### Basic Usage

```typescript
import { reduce } from '@rabjs/kit';

// Example 1: Sum of numbers
const sum = await reduce([1, 2, 3, 4], (acc, value) => Promise.resolve(acc + value), 0);
console.log(sum); // 10

// Example 2: Building an object from array
const result = await reduce(['a', 'b', 'c'], (acc, value) => ({ ...acc, [value]: value.toUpperCase() }), {});
console.log(result); // { a: 'A', b: 'B', c: 'C' }
```

### Advanced Usage

```typescript
// Example 3: Fetching and accumulating user data
const users = await reduce(
  userIds,
  async (acc, id) => {
    const user = await fetchUser(id);
    return [...acc, user];
  },
  [],
);

// Example 4: Complex aggregation with async operations
const aggregated = await reduce(
  records,
  async (acc, record) => {
    const processed = await processRecord(record);
    const saved = await saveToDatabase(processed);
    return {
      ...acc,
      count: acc.count + 1,
      total: acc.total + saved.value,
      items: [...acc.items, saved],
    };
  },
  { count: 0, total: 0, items: [] },
);

// Example 5: Building a dependency chain
const result = await reduce(
  operations,
  async (acc, operation) => {
    const result = await operation(acc);
    return result;
  },
  initialState,
);
```

### Real-world Application Scenarios

```typescript
// Example 6: Calculating total price with tax and discount
async function calculateOrderTotal(items: OrderItem[]) {
  return reduce(
    items,
    async (acc, item) => {
      const itemPrice = await fetchItemPrice(item.id);
      return acc + itemPrice * item.quantity;
    },
    0,
  );
}

// Example 7: Grouping data by category
async function groupByCategory(items: any[]) {
  return reduce(
    items,
    async (acc, item) => {
      const category = await fetchCategory(item.categoryId);
      return {
        ...acc,
        [category.name]: [...(acc[category.name] || []), item],
      };
    },
    {},
  );
}

// Example 8: Merging API responses
async function mergeAPIResponses(endpoints: string[]) {
  return reduce(
    endpoints,
    async (acc, endpoint) => {
      const response = await fetch(`/api${endpoint}`).then((r) => r.json());
      return {
        ...acc,
        ...response,
      };
    },
    {},
  );
}

// Example 9: Building a tree structure
async function buildHierarchy(nodes: any[]) {
  return reduce(
    nodes,
    async (acc, node) => {
      const parent = await fetchParent(node.parentId);
      return {
        ...acc,
        [node.id]: {
          ...node,
          parent: parent ? parent.name : null,
        },
      };
    },
    {},
  );
}

// Example 10: Accumulating statistics
async function gatherStatistics(dataPoints: any[]) {
  return reduce(
    dataPoints,
    async (acc, point) => {
      const processed = await processDataPoint(point);
      return {
        count: acc.count + 1,
        sum: acc.sum + processed.value,
        min: Math.min(acc.min, processed.value),
        max: Math.max(acc.max, processed.value),
        average: (acc.sum + processed.value) / (acc.count + 1),
      };
    },
    { count: 0, sum: 0, min: Infinity, max: -Infinity, average: 0 },
  );
}

// Example 11: Sequential batch processing
async function processBatchSequentially(items: any[]) {
  return reduce(
    items,
    async (acc, item) => {
      const result = await processBatch(item);
      return {
        ...acc,
        processed: acc.processed + 1,
        results: [...acc.results, result],
      };
    },
    { processed: 0, results: [] },
  );
}
```

## Interactive Example

```tsx live
function ReduceExample() {
  const [itemCount, setItemCount] = React.useState(5);
  const [operation, setOperation] = React.useState('sum');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const items = Array.from({ length: itemCount }, (_, i) => i + 1);

    try {
      const startTime = Date.now();
      let reduceResult;

      if (operation === 'sum') {
        reduceResult = await reduce(
          items,
          async (acc, value) => {
            await new Promise((r) => setTimeout(r, Math.random() * 200 + 50));
            return acc + value;
          },
          0,
        );
      } else if (operation === 'product') {
        reduceResult = await reduce(
          items,
          async (acc, value) => {
            await new Promise((r) => setTimeout(r, Math.random() * 200 + 50));
            return acc * value;
          },
          1,
        );
      } else {
        reduceResult = await reduce(
          items,
          async (acc, value) => {
            await new Promise((r) => setTimeout(r, Math.random() * 200 + 50));
            return acc + value * value;
          },
          0,
        );
      }

      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        result: reduceResult,
        stats: {
          itemCount,
          operation,
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
      <h4>reduce Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Number of Items: </label>
          <input
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(Math.max(1, Number(e.target.value)))}
            min="1"
            max="10"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Operation: </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="sum">Sum</option>
            <option value="product">Product</option>
            <option value="sumOfSquares">Sum of Squares</option>
          </select>
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
        {loading ? 'Reducing...' : 'Execute Reduce'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Result: {result.result}</strong>
              </div>
              <div>
                <strong>Stats:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>Items: {result.stats.itemCount}</div>
                  <div>Operation: {result.stats.operation}</div>
                  <div>Total Time: {result.stats.totalTime}ms</div>
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

- ⚠️ **Sequential Execution**: Reduce always executes sequentially; each step waits for the previous one
- 💡 **Performance Tip**: For independent operations, consider using `map` with `parallel` instead
- 🔒 **Error Handling**: If any reducer call fails, the entire promise rejects; use try-catch
- 📚 **Best Practice**: Use reduce for operations where each step depends on the previous result
- ⚠️ **Memory Usage**: Be careful with accumulator objects that grow with each iteration

## Related Functions

- [`map`](./map) - Async map with concurrency control
- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`series`](./series) - Execute tasks sequentially
- [`filter`](./filter) - Async filter with concurrency control

## Version History

- **v1.0.0** - Initial version
