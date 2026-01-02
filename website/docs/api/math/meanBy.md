---
id: meanBy
title: meanBy
description: 'This method is like mean except that it accepts iteratee which is invoked for each element in array to generate the value to be averaged. The iteratee is invoked with one argument: (value).'
---

# `meanBy`

This method is like mean except that it accepts iteratee which is invoked for each element
in array to generate the value to be averaged.
The iteratee is invoked with one argument: (value).

## Parameters

| Parameter  | Type  | Description                        |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## Returns

- **Type**: `any`
- **Description**: Returns the mean

## Examples

```typescript
* meanBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 2
 * meanBy([], (o) => o.n) // => 0
```

## Interactive Example

```tsx live
function meanByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`meanBy` Example</h4>
      <p>
        This method is like mean except that it accepts iteratee which is invoked for each element in array to generate
        the value to be averaged. The iteratee is invoked with one argument: (value).
      </p>
    </div>
  );
}
```
