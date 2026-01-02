---
id: maxBy
title: maxBy
description: 'This method is like max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).'
---

# `maxBy`

This method is like max except that it accepts iteratee which is invoked for each element
in array to generate the criterion by which the value is ranked.
The iteratee is invoked with one argument: (value).

## Parameters

| Parameter  | Type  | Description                        |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## Returns

- **Type**: `any`
- **Description**: Returns the maximum value

## Examples

```typescript
* maxBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 3 }
 * maxBy([], (o) => o.n) // => undefined
```

## Interactive Example

```tsx live
function maxByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`maxBy` Example</h4>
      <p>
        This method is like max except that it accepts iteratee which is invoked for each element in array to generate
        the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
      </p>
    </div>
  );
}
```
