---
id: bind
title: bind
description: 'Creates a function that invokes func with the this binding of thisArg and partialArgs prepended to the arguments it receives.'
---

# `bind`

Creates a function that invokes func with the this binding of thisArg and
partialArgs prepended to the arguments it receives.

## 参数

| 参数          | 类型  | 描述                                    |
| ------------- | ----- | --------------------------------------- |
| `func`        | `any` | - The function to bind                  |
| `thisArg`     | `any` | - The this binding of func              |
| `partialArgs` | `any` | - The arguments to be partially applied |

## 返回值

- **类型**: `any`
- **描述**: Returns the new bound function

## 示例

```typescript
* const obj = {
 *   name: 'Alice',
 *   greet(greeting: string) {
 *     return `${greeting}, ${this.name}!`;
 *   }
 * };
 * const boundGreet = bind(obj.greet, obj, 'Hello');
 * boundGreet(); // => 'Hello, Alice!'
 *
 *
```

```typescript
* function add(this: { base: number }, a: number, b: number) {
 *   return this.base + a + b;
 * }
 * const obj = { base: 10 };
 * const boundAdd = bind(add, obj, 5);
 * boundAdd(3); // => 18
```

## 交互式示例

```tsx live
function BindExample() {
  const [greeting, setGreeting] = useState('Hello');

  // Create an object with a method
  const obj = {
    name: 'Alice',
    greet: function (greeting) {
      return `${greeting}, ${this.name}!`;
    },
  };

  // Bind the method to the object with a partial argument
  const boundGreet = bind(obj.greet, obj, greeting);
  const result = boundGreet();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Bind Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Greeting: </label>
        <input
          type="text"
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Object Name:</strong> {obj.name}
        </p>
        <p>
          <strong>Greeting:</strong> {greeting}
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
}
```
