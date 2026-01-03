---
id: keyBy
title: keyBy
description: 'Creates an object composed from the elements of collection keyed by the results of running each element thru iteratee'
---

# `keyBy`

按条件将集合中的元素转换为键值对对象，其中键是迭代器的结果，值是对应的元素。

## 语法

```typescript
function keyBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string,
): Record<string | number, T>;
```

## 参数

| 参数名       | 类型                                                       | 必填 | 默认值 | 描述                             |
| ------------ | ---------------------------------------------------------- | ---- | ------ | -------------------------------- |
| `collection` | `T[]`                                                      | ✅   | -      | 要转换的集合                     |
| `iteratee`   | `(item: T, index: number) => string \| number` \| `string` | ✅   | -      | 键生成迭代器，可以是函数或属性名 |

## 返回值

- **类型**: `Record<string | number, T>`
- **描述**: 一个对象，键为迭代器结果，值为对应的集合元素

## 示例

### 基础用法

```typescript
import { keyBy } from '@rabjs/kit';

// 示例1: 按ID生成查找表
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const usersById = keyBy(users, 'id');
console.log(usersById);
// => {
//   '1': { id: 1, name: 'Alice' },
//   '2': { id: 2, name: 'Bob' },
//   '3': { id: 3, name: 'Charlie' }
// }

// 快速查找
console.log(usersById['2']); // { id: 2, name: 'Bob' }

// 示例2: 按属性生成键值对
const products = [
  { code: 'PROD001', name: 'Laptop' },
  { code: 'PROD002', name: 'Mouse' },
  { code: 'PROD003', name: 'Keyboard' },
];

const productsByCode = keyBy(products, 'code');
console.log(productsByCode);
// => {
//   'PROD001': { code: 'PROD001', name: 'Laptop' },
//   'PROD002': { code: 'PROD002', name: 'Mouse' },
//   'PROD003': { code: 'PROD003', name: 'Keyboard' }
// }
```

### 高级用法

```typescript
// 示例3: 按计算值生成键
const employees = [
  { email: 'alice@example.com', name: 'Alice', dept: 'Engineering' },
  { email: 'bob@example.com', name: 'Bob', dept: 'Sales' },
  { email: 'charlie@example.com', name: 'Charlie', dept: 'Engineering' },
];

const employeesByEmail = keyBy(employees, 'email');
console.log(employeesByEmail);
// => {
//   'alice@example.com': { email: 'alice@example.com', name: 'Alice', dept: 'Engineering' },
//   'bob@example.com': { email: 'bob@example.com', name: 'Bob', dept: 'Sales' },
//   'charlie@example.com': { email: 'charlie@example.com', name: 'Charlie', dept: 'Engineering' }
// }

// 按自定义函数生成键
const employeesByDept = keyBy(employees, (emp) => emp.dept.toLowerCase());
console.log(employeesByDept);
// => {
//   'engineering': { email: 'alice@example.com', name: 'Alice', dept: 'Engineering' },
//   'sales': { email: 'bob@example.com', name: 'Bob', dept: 'Sales' }
// }
// 注意：如果有重复的键，后面的值会覆盖前面的值

// 示例4: 按索引生成键
const items = ['apple', 'banana', 'orange'];
const itemsWithIndex = keyBy(items, (_, index) => `item_${index}`);
console.log(itemsWithIndex);
// => {
//   'item_0': 'apple',
//   'item_1': 'banana',
//   'item_2': 'orange'
// }

// 示例5: 按多字段组合生成键
const orders = [
  { userId: 1, orderId: 'ORD001', amount: 100 },
  { userId: 2, orderId: 'ORD002', amount: 200 },
  { userId: 1, orderId: 'ORD003', amount: 150 },
];

const ordersByKey = keyBy(orders, (order) => `${order.userId}_${order.orderId}`);
console.log(ordersByKey);
// => {
//   '1_ORD001': { userId: 1, orderId: 'ORD001', amount: 100 },
//   '2_ORD002': { userId: 2, orderId: 'ORD002', amount: 200 },
//   '1_ORD003': { userId: 1, orderId: 'ORD003', amount: 150 }
// }
```

### 实际应用场景

```typescript
// 示例6: 构建快速查找表
interface Product {
  sku: string;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { sku: 'SKU001', name: 'iPhone', price: 999, stock: 50 },
  { sku: 'SKU002', name: 'iPad', price: 599, stock: 30 },
  { sku: 'SKU003', name: 'AirPods', price: 199, stock: 100 },
];

const productBySku = keyBy(products, 'sku');

// 快速查询商品信息
function getProductInfo(sku: string) {
  return productBySku[sku] || null;
}

console.log(getProductInfo('SKU001')); // { sku: 'SKU001', name: 'iPhone', price: 999, stock: 50 }

// 示例7: 缓存API响应
interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

const apiUsers: User[] = [
  { id: 1, username: 'alice', email: 'alice@example.com', avatar: 'url1' },
  { id: 2, username: 'bob', email: 'bob@example.com', avatar: 'url2' },
  { id: 3, username: 'charlie', email: 'charlie@example.com', avatar: 'url3' },
];

// 按ID缓存用户
const userCache = keyBy(apiUsers, 'id');

// 快速查询用户
function getUserById(id: number) {
  return userCache[id];
}

// 示例8: 构建状态映射
interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
];

const languagesByCode = keyBy(languages, 'code');

// 快速获取语言名称
function getLanguageName(code: string): string {
  return languagesByCode[code]?.name || 'Unknown';
}

console.log(getLanguageName('zh')); // 'Chinese'
```

## 交互式示例

```tsx live
function KeyByExample() {
  const [keyField, setKeyField] = React.useState('id');
  const [result, setResult] = React.useState(null);
  const [selectedKey, setSelectedKey] = React.useState('1');

  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' },
  ];

  const handleKeyBy = () => {
    const keyed = keyBy(users, keyField);
    setResult(keyed);
  };

  React.useEffect(() => {
    handleKeyBy();
  }, [keyField]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>keyBy 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>键字段: </label>
        <select
          value={keyField}
          onChange={(e) => setKeyField(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
        </select>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **键的唯一性**: 如果有重复的键，后面的值会覆盖前面的值
- ⚠️ **键的类型**: 返回对象的键始终是字符串或数字类型
- 💡 **性能提示**: 时间复杂度为 O(n)，适合创建快速查找表
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 用于构建查找表和缓存，提高数据访问性能

## 相关函数

- [`groupBy`](./groupBy) - 按条件分组集合并返回完整元素数组
- [`countBy`](./countBy) - 按条件计数分组
- [`partition`](./partition) - 按条件分割集合为两部分

## 版本历史

- **v0.0.1** - 初始版本
