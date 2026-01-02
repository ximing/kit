---
id: kebabCase
title: kebabCase
description: 'Converts string to kebab case.'
---

# `kebabCase`

Converts string to kebab case.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `str`     | `any` | - The string to convert |

## Returns

- **Type**: `any`
- **Description**: The kebab cased string

## Examples

```typescript
* kebabCase('Foo Bar') // => 'foo-bar'
 * kebabCase('fooBar') // => 'foo-bar'
 * kebabCase('foo_bar') // => 'foo-bar'
```

## Interactive Example

```tsx live
function kebabCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`kebabCase` Example</h4>
      <p>Converts string to kebab case.</p>
    </div>
  );
}
```
