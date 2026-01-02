---
id: diffMonths
title: diffMonths
description: 'Calculates the number of months between two dates.'
---

# `diffMonths`

Calculates the number of months between two dates.

## 参数

| 参数    | 类型  | 描述              |
| ------- | ----- | ----------------- |
| `date1` | `any` | - The first date  |
| `date2` | `any` | - The second date |

## 返回值

- **类型**: `any`
- **描述**: The number of months between the two dates (positive if date1 > date2)

## 示例

```typescript
* diffMonths(new Date('2024-04-15'), new Date('2024-01-15')) // => 3
 * diffMonths(new Date('2024-01-15'), new Date('2024-04-15')) // => -3
```

## 交互式示例

```tsx live
function diffMonthsExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`diffMonths` Example</h4>
      <p>Calculates the number of months between two dates.</p>
    </div>
  );
}
```
