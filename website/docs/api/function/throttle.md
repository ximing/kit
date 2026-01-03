---
id: throttle
title: throttle
description: 'Creates a throttled function that only invokes func at most once per every wait milliseconds'
---

# `throttle`

Creates a throttled function that only invokes func at most once per every wait milliseconds. Unlike debounce, throttle will execute the function at regular intervals. This is useful for controlling the rate of function execution during continuous high-frequency events like scrolling or mouse movement.

## Syntax

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait?: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  },
): T & { cancel: () => void; flush: () => void };
```

## Parameters

| Parameter          | Type                                | Required | Default | Description                                           |
| ------------------ | ----------------------------------- | -------- | ------- | ----------------------------------------------------- |
| `func`             | `T extends (...args: any[]) => any` | ✅       | -       | The function to throttle                              |
| `wait`             | `number`                            | ❌       | `0`     | The number of milliseconds to throttle invocations to |
| `options`          | `object`                            | ❌       | `{}`    | Configuration options                                 |
| `options.leading`  | `boolean`                           | ❌       | `true`  | Specify invoking on the leading edge of the timeout   |
| `options.trailing` | `boolean`                           | ❌       | `true`  | Specify invoking on the trailing edge of the timeout  |

## Returns

- **Type**: `T & { cancel: () => void; flush: () => void }`
- **Description**: A throttled function with `cancel()` and `flush()` methods. The `cancel()` method cancels pending invocations, and `flush()` immediately invokes the pending function.

## Examples

### Basic Usage

```typescript
import { throttle } from '@rabjs/kit';

// Example 1: Throttle scroll event
const handleScroll = throttle(() => {
  console.log('Scroll event detected');
}, 1000);

// Simulate rapid scroll events
handleScroll(); // Logs immediately (leading edge)
handleScroll(); // Ignored
handleScroll(); // Ignored
// After 1 second: logs again (trailing edge)

// Example 2: Throttle mouse move
const handleMouseMove = throttle((x: number, y: number) => {
  console.log(`Mouse position: ${x}, ${y}`);
}, 500);

handleMouseMove(100, 200); // Logs immediately
handleMouseMove(101, 201); // Ignored
handleMouseMove(102, 202); // Ignored
// After 500ms: logs with latest coordinates
```

### Advanced Usage

```typescript
// Example 3: Throttle without leading edge
const handleResize = throttle(
  () => {
    console.log('Window resized');
  },
  300,
  { leading: false, trailing: true },
);

handleResize(); // Waits 300ms before logging
handleResize(); // Ignored
// After 300ms: logs 'Window resized'

// Example 4: Using cancel and flush methods
const throttledClick = throttle(() => {
  console.log('Button clicked');
}, 2000);

throttledClick(); // Logs immediately
throttledClick(); // Ignored
throttledClick(); // Ignored

// Cancel pending invocation
throttledClick.cancel();
// No additional log

// Or flush to execute immediately
throttledClick();
throttledClick.flush(); // Logs immediately
```

### Real-World Application

```typescript
// Example 5: Infinite scroll with throttle
function InfiniteScroll() {
  let page = 1;

  const loadMoreContent = throttle(async () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when near bottom
    if (scrollTop + windowHeight >= documentHeight - 500) {
      console.log(`Loading page ${page}`);
      try {
        const response = await fetch(`/api/items?page=${page}`);
        const data = await response.json();
        page++;
        // Append data to DOM
        console.log('Loaded', data.length, 'items');
      } catch (error) {
        console.error('Failed to load more:', error);
      }
    }
  }, 1000); // Check at most once per second

  window.addEventListener('scroll', loadMoreContent);

  return {
    cleanup: () => {
      window.removeEventListener('scroll', loadMoreContent);
      loadMoreContent.cancel();
    },
  };
}

// Usage
const scroller = InfiniteScroll();
// ... later
scroller.cleanup();
```

## Interactive Example

```tsx live
function ThrottleExample() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [callCount, setCallCount] = React.useState(0);
  const [lastCallTime, setLastCallTime] = React.useState('Never');

  const handleMouseMove = React.useMemo(() => {
    return throttle((e) => {
      setPosition({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      setCallCount((prev) => prev + 1);
      setLastCallTime(new Date().toLocaleTimeString());
    }, 500);
  }, []);

  const containerRef = React.useRef(null);

  const handleMouseMoveEvent = (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
      handleMouseMove(e);
    }
  };

  const handleCancel = () => {
    handleMouseMove.cancel();
    setCallCount(0);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveEvent);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveEvent);
      handleMouseMove.cancel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '8px',
        minHeight: '200px',
        border: '2px dashed #ccc',
      }}
    >
      <h4>Throttle Interactive Example</h4>
      <p>Move your mouse in this box (throttled every 500ms):</p>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Current Position:</strong> X: {position.x}, Y: {position.y}
      </div>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Function Calls:</strong> {callCount}
      </div>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Last Called:</strong> {lastCallTime}
      </div>
      <button onClick={handleCancel} style={{ padding: '5px 10px' }}>
        Reset
      </button>
    </div>
  );
}
```

## Notes

- ⚠️ **Execution Frequency**: Unlike debounce, throttle guarantees execution at regular intervals. By default, it executes on both the leading and trailing edges.
- 💡 **Performance Tip**: Use throttle for continuous events like scroll, resize, or mouse movement to limit function execution rate while maintaining responsiveness.
- 🔒 **Leading vs Trailing**: Set `leading: false` to skip the first immediate call. Set `trailing: false` to skip the final call after the interval.
- 🐛 **Common Mistake**: Confusing throttle with debounce. Throttle executes periodically, debounce waits for inactivity.
- 📚 **Best Practice**: Always clean up event listeners and call `cancel()` when the component unmounts to prevent memory leaks.

## Related Functions

- [`debounce`](./debounce) - Delays execution until after wait time of inactivity
- [`once`](./once) - Restricts a function to execute only once
- [`memoize`](./memoize) - Caches function results based on arguments

## Version History

- **v0.0.1** - Initial version
