---
id: trimEnd
title: trimEnd
description: 'Removes trailing whitespace or specified characters from string.'
---

# `trimEnd`

Removes trailing whitespace or specified characters from string.

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
* trimEnd('  abc  ') // => '  abc'
 * trimEnd('-_-abc-_-', '-_') // => '-_-abc'
```

## Interactive Example

```tsx live
function trimEndExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`trimEnd` Example</h4>
      <p>Removes trailing whitespace or specified characters from string.</p>
    </div>
  );
}
```
