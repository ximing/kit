---
id: debounce
title: debounce
description: "Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked."
---

# `debounce`

Creates a debounced function that delays invoking func until after wait milliseconds
have elapsed since the last time the debounced function was invoked.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `func` | `any` | - The function to debounce |
| `wait` | `any` | - The number of milliseconds to delay (default: 0) |
| `options` | `any` | - The options object |
| `options` | `any` | .leading - Specify invoking on the leading edge of the timeout (default: false) |
| `options` | `any` | .trailing - Specify invoking on the trailing edge of the timeout (default: true) |
| `options` | `any` | .maxWait - The maximum time func is allowed to be delayed before it's invoked |

## Returns

- **Type**: `any`
- **Description**: Returns the new debounced function

## Examples

```typescript
* const debounced = debounce(() => console.log('Hello'), 1000);
 * debounced(); // Will log 'Hello' after 1 second
 * debounced(); // Resets the timer
 *
 *
```

```typescript
* // With leading option
 * const debounced = debounce(() => console.log('Hello'), 1000, { leading: true });
 * debounced(); // Logs 'Hello' immediately, then waits 1 second before allowing next call
```

## Interactive Example

```tsx live
function DebounceExample() {
  const [count, setCount] = useState(0);
  const [callCount, setCallCount] = useState(0);
  const [lastCallTime, setLastCallTime] = useState<string | null>(null);
  const [wait, setWait] = useState(500);

  // Create a debounced function
  const debouncedFn = React.useMemo(() => {
    return debounce(
      () => {
        setCount((c) => c + 1);
        setLastCallTime(new Date().toLocaleTimeString());
      },
      wait,
      { leading, trailing: true }
    );
  }, [wait]);

  const handleClick = () => {
    setCallCount((c) => c + 1);
    debouncedFn();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Debounce Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Wait (ms): </label>
        <input
          type="number"
          min="100"
          step="100"
          value={wait}
          onChange={(e) => setWait(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Click (Debounced)
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Total Clicks:</strong> {callCount}
        </p>
        <p>
          <strong>Executed Count:</strong> {count}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Try clicking multiple times quickly, the function will only execute once after you stop clicking for {wait}ms
        </p>
        {lastCallTime && (
          <p>
            <strong>Last Executed:</strong> {lastCallTime}
          </p>
        )}
      </div>
    </div>
  );
}
```

