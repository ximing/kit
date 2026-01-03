---
id: keys
title: keys
description: 'Creates an array of the own enumerable property names of object'
---

# `keys`

获取对象所有可枚举属性的键数组。提供类型安全的替代方案，相比原生 `Object.keys`。

## 语法

```typescript
function keys<T extends object>(obj: T): Array<keyof T>;
```

## 参数

| 参数名 | 类型               | 必填 | 默认值 | 描述   |
| ------ | ------------------ | ---- | ------ | ------ |
| `obj`  | `T extends object` | ✅   | -      | 源对象 |

## 返回值

- **类型**: `Array<keyof T>`
- **描述**: 对象属性键的数组

## 示例

### 基础用法

```typescript
import { keys } from '@rabjs/kit';

// 示例1: 获取对象键
const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
const userKeys = keys(user);
console.log(userKeys); // ['id', 'name', 'email']

// 示例2: 获取空对象键
const empty = {};
console.log(keys(empty)); // []

// 示例3: 处理 null/undefined
console.log(keys(null)); // []
console.log(keys(undefined)); // []
```

### 高级用法

```typescript
// 示例4: 类型安全的键遍历
const config = {
  host: 'localhost',
  port: 3000,
  ssl: false,
};

const configKeys = keys(config);
configKeys.forEach((key) => {
  // key 类型被推断为 'host' | 'port' | 'ssl'
  console.log(`${key}: ${config[key]}`);
});

// 示例5: 与数组方法结合
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
};

const stringKeys = keys(person).filter((key) => key.startsWith('name'));
console.log(stringKeys); // []

const allKeys = keys(person).map((key) => key.toUpperCase());
console.log(allKeys); // ['FIRSTNAME', 'LASTNAME', 'AGE']

// 示例6: 检查属性数量
const data = { a: 1, b: 2, c: 3, d: 4 };
console.log(keys(data).length); // 4
```

### 实际应用场景

```typescript
// 示例7: 动态表格列生成
function generateTableColumns(dataItem: any) {
  return keys(dataItem).map((key) => ({
    dataIndex: key,
    title: String(key).charAt(0).toUpperCase() + String(key).slice(1),
    key: key,
  }));
}

const item = { id: 1, name: 'Product', price: 99.99 };
const columns = generateTableColumns(item);
console.log(columns);
// [
//   { dataIndex: 'id', title: 'Id', key: 'id' },
//   { dataIndex: 'name', title: 'Name', key: 'name' },
//   { dataIndex: 'price', title: 'Price', key: 'price' }
// ]

// 示例8: 对象转 CSV
function objectToCSV(obj: any) {
  const headers = keys(obj);
  const values = headers.map((key) => obj[key]);
  return {
    headers: headers.join(','),
    values: values.join(','),
  };
}

const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
const csv = objectToCSV(user);
console.log(csv);
// {
//   headers: 'id,name,email',
//   values: '1,Alice,alice@example.com'
// }
```

## 交互式示例

```tsx live
function KeysExample() {
  const [obj, setObj] = React.useState(JSON.stringify({ name: 'Alice', age: 28, city: 'Beijing' }, null, 2));
  const [keys_result, setKeysResult] = React.useState([]);

  const handleGetKeys = () => {
    try {
      const parsed = JSON.parse(obj);
      const result = keys(parsed);
      setKeysResult(result);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleGetKeys();
  }, [obj]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>keys 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入对象 (JSON):</label>
        <textarea
          value={obj}
          onChange={(e) => setObj(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <strong>对象:</strong>
          <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
            {obj}
          </pre>
        </div>
        <div>
          <strong>键数组:</strong>
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
            {JSON.stringify(keys_result, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **仅枚举属性**: 只返回可枚举的自有属性
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空数组
- ⚠️ **类型推断**: 返回类型为 `Array<keyof T>`，提供类型安全
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是属性数量
- 📚 **最佳实践**: 用于类型安全的键遍历和动态属性处理

## 相关函数

- [`values`](./values) - 获取对象的所有值
- [`entries`](./entries) - 获取对象的键值对数组
- [`get`](./get) - 安全地获取对象中指定路径的值
- [`pick`](./pick) - 创建一个新对象，只包含指定键的属性

## 版本历史

- **v1.0.0** - 初始版本
