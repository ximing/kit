---
id: isUndefined
title: isUndefined
description: "Checks if value is undefined."
---

# `isUndefined`

Checks if value is undefined.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is undefined, else false

## 示例

```typescript
* isUndefined(undefined) // => true
 * isUndefined(void 0) // => true
 * isUndefined(null) // => false
 * isUndefined(0) // => false
```

## 交互式示例

```tsx live
function IsUndefinedExample() {
  const [testValues] = useState([
    { value, label: 'undefined' },
    { value, label: 'void 0' },
    { value, label: 'null' },
    { value, label: '0' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isUndefined Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is undefined.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isUndefined(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isUndefined(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

