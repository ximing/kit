---
id: addYears
title: addYears
description: 'Adds the specified number of years to the given date.'
---

# `addYears`

Adds the specified number of years to the given date.

## 参数

| 参数     | 类型  | 描述                                           |
| -------- | ----- | ---------------------------------------------- |
| `date`   | `any` | - The date to modify                           |
| `amount` | `any` | - The number of years to add (can be negative) |

## 返回值

- **类型**: `any`
- **描述**: A new Date object with the years added

## 示例

```typescript
* addYears(new Date('2024-01-15'), 1) // => Date object for 2025-01-15
 * addYears(new Date('2024-01-15'), -2) // => Date object for 2022-01-15
```

## 交互式示例

```tsx live
function addYearsExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`addYears` Example</h4>
      <p>Adds the specified number of years to the given date.</p>
    </div>
  );
}
```
