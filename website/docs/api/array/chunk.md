---
id: chunk
title: chunk
description: 'Splits an array into chunks of a specified size'
---

# `chunk`

Splits an array into chunks of a specified size

## Parameters

| Parameter | Type  | Description            |
| --------- | ----- | ---------------------- |
| `array`   | `any` | The array to chunk     |
| `size`    | `any` | The size of each chunk |

## Returns

- **Type**: `any`
- **Description**: An array of chunks

## Examples

```typescript
* chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]
```

## Interactive Example

```tsx live
function chunkExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`chunk` Example</h4>
      <p>Splits an array into chunks of a specified size</p>
    </div>
  );
}
```
