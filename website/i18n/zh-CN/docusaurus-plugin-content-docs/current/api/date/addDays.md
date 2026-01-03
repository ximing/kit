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
function AddDaysExample() {
  const [daysToAdd, setDaysToAdd] = useState(5);

  const baseDate = new Date('2024-01-15');
  const resultDate = addDays(baseDate, daysToAdd);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date AddDays Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Days to add: </label>
        <input
          type="number"
          value={daysToAdd}
          onChange={(e) => setDaysToAdd(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Base Date:</strong> {format(baseDate, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Days to Add:</strong> {daysToAdd}
        </p>
        <p>
          <strong>Result Date:</strong> {format(resultDate, 'YYYY-MM-DD')}
        </p>
      </div>
    </div>
  );
}
```
