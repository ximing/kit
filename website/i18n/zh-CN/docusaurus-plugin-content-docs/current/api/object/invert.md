---
id: invert
title: invert
description: '创建一个新对象，反转原对象的键值'
---

# `invert`

创建一个新对象，反转原对象的键值。键变成值，值变成键。

## 语法

```typescript
function invert<T extends Record<string | number, string | number>>(obj: T): Record<string, string>;
```

## 参数

| 参数名 | 类型                                                   | 必填 | 默认值 | 描述                             |
| ------ | ------------------------------------------------------ | ---- | ------ | -------------------------------- |
| `obj`  | `T extends Record<string \| number, string \| number>` | ✅   | -      | 源对象，键和值必须是字符串或数字 |

## 返回值

- **类型**: `Record<string, string>`
- **描述**: 键值反转后的新对象

## 示例

### 基础用法

```typescript
import { invert } from '@rabjs/kit';

// 示例1: 反转简单对象
const user = { id: 1, name: '张三', email: 'zhangsan@example.com' };
const inverted = invert(user);
console.log(inverted);
// { '1': 'id', '张三': 'name', 'zhangsan@example.com': 'email' }

// 示例2: 反转映射表
const statusMap = { 1: 'active', 2: 'inactive', 3: 'pending' };
const reverseMap = invert(statusMap);
console.log(reverseMap);
// { 'active': '1', 'inactive': '2', 'pending': '3' }

// 示例3: 反转枚举
const colors = { red: '#FF0000', green: '#00FF00', blue: '#0000FF' };
const hexToColor = invert(colors);
console.log(hexToColor);
// { '#FF0000': 'red', '#00FF00': 'green', '#0000FF': 'blue' }
```

### 高级用法

```typescript
// 示例4: 处理重复值 (最后一个键会覆盖前面的)
const items = { a: 1, b: 2, c: 1 }; // 注意 'a' 和 'c' 的值都是 1
const inverted = invert(items);
console.log(inverted);
// { '1': 'c', '2': 'b' } // 'a' 被 'c' 覆盖了

// 示例5: 数字键的处理
const scores = { 1: 'one', 2: 'two', 3: 'three' };
const inverted = invert(scores);
console.log(inverted);
// { 'one': '1', 'two': '2', 'three': '3' }

// 示例6: 处理 null/undefined
const nullObj = null;
const result = invert(nullObj);
console.log(result); // {}
```

### 实际应用场景

```typescript
// 示例7: 双向查找表
function createBidirectionalMap(map: any) {
  return {
    forward: map,
    reverse: invert(map),
  };
}

const languageMap = {
  en: 'English',
  zh: '中文',
  es: 'Spanish',
  fr: 'French',
};

const biMap = createBidirectionalMap(languageMap);
console.log(biMap.forward['en']); // 'English'
console.log(biMap.reverse['English']); // 'en'

// 示例8: API 状态码转换
function createStatusCodeMap() {
  const statusMap = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Internal Server Error',
  };

  return {
    codeToMessage: statusMap,
    messageToCode: invert(statusMap),
  };
}

const statusMaps = createStatusCodeMap();
console.log(statusMaps.codeToMessage[200]); // 'OK'
console.log(statusMaps.messageToCode['OK']); // '200'
```

## 交互式示例

```tsx live
function InvertExample() {
  const [obj, setObj] = React.useState(JSON.stringify({ a: 1, b: 2, c: 3 }, null, 2));
  const [result, setResult] = React.useState(null);

  const handleInvert = () => {
    try {
      const parsed = JSON.parse(obj);
      const inverted = invert(parsed);
      setResult(inverted);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleInvert();
  }, [obj]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>invert 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入对象 (JSON):</label>
        <textarea
          value={obj}
          onChange={(e) => setObj(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
        />
        <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>键和值必须是字符串或数字</small>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <strong>原始对象:</strong>
          <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
            {obj}
          </pre>
        </div>
        <div>
          <strong>反转结果:</strong>
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

- ⚠️ **值类型限制**: 值必须是字符串或数字类型
- ⚠️ **重复值处理**: 如果有重复的值，后面的键会覆盖前面的键
- ⚠️ **新对象**: 返回新对象，不修改原对象
- ⚠️ **Null 处理**: 如果对象为 `null` 或 `undefined`，返回空对象
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是属性数量
- 📚 **最佳实践**: 常用于创建双向查找表和状态码映射

## 相关函数

- [`mapKeys`](./mapKeys) - 映射对象的键
- [`mapValues`](./mapValues) - 映射对象的值
- [`entries`](./entries) - 获取对象的键值对数组
- [`keys`](./keys) - 获取对象的所有键

## 版本历史

- **v1.0.0** - 初始版本
