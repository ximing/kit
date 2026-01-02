---
id: isPromise
title: isPromise
description: "Checks if value is a Promise object."
---

# `isPromise`

Checks if value is a Promise object.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `value` | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a Promise object, else false

## Examples

```typescript
* isPromise(Promise.resolve(1)) // => true
 * isPromise(new Promise(() => {})) // => true
 * isPromise(async () => {}) // => false
 * isPromise({ then: () => {} }) // => false
```

## Interactive Example

```tsx live
function IsPromiseExample() {
  const [testValues] = useState([
    { value: Promise.resolve(1), label: 'Promise.resolve(1)' },
    { value: new Promise(() => {}), label: 'new Promise(() => {})' },
    { value: async () => {}, label: 'async () => {}' },
    { value: { then: () => {} }, label: '{ then: () => {} }' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isPromise Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a Promise object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isPromise(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isPromise(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

