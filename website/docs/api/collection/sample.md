---
id: sample
title: sample
description: 'Gets a random element from collection'
---

# `sample`

Gets a random element from collection

## Parameters

| Parameter    | Type  | Description                |
| ------------ | ----- | -------------------------- |
| `collection` | `any` | - The collection to sample |

## Returns

- **Type**: `any`
- **Description**: Returns the random element

## Examples

```typescript
* const arr = [1, 2, 3, 4, 5];
 * sample(arr); // => random element from arr
```

## Interactive Example

```tsx live
function sampleExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`sample` Example</h4>
      <p>Gets a random element from collection</p>
    </div>
  );
}
```
