---
id: zip
title: zip
description: 'Zips arrays together, takes first N elements, or drops first N elements'
---

# `zip`

Creates an array of grouped elements from multiple arrays. This module also includes `take` and `drop` for extracting subsets of arrays.

## Syntax

```typescript
function zip<T>(...arrays: T[][]): T[][];
function take<T>(array: T[], n?: number): T[];
function drop<T>(array: T[], n?: number): T[];
```

## Parameters

### `zip`

| Parameter   | Type    | Required | Default | Description            |
| ----------- | ------- | -------- | ------- | ---------------------- |
| `...arrays` | `T[][]` | ❌       | -       | Arrays to zip together |

### `take`

| Parameter | Type     | Required | Default | Description                |
| --------- | -------- | -------- | ------- | -------------------------- |
| `array`   | `T[]`    | ✅       | -       | The array to take from     |
| `n`       | `number` | ❌       | `1`     | Number of elements to take |

### `drop`

| Parameter | Type     | Required | Default | Description                |
| --------- | -------- | -------- | ------- | -------------------------- |
| `array`   | `T[]`    | ✅       | -       | The array to drop from     |
| `n`       | `number` | ❌       | `1`     | Number of elements to drop |

## Return Value

### `zip`

- **Type**: `T[][]`
- **Description**: Array of grouped elements. Length equals minimum array length.

### `take`

- **Type**: `T[]`
- **Description**: New array with first `n` elements. Returns empty array if `n` ≤ 0.

### `drop`

- **Type**: `T[]`
- **Description**: New array without first `n` elements. Returns copy if `n` ≤ 0.

## Examples

### Basic Usage

```typescript
import { zip, take, drop } from '@rabjs/kit';

// Example 1: Zip two arrays
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [25, 30, 35];
const zipped = zip(names, ages);
console.log(zipped);
// [['Alice', 25], ['Bob', 30], ['Charlie', 35]]

// Example 2: Take first N elements
const numbers = [1, 2, 3, 4, 5];
const firstThree = take(numbers, 3);
console.log(firstThree); // [1, 2, 3]

// Example 3: Drop first N elements
const remaining = drop(numbers, 2);
console.log(remaining); // [3, 4, 5]

// Example 4: Zip with different lengths (uses shortest)
const short = ['a', 'b'];
const long = [1, 2, 3, 4];
const zipped2 = zip(short, long);
console.log(zipped2); // [['a', 1], ['b', 2]]
```

### Advanced Usage

```typescript
// Example 5: Creating key-value pairs
const keys = ['name', 'email', 'age'];
const values = ['Alice', 'alice@example.com', 25];
const keyValuePairs = zip(keys, values);
const obj = Object.fromEntries(keyValuePairs);
console.log(obj);
// { name: 'Alice', email: 'alice@example.com', age: 25 }

// Example 6: Pagination with take
function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  const pageItems = drop(items, startIndex);
  return take(pageItems, pageSize);
}

const allItems = Array.from({ length: 25 }, (_, i) => i + 1);
console.log(paginate(allItems, 2, 10)); // [11, 12, ..., 20]
console.log(paginate(allItems, 3, 10)); // [21, 22, 23, 24, 25]

// Example 7: Merging parallel arrays
interface User {
  id: number;
  name: string;
  score: number;
}

function combineUserData(ids: number[], names: string[], scores: number[]): User[] {
  return zip(ids, names, scores).map(([id, name, score]) => ({
    id: id as number,
    name: name as string,
    score: score as number,
  }));
}

const ids = [1, 2, 3];
const names = ['Alice', 'Bob', 'Charlie'];
const scores = [95, 87, 92];
console.log(combineUserData(ids, names, scores));
// [
//   { id: 1, name: 'Alice', score: 95 },
//   { id: 2, name: 'Bob', score: 87 },
//   { id: 3, name: 'Charlie', score: 92 }
// ]
```

### Real-world Applications

