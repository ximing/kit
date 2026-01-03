---
id: uniq
title: uniq
description: 'Removes duplicate values from an array'
---

# `uniq`

Removes duplicate values from an array, keeping only the first occurrence of each value. The function also provides `uniqBy` for custom uniqueness criteria.

## Syntax

```typescript
function uniq<T>(array: T[]): T[];
function uniqBy<T>(array: T[], iteratee: (item: T) => any): T[];
```

## Parameters

### `uniq`

| Parameter | Type  | Required | Default | Description          |
| --------- | ----- | -------- | ------- | -------------------- |
| `array`   | `T[]` | ✅       | -       | The array to process |

### `uniqBy`

| Parameter  | Type               | Required | Default | Description                                         |
| ---------- | ------------------ | -------- | ------- | --------------------------------------------------- |
| `array`    | `T[]`              | ✅       | -       | The array to process                                |
| `iteratee` | `(item: T) => any` | ✅       | -       | Function that computes the criterion for uniqueness |

## Return Value

- **Type**: `T[]`
- **Description**: A new array with duplicate values removed. Returns an empty array if input is not an array.

## Examples

### Basic Usage

```typescript
import { uniq, uniqBy } from '@rabjs/kit';

// Example 1: Remove duplicate numbers
const numbers = [1, 2, 2, 3, 3, 3, 4];
const uniqueNumbers = uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4]

// Example 2: Remove duplicate strings
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana'];
const uniqueFruits = uniq(fruits);
console.log(uniqueFruits); // ['apple', 'banana', 'cherry']

// Example 3: Using uniqBy with objects
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice Clone' },
  { id: 3, name: 'Charlie' },
];
const uniqueUsers = uniqBy(users, (user) => user.id);
console.log(uniqueUsers);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' }
// ]
```

### Advanced Usage

```typescript
// Example 4: Deduplicating by property path
interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
}

const products: Product[] = [
  { id: 1, sku: 'A001', name: 'Laptop', category: 'Electronics' },
  { id: 2, sku: 'A002', name: 'Mouse', category: 'Electronics' },
  { id: 3, sku: 'A001', name: 'Laptop Pro', category: 'Electronics' },
];

const uniqueBySku = uniqBy(products, (p) => p.sku);
console.log(uniqueBySku);
// [
//   { id: 1, sku: 'A001', name: 'Laptop', category: 'Electronics' },
//   { id: 2, sku: 'A002', name: 'Mouse', category: 'Electronics' }
// ]

// Example 5: Case-insensitive string deduplication
const tags = ['JavaScript', 'javascript', 'JAVASCRIPT', 'Python', 'python'];
const uniqueTags = uniqBy(tags, (tag) => tag.toLowerCase());
console.log(uniqueTags); // ['JavaScript', 'Python']

// Example 6: Deduplicating by multiple properties
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const users2: User[] = [
  { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
  { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
];

const uniqueByFullName = uniqBy(users2, (user) => `${user.firstName}|${user.lastName}`);
console.log(uniqueByFullName);
// [
//   { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
//   { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
// ]
```

### Real-world Applications

```typescript
// Example 7: Removing duplicate IDs from API responses
async function fetchUserFriends(userId: string): Promise<number[]> {
  const [friendsOfFriends, directFriends] = await Promise.all([
    fetch(`/api/users/${userId}/friends-of-friends`).then((r) => r.json()),
    fetch(`/api/users/${userId}/friends`).then((r) => r.json()),
  ]);

  const allIds = [...friendsOfFriends, ...directFriends];
  return uniq(allIds);
}

// Example 8: Deduplicating search results
interface SearchResult {
  id: string;
  title: string;
  score: number;
}

function mergeSearchResults(results1: SearchResult[], results2: SearchResult[]): SearchResult[] {
  const combined = [...results1, ...results2];
  // Keep the first occurrence (higher score from first result set)
  return uniqBy(combined, (result) => result.id);
}

// Example 9: Tag management system
class TagManager {
  private tags: string[] = [];

  addTag(tag: string) {
    this.tags.push(tag);
    this.tags = uniq(this.tags); // Auto-deduplicate
  }

  addTags(newTags: string[]) {
    this.tags = uniq([...this.tags, ...newTags]);
  }

  getTags(): string[] {
    return [...this.tags];
  }
}

const manager = new TagManager();
manager.addTags(['javascript', 'react', 'javascript', 'node']);
console.log(manager.getTags()); // ['javascript', 'react', 'node']
```

## Interactive Example

```tsx live
function UniqExample() {
  const [input, setInput] = React.useState('1,2,2,3,3,3,4,4,4,4');
  const [mode, setMode] = React.useState('basic');
  const [result, setResult] = React.useState(null);

  const handleUniq = () => {
    try {
      const array = input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      let uniqueResult;
      if (mode === 'basic') {
        uniqueResult = uniq(array);
      } else if (mode === 'caseInsensitive') {
        const objArray = array.map((val) => ({ original: val, lower: val.toLowerCase() }));
        uniqueResult = uniqBy(objArray, (item) => item.lower).map((item) => item.original);
      } else {
        // by length
        uniqueResult = uniqBy(array, (item) => item.length);
      }

      setResult({
        original: array,
        unique: uniqueResult,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleUniq();
  }, [input, mode]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>uniq Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>Input (comma-separated): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Mode: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '5px' }}>
          <option value="basic">Basic uniq</option>
          <option value="caseInsensitive">Case insensitive</option>
          <option value="byLength">By string length</option>
        </select>
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

- ⚠️ **Order Preservation**: The function keeps the first occurrence and maintains the original order
- ⚠️ **Edge Case**: When input is not an array, returns an empty array
- 💡 **Performance**: Uses `Set` for O(n) time complexity, very efficient
- 🔒 **Type Safety**: Generic types ensure type consistency between input and output
- 📚 **Best Practice**: Use `uniq` for primitive values, `uniqBy` for objects or custom criteria
- ⚡ **Comparison**: Values are compared using `Set` semantics (similar to `===` but treats `NaN` as equal)
- 🎯 **Use Case**: Perfect for deduplicating IDs, tags, search results, and API responses

## Related Functions

- [`compact`](./compact) - Removes falsy values from an array
- [`difference`](./difference) - Finds values in first array not present in others
- [`intersection`](./intersection) - Finds common values across arrays
- [`union`](./union) - Combines multiple arrays with deduplication

## Version History

- **v0.0.1** - Initial release
