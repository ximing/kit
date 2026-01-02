---
id: minBy
title: minBy
description: 'This method is like min except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).'
---

# `minBy`

This method is like min except that it accepts iteratee which is invoked for each element
in array to generate the criterion by which the value is ranked.
The iteratee is invoked with one argument: (value).

## Parameters

| Parameter  | Type  | Description                        |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## Returns

- **Type**: `any`
- **Description**: Returns the minimum value

## Examples

```typescript
* minBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 1 }
 * minBy([], (o) => o.n) // => undefined
```

## Interactive Example

```tsx live
function minByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`minBy` Example</h4>
      <p>
        This method is like min except that it accepts iteratee which is invoked for each element in array to generate
        the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
      </p>
    </div>
  );
}
```
