---
id: orderBy
title: orderBy
description: '按条件将集合中的元素排列，支持指定升序或降序'
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
  { name: '张三', age: 30 },
  { name: '李四', age: 25 },
  { name: '王五', age: 35 },
];

const sortedByAgeDesc = orderBy(users, 'age', ['desc']);
console.log(sortedByAgeDesc);
// => [
//   { name: '王五', age: 35 },
//   { name: '张三', age: 30 },
//   { name: '李四', age: 25 }
// ]
```

### 高级用法

```typescript
// 示例2: 多条件排序，不同顺序
const employees = [
  { name: '张三', department: '工程部', salary: 80000 },
  { name: '李四', department: '销售部', salary: 60000 },
  { name: '王五', department: '工程部', salary: 75000 },
  { name: '赵六', department: '销售部', salary: 65000 },
];

// 先按部门升序，再按工资降序
const sorted = orderBy(employees, ['department', 'salary'], ['asc', 'desc']);
console.log(sorted);
// => [
//   { name: '张三', department: '工程部', salary: 80000 },
//   { name: '王五', department: '工程部', salary: 75000 },
//   { name: '赵六', department: '销售部', salary: 65000 },
//   { name: '李四', department: '销售部', salary: 60000 }
// ]
```

## 交互式示例

```tsx live
function OrderByExample() {
  const [sortFields, setSortFields] = React.useState(['department']);
  const [sortOrders, setSortOrders] = React.useState(['asc']);
  const [result, setResult] = React.useState(null);

  const employees = [
    { name: '张三', department: '工程部', salary: 80000 },
    { name: '李四', department: '销售部', salary: 60000 },
    { name: '王五', department: '工程部', salary: 75000 },
    { name: '赵六', department: '销售部', salary: 65000 },
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
            <option value="department">部门</option>
            <option value="salary">薪资</option>
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
- 💡 **性能提示**: 时间复杂度为 O(n log n)
- 📚 **最佳实践**: 对于复杂排序需求，`orderBy` 比 `sortBy` 更灵活

## 相关函数

- [`sortBy`](./sortBy) - 升序排序集合
- [`groupBy`](./groupBy) - 按条件分组集合

## 版本历史

- **v0.0.1** - 初始版本
