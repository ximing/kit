---
id: curry
title: curry
description: '创建一个柯里化函数，接受参数并返回新函数直到提供所有参数'
---

# `curry`

创建一个柯里化函数，接受 func 的参数，当提供了足够的参数时执行 func 并返回结果，否则返回一个接受剩余参数的新函数。这对于函数式编程和创建具有预设参数的函数的特殊版本很有用。

## 语法

```typescript
function curry<T extends (...args: any[]) => any>(func: T, arity?: number): any;
```

## 参数

| 参数名  | 类型                                | 必填 | 默认值        | 描述                    |
| ------- | ----------------------------------- | ---- | ------------- | ----------------------- |
| `func`  | `T extends (...args: any[]) => any` | ✅   | -             | 要柯里化的函数          |
| `arity` | `number`                            | ❌   | `func.length` | func 的元数（参数个数） |

## 返回值

- **类型**: `any`
- **描述**: 返回柯里化函数，接受部分参数，并在提供所有参数时返回结果，否则返回等待剩余参数的新函数。

## 示例

### 基础用法

```typescript
import { curry } from '@rabjs/kit';

// 示例1: 柯里化简单函数
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // => 6
console.log(curriedAdd(1, 2)(3)); // => 6
console.log(curriedAdd(1)(2, 3)); // => 6
console.log(curriedAdd(1, 2, 3)); // => 6

// 示例2: 创建特殊化函数
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const curriedGreet = curry(greet);

const sayHello = curriedGreet('你好');
console.log(sayHello('张三')); // => '你好, 张三!'
console.log(sayHello('李四')); // => '你好, 李四!'

const sayCiao = curriedGreet('再见');
console.log(sayCiao('张三')); // => '再见, 张三!'
```

### 高级用法

```typescript
// 示例3: 使用显式元数的柯里化
const multiply = (a: number, b: number) => a * b;
const curriedMultiply = curry(multiply, 2);

const double = curriedMultiply(2);
console.log(double(5)); // => 10
console.log(double(10)); // => 20

// 示例4: 复杂的柯里化用法
const formatString = (prefix: string, text: string, suffix: string) => {
  return `${prefix}${text}${suffix}`;
};
const curriedFormat = curry(formatString);

const formatLog = curriedFormat('[日志]');
const formatError = curriedFormat('[错误]');

console.log(formatLog('成功', '!')); // => '[日志]成功!'
console.log(formatError('失败', '!!')); // => '[错误]失败!!'
```

### 实际应用场景

```typescript
// 示例5: 使用柯里化构建 API 请求
function createApiRequest() {
  const request = curry((method: string, url: string, data?: any) => {
    return fetch(url, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: { 'Content-Type': 'application/json' },
    });
  }, 3);

  const get = request('GET');
  const post = request('POST');
  const put = request('PUT');

  return {
    get: (url: string) => get(url),
    post: (url: string, data: any) => post(url, data),
    put: (url: string, data: any) => put(url, data),
  };
}

const api = createApiRequest();
// api.get('/api/users');
// api.post('/api/users', { name: '张三' });
```

## 交互式示例

```tsx live
function CurryExample() {
  const [a, setA] = React.useState('2');
  const [b, setB] = React.useState('3');
  const [c, setC] = React.useState('5');
  const [result, setResult] = React.useState(null);

  const add = curry((x, y, z) => x + y + z);

  const handleCalculate = () => {
    try {
      const numA = parseInt(a);
      const numB = parseInt(b);
      const numC = parseInt(c);

      if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
        const res = add(numA)(numB)(numC);
        setResult(res);
      }
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [a, b, c]);

  const curriedAdd = curry((x, y, z) => x + y + z);
  const addTwo = curriedAdd(2);
  const addTwoAndThree = addTwo(3);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>柯里化交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>a = </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>b = </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>c = </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>add(a)(b)(c) = </strong> {result}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
        <strong>示例:</strong> add(2)(3)(5) = {addTwoAndThree(5)}
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **元数**: 元数参数应与原始函数接受的参数数量匹配。如果未提供，默认为 `func.length`。
- 💡 **部分应用**: 柯里化启用部分应用，允许您创建具有预设参数的特殊化函数。
- 🔒 **函数组合**: 柯里化函数适用于函数组合和函数式编程模式。
- 🐛 **常见错误**: 忘记柯里化需要为每个参数多次调用函数。
- 📚 **最佳实践**: 对于将使用相同初始参数多次调用的函数使用柯里化。

## 相关函数

- [`partial`](./partial) - 部分应用参数，不需要所有参数
- [`compose`](./compose) - 从右到左组合函数
- [`pipe`](./pipe) - 从左到右组合函数

## 版本历史

- **v0.0.1** - 初始版本
