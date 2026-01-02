---
id: isFunction
title: isFunction
description: 'Checks if value is classified as a Function object.'
---

# `isFunction`

Checks if value is classified as a Function object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a function, else false

## Examples

```typescript
* isFunction(() => {}) // => true
 * isFunction(function() {}) // => true
 * isFunction(class MyClass {}) // => true
 * isFunction({}) // => false
```

## Interactive Example

```tsx live
function isFunctionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isFunction` Example</h4>
      <p>Checks if value is classified as a Function object.</p>
    </div>
  );
}
```
