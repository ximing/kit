---
id: capitalize
title: capitalize
description: 'Converts the first character of string to upper case and the remainder to lower case.'
---

# `capitalize`

Converts the first character of string to upper case and the remainder to lower case.

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `str`     | `any` | - The string to capitalize |

## Returns

- **Type**: `any`
- **Description**: The capitalized string

## Examples

```typescript
* capitalize('FRED') // => 'Fred'
 * capitalize('foo') // => 'Foo'
```

## Interactive Example

```tsx live
function capitalizeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`capitalize` Example</h4>
      <p>Converts the first character of string to upper case and the remainder to lower case.</p>
    </div>
  );
}
```
