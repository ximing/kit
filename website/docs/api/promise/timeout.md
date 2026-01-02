---
id: timeout
title: timeout
description: "Returns a promise that rejects if the given promise doesn't settle within the specified time."
---

# `timeout`

Returns a promise that rejects if the given promise doesn't settle within the specified time.

## Parameters

| Parameter | Type  | Description                                                                 |
| --------- | ----- | --------------------------------------------------------------------------- |
| `promise` | `any` | - The promise to wrap with a timeout                                        |
| `ms`      | `any` | - The timeout in milliseconds                                               |
| `message` | `any` | - The error message to use when timeout occurs (default: 'Promise timeout') |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves or rejects based on the original promise or timeout

## Examples

```typescript
* try {
 *   const result = await timeout(fetchData(), 5000);
 * } catch (error) {
 *   console.log(error.message); // 'Promise timeout'
 * }
 *
 *
```

```typescript
* const result = await timeout(fetchData(), 5000, 'Request took too long');
```

## Interactive Example

```tsx live
function timeoutExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`timeout` Example</h4>
      <p>Returns a promise that rejects if the given promise doesn't settle within the specified time.</p>
    </div>
  );
}
```
