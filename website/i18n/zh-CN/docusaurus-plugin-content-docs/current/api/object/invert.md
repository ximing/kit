---
id: invert
title: invert
description: 'Creates an object composed of the inverted keys and values of object'
---

# `invert`

Creates an object composed of the inverted keys and values of object

## 参数

| 参数  | 类型  | 描述                   |
| ----- | ----- | ---------------------- |
| `obj` | `any` | - The object to invert |

## 返回值

- **类型**: `any`
- **描述**: Returns the new inverted object

## 示例

```typescript
* invert({ a: 1, b: 2, c: 1 }); // { '1': 'c', '2': 'b' }
```

## 交互式示例

```tsx live
function InvertExample() {
  const [obj] = useState({ a, b, c: 1 });
  const [result] = useState(() => invert(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>invert Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an object with keys and values swapped. Keys become values and values become keys.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Inverted Object:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note, the last one wins (e.g., both 'a' and 'c' have value 1, so '1' maps to 'c').
        </p>
      </div>
    </div>
  );
}
```
