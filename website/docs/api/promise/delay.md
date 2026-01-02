---
id: delay
title: delay
description: 'Returns a promise that resolves after a specified delay with an optional value.'
---

# `delay`

Returns a promise that resolves after a specified delay with an optional value.

## Parameters

| Parameter | Type  | Description                                               |
| --------- | ----- | --------------------------------------------------------- |
| `ms`      | `any` | - The number of milliseconds to delay                     |
| `value`   | `any` | - The optional value to resolve with (default: undefined) |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves after the delay

## Examples

```typescript
* await delay(1000); // Waits 1 second
 *
 *
```

```typescript
* const result = await delay(500, 'Hello');
 * console.log(result); // 'Hello' after 500ms
```

## Interactive Example

```tsx live
function delayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`delay` Example</h4>
      <p>Returns a promise that resolves after a specified delay with an optional value.</p>
    </div>
  );
}
```
