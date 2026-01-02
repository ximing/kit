---
id: pipe
title: pipe
description: 'Creates a function that is the composition of the provided functions, where each successive invocation is supplied the return value of the previous. Functions are executed from left to right.'
---

# `pipe`

Creates a function that is the composition of the provided functions,
where each successive invocation is supplied the return value of the previous.
Functions are executed from left to right.

## 参数

| 参数    | 类型  | 描述                    |
| ------- | ----- | ----------------------- |
| `funcs` | `any` | - The functions to pipe |

## 返回值

- **类型**: `any`
- **描述**: Returns the new composite function

## 示例

```typescript
* const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const piped = pipe(add, multiply);
 * piped(5); // => 12 (add(5) = 6, then multiply(6) = 12)
 *
 *
```

```typescript
* const toUpper = (str: string) => str.toUpperCase();
 * const exclaim = (str: string) => `${str}!`;
 * const shout = pipe(toUpper, exclaim);
 * shout('hello'); // => 'HELLO!'
```

## 交互式示例

```tsx live
function pipeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`pipe` Example</h4>
      <p>
        Creates a function that is the composition of the provided functions, where each successive invocation is
        supplied the return value of the previous. Functions are executed from left to right.
      </p>
    </div>
  );
}
```
