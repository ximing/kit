---
id: has
title: has
description: 'Checks if path is a property of object'
---

# `has`

检查对象是否包含指定路径的属性。支持点符号和数组索引两种路径格式。

## 语法

```typescript
function has(obj: any, path: string | readonly (string | number)[]): boolean;
```

## 参数

| 参数名 | 类型                                      | 必填 | 默认值 | 描述                                                             |
| ------ | ----------------------------------------- | ---- | ------ | ---------------------------------------------------------------- |
| `obj`  | `any`                                     | ✅   | -      | 要查询的对象                                                     |
| `path` | `string \| readonly (string \| number)[]` | ✅   | -      | 属性路径，支持点符号 (`'a.b.c'`) 或数组 (`['a', 'b', 'c']`) 格式 |

## 返回值

- **类型**: `boolean`
- **描述**: 如果路径存在返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { has } from '@rabjs/kit';

// 示例1: 检查存在的属性
const user = {
  id: 1,
  name: 'Alice',
  profile: {
    age: 28,
    address: {
      city: 'Beijing',
    },
  },
};

console.log(has(user, 'name')); // true
console.log(has(user, 'profile.age')); // true
console.log(has(user, 'profile.address.city')); // true

// 示例2: 检查不存在的属性
console.log(has(user, 'email')); // false
console.log(has(user, 'profile.email')); // false
console.log(has(user, 'profile.address.country')); // false

// 示例3: 使用数组格式的路径
console.log(has(user, ['profile', 'address', 'city'])); // true
console.log(has(user, ['profile', 'address', 'zip'])); // false
```

### 高级用法

```typescript
// 示例4: 处理中间路径不存在
const obj = { a: { b: null } };
console.log(has(obj, 'a.b.c')); // false

// 示例5: 处理数组索引
const data = {
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ],
};

console.log(has(data, 'items[0].name')); // true
console.log(has(data, 'items[5].name')); // false

// 示例6: 与条件判断结合
const config = {
  database: { host: 'localhost', port: 5432 },
  cache: { enabled: true },
};

if (has(config, 'database.port')) {
  console.log('Database port configured');
}

if (!has(config, 'database.username')) {
  console.log('Database username not configured');
}
```

### 实际应用场景

```typescript
// 示例7: 表单验证
function validateFormData(data: any, requiredFields: string[]) {
  const missing = requiredFields.filter((field) => !has(data, field));
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  return { valid: true };
}

const formData = {
  personal: { name: 'John', email: 'john@example.com' },
  address: { city: 'New York' },
};

const result = validateFormData(formData, ['personal.name', 'personal.email', 'address.city', 'address.zip']);
console.log(result);
// { valid: false, missing: ['address.zip'] }

// 示例8: 安全的属性访问
function getConfigValue(config: any, path: string, defaultValue: any) {
  return has(config, path) ? get(config, path) : defaultValue;
}

const appConfig = {
  features: {
    auth: { enabled: true },
    api: { enabled: false },
  },
};

const authEnabled = getConfigValue(appConfig, 'features.auth.enabled', false);
const analyticsEnabled = getConfigValue(appConfig, 'features.analytics.enabled', false);

console.log(authEnabled); // true
console.log(analyticsEnabled); // false
```

## 交互式示例

```tsx live
function HasExample() {
  const [path, setPath] = React.useState('profile.address.city');
  const [result, setResult] = React.useState(null);

  const sampleData = {
    id: 1,
    name: 'Alice',
    profile: {
      age: 28,
      address: {
        city: 'Beijing',
        zipcode: '100000',
      },
    },
  };

  const handleHas = () => {
    try {
      const exists = has(sampleData, path);
      setResult(exists);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleHas();
  }, [path]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>has 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入路径:</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="e.g., profile.address.city"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
          示例: name, profile.age, profile.address.city, profile.address.country
        </small>
      </div>
      <div>
        <strong>示例数据:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
          {JSON.stringify(sampleData, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: '15px' }}>
        <strong>检查结果:</strong>
        <pre
          style={{
            background: 'white',
            padding: '10px',
            marginTop: '5px',
            overflow: 'auto',
            color: result ? '#0066cc' : '#cc0000',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {result === null ? 'Error' : result === true ? '✓ 属性存在' : '✗ 属性不存在'}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **路径格式**: 支持点符号 (`'a.b.c'`) 和数组索引 (`'items[0].name'`) 两种格式
- ⚠️ **Null 安全**: 当对象为 `null` 或 `undefined` 时，返回 `false`
- ⚠️ **中间路径**: 如果中间路径不存在，返回 `false`
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是路径深度
- 📚 **最佳实践**: 常用于条件判断和属性验证

## 相关函数

- [`get`](./get) - 安全地获取对象中指定路径的值
- [`set`](./set) - 安全地设置对象中指定路径的值
- [`keys`](./keys) - 获取对象的所有键

## 版本历史

- **v0.0.1** - 初始版本
