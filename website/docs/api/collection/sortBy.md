---
id: sortBy
title: sortBy
description: 'Creates an array of elements sorted in ascending order by the results of running each element thru iteratee'
---

# `sortBy`

按条件将集合中的元素升序排列。支持单个或多个排序条件。

## 语法

```typescript
function sortBy<T>(collection: T[], iteratees: ((item: T) => any) | string | (((item: T) => any) | string)[]): T[];
```

## 参数

| 参数名       | 类型                                           | 必填 | 默认值 | 描述                                     |
| ------------ | ---------------------------------------------- | ---- | ------ | ---------------------------------------- |
| `collection` | `T[]`                                          | ✅   | -      | 要排序的集合                             |
| `iteratees`  | `(item: T) => any` \| `string` \| `Array<...>` | ✅   | -      | 单个或多个排序迭代器，可以是函数或属性名 |

## 返回值

- **类型**: `T[]`
- **描述**: 按升序排列的新数组

## 示例

### 基础用法

```typescript
import { sortBy } from '@rabjs/kit';

// 示例1: 按属性升序排列
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
];

const sortedByAge = sortBy(users, 'age');
console.log(sortedByAge);
// => [
//   { name: 'Jane', age: 25 },
//   { name: 'John', age: 30 },
//   { name: 'Bob', age: 35 }
// ]

// 示例2: 按函数结果排序
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const sortedByValue = sortBy(numbers, (n) => n);
console.log(sortedByValue);
// => [1, 1, 2, 3, 4, 5, 6, 9]

// 示例3: 按字符串长度排序
const words = ['elephant', 'cat', 'dog', 'bird', 'butterfly'];
const sortedByLength = sortBy(words, (word) => word.length);
console.log(sortedByLength);
// => ['cat', 'dog', 'bird', 'elephant', 'butterfly']
```

### 高级用法

```typescript
// 示例4: 多条件排序
const employees = [
  { name: 'Alice', department: 'Engineering', salary: 80000 },
  { name: 'Bob', department: 'Sales', salary: 60000 },
  { name: 'Charlie', department: 'Engineering', salary: 75000 },
  { name: 'David', department: 'Sales', salary: 65000 },
];

// 先按部门排序，再按工资排序
const sorted = sortBy(employees, ['department', 'salary']);
console.log(sorted);
// => [
//   { name: 'Charlie', department: 'Engineering', salary: 75000 },
//   { name: 'Alice', department: 'Engineering', salary: 80000 },
//   { name: 'Bob', department: 'Sales', salary: 60000 },
//   { name: 'David', department: 'Sales', salary: 65000 }
// ]

// 示例5: 按计算值排序
const products = [
  { name: 'Laptop', price: 1200, stock: 5 },
  { name: 'Mouse', price: 30, stock: 100 },
  { name: 'Monitor', price: 300, stock: 20 },
];

// 按库存价值排序（价格 * 库存）
const sortedByValue = sortBy(products, (item) => item.price * item.stock);
console.log(sortedByValue);
// => [
//   { name: 'Mouse', price: 30, stock: 100 },
//   { name: 'Monitor', price: 300, stock: 20 },
//   { name: 'Laptop', price: 1200, stock: 5 }
// ]
```

### 实际应用场景

```typescript
// 示例6: 按日期排序事件
interface Event {
  title: string;
  date: Date;
  priority: number;
}

const events: Event[] = [
  { title: 'Meeting', date: new Date('2024-01-20'), priority: 2 },
  { title: 'Conference', date: new Date('2024-01-15'), priority: 1 },
  { title: 'Lunch', date: new Date('2024-01-18'), priority: 3 },
];

const sortedEvents = sortBy(events, 'date');
console.log(sortedEvents);
// Events sorted chronologically

// 示例7: 排序搜索结果（按相关性和日期）
interface SearchResult {
  title: string;
  relevanceScore: number;
  publishedDate: Date;
}

const results: SearchResult[] = [
  { title: 'Article 1', relevanceScore: 0.8, publishedDate: new Date('2024-01-10') },
  { title: 'Article 2', relevanceScore: 0.9, publishedDate: new Date('2024-01-05') },
  { title: 'Article 3', relevanceScore: 0.9, publishedDate: new Date('2024-01-15') },
];

// 按相关性分数和发布日期排序
const sortedResults = sortBy(results, [
  (r) => -r.relevanceScore, // 降序相关性（通过取负）
  'publishedDate', // 升序日期
]);
```

## 交互式示例

```tsx live
function SortByExample() {
  const [sortKey, setSortKey] = React.useState('age');
  const [result, setResult] = React.useState(null);

  const users = [
    { name: 'Alice', age: 28, salary: 80000 },
    { name: 'Bob', age: 35, salary: 60000 },
    { name: 'Charlie', age: 25, salary: 75000 },
    { name: 'David', age: 32, salary: 90000 },
  ];

  const handleSort = () => {
    const sorted = sortBy(users, sortKey);
    setResult(sorted);
  };

  React.useEffect(() => {
    handleSort();
  }, [sortKey]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>sortBy 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>排序字段: </label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="age">Age (升序)</option>
          <option value="salary">Salary (升序)</option>
          <option value="name">Name (升序)</option>
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

- ⚠️ **排序顺序**: 默认升序排列，如需降序请使用 `orderBy`
- ⚠️ **多条件排序**: 按照提供的迭代器顺序依次排序
- 💡 **性能提示**: 时间复杂度为 O(n log n)，适合大数据集
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 对于需要指定升降序的排序，使用 `orderBy` 函数

## 相关函数

- [`orderBy`](./orderBy) - 支持指定升降序的排序
- [`groupBy`](./groupBy) - 按条件分组集合
- [`partition`](./partition) - 按条件分割集合

## 版本历史

- **v0.0.1** - 初始版本
