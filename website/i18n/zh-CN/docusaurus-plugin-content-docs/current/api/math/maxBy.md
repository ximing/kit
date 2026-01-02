---
id: maxBy
title: maxBy
description: "This method is like max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value)."
---

# `maxBy`

This method is like max except that it accepts iteratee which is invoked for each element
in array to generate the criterion by which the value is ranked.
The iteratee is invoked with one argument: (value).

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `array` | `any` | - The array to iterate over |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the maximum value

## 示例

```typescript
* maxBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 3 }
 * maxBy([], (o) => o.n) // => undefined
```

## 交互式示例

```tsx live
function MaxByExample() {
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

  const result = maxBy(students, iterateeMap[selectBy]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math MaxBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Find student with maximum: </label>
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
          <strong>Student with maximum {selectBy}:</strong>
        </p>
        <pre style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

