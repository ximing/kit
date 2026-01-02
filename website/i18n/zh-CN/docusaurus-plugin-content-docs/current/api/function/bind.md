---
id: bind
title: bind
description: 'Creates a function that invokes func with the this binding of thisArg and partialArgs prepended to the arguments it receives.'
---

# `bind`

Creates a function that invokes func with the this binding of thisArg and
partialArgs prepended to the arguments it receives.

## 参数

| 参数          | 类型  | 描述                                    |
| ------------- | ----- | --------------------------------------- |
| `func`        | `any` | - The function to bind                  |
| `thisArg`     | `any` | - The this binding of func              |
| `partialArgs` | `any` | - The arguments to be partially applied |

## 返回值

- **类型**: `any`
- **描述**: Returns the new bound function

## 示例

```typescript
* const obj = {
 *   name: 'Alice',
 *   greet(greeting: string) {
 *     return `${greeting}, ${this.name}!`;
 *   }
 * };
 * const boundGreet = bind(obj.greet, obj, 'Hello');
 * boundGreet(); // => 'Hello, Alice!'
 *
 *
```

```typescript
* function add(this: { base: number }, a: number, b: number) {
 *   return this.base + a + b;
 * }
 * const obj = { base: 10 };
 * const boundAdd = bind(add, obj, 5);
 * boundAdd(3); // => 18
```

## 交互式示例

```tsx live
function bindExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`bind` Example</h4>
      <p>
        Creates a function that invokes func with the this binding of thisArg and partialArgs prepended to the arguments
        it receives.
      </p>
    </div>
  );
}
```
