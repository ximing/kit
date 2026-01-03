---
id: once
title: once
description: 'Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.'
---

# `once`

Creates a function that is restricted to invoking func once.
Repeat calls to the function return the value of the first invocation.

## 参数

| 参数   | 类型  | 描述                       |
| ------ | ----- | -------------------------- |
| `func` | `any` | - The function to restrict |

## 返回值

- **类型**: `any`
- **描述**: Returns the new restricted function

## 示例

```typescript
* let count = 0;
 * const initialize = once(() => ++count);
 * initialize(); // => 1
 * initialize(); // => 1
 * console.log(count); // => 1
 *
 *
```

```typescript
* const greet = once((name: string) => `Hello, ${name}!`);
 * greet('Alice'); // => 'Hello, Alice!'
 * greet('Bob'); // => 'Hello, Alice!' (returns cached result)
```

## 交互式示例

```tsx live
function OnceExample() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  // Create a function that increments count
  const increment = React.useMemo(() => {
    return once(() => {
      setCount((c) => c + 1);
    });
  }, []);

  const handleClick = () => {
    setClickCount((c) => c + 1);
    increment();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Once Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Click Me
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Total Clicks:</strong> {clickCount}
        </p>
        <p>
          <strong>Function Executed Count:</strong> {count}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          No matter how many times you click, the function will only execute once. All subsequent calls return the
          cached result.
        </p>
      </div>
    </div>
  );
}
```
