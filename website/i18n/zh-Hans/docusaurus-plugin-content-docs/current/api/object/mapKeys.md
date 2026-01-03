---
id: mapKeys
title: mapKeys
description: '创建一个新对象，通过迭代函数转换每个属性的键名'
---

# `mapKeys`

创建一个新对象，通过迭代函数转换每个属性的键名，保持值不变。

## 语法

```typescript
function mapKeys<T extends object, K extends string | number | symbol>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, obj: T) => K,
): Record<K, T[keyof T]>;
```

## 参数

| 参数名     | 类型                     | 必填 | 默认值 | 描述                           |
| ---------- | ------------------------ | ---- | ------ | ------------------------------ |
| `obj`      | `T extends object`       | ✅   | -      | 源对象                         |
| `iteratee` | `(value, key, obj) => K` | ✅   | -      | 为每个属性生成新键名的迭代函数 |

## 返回值

- **类型**: `Record<K, T[keyof T]>`
- **描述**: 键名已转换的新对象

## 示例

### 基础用法

```typescript
import { mapKeys } from '@rabjs/kit';

// 示例1: 转换为大写键名
const obj = { firstName: '张', lastName: '三', age: 30 };
const uppercase = mapKeys(obj, (_, key) => String(key).toUpperCase());
console.log(uppercase);
// { FIRSTNAME: '张', LASTNAME: '三', AGE: 30 }

// 示例2: 转换为驼峰命名
const snakeCase = { first_name: '张', last_name: '三', user_age: 30 };
const camelCase = mapKeys(snakeCase, (_, key) => {
  return String(key).replace(/_([a-z])/g, (_, char) => char.toUpperCase());
});
console.log(camelCase);
// { firstName: '张', lastName: '三', userAge: 30 }

// 示例3: 添加前缀
const config = { host: 'localhost', port: 3000 };
const prefixed = mapKeys(config, (_, key) => `APP_${key}`);
console.log(prefixed);
// { APP_host: 'localhost', APP_port: 3000 }
```

### 高级用法

```typescript
// 示例4: 基于值的键转换
const data = { 1: 'one', 2: 'two', 3: 'three' };
const transformed = mapKeys(data, (value) => `num_${value}`);
console.log(transformed);
// { num_one: 'one', num_two: 'two', num_three: 'three' }

// 示例5: 条件键转换
const fields = { email: 'user@example.com', password: 'secret', name: '张三' };
const sanitized = mapKeys(fields, (_, key) => {
  return key === 'password' ? 'pwd' : key;
});
console.log(sanitized);
// { email: 'user@example.com', pwd: 'secret', name: '张三' }

// 示例6: 处理 null/undefined
const nullObj = null;
const result = mapKeys(nullObj, (_, key) => `${key}_mapped`);
console.log(result); // {}
```

### 实际应用场景

```typescript
// 示例7: API 响应字段转换
function normalizeApiResponse(response: any) {
  return mapKeys(response, (_, key) => {
    // 将 snake_case 转换为 camelCase
    return String(key).replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  });
}

const apiResponse = { user_id: 123, user_name: '张三', created_at: '2024-01-01' };
const normalized = normalizeApiResponse(apiResponse);
console.log(normalized);
// { userId: 123, userName: '张三', createdAt: '2024-01-01' }

// 示例8: 数据库字段映射
function mapDatabaseFields(record: any, fieldMap: any) {
  return mapKeys(record, (_, key) => fieldMap[String(key)] || String(key));
}

const dbRecord = { id: 1, nm: '商品', pr: 99.99 };
const fieldMapping = { id: 'productId', nm: 'productName', pr: 'price' };
const mapped = mapDatabaseFields(dbRecord, fieldMapping);
console.log(mapped);
// { productId: 1, productName: '商品', price: 99.99 }
```

## 交互式示例

```tsx live
function MapKeysExample() {
  const [obj, setObj] = React.useState(JSON.stringify({ firstName: '张', lastName: '三', age: 30 }, null, 2));
  const [transform, setTransform] = React.useState('toUpperCase');
  const [result, setResult] = React.useState(null);

  const handleMapKeys = () => {
    try {
      const parsed = JSON.parse(obj);
      let iteratee;

      switch (transform) {
        case 'toUpperCase':
          iteratee = (_, key) => String(key).toUpperCase();
          break;
        case 'toLowerCase':
          iteratee = (_, key) => String(key).toLowerCase();
          break;
        case 'addPrefix':
          iteratee = (_, key) => `APP_${key}`;
          break;
        default:
          iteratee = (_, key) => key;
      }

      const mapped = mapKeys(parsed, iteratee);
      setResult(mapped);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleMapKeys();
  }, [obj, transform]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>mapKeys 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入对象 (JSON):</label>
        <textarea
          value={obj}
          onChange={(e) => setObj(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>转换方式:</label>
        <select value={transform} onChange={(e) => setTransform(e.target.value)} style={{ padding: '8px' }}>
          <option value="toUpperCase">转为大写</option>
          <option value="toLowerCase">转为小写</option>
          <option value="addPrefix">添加前缀</option>
        </select>
      </div>
      <div>
        <strong>转换结果:</strong>
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
  );
}
```

## 注意事项

- ⚠️ **新对象**: 返回新对象，不修改原对象
- ⚠️ **键名转换**: 迭代函数接收值、键和原对象三个参数
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空对象
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是属性数量
- 📚 **最佳实践**: 常用于 API 响应转换和字段映射

## 相关函数

- [`mapValues`](./mapValues) - 映射对象的值
- [`keys`](./keys) - 获取对象的所有键
- [`entries`](./entries) - 获取对象的键值对数组
- [`invert`](./invert) - 反转对象的键值

## 版本历史

- **v0.0.1** - 初始版本
