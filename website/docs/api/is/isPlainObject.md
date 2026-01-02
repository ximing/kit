---
id: isPlainObject
title: isPlainObject
description: 'Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null.'
---

# `isPlainObject`

Checks if value is a plain object, that is, an object created by the Object constructor
or one with a [[Prototype]] of null.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a plain object, else false

## Examples

```typescript
* isPlainObject({}) // => true
 * isPlainObject({ a: 1 }) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject([]) // => false
 * isPlainObject(() => {}) // => false
 * isPlainObject(new Date()) // => false
```

## Interactive Example

```tsx live
function isPlainObjectExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isPlainObject` Example</h4>
      <p>
        Checks if value is a plain object, that is, an object created by the Object constructor or one with a
        [[Prototype]] of null.
      </p>
    </div>
  );
}
```
