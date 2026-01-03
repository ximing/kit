---
id: isWeakMap
title: isWeakMap
description: 'Checks if value is a WeakMap object.'
---

# `isWeakMap`

Checks if value is a WeakMap object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a WeakMap object, else false

## 示例

```typescript
* isWeakMap(new WeakMap()) // => true
 * isWeakMap(new Map()) // => false
 * isWeakMap({}) // => false
```

## 交互式示例

```tsx live
function IsWeakMapExample() {
  const [testValues] = useState([
    { value: new WeakMap(), label: 'new WeakMap()' },
    { value: new Map(), label: 'new Map()' },
    { value: {}, label: '{}' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isWeakMap Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Checks if a value is a WeakMap object.</p>
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
                  backgroundColor: isWeakMap(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isWeakMap(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
