---
id: partition
title: partition
description: '按条件将集合分为两组'
---

# `partition`

按条件将集合分为两组，第一组包含满足条件的元素，第二组包含不满足条件的元素。

## 语法

```typescript
function partition<T>(collection: T[], predicate: ((item: T, index: number) => boolean) | string): [T[], T[]];
```

## 参数

| 参数名       | 类型                                              | 必填 | 默认值 | 描述                 |
| ------------ | ------------------------------------------------- | ---- | ------ | -------------------- |
| `collection` | `T[]`                                             | ✅   | -      | 要分割的集合         |
| `predicate`  | `(item: T, index: number) => boolean` \| `string` | ✅   | -      | 条件函数或布尔属性名 |

## 返回值

- **类型**: `[T[], T[]]`
- **描述**: 一个包含两个数组的元组，第一个是满足条件的元素，第二个是不满足条件的元素

## 示例

### 基础用法

```typescript
import { partition } from '@rabjs/kit';

// 示例1: 按属性分割
const users = [
  { name: '张三', active: true },
  { name: '李四', active: false },
  { name: '王五', active: true },
  { name: '赵六', active: false },
];

const [activeUsers, inactiveUsers] = partition(users, 'active');
console.log(activeUsers);
// => [{ name: '张三', active: true }, { name: '王五', active: true }]
console.log(inactiveUsers);
// => [{ name: '李四', active: false }, { name: '赵六', active: false }]

// 示例2: 按函数条件分割
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [evenNumbers, oddNumbers] = partition(numbers, (n) => n % 2 === 0);
console.log(evenNumbers);
// => [2, 4, 6, 8, 10]
console.log(oddNumbers);
// => [1, 3, 5, 7, 9]
```

### 高级用法

```typescript
// 示例3: 分割订单
const orders = [
  { id: 1, status: '已完成', amount: 100 },
  { id: 2, status: '待处理', amount: 200 },
  { id: 3, status: '已完成', amount: 150 },
  { id: 4, status: '已取消', amount: 50 },
];

// 分离已完成和未完成的订单
const [completed, notCompleted] = partition(orders, (order) => order.status === '已完成');
console.log(completed);
// => [{ id: 1, status: '已完成', amount: 100 }, { id: 3, status: '已完成', amount: 150 }]
```

## 交互式示例

```tsx live
function PartitionExample() {
  const [conditionType, setConditionType] = React.useState('active');
  const [result, setResult] = React.useState(null);

  const users = [
    { id: 1, name: '张三', active: true, role: '管理员' },
    { id: 2, name: '李四', active: false, role: '用户' },
    { id: 3, name: '王五', active: true, role: '用户' },
    { id: 4, name: '赵六', active: false, role: '管理员' },
  ];

  const handlePartition = () => {
    let partitioned;
    if (conditionType === 'active') {
      partitioned = partition(users, 'active');
    } else if (conditionType === 'admin') {
      partitioned = partition(users, (u) => u.role === '管理员');
    }
    setResult(partitioned);
  };

  React.useEffect(() => {
    handlePartition();
  }, [conditionType]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>partition 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>分割条件: </label>
        <select
          value={conditionType}
          onChange={(e) => setConditionType(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="active">活跃用户</option>
          <option value="admin">管理员</option>
        </select>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', maxHeight: '300px' }}>
          {result &&
            JSON.stringify(
              {
                trueGroup: result[0],
                falseGroup: result[1],
              },
              null,
              2,
            )}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **返回结构**: 总是返回两个数组的元组，即使其中一个为空
- 💡 **性能提示**: 时间复杂度为 O(n)
- 📚 **最佳实践**: 使用解构赋值获取两个分组，代码更清晰

## 相关函数

- [`groupBy`](./groupBy) - 按条件分组集合
- [`sortBy`](./sortBy) - 按条件排序集合

## 版本历史

- **v0.0.1** - 初始版本
