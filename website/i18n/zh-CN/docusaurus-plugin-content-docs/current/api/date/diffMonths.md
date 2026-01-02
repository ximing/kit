---
id: diffMonths
title: diffMonths
description: "Calculates the number of months between two dates."
---

# `diffMonths`

Calculates the number of months between two dates.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `date1` | `any` | - The first date |
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
function DiffMonthsExample() {
  const date1 = new Date('2024-04-15');
  const date2 = new Date('2024-01-15');
  const result = diffMonths(date1, date2);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date DiffMonths Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Date 1:</strong> {format(date1, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Date 2:</strong> {format(date2, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Months Difference (Date1 - Date2):</strong> {result} months
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          (Positive means Date 1 is later than Date 2)
        </p>
      </div>
    </div>
  );
}
```

