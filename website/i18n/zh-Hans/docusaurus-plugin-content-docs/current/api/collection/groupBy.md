---
id: groupBy
title: groupBy
description: '按条件将集合中的元素分组'
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
  { id: 1, name: '张三', department: '工程部' },
  { id: 2, name: '李四', department: '销售部' },
  { id: 3, name: '王五', department: '工程部' },
  { id: 4, name: '赵六', department: '人力资源部' },
];

const groupedByDept = groupBy(users, 'department');
console.log(groupedByDept);
// => {
//   工程部: [
//     { id: 1, name: '张三', department: '工程部' },
//     { id: 3, name: '王五', department: '工程部' }
//   ],
//   销售部: [{ id: 2, name: '李四', department: '销售部' }],
//   人力资源部: [{ id: 4, name: '赵六', department: '人力资源部' }]
// }

// 示例2: 按数字属性分组
const products = [
  { name: '笔记本电脑', price: 1200 },
  { name: '鼠标', price: 30 },
  { name: '显示器', price: 300 },
  { name: '键盘', price: 80 },
];

const groupedByPrice = groupBy(products, (item) => (item.price > 100 ? '贵' : '便宜'));
console.log(groupedByPrice);
// => {
//   贵: [
//     { name: '笔记本电脑', price: 1200 },
//     { name: '显示器', price: 300 }
//   ],
//   便宜: [
//     { name: '鼠标', price: 30 },
//     { name: '键盘', price: 80 }
//   ]
// }
```

### 高级用法

```typescript
// 示例3: 按多条件分组
const orders = [
  { id: 1, status: '已完成', amount: 100 },
  { id: 2, status: '待处理', amount: 200 },
  { id: 3, status: '已完成', amount: 150 },
  { id: 4, status: '已取消', amount: 50 },
];

const groupedByStatus = groupBy(orders, 'status');
const completedCount = groupedByStatus['已完成'].length; // 2

// 示例4: 按日期分组
const events = [
  { title: '会议', date: '2024-01-15' },
  { title: '午餐', date: '2024-01-15' },
  { title: '会议', date: '2024-01-16' },
];

const groupedByDate = groupBy(events, 'date');
console.log(groupedByDate);
// => {
//   '2024-01-15': [
//     { title: '会议', date: '2024-01-15' },
//     { title: '午餐', date: '2024-01-15' }
//   ],
//   '2024-01-16': [{ title: '会议', date: '2024-01-16' }]
// }

// 示例5: 按计算结果分组
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const groupedByOddEven = groupBy(numbers, (num) => (num % 2 === 0 ? '偶数' : '奇数'));
console.log(groupedByOddEven);
// => {
//   奇数: [1, 3, 5, 7, 9],
//   偶数: [2, 4, 6, 8, 10]
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
  { id: 1, name: 'iPhone', category: '电子产品', stock: 50 },
  { id: 2, name: '耳机', category: '电子产品', stock: 120 },
  { id: 3, name: '衣服', category: '服装', stock: 200 },
  { id: 4, name: '裤子', category: '服装', stock: 150 },
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
//   { category: '电子产品', totalStock: 170, itemCount: 2 },
//   { category: '服装', totalStock: 350, itemCount: 2 }
// ]
```

## 交互式示例

```tsx live
function GroupByExample() {
  const [groupKey, setGroupKey] = React.useState('department');
  const [result, setResult] = React.useState(null);

  const users = [
    { id: 1, name: '张三', department: '工程部', level: '高级' },
    { id: 2, name: '李四', department: '销售部', level: '初级' },
    { id: 3, name: '王五', department: '工程部', level: '初级' },
    { id: 4, name: '赵六', department: '人力资源部', level: '高级' },
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
          <option value="department">部门</option>
          <option value="level">级别</option>
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
