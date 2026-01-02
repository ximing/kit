---
id: addYears
title: addYears
description: "Adds the specified number of years to the given date."
---

# `addYears`

Adds the specified number of years to the given date.

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `date` | `any` | - The date to modify |
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
function AddYearsExample() {
  const [yearsToAdd, setYearsToAdd] = useState(1);
  
  const baseDate = new Date('2024-01-15');
  const resultDate = addYears(baseDate, yearsToAdd);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date AddYears Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Years to add: </label>
        <input
          type="number"
          value={yearsToAdd}
          onChange={(e) => setYearsToAdd(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Base Date:</strong> {format(baseDate, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Years to Add:</strong> {yearsToAdd}
        </p>
        <p>
          <strong>Result Date:</strong> {format(resultDate, 'YYYY-MM-DD')}
        </p>
      </div>
    </div>
  );
}
```

