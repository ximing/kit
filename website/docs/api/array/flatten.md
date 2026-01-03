---
id: flatten
title: flatten
description: 'Flattens an array to a specified depth'
---

# `flatten`

Flattens nested arrays to a specified depth level. The function includes `flattenDeep` for completely flattening deeply nested arrays.

## Syntax

```typescript
function flatten<T>(array: any[], depth?: number): T[];
function flattenDeep<T>(array: any[]): T[];
```

## Parameters

### `flatten`

| Parameter | Type     | Required | Default | Description                                       |
| --------- | -------- | -------- | ------- | ------------------------------------------------- |
| `array`   | `any[]`  | ✅       | -       | The array to flatten                              |
| `depth`   | `number` | ❌       | `1`     | The depth level to flatten (must be non-negative) |

### `flattenDeep`

| Parameter | Type    | Required | Default | Description                     |
| --------- | ------- | -------- | ------- | ------------------------------- |
| `array`   | `any[]` | ✅       | -       | The array to completely flatten |

## Return Value

- **Type**: `T[]`
- **Description**: A new flattened array. Returns an empty array if input is not an array.

## Examples

### Basic Usage

```typescript
import { flatten, flattenDeep } from '@rabjs/kit';

// Example 1: Single level flattening (default depth = 1)
const nested1 = [1, [2, 3], [4, [5]]];
const flattened1 = flatten(nested1);
console.log(flattened1); // [1, 2, 3, 4, [5]]

// Example 2: Flatten with specific depth
const nested2 = [1, [2, [3, [4]]]];
const flattened2 = flatten(nested2, 2);
console.log(flattened2); // [1, 2, 3, [4]]

// Example 3: Deep flattening
const deepNested = [1, [2, [3, [4, [5]]]]];
const deepFlattened = flattenDeep(deepNested);
console.log(deepFlattened); // [1, 2, 3, 4, 5]
```

### Advanced Usage

```typescript
// Example 4: Flattening mixed types
const mixed = [1, [2, 'three'], [[4, true], { five: 5 }]];
const flatMixed = flatten(mixed, 2);
console.log(flatMixed); // [1, 2, 'three', 4, true, { five: 5 }]

// Example 5: Processing nested data structures
interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}

function getAllCategoryIds(categories: Category[]): number[] {
  const nested = categories.map((cat) => [cat.id, cat.subcategories ? getAllCategoryIds(cat.subcategories) : []]);
  return flattenDeep(nested);
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    subcategories: [
      { id: 11, name: 'Laptops' },
      { id: 12, name: 'Phones' },
    ],
  },
  {
    id: 2,
    name: 'Books',
    subcategories: [{ id: 21, name: 'Fiction' }],
  },
];
console.log(getAllCategoryIds(categories)); // [1, 11, 12, 2, 21]

// Example 6: Combining with array operations
const data = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const sum = flattenDeep(data).reduce((acc, num) => acc + num, 0);
console.log(sum); // 21
```

### Real-world Applications

```typescript
// Example 7: Flattening API responses
interface ApiResponse {
  page: number;
  items: string[];
}

async function fetchAllPages(): Promise<string[]> {
  const pages = await Promise.all([
    fetch('/api/items?page=1').then((r) => r.json()),
    fetch('/api/items?page=2').then((r) => r.json()),
    fetch('/api/items?page=3').then((r) => r.json()),
  ]);

  const items = pages.map((page: ApiResponse) => page.items);
  return flattenDeep(items);
}

// Example 8: Processing tree structures
interface TreeNode {
  value: number;
  children?: TreeNode[];
}

function collectTreeValues(nodes: TreeNode[]): number[] {
  const values = nodes.map((node) => {
    const childValues = node.children ? collectTreeValues(node.children) : [];
    return [node.value, childValues];
  });
  return flattenDeep(values);
}

const tree: TreeNode[] = [
  {
    value: 1,
    children: [{ value: 2 }, { value: 3, children: [{ value: 4 }] }],
  },
  { value: 5 },
];
console.log(collectTreeValues(tree)); // [1, 2, 3, 4, 5]

// Example 9: Batch processing with nested arrays
function processBatches(batches: number[][]): number[] {
  return flatten(batches).filter((n) => n > 0);
}

const batches = [
  [1, 2, 3],
  [4, 5],
  [6, 7, 8],
];
console.log(processBatches(batches)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

## Interactive Example

```tsx live
function FlattenExample() {
  const [input, setInput] = React.useState('[1,[2,3],[4,[5,6]]]');
  const [depth, setDepth] = React.useState(1);
  const [mode, setMode] = React.useState('flatten');
  const [result, setResult] = React.useState(null);

  const handleFlatten = () => {
    try {
      const array = JSON.parse(input);
      if (!Array.isArray(array)) {
        setResult('Error: Input must be an array');
        return;
      }

      const flattened = mode === 'deep' ? flattenDeep(array) : flatten(array, depth);

      setResult({
        original: array,
        flattened: flattened,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleFlatten();
  }, [input, depth, mode]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>flatten Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>Input (JSON array): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Mode: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '5px', marginRight: '10px' }}>
          <option value="flatten">flatten (with depth)</option>
          <option value="deep">flattenDeep</option>
        </select>
        {mode === 'flatten' && (
          <>
            <label>Depth: </label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              min="0"
              style={{ width: '60px', padding: '5px' }}
            />
          </>
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

- ⚠️ **Edge Case**: When `depth` is 0 or negative, returns the original array
- ⚠️ **Edge Case**: When input is not an array, returns an empty array
- 💡 **Performance**: Recursive implementation with O(n) time complexity for total elements
- 🔒 **Type Safety**: Generic types help maintain type information where possible
- 📚 **Best Practice**: Use `flatten(arr, 1)` for single-level flattening, `flattenDeep(arr)` for complete flattening
- ⚡ **Memory**: Creates a new array; does not mutate the original
- 🎯 **Use Case**: Useful for processing API responses, tree structures, and nested data transformations

## Related Functions

- [`chunk`](./chunk) - Splits array into chunks (opposite operation)
- [`compact`](./compact) - Removes falsy values from arrays
- [Native `Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) - ES2019 alternative

## Version History

- **v0.0.1** - Initial release
