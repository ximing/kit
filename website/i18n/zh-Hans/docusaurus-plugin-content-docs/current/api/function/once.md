---
id: once
title: once
description: '创建一个函数，限制其仅调用一次，后续调用返回第一次调用的结果'
---

# `once`

创建一个函数，限制其仅调用一次。对函数的重复调用返回第一次调用的值。这对于初始化函数、只应运行一次的事件处理程序或防止重复操作很有用。

## 语法

```typescript
function once<T extends (...args: any[]) => any>(func: T): T;
```

## 参数

| 参数名 | 类型                                | 必填 | 默认值 | 描述                 |
| ------ | ----------------------------------- | ---- | ------ | -------------------- |
| `func` | `T extends (...args: any[]) => any` | ✅   | -      | 限制为单次调用的函数 |

## 返回值

- **类型**: `T`
- **描述**: 返回受限函数，仅执行一次，并为后续调用缓存结果。

## 示例

### 基础用法

```typescript
import { once } from '@rabjs/kit';

// 示例1: 计数器仅在第一次调用时增加
let count = 0;
const initialize = once(() => ++count);

console.log(initialize()); // => 1
console.log(initialize()); // => 1 (返回缓存结果)
console.log(initialize()); // => 1
console.log(count); // => 1 (函数仅调用一次)

// 示例2: 问候函数
const greet = once((name: string) => `你好, ${name}!`);

console.log(greet('张三')); // => '你好, 张三!'
console.log(greet('李四')); // => '你好, 张三!' (返回缓存结果)
```

### 高级用法

```typescript
// 示例3: 初始化配置
const initConfig = once(() => {
  console.log('加载配置...');
  return {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
  };
});

const config1 = initConfig();
const config2 = initConfig(); // 使用缓存配置
console.log(config1 === config2); // => true

// 示例4: 初始化数据库连接
const connectDB = once(async () => {
  console.log('连接到数据库...');
  // 模拟数据库连接
  return new Promise((resolve) => {
    setTimeout(() => resolve({ connected: true }), 1000);
  });
});

await connectDB(); // 连接
await connectDB(); // 返回缓存连接
```

### 实际应用场景

```typescript
// 示例5: 仅触发一次的事件监听器
class EventEmitter {
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  once(event: string, callback: Function) {
    const wrappedCallback = once(callback);
    this.on(event, wrappedCallback);
  }

  emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(...args));
    }
  }
}

const emitter = new EventEmitter();
emitter.once('ready', () => console.log('准备好了!'));
emitter.emit('ready'); // => '准备好了!'
emitter.emit('ready'); // (无输出，回调未调用)
```

## 交互式示例

```tsx live
function OnceExample() {
  const [callCount, setCallCount] = React.useState(0);
  const [result, setResult] = React.useState('');

  const onceFunction = React.useMemo(() => {
    return once(() => {
      setCallCount((prev) => prev + 1);
      return '函数已执行!';
    });
  }, []);

  const handleClick = () => {
    const res = onceFunction();
    setResult(res);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Once 交互式示例</h4>
      <p>多次点击按钮 - 函数仅执行一次:</p>
      <button onClick={handleClick} style={{ padding: '8px 16px', marginBottom: '15px' }}>
        点击我
      </button>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>结果:</strong> {result}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>函数执行次数:</strong> {callCount}
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **缓存**: 第一次调用的结果被缓存，无论参数如何，后续调用都返回该结果。
- 💡 **性能提示**: 用于昂贵的操作，如数据库连接或配置加载，这些操作应仅发生一次。
- 🔒 **参数被忽略**: 第一次调用后，传递给后续调用的任何参数都被忽略。
- 🐛 **常见错误**: 期望后续调用使用不同的参数返回不同的结果。始终返回第一个结果。
- 📚 **最佳实践**: 用于初始化函数和仅应执行一次的事件处理程序。

## 相关函数

- [`debounce`](./debounce) - 在不活动等待时间后延迟执行
- [`throttle`](./throttle) - 每个等待间隔最多调用一次
- [`memoize`](./memoize) - 根据参数缓存函数结果

## 版本历史

- **v0.0.1** - 初始版本
