---
id: isFunction
title: isFunction
description: 'Checks if value is classified as a Function object.'
---

# `isFunction`

Checks if value is classified as a Function object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a function, else false

## 示例

```typescript
* isFunction(() => {}) // => true
 * isFunction(function() {}) // => true
 * isFunction(class MyClass {}) // => true
 * isFunction({}) // => false
```

## 交互式示例

```tsx live
function isFunctionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isFunction` Example</h4>
      <p>Checks if value is classified as a Function object.</p>
    </div>
  );
}
```
