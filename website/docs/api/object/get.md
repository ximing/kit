---
id: get
title: get
description: 'Gets the value at path of object, with optional default value'
---

# `get`

安全地获取对象中指定路径的值。支持点符号和数组索引两种路径格式，当路径不存在时返回默认值。

## 语法

```typescript
function get<T = any>(obj: any, path: string | readonly (string | number)[], defaultValue?: T): T;
```

## 参数

| 参数名         | 类型                                      | 必填 | 默认值      | 描述                                                             |
| -------------- | ----------------------------------------- | ---- | ----------- | ---------------------------------------------------------------- |
| `obj`          | `any`                                     | ✅   | -           | 要查询的对象                                                     |
| `path`         | `string \| readonly (string \| number)[]` | ✅   | -           | 属性路径，支持点符号 (`'a.b.c'`) 或数组 (`['a', 'b', 'c']`) 格式 |
| `defaultValue` | `T`                                       | ❌   | `undefined` | 当路径不存在时返回的默认值                                       |

## 返回值

- **类型**: `T`
- **描述**: 路径对应的值，如果路径不存在则返回 `defaultValue`

## 示例

### 基础用法

```typescript
import { get } from '@rabjs/kit';

// 示例1: 基本的嵌套属性访问
const user = {
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

const city = get(user, 'profile.address.city');
console.log(city); // 'Beijing'

// 示例2: 使用数组格式的路径
const zipcode = get(user, ['profile', 'address', 'zipcode']);
console.log(zipcode); // '100000'

// 示例3: 路径不存在时返回默认值
const country = get(user, 'profile.address.country', 'China');
console.log(country); // 'China'
```

### 高级用法

```typescript
// 示例4: 处理数组索引
const data = {
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ],
};

const itemName = get(data, 'items[0].name');
console.log(itemName); // 'Item 1'

// 示例5: 处理 null/undefined 对象
const result1 = get(null, 'a.b.c', 'default');
console.log(result1); // 'default'

const result2 = get(undefined, 'a.b.c', 'default');
console.log(result2); // 'default'

// 示例6: 与 API 响应处理结合
const apiResponse = {
  data: {
    user: {
      profile: {
        email: 'alice@example.com',
      },
    },
  },
};

const email = get(apiResponse, 'data.user.profile.email', 'no-email@example.com');
console.log(email); // 'alice@example.com'
```

### 实际应用场景

```typescript
// 示例7: 配置管理
function getConfig(configObj: any, key: string, defaultValue: any = null) {
  return get(configObj, key, defaultValue);
}

const appConfig = {
  server: {
    host: 'localhost',
    port: 3000,
    database: {
      name: 'mydb',
      user: 'admin',
    },
  },
};

const dbName = getConfig(appConfig, 'server.database.name');
console.log(dbName); // 'mydb'

const timeout = getConfig(appConfig, 'server.timeout', 5000);
console.log(timeout); // 5000

// 示例8: 表单数据处理
const formData = {
  personal: {
    firstName: 'John',
    lastName: 'Doe',
    contact: {
      email: 'john@example.com',
      phone: '123-456-7890',
    },
  },
};

function extractFormField(form: any, fieldPath: string, defaultValue = '') {
  return get(form, fieldPath, defaultValue);
}

const firstName = extractFormField(formData, 'personal.firstName');
console.log(firstName); // 'John'

const fax = extractFormField(formData, 'personal.contact.fax', 'N/A');
console.log(fax); // 'N/A'
```

## 交互式示例

```tsx live
function GetExample() {
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

  const handleGet = () => {
    try {
      const value = get(sampleData, path, 'Not Found');
      setResult({ value, type: typeof value });
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleGet();
  }, [path]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>get 交互式示例</h4>
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
          示例: profile.age, profile.address.city, profile.address.country
        </small>
      </div>
      <div>
        <strong>示例数据:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
          {JSON.stringify(sampleData, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: '15px' }}>
        <strong>获取结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', color: '#0066cc' }}>
          {result && (result.error ? `Error: ${result.error}` : JSON.stringify(result.value, null, 2))}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **路径格式**: 支持点符号 (`'a.b.c'`) 和数组索引 (`'items[0].name'`) 两种格式
- ⚠️ **Null 安全**: 当对象为 `null` 或 `undefined` 时，直接返回默认值
- ⚠️ **中间路径**: 如果中间路径不存在，返回默认值而不是抛出错误
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是路径深度
- 🔒 **类型安全**: 使用泛型参数 `T` 来获得类型推断的返回值
- 📚 **最佳实践**: 对于深层嵌套的对象，总是提供合理的 `defaultValue`

## 相关函数

- [`set`](./set) - 安全地设置对象中指定路径的值
- [`has`](./has) - 检查对象是否包含指定路径的属性
- [`pick`](./pick) - 选择对象的指定属性
- [`omit`](./omit) - 排除对象的指定属性

## 版本历史

- **v0.0.1** - 初始版本
