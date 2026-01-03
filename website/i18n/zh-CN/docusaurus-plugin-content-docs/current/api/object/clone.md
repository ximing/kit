---
id: clone
title: clone
description: 'Creates a shallow copy of value'
---

# `clone`

Creates a shallow copy of value

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to clone |

## 返回值

- **类型**: `any`
- **描述**: Returns the cloned value

## 示例

```typescript
* const obj = { a: 1, b: { c: 2 } };
 * const cloned = clone(obj);
 * cloned.a = 10;
 * console.log(obj.a); // 1
 * console.log(cloned.b === obj.b); // true (shallow copy)
```

## 交互式示例

```tsx live
function CloneExample() {
  const [originalObj] = useState({ a, b: { c: 2 } });
  const [clonedObj] = useState(() => clone(originalObj));
  const [modifiedValue, setModifiedValue] = useState(1);

  const handleModifyClone = () => {
    clonedObj.a = modifiedValue;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>clone Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a shallow copy of an object. Modifying the cloned object does not affect the original.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>New value for cloned.a: </label>
        <input
          type="number"
          value={modifiedValue}
          onChange={(e) => setModifiedValue(Number(e.target.value))}
          style={{ padding: '5px', width: '80px' }}
        />
        <button
          onClick={handleModifyClone}
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
          Modify Clone
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Original Object:</strong> {JSON.stringify(originalObj)}
        </p>
        <p>
          <strong>Cloned Object:</strong> {JSON.stringify(clonedObj)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note: Nested objects are shared (shallow copy). Modifying clonedObj.a changes the clone, but originalObj.a
          remains unchanged.
        </p>
      </div>
    </div>
  );
}
```
