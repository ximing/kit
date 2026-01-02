---
id: curry
title: curry
description: 'Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on.'
---

# `curry`

Creates a function that accepts arguments of func and either invokes func returning
its result, if at least arity number of arguments have been provided, or returns a
function that accepts the remaining func arguments, and so on.

## Parameters

| Parameter | Type  | Description                                |
| --------- | ----- | ------------------------------------------ |
| `func`    | `any` | - The function to curry                    |
| `arity`   | `any` | - The arity of func (default: func.length) |

## Returns

- **Type**: `any`
- **Description**: Returns the new curried function

## Examples

```typescript
* const add = (a: number, b: number, c: number) => a + b + c;
 * const curried = curry(add);
 * curried(1)(2)(3); // => 6
 * curried(1, 2)(3); // => 6
 * curried(1)(2, 3); // => 6
 * curried(1, 2, 3); // => 6
 *
 *
```

```typescript
* const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
 * const curriedGreet = curry(greet);
 * const sayHello = curriedGreet('Hello');
 * sayHello('Alice'); // => 'Hello, Alice!'
 * sayHello('Bob'); // => 'Hello, Bob!'
```

## Interactive Example

```tsx live
function curryExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`curry` Example</h4>
      <p>
        Creates a function that accepts arguments of func and either invokes func returning its result, if at least
        arity number of arguments have been provided, or returns a function that accepts the remaining func arguments,
        and so on.
      </p>
    </div>
  );
}
```
