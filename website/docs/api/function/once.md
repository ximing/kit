---
id: once
title: once
description: 'Creates a function that is restricted to invoking func once, with subsequent calls returning the first result'
---

# `once`

Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation. This is useful for initialization functions, event handlers that should only run once, or preventing duplicate operations.

## Syntax

```typescript
function once<T extends (...args: any[]) => any>(func: T): T;
```

## Parameters

| Parameter | Type                                | Required | Default | Description                                     |
| --------- | ----------------------------------- | -------- | ------- | ----------------------------------------------- |
| `func`    | `T extends (...args: any[]) => any` | ✅       | -       | The function to restrict to a single invocation |

## Returns

- **Type**: `T`
- **Description**: A restricted function that executes only once and caches the result for subsequent calls.

## Examples

### Basic Usage

```typescript
import { once } from '@rabjs/kit';

// Example 1: Count increments only on first call
let count = 0;
const initialize = once(() => ++count);

console.log(initialize()); // => 1
console.log(initialize()); // => 1 (returns cached result)
console.log(initialize()); // => 1
console.log(count); // => 1 (function only called once)

// Example 2: Greet function
const greet = once((name: string) => `Hello, ${name}!`);

console.log(greet('Alice')); // => 'Hello, Alice!'
console.log(greet('Bob')); // => 'Hello, Alice!' (returns cached result)
```

### Advanced Usage

```typescript
// Example 3: Initialize configuration
const initConfig = once(() => {
  console.log('Loading configuration...');
  return {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
  };
});

const config1 = initConfig();
const config2 = initConfig(); // Uses cached config
console.log(config1 === config2); // => true

// Example 4: Initialize database connection
const connectDB = once(async () => {
  console.log('Connecting to database...');
  // Simulate database connection
  return new Promise((resolve) => {
    setTimeout(() => resolve({ connected: true }), 1000);
  });
});

await connectDB(); // Connects
await connectDB(); // Returns cached connection
```

### Real-World Application

```typescript
// Example 5: Event listener that fires only once
class EventEmitter {
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  once(event: string, callback: Function) {
    const wrappedCallback = once(callback);
    this.on(event, wrappedCallback);
  }

  emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(...args));
    }
  }
}

const emitter = new EventEmitter();
emitter.once('ready', () => console.log('Ready!'));
emitter.emit('ready'); // => 'Ready!'
emitter.emit('ready'); // (no output, callback not called)
```

## Interactive Example

```tsx live
function OnceExample() {
  const [callCount, setCallCount] = React.useState(0);
  const [result, setResult] = React.useState('');

  const onceFunction = React.useMemo(() => {
    return once(() => {
      setCallCount((prev) => prev + 1);
      return 'Function executed!';
    });
  }, []);

  const handleClick = () => {
    const res = onceFunction();
    setResult(res);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Once Interactive Example</h4>
      <p>Click the button multiple times - the function only executes once:</p>
      <button onClick={handleClick} style={{ padding: '8px 16px', marginBottom: '15px' }}>
        Click Me
      </button>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Result:</strong> {result}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>Function Executions:</strong> {callCount}
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Caching**: The result of the first invocation is cached and returned for all subsequent calls, regardless of arguments.
- 💡 **Performance Tip**: Use for expensive operations like database connections or configuration loading that should only happen once.
- 🔒 **Arguments Ignored**: After the first call, any arguments passed to subsequent calls are ignored.
- 🐛 **Common Mistake**: Expecting different results on subsequent calls with different arguments. The first result is always returned.
- 📚 **Best Practice**: Use for initialization functions and event handlers that should only execute once.

## Related Functions

- [`debounce`](./debounce) - Delays execution until after wait time of inactivity
- [`throttle`](./throttle) - Invokes at most once per wait interval
- [`memoize`](./memoize) - Caches function results based on arguments

## Version History

- **v1.0.0** - Initial version
