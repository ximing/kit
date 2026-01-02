---
id: mergeDeep
title: mergeDeep
description: "Recursively merges source objects into target object (deep merge)"
---

# `mergeDeep`

Recursively merges source objects into target object (deep merge)

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `target` | `any` | - The target object |
| `sources` | `any` | - The source objects |

## 返回值

- **类型**: `any`
- **描述**: Returns the target object

## 示例

```typescript
* const obj1 = { a: 1, b: { c: 2, d: 3 } };
 * const obj2 = { b: { d: 4, e: 5 }, f: 6 };
 * mergeDeep(obj1, obj2); // { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
```

## 交互式示例

```tsx live
function MergeDeepExample() {
  const [obj1] = useState({ a, b: { c, d: 3 } });
  const [obj2] = useState({ b: { d, e: 5 }, f: 6 });
  const [result] = useState(() => mergeDeep({ ...obj1 }, obj2));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>mergeDeep Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Recursively merges source objects into a target object (deep merge). Nested objects are merged recursively.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Object 1:</strong> {JSON.stringify(obj1)}
        </p>
        <p>
          <strong>Object 2:</strong> {JSON.stringify(obj2)}
        </p>
        <p style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <strong>Deep Merged Result:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note, nested objects are merged recursively. The property 'c' from obj1.b is preserved,
          while 'd' is updated and 'e' is added.
        </p>
      </div>
    </div>
  );
}
```

