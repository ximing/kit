---
id: compose
title: compose
description: 'Creates a function that is the composition of the provided functions, executed from right to left'
---

# `compose`

Creates a function that is the composition of the provided functions, where each successive invocation is supplied the return value of the previous. Functions are executed from right to left, making it useful for creating data transformation pipelines in a mathematical composition style.

## Syntax

```typescript
function compose<R>(...funcs: Array<(arg: any) => any>): (arg: any) => R;
```

## Parameters

| Parameter | Type                       | Required | Default | Description                                       |
| --------- | -------------------------- | -------- | ------- | ------------------------------------------------- |
| `funcs`   | `Array<(arg: any) => any>` | ✅       | -       | The functions to compose (executed right to left) |

## Returns

- **Type**: `(arg: any) => R`
- **Description**: A new function that applies all composed functions from right to left.

## Examples

### Basic Usage

```typescript
import { compose } from '@rabjs/kit';

// Example 1: Simple math composition
const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;
const composed = compose(add, multiply);

console.log(composed(5)); // => 11 (multiply(5) = 10, then add(10) = 11)

// Example 2: String transformations
const toUpper = (str: string) => str.toUpperCase();
const exclaim = (str: string) => `${str}!`;
const shout = compose(exclaim, toUpper);

console.log(shout('hello')); // => 'HELLO!'
```

### Advanced Usage

```typescript
// Example 3: Data processing pipeline
const square = (n: number) => n * n;
const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const pipeline = compose(addTen, double, square);

console.log(pipeline(3)); // => 28 (square(3) = 9, double(9) = 18, addTen(18) = 28)

// Example 4: Complex object transformations
const formatUser = compose(
  (user) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` }),
  (user) => ({ ...user, firstName: user.firstName.toUpperCase() }),
  (user) => ({ ...user, lastName: user.lastName.toUpperCase() }),
);

const user = { firstName: 'john', lastName: 'doe' };
console.log(formatUser(user));
// => { firstName: 'JOHN', lastName: 'DOE', fullName: 'JOHN DOE' }
```

### Real-World Application

```typescript
// Example 5: API response transformation
const parseJSON = (str: string) => JSON.parse(str);
const extractData = (obj: any) => obj.data;
const filterActive = (items: any[]) => items.filter((item) => item.active);
const sortByName = (items: any[]) => items.sort((a, b) => a.name.localeCompare(b.name));

const processResponse = compose(sortByName, filterActive, extractData, parseJSON);

const jsonResponse = '{"data":[{"id":1,"name":"Bob","active":false},{"id":2,"name":"Alice","active":true}]}';
const result = processResponse(jsonResponse);
// => [{ id: 2, name: 'Alice', active: true }] (sorted and filtered)
```

## Interactive Example

```tsx live
function ComposeExample() {
  const [input, setInput] = React.useState('5');
  const [result, setResult] = React.useState(null);

  const square = (n) => n * n;
  const double = (n) => n * 2;
  const addTen = (n) => n + 10;

  const pipeline = compose(addTen, double, square);

  const handleCalculate = () => {
    try {
      const num = parseInt(input);
      if (!isNaN(num)) {
        const res = pipeline(num);
        setResult(res);
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Compose Interactive Example</h4>
      <p>Function order (right to left): square → double → addTen</p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input number:</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Step 1 - square({input}):</strong> {Math.pow(parseInt(input) || 0, 2)}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Step 2 - double result:</strong> {Math.pow(parseInt(input) || 0, 2) * 2}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Step 3 - addTen result:</strong> {result}
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Execution Order**: Functions are executed from right to left. The rightmost function is called first with the input.
- 💡 **Mathematical Style**: Compose follows mathematical function composition notation: (f ∘ g)(x) = f(g(x))
- 🔒 **Type Safety**: Each function's return type should match the next function's parameter type.
- 🐛 **Common Mistake**: Confusing the order of functions. Remember: rightmost function executes first.
- 📚 **Best Practice**: Use compose for mathematical transformations and pipe for data processing workflows.

## Related Functions

- [`pipe`](./pipe) - Composes functions from left to right
- [`curry`](./curry) - Creates a curried function for partial application
- [`partial`](./partial) - Partially applies arguments to a function

## Version History

- **v0.0.1** - Initial version
