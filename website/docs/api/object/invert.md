---
id: invert
title: invert
description: "Creates an object composed of the inverted keys and values of object"
---

# `invert`

Creates an object composed of the inverted keys and values of object

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `obj` | `any` | - The object to invert |

## Returns

- **Type**: `any`
- **Description**: Returns the new inverted object

## Examples

```typescript
* invert({ a: 1, b: 2, c: 1 }); // { '1': 'c', '2': 'b' }
```

## Interactive Example

```tsx live
function InvertExample() {
  const [obj] = useState({ a, b, c: 1 });
  const [result] = useState(() => invert(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>invert Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an object with keys and values swapped. Keys become values and values become keys.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Inverted Object:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note, the last one wins (e.g., both 'a' and 'c' have value 1, so '1' maps to 'c').
        </p>
      </div>
    </div>
  );
}
```

