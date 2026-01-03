---
id: partial
title: partial
description: 'Creates a function that invokes func with partialArgs prepended to the arguments it receives'
---

# `partial`

Creates a function that invokes func with partialArgs prepended to the arguments it receives. This method is like `bind` except it does not alter the `this` binding. This is useful for creating specialized versions of functions with preset arguments.

## Syntax

```typescript
function partial<T extends (...args: any[]) => any>(func: T, ...partialArgs: any[]): (...args: any[]) => ReturnType<T>;
```

## Parameters

| Parameter     | Type                                | Required | Default | Description                                       |
| ------------- | ----------------------------------- | -------- | ------- | ------------------------------------------------- |
| `func`        | `T extends (...args: any[]) => any` | ✅       | -       | The function to partially apply arguments to      |
| `partialArgs` | `any[]`                             | ✅       | -       | The arguments to be partially applied (prepended) |

## Returns

- **Type**: `(...args: any[]) => ReturnType<T>`
- **Description**: A new function that accepts remaining arguments and calls the original function with partial arguments prepended.

## Examples

### Basic Usage

```typescript
import { partial } from '@rabjs/kit';

// Example 1: Partial application with greeting
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const sayHelloTo = partial(greet, 'Hello');

console.log(sayHelloTo('Alice')); // => 'Hello, Alice!'
console.log(sayHelloTo('Bob')); // => 'Hello, Bob!'

// Example 2: Partial application with addition
const add = (a: number, b: number, c: number) => a + b + c;
const add5 = partial(add, 5);

console.log(add5(10, 15)); // => 30
console.log(add5(1, 2)); // => 8
```

### Advanced Usage

```typescript
// Example 3: Multiple partial applications
const format = (template: string, ...values: any[]) => {
  let result = template;
  values.forEach((value, index) => {
    result = result.replace(`{${index}}`, value);
  });
  return result;
};

const formatGreeting = partial(format, 'Hello, {0}! You are {1} years old.');
console.log(formatGreeting('Alice', 25)); // => 'Hello, Alice! You are 25 years old.'

// Example 4: Chained partial applications
const multiply = (a: number, b: number, c: number) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiplyBy2, 3);

console.log(multiplyBy2And3(5)); // => 30
```

### Real-World Application

```typescript
// Example 5: API request builder
function makeRequest(method: string, url: string, options: any = {}) {
  return fetch(url, {
    method,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

const getRequest = partial(makeRequest, 'GET');
const postRequest = partial(makeRequest, 'POST');

// Usage
// getRequest('/api/users');
// postRequest('/api/users', { body: JSON.stringify({ name: 'Alice' }) });

// Example 6: Event handler with preset data
function handleEvent(eventType: string, data: any, callback: Function) {
  console.log(`Event: ${eventType}`, data);
  callback(data);
}

const handleUserEvent = partial(handleEvent, 'USER_ACTION');
handleUserEvent({ userId: 1 }, (data) => console.log('Processed:', data));
```

## Interactive Example

```tsx live
function PartialExample() {
  const [greeting, setGreeting] = React.useState('Hello');
  const [name, setName] = React.useState('Alice');
  const [result, setResult] = React.useState('');

  const greet = (greeting, name) => `${greeting}, ${name}!`;
  const greetWithPrefix = partial(greet, greeting);

  const handleCalculate = () => {
    const res = greetWithPrefix(name);
    setResult(res);
  };

  React.useEffect(() => {
    handleCalculate();
  }, [greeting, name]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Partial Application Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Greeting:</label>
          <input
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Argument Order**: Partial arguments are prepended (added at the beginning), so they appear before any additional arguments.
- 💡 **Partial vs Bind**: Unlike `bind`, `partial` does not change the `this` context. Use `partial` for pure functions.
- 🔒 **Immutability**: The original function is not modified; a new function is created.
- 🐛 **Common Mistake**: Confusing the order of arguments. Partial arguments come first, then additional arguments.
- 📚 **Best Practice**: Use partial for creating specialized versions of utility functions or API calls.

## Related Functions

- [`bind`](./bind) - Binds `this` context and partially applies arguments
- [`curry`](./curry) - Creates a curried function for progressive argument application
- [`compose`](./compose) - Composes functions from right to left
- [`pipe`](./pipe) - Composes functions from left to right

## Version History

- **v0.0.1** - Initial version
