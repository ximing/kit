---
id: template
title: template
description: 'Replaces template placeholders with values from the data object.'
---

# `template`

Replaces template placeholders with values from the data object.

## Parameters

| Parameter | Type  | Description                               |
| --------- | ----- | ----------------------------------------- |
| `str`     | `any` | - The template string                     |
| `data`    | `any` | - The data object with placeholder values |

## Returns

- **Type**: `any`
- **Description**: The template string with placeholders replaced

## Examples

```typescript
* template('Hello <%= name %>', { name: 'World' }) // => 'Hello World'
 * template('${name} is ${age} years old', { name: 'John', age: 30 }) // => 'John is 30 years old'
```

## Interactive Example

```tsx live
function templateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`template` Example</h4>
      <p>Replaces template placeholders with values from the data object.</p>
    </div>
  );
}
```
