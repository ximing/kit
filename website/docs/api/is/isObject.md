---
id: isObject
title: isObject
description: "Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))"
---

# `isObject`

Checks if value is the language type of Object.
(e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is an object, else false

## Examples

```typescript
* isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * isObject(undefined) // => false
 * isObject('abc') // => false
```

## Interactive Example

```tsx live
function isObjectExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isObject` Example</h4>
      <p>
        Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and
        new String(''))
      </p>
    </div>
  );
}
```
