---
id: curry
title: curry
description: 'Creates a curried function that accepts arguments and returns a new function until all arguments are provided'
---

# `curry`

Creates a curried function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments. This is useful for functional programming and creating specialized versions of functions with preset arguments.

## Syntax

```typescript
function curry<T extends (...args: any[]) => any>(func: T, arity?: number): any;
```

## Parameters

| Parameter | Type                                | Required | Default       | Description                              |
| --------- | ----------------------------------- | -------- | ------------- | ---------------------------------------- |
| `func`    | `T extends (...args: any[]) => any` | ✅       | -             | The function to curry                    |
| `arity`   | `number`                            | ❌       | `func.length` | The arity of func (number of parameters) |

## Returns

- **Type**: `any`
- **Description**: A curried function that accepts partial arguments and returns either the result (when all arguments provided) or a new function awaiting remaining arguments.

## Examples

### Basic Usage

```typescript
import { curry } from '@rabjs/kit';

// Example 1: Curry a simple function
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // => 6
console.log(curriedAdd(1, 2)(3)); // => 6
console.log(curriedAdd(1)(2, 3)); // => 6
console.log(curriedAdd(1, 2, 3)); // => 6

// Example 2: Create specialized functions
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const curriedGreet = curry(greet);

const sayHello = curriedGreet('Hello');
console.log(sayHello('Alice')); // => 'Hello, Alice!'
console.log(sayHello('Bob')); // => 'Hello, Bob!'

const sayCiao = curriedGreet('Ciao');
console.log(sayCiao('Alice')); // => 'Ciao, Alice!'
```

### Advanced Usage

```typescript
// Example 3: Curry with explicit arity
const multiply = (a: number, b: number) => a * b;
const curriedMultiply = curry(multiply, 2);

const double = curriedMultiply(2);
console.log(double(5)); // => 10
console.log(double(10)); // => 20

// Example 4: Complex curry usage
const formatString = (prefix: string, text: string, suffix: string) => {
  return `${prefix}${text}${suffix}`;
};
const curriedFormat = curry(formatString);

const formatLog = curriedFormat('[LOG]');
const formatError = curriedFormat('[ERROR]');

console.log(formatLog('Success', '!')); // => '[LOG]Success!'
console.log(formatError('Failed', '!!')); // => '[ERROR]Failed!!'
```

### Real-World Application

```typescript
// Example 5: API request builder with curry
function createApiRequest() {
  const request = curry((method: string, url: string, data?: any) => {
    return fetch(url, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: { 'Content-Type': 'application/json' },
    });
  }, 3);

  const get = request('GET');
  const post = request('POST');
  const put = request('PUT');

  return {
    get: (url: string) => get(url),
    post: (url: string, data: any) => post(url, data),
    put: (url: string, data: any) => put(url, data),
  };
}

const api = createApiRequest();
// api.get('/api/users');
// api.post('/api/users', { name: 'Alice' });
```

## Interactive Example

```tsx live
function CurryExample() {
  const [a, setA] = React.useState('2');
  const [b, setB] = React.useState('3');
  const [c, setC] = React.useState('5');
  const [result, setResult] = React.useState(null);

  const add = curry((x, y, z) => x + y + z);

  const handleCalculate = () => {
    try {
      const numA = parseInt(a);
      const numB = parseInt(b);
      const numC = parseInt(c);

      if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
        const res = add(numA)(numB)(numC);
        setResult(res);
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [a, b, c]);

  const curriedAdd = curry((x, y, z) => x + y + z);
  const addTwo = curriedAdd(2);
  const addTwoAndThree = addTwo(3);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Curry Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>a = </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>b = </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>c = </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>add(a)(b)(c) = </strong> {result}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
        <strong>Example:</strong> add(2)(3)(5) = {addTwoAndThree(5)}
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Arity**: The arity parameter should match the number of parameters the original function accepts. If not provided, it defaults to `func.length`.
- 💡 **Partial Application**: Currying enables partial application, allowing you to create specialized functions with preset arguments.
- 🔒 **Function Composition**: Curried functions work well with function composition and functional programming patterns.
- 🐛 **Common Mistake**: Forgetting that currying requires calling the function multiple times for each argument.
- 📚 **Best Practice**: Use curry for functions that will be called multiple times with the same initial arguments.

## Related Functions

- [`partial`](./partial) - Partially applies arguments without requiring all parameters
- [`compose`](./compose) - Composes functions from right to left
- [`pipe`](./pipe) - Composes functions from left to right

## Version History

- **v0.0.1** - Initial version
