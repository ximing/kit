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
function MergeExample() {
  const [obj1] = useState({ a, b: { c: 2 } });
  const [obj2] = useState({ b: { d: 3 }, e: 4 });
  const [result] = useState(() => merge({ ...obj1 }, obj2));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>merge Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Merges source objects into a target object (shallow merge). Properties from later objects override earlier ones.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Object 1:</strong> {JSON.stringify(obj1)}
        </p>
        <p>
          <strong>Object 2:</strong> {JSON.stringify(obj2)}
        </p>
        <p style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <strong>Merged Result:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note: This is a shallow merge. The nested object 'b' is completely replaced, not merged deeply.
        </p>
      </div>
    </div>
  );
}
```
