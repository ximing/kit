---
id: isRegExp
title: isRegExp
description: "Checks if value is a RegExp object."
---

# `isRegExp`

Checks if value is a RegExp object.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `value` | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a RegExp object, else false

## Examples

```typescript
* isRegExp(/abc/) // => true
 * isRegExp(new RegExp('abc')) // => true
 * isRegExp('/abc/') // => false
```

## Interactive Example

```tsx live
function IsRegExpExample() {
  const [testValues] = useState([
    { value: /abc/, label: '/abc/' },
    { value: new RegExp('abc'), label: "new RegExp('abc')" },
    { value: '/abc/', label: "'/abc/'" },
    { value: {}, label: '{}' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isRegExp Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a RegExp object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isRegExp(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isRegExp(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

