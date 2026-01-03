---
id: omit
title: omit
description: '创建一个新对象，排除指定键的属性'
---

# `omit`

创建一个新对象，排除指定键的属性。与 `pick` 相反，用于从对象中移除特定属性。

## 语法

```typescript
function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K>;
```

## 参数

| 参数名 | 类型               | 必填 | 默认值 | 描述               |
| ------ | ------------------ | ---- | ------ | ------------------ |
| `obj`  | `T extends object` | ✅   | -      | 源对象             |
| `keys` | `readonly K[]`     | ✅   | -      | 要排除的属性键数组 |

## 返回值

- **类型**: `Omit<T, K>`
- **描述**: 不包含指定键的新对象

## 示例

### 基础用法

```typescript
import { omit } from '@rabjs/kit';

// 示例1: 从对象中排除指定属性
const user = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  password: 'secret123',
  role: 'admin',
};

const publicUser = omit(user, ['password', 'role']);
console.log(publicUser);
// { id: 1, name: '张三', email: 'zhangsan@example.com' }

// 示例2: 排除单个属性
const withoutPassword = omit(user, ['password']);
console.log(withoutPassword);
// { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' }

// 示例3: 空数组返回所有属性
const all = omit(user, []);
console.log(all);
// { id: 1, name: '张三', email: 'zhangsan@example.com', password: 'secret123', role: 'admin' }
```

### 高级用法

```typescript
// 示例4: 处理不存在的键
const obj = { a: 1, b: 2, c: 3 };
const result = omit(obj, ['d', 'e']); // 'd' 和 'e' 不存在
console.log(result); // { a: 1, b: 2, c: 3 }

// 示例5: 与数组结合
const users = [
  { id: 1, name: '张三', password: 'secret1', internalId: 'int_1' },
  { id: 2, name: '李四', password: 'secret2', internalId: 'int_2' },
  { id: 3, name: '王五', password: 'secret3', internalId: 'int_3' },
];

const publicUsers = users.map((user) => omit(user, ['password', 'internalId']));
console.log(publicUsers);
// [
//   { id: 1, name: '张三' },
//   { id: 2, name: '李四' },
//   { id: 3, name: '王五' }
// ]

// 示例6: 处理 null/undefined
const nullResult = omit(null, ['a', 'b']);
console.log(nullResult); // {}

const undefinedResult = omit(undefined, ['a', 'b']);
console.log(undefinedResult); // {}
```

### 实际应用场景

```typescript
// 示例7: 隐藏敏感数据
function sanitizeUserData(user: any) {
  return omit(user, ['password', 'ssn', 'internalId', 'apiKey']);
}

const fullUserData = {
  id: 123,
  name: '张三',
  email: 'zhangsan@example.com',
  password: 'hashed_password',
  ssn: '123-45-6789',
  internalId: 'internal_123',
  apiKey: 'secret_api_key',
  createdAt: '2024-01-01',
};

const safeUserData = sanitizeUserData(fullUserData);
console.log(safeUserData);
// {
//   id: 123,
//   name: '张三',
//   email: 'zhangsan@example.com',
//   createdAt: '2024-01-01'
// }

// 示例8: 数据库模型转换
function prepareForDisplay(dbRecord: any) {
  return omit(dbRecord, ['_id', '__v', 'createdAt', 'updatedAt', 'deletedAt']);
}

const dbRecord = {
  _id: 'mongo_id_123',
  name: '商品名称',
  price: 99.99,
  description: '商品描述',
  __v: 1,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-02T00:00:00Z',
  deletedAt: null,
};

const displayData = prepareForDisplay(dbRecord);
console.log(displayData);
// {
//   name: '商品名称',
//   price: 99.99,
//   description: '商品描述'
// }
```

## 交互式示例

```tsx live
function OmitExample() {
  const [keys, setKeys] = React.useState('password,role');
  const [result, setResult] = React.useState(null);

  const sampleData = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    password: 'secret',
    role: 'admin',
    createdAt: '2024-01-01',
  };

  const handleOmit = () => {
    try {
      const keyArray = keys
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
      const omitted = omit(sampleData, keyArray);
      setResult(omitted);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleOmit();
  }, [keys]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>omit 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>要排除的键 (逗号分隔):</label>
        <input
          type="text"
          value={keys}
          onChange={(e) => setKeys(e.target.value)}
          placeholder="例如: password,role"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
          可用键: id, name, email, password, role, createdAt
        </small>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <strong>原始对象:</strong>
          <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
            {JSON.stringify(sampleData, null, 2)}
          </pre>
        </div>
        <div>
          <strong>排除结果:</strong>
          <pre
            style={{
              background: 'white',
              padding: '10px',
              marginTop: '5px',
              overflow: 'auto',
              fontSize: '12px',
              color: '#0066cc',
            }}
          >
            {result && (result.error ? `错误: ${result.error}` : JSON.stringify(result, null, 2))}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **新对象**: 返回新对象，不修改原对象
- ⚠️ **不存在的键**: 指定的键如果在对象中不存在，不会产生任何影响
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空对象
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是对象属性总数
- 🔒 **类型安全**: 使用 TypeScript 的 `Omit` 类型确保类型安全
- 📚 **最佳实践**: 常用于隐藏敏感数据和数据库字段转换

## 相关函数

- [`pick`](./pick) - 创建一个新对象，只包含指定键的属性
- [`get`](./get) - 安全地获取对象中指定路径的值
- [`set`](./set) - 安全地设置对象中指定路径的值
- [`keys`](./keys) - 获取对象的所有键

## 版本历史

- **v1.0.0** - 初始版本
