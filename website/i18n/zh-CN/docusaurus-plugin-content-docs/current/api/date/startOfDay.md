---
id: startOfDay
title: startOfDay
description: 'Returns a new Date object set to the start of the day (00:00:00.000).'
---

# `startOfDay`

Returns a new Date object set to the start of the day (00:00:00.000).

## 参数

| 参数   | 类型  | 描述                 |
| ------ | ----- | -------------------- |
| `date` | `any` | - The date to modify |

## 返回值

- **类型**: `any`
- **描述**: A new Date object set to the start of the day

## 示例

```typescript
* startOfDay(new Date('2024-01-15T14:30:45.123Z'))
 * // => Date object for 2024-01-15T00:00:00.000Z
```

## 交互式示例

```tsx live
function startOfDayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`startOfDay` Example</h4>
      <p>Returns a new Date object set to the start of the day (00:00:00.000).</p>
    </div>
  );
}
```
