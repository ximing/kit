---
id: pipe
title: pipe
description: 'Creates a function that is the composition of the provided functions, executed from left to right'
---

# `pipe`

Creates a function that is the composition of the provided functions, where each successive invocation is supplied the return value of the previous. Functions are executed from left to right, making it more intuitive for data processing workflows compared to the mathematical composition style of `compose`.

## Syntax

```typescript
function pipe<R>(...funcs: Array<(arg: any) => any>): (arg: any) => R;
```

## Parameters

| Parameter | Type                       | Required | Default | Description                                    |
| --------- | -------------------------- | -------- | ------- | ---------------------------------------------- |
| `funcs`   | `Array<(arg: any) => any>` | ✅       | -       | The functions to pipe (executed left to right) |

## Returns

- **Type**: `(arg: any) => R`
- **Description**: A new function that applies all piped functions from left to right.

## Examples

### Basic Usage

```typescript
import { pipe } from '@rabjs/kit';

// Example 1: Simple math pipeline
const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;
const piped = pipe(add, multiply);

console.log(piped(5)); // => 12 (add(5) = 6, then multiply(6) = 12)

// Example 2: String transformations
const toUpper = (str: string) => str.toUpperCase();
const exclaim = (str: string) => `${str}!`;
const shout = pipe(toUpper, exclaim);

console.log(shout('hello')); // => 'HELLO!'
```

### Advanced Usage

```typescript
// Example 3: Data processing workflow
const square = (n: number) => n * n;
const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const pipeline = pipe(square, double, addTen);

console.log(pipeline(3)); // => 28 (square(3) = 9, double(9) = 18, addTen(18) = 28)

// Example 4: Complex data transformation
const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();
const replace = (str: string) => str.replace(/\s+/g, '-');
const slugify = pipe(trim, toLowerCase, replace);

console.log(slugify('  Hello World  ')); // => 'hello-world'
```

### Real-World Application

```typescript
// Example 5: API request processing
const parseJSON = (str: string) => JSON.parse(str);
const extractData = (obj: any) => obj.data;
const filterActive = (items: any[]) => items.filter((item) => item.active);
const sortByName = (items: any[]) => items.sort((a, b) => a.name.localeCompare(b.name));

const processResponse = pipe(parseJSON, extractData, filterActive, sortByName);

const jsonResponse = '{"data":[{"id":1,"name":"Bob","active":false},{"id":2,"name":"Alice","active":true}]}';
const result = processResponse(jsonResponse);
// => [{ id: 2, name: 'Alice', active: true }] (sorted and filtered)
```

## Interactive Example

```tsx live
function PipeExample() {
  const [input, setInput] = React.useState('5');
  const [result, setResult] = React.useState(null);

  const square = (n) => n * n;
  const double = (n) => n * 2;
  const addTen = (n) => n + 10;

  const pipeline = pipe(square, double, addTen);

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
      <h4>Pipe Interactive Example</h4>
      <p>Function order (left to right): square → double → addTen</p>
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

- ⚠️ **Execution Order**: Functions are executed from left to right. The leftmost function is called first with the input.
- 💡 **Readability**: Pipe is often more intuitive than compose because it reads naturally from left to right, matching the data flow.
- 🔒 **Type Safety**: Each function's return type should match the next function's parameter type.
- 🐛 **Common Mistake**: Confusing pipe with compose. Remember: pipe goes left-to-right, compose goes right-to-left.
- 📚 **Best Practice**: Use pipe for data processing workflows and compose for mathematical transformations.

## Related Functions

- [`compose`](./compose) - Composes functions from right to left
- [`curry`](./curry) - Creates a curried function for partial application
- [`partial`](./partial) - Partially applies arguments to a function

## Version History

- **v1.0.0** - Initial version
