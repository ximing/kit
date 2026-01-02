---
sidebar_position: 3
---

# 使用方法

## 基本用法

### 导入单个函数

```typescript
import { chunk } from '@rabjs/kit';

const result = chunk([1, 2, 3, 4, 5], 2);
console.log(result); // [[1, 2], [3, 4], [5]]
```

### 导入多个函数

```typescript
import { chunk, compact, flatten } from '@rabjs/kit';

const arr = [1, null, 2, undefined, 3];
const cleaned = compact(arr);
console.log(cleaned); // [1, 2, 3]
```

### 导入整个模块

```typescript
import * as kit from '@rabjs/kit';

const result = kit.chunk([1, 2, 3, 4], 2);
```

## 按类别使用

@rabjs/kit 提供了多个类别的工具函数：

### 数组操作

```typescript
import { chunk, compact, flatten, union, intersection } from '@rabjs/kit';

// 分块
const chunks = chunk([1, 2, 3, 4, 5], 2);

// 压缩（移除 falsy 值）
const cleaned = compact([1, null, 2, undefined, 3, false]);

// 展平
const flat = flatten([
  [1, 2],
  [3, [4, 5]],
]);

// 并集
const combined = union([1, 2], [2, 3]);

// 交集
const common = intersection([1, 2, 3], [2, 3, 4]);
```

### 对象操作

```typescript
import { pick, omit, merge, keys, values } from '@rabjs/kit';

const obj = { a: 1, b: 2, c: 3 };

// 选择特定属性
const selected = pick(obj, 'a', 'b');

// 忽略特定属性
const excluded = omit(obj, 'c');

// 合并对象
const merged = merge({ a: 1 }, { b: 2 });

// 获取所有键
const allKeys = keys(obj);

// 获取所有值
const allValues = values(obj);
```

### 字符串操作

```typescript
import { capitalize, camelCase, kebabCase, trim } from '@rabjs/kit';

// 首字母大写
const capitalized = capitalize('hello');

// 转换为驼峰式
const camel = camelCase('hello-world');

// 转换为 kebab 式
const kebab = kebabCase('helloWorld');

// 修剪空白
const trimmed = trim('  hello  ');
```

### 类型检查

```typescript
import { isArray, isObject, isString, isEmpty, isNil } from '@rabjs/kit';

isArray([1, 2, 3]); // true
isObject({ a: 1 }); // true
isString('hello'); // true
isEmpty([]); // true
isEmpty({}); // true
isNil(null); // true
isNil(undefined); // true
```

### 函数工具

```typescript
import { debounce, throttle, memoize, compose, pipe } from '@rabjs/kit';

// 防抖
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// 节流
const throttledScroll = throttle(() => {
  console.log('Scrolling...');
}, 500);

// 记忆化
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// 函数组合
const add = (a) => (b) => a + b;
const multiply = (a) => (b) => a * b;
const composed = compose(multiply(2), add(3));

// 函数管道
const piped = pipe(add(1), multiply(2)); // (x) => (x + 1) * 2
```

## 常见模式

### 数据转换

```typescript
import { map, filter, reduce } from '@rabjs/kit';

const numbers = [1, 2, 3, 4, 5];

// 映射
const doubled = map(numbers, (n) => n * 2);

// 过滤
const evens = filter(numbers, (n) => n % 2 === 0);

// 归约
const sum = reduce(numbers, (acc, n) => acc + n, 0);
```

### 数据验证

```typescript
import { isEmail, isUrl, isPhoneNumber } from '@rabjs/kit';

isEmail('test@example.com'); // true
isUrl('https://example.com'); // true
isPhoneNumber('+1234567890'); // true
```

### 异步操作

```typescript
import { delay, timeout, retry } from '@rabjs/kit';

// 延迟执行
await delay(1000);

// 超时控制
const result = await timeout(fetchData(), 5000);

// 重试机制
const data = await retry(() => fetchData(), { maxAttempts: 3 });
```

## 下一步

- 🔧 浏览 [API 文档](/docs/api/array) 查看所有可用函数
- 📝 查看 [TypeScript 支持](./typescript.md) 了解类型系统
- 💡 查看 [常见模式](./examples/common-patterns.md) 获取更多示例
