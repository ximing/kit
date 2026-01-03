---
id: isNil
title: isNil
description: 'Checks if value is null or undefined.'
---

# `isNil`

Checks if value is null or undefined.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is null or undefined, else false

## 示例

```typescript
* isNil(null) // => true
 * isNil(undefined) // => true
 * isNil(void 0) // => true
 * isNil(0) // => false
 * isNil('') // => false
```

## 交互式示例

```tsx live
function IsNilExample() {
  const [testValues] = useState([
    { value, label: 'null' },
    { value, label: 'undefined' },
    { value, label: 'void 0' },
    { value, label: '0' },
    { value: '', label: "'' (empty string)" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isNil Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Checks if a value is null or undefined.</p>
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
                  backgroundColor: isNil(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isNil(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