```typescript
// Example 8: CSV-like data processing
function createTableData(headers: string[], ...rows: any[][]): Array<Record<string, any>> {
  return rows.map((row) => {
    const pairs = zip(headers, row);
    return Object.fromEntries(pairs);
  });
}

const headers = ['Name', 'Age', 'City'];
const row1 = ['Alice', 25, 'NYC'];
const row2 = ['Bob', 30, 'LA'];
const tableData = createTableData(headers, row1, row2);
console.log(tableData);
// [
//   { Name: 'Alice', Age: 25, City: 'NYC' },
//   { Name: 'Bob', Age: 30, City: 'LA' }
// ]

// Example 9: Infinite scroll implementation
class InfiniteScrollList<T> {
  private items: T[];
  private loadedCount: number = 0;
  private batchSize: number = 20;

  constructor(items: T[]) {
    this.items = items;
  }

  loadMore(): T[] {
    const remaining = drop(this.items, this.loadedCount);
    const batch = take(remaining, this.batchSize);
    this.loadedCount += batch.length;
    return batch;
  }

  reset() {
    this.loadedCount = 0;
  }

  hasMore(): boolean {
    return this.loadedCount < this.items.length;
  }
}

const list = new InfiniteScrollList(Array.from({ length: 100 }, (_, i) => i));
console.log(list.loadMore()); // [0, 1, ..., 19]
console.log(list.loadMore()); // [20, 21, ..., 39]

// Example 10: Comparing two datasets
function compareArrays<T>(oldData: T[], newData: T[], compareCount: number = 10): { old: T[]; new: T[] } {
  return {
    old: take(oldData, compareCount),
    new: take(newData, compareCount),
  };
}

const oldProducts = ['A', 'B', 'C', 'D', 'E'];
const newProducts = ['A', 'X', 'C', 'Y', 'E'];
console.log(compareArrays(oldProducts, newProducts, 3));
// { old: ['A', 'B', 'C'], new: ['A', 'X', 'C'] }
```

## Interactive Example

```tsx live
function ZipTakeDropExample() {
  const [array1, setArray1] = React.useState('a,b,c,d,e');
  const [array2, setArray2] = React.useState('1,2,3,4,5');
  const [n, setN] = React.useState(3);
  const [operation, setOperation] = React.useState('zip');
  const [result, setResult] = React.useState(null);

  const handleOperation = () => {
    try {
      const arr1 = array1
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const arr2 = array2
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      let output;
      if (operation === 'zip') {
        output = zip(arr1, arr2);
      } else if (operation === 'take') {
        output = take(arr1, n);
      } else {
        output = drop(arr1, n);
      }

      setResult({
        operation,
        array1: arr1,
        array2: operation === 'zip' ? arr2 : undefined,
        n: operation !== 'zip' ? n : undefined,
        result: output,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleOperation();
  }, [array1, array2, n, operation]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>zip/take/drop Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>Operation: </label>
          <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{ padding: '5px' }}>
            <option value="zip">zip</option>
            <option value="take">take</option>
            <option value="drop">drop</option>
          </select>
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 1: </label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        {operation === 'zip' && (
          <div style={{ marginBottom: '5px' }}>
            <label>Array 2 (for zip): </label>
            <input
              type="text"
              value={array2}
              onChange={(e) => setArray2(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        )}
        {operation !== 'zip' && (
          <div style={{ marginBottom: '5px' }}>
            <label>N (for take/drop): </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              min="0"
              style={{ width: '80px', padding: '5px' }}
            />
          </div>
        )}
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

- ⚠️ **Zip Length**: Result length equals shortest input array length
- ⚠️ **Edge Case**: `zip()` with no arrays returns `[]`
- ⚠️ **Edge Case**: `take/drop` with invalid array returns `[]`
- ⚠️ **Edge Case**: `take/drop` with `n` ≤ 0 returns `[]` or original array copy
- 💡 **Performance**: All functions are O(n) time complexity
- 🔒 **Type Safety**: Generics maintain type information where possible
- 📚 **Best Practice**: Use `zip` for combining parallel data, `take/drop` for pagination
- ⚡ **Immutability**: All functions return new arrays, originals unchanged
- 🎯 **Use Case**: Data transformation, pagination, CSV processing, parallel arrays

## Related Functions

- [`chunk`](./chunk) - Splits array into fixed-size chunks
- [`flatten`](./flatten) - Opposite of zip in some scenarios
- [Native `Array.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) - Low-level slicing

## Version History

- **v1.0.0** - Initial release
