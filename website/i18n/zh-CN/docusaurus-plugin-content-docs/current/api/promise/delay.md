---
id: delay
title: delay
description: 'Returns a promise that resolves after a specified delay with an optional value.'
---

# `delay`

Returns a promise that resolves after a specified delay with an optional value.

## 参数

| 参数    | 类型  | 描述                                                      |
| ------- | ----- | --------------------------------------------------------- |
| `ms`    | `any` | - The number of milliseconds to delay                     |
| `value` | `any` | - The optional value to resolve with (default: undefined) |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves after the delay

## 示例

```typescript
* await delay(1000); // Waits 1 second
 *
 *
```

```typescript
* const result = await delay(500, 'Hello');
 * console.log(result); // 'Hello' after 500ms
```

## 交互式示例

```tsx live
function delayExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`delay` Example</h4>
      <p>Returns a promise that resolves after a specified delay with an optional value.</p>
    </div>
  );
}
```
