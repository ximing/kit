---
id: bind
title: bind
description: 'Creates a function that invokes func with the this binding of thisArg and partialArgs prepended to the arguments'
---

# `bind`

Creates a function that invokes func with the `this` binding of thisArg and partialArgs prepended to the arguments it receives. This is useful for binding methods to specific contexts and creating specialized versions of functions with preset arguments and `this` binding.

## Syntax

```typescript
function bind<T extends (...args: any[]) => any>(
  func: T,
  thisArg: any,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T>;
```

## Parameters

| Parameter     | Type                                | Required | Default | Description                           |
| ------------- | ----------------------------------- | -------- | ------- | ------------------------------------- |
| `func`        | `T extends (...args: any[]) => any` | ✅       | -       | The function to bind                  |
| `thisArg`     | `any`                               | ✅       | -       | The `this` binding of func            |
| `partialArgs` | `any[]`                             | ❌       | -       | The arguments to be partially applied |

## Returns

- **Type**: `(...args: any[]) => ReturnType<T>`
- **Description**: A new function with `this` bound to thisArg and partial arguments prepended.

## Examples

### Basic Usage

```typescript
import { bind } from '@rabjs/kit';

// Example 1: Bind method to object
const obj = {
  name: 'Alice',
  greet(greeting: string) {
    return `${greeting}, ${this.name}!`;
  },
};

const boundGreet = bind(obj.greet, obj, 'Hello');
console.log(boundGreet()); // => 'Hello, Alice!'

// Example 2: Bind with partial arguments
function add(this: { base: number }, a: number, b: number) {
  return this.base + a + b;
}

const obj = { base: 10 };
const boundAdd = bind(add, obj, 5);
console.log(boundAdd(3)); // => 18 (10 + 5 + 3)
```

### Advanced Usage

```typescript
// Example 3: Event handler binding
class Button {
  private clickCount = 0;

  onClick() {
    this.clickCount++;
    console.log(`Clicked ${this.clickCount} times`);
  }

  getClickHandler() {
    return bind(this.onClick, this);
  }
}

const button = new Button();
const handler = button.getClickHandler();
handler(); // => 'Clicked 1 times'
handler(); // => 'Clicked 2 times'

// Example 4: Bind with multiple partial arguments
function format(this: { prefix: string }, template: string, ...values: any[]) {
  let result = `${this.prefix}: ${template}`;
  values.forEach((value, index) => {
    result = result.replace(`{${index}}`, value);
  });
  return result;
}

const context = { prefix: '[LOG]' };
const boundFormat = bind(format, context, 'User {0} logged in');
console.log(boundFormat('Alice')); // => '[LOG]: User Alice logged in'
```

### Real-World Application

```typescript
// Example 5: API client with bound methods
class ApiClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async request(method: string, endpoint: string, data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const options: any = {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return fetch(url, options);
  }

  get(endpoint: string) {
    return bind(this.request, this, 'GET')(endpoint);
  }

  post(endpoint: string, data: any) {
    return bind(this.request, this, 'POST')(endpoint, data);
  }
}

const client = new ApiClient('https://api.example.com', 'token123');
// client.get('/users');
// client.post('/users', { name: 'Alice' });
```

## Interactive Example

```tsx live
function BindExample() {
  const [name, setName] = React.useState('Alice');
  const [greeting, setGreeting] = React.useState('Hello');
  const [result, setResult] = React.useState('');

  const obj = { name };
  const greet = function (greeting) {
    return `${greeting}, ${this.name}!`;
  };

  const boundGreet = bind(greet, obj, greeting);

  const handleCalculate = () => {
    const res = boundGreet();
    setResult(res);
  };

  React.useEffect(() => {
    handleCalculate();
  }, [name, greeting]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Bind Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Greeting:</label>
          <input
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
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

- ⚠️ **This Binding**: The `this` context is permanently bound. Subsequent calls cannot change it.
- 💡 **Partial Arguments**: Like `partial`, arguments are prepended, so partial arguments come first.
- 🔒 **Method Extraction**: Use bind to extract methods from objects and use them as standalone functions.
- 🐛 **Common Mistake**: Forgetting that `bind` changes `this` context. Use `partial` if you only need argument binding.
- 📚 **Best Practice**: Use bind for event handlers and callbacks where `this` context matters.

## Related Functions

- [`partial`](./partial) - Partially applies arguments without binding `this`
- [`curry`](./curry) - Creates a curried function for progressive argument application
- [`compose`](./compose) - Composes functions from right to left
- [`pipe`](./pipe) - Composes functions from left to right

## Version History

- **v1.0.0** - Initial version
