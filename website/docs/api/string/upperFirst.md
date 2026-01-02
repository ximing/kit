---
id: upperFirst
title: upperFirst
description: 'Converts the first character of string to upper case.'
---

# `upperFirst`

Converts the first character of string to upper case.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `str`     | `any` | - The string to convert |

## Returns

- **Type**: `any`
- **Description**: The string with first character upper cased

## Examples

```typescript
* upperFirst('fred') // => 'Fred'
 * upperFirst('FRED') // => 'FRED'
```

## Interactive Example

```tsx live
function upperFirstExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`upperFirst` Example</h4>
      <p>Converts the first character of string to upper case.</p>
    </div>
  );
}
```
