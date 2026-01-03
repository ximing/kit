---
id: chunk
title: chunk
description: 'Splits an array into chunks of a specified size'
---

# `chunk`

Splits an array into chunks of a specified size. This is a highly practical utility function commonly used for pagination, batch processing, and data organization.

## Syntax

```typescript
function chunk<T>(array: T[], size: number): T[][];
```

## Parameters

| Parameter | Type     | Required | Default | Description                                        |
| --------- | -------- | -------- | ------- | -------------------------------------------------- |
| `array`   | `T[]`    | ✅       | -       | The array to split                                 |
| `size`    | `number` | ✅       | -       | The size of each chunk, must be a positive integer |

## Return Value

- **Type**: `T[][]`
- **Description**: A two-dimensional array containing the chunks. Returns an empty array if the input is invalid or size is non-positive.

## Examples

### Basic Usage

```typescript
import { chunk } from '@rabjs/kit';

// Example 1: Chunking a number array
const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunked = chunk(numbers, 3);
console.log(chunked); // [[1, 2, 3], [4, 5, 6], [7]]

// Example 2: Chunking a string array
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
const fruitChunks = chunk(fruits, 2);
console.log(fruitChunks); // [['apple', 'banana'], ['orange', 'grape'], ['kiwi']]
```

### Advanced Usage

```typescript
// Example 3: Processing object arrays
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
];
const userBatches = chunk(users, 3);
console.log(userBatches);
// [
//   [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }],
//   [{ id: 4, name: 'David' }, { id: 5, name: 'Eve' }]
// ]

// Example 4: Combining with other functions
const processInBatches = (data: number[], batchSize: number) => {
  return chunk(data, batchSize).map((batch) => batch.reduce((sum, num) => sum + num, 0));
};
const results = processInBatches([1, 2, 3, 4, 5, 6], 2);
console.log(results); // [3, 7, 11] (sum of each chunk)
```

### Real-world Applications

```typescript
// Example 5: Paginating data
function paginateData<T>(data: T[], itemsPerPage: number = 10) {
  const pages = chunk(data, itemsPerPage);

  return {
    totalPages: pages.length,
    totalItems: data.length,
    getPage: (pageIndex: number) => pages[pageIndex] || [],
    pages,
  };
}

// Usage example
const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));
const pagination = paginateData(products, 10);
console.log(pagination.totalPages); // 3
console.log(pagination.getPage(0).length); // 10
console.log(pagination.getPage(2).length); // 5

// Example 6: Batch API requests
async function batchFetch<T>(ids: string[], batchSize: number = 50): Promise<T[]> {
  const batches = chunk(ids, batchSize);
  const results = await Promise.all(batches.map((batch) => fetch(`/api/items?ids=${batch.join(',')}`)));
  return results.flatMap((res) => res.json());
}
```

## Interactive Example

```tsx live
function ChunkExample() {
  const [input, setInput] = React.useState('1,2,3,4,5,6,7,8,9');
  const [size, setSize] = React.useState(3);
  const [result, setResult] = React.useState(null);

  const handleChunk = () => {
    try {
      const array = input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      const chunked = chunk(array, size);
      setResult(chunked);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleChunk();
  }, [input, size]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>chunk Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>Input array (comma-separated): </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '200px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Chunk size: </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min="1"
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
      </div>
      <div>
        <strong>Result:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Edge Case**: When `size` is less than or equal to 0, the function returns an empty array
- ⚠️ **Edge Case**: When input is not an array, the function returns an empty array
- 💡 **Performance**: For large arrays, this function has O(n) time complexity with good performance
- 🔒 **Type Safety**: The function supports generics, maintaining type consistency between input and output
- 📚 **Best Practice**: Validate the `size` parameter before use to ensure it's a positive integer

## Related Functions

- [`flatten`](./flatten) - Flattens nested arrays into a single-dimensional array
- [`take`](./zip#take) - Takes a specified number of elements from the beginning of an array
- [`drop`](./zip#drop) - Skips a specified number of elements from the beginning of an array
- [`groupBy`](../collection/groupBy) - Groups array elements by a criterion

## Version History

- **v0.0.1** - Initial release
