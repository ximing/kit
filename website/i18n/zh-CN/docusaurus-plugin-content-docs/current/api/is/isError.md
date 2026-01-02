---
id: isError
title: isError
description: "Checks if value is an Error object."
---

# `isError`

Checks if value is an Error object.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is an Error object, else false

## 示例

```typescript
* isError(new Error()) // => true
 * isError(new TypeError()) // => true
 * isError('error') // => false
 * isError({ message: 'error' }) // => false
```

## 交互式示例

```tsx live
function IsErrorExample() {
  const [testValues] = useState([
    { value: new Error(), label: 'new Error()' },
    { value: new TypeError(), label: 'new TypeError()' },
    { value: new RangeError(), label: 'new RangeError()' },
    { value: 'error', label: "'error'" },
    { value: { message: 'error' }, label: "{ message: 'error' }" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isError Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is an Error object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isError(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isError(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

