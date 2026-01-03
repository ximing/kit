---
id: mapValues
title: mapValues
description: '创建一个新对象，通过迭代函数转换每个属性的值'
---

# `mapValues`

创建一个新对象，通过迭代函数转换每个属性的值，保持键名不变。

## 语法

```typescript
function mapValues<T extends object, U>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, obj: T) => U,
): Record<keyof T, U>;
```

## 参数

| 参数名     | 类型                     | 必填 | 默认值 | 描述                         |
| ---------- | ------------------------ | ---- | ------ | ---------------------------- |
| `obj`      | `T extends object`       | ✅   | -      | 源对象                       |
| `iteratee` | `(value, key, obj) => U` | ✅   | -      | 为每个属性生成新值的迭代函数 |

## 返回值

- **类型**: `Record<keyof T, U>`
- **描述**: 值已转换的新对象

## 示例

### 基础用法

```typescript
import { mapValues } from '@rabjs/kit';

// 示例1: 将所有值乘以 2
const numbers = { a: 1, b: 2, c: 3 };
const doubled = mapValues(numbers, (value) => value * 2);
console.log(doubled); // { a: 2, b: 4, c: 6 }

// 示例2: 将所有值转为字符串
const mixed = { id: 1, name: '张三', active: true };
const strings = mapValues(mixed, (value) => String(value));
console.log(strings); // { id: '1', name: '张三', active: 'true' }

// 示例3: 条件转换
const scores = { math: 95, english: 88, science: 92 };
const grades = mapValues(scores, (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  return 'C';
});
console.log(grades); // { math: 'A', english: 'B', science: 'A' }
```

### 高级用法

```typescript
// 示例4: 基于键的转换
const config = { timeout: 5000, retries: 3, delay: 1000 };
const labeled = mapValues(config, (value, key) => ({
  value,
  label: String(key).charAt(0).toUpperCase() + String(key).slice(1),
}));
console.log(labeled);
// {
//   timeout: { value: 5000, label: 'Timeout' },
//   retries: { value: 3, label: 'Retries' },
//   delay: { value: 1000, label: 'Delay' }
// }

// 示例5: 嵌套对象转换
const data = {
  user1: { name: '张三', score: 95 },
  user2: { name: '李四', score: 87 },
};
const transformed = mapValues(data, (user) => ({
  ...user,
  passed: user.score >= 80,
}));
console.log(transformed);
// {
//   user1: { name: '张三', score: 95, passed: true },
//   user2: { name: '李四', score: 87, passed: true }
// }

// 示例6: 处理 null/undefined
const nullObj = null;
const result = mapValues(nullObj, (value) => value * 2);
console.log(result); // {}
```

### 实际应用场景

```typescript
// 示例7: 数据格式化
function formatUserData(user: any) {
  return mapValues(user, (value, key) => {
    if (key === 'age') return `${value} 岁`;
    if (key === 'created') return new Date(value).toLocaleDateString('zh-CN');
    return value;
  });
}

const user = { name: '张三', age: 30, created: '2024-01-01' };
const formatted = formatUserData(user);
console.log(formatted);
// { name: '张三', age: '30 岁', created: '2024/1/1' }

// 示例8: 数据验证和转换
function sanitizeInput(input: any) {
  return mapValues(input, (value) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }
    return value;
  });
}

const formData = { name: '  张三  ', email: '  ZHANGSAN@EXAMPLE.COM  ', age: 30 };
const sanitized = sanitizeInput(formData);
console.log(sanitized);
// { name: '张三', email: 'zhangsan@example.com', age: 30 }
```

## 交互式示例

```tsx live
function MapValuesExample() {
  const [obj, setObj] = React.useState(JSON.stringify({ a: 1, b: 2, c: 3 }, null, 2));
  const [transform, setTransform] = React.useState('double');
  const [result, setResult] = React.useState(null);

  const handleMapValues = () => {
    try {
      const parsed = JSON.parse(obj);
      let iteratee;

      switch (transform) {
        case 'double':
          iteratee = (value) => (typeof value === 'number' ? value * 2 : value);
          break;
        case 'toString':
          iteratee = (value) => String(value);
          break;
        case 'addTen':
          iteratee = (value) => (typeof value === 'number' ? value + 10 : value);
          break;
        default:
          iteratee = (value) => value;
      }

      const mapped = mapValues(parsed, iteratee);
      setResult(mapped);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleMapValues();
  }, [obj, transform]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>mapValues 交互式示例</h4>
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
          <option value="double">乘以 2</option>
          <option value="toString">转为字符串</option>
          <option value="addTen">加 10</option>
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
- ⚠️ **值转换**: 迭代函数接收值、键和原对象三个参数
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空对象
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是属性数量
- 📚 **最佳实践**: 常用于数据格式化、验证和转换

## 相关函数

- [`mapKeys`](./mapKeys) - 映射对象的键
- [`values`](./values) - 获取对象的所有值
- [`entries`](./entries) - 获取对象的键值对数组
- [`pick`](./pick) - 创建一个新对象，只包含指定键的属性

## 版本历史

- **v1.0.0** - 初始版本
