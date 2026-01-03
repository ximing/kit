---
id: entries
title: entries
description: '获取对象所有可枚举属性的键值对数组'
---

# `entries`

获取对象所有可枚举属性的键值对数组。提供类型安全的替代方案，相比原生 `Object.entries`。

## 语法

```typescript
function entries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]>;
```

## 参数

| 参数名 | 类型               | 必填 | 默认值 | 描述   |
| ------ | ------------------ | ---- | ------ | ------ |
| `obj`  | `T extends object` | ✅   | -      | 源对象 |

## 返回值

- **类型**: `Array<[keyof T, T[keyof T]]>`
- **描述**: 对象键值对的数组

## 示例

### 基础用法

```typescript
import { entries } from '@rabjs/kit';

// 示例1: 获取对象键值对
const user = { id: 1, name: '张三', email: 'zhangsan@example.com' };
const userEntries = entries(user);
console.log(userEntries);
// [['id', 1], ['name', '张三'], ['email', 'zhangsan@example.com']]

// 示例2: 获取空对象键值对
const empty = {};
console.log(entries(empty)); // []

// 示例3: 处理 null/undefined
console.log(entries(null)); // []
console.log(entries(undefined)); // []
```

### 高级用法

```typescript
// 示例4: 遍历键值对
const config = { host: 'localhost', port: 3000, ssl: false };
entries(config).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// 示例5: 转换为 Map
const person = { firstName: '张', lastName: '三', age: 30 };
const personMap = new Map(entries(person));
console.log(personMap.get('firstName')); // '张'

// 示例6: 条件过滤
const data = { a: 1, b: 0, c: 3, d: null };
const nonEmpty = entries(data).filter(([_, value]) => value);
console.log(nonEmpty); // [['a', 1], ['c', 3]]
```

### 实际应用场景

```typescript
// 示例7: 对象转 URL 查询字符串
function objectToQueryString(obj: any) {
  return entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

const params = { name: '张三', age: 30, city: '北京' };
console.log(objectToQueryString(params));
// 'name=%E5%BC%A0%E4%B8%89&age=30&city=%E5%8C%97%E4%BA%AC'

// 示例8: 对象差异对比
function compareObjects(obj1: any, obj2: any) {
  const changes: any = {};
  entries(obj1).forEach(([key, value]) => {
    if (obj2[key] !== value) {
      changes[key] = { old: value, new: obj2[key] };
    }
  });
  return changes;
}

const old = { name: '张三', age: 30, city: '北京' };
const new_obj = { name: '李四', age: 30, city: '上海' };
console.log(compareObjects(old, new_obj));
// { name: { old: '张三', new: '李四' }, city: { old: '北京', new: '上海' } }
```

## 交互式示例

```tsx live
function EntriesExample() {
  const [obj, setObj] = React.useState(JSON.stringify({ name: '张三', age: 28, city: '北京' }, null, 2));
  const [entries_result, setEntriesResult] = React.useState([]);

  const handleGetEntries = () => {
    try {
      const parsed = JSON.parse(obj);
      const result = entries(parsed);
      setEntriesResult(result);
    } catch (error) {
      alert('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleGetEntries();
  }, [obj]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>entries 交互式示例</h4>
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
          <strong>键值对数组:</strong>
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
            {JSON.stringify(entries_result, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **仅枚举属性**: 只返回可枚举的自有属性的键值对
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空数组
- ⚠️ **类型推断**: 返回类型为 `Array<[keyof T, T[keyof T]]>`，提供类型安全
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是属性数量
- 📚 **最佳实践**: 用于对象遍历、转换和对比

## 相关函数

- [`keys`](./keys) - 获取对象的所有键
- [`values`](./values) - 获取对象的所有值
- [`mapValues`](./mapValues) - 映射对象的值
- [`mapKeys`](./mapKeys) - 映射对象的键

## 版本历史

- **v1.0.0** - 初始版本
