---
id: groupBy
title: groupBy
description: 'Groups the elements of a collection by the results of running each element thru iteratee'
---

# `groupBy`

按条件将集合中的元素分组，返回一个对象，其中键是分组条件的结果，值是属于该组的元素数组。

## 语法

```typescript
function groupBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string,
): Record<string | number, T[]>;
```

## 参数

| 参数名       | 类型                                                       | 必填 | 默认值 | 描述                                 |
| ------------ | ---------------------------------------------------------- | ---- | ------ | ------------------------------------ |
| `collection` | `T[]`                                                      | ✅   | -      | 要分组的集合                         |
| `iteratee`   | `(item: T, index: number) => string \| number` \| `string` | ✅   | -      | 分组迭代器，可以是函数或属性名字符串 |

## 返回值

- **类型**: `Record<string | number, T[]>`
- **描述**: 一个对象，键为分组条件结果，值为对应组的元素数组

## 示例

### 基础用法

```typescript
import { groupBy } from '@rabjs/kit';

// 示例1: 按属性分组
const users = [
  { id: 1, name: 'Alice', department: 'Engineering' },
  { id: 2, name: 'Bob', department: 'Sales' },
  { id: 3, name: 'Charlie', department: 'Engineering' },
  { id: 4, name: 'David', department: 'HR' },
];

const groupedByDept = groupBy(users, 'department');
console.log(groupedByDept);
// => {
//   Engineering: [
//     { id: 1, name: 'Alice', department: 'Engineering' },
//     { id: 3, name: 'Charlie', department: 'Engineering' }
//   ],
//   Sales: [{ id: 2, name: 'Bob', department: 'Sales' }],
//   HR: [{ id: 4, name: 'David', department: 'HR' }]
// }

// 示例2: 按数字属性分组
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 30 },
  { name: 'Monitor', price: 300 },
  { name: 'Keyboard', price: 80 },
];

const groupedByPrice = groupBy(products, (item) => (item.price > 100 ? 'expensive' : 'cheap'));
console.log(groupedByPrice);
// => {
//   expensive: [
//     { name: 'Laptop', price: 1200 },
//     { name: 'Monitor', price: 300 }
//   ],
//   cheap: [
//     { name: 'Mouse', price: 30 },
//     { name: 'Keyboard', price: 80 }
//   ]
// }
```

### 高级用法

```typescript
// 示例3: 按多条件分组
const orders = [
  { id: 1, status: 'completed', amount: 100 },
  { id: 2, status: 'pending', amount: 200 },
  { id: 3, status: 'completed', amount: 150 },
  { id: 4, status: 'cancelled', amount: 50 },
];

const groupedByStatus = groupBy(orders, 'status');
const completedCount = groupedByStatus['completed'].length; // 2

// 示例4: 按日期分组
const events = [
  { title: 'Meeting', date: '2024-01-15' },
  { title: 'Lunch', date: '2024-01-15' },
  { title: 'Conference', date: '2024-01-16' },
];

const groupedByDate = groupBy(events, 'date');
console.log(groupedByDate);
// => {
//   '2024-01-15': [
//     { title: 'Meeting', date: '2024-01-15' },
//     { title: 'Lunch', date: '2024-01-15' }
//   ],
//   '2024-01-16': [{ title: 'Conference', date: '2024-01-16' }]
// }

// 示例5: 按计算结果分组
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const groupedByOddEven = groupBy(numbers, (num) => (num % 2 === 0 ? 'even' : 'odd'));
console.log(groupedByOddEven);
// => {
//   odd: [1, 3, 5, 7, 9],
//   even: [2, 4, 6, 8, 10]
// }
```

### 实际应用场景

```typescript
// 示例6: 按类别统计商品库存
interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: 'iPhone', category: 'Electronics', stock: 50 },
  { id: 2, name: 'Headphones', category: 'Electronics', stock: 120 },
  { id: 3, name: 'Shirt', category: 'Clothing', stock: 200 },
  { id: 4, name: 'Pants', category: 'Clothing', stock: 150 },
];

const inventoryByCategory = groupBy(products, 'category');

// 计算每个类别的总库存
const categoryStats = Object.entries(inventoryByCategory).map(([category, items]) => ({
  category,
  totalStock: items.reduce((sum, item) => sum + item.stock, 0),
  itemCount: items.length,
}));

console.log(categoryStats);
// => [
//   { category: 'Electronics', totalStock: 170, itemCount: 2 },
//   { category: 'Clothing', totalStock: 350, itemCount: 2 }
// ]

// 示例7: 按时间段分组用户活动
interface UserActivity {
  userId: number;
  action: string;
  timestamp: Date;
}

const activities: UserActivity[] = [
  { userId: 1, action: 'login', timestamp: new Date('2024-01-15 08:00') },
  { userId: 2, action: 'login', timestamp: new Date('2024-01-15 09:00') },
  { userId: 1, action: 'logout', timestamp: new Date('2024-01-15 17:00') },
];

const activitiesByUser = groupBy(activities, 'userId');
console.log(activitiesByUser);
// => {
//   '1': [
//     { userId: 1, action: 'login', timestamp: ... },
//     { userId: 1, action: 'logout', timestamp: ... }
//   ],
//   '2': [{ userId: 2, action: 'login', timestamp: ... }]
// }
```

## 交互式示例

```tsx live
function GroupByExample() {
  const [groupKey, setGroupKey] = React.useState('department');
  const [result, setResult] = React.useState(null);

  const users = [
    { id: 1, name: 'Alice', department: 'Engineering', level: 'Senior' },
    { id: 2, name: 'Bob', department: 'Sales', level: 'Junior' },
    { id: 3, name: 'Charlie', department: 'Engineering', level: 'Junior' },
    { id: 4, name: 'David', department: 'HR', level: 'Senior' },
  ];

  const handleGroupBy = () => {
    const grouped = groupBy(users, groupKey);
    setResult(grouped);
  };

  React.useEffect(() => {
    handleGroupBy();
  }, [groupKey]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>groupBy 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>分组键: </label>
        <select
          value={groupKey}
          onChange={(e) => setGroupKey(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="department">Department</option>
          <option value="level">Level</option>
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

- ⚠️ **键的类型**: 返回对象的键始终是字符串或数字类型
- ⚠️ **迭代器函数**: 当使用函数作为迭代器时，确保返回值是字符串或数字
- 💡 **性能提示**: 对于大集合，该函数具有 O(n) 时间复杂度
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 使用属性名字符串比函数更简洁，当只需要简单属性分组时

## 相关函数

- [`partition`](./partition) - 按条件将集合分为两部分
- [`countBy`](./countBy) - 按条件计数分组
- [`keyBy`](./keyBy) - 按条件生成键值对对象
- [`sortBy`](./sortBy) - 按条件排序集合

## 版本历史

- **v1.0.0** - 初始版本
