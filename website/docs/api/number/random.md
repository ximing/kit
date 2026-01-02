---
id: random
title: random
description: 'Produces a random number between the inclusive lower and upper bounds. If only one argument is provided, a number between 0 and the given number is returned.'
---

# `random`

Produces a random number between the inclusive lower and upper bounds.
If only one argument is provided, a number between 0 and the given number is returned.

## Parameters

| Parameter  | Type  | Description                                               |
| ---------- | ----- | --------------------------------------------------------- |
| `lower`    | `any` | - The lower bound or upper bound if upper is not provided |
| `upper`    | `any` | - The upper bound                                         |
| `floating` | `any` | - Specify returning a floating-point number               |

## Returns

- **Type**: `any`
- **Description**: Returns the random number

## Examples

```typescript
* random(5) // => random number between 0 and 5
 * random(5, 10) // => random number between 5 and 10
 * random(5, 10, true) // => random floating-point number between 5 and 10
```

## Interactive Example

```tsx live
function randomExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`random` Example</h4>
      <p>
        Produces a random number between the inclusive lower and upper bounds. If only one argument is provided, a
        number between 0 and the given number is returned.
      </p>
    </div>
  );
}
```
