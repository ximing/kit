---
id: isEmpty
title: isEmpty
description: 'Checks if value is empty. A value is considered empty if it is one of the following: - null or undefined - empty string - empty array - empty object (no enumerable properties) - NaN'
---

# `isEmpty`

Checks if value is empty. A value is considered empty if it is one of the following:

- null or undefined
- empty string
- empty array
- empty object (no enumerable properties)
- NaN

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is empty, else false

## Examples

```typescript
* isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty('') // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty(NaN) // => true
 * isEmpty(0) // => false
 * isEmpty(false) // => false
 * isEmpty([0]) // => false
 * isEmpty({ a: 1 }) // => false
```

## Interactive Example

```tsx live
function isEmptyExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isEmpty` Example</h4>
      <p>
        Checks if value is empty. A value is considered empty if it is one of the following: - null or undefined - empty
        string - empty array - empty object (no enumerable properties) - NaN
      </p>
    </div>
  );
}
```
