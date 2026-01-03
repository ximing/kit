---
id: negate
title: negate
description: 'Creates a function that negates the result of the predicate func'
---

# `negate`

Creates a function that negates the result of the predicate func. This is useful for inverting boolean logic, creating opposite conditions, and filtering with inverted predicates.

## Syntax

```typescript
function negate<T extends (...args: any[]) => boolean>(predicate: T): T;
```

## Parameters

| Parameter   | Type                                    | Required | Default | Description                      |
| ----------- | --------------------------------------- | -------- | ------- | -------------------------------- |
| `predicate` | `T extends (...args: any[]) => boolean` | ✅       | -       | The predicate function to negate |

## Returns

- **Type**: `T`
- **Description**: A new function that returns the opposite boolean value of the predicate.

## Examples

### Basic Usage

```typescript
import { negate } from '@rabjs/kit';

// Example 1: Negate a simple predicate
const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isOdd(3)); // => true
console.log(isOdd(4)); // => false

// Example 2: Negate object property check
const isActive = (user: { active: boolean }) => user.active;
const isInactive = negate(isActive);

const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];

console.log(users.filter(isInactive)); // => [{ name: 'Bob', active: false }]
```

### Advanced Usage

```typescript
// Example 3: Negate complex predicates
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isInvalidEmail = negate(isValidEmail);

console.log(isInvalidEmail('alice@example.com')); // => false
console.log(isInvalidEmail('invalid-email')); // => true

// Example 4: Combine with array methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const isMultipleOfThree = (n: number) => n % 3 === 0;
const isNotMultipleOfThree = negate(isMultipleOfThree);

console.log(numbers.filter(isNotMultipleOfThree));
// => [1, 2, 4, 5, 7, 8, 10]
```

### Real-World Application

```typescript
// Example 5: User filtering and permission checks
class UserManager {
  private users = [
    { id: 1, name: 'Alice', admin: true, active: true },
    { id: 2, name: 'Bob', admin: false, active: true },
    { id: 3, name: 'Charlie', admin: false, active: false },
    { id: 4, name: 'David', admin: true, active: false },
  ];

  isAdmin(user: any) {
    return user.admin;
  }

  isActive(user: any) {
    return user.active;
  }

  getRegularUsers() {
    // Get users who are not admins
    return this.users.filter(negate(this.isAdmin.bind(this)));
  }

  getInactiveUsers() {
    // Get users who are not active
    return this.users.filter(negate(this.isActive.bind(this)));
  }

  getInactiveRegularUsers() {
    // Get users who are not admins AND not active
    const notAdmin = negate(this.isAdmin.bind(this));
    const notActive = negate(this.isActive.bind(this));
    return this.users.filter((user) => notAdmin(user) && notActive(user));
  }
}

const manager = new UserManager();
console.log(manager.getRegularUsers());
// => [{ id: 2, name: 'Bob', ... }, { id: 3, name: 'Charlie', ... }]

console.log(manager.getInactiveUsers());
// => [{ id: 3, name: 'Charlie', ... }, { id: 4, name: 'David', ... }]

console.log(manager.getInactiveRegularUsers());
// => [{ id: 3, name: 'Charlie', ... }]
```

## Interactive Example

```tsx live
function NegateExample() {
  const [numbers, setNumbers] = React.useState('1,2,3,4,5,6,7,8,9,10');
  const [result, setResult] = React.useState([]);

  const isEven = (n) => n % 2 === 0;
  const isOdd = negate(isEven);

  const handleFilter = () => {
    try {
      const nums = numbers
        .split(',')
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n));
      const odd = nums.filter(isOdd);
      setResult(odd);
    } catch (error) {
      setResult([]);
    }
  };

  React.useEffect(() => {
    handleFilter();
  }, [numbers]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Negate Interactive Example</h4>
      <p>Filter out even numbers (keep odd numbers):</p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Numbers (comma-separated):</label>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Input:</strong> {numbers}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>Odd Numbers:</strong> {result.join(', ')}
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Boolean Return**: The predicate function must return a boolean value. Negation inverts true to false and vice versa.
- 💡 **Readability**: Using `negate` can make code more readable than writing `!predicate(...)` inline.
- 🔒 **Type Safety**: The returned function maintains the same type as the original predicate.
- 🐛 **Common Mistake**: Using negate on functions that don't return booleans will produce unexpected results.
- 📚 **Best Practice**: Use negate to create opposite conditions for filtering and conditional logic.

## Related Functions

- [`partial`](./partial) - Partially applies arguments to a function
- [`bind`](./bind) - Binds `this` context and partially applies arguments
- [`compose`](./compose) - Composes functions from right to left
- [`pipe`](./pipe) - Composes functions from left to right

## Version History

- **v0.0.1** - Initial version
