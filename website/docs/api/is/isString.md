---
id: isString
title: isString
description: 'Checks if value is classified as a String primitive or object.'
---

# `isString`

Checks if value is classified as a String primitive or object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a string, else false

## Examples

```typescript
* isString('abc') // => true
 * isString(new String('abc')) // => true
 * isString(123) // => false
```

## Interactive Example

```tsx live
function isStringExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isString` Example</h4>
      <p>Checks if value is classified as a String primitive or object.</p>
    </div>
  );
}
```
