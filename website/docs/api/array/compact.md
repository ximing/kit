---
id: compact
title: compact
description: 'Removes falsy values from an array'
---

# `compact`

Removes falsy values from an array

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `array`   | `any` | The array to compact |

## Returns

- **Type**: `any`
- **Description**: A new array with falsy values removed

## Examples

```typescript
* compact([0, 1, false, 2, '', 3, null, undefined, 4]); // [1, 2, 3, 4]
```

## Interactive Example

```tsx live
function compactExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`compact` Example</h4>
      <p>Removes falsy values from an array</p>
    </div>
  );
}
```
