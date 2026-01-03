---
id: sortBy
title: sortBy
description: '按条件将集合中的元素升序排列'
---

# `sortBy`

按条件将集合中的元素升序排列。支持单个或多个排序条件。

## 语法

```typescript
function sortBy<T>(collection: T[], iteratees: ((item: T) => any) | string | (((item: T) => any) | string)[]): T[];
```

## 参数

| 参数名       | 类型                                           | 必填 | 默认值 | 描述                 |
| ------------ | ---------------------------------------------- | ---- | ------ | -------------------- |
| `collection` | `T[]`                                          | ✅   | -      | 要排序的集合         |
| `iteratees`  | `(item: T) => any` \| `string` \| `Array<...>` | ✅   | -      | 单个或多个排序迭代器 |

## 返回值

- **类型**: `T[]`
- **描述**: 按升序排列的新数组

## 示例

### 基础用法

```typescript
import { sortBy } from '@rabjs/kit';

// 示例1: 按属性升序排列
const users = [
  { name: '张三', age: 30 },
  { name: '李四', age: 25 },
  { name: '王五', age: 35 },
];

const sortedByAge = sortBy(users, 'age');
console.log(sortedByAge);
// => [
//   { name: '李四', age: 25 },
//   { name: '张三', age: 30 },
//   { name: '王五', age: 35 }
// ]

// 示例2: 按函数结果排序
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const sortedByValue = sortBy(numbers, (n) => n);
console.log(sortedByValue);
// => [1, 1, 2, 3, 4, 5, 6, 9]
```

### 高级用法

```typescript
// 示例3: 多条件排序
const employees = [
  { name: '张三', department: '工程部', salary: 80000 },
  { name: '李四', department: '销售部', salary: 60000 },
  { name: '王五', department: '工程部', salary: 75000 },
  { name: '赵六', department: '销售部', salary: 65000 },
];

// 先按部门排序，再按工资排序
const sorted = sortBy(employees, ['department', 'salary']);
console.log(sorted);
// => [
//   { name: '王五', department: '工程部', salary: 75000 },
//   { name: '张三', department: '工程部', salary: 80000 },
//   { name: '李四', department: '销售部', salary: 60000 },
//   { name: '赵六', department: '销售部', salary: 65000 }
// ]
```

## 交互式示例

```tsx live
function SortByExample() {
  const [sortKey, setSortKey] = React.useState('age');
  const [result, setResult] = React.useState(null);

  const users = [
    { name: '张三', age: 28, salary: 80000 },
    { name: '李四', age: 35, salary: 60000 },
    { name: '王五', age: 25, salary: 75000 },
    { name: '赵六', age: 32, salary: 90000 },
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
          <option value="age">年龄 (升序)</option>
          <option value="salary">薪资 (升序)</option>
          <option value="name">姓名 (升序)</option>
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
- 💡 **性能提示**: 时间复杂度为 O(n log n)
- 📚 **最佳实践**: 对于需要指定升降序的排序，使用 `orderBy` 函数

## 相关函数

- [`orderBy`](./orderBy) - 支持指定升降序的排序
- [`groupBy`](./groupBy) - 按条件分组集合

## 版本历史

- **v0.0.1** - 初始版本
