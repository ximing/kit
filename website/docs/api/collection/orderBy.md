---
id: orderBy
title: orderBy
description: 'Creates an array of elements sorted by the results of running each element thru iteratees with specified sort orders'
---

# `orderBy`

按条件将集合中的元素排列，支持为每个排序条件指定升序或降序。

## 语法

```typescript
function orderBy<T>(
  collection: T[],
  iteratees: ((item: T) => any) | string | (((item: T) => any) | string)[],
  orders?: ('asc' | 'desc')[],
): T[];
```

## 参数

| 参数名       | 类型                                           | 必填 | 默认值  | 描述                 |
| ------------ | ---------------------------------------------- | ---- | ------- | -------------------- |
| `collection` | `T[]`                                          | ✅   | -       | 要排序的集合         |
| `iteratees`  | `(item: T) => any` \| `string` \| `Array<...>` | ✅   | -       | 单个或多个排序迭代器 |
| `orders`     | `('asc' \| 'desc')[]`                          | ❌   | `'asc'` | 对应迭代器的排序顺序 |

## 返回值

- **类型**: `T[]`
- **描述**: 按指定顺序排列的新数组

## 示例

### 基础用法

```typescript
import { orderBy } from '@rabjs/kit';

// 示例1: 按属性降序排列
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
];

const sortedByAgeDesc = orderBy(users, 'age', ['desc']);
console.log(sortedByAgeDesc);
// => [
//   { name: 'Bob', age: 35 },
//   { name: 'John', age: 30 },
//   { name: 'Jane', age: 25 }
// ]

// 示例2: 按数值升序排列
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const sortedAsc = orderBy(numbers, (n) => n, ['asc']);
console.log(sortedAsc);
// => [1, 1, 2, 3, 4, 5, 6, 9]
```

### 高级用法

```typescript
// 示例3: 多条件排序，不同顺序
const employees = [
  { name: 'Alice', department: 'Engineering', salary: 80000 },
  { name: 'Bob', department: 'Sales', salary: 60000 },
  { name: 'Charlie', department: 'Engineering', salary: 75000 },
  { name: 'David', department: 'Sales', salary: 65000 },
];

// 先按部门升序，再按工资降序
const sorted = orderBy(employees, ['department', 'salary'], ['asc', 'desc']);
console.log(sorted);
// => [
//   { name: 'Alice', department: 'Engineering', salary: 80000 },
//   { name: 'Charlie', department: 'Engineering', salary: 75000 },
//   { name: 'David', department: 'Sales', salary: 65000 },
//   { name: 'Bob', department: 'Sales', salary: 60000 }
// ]

// 示例4: 按计算值排序
const products = [
  { name: 'Laptop', price: 1200, stock: 5 },
  { name: 'Mouse', price: 30, stock: 100 },
  { name: 'Monitor', price: 300, stock: 20 },
];

// 按库存价值降序排序（价格 * 库存）
const sortedByValueDesc = orderBy(products, (item) => item.price * item.stock, ['desc']);
console.log(sortedByValueDesc);
// => [
//   { name: 'Laptop', price: 1200, stock: 5 },
//   { name: 'Monitor', price: 300, stock: 20 },
//   { name: 'Mouse', price: 30, stock: 100 }
// ]

// 示例5: 复杂排序规则
const students = [
  { name: 'Alice', grade: 'A', score: 95 },
  { name: 'Bob', grade: 'B', score: 85 },
  { name: 'Charlie', grade: 'A', score: 90 },
  { name: 'David', grade: 'B', score: 88 },
];

// 按等级升序，同等级内按分数降序
const sorted = orderBy(students, ['grade', 'score'], ['asc', 'desc']);
console.log(sorted);
// => [
//   { name: 'Alice', grade: 'A', score: 95 },
//   { name: 'Charlie', grade: 'A', score: 90 },
//   { name: 'David', grade: 'B', score: 88 },
//   { name: 'Bob', grade: 'B', score: 85 }
// ]
```

### 实际应用场景

