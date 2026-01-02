---
id: isPlainObject
title: isPlainObject
description: 'Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null.'
---

# `isPlainObject`

Checks if value is a plain object, that is, an object created by the Object constructor
or one with a [[Prototype]] of null.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
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
function isPlainObjectExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isPlainObject` Example</h4>
      <p>
        Checks if value is a plain object, that is, an object created by the Object constructor or one with a
        [[Prototype]] of null.
      </p>
    </div>
  );
}
```
