---
id: addDays
title: addDays
description: 'Adds the specified number of days to the given date.'
---

# `addDays`

Adds the specified number of days to the given date.

## 参数

| 参数     | 类型  | 描述                                          |
| -------- | ----- | --------------------------------------------- |
| `date`   | `any` | - The date to modify                          |
| `amount` | `any` | - The number of days to add (can be negative) |

## 返回值

- **类型**: `any`
- **描述**: A new Date object with the days added

## 示例

```typescript
* addDays(new Date('2024-01-15'), 5) // => Date object for 2024-01-20
 * addDays(new Date('2024-01-15'), -3) // => Date object for 2024-01-12
```

## 交互式示例

```tsx live
function addDaysExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`addDays` Example</h4>
      <p>Adds the specified number of days to the given date.</p>
    </div>
  );
}
```
