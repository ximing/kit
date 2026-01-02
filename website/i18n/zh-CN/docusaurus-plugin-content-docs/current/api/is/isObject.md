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
function isObjectExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isObject` Example</h4>
      <p>
        Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and
        new String(''))
      </p>
    </div>
  );
}
```
