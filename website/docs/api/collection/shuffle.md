---
id: shuffle
title: shuffle
description: 'Creates an array of shuffled values, using a version of the Fisher-Yates shuffle'
---

# `shuffle`

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle

## Parameters

| Parameter    | Type  | Description                 |
| ------------ | ----- | --------------------------- |
| `collection` | `any` | - The collection to shuffle |

## Returns

- **Type**: `any`
- **Description**: Returns the new shuffled array

## Examples

```typescript
* const arr = [1, 2, 3, 4, 5];
 * shuffle(arr); // => shuffled array
```

## Interactive Example

```tsx live
function shuffleExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`shuffle` Example</h4>
      <p>Creates an array of shuffled values, using a version of the Fisher-Yates shuffle</p>
    </div>
  );
}
```
