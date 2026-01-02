---
id: series
title: series
description: 'Executes multiple promises in series (one after another).'
---

# `series`

Executes multiple promises in series (one after another).

## 参数

| 参数    | 类型  | 描述                                         |
| ------- | ----- | -------------------------------------------- |
| `tasks` | `any` | - An array of functions that return promises |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves with an array of results in the same order as tasks

## 示例

```typescript
* const results = await series([
 *   () => fetchUser(1),
 *   () => fetchUser(2),
 *   () => fetchUser(3)
 * ]); // Executes one after another
 *
 *
```

```typescript
* const results = await series([
 *   () => delay(100, 'a'),
 *   () => delay(50, 'b'),
 *   () => delay(150, 'c')
 * ]); // Total time: 300ms
```

## 交互式示例

```tsx live
function seriesExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`series` Example</h4>
      <p>Executes multiple promises in series (one after another).</p>
    </div>
  );
}
```
