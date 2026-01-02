---
id: keys
title: keys
description: "Creates an array of the own enumerable property names of object"
---

# `keys`

Creates an array of the own enumerable property names of object

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `obj` | `any` | - The object to query |

## Returns

- **Type**: `any`
- **Description**: Returns the array of property names

## Examples

```typescript
* keys({ a: 1, b: 2, c: 3 }); // ['a', 'b', 'c']
```

## Interactive Example

```tsx live
function KeysExample() {
  const [obj] = useState({ a, b, c: 3 });
  const [result] = useState(() => keys(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>keys Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an array of all enumerable property names in an object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Keys:</strong> {JSON.stringify(result)}
        </p>
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
          {result.map((key, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              [{index}] {JSON.stringify(key)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

