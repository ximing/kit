---
id: isEmpty
title: isEmpty
description: "Checks if value is empty. A value is considered empty if it is one of the following: - null or undefined - empty string - empty array - empty object (no enumerable properties) - NaN"
---

# `isEmpty`

Checks if value is empty. A value is considered empty if it is one of the following:
- null or undefined
- empty string
- empty array
- empty object (no enumerable properties)
- NaN

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is empty, else false

## 示例

```typescript
* isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty('') // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty(NaN) // => true
 * isEmpty(0) // => false
 * isEmpty(false) // => false
 * isEmpty([0]) // => false
 * isEmpty({ a: 1 }) // => false
```

## 交互式示例

```tsx live
function IsEmptyExample() {
  const [testValues] = useState([
    { value, label: 'null' },
    { value, label: 'undefined' },
    { value: '', label: "'' (empty string)" },
    { value, label: '[] (empty array)' },
    { value: {}, label: '{} (empty object)' },
    { value, label: 'NaN' },
    { value, label: '0' },
    { value, label: 'false' },
    { value, label: '[0]' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isEmpty Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is empty (null, undefined, empty string/array/object, or NaN).
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isEmpty(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isEmpty(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

