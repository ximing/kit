---
id: isSymbol
title: isSymbol
description: 'Checks if value is classified as a Symbol primitive or object.'
---

# `isSymbol`

Checks if value is classified as a Symbol primitive or object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a symbol, else false

## 示例

```typescript
* isSymbol(Symbol('test')) // => true
 * isSymbol(Symbol.iterator) // => true
 * isSymbol('test') // => false
 * isSymbol({}) // => false
```

## 交互式示例

```tsx live
function isSymbolExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isSymbol` Example</h4>
      <p>Checks if value is classified as a Symbol primitive or object.</p>
    </div>
  );
}
```
