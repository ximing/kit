---
id: repeat
title: repeat
description: 'Repeats the given string n times.'
---

# `repeat`

Repeats the given string n times.

## Parameters

| Parameter | Type  | Description                                |
| --------- | ----- | ------------------------------------------ |
| `str`     | `any` | - The string to repeat                     |
| `n`       | `any` | - The number of times to repeat the string |

## Returns

- **Type**: `any`
- **Description**: The repeated string

## Examples

```typescript
* repeat('*', 3) // => '***'
 * repeat('abc', 2) // => 'abcabc'
 * repeat('abc', 0) // => ''
```

## Interactive Example

```tsx live
function repeatExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`repeat` Example</h4>
      <p>Repeats the given string n times.</p>
    </div>
  );
}
```
