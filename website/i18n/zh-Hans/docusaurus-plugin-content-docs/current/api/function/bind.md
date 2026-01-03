---
id: bind
title: bind
description: '创建一个函数，使用指定的 this 绑定和预设参数调用原函数'
---

# `bind`

创建一个函数，使用指定的 `this` 绑定和预设参数调用原函数。这对于将方法绑定到特定上下文以及创建具有预设参数和 `this` 绑定的函数的特殊版本很有用。

## 语法

```typescript
function bind<T extends (...args: any[]) => any>(
  func: T,
  thisArg: any,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T>;
```

## 参数

| 参数名        | 类型                                | 必填 | 默认值 | 描述                |
| ------------- | ----------------------------------- | ---- | ------ | ------------------- |
| `func`        | `T extends (...args: any[]) => any` | ✅   | -      | 要绑定的函数        |
| `thisArg`     | `any`                               | ✅   | -      | func 的 `this` 绑定 |
| `partialArgs` | `any[]`                             | ❌   | -      | 要部分应用的参数    |

## 返回值

- **类型**: `(...args: any[]) => ReturnType<T>`
- **描述**: 返回新函数，`this` 绑定到 thisArg，部分参数前置。

## 示例

### 基础用法

```typescript
import { bind } from '@rabjs/kit';

// 示例1: 将方法绑定到对象
const obj = {
  name: '张三',
  greet(greeting: string) {
    return `${greeting}, ${this.name}!`;
  },
};

const boundGreet = bind(obj.greet, obj, '你好');
console.log(boundGreet()); // => '你好, 张三!'

// 示例2: 使用部分参数绑定
function add(this: { base: number }, a: number, b: number) {
  return this.base + a + b;
}

const obj = { base: 10 };
const boundAdd = bind(add, obj, 5);
console.log(boundAdd(3)); // => 18 (10 + 5 + 3)
```

### 高级用法

```typescript
// 示例3: 事件处理程序绑定
class Button {
  private clickCount = 0;

  onClick() {
    this.clickCount++;
    console.log(`点击 ${this.clickCount} 次`);
  }

  getClickHandler() {
    return bind(this.onClick, this);
  }
}

const button = new Button();
const handler = button.getClickHandler();
handler(); // => '点击 1 次'
handler(); // => '点击 2 次'

// 示例4: 使用多个部分参数绑定
function format(this: { prefix: string }, template: string, ...values: any[]) {
  let result = `${this.prefix}: ${template}`;
  values.forEach((value, index) => {
    result = result.replace(`{${index}}`, value);
  });
  return result;
}

const context = { prefix: '[日志]' };
const boundFormat = bind(format, context, '用户 {0} 已登录');
console.log(boundFormat('张三')); // => '[日志]: 用户 张三 已登录'
```

### 实际应用场景

```typescript
// 示例5: 带绑定方法的 API 客户端
class ApiClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async request(method: string, endpoint: string, data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const options: any = {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return fetch(url, options);
  }

  get(endpoint: string) {
    return bind(this.request, this, 'GET')(endpoint);
  }

  post(endpoint: string, data: any) {
    return bind(this.request, this, 'POST')(endpoint, data);
  }
}

const client = new ApiClient('https://api.example.com', 'token123');
// client.get('/users');
// client.post('/users', { name: '张三' });
```

## 交互式示例

```tsx live
function BindExample() {
  const [name, setName] = React.useState('张三');
  const [greeting, setGreeting] = React.useState('你好');
  const [result, setResult] = React.useState('');

  const obj = { name };
  const greet = function (greeting) {
    return `${greeting}, ${this.name}!`;
  };

  const boundGreet = bind(greet, obj, greeting);

  const handleCalculate = () => {
    const res = boundGreet();
    setResult(res);
  };

  React.useEffect(() => {
    handleCalculate();
  }, [name, greeting]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>绑定交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>名字:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>问候语:</label>
          <input
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
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

- ⚠️ **This 绑定**: `this` 上下文被永久绑定。后续调用无法改变它。
- 💡 **部分参数**: 像 `partial` 一样，参数被前置，所以部分参数首先出现。
- 🔒 **方法提取**: 使用 bind 从对象提取方法，并将其用作独立函数。
- 🐛 **常见错误**: 忘记 `bind` 改变 `this` 上下文。如果只需要参数绑定，使用 `partial`。
- 📚 **最佳实践**: 对事件处理程序和回调使用 bind，其中 `this` 上下文很重要。

## 相关函数

- [`partial`](./partial) - 部分应用参数而不绑定 `this`
- [`curry`](./curry) - 创建柯里化函数以进行渐进式参数应用
- [`compose`](./compose) - 从右到左组合函数
- [`pipe`](./pipe) - 从左到右组合函数

## 版本历史

- **v1.0.0** - 初始版本
