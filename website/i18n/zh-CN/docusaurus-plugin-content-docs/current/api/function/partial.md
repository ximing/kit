---
id: partial
title: partial
description: '创建一个函数，使用预设参数调用原函数'
---

# `partial`

创建一个函数，使用预设参数调用原函数。此方法类似于 `bind`，但不改变 `this` 绑定。这对于创建具有预设参数的函数的特殊版本很有用。

## 语法

```typescript
function partial<T extends (...args: any[]) => any>(func: T, ...partialArgs: any[]): (...args: any[]) => ReturnType<T>;
```

## 参数

| 参数名        | 类型                                | 必填 | 默认值 | 描述                     |
| ------------- | ----------------------------------- | ---- | ------ | ------------------------ |
| `func`        | `T extends (...args: any[]) => any` | ✅   | -      | 要部分应用参数的函数     |
| `partialArgs` | `any[]`                             | ✅   | -      | 要部分应用的参数（前置） |

## 返回值

- **类型**: `(...args: any[]) => ReturnType<T>`
- **描述**: 返回新函数，接受剩余参数，并使用部分参数前置调用原始函数。

## 示例

### 基础用法

```typescript
import { partial } from '@rabjs/kit';

// 示例1: 问候函数的部分应用
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const sayHelloTo = partial(greet, '你好');

console.log(sayHelloTo('张三')); // => '你好, 张三!'
console.log(sayHelloTo('李四')); // => '你好, 李四!'

// 示例2: 加法的部分应用
const add = (a: number, b: number, c: number) => a + b + c;
const add5 = partial(add, 5);

console.log(add5(10, 15)); // => 30
console.log(add5(1, 2)); // => 8
```

### 高级用法

```typescript
// 示例3: 多个部分应用
const format = (template: string, ...values: any[]) => {
  let result = template;
  values.forEach((value, index) => {
    result = result.replace(`{${index}}`, value);
  });
  return result;
};

const formatGreeting = partial(format, '你好, {0}! 你今年 {1} 岁。');
console.log(formatGreeting('张三', 25)); // => '你好, 张三! 你今年 25 岁。'

// 示例4: 链式部分应用
const multiply = (a: number, b: number, c: number) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiplyBy2, 3);

console.log(multiplyBy2And3(5)); // => 30
```

### 实际应用场景

```typescript
// 示例5: API 请求构建器
function makeRequest(method: string, url: string, options: any = {}) {
  return fetch(url, {
    method,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

const getRequest = partial(makeRequest, 'GET');
const postRequest = partial(makeRequest, 'POST');

// 使用
// getRequest('/api/users');
// postRequest('/api/users', { body: JSON.stringify({ name: '张三' }) });

// 示例6: 带预设数据的事件处理程序
function handleEvent(eventType: string, data: any, callback: Function) {
  console.log(`事件: ${eventType}`, data);
  callback(data);
}

const handleUserEvent = partial(handleEvent, 'USER_ACTION');
handleUserEvent({ userId: 1 }, (data) => console.log('已处理:', data));
```

## 交互式示例

```tsx live
function PartialExample() {
  const [greeting, setGreeting] = React.useState('你好');
  const [name, setName] = React.useState('张三');
  const [result, setResult] = React.useState('');

  const greet = (greeting, name) => `${greeting}, ${name}!`;
  const greetWithPrefix = partial(greet, greeting);

  const handleCalculate = () => {
    const res = greetWithPrefix(name);
    setResult(res);
  };

  React.useEffect(() => {
    handleCalculate();
  }, [greeting, name]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>部分应用交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>问候语:</label>
          <input
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>名字:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>结果:</strong> {result}
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **参数顺序**: 部分参数被前置（添加在开头），所以它们出现在任何附加参数之前。
- 💡 **部分 vs 绑定**: 与 `bind` 不同，`partial` 不改变 `this` 上下文。对纯函数使用 `partial`。
- 🔒 **不可变性**: 原始函数不被修改；创建新函数。
- 🐛 **常见错误**: 混淆参数的顺序。部分参数首先出现，然后是附加参数。
- 📚 **最佳实践**: 用于创建实用函数或 API 调用的特殊版本。

## 相关函数

- [`bind`](./bind) - 绑定 `this` 上下文并部分应用参数
- [`curry`](./curry) - 创建柯里化函数以进行渐进式参数应用
- [`compose`](./compose) - 从右到左组合函数
- [`pipe`](./pipe) - 从左到右组合函数

## 版本历史

- **v1.0.0** - 初始版本
