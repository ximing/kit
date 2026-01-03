---
id: delay
title: delay
description: 'Returns a promise that resolves after a specified delay with an optional value'
---

# `delay`

Returns a promise that resolves after a specified delay with an optional value. This is a simple yet useful utility for delaying operations, implementing timeouts, and controlling execution timing.

## Syntax

```typescript
function delay<T = void>(ms: number, value?: T): Promise<T | void>;
```

## Parameters

| Parameter | Type     | Required | Default     | Description                         |
| --------- | -------- | -------- | ----------- | ----------------------------------- |
| `ms`      | `number` | ✅       | -           | The number of milliseconds to delay |
| `value`   | `T`      | ❌       | `undefined` | The optional value to resolve with  |

## Return Value

- **Type**: `Promise<T | void>`
- **Description**: Returns a promise that resolves after the specified delay. If a value is provided, the promise resolves with that value; otherwise, it resolves with `undefined`.

## Examples

### Basic Usage

```typescript
import { delay } from '@rabjs/kit';

// Example 1: Simple delay
await delay(1000);
console.log('1 second has passed');

// Example 2: Delay with return value
const message = await delay(500, 'Hello');
console.log(message); // 'Hello' after 500ms

// Example 3: Using delay in a loop
for (let i = 0; i < 3; i++) {
  console.log(`Step ${i}`);
  await delay(1000);
}
```

### Advanced Usage

```typescript
// Example 4: Retry with exponential backoff using delay
async function retryWithBackoff(fn, maxAttempts = 3) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
}

// Example 5: Debounce implementation using delay
function debounce(fn, wait) {
  let timeout;
  return async function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

// Example 6: Throttle implementation
function throttle(fn, limit) {
  let inThrottle;
  return async function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      await delay(limit);
      inThrottle = false;
    }
  };
}
```

### Real-world Application Scenarios

```typescript
// Example 7: Rate-limited API calls
async function fetchWithRateLimit(urls: string[], delayMs: number = 1000) {
  const results = [];
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    results.push(data);
    await delay(delayMs);
  }
  return results;
}

// Example 8: Polling with delay
async function pollUntilSuccess(checkFn, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await checkFn();
    if (result.success) return result;
    if (i < maxAttempts - 1) {
      await delay(1000);
    }
  }
  throw new Error('Polling failed');
}

// Example 9: Gradual task execution
async function executeTasksGradually(tasks: Array<() => Promise<any>>, delayMs: number = 500) {
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
    if (tasks.indexOf(task) < tasks.length - 1) {
      await delay(delayMs);
    }
  }
  return results;
}

// Example 10: Simulate processing time
async function simulateProcessing(data: any, processingTime: number = 1000) {
  console.log('Processing started...');
  await delay(processingTime);
  console.log('Processing completed!');
  return {
    ...data,
    processedAt: new Date(),
    processingTime,
  };
}

// Example 11: Animation-like sequential updates
async function animatedUpdate(element: HTMLElement, updates: string[], delayMs: number = 500) {
  for (const update of updates) {
    element.textContent = update;
    await delay(delayMs);
  }
}

// Example 12: Delayed initialization
async function initializeWithDelay(services: any[], delayBetween: number = 100) {
  const initialized = [];
  for (const service of services) {
    await service.init();
    initialized.push(service);
    await delay(delayBetween);
  }
  return initialized;
}
```

## Interactive Example

```tsx live
function DelayExample() {
  const [delayMs, setDelayMs] = React.useState(2000);
  const [value, setValue] = React.useState('Hello');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleDelay = async () => {
    setLoading(true);
    setResult(null);

    try {
      const startTime = Date.now();
      const result = await delay(delayMs, value);
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        value: result,
        duration,
        expectedDuration: delayMs,
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>delay Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Delay (ms): </label>
          <input
            type="number"
            value={delayMs}
            onChange={(e) => setDelayMs(Math.max(0, Number(e.target.value)))}
            min="0"
            step="100"
            style={{ width: '100px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{delayMs}ms</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Return Value: </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '150px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
      </div>
      <button
        onClick={handleDelay}
        disabled={loading}
        style={{
          padding: '8px 16px',
          background: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? `Waiting ${delayMs}ms...` : 'Start Delay'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Returned Value:</strong>
                <div style={{ marginTop: '5px', padding: '8px', background: '#f9f9f9', borderRadius: '4px' }}>
                  {result.value === undefined ? '(undefined)' : result.value}
                </div>
              </div>
              <div>
                <strong>Timing:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>Expected: {result.expectedDuration}ms</div>
                  <div>Actual: {result.duration}ms</div>
                  <div style={{ color: result.duration >= result.expectedDuration ? 'green' : 'orange' }}>
                    Difference: {result.duration - result.expectedDuration}ms
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ color: 'red' }}>Error: {result.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
```

## Notes

- ⚠️ **Timing Accuracy**: JavaScript timers are not perfectly accurate; actual delay may vary slightly
- 💡 **Performance Tip**: Use delay for rate limiting and sequential operations to avoid overwhelming systems
- 🔒 **Cancellation**: The delay cannot be cancelled once started; use `AbortController` with timeout for cancellation
- 📚 **Best Practice**: Use delay sparingly; prefer event-driven or callback-based approaches when possible
- ⚠️ **Memory**: Each delay creates a timer; excessive delays can accumulate in memory

## Related Functions

- [`timeout`](./timeout) - Add timeout control to promises
- [`retry`](./retry) - Retry operations with exponential backoff
- [`parallel`](./parallel) - Execute multiple promises concurrently
- [`series`](./series) - Execute tasks sequentially

## Version History

- **v1.0.0** - Initial version
