---
id: difference
title: difference
description: 'Creates an array of unique values not included in other arrays'
---

# `difference`

Creates an array of unique values from the first array that are not present in any of the other provided arrays. This function is useful for finding elements that are exclusive to the first array.

## Syntax

```typescript
function difference<T>(array: T[], ...arrays: T[][]): T[];
```

## Parameters

| Parameter   | Type    | Required | Default | Description                 |
| ----------- | ------- | -------- | ------- | --------------------------- |
| `array`     | `T[]`   | ✅       | -       | The array to inspect        |
| `...arrays` | `T[][]` | ❌       | -       | Arrays of values to exclude |

## Return Value

- **Type**: `T[]`
- **Description**: A new array of unique values from the first array that are not in other arrays. Returns an empty array if the first input is not an array.

## Examples

### Basic Usage

```typescript
import { difference } from '@rabjs/kit';

// Example 1: Basic difference
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const diff = difference(array1, array2);
console.log(diff); // [1, 2]

// Example 2: Multiple exclusion arrays
const base = [1, 2, 3, 4, 5];
const exclude1 = [2, 4];
const exclude2 = [3];
const result = difference(base, exclude1, exclude2);
console.log(result); // [1, 5]

// Example 3: String arrays
const allTags = ['javascript', 'react', 'vue', 'angular', 'node'];
const frontendTags = ['react', 'vue', 'angular'];
const backendOnly = difference(allTags, frontendTags);
console.log(backendOnly); // ['javascript', 'node']
```

### Advanced Usage

```typescript
// Example 4: Finding unique permissions
interface Permission {
  id: number;
  name: string;
}

function findExclusivePermissions(userPermissions: number[], rolePermissions: number[]): number[] {
  return difference(userPermissions, rolePermissions);
}

const user1Permissions = [1, 2, 3, 4, 5];
const rolePermissions = [3, 4, 5];
console.log(findExclusivePermissions(user1Permissions, rolePermissions));
// [1, 2] - permissions user has beyond their role

// Example 5: Deduplication in first array
const withDuplicates = [1, 1, 2, 2, 3, 3];
const toRemove = [2];
const cleaned = difference(withDuplicates, toRemove);
console.log(cleaned); // [1, 3] - also removes duplicates from first array

// Example 6: Object comparison (by reference)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };

const objects1 = [obj1, obj2, obj3];
const objects2 = [obj2];
const diffObjects = difference(objects1, objects2);
console.log(diffObjects); // [{ id: 1 }, { id: 3 }]
```

### Real-world Applications

```typescript
// Example 7: Managing feature flags
function getNewFeatures(allFeatures: string[], deployedFeatures: string[]): string[] {
  return difference(allFeatures, deployedFeatures);
}

const allFeatures = ['feature-a', 'feature-b', 'feature-c', 'feature-d'];
const deployed = ['feature-a', 'feature-b'];
console.log(getNewFeatures(allFeatures, deployed));
// ['feature-c', 'feature-d']

// Example 8: Processing form changes
interface FormState {
  selectedIds: number[];
}

function getAddedItems(currentSelection: number[], previousSelection: number[]): number[] {
  return difference(currentSelection, previousSelection);
}

function getRemovedItems(currentSelection: number[], previousSelection: number[]): number[] {
  return difference(previousSelection, currentSelection);
}

const previous = [1, 2, 3, 4];
const current = [2, 3, 5, 6];
console.log(getAddedItems(current, previous)); // [5, 6]
console.log(getRemovedItems(current, previous)); // [1, 4]

// Example 9: Filter out blocked users
function getActiveUserIds(allUserIds: number[], blockedUserIds: number[], deletedUserIds: number[]): number[] {
  return difference(allUserIds, blockedUserIds, deletedUserIds);
}

const allUsers = [1, 2, 3, 4, 5, 6, 7, 8];
const blocked = [2, 5];
const deleted = [7];
console.log(getActiveUserIds(allUsers, blocked, deleted));
// [1, 3, 4, 6, 8]
```

## Interactive Example

```tsx live
function DifferenceExample() {
  const [array1, setArray1] = React.useState('1,2,3,4,5');
  const [array2, setArray2] = React.useState('3,4,5');
  const [array3, setArray3] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleDifference = () => {
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
        ? array3
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const arrays = [arr2, arr3].filter((arr) => arr.length > 0);
      const diff = difference(arr1, ...arrays);

      setResult({
        array1: arr1,
        array2: arr2,
        array3: arr3.length > 0 ? arr3 : '(empty)',
        difference: diff,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleDifference();
  }, [array1, array2, array3]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>difference Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 1 (base): </label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 2 (to exclude): </label>
          <input
            type="text"
            value={array2}
            onChange={(e) => setArray2(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Array 3 (optional, to exclude): </label>
          <input
            type="text"
            value={array3}
            onChange={(e) => setArray3(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            placeholder="Leave empty to skip"
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

- ⚠️ **Deduplication**: The result automatically removes duplicates from the first array
- ⚠️ **Edge Case**: When the first argument is not an array, returns an empty array
- ⚠️ **Comparison**: Uses `Set` for comparison (similar to `===` but treats `NaN` as equal)
- 💡 **Performance**: O(n + m) time complexity where n is the first array length and m is total length of exclusion arrays
- 🔒 **Type Safety**: Generic types ensure type consistency across all arrays
- 📚 **Best Practice**: Useful for permission systems, feature flags, and data synchronization
- ⚡ **Object Comparison**: Objects are compared by reference, not by deep equality
- 🎯 **Use Case**: Perfect for finding elements unique to a set, filtering out unwanted items

## Related Functions

- [`intersection`](./intersection) - Finds common values across all arrays
- [`union`](./union) - Combines arrays with deduplication
- [`uniq`](./uniq) - Removes duplicates from a single array
- [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - JavaScript's native filtering method

## Version History

- **v0.0.1** - Initial release
