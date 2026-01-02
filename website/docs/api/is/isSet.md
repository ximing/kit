---
id: isSet
title: isSet
description: "Checks if value is a Set object."
---

# `isSet`

Checks if value is a Set object.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `value` | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a Set object, else false

## Examples

```typescript
* isSet(new Set()) // => true
 * isSet(new Set([1, 2, 3])) // => true
 * isSet([]) // => false
 * isSet(new WeakSet()) // => false
```

## Interactive Example

```tsx live
function IsSetExample() {
  const [testValues] = useState([
    { value: new Set(), label: 'new Set()' },
    { value: new Set([1, 2, 3]), label: 'new Set([1, 2, 3])' },
    { value, label: '[]' },
    { value: new WeakSet(), label: 'new WeakSet()' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isSet Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a Set object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isSet(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isSet(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

