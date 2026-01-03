---
id: isFunction
title: isFunction
description: 'Checks if value is classified as a Function object.'
---

# `isFunction`

Checks if value is classified as a Function object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a function, else false

## Examples

```typescript
* isFunction(() => {}) // => true
 * isFunction(function() {}) // => true
 * isFunction(class MyClass {}) // => true
 * isFunction({}) // => false
```

## Interactive Example

```tsx live
function IsFunctionExample() {
  const [testValues] = useState([
    { value: () => {}, label: '() => {}' },
    { value: function () {}, label: 'function() {}' },
    { value: class MyClass {}, label: 'class MyClass {}' },
    { value: {}, label: '{}' },
    { value: 'function', label: "'function'" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isFunction Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Checks if a value is a Function object.</p>
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
                  backgroundColor: isFunction(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isFunction(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
