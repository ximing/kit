---
id: isDate
title: isDate
description: "Checks if value is a Date object."
---

# `isDate`

Checks if value is a Date object.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a Date object, else false

## 示例

```typescript
* isDate(new Date()) // => true
 * isDate(Date.now()) // => false
 * isDate('2023-01-01') // => false
```

## 交互式示例

```tsx live
function IsDateExample() {
  const [testValues] = useState([
    { value: new Date(), label: 'new Date()' },
    { value: Date.now(), label: 'Date.now()' },
    { value: '2023-01-01', label: "'2023-01-01'" },
    { value: new Date('2023-01-01'), label: "new Date('2023-01-01')" },
    { value: {}, label: '{}' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isDate Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a Date object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isDate(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isDate(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

