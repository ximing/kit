---
id: isPromise
title: isPromise
description: 'Checks if value is a Promise object.'
---

# `isPromise`

Checks if value is a Promise object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a Promise object, else false

## 示例

```typescript
* isPromise(Promise.resolve(1)) // => true
 * isPromise(new Promise(() => {})) // => true
 * isPromise(async () => {}) // => false
 * isPromise({ then: () => {} }) // => false
```

## 交互式示例

```tsx live
function isPromiseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isPromise` Example</h4>
      <p>Checks if value is a Promise object.</p>
    </div>
  );
}
```
