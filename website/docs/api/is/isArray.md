---
id: isArray
title: isArray
description: "Checks if value is classified as an Array object."
---

# `isArray`

Checks if value is classified as an Array object.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `value` | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is an array, else false

## Examples

```typescript
* isArray([1, 2, 3]) // => true
 * isArray('abc') // => false
 * isArray({ length: 0 }) // => false
```

## Interactive Example

```tsx live
function IsArrayExample() {
  const [testValues] = useState([
    { value, label: '[1, 2, 3]' },
    { value: 'abc', label: "'abc'" },
    { value: { length: 0 }, label: '{ length: 0 }' },
    { value, label: '[]' },
    { value, label: 'null' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isArray Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is classified as an Array object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isArray(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isArray(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

