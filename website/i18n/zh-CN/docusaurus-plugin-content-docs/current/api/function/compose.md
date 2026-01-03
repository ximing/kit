---
id: compose
title: compose
description: '创建一个函数，是提供的函数的组合，从右到左执行'
---

# `compose`

创建一个函数，是提供的函数的组合，每个连续的调用都由前一个的返回值提供。函数从右到左执行，这使得用数学组合风格创建数据转换管道很有用。

## 语法

```typescript
function compose<R>(...funcs: Array<(arg: any) => any>): (arg: any) => R;
```

## 参数

| 参数名  | 类型                       | 必填 | 默认值 | 描述                         |
| ------- | -------------------------- | ---- | ------ | ---------------------------- |
| `funcs` | `Array<(arg: any) => any>` | ✅   | -      | 要组合的函数（从右到左执行） |

## 返回值

- **类型**: `(arg: any) => R`
- **描述**: 返回一个新函数，从右到左应用所有组合的函数。

## 示例

### 基础用法

```typescript
import { compose } from '@rabjs/kit';

// 示例1: 简单的数学组合
const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;
const composed = compose(add, multiply);

console.log(composed(5)); // => 11 (multiply(5) = 10, then add(10) = 11)

// 示例2: 字符串转换
const toUpper = (str: string) => str.toUpperCase();
const exclaim = (str: string) => `${str}!`;
const shout = compose(exclaim, toUpper);

console.log(shout('hello')); // => 'HELLO!'
```

### 高级用法

```typescript
// 示例3: 数据处理管道
const square = (n: number) => n * n;
const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const pipeline = compose(addTen, double, square);

console.log(pipeline(3)); // => 28 (square(3) = 9, double(9) = 18, addTen(18) = 28)

// 示例4: 复杂的对象转换
const formatUser = compose(
  (user) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` }),
  (user) => ({ ...user, firstName: user.firstName.toUpperCase() }),
  (user) => ({ ...user, lastName: user.lastName.toUpperCase() }),
);

const user = { firstName: 'john', lastName: 'doe' };
console.log(formatUser(user));
// => { firstName: 'JOHN', lastName: 'DOE', fullName: 'JOHN DOE' }
```

### 实际应用场景

```typescript
// 示例5: API 响应转换
const parseJSON = (str: string) => JSON.parse(str);
const extractData = (obj: any) => obj.data;
const filterActive = (items: any[]) => items.filter((item) => item.active);
const sortByName = (items: any[]) => items.sort((a, b) => a.name.localeCompare(b.name));

const processResponse = compose(sortByName, filterActive, extractData, parseJSON);

const jsonResponse = '{"data":[{"id":1,"name":"Bob","active":false},{"id":2,"name":"Alice","active":true}]}';
const result = processResponse(jsonResponse);
// => [{ id: 2, name: 'Alice', active: true }] (已排序和过滤)
```

## 交互式示例

```tsx live
function ComposeExample() {
  const [input, setInput] = React.useState('5');
  const [result, setResult] = React.useState(null);

  const square = (n) => n * n;
  const double = (n) => n * 2;
  const addTen = (n) => n + 10;

  const pipeline = compose(addTen, double, square);

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
      <h4>组合交互式示例</h4>
      <p>函数顺序（从右到左）: square → double → addTen</p>
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

- ⚠️ **执行顺序**: 函数从右到左执行。最右边的函数首先被调用，使用输入。
- 💡 **数学风格**: 组合遵循数学函数组合符号: (f ∘ g)(x) = f(g(x))
- 🔒 **类型安全**: 每个函数的返回类型应与下一个函数的参数类型匹配。
- 🐛 **常见错误**: 混淆函数的顺序。记住：最右边的函数首先执行。
- 📚 **最佳实践**: 对数学转换使用 compose，对数据处理工作流使用 pipe。

## 相关函数

- [`pipe`](./pipe) - 从左到右组合函数
- [`curry`](./curry) - 创建柯里化函数以进行部分应用
- [`partial`](./partial) - 为函数部分应用参数

## 版本历史

- **v1.0.0** - 初始版本
