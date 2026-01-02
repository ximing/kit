---
id: isRegExp
title: isRegExp
description: 'Checks if value is a RegExp object.'
---

# `isRegExp`

Checks if value is a RegExp object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a RegExp object, else false

## Examples

```typescript
* isRegExp(/abc/) // => true
 * isRegExp(new RegExp('abc')) // => true
 * isRegExp('/abc/') // => false
```

## Interactive Example

```tsx live
function isRegExpExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isRegExp` Example</h4>
      <p>Checks if value is a RegExp object.</p>
    </div>
  );
}
```
