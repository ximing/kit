---
id: uniq
title: uniq
description: 'Removes duplicate values from an array'
---

# `uniq`

Removes duplicate values from an array

## Parameters

| Parameter | Type  | Description              |
| --------- | ----- | ------------------------ |
| `array`   | `any` | The array to deduplicate |

## Returns

- **Type**: `any`
- **Description**: A new array with duplicate values removed

## Examples

```typescript
* uniq([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * uniq(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']
```

## Interactive Example

```tsx live
function uniqExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`uniq` Example</h4>
      <p>Removes duplicate values from an array</p>
    </div>
  );
}
```
