---
id: truncate
title: truncate
description: "Truncates string if it's longer than the given maximum string length."
---

# `truncate`

Truncates string if it's longer than the given maximum string length.

## Parameters

| Parameter | Type  | Description                                                         |
| --------- | ----- | ------------------------------------------------------------------- |
| `str`     | `any` | - The string to truncate                                            |
| `options` | `any` | - The options object                                                |
| `options` | `any` | .length - The maximum string length (default: 30)                   |
| `options` | `any` | .omission - The string to indicate text is omitted (default: '...') |

## Returns

- **Type**: `any`
- **Description**: The truncated string

## Examples

```typescript
* truncate('Hi-Diddly-Ho there, Flanders!') // => 'Hi-Diddly-Ho there, Flanders!'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 }) // => 'Hi-Diddly-Ho ther...'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' }) // => 'Hi-Diddly-Ho [...]'
```

## Interactive Example

```tsx live
function truncateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`truncate` Example</h4>
      <p>Truncates string if it's longer than the given maximum string length.</p>
    </div>
  );
}
```
