---
id: partial
title: partial
description: 'Creates a function that invokes func with partialArgs prepended to the arguments it receives. This method is like bind except it does not alter the this binding.'
---

# `partial`

Creates a function that invokes func with partialArgs prepended to the arguments it receives.
This method is like bind except it does not alter the this binding.

## 参数

| 参数          | 类型  | 描述                                           |
| ------------- | ----- | ---------------------------------------------- |
| `func`        | `any` | - The function to partially apply arguments to |
| `partialArgs` | `any` | - The arguments to be partially applied        |

## 返回值

- **类型**: `any`
- **描述**: Returns the new partially applied function

## 示例

```typescript
* const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
 * const sayHelloTo = partial(greet, 'Hello');
 * sayHelloTo('Alice'); // => 'Hello, Alice!'
 * sayHelloTo('Bob'); // => 'Hello, Bob!'
 *
 *
```

```typescript
* const add = (a: number, b: number, c: number) => a + b + c;
 * const add5 = partial(add, 5);
 * add5(10, 15); // => 30
```

## 交互式示例

```tsx live
function partialExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`partial` Example</h4>
      <p>
        Creates a function that invokes func with partialArgs prepended to the arguments it receives. This method is
        like bind except it does not alter the this binding.
      </p>
    </div>
  );
}
```
