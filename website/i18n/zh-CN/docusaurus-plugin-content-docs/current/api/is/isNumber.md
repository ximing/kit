---
id: isNumber
title: isNumber
description: 'Checks if value is classified as a Number primitive or object.'
---

# `isNumber`

Checks if value is classified as a Number primitive or object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a number, else false

## 示例

```typescript
* isNumber(3) // => true
 * isNumber(new Number(3)) // => true
 * isNumber(NaN) // => true
 * isNumber(Infinity) // => true
 * isNumber('3') // => false
```

## 交互式示例

```tsx live
function IsNumberExample() {
  const [testValues] = useState([
    { value, label: '3' },
    { value: new Number(3), label: 'new Number(3)' },
    { value, label: 'NaN' },
    { value, label: 'Infinity' },
    { value: '3', label: "'3'" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isNumber Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a Number primitive or object.
      </p>
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
                  backgroundColor: isNumber(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isNumber(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
