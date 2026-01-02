---
id: entries
title: entries
description: 'Creates an array of own enumerable string keyed-value pairs for object'
---

# `entries`

Creates an array of own enumerable string keyed-value pairs for object

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| `obj`     | `any` | - The object to query |

## Returns

- **Type**: `any`
- **Description**: Returns the key-value pairs

## Examples

```typescript
* entries({ a: 1, b: 2, c: 3 }); // [['a', 1], ['b', 2], ['c', 3]]
```

## Interactive Example

```tsx live
function entriesExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`entries` Example</h4>
      <p>Creates an array of own enumerable string keyed-value pairs for object</p>
    </div>
  );
}
```
