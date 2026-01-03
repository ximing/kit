---
id: isBoolean
title: isBoolean
description: 'Checks if value is classified as a Boolean primitive or object.'
---

# `isBoolean`

Checks if value is classified as a Boolean primitive or object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a boolean, else false

## Examples

```typescript
* isBoolean(false) // => true
 * isBoolean(true) // => true
 * isBoolean(new Boolean(true)) // => false (primitive check only)
 * isBoolean(1) // => false
```

## Interactive Example

```tsx live
function IsBooleanExample() {
  const [testValues] = useState([
    { value, label: 'true' },
    { value, label: 'false' },
    { value: new Boolean(true), label: 'new Boolean(true)' },
    { value, label: '1' },
    { value: 'true', label: "'true'" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isBoolean Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Checks if a value is a Boolean primitive.</p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div
            key={index}
            style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isBoolean(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isBoolean(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
