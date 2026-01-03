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
function StartOfDayExample() {
  const baseDate = new Date('2024-01-15T14:30:45.123Z');
  const startDate = startOfDay(baseDate);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date StartOfDay Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Date:</strong> {format(baseDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          <strong>Start of Day (00:00):</strong> {format(startDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </div>
  );
}
```
