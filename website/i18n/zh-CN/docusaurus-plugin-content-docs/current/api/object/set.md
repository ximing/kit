---
id: set
title: set
description: "Sets the value at path of object. If a portion of path doesn't exist, it's created."
---

# `set`

Sets the value at path of object. If a portion of path doesn't exist, it's created.

## 参数

| 参数    | 类型  | 描述                                                       |
| ------- | ----- | ---------------------------------------------------------- |
| `obj`   | `any` | - The object to modify                                     |
| `path`  | `any` | - The path of the property to set (can be string or array) |
| `value` | `any` | - The value to set                                         |

## 返回值

- **类型**: `any`
- **描述**: Returns the object

## 示例

```typescript
* const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * set(obj, ['x', 'y', 'z'], 5);
 * set(obj, 'a.b.d[0]', 6);
```

## 交互式示例

```tsx live
function SetExample() {
  const [obj, setObj] = useState({ a: { b: { c: 3 } } });
  const [path, setPath] = useState('a.b.c');
  const [value, setValue] = useState('10');

  const handleSetValue = () => {
    const newObj = { ...obj };
    set(newObj, path, isNaN(Number(value)) ? value : Number(value));
    setObj(newObj);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>set Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Sets a value at a specific path in an object. Creates intermediate objects if they don't exist.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Path: </label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            style={{ padding: '5px', width: '150px' }}
            placeholder="e.g., a.b.c"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Value: </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ padding: '5px', width: '150px' }}
          />
        </div>
        <button
          onClick={handleSetValue}
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Set Value
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Current Object:</strong> {JSON.stringify(obj)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Try setting different paths like: 'a.b.c', 'x.y.z', 'a.b.d' to see how nested structures are created.
        </p>
      </div>
    </div>
  );
}
```
