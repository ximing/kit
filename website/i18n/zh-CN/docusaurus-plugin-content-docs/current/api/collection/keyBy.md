---
id: keyBy
title: keyBy
description: '按条件将集合中的元素转换为键值对对象'
---

# `keyBy`

按条件将集合中的元素转换为键值对对象，其中键是迭代器的结果，值是对应的元素。

## 语法

```typescript
function keyBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string,
): Record<string | number, T>;
```

## 参数

| 参数名       | 类型                                                       | 必填 | 默认值 | 描述         |
| ------------ | ---------------------------------------------------------- | ---- | ------ | ------------ |
| `collection` | `T[]`                                                      | ✅   | -      | 要转换的集合 |
| `iteratee`   | `(item: T, index: number) => string \| number` \| `string` | ✅   | -      | 键生成迭代器 |

## 返回值

- **类型**: `Record<string | number, T>`
- **描述**: 一个对象，键为迭代器结果，值为对应的集合元素

## 示例

### 基础用法

```typescript
import { keyBy } from '@rabjs/kit';

// 示例1: 按ID生成查找表
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
];

const usersById = keyBy(users, 'id');
console.log(usersById);
// => {
//   '1': { id: 1, name: '张三' },
//   '2': { id: 2, name: '李四' },
//   '3': { id: 3, name: '王五' }
// }

// 快速查找
console.log(usersById['2']); // { id: 2, name: '李四' }
```

### 高级用法

```typescript
// 示例2: 按邮箱生成查找表
const employees = [
  { email: 'alice@example.com', name: '张三', dept: '工程部' },
  { email: 'bob@example.com', name: '李四', dept: '销售部' },
];

const employeesByEmail = keyBy(employees, 'email');
console.log(employeesByEmail);
// => {
//   'alice@example.com': { email: 'alice@example.com', name: '张三', dept: '工程部' },
//   'bob@example.com': { email: 'bob@example.com', name: '李四', dept: '销售部' }
// }
```

## 交互式示例

```tsx live
function KeyByExample() {
  const [keyField, setKeyField] = React.useState('id');
  const [result, setResult] = React.useState(null);

  const users = [
    { id: 1, name: '张三', email: 'alice@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'bob@example.com', role: '用户' },
    { id: 3, name: '王五', email: 'charlie@example.com', role: '用户' },
  ];

  const handleKeyBy = () => {
    const keyed = keyBy(users, keyField);
    setResult(keyed);
  };

  React.useEffect(() => {
    handleKeyBy();
  }, [keyField]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>keyBy 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>键字段: </label>
        <select
          value={keyField}
          onChange={(e) => setKeyField(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="id">ID</option>
          <option value="email">邮箱</option>
          <option value="role">角色</option>
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

- ⚠️ **键的唯一性**: 如果有重复的键，后面的值会覆盖前面的值
- 💡 **性能提示**: 时间复杂度为 O(n)，适合创建快速查找表
- 📚 **最佳实践**: 用于构建查找表和缓存

## 相关函数

- [`groupBy`](./groupBy) - 按条件分组集合
- [`countBy`](./countBy) - 按条件计数分组

## 版本历史

- **v1.0.0** - 初始版本
