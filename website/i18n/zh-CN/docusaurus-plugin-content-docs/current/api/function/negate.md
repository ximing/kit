---
id: negate
title: negate
description: 'Creates a function that negates the result of the predicate func.'
---

# `negate`

Creates a function that negates the result of the predicate func.

## 参数

| 参数        | 类型  | 描述                      |
| ----------- | ----- | ------------------------- |
| `predicate` | `any` | - The predicate to negate |

## 返回值

- **类型**: `any`
- **描述**: Returns the new negated function

## 示例

```typescript
* const isEven = (n: number) => n % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(3); // => true
 * isOdd(4); // => false
 *
 *
```

```typescript
* const users = [
 *   { name: 'Alice', active: true },
 *   { name: 'Bob', active: false }
 * ];
 * const isActive = (user: typeof users[0]) => user.active;
 * users.filter(negate(isActive)); // => [{ name: 'Bob', active: false }]
```

## 交互式示例

```tsx live
function NegateExample() {
  const [testNumber, setTestNumber] = useState(4);

  // Define a predicate function
  const isEven = (n) => n % 2 === 0;

  // Negate the predicate
  const isOdd = negate(isEven);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const oddNumbers = numbers.filter(isOdd);
  const evenNumbers = numbers.filter(isEven);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Negate Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Test Number: </label>
        <input
          type="number"
          value={testNumber}
          onChange={(e) => setTestNumber(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Predicate (isEven):</strong> isEven({testNumber}) = {isEven(testNumber).toString()}
        </p>
        <p>
          <strong>Negated Predicate (isOdd):</strong> isOdd({testNumber}) = {isOdd(testNumber).toString()}
        </p>
        <p>
          <strong>Even Numbers (1-10):</strong> {JSON.stringify(evenNumbers)}
        </p>
        <p>
          <strong>Odd Numbers (1-10):</strong> {JSON.stringify(oddNumbers)}
        </p>
      </div>
    </div>
  );
}
```
