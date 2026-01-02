---
id: meanBy
title: meanBy
description: "This method is like mean except that it accepts iteratee which is invoked for each element in array to generate the value to be averaged. The iteratee is invoked with one argument: (value)."
---

# `meanBy`

This method is like mean except that it accepts iteratee which is invoked for each element
in array to generate the value to be averaged.
The iteratee is invoked with one argument: (value).

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `array` | `any` | - The array to iterate over |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the mean

## 示例

```typescript
* meanBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 2
 * meanBy([], (o) => o.n) // => 0
```

## 交互式示例

```tsx live
function MeanByExample() {
  const [selectBy, setSelectBy] = useState('score');

  const students = [
    { name: 'Alice', age, score: 85 },
    { name: 'Bob', age, score: 92 },
    { name: 'Charlie', age, score: 78 },
    { name: 'David', age, score: 95 },
    { name: 'Eve', age, score: 88 }
  ];

  const iterateeMap, (student) => number> = {
    age: (student) => student.age,
    score: (student) => student.score
  };

  const result = meanBy(students, iterateeMap[selectBy]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math MeanBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Calculate average: </label>
        <select
          value={selectBy}
          onChange={(e) => setSelectBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="age">Age</option>
          <option value="score">Score</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Students:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(students, null, 2)}
        </pre>
        <p>
          <strong>Average {selectBy}:</strong>{' '}
          <span style={{ fontSize: '18px', color: '#1976d2', fontWeight: 'bold' }}>
            {result.toFixed(2)}
          </span>
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          <em>
            {selectBy === 'age' 
              ? `Sum of ages: ${students.reduce((sum, s) => sum + s.age, 0)} ÷ ${students.length} students`
              : `Sum of scores: ${students.reduce((sum, s) => sum + s.score, 0)} ÷ ${students.length} students`}
          </em>
        </p>
      </div>
    </div>
  );
}
```

