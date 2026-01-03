---
id: partition
title: partition
description: 'Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for'
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
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
  { name: 'David', active: false },
];

const [activeUsers, inactiveUsers] = partition(users, 'active');
console.log(activeUsers);
// => [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
console.log(inactiveUsers);
// => [{ name: 'Bob', active: false }, { name: 'David', active: false }]

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
  { id: 1, status: 'completed', amount: 100 },
  { id: 2, status: 'pending', amount: 200 },
  { id: 3, status: 'completed', amount: 150 },
  { id: 4, status: 'cancelled', amount: 50 },
];

// 分离已完成和未完成的订单
const [completed, notCompleted] = partition(orders, (order) => order.status === 'completed');
console.log(completed);
// => [{ id: 1, status: 'completed', amount: 100 }, { id: 3, status: 'completed', amount: 150 }]
console.log(notCompleted);
// => [{ id: 2, status: 'pending', amount: 200 }, { id: 4, status: 'cancelled', amount: 50 }]

// 示例4: 分割产品库存
const products = [
  { name: 'Laptop', stock: 5 },
  { name: 'Mouse', stock: 100 },
  { name: 'Monitor', stock: 0 },
  { name: 'Keyboard', stock: 50 },
];

// 分离有货和缺货的产品
const [inStock, outOfStock] = partition(products, (p) => p.stock > 0);
console.log(inStock);
// => [{ name: 'Laptop', stock: 5 }, { name: 'Mouse', stock: 100 }, { name: 'Keyboard', stock: 50 }]
console.log(outOfStock);
// => [{ name: 'Monitor', stock: 0 }]

// 示例5: 按复杂条件分割
const employees = [
  { name: 'Alice', salary: 80000, department: 'Engineering' },
  { name: 'Bob', salary: 60000, department: 'Sales' },
  { name: 'Charlie', salary: 75000, department: 'Engineering' },
  { name: 'David', salary: 55000, department: 'HR' },
];

// 分离高薪工程师和其他员工
const [highPaidEngineers, others] = partition(
  employees,
  (emp) => emp.salary > 70000 && emp.department === 'Engineering',
);
console.log(highPaidEngineers);
// => [{ name: 'Alice', salary: 80000, department: 'Engineering' }]
```

### 实际应用场景

```typescript
// 示例6: 分离有效和无效数据
interface UserData {
  email: string;
  age: number;
  isValid: boolean;
}

const userData: UserData[] = [
  { email: 'alice@example.com', age: 28, isValid: true },
  { email: 'invalid-email', age: 17, isValid: false },
  { email: 'bob@example.com', age: 35, isValid: true },
  { email: 'charlie@example.com', age: 16, isValid: false },
];

const [validUsers, invalidUsers] = partition(userData, 'isValid');
console.log(`有效用户: ${validUsers.length}, 无效用户: ${invalidUsers.length}`);

// 示例7: 分离待处理和已处理的任务
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}

const tasks: Task[] = [
  { id: 1, title: 'Task A', completed: false, priority: 1 },
  { id: 2, title: 'Task B', completed: true, priority: 2 },
  { id: 3, title: 'Task C', completed: false, priority: 1 },
  { id: 4, title: 'Task D', completed: true, priority: 3 },
];

const [pendingTasks, completedTasks] = partition(tasks, 'completed');
console.log(`待处理: ${pendingTasks.length}, 已完成: ${completedTasks.length}`);

// 示例8: 分离符合条件的用户
interface User {
  id: number;
  name: string;
  age: number;
  premium: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', age: 28, premium: true },
  { id: 2, name: 'Bob', age: 22, premium: false },
  { id: 3, name: 'Charlie', age: 35, premium: true },
  { id: 4, name: 'David', age: 19, premium: false },
];

// 分离成年高级用户和其他用户
const [eligibleUsers, ineligibleUsers] = partition(users, (user) => user.age >= 21 && user.premium);
console.log('符合条件:', eligibleUsers);
console.log('不符合条件:', ineligibleUsers);
```

## 交互式示例

```tsx live
function PartitionExample() {
  const [conditionType, setConditionType] = React.useState('active');
  const [result, setResult] = React.useState(null);

  const users = [
    { id: 1, name: 'Alice', active: true, role: 'admin' },
    { id: 2, name: 'Bob', active: false, role: 'user' },
    { id: 3, name: 'Charlie', active: true, role: 'user' },
    { id: 4, name: 'David', active: false, role: 'admin' },
  ];

  const handlePartition = () => {
    let partitioned;
    if (conditionType === 'active') {
      partitioned = partition(users, 'active');
    } else if (conditionType === 'admin') {
      partitioned = partition(users, (u) => u.role === 'admin');
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
          <option value="active">Active (活跃用户)</option>
          <option value="admin">Admin (管理员)</option>
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
- ⚠️ **原始数据**: 不修改原始集合，返回新的数组
- 💡 **性能提示**: 时间复杂度为 O(n)，性能良好
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 使用解构赋值获取两个分组，代码更清晰

## 相关函数

- [`groupBy`](./groupBy) - 按条件分组集合（可分为多个组）
- [`filter`](../../array/filter) - 过滤满足条件的元素
- [`sortBy`](./sortBy) - 按条件排序集合

## 版本历史

- **v1.0.0** - 初始版本
