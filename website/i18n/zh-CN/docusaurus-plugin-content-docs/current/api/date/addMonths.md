---
id: addMonths
title: addMonths
description: "Adds the specified number of months to the given date."
---

# `addMonths`

Adds the specified number of months to the given date.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `date` | `any` | - The date to modify |
| `amount` | `any` | - The number of months to add (can be negative) |

## 返回值

- **类型**: `any`
- **描述**: A new Date object with the months added

## 示例

```typescript
* addMonths(new Date('2024-01-15'), 3) // => Date object for 2024-04-15
 * addMonths(new Date('2024-01-15'), -2) // => Date object for 2023-11-15
```

## 交互式示例

```tsx live
function AddMonthsExample() {
  const [monthsToAdd, setMonthsToAdd] = useState(3);
  
  const baseDate = new Date('2024-01-15');
  const resultDate = addMonths(baseDate, monthsToAdd);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date AddMonths Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Months to add: </label>
        <input
          type="number"
          value={monthsToAdd}
          onChange={(e) => setMonthsToAdd(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Base Date:</strong> {format(baseDate, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Months to Add:</strong> {monthsToAdd}
        </p>
        <p>
          <strong>Result Date:</strong> {format(resultDate, 'YYYY-MM-DD')}
        </p>
      </div>
    </div>
  );
}
```

