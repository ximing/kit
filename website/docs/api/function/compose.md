---
id: compose
title: compose
description: 'Creates a function that is the composition of the provided functions, where each successive invocation is supplied the return value of the previous. Functions are executed from right to left.'
---

# `compose`

Creates a function that is the composition of the provided functions,
where each successive invocation is supplied the return value of the previous.
Functions are executed from right to left.

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `funcs`   | `any` | - The functions to compose |

## Returns

- **Type**: `any`
- **Description**: Returns the new composite function

## Examples

```typescript
* const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const composed = compose(add, multiply);
 * composed(5); // => 11 (multiply(5) = 10, then add(10) = 11)
 *
 *
```

```typescript
* const toUpper = (str: string) => str.toUpperCase();
 * const exclaim = (str: string) => `${str}!`;
 * const shout = compose(exclaim, toUpper);
 * shout('hello'); // => 'HELLO!'
```

## Interactive Example

```tsx live
function composeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`compose` Example</h4>
      <p>
        Creates a function that is the composition of the provided functions, where each successive invocation is
        supplied the return value of the previous. Functions are executed from right to left.
      </p>
    </div>
  );
}
```
