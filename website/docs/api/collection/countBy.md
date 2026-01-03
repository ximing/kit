---
id: countBy
title: countBy
description: 'Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee, with counts'
---

# `countBy`

按条件对集合中的元素进行计数，返回一个对象，其中键是分组条件的结果，值是该组元素的个数。

## 语法

```typescript
function countBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string,
): Record<string | number, number>;
```

## 参数

| 参数名       | 类型                                                       | 必填 | 默认值 | 描述                           |
| ------------ | ---------------------------------------------------------- | ---- | ------ | ------------------------------ |
| `collection` | `T[]`                                                      | ✅   | -      | 要计数的集合                   |
| `iteratee`   | `(item: T, index: number) => string \| number` \| `string` | ✅   | -      | 分组迭代器，可以是函数或属性名 |

## 返回值

- **类型**: `Record<string | number, number>`
- **描述**: 一个对象，键为分组条件结果，值为对应组的元素个数

## 示例

### 基础用法

```typescript
import { countBy } from '@rabjs/kit';

// 示例1: 按属性计数
const users = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Sales' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'David', department: 'HR' },
];

const countByDept = countBy(users, 'department');
console.log(countByDept);
// => { Engineering: 2, Sales: 1, HR: 1 }

// 示例2: 按数值计数
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const countByOddEven = countBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));
console.log(countByOddEven);
// => { even: 5, odd: 5 }

// 示例3: 按字符串长度计数
const words = ['cat', 'dog', 'bird', 'elephant', 'butterfly'];
const countByLength = countBy(words, (word) => word.length);
console.log(countByLength);
// => { 3: 2, 4: 1, 8: 1, 9: 1 }
```

### 高级用法

```typescript
// 示例4: 按多条件计数
const products = [
  { name: 'Laptop', category: 'Electronics', price: 1200 },
  { name: 'Mouse', category: 'Electronics', price: 30 },
  { name: 'Shirt', category: 'Clothing', price: 50 },
  { name: 'Pants', category: 'Clothing', price: 80 },
];

const countByCategory = countBy(products, 'category');
console.log(countByCategory);
// => { Electronics: 2, Clothing: 2 }

// 按价格范围计数
const countByPriceRange = countBy(products, (item) => {
  if (item.price < 100) return 'cheap';
  if (item.price < 500) return 'medium';
  return 'expensive';
});
console.log(countByPriceRange);
// => { cheap: 3, expensive: 1 }

// 示例5: 按日期计数
const events = [
  { title: 'Meeting', date: '2024-01-15' },
  { title: 'Lunch', date: '2024-01-15' },
  { title: 'Conference', date: '2024-01-16' },
  { title: 'Workshop', date: '2024-01-16' },
  { title: 'Dinner', date: '2024-01-17' },
];

const countByDate = countBy(events, 'date');
console.log(countByDate);
// => { '2024-01-15': 2, '2024-01-16': 2, '2024-01-17': 1 }
```

### 实际应用场景

```typescript
// 示例6: 统计订单状态
interface Order {
  id: number;
  status: 'pending' | 'completed' | 'cancelled';
  amount: number;
}

const orders: Order[] = [
  { id: 1, status: 'completed', amount: 100 },
  { id: 2, status: 'pending', amount: 200 },
  { id: 3, status: 'completed', amount: 150 },
  { id: 4, status: 'cancelled', amount: 50 },
  { id: 5, status: 'completed', amount: 300 },
];

const orderStats = countBy(orders, 'status');
console.log(orderStats);
// => { completed: 3, pending: 1, cancelled: 1 }

// 统计订单金额范围
const amountStats = countBy(orders, (order) => {
  if (order.amount < 100) return 'small';
  if (order.amount < 200) return 'medium';
  return 'large';
});
console.log(amountStats);
// => { small: 1, medium: 2, large: 2 }

// 示例7: 统计用户活动
interface UserActivity {
  userId: number;
  action: 'login' | 'logout' | 'purchase' | 'view';
}

const activities: UserActivity[] = [
  { userId: 1, action: 'login' },
  { userId: 1, action: 'view' },
  { userId: 2, action: 'login' },
  { userId: 2, action: 'purchase' },
  { userId: 1, action: 'logout' },
];

const actionCounts = countBy(activities, 'action');
console.log(actionCounts);
// => { login: 2, view: 1, purchase: 1, logout: 1 }

// 示例8: 统计产品评分分布
interface Review {
  productId: number;
  rating: number; // 1-5
}

const reviews: Review[] = [
  { productId: 1, rating: 5 },
  { productId: 1, rating: 4 },
  { productId: 1, rating: 5 },
  { productId: 2, rating: 3 },
  { productId: 2, rating: 2 },
];

const ratingDistribution = countBy(reviews, 'rating');
console.log(ratingDistribution);
// => { 5: 2, 4: 1, 3: 1, 2: 1 }

// 统计高评分的百分比
const totalReviews = reviews.length;
const highRatings = (ratingDistribution[5] || 0) + (ratingDistribution[4] || 0);
const highRatingPercentage = ((highRatings / totalReviews) * 100).toFixed(2);
console.log(`高评分占比: ${highRatingPercentage}%`);
```

## 交互式示例

```tsx live
function CountByExample() {
  const [countKey, setCountKey] = React.useState('status');
  const [result, setResult] = React.useState(null);

  const orders = [
    { id: 1, status: 'completed', priority: 'high' },
    { id: 2, status: 'pending', priority: 'low' },
    { id: 3, status: 'completed', priority: 'high' },
    { id: 4, status: 'cancelled', priority: 'medium' },
    { id: 5, status: 'completed', priority: 'low' },
  ];

  const handleCountBy = () => {
    const counts = countBy(orders, countKey);
    setResult(counts);
  };

  React.useEffect(() => {
    handleCountBy();
  }, [countKey]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>countBy 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>计数字段: </label>
        <select
          value={countKey}
          onChange={(e) => setCountKey(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="status">Status</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
        {result && (
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <p>
              <strong>统计摘要:</strong>
            </p>
            {Object.entries(result).map(([key, count]) => (
              <p key={key}>
                {key}: {count} 项
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **键的类型**: 返回对象的键始终是字符串或数字类型
- ⚠️ **值的类型**: 返回值始终是非负整数
- 💡 **性能提示**: 时间复杂度为 O(n)，性能良好
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 用于统计和分析数据，比 `groupBy` 更轻量级

## 相关函数

- [`groupBy`](./groupBy) - 按条件分组集合并返回完整元素
- [`partition`](./partition) - 按条件分割集合为两部分
- [`keyBy`](./keyBy) - 按条件生成键值对对象

## 版本历史

- **v1.0.0** - 初始版本
