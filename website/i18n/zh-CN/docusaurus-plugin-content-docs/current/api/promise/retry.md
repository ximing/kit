---
id: retry
title: retry
description: 'Retries a function until it succeeds or max attempts are reached.'
---

# `retry`

Retries a function until it succeeds or max attempts are reached.

## 参数

| 参数      | 类型  | 描述                                                                                |
| --------- | ----- | ----------------------------------------------------------------------------------- |
| `fn`      | `any` | - The function to retry (can be async or return a promise)                          |
| `options` | `any` | - The options object                                                                |
| `options` | `any` | .maxAttempts - Maximum number of attempts (default: 3)                              |
| `options` | `any` | .delay - Delay between attempts in milliseconds (default: 1000)                     |
| `options` | `any` | .backoff - Backoff multiplier for exponential backoff (default: 1, no backoff)      |
| `options` | `any` | .onRetry - Callback function called on each retry with the attempt number and error |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves with the function result or rejects with the last error

## 示例

```typescript
* const result = await retry(() => fetchData(), { maxAttempts: 5, delay: 1000 });
 *
 *
```

```typescript
* const result = await retry(() => fetchData(), {
 *   maxAttempts: 5,
 *   delay: 1000,
 *   backoff: 2, // exponential backoff
 *   onRetry: (attempt, error) => console.log(`Attempt ${attempt} failed: ${error.message}`)
 * });
```

## 交互式示例

```tsx live
function retryExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`retry` Example</h4>
      <p>Retries a function until it succeeds or max attempts are reached.</p>
    </div>
  );
}
```
