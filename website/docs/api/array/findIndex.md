---
id: findIndex
title: findIndex
description: 'Finds the index of the first element matching a predicate, and removes elements from array'
---

# `findIndex`

Finds the index of the first element in an array that matches the provided predicate function. This module also includes `remove` for mutating array operations.

## Syntax

```typescript
function findIndex<T>(array: T[], predicate: (item: T, index: number) => boolean): number;
function remove<T>(array: T[], predicate: (item: T, index: number) => boolean): T[];
```

## Parameters

### `findIndex`

| Parameter   | Type                                  | Required | Default | Description                   |
| ----------- | ------------------------------------- | -------- | ------- | ----------------------------- |
| `array`     | `T[]`                                 | ✅       | -       | The array to search           |
| `predicate` | `(item: T, index: number) => boolean` | ✅       | -       | Function to test each element |

### `remove`

| Parameter   | Type                                  | Required | Default | Description                         |
| ----------- | ------------------------------------- | -------- | ------- | ----------------------------------- |
| `array`     | `T[]`                                 | ✅       | -       | The array to modify (mutates)       |
| `predicate` | `(item: T, index: number) => boolean` | ✅       | -       | Function to test elements to remove |

## Return Value

### `findIndex`

- **Type**: `number`
- **Description**: Index of first matching element, or `-1` if not found.

### `remove`

- **Type**: `T[]`
- **Description**: Array of removed elements. The original array is mutated.

## Examples

### Basic Usage

```typescript
import { findIndex, remove } from '@rabjs/kit';

// Example 1: Find index of first match
const numbers = [1, 2, 3, 4, 5];
const index = findIndex(numbers, (n) => n > 2);
console.log(index); // 2 (index of 3)

// Example 2: Element not found
const notFound = findIndex(numbers, (n) => n > 10);
console.log(notFound); // -1

// Example 3: Remove matching elements (mutates array)
const arr = [1, 2, 3, 4, 5];
const removed = remove(arr, (n) => n > 3);
console.log(removed); // [4, 5]
console.log(arr); // [1, 2, 3] - original array is modified
```

### Advanced Usage

```typescript
// Example 4: Finding by object property
interface User {
  id: number;
  name: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

const inactiveIndex = findIndex(users, (user) => !user.active);
console.log(inactiveIndex); // 1 (Bob)

// Example 5: Using index parameter
const items = ['a', 'b', 'c', 'd', 'e'];
const indexAfter2 = findIndex(items, (item, idx) => idx > 2 && item === 'd');
console.log(indexAfter2); // 3

// Example 6: Removing inactive users
const userList = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: false },
  { id: 4, name: 'David', active: true },
];

const inactiveUsers = remove(userList, (user) => !user.active);
console.log(inactiveUsers);
// [{ id: 2, name: 'Bob', active: false }, { id: 3, name: 'Charlie', active: false }]
console.log(userList);
// [{ id: 1, name: 'Alice', active: true }, { id: 4, name: 'David', active: true }]
```

### Real-world Applications

```typescript
// Example 7: Form validation - finding first error
interface FormField {
  name: string;
  value: string;
  valid: boolean;
}

function findFirstInvalidField(fields: FormField[]): number {
  return findIndex(fields, (field) => !field.valid);
}

const formFields = [
  { name: 'email', value: 'test@example.com', valid: true },
  { name: 'password', value: '123', valid: false },
  { name: 'confirm', value: '123', valid: false },
];

const firstError = findFirstInvalidField(formFields);
if (firstError !== -1) {
  console.log(`First error at field: ${formFields[firstError].name}`);
  // "First error at field: password"
}

// Example 8: Shopping cart management
interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

class ShoppingCart {
  private items: CartItem[] = [];

  findItemIndex(itemId: string): number {
    return findIndex(this.items, (item) => item.id === itemId);
  }

  removeOutOfStock(): CartItem[] {
    return remove(this.items, (item) => item.quantity === 0);
  }

  removeCheapItems(maxPrice: number): CartItem[] {
    return remove(this.items, (item) => item.price < maxPrice);
  }
}

// Example 9: Task queue processing
interface Task {
  id: number;
  priority: number;
  completed: boolean;
}

class TaskQueue {
  private tasks: Task[] = [];

  findHighPriorityTask(): number {
    return findIndex(this.tasks, (task) => task.priority > 8 && !task.completed);
  }

  removeCompletedTasks(): Task[] {
    return remove(this.tasks, (task) => task.completed);
  }

  processAndRemoveTask(): Task | null {
    const highPriorityIdx = this.findHighPriorityTask();
    if (highPriorityIdx !== -1) {
      const [task] = this.tasks.splice(highPriorityIdx, 1);
      return task;
    }
    return null;
  }
}
```

## Interactive Example

```tsx live
function FindIndexExample() {
  const [input, setInput] = React.useState('1,2,3,4,5,6,7,8,9');
  const [threshold, setThreshold] = React.useState(5);
  const [mode, setMode] = React.useState('findIndex');
  const [result, setResult] = React.useState(null);

  const handleOperation = () => {
    try {
      const array = input
        .split(',')
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));

      if (mode === 'findIndex') {
        const idx = findIndex(array, (n) => n > threshold);
        setResult({
          operation: 'findIndex',
          array: array,
          threshold: threshold,
          index: idx,
          foundValue: idx !== -1 ? array[idx] : null,
        });
      } else {
        // For demo, create a copy to show before/after
        const arrayCopy = [...array];
        const removed = remove(arrayCopy, (n) => n > threshold);
        setResult({
          operation: 'remove',
          originalArray: array,
          threshold: threshold,
          removed: removed,
          remainingArray: arrayCopy,
        });
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleOperation();
  }, [input, threshold, mode]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>findIndex/remove Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>Array (comma-separated numbers): </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Threshold (find/remove items {'>'} threshold): </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>Operation: </label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '5px' }}>
            <option value="findIndex">findIndex (find first)</option>
            <option value="remove">remove (remove all)</option>
          </select>
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

- ⚠️ **Mutation**: `remove` modifies the original array, unlike most other functions in this library
- ⚠️ **Return Value**: `findIndex` returns `-1` when no match found (same as native `Array.findIndex`)
- ⚠️ **Edge Case**: When array is not an array, `findIndex` returns `-1` and `remove` returns `[]`
- 💡 **Performance**: Both functions have O(n) time complexity
- 🔒 **Type Safety**: Generic types maintain type information
- 📚 **Best Practice**: Use `findIndex` for searching, `remove` only when mutation is acceptable
- ⚡ **Alternative**: For non-mutating removal, use `filter` instead of `remove`
- 🎯 **Use Case**: Finding elements by complex criteria, removing items from lists

## Related Functions

- [Native `Array.findIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) - Similar built-in method
- [Native `Array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - Non-mutating alternative to `remove`
- [Native `Array.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) - Direct array mutation

## Version History

- **v0.0.1** - Initial release
