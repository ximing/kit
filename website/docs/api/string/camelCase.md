---
id: camelCase
title: camelCase
description: 'Converts string to camel case.'
---

# `camelCase`

Converts string to camel case.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `str`     | `any` | - The string to convert |

## Returns

- **Type**: `any`
- **Description**: The camel cased string

## Examples

```typescript
* camelCase('Foo Bar') // => 'fooBar'
 * camelCase('--foo-bar--') // => 'fooBar'
 * camelCase('foo_bar') // => 'fooBar'
```

## Interactive Example

```tsx live
function camelCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`camelCase` Example</h4>
      <p>Converts string to camel case.</p>
    </div>
  );
}
```
