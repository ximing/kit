---
id: isUndefined
title: isUndefined
description: 'Checks if value is undefined.'
---

# `isUndefined`

Checks if value is undefined.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is undefined, else false

## Examples

```typescript
* isUndefined(undefined) // => true
 * isUndefined(void 0) // => true
 * isUndefined(null) // => false
 * isUndefined(0) // => false
```

## Interactive Example

```tsx live
function isUndefinedExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isUndefined` Example</h4>
      <p>Checks if value is undefined.</p>
    </div>
  );
}
```
