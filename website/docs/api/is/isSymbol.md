---
id: isSymbol
title: isSymbol
description: "Checks if value is classified as a Symbol primitive or object."
---

# `isSymbol`

Checks if value is classified as a Symbol primitive or object.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `value` | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a symbol, else false

## Examples

```typescript
* isSymbol(Symbol('test')) // => true
 * isSymbol(Symbol.iterator) // => true
 * isSymbol('test') // => false
 * isSymbol({}) // => false
```

## Interactive Example

```tsx live
function IsSymbolExample() {
  const [testValues] = useState([
    { value: Symbol('test'), label: "Symbol('test')" },
    { value: Symbol.iterator, label: 'Symbol.iterator' },
    { value: 'test', label: "'test'" },
    { value: {}, label: '{}' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isSymbol Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a Symbol primitive.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isSymbol(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isSymbol(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

