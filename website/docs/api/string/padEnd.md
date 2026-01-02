---
id: padEnd
title: padEnd
description: "Pads string on the right side if it's shorter than length."
---

# `padEnd`

Pads string on the right side if it's shorter than length.

## Parameters

| Parameter | Type  | Description                                 |
| --------- | ----- | ------------------------------------------- |
| `str`     | `any` | - The string to pad                         |
| `length`  | `any` | - The padding length                        |
| `chars`   | `any` | - The string used as padding (default: ' ') |

## Returns

- **Type**: `any`
- **Description**: The padded string

## Examples

```typescript
* padEnd('abc', 6) // => 'abc   '
 * padEnd('abc', 6, '_-') // => 'abc_-_'
 * padEnd('abc', 3) // => 'abc'
```

## Interactive Example

```tsx live
function padEndExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`padEnd` Example</h4>
      <p>Pads string on the right side if it's shorter than length.</p>
    </div>
  );
}
```
