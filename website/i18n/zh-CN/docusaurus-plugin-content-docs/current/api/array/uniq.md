---
id: uniq
title: uniq
description: 'Removes duplicate values from an array'
---

# `uniq`

Removes duplicate values from an array

## 参数

| 参数    | 类型  | 描述                     |
| ------- | ----- | ------------------------ |
| `array` | `any` | The array to deduplicate |

## 返回值

- **类型**: `any`
- **描述**: A new array with duplicate values removed

## 示例

```typescript
* uniq([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * uniq(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']
```

## 交互式示例

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
