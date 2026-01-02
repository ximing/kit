---
id: snakeCase
title: snakeCase
description: 'Converts string to snake case.'
---

# `snakeCase`

Converts string to snake case.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `str`     | `any` | - The string to convert |

## Returns

- **Type**: `any`
- **Description**: The snake cased string

## Examples

```typescript
* snakeCase('Foo Bar') // => 'foo_bar'
 * snakeCase('fooBar') // => 'foo_bar'
 * snakeCase('foo-bar') // => 'foo_bar'
```

## Interactive Example

```tsx live
function snakeCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`snakeCase` Example</h4>
      <p>Converts string to snake case.</p>
    </div>
  );
}
```
