---
id: values
title: values
description: "Creates an array of the own enumerable property values of object"
---

# `values`

Creates an array of the own enumerable property values of object

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `obj` | `any` | - The object to query |

## Returns

- **Type**: `any`
- **Description**: Returns the array of property values

## Examples

```typescript
* values({ a: 1, b: 2, c: 3 }); // [1, 2, 3]
```

## Interactive Example

```tsx live
function ValuesExample() {
  const [obj] = useState({ a, b, c: 3 });
  const [result] = useState(() => values(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>values Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an array of all enumerable property values in an object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Values:</strong> {JSON.stringify(result)}
        </p>
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
          {result.map((val, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              [{index}] {JSON.stringify(val)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

