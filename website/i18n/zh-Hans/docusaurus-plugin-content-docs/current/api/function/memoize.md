---
id: memoize
title: memoize
description: '创建一个函数，根据参数缓存函数的结果'
---

# `memoize`

创建一个函数，根据参数缓存函数的结果。被记忆化的函数会根据提供的参数缓存结果。如果提供了解析器函数，它将确定用于存储结果的缓存键。这对于昂贵的计算或相同参数的重复函数调用很有用。

## 语法

```typescript
function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any,
): T & { cache: Map<any, ReturnType<T>> };
```

## 参数

| 参数名     | 类型                                | 必填 | 默认值      | 描述                   |
| ---------- | ----------------------------------- | ---- | ----------- | ---------------------- |
| `func`     | `T extends (...args: any[]) => any` | ✅   | -           | 要记忆化其输出的函数   |
| `resolver` | `(...args: Parameters<T>) => any`   | ❌   | `undefined` | 从参数解析缓存键的函数 |

## 返回值

- **类型**: `T & { cache: Map<any, ReturnType<T>> }`
- **描述**: 返回记忆化的函数，带有 `cache` 属性（包含缓存结果的 Map）。可以通过调用 `cache.clear()` 清除缓存。

## 示例

### 基础用法

```typescript
import { memoize } from '@rabjs/kit';

// 示例1: 记忆化昂贵的计算
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 计算并缓存
console.log(fibonacci(10)); // 返回缓存结果
console.log(fibonacci.cache.size); // => 11 (缓存的结果)

// 示例2: 记忆化 API 调用
const fetchUser = memoize(async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

await fetchUser(1); // 从 API 获取
await fetchUser(1); // 返回缓存结果
```

### 高级用法

```typescript
// 示例3: 为复杂参数自定义解析器
const memoizedAdd = memoize(
  (a: number, b: number) => a + b,
  (a: number, b: number) => `${a}-${b}`, // 自定义缓存键
);

console.log(memoizedAdd(1, 2)); // => 3 (计算)
console.log(memoizedAdd(1, 2)); // => 3 (缓存)

// 示例4: 使用对象参数的记忆化
const calculateTotal = memoize(
  (items: { price: number; qty: number }[]) => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },
  (items) => JSON.stringify(items), // 使用 JSON 字符串作为缓存键
);

const items = [{ price: 10, qty: 2 }];
console.log(calculateTotal(items)); // 计算
console.log(calculateTotal(items)); // 缓存

// 示例5: 需要时清除缓存
const expensiveComputation = memoize((x: number) => {
  console.log('计算', x);
  return x * x;
});

expensiveComputation(5); // 计算 5
expensiveComputation(5); // 缓存
expensiveComputation.cache.clear(); // 清除缓存
expensiveComputation(5); // 计算 5 (重新计算)
```

### 实际应用场景

```typescript
// 示例6: 状态管理中的记忆化选择器
function useMemoizedSelector() {
  const getFilteredUsers = memoize(
    (users: any[], minAge: number) => {
      console.log('过滤用户...');
      return users.filter((user) => user.age >= minAge);
    },
    (users, minAge) => `${users.length}-${minAge}`, // 缓存键
  );

  // 模拟状态更新
  const users = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 },
    { name: '王五', age: 20 },
  ];

  console.log(getFilteredUsers(users, 25)); // 过滤
  console.log(getFilteredUsers(users, 25)); // 缓存
  console.log(getFilteredUsers(users, 20)); // 不同的键，再次过滤

  return getFilteredUsers;
}

useMemoizedSelector();
```

## 交互式示例

```tsx live
function MemoizeExample() {
  const [input, setInput] = React.useState('5');
  const [cacheSize, setCacheSize] = React.useState(0);
  const [computeCount, setComputeCount] = React.useState(0);

  const fibonacci = React.useMemo(() => {
    return memoize((n) => {
      setComputeCount((prev) => prev + 1);
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    });
  }, []);

  const handleCompute = () => {
    const n = parseInt(input);
    if (!isNaN(n) && n >= 0) {
      fibonacci(n);
      setCacheSize(fibonacci.cache.size);
    }
  };

  const handleClear = () => {
    fibonacci.cache.clear();
    setCacheSize(0);
    setComputeCount(0);
  };

  React.useEffect(() => {
    handleCompute();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>记忆化交互式示例 - 斐波那契数列</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>计算斐波那契数列(n):</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          min="0"
          max="20"
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>结果:</strong> {fibonacci(parseInt(input) || 0)}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>缓存大小:</strong> {cacheSize}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>计算次数:</strong> {computeCount}
      </div>
      <button onClick={handleClear} style={{ padding: '5px 10px' }}>
        清除缓存
      </button>
    </div>
  );
}
```

## 注意事项

- ⚠️ **缓存键**: 默认情况下，仅第一个参数用作缓存键。对于复杂参数，使用自定义解析器。
- 💡 **性能提示**: 记忆化对纯函数（没有副作用的函数）最有效。
- 🔒 **内存考虑**: 缓存会无限增长。对于长时间运行的应用程序，考虑定期清除缓存。
- 🐛 **常见错误**: 不为具有多个或复杂参数的函数提供解析器，导致缓存不正确。
- 📚 **最佳实践**: 对昂贵的计算（如递归函数或复杂计算）使用记忆化。

## 相关函数

- [`debounce`](./debounce) - 在不活动等待时间后延迟执行
- [`throttle`](./throttle) - 每个等待间隔最多调用一次
- [`once`](./once) - 限制函数仅执行一次

## 版本历史

- **v0.0.1** - 初始版本
