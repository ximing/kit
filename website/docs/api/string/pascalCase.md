---
id: pascalCase
title: pascalCase
description: 'Converts string to pascal case.'
---

# `pascalCase`

Converts string to pascal case.

## Parameters

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `str`     | `any` | - The string to convert |

## Returns

- **Type**: `any`
- **Description**: The pascal cased string

## Examples

```typescript
* pascalCase('foo bar') // => 'FooBar'
 * pascalCase('--foo-bar--') // => 'FooBar'
 * pascalCase('foo_bar') // => 'FooBar'
```

## Interactive Example

```tsx live
function pascalCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`pascalCase` Example</h4>
      <p>Converts string to pascal case.</p>
    </div>
  );
}
```
