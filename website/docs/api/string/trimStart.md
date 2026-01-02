---
id: trimStart
title: trimStart
description: 'Removes leading whitespace or specified characters from string.'
---

# `trimStart`

Removes leading whitespace or specified characters from string.

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `str`     | `any` | - The string to trim       |
| `chars`   | `any` | - The characters to remove |

## Returns

- **Type**: `any`
- **Description**: The trimmed string

## Examples

```typescript
* trimStart('  abc  ') // => 'abc  '
 * trimStart('-_-abc-_-', '-_') // => 'abc-_-'
```

## Interactive Example

```tsx live
function trimStartExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`trimStart` Example</h4>
      <p>Removes leading whitespace or specified characters from string.</p>
    </div>
  );
}
```
