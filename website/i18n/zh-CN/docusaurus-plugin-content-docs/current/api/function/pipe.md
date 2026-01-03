---
id: pipe
title: pipe
description: '创建一个函数，是提供的函数的组合，从左到右执行'
---

# `pipe`

创建一个函数，是提供的函数的组合，每个连续的调用都由前一个的返回值提供。函数从左到右执行，这与 `compose` 的数学组合风格相比，对数据处理工作流更直观。

## 语法

```typescript
function pipe<R>(...funcs: Array<(arg: any) => any>): (arg: any) => R;
```

## 参数

| 参数名  | 类型                       | 必填 | 默认值 | 描述                           |
| ------- | -------------------------- | ---- | ------ | ------------------------------ |
| `funcs` | `Array<(arg: any) => any>` | ✅   | -      | 要管道化的函数（从左到右执行） |

## 返回值

- **类型**: `(arg: any) => R`
- **描述**: 返回一个新函数，从左到右应用所有管道化的函数。

## 示例

### 基础用法

```typescript
import { pipe } from '@rabjs/kit';

// 示例1: 简单的数学管道
const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;
const piped = pipe(add, multiply);

console.log(piped(5)); // => 12 (add(5) = 6, then multiply(6) = 12)

// 示例2: 字符串转换
const toUpper = (str: string) => str.toUpperCase();
const exclaim = (str: string) => `${str}!`;
const shout = pipe(toUpper, exclaim);

console.log(shout('hello')); // => 'HELLO!'
```

### 高级用法

```typescript
// 示例3: 数据处理工作流
const square = (n: number) => n * n;
const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const pipeline = pipe(square, double, addTen);

console.log(pipeline(3)); // => 28 (square(3) = 9, double(9) = 18, addTen(18) = 28)

// 示例4: 复杂的数据转换
const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();
const replace = (str: string) => str.replace(/\s+/g, '-');
const slugify = pipe(trim, toLowerCase, replace);

console.log(slugify('  Hello World  ')); // => 'hello-world'
```

### 实际应用场景

```typescript
// 示例5: API 请求处理
const parseJSON = (str: string) => JSON.parse(str);
const extractData = (obj: any) => obj.data;
const filterActive = (items: any[]) => items.filter((item) => item.active);
const sortByName = (items: any[]) => items.sort((a, b) => a.name.localeCompare(b.name));

const processResponse = pipe(parseJSON, extractData, filterActive, sortByName);

const jsonResponse = '{"data":[{"id":1,"name":"Bob","active":false},{"id":2,"name":"Alice","active":true}]}';
const result = processResponse(jsonResponse);
// => [{ id: 2, name: 'Alice', active: true }] (已排序和过滤)
```

## 交互式示例

```tsx live
function PipeExample() {
  const [input, setInput] = React.useState('5');
  const [result, setResult] = React.useState(null);

  const square = (n) => n * n;
  const double = (n) => n * 2;
  const addTen = (n) => n + 10;

  const pipeline = pipe(square, double, addTen);

  const handleCalculate = () => {
    try {
      const num = parseInt(input);
      if (!isNaN(num)) {
        const res = pipeline(num);
        setResult(res);
      }
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>管道交互式示例</h4>
      <p>函数顺序（从左到右）: square → double → addTen</p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入数字:</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>步骤 1 - square({input}):</strong> {Math.pow(parseInt(input) || 0, 2)}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>步骤 2 - double 结果:</strong> {Math.pow(parseInt(input) || 0, 2) * 2}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>步骤 3 - addTen 结果:</strong> {result}
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **执行顺序**: 函数从左到右执行。最左边的函数首先被调用，使用输入。
- 💡 **可读性**: 管道通常比组合更直观，因为它从左到右自然阅读，与数据流相匹配。
- 🔒 **类型安全**: 每个函数的返回类型应与下一个函数的参数类型匹配。
- 🐛 **常见错误**: 混淆管道和组合。记住：管道从左到右，组合从右到左。
- 📚 **最佳实践**: 对数据处理工作流使用管道，对数学转换使用组合。

## 相关函数

- [`compose`](./compose) - 从右到左组合函数
- [`curry`](./curry) - 创建柯里化函数以进行部分应用
- [`partial`](./partial) - 为函数部分应用参数

## 版本历史

- **v1.0.0** - 初始版本
