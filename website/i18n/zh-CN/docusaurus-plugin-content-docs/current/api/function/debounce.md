---
id: debounce
title: debounce
description: 'Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.'
---

# `debounce`

Creates a debounced function that delays invoking func until after wait milliseconds
have elapsed since the last time the debounced function was invoked.

## 参数

| 参数      | 类型  | 描述                                                                             |
| --------- | ----- | -------------------------------------------------------------------------------- |
| `func`    | `any` | - The function to debounce                                                       |
| `wait`    | `any` | - The number of milliseconds to delay (default: 0)                               |
| `options` | `any` | - The options object                                                             |
| `options` | `any` | .leading - Specify invoking on the leading edge of the timeout (default: false)  |
| `options` | `any` | .trailing - Specify invoking on the trailing edge of the timeout (default: true) |
| `options` | `any` | .maxWait - The maximum time func is allowed to be delayed before it's invoked    |

## 返回值

- **类型**: `any`
- **描述**: Returns the new debounced function

## 示例

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

## 交互式示例

```tsx live
function debounceExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`debounce` Example</h4>
      <p>
        Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last
        time the debounced function was invoked.
      </p>
    </div>
  );
}
```
