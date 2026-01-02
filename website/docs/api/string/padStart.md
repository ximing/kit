---
id: padStart
title: padStart
description: "Pads string on the left side if it's shorter than length."
---

# `padStart`

Pads string on the left side if it's shorter than length.

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
* padStart('abc', 6) // => '   abc'
 * padStart('abc', 6, '_-') // => '_-_abc'
 * padStart('abc', 3) // => 'abc'
```

## Interactive Example

```tsx live
function padStartExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`padStart` Example</h4>
      <p>Pads string on the left side if it's shorter than length.</p>
    </div>
  );
}
```
