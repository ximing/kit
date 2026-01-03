---
id: countBy
title: countBy
description: '按条件对集合中的元素进行计数'
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

| 参数名       | 类型                                                       | 必填 | 默认值 | 描述         |
| ------------ | ---------------------------------------------------------- | ---- | ------ | ------------ |
| `collection` | `T[]`                                                      | ✅   | -      | 要计数的集合 |
| `iteratee`   | `(item: T, index: number) => string \| number` \| `string` | ✅   | -      | 分组迭代器   |

## 返回值

- **类型**: `Record<string | number, number>`
- **描述**: 一个对象，键为分组条件结果，值为对应组的元素个数

## 示例

### 基础用法

```typescript
import { countBy } from '@rabjs/kit';

// 示例1: 按属性计数
const users = [
  { name: '张三', department: '工程部' },
  { name: '李四', department: '销售部' },
  { name: '王五', department: '工程部' },
  { name: '赵六', department: '人力资源部' },
];

const countByDept = countBy(users, 'department');
console.log(countByDept);
// => { 工程部: 2, 销售部: 1, 人力资源部: 1 }

// 示例2: 按奇偶性计数
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const countByOddEven = countBy(numbers, (n) => (n % 2 === 0 ? '偶数' : '奇数'));
console.log(countByOddEven);
// => { 偶数: 5, 奇数: 5 }
```

### 高级用法

```typescript
// 示例3: 按多条件计数
const products = [
  { name: '笔记本电脑', category: '电子产品', price: 1200 },
  { name: '鼠标', category: '电子产品', price: 30 },
  { name: '衣服', category: '服装', price: 50 },
  { name: '裤子', category: '服装', price: 80 },
];

const countByCategory = countBy(products, 'category');
console.log(countByCategory);
// => { 电子产品: 2, 服装: 2 }

// 按价格范围计数
const countByPriceRange = countBy(products, (item) => {
  if (item.price < 100) return '便宜';
  if (item.price < 500) return '中等';
  return '贵';
});
console.log(countByPriceRange);
// => { 便宜: 3, 贵: 1 }
```

## 交互式示例

```tsx live
function CountByExample() {
  const [countKey, setCountKey] = React.useState('status');
  const [result, setResult] = React.useState(null);

  const orders = [
    { id: 1, status: '已完成', priority: '高' },
    { id: 2, status: '待处理', priority: '低' },
    { id: 3, status: '已完成', priority: '高' },
    { id: 4, status: '已取消', priority: '中' },
    { id: 5, status: '已完成', priority: '低' },
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
          <option value="status">状态</option>
          <option value="priority">优先级</option>
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
- 💡 **性能提示**: 时间复杂度为 O(n)
- 📚 **最佳实践**: 用于统计和分析数据，比 `groupBy` 更轻量级

## 相关函数

- [`groupBy`](./groupBy) - 按条件分组集合
- [`partition`](./partition) - 按条件分割集合为两部分

## 版本历史

- **v0.0.1** - 初始版本
