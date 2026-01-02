---
id: lowerFirst
title: lowerFirst
description: 'Converts the first character of string to lower case.'
---

# `lowerFirst`

Converts the first character of string to lower case.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `str`     | `any` | - The string to convert |

## Returns

- **Type**: `any`
- **Description**: The string with first character lower cased

## Examples

```typescript
* lowerFirst('Fred') // => 'fred'
 * lowerFirst('FRED') // => 'fRED'
```

## Interactive Example

```tsx live
function lowerFirstExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`lowerFirst` Example</h4>
      <p>Converts the first character of string to lower case.</p>
    </div>
  );
}
```
