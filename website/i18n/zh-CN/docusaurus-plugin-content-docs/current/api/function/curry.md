---
id: curry
title: curry
description: 'Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on.'
---

# `curry`

Creates a function that accepts arguments of func and either invokes func returning
its result, if at least arity number of arguments have been provided, or returns a
function that accepts the remaining func arguments, and so on.

## 参数

| 参数    | 类型  | 描述                                       |
| ------- | ----- | ------------------------------------------ |
| `func`  | `any` | - The function to curry                    |
| `arity` | `any` | - The arity of func (default: func.length) |

## 返回值

- **类型**: `any`
- **描述**: Returns the new curried function

## 示例

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

## 交互式示例

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
