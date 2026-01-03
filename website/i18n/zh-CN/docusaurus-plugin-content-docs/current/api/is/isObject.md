---
id: isObject
title: isObject
description: "Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))"
---

# `isObject`

Checks if value is the language type of Object.
(e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is an object, else false

## 示例

```typescript
* isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * isObject(undefined) // => false
 * isObject('abc') // => false
```

## 交互式示例

```tsx live
function IsObjectExample() {
  const [testValues] = useState([
    { value: {}, label: '{}' },
    { value, label: '[1, 2, 3]' },
    { value: () => {}, label: '() => {}' },
    { value, label: 'null' },
    { value, label: 'undefined' },
    { value: 'abc', label: "'abc'" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isObject Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is the language type of Object (arrays, functions, objects, etc.).
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
                  backgroundColor: isObject(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isObject(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
