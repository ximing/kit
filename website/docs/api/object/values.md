---
id: values
title: values
description: 'Creates an array of the own enumerable property values of object'
---

# `values`

获取对象所有可枚举属性的值数组。提供类型安全的替代方案，相比原生 `Object.values`。

## 语法

```typescript
function values<T extends object>(obj: T): Array<T[keyof T]>;
```

## 参数

| 参数名 | 类型               | 必填 | 默认值 | 描述   |
| ------ | ------------------ | ---- | ------ | ------ |
| `obj`  | `T extends object` | ✅   | -      | 源对象 |

## 返回值

- **类型**: `Array<T[keyof T]>`
- **描述**: 对象属性值的数组

## 示例

### 基础用法

```typescript
import { values } from '@rabjs/kit';

// 示例1: 获取对象值
const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
const userValues = values(user);
console.log(userValues); // [1, 'Alice', 'alice@example.com']

// 示例2: 获取空对象值
const empty = {};
console.log(values(empty)); // []

// 示例3: 处理 null/undefined
console.log(values(null)); // []
console.log(values(undefined)); // []
```

### 高级用法

```typescript
// 示例4: 值的数据分析
const scores = { math: 95, english: 88, science: 92 };
const scoreValues = values(scores);
const average = scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length;
console.log(average); // 91.67

// 示例5: 检查所有值
const config = { debug: true, ssl: false, cache: true };
const allEnabled = values(config).every((v) => v === true);
console.log(allEnabled); // false

// 示例6: 值的转换
const person = { firstName: 'John', lastName: 'Doe', age: 30 };
const upperValues = values(person).map((v) => String(v).toUpperCase());
console.log(upperValues); // ['JOHN', 'DOE', '30']
```

### 实际应用场景

```typescript
// 示例7: 数据验证
function validateAllValues(obj: any, validator: (v: any) => boolean) {
  return values(obj).every(validator);
}

const user = { name: 'John', email: 'john@example.com', age: 30 };
const isValid = validateAllValues(user, (v) => v != null && v !== '');
console.log(isValid); // true

// 示例8: 统计非空值
function countNonEmpty(obj: any) {
  return values(obj).filter((v) => v != null && v !== '').length;
}

const form = { name: 'John', email: '', phone: '123-456-7890', fax: null };
console.log(countNonEmpty(form)); // 2
```

## 交互式示例

```tsx live
function ValuesExample() {
  const [obj, setObj] = React.useState(JSON.stringify({ name: 'Alice', age: 28, city: 'Beijing' }, null, 2));
  const [values_result, setValuesResult] = React.useState([]);

  const handleGetValues = () => {
    try {
      const parsed = JSON.parse(obj);
      const result = values(parsed);
      setValuesResult(result);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleGetValues();
  }, [obj]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>values 交互式示例</h4>
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
          <strong>值数组:</strong>
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
            {JSON.stringify(values_result, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **仅枚举属性**: 只返回可枚举的自有属性的值
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空数组
- ⚠️ **类型推断**: 返回类型为 `Array<T[keyof T]>`，提供类型安全
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是属性数量
- 📚 **最佳实践**: 用于数据验证、统计分析和值转换

## 相关函数

- [`keys`](./keys) - 获取对象的所有键
- [`entries`](./entries) - 获取对象的键值对数组
- [`mapValues`](./mapValues) - 映射对象的值
- [`pick`](./pick) - 创建一个新对象，只包含指定键的属性

## 版本历史

- **v0.0.1** - 初始版本
