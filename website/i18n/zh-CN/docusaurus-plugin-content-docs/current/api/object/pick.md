---
id: pick
title: pick
description: "Creates an object composed of the picked object properties"
---

# `pick`

Creates an object composed of the picked object properties

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `obj` | `any` | - The source object |
| `keys` | `any` | - The property keys to pick |

## 返回值

- **类型**: `any`
- **描述**: Returns the new object

## 示例

```typescript
* const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']); // { a: 1, c: 3 }
```

## 交互式示例

```tsx live
function PickExample() {
  const [obj] = useState({ a, b, c, d: 4 });
  const [keysToPick, setKeysToPick] = useState('a,c');
  const [result, setResult] = useState(() => pick(obj, ['a', 'c']));

  const handlePick = () => {
    const keys = keysToPick.split(',').map((k) => k.trim());
    setResult(pick(obj, keys));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>pick Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a new object with only the specified properties.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Keys to pick (comma-separated): </label>
        <input
          type="text"
          value={keysToPick}
          onChange={(e) => setKeysToPick(e.target.value)}
          style={{ padding: '5px', width: '150px' }}
          placeholder="e.g., a,c"
        />
        <button
          onClick={handlePick}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Pick Keys
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Original Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Keys to Pick:</strong> {keysToPick}
        </p>
        <p>
          <strong>Result:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}
```

