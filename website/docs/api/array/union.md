---
id: union
title: union
description: 'Creates an array of unique values from all given arrays'
---

# `union`

Creates an array containing all unique values from all provided arrays. This is the set union operation with automatic deduplication.

## Syntax

```typescript
function union<T>(...arrays: T[][]): T[];
```

## Parameters

| Parameter   | Type    | Required | Default | Description                       |
| ----------- | ------- | -------- | ------- | --------------------------------- |
| `...arrays` | `T[][]` | ❌       | -       | Arrays to combine and deduplicate |

## Return Value

- **Type**: `T[]`
- **Description**: A new array containing all unique values from all input arrays. Returns an empty array if no arrays provided.

## Examples

### Basic Usage

```typescript
import { union } from '@rabjs/kit';

// Example 1: Basic union
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const combined = union(array1, array2);
console.log(combined); // [1, 2, 3, 4, 5]

// Example 2: Multiple arrays
const a = [1, 2];
const b = [2, 3];
const c = [3, 4];
const result = union(a, b, c);
console.log(result); // [1, 2, 3, 4]

// Example 3: String arrays
const tags1 = ['javascript', 'react'];
const tags2 = ['react', 'vue'];
const tags3 = ['angular', 'vue'];
const allTags = union(tags1, tags2, tags3);
console.log(allTags); // ['javascript', 'react', 'vue', 'angular']
```

### Advanced Usage

```typescript
// Example 4: Merging user permissions
function mergePermissions(...userPermissions: number[][]): number[] {
  return union(...userPermissions);
}

const admin = [1, 2, 3, 4, 5];
const editor = [2, 3, 6];
const viewer = [7, 8];
console.log(mergePermissions(admin, editor, viewer));
// [1, 2, 3, 4, 5, 6, 7, 8]

// Example 5: Combining search results
interface SearchResult {
  id: string;
  title: string;
}

function mergeSearchResults(...resultSets: string[][]): string[] {
  return union(...resultSets);
}

const dbResults = ['id1', 'id2', 'id3'];
const cacheResults = ['id2', 'id3', 'id4'];
const indexResults = ['id3', 'id4', 'id5'];
console.log(mergeSearchResults(dbResults, cacheResults, indexResults));
// ['id1', 'id2', 'id3', 'id4', 'id5']

// Example 6: Order preservation
const first = [3, 1, 2];
const second = [2, 4, 1];
const ordered = union(first, second);
console.log(ordered); // [3, 1, 2, 4] - order from first occurrence
```

### Real-world Applications

```typescript
// Example 7: Aggregating tags from multiple sources
class TagAggregator {
  getAllTags(...tagArrays: string[][]): string[] {
    return union(...tagArrays);
  }

  mergePosts(posts: Array<{ tags: string[] }>): string[] {
    const tagArrays = posts.map(post => post.tags);
    return union(...tagArrays);
  }
}

const aggregator = new TagAggregator();
const posts = [
  { tags: ['javascript', 'react'] },
  { tags: ['react', 'typescript'] },
  { tags: ['node', 'javascript'] }
];
console.log(aggregator.mergePosts(posts));
// ['javascript', 'react', 'typescript', 'node']

// Example 8: Combining feature sets
function getAllFeatures(
  baseFeatures: string[],
  premiumFeatures: string[],
  betaFeatures: string[]
): string[] {
  return union(baseFeatures, premiumFeatures, betaFeatures);
}

const base = ['login', 'profile', 'dashboard'];
const premium = ['analytics', 'export', 'dashboard'];
const beta = ['ai-assistant', 'export'];
console.log(getAllFeatures(base, premium, beta));
// ['login', 'profile', 'dashboard', 'analytics', 'export', 'ai-assistant']

// Example 9: Merging notification recipients
async function getAll Recipients(eventId: string): Promise<string[]> {
  const [subscribers, participants, admins] = await Promise.all([
    fetch(`/api/events/${eventId}/subscribers`).then(r => r.json()),
    fetch(`/api/events/${eventId}/participants`).then(r => r.json()),
    fetch(`/api/events/${eventId}/admins`).then(r => r.json())
  ]);

  return union(subscribers, participants, admins);
}
```

## Interactive Example

```tsx live
function UnionExample() {
  const [array1, setArray1] = React.useState('1,2,3');
  const [array2, setArray2] = React.useState('3,4,5');
  const [array3, setArray3] = React.useState('5,6,7');
  const [result, setResult] = React.useState(null);

  const handleUnion = () => {
    try {
      const arr1 = array1
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const arr2 = array2
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const arr3 = array3
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const arrays = [arr1, arr2, arr3].filter((arr) => arr.length > 0);
      const unionResult = union(...arrays);

      setResult({
        arrays: { array1: arr1, array2: arr2, array3: arr3 },
        union: unionResult,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleUnion();
  }, [array1, array2, array3]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>union Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 1: </label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 2: </label>
          <input
            type="text"
            value={array2}
            onChange={(e) => setArray2(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 3: </label>
          <input
            type="text"
            value={array3}
            onChange={(e) => setArray3(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
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

- ⚠️ **Order**: Maintains order of first occurrence across all arrays
- ⚠️ **Deduplication**: Automatically removes all duplicates
- ⚠️ **Edge Case**: Returns empty array if no arrays provided
- ⚠️ **Edge Case**: Skips non-array arguments gracefully
- 💡 **Performance**: O(n) time complexity where n is total element count
- 🔒 **Type Safety**: Generic types ensure all arrays have compatible types
- 📚 **Best Practice**: Useful for combining lists, merging tags, aggregating permissions
- ⚡ **Comparison**: Uses `Set` for deduplication (`===` equality with NaN treated as equal)

## Related Functions

- [`difference`](./difference) - Finds values in first array not in others
- [`intersection`](./intersection) - Finds common values across all arrays
- [`uniq`](./uniq) - Removes duplicates from single array

## Version History

- **v0.0.1** - Initial release
