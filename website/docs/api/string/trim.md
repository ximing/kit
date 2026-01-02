---
id: trim
title: trim
description: 'Removes leading and trailing whitespace or specified characters from string.'
---

# `trim`

Removes leading and trailing whitespace or specified characters from string.

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
* trim('  abc  ') // => 'abc'
 * trim('-_-abc-_-', '-_') // => 'abc'
```

## Interactive Example

```tsx live
function trimExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`trim` Example</h4>
      <p>Removes leading and trailing whitespace or specified characters from string.</p>
    </div>
  );
}
```
