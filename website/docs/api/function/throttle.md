---
id: throttle
title: throttle
description: 'Creates a throttled function that only invokes func at most once per every wait milliseconds.'
---

# `throttle`

Creates a throttled function that only invokes func at most once per every wait milliseconds.

## Parameters

| Parameter | Type  | Description                                                                      |
| --------- | ----- | -------------------------------------------------------------------------------- |
| `func`    | `any` | - The function to throttle                                                       |
| `wait`    | `any` | - The number of milliseconds to throttle invocations to (default: 0)             |
| `options` | `any` | - The options object                                                             |
| `options` | `any` | .leading - Specify invoking on the leading edge of the timeout (default: true)   |
| `options` | `any` | .trailing - Specify invoking on the trailing edge of the timeout (default: true) |

## Returns

- **Type**: `any`
- **Description**: Returns the new throttled function

## Examples

```typescript
* const throttled = throttle(() => console.log('Hello'), 1000);
 * throttled(); // Logs 'Hello' immediately
 * throttled(); // Ignored
 * // After 1 second, next call will be allowed
 *
 *
```

```typescript
* // Without leading edge
 * const throttled = throttle(() => console.log('Hello'), 1000, { leading: false });
 * throttled(); // Waits 1 second before logging 'Hello'
```

## Interactive Example

```tsx live
function throttleExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`throttle` Example</h4>
      <p>Creates a throttled function that only invokes func at most once per every wait milliseconds.</p>
    </div>
  );
}
```
