---
id: intersection
title: intersection
description: 'Creates an array of unique values included in all given arrays'
---

# `intersection`

Creates an array of unique values that are present in all of the provided arrays. This is the set intersection operation.

## Syntax

```typescript
function intersection<T>(...arrays: T[][]): T[];
```

## Parameters

| Parameter   | Type    | Required | Default | Description                         |
| ----------- | ------- | -------- | ------- | ----------------------------------- |
| `...arrays` | `T[][]` | ✅       | -       | Arrays to inspect for common values |

## Return Value

- **Type**: `T[]`
- **Description**: A new array containing values present in all arrays. Returns an empty array if no arrays provided or if first array is invalid.

## Examples

### Basic Usage

```typescript
import { intersection } from '@rabjs/kit';

// Example 1: Basic intersection
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const common = intersection(array1, array2);
console.log(common); // [3, 4, 5]

// Example 2: Multiple arrays
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];
const c = [3, 4, 5, 6];
const result = intersection(a, b, c);
console.log(result); // [3, 4]

// Example 3: String arrays
const tags1 = ['javascript', 'react', 'node', 'typescript'];
const tags2 = ['react', 'vue', 'typescript'];
const tags3 = ['react', 'angular', 'typescript'];
const commonTags = intersection(tags1, tags2, tags3);
console.log(commonTags); // ['react', 'typescript']
```

### Advanced Usage

```typescript
// Example 4: Finding common permissions
function findCommonPermissions(...userPermissions: number[][]): number[] {
  return intersection(...userPermissions);
}

const user1 = [1, 2, 3, 4, 5];
const user2 = [2, 3, 4, 6];
const user3 = [3, 4, 5, 7];
console.log(findCommonPermissions(user1, user2, user3)); // [3, 4]

// Example 5: Product filtering
interface Product {
  id: number;
  name: string;
  categories: string[];
}

function findProductsInAllCategories(products: Product[], requiredCategories: string[]): Product[] {
  return products.filter((product) => {
    const common = intersection([...requiredCategories], product.categories);
    return common.length === requiredCategories.length;
  });
}

// Example 6: No duplicates in result
const arr1 = [1, 1, 2, 2, 3];
const arr2 = [2, 2, 3, 3, 4];
const intersect = intersection(arr1, arr2);
console.log(intersect); // [2, 3] - duplicates removed
```

### Real-world Applications

```typescript
// Example 7: Finding mutual friends
async function getMutualFriends(userId1: string, userId2: string): Promise<string[]> {
  const [friends1, friends2] = await Promise.all([
    fetch(`/api/users/${userId1}/friends`).then((r) => r.json()),
    fetch(`/api/users/${userId2}/friends`).then((r) => r.json()),
  ]);
  return intersection(friends1, friends2);
}

// Example 8: Feature compatibility check
function getCompatibleFeatures(
  deviceCapabilities: string[],
  appRequirements: string[],
  userPreferences: string[],
): string[] {
  return intersection(deviceCapabilities, appRequirements, userPreferences);
}

const device = ['bluetooth', 'gps', 'camera', 'nfc'];
const requirements = ['bluetooth', 'camera', 'wifi'];
const preferences = ['bluetooth', 'camera', 'nfc'];
console.log(getCompatibleFeatures(device, requirements, preferences));
// ['bluetooth', 'camera']

// Example 9: Collaborative filtering
class RecommendationEngine {
  findCommonInterests(userIds: string[], allInterests: Map<string, string[]>): string[] {
    const interestArrays = userIds.map((id) => allInterests.get(id) || []);
    return intersection(...interestArrays);
  }
}

const interests = new Map([
  ['user1', ['music', 'sports', 'travel', 'food']],
  ['user2', ['sports', 'travel', 'gaming']],
  ['user3', ['travel', 'food', 'sports']],
]);

const engine = new RecommendationEngine();
console.log(engine.findCommonInterests(['user1', 'user2', 'user3'], interests));
// ['sports', 'travel']
```

## Interactive Example

```tsx live
function IntersectionExample() {
  const [array1, setArray1] = React.useState('1,2,3,4,5');
  const [array2, setArray2] = React.useState('3,4,5,6,7');
  const [array3, setArray3] = React.useState('4,5,6,7,8');
  const [result, setResult] = React.useState(null);

  const handleIntersection = () => {
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
      const intersect = intersection(...arrays);

      setResult({
        arrays: { array1: arr1, array2: arr2, array3: arr3 },
        intersection: intersect,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleIntersection();
  }, [array1, array2, array3]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>intersection Interactive Example</h4>
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

- ⚠️ **Order**: Result maintains order from the first array
- ⚠️ **Deduplication**: Automatically removes duplicates from result
- ⚠️ **Edge Case**: Empty result if no common values exist
- ⚠️ **Edge Case**: Returns empty array if first array is invalid
- 💡 **Performance**: O(n × m) where n is first array length, m is number of arrays
- 🔒 **Type Safety**: Generic types ensure all arrays have compatible types
- 📚 **Best Practice**: Useful for finding common elements, shared permissions, mutual relationships
- ⚡ **Comparison**: Uses `Set` for efficient lookups (`===` equality with NaN treated as equal)

## Related Functions

- [`difference`](./difference) - Finds values in first array not in others
- [`union`](./union) - Combines arrays with deduplication
- [`uniq`](./uniq) - Removes duplicates from single array

## Version History

- **v0.0.1** - Initial release
