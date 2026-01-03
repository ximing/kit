---
id: maxBy
title: maxBy
description: '根据迭代函数获取数组中具有最大值的元素'
---

# `maxBy`

根据迭代函数获取数组中具有最大值的元素。这个函数类似于 `max`，但允许你指定一个函数来生成用于比较的值。

## 语法

```typescript
function maxBy<T>(array: T[], iteratee: (item: T) => number): T | undefined;
```

## 参数

| 参数名     | 类型                  | 必填 | 默认值 | 描述                                       |
| ---------- | --------------------- | ---- | ------ | ------------------------------------------ |
| `array`    | `T[]`                 | ✅   | -      | 要迭代的数组                               |
| `iteratee` | `(item: T) => number` | ✅   | -      | 每个元素调用的迭代函数，返回用于比较的数值 |

## 返回值

- **类型**: `T | undefined`
- **描述**: 返回具有最大值的元素。如果数组为空或无效，返回 `undefined`

## 示例

### 基础用法

```typescript
import { maxBy } from '@rabjs/kit';

// 示例1: 对象数组 - 按属性查找
const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
  { name: '王五', age: 28 },
];
const oldest = maxBy(users, (user) => user.age);
console.log(oldest); // { name: '李四', age: 30 }

// 示例2: 按计算值查找
const numbers = [{ value: -5 }, { value: 3 }, { value: -8 }];
const maxAbsolute = maxBy(numbers, (item) => Math.abs(item.value));
console.log(maxAbsolute); // { value: -8 }

// 示例3: 空数组
console.log(maxBy([], (x) => x.value)); // undefined
```

### 高级用法

```typescript
// 示例4: 多层嵌套对象
interface Product {
  name: string;
  pricing: {
    base: number;
    discount: number;
  };
}

const products: Product[] = [
  { name: '笔记本电脑', pricing: { base: 1000, discount: 100 } },
  { name: '手机', pricing: { base: 800, discount: 50 } },
  { name: '平板', pricing: { base: 600, discount: 80 } },
];

// 按折扣后价格查找最贵的
const mostExpensive = maxBy(products, (p) => p.pricing.base - p.pricing.discount);
console.log(mostExpensive?.name); // '笔记本电脑'

// 示例5: 字符串长度比较
const words = ['猫', '大象', '狗', '蝴蝶'];
const longestWord = maxBy(words, (word) => word.length);
console.log(longestWord); // '蝴蝶'

// 示例6: 日期比较
const events = [
  { name: '活动A', date: new Date('2024-01-15') },
  { name: '活动B', date: new Date('2024-03-20') },
  { name: '活动C', date: new Date('2024-02-10') },
];
const latestEvent = maxBy(events, (event) => event.date.getTime());
console.log(latestEvent?.name); // '活动B'
```

### 实际应用场景

```typescript
// 示例7: 找出最高分的学生
interface Student {
  id: string;
  name: string;
  scores: {
    math: number;
    english: number;
    science: number;
  };
}

const students: Student[] = [
  { id: '1', name: '张三', scores: { math: 85, english: 90, science: 88 } },
  { id: '2', name: '李四', scores: { math: 92, english: 85, science: 90 } },
  { id: '3', name: '王五', scores: { math: 78, english: 95, science: 85 } },
];

// 按总分查找
const topStudent = maxBy(students, (student) => {
  const { math, english, science } = student.scores;
  return math + english + science;
});
console.log(`最高分学生: ${topStudent?.name}`); // 最高分学生: 李四

// 示例8: 电商场景 - 找出最畅销的商品
interface SalesData {
  productId: string;
  productName: string;
  unitsSold: number;
  revenue: number;
}

const salesData: SalesData[] = [
  { productId: 'P1', productName: '商品A', unitsSold: 150, revenue: 3000 },
  { productId: 'P2', productName: '商品B', unitsSold: 200, revenue: 5000 },
  { productId: 'P3', productName: '商品C', unitsSold: 100, revenue: 4000 },
];

const bestSellingByUnits = maxBy(salesData, (item) => item.unitsSold);
const bestSellingByRevenue = maxBy(salesData, (item) => item.revenue);

console.log(`销量最高: ${bestSellingByUnits?.productName}`); // 商品B
console.log(`收入最高: ${bestSellingByRevenue?.productName}`); // 商品B

// 示例9: 性能监控 - 找出最慢的请求
interface RequestLog {
  endpoint: string;
  duration: number;
  timestamp: Date;
}

const requests: RequestLog[] = [
  { endpoint: '/api/users', duration: 120, timestamp: new Date() },
  { endpoint: '/api/products', duration: 350, timestamp: new Date() },
  { endpoint: '/api/orders', duration: 280, timestamp: new Date() },
];

const slowestRequest = maxBy(requests, (req) => req.duration);
if (slowestRequest && slowestRequest.duration > 300) {
  console.log(`警告: 慢接口 ${slowestRequest.endpoint} (${slowestRequest.duration}ms)`);
}
```

## 交互式示例

```tsx live
function MaxByExample() {
  const [students] = React.useState([
    { name: '张三', score: 85 },
    { name: '李四', score: 92 },
    { name: '王五', score: 78 },
    { name: '赵六', score: 88 },
  ]);

  const topStudent = maxBy(students, (s) => s.score);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>maxBy 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <strong>学生列表:</strong>
        <div style={{ marginTop: '10px' }}>
          {students.map((student, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '5px 0',
                background: student === topStudent ? '#e3f2fd' : 'white',
                borderRadius: '4px',
                border: student === topStudent ? '2px solid #1976d2' : '1px solid #ddd',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{student.name}</span>
              <span style={{ float: 'right', color: '#1976d2' }}>分数: {student.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: 'white',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '15px',
        }}
      >
        <strong>最高分学生:</strong>
        <div style={{ fontSize: '18px', color: '#1976d2', marginTop: '10px' }}>
          {topStudent ? `${topStudent.name} (${topStudent.score}分)` : 'N/A'}
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 当数组为空时，函数返回 `undefined`
- ⚠️ **边界情况**: 当参数不是数组时，函数返回 `undefined`
- 💡 **性能提示**: 函数时间复杂度为 O(n)，遍历数组一次
- 🔒 **类型安全**: 使用泛型 `<T>` 保证输入和输出类型一致
- 📚 **最佳实践**: iteratee 函数应该返回数字类型，确保可比较性
- 🎯 **返回值**: 返回的是原数组中的元素，不是计算后的值
- ⚡ **多个最大值**: 如果有多个元素具有相同的最大值，返回第一个遇到的元素

## 相关函数

- [`max`](./max) - 计算数组中的最大值
- [`minBy`](./minBy) - 按条件获取数组中的最小项
- [`sortBy`](../collection/sortBy) - 按条件对数组排序
- [`orderBy`](../collection/orderBy) - 按多个条件排序

## 版本历史

- **v1.0.0** - 初始版本
