---
id: merge
title: merge
description: 'Merges source objects into target object (shallow merge)'
---

# `merge`

Merges source objects into target object (shallow merge)

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `target`  | `any` | - The target object  |
| `sources` | `any` | - The source objects |

## Returns

- **Type**: `any`
- **Description**: Returns the target object

## Examples

```typescript
* const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * merge(obj1, obj2); // { a: 1, b: { d: 3 }, e: 4 }
```

## Interactive Example

```tsx live
function mergeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`merge` Example</h4>
      <p>Merges source objects into target object (shallow merge)</p>
    </div>
  );
}
```
