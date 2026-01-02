---
id: once
title: once
description: 'Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.'
---

# `once`

Creates a function that is restricted to invoking func once.
Repeat calls to the function return the value of the first invocation.

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `func`    | `any` | - The function to restrict |

## Returns

- **Type**: `any`
- **Description**: Returns the new restricted function

## Examples

```typescript
* let count = 0;
 * const initialize = once(() => ++count);
 * initialize(); // => 1
 * initialize(); // => 1
 * console.log(count); // => 1
 *
 *
```

```typescript
* const greet = once((name: string) => `Hello, ${name}!`);
 * greet('Alice'); // => 'Hello, Alice!'
 * greet('Bob'); // => 'Hello, Alice!' (returns cached result)
```

## Interactive Example

```tsx live
function onceExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`once` Example</h4>
      <p>
        Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of
        the first invocation.
      </p>
    </div>
  );
}
```
