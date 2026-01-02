---
id: isBoolean
title: isBoolean
description: 'Checks if value is classified as a Boolean primitive or object.'
---

# `isBoolean`

Checks if value is classified as a Boolean primitive or object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a boolean, else false

## Examples

```typescript
* isBoolean(false) // => true
 * isBoolean(true) // => true
 * isBoolean(new Boolean(true)) // => false (primitive check only)
 * isBoolean(1) // => false
```

## Interactive Example

```tsx live
function isBooleanExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isBoolean` Example</h4>
      <p>Checks if value is classified as a Boolean primitive or object.</p>
    </div>
  );
}
```
