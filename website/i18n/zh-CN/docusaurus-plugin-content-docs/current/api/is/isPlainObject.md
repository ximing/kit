---
id: isPlainObject
title: isPlainObject
description: "Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null."
---

# `isPlainObject`

Checks if value is a plain object, that is, an object created by the Object constructor
or one with a [[Prototype]] of null.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a plain object, else false

## 示例

```typescript
* isPlainObject({}) // => true
 * isPlainObject({ a: 1 }) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject([]) // => false
 * isPlainObject(() => {}) // => false
 * isPlainObject(new Date()) // => false
```

## 交互式示例

```tsx live
function IsPlainObjectExample() {
  const [testValues] = useState([
    { value: {}, label: '{}' },
    { value: { a: 1 }, label: '{ a: 1 }' },
    { value: Object.create(null), label: 'Object.create(null)' },
    { value, label: '[]' },
    { value: () => {}, label: '() => {}' },
    { value: new Date(), label: 'new Date()' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isPlainObject Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a plain object (created by Object constructor or with null prototype).
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isPlainObject(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isPlainObject(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