```typescript
// 示例6: 排序电商商品列表
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  sales: number;
}

const products: Product[] = [
  { id: 1, name: 'iPhone', category: 'Electronics', price: 999, rating: 4.8, sales: 1000 },
  { id: 2, name: 'Shirt', category: 'Clothing', price: 29, rating: 4.5, sales: 500 },
  { id: 3, name: 'Laptop', category: 'Electronics', price: 1299, rating: 4.9, sales: 200 },
  { id: 4, name: 'Pants', category: 'Clothing', price: 49, rating: 4.3, sales: 800 },
];

// 按类别升序，同类别内按评分降序
const sorted = orderBy(products, ['category', 'rating'], ['asc', 'desc']);
console.log(sorted);

// 示例7: 排序任务优先级和截止日期
interface Task {
  id: number;
  title: string;
  priority: number; // 1=高, 2=中, 3=低
  dueDate: Date;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, title: 'Task A', priority: 2, dueDate: new Date('2024-01-20'), completed: false },
  { id: 2, title: 'Task B', priority: 1, dueDate: new Date('2024-01-15'), completed: false },
  { id: 3, title: 'Task C', priority: 1, dueDate: new Date('2024-01-18'), completed: false },
];

// 按优先级升序（1=最高），同优先级内按截止日期升序
const sortedTasks = orderBy(tasks, ['priority', 'dueDate'], ['asc', 'asc']);
console.log(sortedTasks);
// Tasks sorted by priority and due date

// 示例8: 排序搜索结果
interface SearchResult {
  id: number;
  title: string;
  relevanceScore: number;
  publishedDate: Date;
  views: number;
}

const results: SearchResult[] = [
  { id: 1, title: 'Article 1', relevanceScore: 0.8, publishedDate: new Date('2024-01-10'), views: 100 },
  { id: 2, title: 'Article 2', relevanceScore: 0.9, publishedDate: new Date('2024-01-05'), views: 200 },
  { id: 3, title: 'Article 3', relevanceScore: 0.9, publishedDate: new Date('2024-01-15'), views: 50 },
];

// 按相关性降序，同相关性内按发布日期降序（最新优先）
const sortedResults = orderBy(results, ['relevanceScore', 'publishedDate'], ['desc', 'desc']);
```

## 交互式示例

```tsx live
function OrderByExample() {
  const [sortFields, setSortFields] = React.useState(['department']);
  const [sortOrders, setSortOrders] = React.useState(['asc']);
  const [result, setResult] = React.useState(null);

  const employees = [
    { name: 'Alice', department: 'Engineering', salary: 80000 },
    { name: 'Bob', department: 'Sales', salary: 60000 },
    { name: 'Charlie', department: 'Engineering', salary: 75000 },
    { name: 'David', department: 'Sales', salary: 65000 },
  ];

  const handleSort = () => {
    const sorted = orderBy(employees, sortFields, sortOrders);
    setResult(sorted);
  };

  React.useEffect(() => {
    handleSort();
  }, [sortFields, sortOrders]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>orderBy 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>主排序字段: </label>
          <select
            value={sortFields[0]}
            onChange={(e) => setSortFields([e.target.value])}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="department">Department</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>排序顺序: </label>
          <select
            value={sortOrders[0]}
            onChange={(e) => setSortOrders([e.target.value])}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="asc">升序</option>
            <option value="desc">降序</option>
          </select>
        </div>
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

- ⚠️ **排序顺序数组**: 如果 `orders` 数组长度小于 `iteratees` 数组长度，不足部分默认为 `'asc'`
- ⚠️ **默认排序**: 如果不提供 `orders` 参数，所有字段默认升序排列
- 💡 **性能提示**: 时间复杂度为 O(n log n)，适合大数据集
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 对于复杂排序需求，`orderBy` 比 `sortBy` 更灵活

## 相关函数

- [`sortBy`](./sortBy) - 升序排序集合
- [`groupBy`](./groupBy) - 按条件分组集合
- [`partition`](./partition) - 按条件分割集合

## 版本历史

- **v1.0.0** - 初始版本
