---
id: isFunction
title: isFunction
description: 'Checks if a value is a function'
---

# `isFunction`

检查一个值是否为函数。这包括普通函数、箭头函数、异步函数、生成器函数和类。这是一个类型守卫函数。

## 语法

```typescript
function isFunction(value: unknown): value is (...args: any[]) => any;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is (...args: any[]) => any`（类型守卫）
- **描述**: 如果值是函数返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isFunction } from '@rabjs/kit';

// 普通函数
console.log(isFunction(function () {})); // true
console.log(isFunction(() => {})); // true

// 命名函数
function myFunc() {}
console.log(isFunction(myFunc)); // true

// 异步函数
console.log(isFunction(async () => {})); // true

// 生成器函数
console.log(isFunction(function* () {})); // true

// 类（类也是函数）
console.log(isFunction(class MyClass {})); // true

// 非函数值
console.log(isFunction({})); // false
console.log(isFunction([])); // false
console.log(isFunction('function')); // false
console.log(isFunction(123)); // false
console.log(isFunction(null)); // false
```

### 高级用法 - 类型守卫

```typescript
// 类型守卫示例
function executeIfFunction(value: unknown, args: any[] = []) {
  if (isFunction(value)) {
    // 在这个块内，TypeScript 知道 value 是函数
    try {
      const result = value(...args);
      console.log('执行结果:', result);
      return result;
    } catch (error) {
      console.error('执行出错:', error);
    }
  } else {
    console.log('值不是函数');
  }
}

executeIfFunction(() => 'Hello'); // 执行结果: Hello
executeIfFunction((a, b) => a + b, [1, 2]); // 执行结果: 3
executeIfFunction('not a function'); // 值不是函数

// 过滤函数
function filterFunctions(items: unknown[]): Function[] {
  return items.filter(isFunction);
}

const mixed = [1, () => {}, 'string', function () {}, null, async () => {}];
const functions = filterFunctions(mixed);
console.log(functions.length); // 3

// 回调处理
function executeCallback(data: any, callback: unknown) {
  if (isFunction(callback)) {
    return callback(data);
  }
  return data;
}
```

### 实际应用场景

```typescript
// 事件处理
function addEventListener(element: HTMLElement, event: string, handler: unknown) {
  if (isFunction(handler)) {
    element.addEventListener(event, handler as EventListener);
  } else {
    console.warn('handler 必须是函数');
  }
}

// 中间件处理
function applyMiddleware(middlewares: unknown[]) {
  return middlewares.filter(isFunction) as Function[];
}

const middlewares = [
  (req, res, next) => {
    console.log('日志中间件');
    next();
  },
  null,
  (req, res, next) => {
    console.log('认证中间件');
    next();
  },
];

const validMiddlewares = applyMiddleware(middlewares);
console.log(validMiddlewares.length); // 2

// Promise 链式调用
function chainPromise(value: any, transformer: unknown): Promise<any> {
  if (isFunction(transformer)) {
    return Promise.resolve(value).then(transformer);
  }
  return Promise.resolve(value);
}

chainPromise(10, (x) => x * 2).then(console.log); // 20

// 配置对象中的函数处理
interface Config {
  name: string;
  onSuccess?: unknown;
  onError?: unknown;
}

function executeConfig(config: Config, result: any) {
  if (isFunction(config.onSuccess)) {
    config.onSuccess(result);
  }
  if (isFunction(config.onError)) {
    config.onError(new Error('失败'));
  }
}
```

## 交互式示例

```tsx live
function IsFunctionExample() {
  const [result, setResult] = React.useState(null);

  const testValues = [
    { label: '普通函数', value: function () {} },
    { label: '箭头函数 () => {}', value: () => {} },
    { label: '异步函数 async () => {}', value: async () => {} },
    { label: '生成器 function*() {}', value: function* () {} },
    { label: '类 class MyClass {}', value: class MyClass {} },
    { label: '内置函数 Array.isArray', value: Array.isArray },
    { label: '对象 {}', value: {} },
    { label: '数组 []', value: [] },
    { label: '字符串 "function"', value: 'function' },
    { label: '数字 123', value: 123 },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
  ];

  const handleTest = (value) => {
    const isFunction_result = isFunction(value);
    let funcInfo = '';

    if (isFunction_result) {
      if (value.constructor.name === 'AsyncFunction') {
        funcInfo = 'Async Function';
      } else if (value.constructor.name === 'GeneratorFunction') {
        funcInfo = 'Generator Function';
      } else if (value.constructor.name === 'Function') {
        funcInfo = 'Regular Function';
      } else {
        funcInfo = value.constructor.name;
      }
    }

    setResult({
      value: value.toString ? value.toString().substring(0, 50) + '...' : JSON.stringify(value),
      isFunction: isFunction_result,
      funcInfo: funcInfo,
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>isFunction 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>选择测试值:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
          {testValues.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTest(item.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          <strong>测试值:</strong> {result.value} <br />
          <strong>isFunction 结果:</strong>{' '}
          <span style={{ color: result.isFunction ? '#52c41a' : '#f5222d', fontWeight: 'bold' }}>
            {result.isFunction ? 'true' : 'false'}
          </span>{' '}
          <br />
          {result.isFunction && (
            <>
              <strong>函数类型:</strong> {result.funcInfo}
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- 🔒 **类也是函数**: 在 JavaScript 中，类（`class`）也是函数，所以 `isFunction(class MyClass {})` 返回 `true`
- 💡 **异步函数**: 异步函数（`async () => {}`）也被识别为函数
- 🔍 **生成器函数**: 生成器函数（`function*() {}`）也被识别为函数
- ⚠️ **箭头函数**: 箭头函数和普通函数都被正确识别
- 📚 **性能**: 该函数使用 `typeof` 检查，性能最优
- 🔒 **类型守卫**: 返回类型 `value is (...args: any[]) => any`，可用于 TypeScript 类型缩小

## 相关函数

- [`isObject`](./isObject) - 检查值是否为对象
- [`isArray`](./isArray) - 检查值是否为数组
- [`isCallable`](./isCallable) - 检查值是否可调用（包括对象方法）

## 版本历史

- **v0.0.1** - 初始版本
