---
id: mergeDeep
title: mergeDeep
description: 'Recursively merges source objects into target object (deep merge)'
---

# `mergeDeep`

Recursively merges source objects into target object (deep merge)

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
* const obj1 = { a: 1, b: { c: 2, d: 3 } };
 * const obj2 = { b: { d: 4, e: 5 }, f: 6 };
 * mergeDeep(obj1, obj2); // { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
```

## Interactive Example

```tsx live
function mergeDeepExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`mergeDeep` Example</h4>
      <p>Recursively merges source objects into target object (deep merge)</p>
    </div>
  );
}
```
