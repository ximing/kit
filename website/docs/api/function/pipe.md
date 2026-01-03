---
id: pipe
title: pipe
description: 'Creates a function that is the composition of the provided functions, where each successive invocation is supplied the return value of the previous. Functions are executed from left to right.'
---

# `pipe`

Creates a function that is the composition of the provided functions,
where each successive invocation is supplied the return value of the previous.
Functions are executed from left to right.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `funcs`   | `any` | - The functions to pipe |

## Returns

- **Type**: `any`
- **Description**: Returns the new composite function

## Examples

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

## Interactive Example

```tsx live
function PipeExample() {
  const [input, setInput] = useState(5);

  // Create simple functions
  const add = (x) => x + 1;
  const multiply = (x) => x * 2;
  const square = (x) => x * x;

  // Pipe functions (left to right)
  const piped = pipe(add, multiply, square);
  const result = piped(input);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Pipe Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Input: </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {input}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Execution order (left to right): add(x) → multiply(x) → square(x)
        </p>
        <p>
          <strong>Step 1 (add):</strong> {input} + 1 = {input + 1}
        </p>
        <p>
          <strong>Step 2 (multiply):</strong> {input + 1} * 2 = {(input + 1) * 2}
        </p>
        <p>
          <strong>Step 3 (square):</strong> {(input + 1) * 2}² = {(input + 1) * 2 * ((input + 1) * 2)}
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
}
```
