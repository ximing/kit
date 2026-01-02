---
id: isPromise
title: isPromise
description: 'Checks if value is a Promise object.'
---

# `isPromise`

Checks if value is a Promise object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a Promise object, else false

## Examples

```typescript
* isPromise(Promise.resolve(1)) // => true
 * isPromise(new Promise(() => {})) // => true
 * isPromise(async () => {}) // => false
 * isPromise({ then: () => {} }) // => false
```

## Interactive Example

```tsx live
function isPromiseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isPromise` Example</h4>
      <p>Checks if value is a Promise object.</p>
    </div>
  );
}
```
