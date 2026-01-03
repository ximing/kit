---
id: minBy
title: minBy
description: '根据迭代函数获取数组中具有最小值的元素'
---

# `minBy`

根据迭代函数获取数组中具有最小值的元素。这个函数类似于 `min`，但允许你指定一个函数来生成用于比较的值。

## 语法

```typescript
function minBy<T>(array: T[], iteratee: (item: T) => number): T | undefined;
```

## 参数

| 参数名     | 类型                  | 必填 | 默认值 | 描述                                       |
| ---------- | --------------------- | ---- | ------ | ------------------------------------------ |
| `array`    | `T[]`                 | ✅   | -      | 要迭代的数组                               |
| `iteratee` | `(item: T) => number` | ✅   | -      | 每个元素调用的迭代函数，返回用于比较的数值 |

## 返回值

- **类型**: `T | undefined`
- **描述**: 返回具有最小值的元素。如果数组为空或无效，返回 `undefined`

## 示例

### 基础用法

```typescript
import { minBy } from '@rabjs/kit';

// 示例1: 对象数组 - 按属性查找
const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
  { name: '王五', age: 28 },
];
const youngest = minBy(users, (user) => user.age);
console.log(youngest); // { name: '张三', age: 25 }

// 示例2: 按计算值查找
const numbers = [{ value: -5 }, { value: 3 }, { value: -8 }];
const minAbsolute = minBy(numbers, (item) => Math.abs(item.value));
console.log(minAbsolute); // { value: 3 }

// 示例3: 空数组
console.log(minBy([], (x) => x.value)); // undefined
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

// 按折扣后价格查找最便宜的
const cheapest = minBy(products, (p) => p.pricing.base - p.pricing.discount);
console.log(cheapest?.name); // '平板'

// 示例5: 字符串长度比较
const words = ['猫', '大象', '狗', '蝴蝶'];
const shortestWord = minBy(words, (word) => word.length);
console.log(shortestWord); // '猫'

// 示例6: 日期比较
const events = [
  { name: '活动A', date: new Date('2024-01-15') },
  { name: '活动B', date: new Date('2024-03-20') },
  { name: '活动C', date: new Date('2024-02-10') },
];
const earliestEvent = minBy(events, (event) => event.date.getTime());
console.log(earliestEvent?.name); // '活动A'
```

### 实际应用场景

```typescript
// 示例7: 找出价格最低的商品
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: '1', name: '商品A', price: 29.99, stock: 50 },
  { id: '2', name: '商品B', price: 19.99, stock: 30 },
  { id: '3', name: '商品C', price: 39.99, stock: 20 },
];

const cheapestProduct = minBy(products, (p) => p.price);
console.log(`最便宜: ${cheapestProduct?.name} - ¥${cheapestProduct?.price}`);
// 最便宜: 商品B - ¥19.99

// 示例8: 任务调度 - 选择负载最低的服务器
interface Server {
  id: string;
  hostname: string;
  activeConnections: number;
  cpuUsage: number;
}

const servers: Server[] = [
  { id: 's1', hostname: 'server-1', activeConnections: 120, cpuUsage: 65 },
  { id: 's2', hostname: 'server-2', activeConnections: 80, cpuUsage: 45 },
  { id: 's3', hostname: 'server-3', activeConnections: 150, cpuUsage: 70 },
];

const leastLoadedByCpu = minBy(servers, (s) => s.cpuUsage);
const leastLoadedByConns = minBy(servers, (s) => s.activeConnections);

console.log(`CPU 使用率最低: ${leastLoadedByCpu?.hostname}`); // server-2
console.log(`连接数最少: ${leastLoadedByConns?.hostname}`); // server-2

// 示例9: 学生成绩分析 - 找出需要帮助的学生
interface StudentScore {
  studentId: string;
  name: string;
  scores: number[];
}

const students: StudentScore[] = [
  { studentId: '1', name: '张三', scores: [85, 90, 88, 92] },
  { studentId: '2', name: '李四', scores: [78, 82, 75, 80] },
  { studentId: '3', name: '王五', scores: [92, 95, 90, 94] },
];

// 找出平均分最低的学生
const strugglingStudent = minBy(students, (student) => {
  const sum = student.scores.reduce((a, b) => a + b, 0);
  return sum / student.scores.length;
});

console.log(`需要帮助的学生: ${strugglingStudent?.name}`); // 李四

// 示例10: 路径优化 - 选择最短路径
interface Route {
  name: string;
  waypoints: Array<{ lat: number; lng: number }>;
}

function calculateDistance(waypoints: Array<{ lat: number; lng: number }>): number {
  // 简化的距离计算
  let distance = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const dx = waypoints[i].lat - waypoints[i - 1].lat;
    const dy = waypoints[i].lng - waypoints[i - 1].lng;
    distance += Math.sqrt(dx * dx + dy * dy);
  }
  return distance;
}

const routes: Route[] = [
  {
    name: '路线A',
    waypoints: [
      { lat: 0, lng: 0 },
      { lat: 3, lng: 4 },
    ],
  },
  {
    name: '路线B',
    waypoints: [
      { lat: 0, lng: 0 },
      { lat: 1, lng: 1 },
      { lat: 3, lng: 4 },
    ],
  },
  {
    name: '路线C',
    waypoints: [
      { lat: 0, lng: 0 },
      { lat: 5, lng: 0 },
      { lat: 5, lng: 5 },
    ],
  },
];

const shortestRoute = minBy(routes, (route) => calculateDistance(route.waypoints));
console.log(`最短路线: ${shortestRoute?.name}`);
```

## 交互式示例

```tsx live
function MinByExample() {
  const [products] = React.useState([
    { name: '笔记本电脑', price: 999 },
    { name: '手机', price: 699 },
    { name: '平板', price: 499 },
    { name: '耳机', price: 199 },
  ]);

  const cheapest = minBy(products, (p) => p.price);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>minBy 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <strong>商品列表:</strong>
        <div style={{ marginTop: '10px' }}>
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '5px 0',
                background: product === cheapest ? '#e8f5e9' : 'white',
                borderRadius: '4px',
                border: product === cheapest ? '2px solid #4caf50' : '1px solid #ddd',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{product.name}</span>
              <span style={{ float: 'right', color: '#4caf50' }}>¥{product.price}</span>
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
        <strong>最便宜的商品:</strong>
        <div style={{ fontSize: '18px', color: '#4caf50', marginTop: '10px' }}>
          {cheapest ? `${cheapest.name} (¥${cheapest.price})` : 'N/A'}
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
- ⚡ **多个最小值**: 如果有多个元素具有相同的最小值，返回第一个遇到的元素

## 相关函数

- [`min`](./min) - 计算数组中的最小值
- [`maxBy`](./maxBy) - 按条件获取数组中的最大项
- [`sortBy`](../collection/sortBy) - 按条件对数组排序
- [`orderBy`](../collection/orderBy) - 按多个条件排序

## 版本历史

- **v1.0.0** - 初始版本
