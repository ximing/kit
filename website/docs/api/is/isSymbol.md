---
id: isSymbol
title: isSymbol
description: 'Checks if value is classified as a Symbol primitive or object.'
---

# `isSymbol`

Checks if value is classified as a Symbol primitive or object.

## Parameters

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `value`   | `any` | - The value to check |

## Returns

- **Type**: `any`
- **Description**: Returns true if value is a symbol, else false

## Examples

```typescript
* isSymbol(Symbol('test')) // => true
 * isSymbol(Symbol.iterator) // => true
 * isSymbol('test') // => false
 * isSymbol({}) // => false
```

## Interactive Example

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
