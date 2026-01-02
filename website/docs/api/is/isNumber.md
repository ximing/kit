---
id: isNumber
title: isNumber
description: 'Checks if value is classified as a Number primitive or object.'
---

# `isNumber`

Checks if value is classified as a Number primitive or object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a number, else false

## Examples

```typescript
* isNumber(3) // => true
 * isNumber(new Number(3)) // => true
 * isNumber(NaN) // => true
 * isNumber(Infinity) // => true
 * isNumber('3') // => false
```

## Interactive Example

```tsx live
function isNumberExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isNumber` Example</h4>
      <p>Checks if value is classified as a Number primitive or object.</p>
    </div>
  );
}
```
