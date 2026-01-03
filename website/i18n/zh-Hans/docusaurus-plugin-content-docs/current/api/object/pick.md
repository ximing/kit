---
id: pick
title: pick
description: '创建一个新对象，只包含指定键的属性'
---

# `pick`

创建一个新对象，只包含指定键的属性。用于从对象中提取特定属性，常用于数据过滤和 API 响应处理。

## 语法

```typescript
function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>;
```

## 参数

| 参数名 | 类型               | 必填 | 默认值 | 描述               |
| ------ | ------------------ | ---- | ------ | ------------------ |
| `obj`  | `T extends object` | ✅   | -      | 源对象             |
| `keys` | `readonly K[]`     | ✅   | -      | 要保留的属性键数组 |

## 返回值

- **类型**: `Pick<T, K>`
- **描述**: 仅包含指定键的新对象

## 示例

### 基础用法

```typescript
import { pick } from '@rabjs/kit';

// 示例1: 从对象中选择指定属性
const user = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  password: 'secret123',
  role: 'admin',
};

const publicUser = pick(user, ['id', 'name', 'email']);
console.log(publicUser);
// { id: 1, name: '张三', email: 'zhangsan@example.com' }

// 示例2: 选择单个属性
const userId = pick(user, ['id']);
console.log(userId); // { id: 1 }

// 示例3: 空数组返回空对象
const empty = pick(user, []);
console.log(empty); // {}
```

### 高级用法

```typescript
// 示例4: 处理不存在的键
const obj = { a: 1, b: 2, c: 3 };
const result = pick(obj, ['a', 'd', 'e']); // 'd' 和 'e' 不存在
console.log(result); // { a: 1 }

// 示例5: 与数组结合
const users = [
  { id: 1, name: '张三', password: 'secret1' },
  { id: 2, name: '李四', password: 'secret2' },
  { id: 3, name: '王五', password: 'secret3' },
];

const publicUsers = users.map((user) => pick(user, ['id', 'name']));
console.log(publicUsers);
// [
//   { id: 1, name: '张三' },
//   { id: 2, name: '李四' },
//   { id: 3, name: '王五' }
// ]

// 示例6: 处理 null/undefined
const nullResult = pick(null, ['a', 'b']);
console.log(nullResult); // {}

const undefinedResult = pick(undefined, ['a', 'b']);
console.log(undefinedResult); // {}
```

### 实际应用场景

```typescript
// 示例7: API 响应过滤
function filterUserData(user: any) {
  return pick(user, ['id', 'name', 'email', 'avatar']);
}

const apiResponse = {
  id: 123,
  name: '张三',
  email: 'zhangsan@example.com',
  avatar: 'https://example.com/avatar.jpg',
  password: 'hashed_password',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-02',
  internalId: 'internal_123',
};

const filteredUser = filterUserData(apiResponse);
console.log(filteredUser);
// {
//   id: 123,
//   name: '张三',
//   email: 'zhangsan@example.com',
//   avatar: 'https://example.com/avatar.jpg'
// }

// 示例8: 表单数据提交
function prepareFormData(formData: any, requiredFields: string[]) {
  return pick(formData, requiredFields as any);
}

const completeForm = {
  firstName: '李',
  lastName: '四',
  email: 'lisi@example.com',
  phone: '123-456-7890',
  address: '北京市朝阳区',
  city: '北京',
  state: '北京',
  zip: '100000',
  notes: '可选备注',
};

const submitData = prepareFormData(completeForm, ['firstName', 'lastName', 'email']);
console.log(submitData);
// {
//   firstName: '李',
//   lastName: '四',
//   email: 'lisi@example.com'
// }
```

## 交互式示例

```tsx live
function PickExample() {
  const [keys, setKeys] = React.useState('id,name,email');
  const [result, setResult] = React.useState(null);

  const sampleData = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    password: 'secret',
    role: 'admin',
    createdAt: '2024-01-01',
  };

  const handlePick = () => {
    try {
      const keyArray = keys
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
      const picked = pick(sampleData, keyArray);
      setResult(picked);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handlePick();
  }, [keys]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>pick 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>要保留的键 (逗号分隔):</label>
        <input
          type="text"
          value={keys}
          onChange={(e) => setKeys(e.target.value)}
          placeholder="例如: id,name,email"
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
          <strong>提取结果:</strong>
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
- ⚠️ **不存在的键**: 指定的键如果在对象中不存在，会被忽略
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空对象
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是要保留的键数量
- 🔒 **类型安全**: 使用 TypeScript 的 `Pick` 类型确保类型安全
- 📚 **最佳实践**: 常用于 API 响应过滤和敏感数据隐藏

## 相关函数

- [`omit`](./omit) - 排除对象的指定属性
- [`get`](./get) - 安全地获取对象中指定路径的值
- [`set`](./set) - 安全地设置对象中指定路径的值
- [`keys`](./keys) - 获取对象的所有键

## 版本历史

- **v1.0.0** - 初始版本
