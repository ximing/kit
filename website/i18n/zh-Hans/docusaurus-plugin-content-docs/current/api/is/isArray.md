---
id: isArray
title: isArray
description: '检查值是否为数组'
---

# `isArray`

检查一个值是否为数组。这是一个类型守卫函数，可以在 TypeScript 中用于类型缩小。

## 语法

```typescript
function isArray(value: unknown): value is any[];
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is any[]`（类型守卫）
- **描述**: 如果值是数组返回 `true`，否则返回 `false`。在 TypeScript 中，返回 `true` 时会将值的类型缩小为 `any[]`

## 示例

### 基础用法

```typescript
import { isArray } from '@rabjs/kit';

// 基础检查
console.log(isArray([])); // true
console.log(isArray([1, 2, 3])); // true
console.log(isArray(new Array())); // true

// 类数组对象不是数组
console.log(isArray({ length: 0 })); // false
console.log(isArray('abc')); // false
console.log(isArray(123)); // false

// null 和 undefined
console.log(isArray(null)); // false
console.log(isArray(undefined)); // false
```

### 高级用法 - TypeScript 类型守卫

```typescript
// 类型守卫示例
function processValue(value: unknown) {
  if (isArray(value)) {
    // 在这个块内，TypeScript 知道 value 是数组
    console.log('数组长度:', value.length);
    value.forEach((item, index) => {
      console.log(`元素 ${index}:`, item);
    });
  } else {
    console.log('不是数组');
  }
}

processValue([1, 2, 3]); // 数组长度: 3
processValue('你好'); // 不是数组

// 处理混合类型
function filterArrays(items: unknown[]): any[][] {
  return items.filter(isArray);
}

const mixed = [1, [2, 3], '字符串', [4, 5], null, [6]];
const arrays = filterArrays(mixed);
console.log(arrays); // [[2, 3], [4, 5], [6]]
```

### 实际应用场景

```typescript
// API 响应数据验证
function handleApiResponse(response: unknown) {
  if (isArray(response)) {
    console.log(`收到 ${response.length} 条数据`);
    return response.map((item) => processItem(item));
  } else if (typeof response === 'object' && response !== null) {
    console.log('单个对象响应');
    return [processItem(response)];
  } else {
    throw new Error('无效的响应格式');
  }
}

// 递归处理嵌套结构
function flattenData(data: unknown): any[] {
  if (isArray(data)) {
    return data.flatMap((item) => flattenData(item));
  }
  return [data];
}

flattenData([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]

// 表单数据处理
function processFormData(data: unknown) {
  if (isArray(data)) {
    return {
      type: '数组',
      items: data,
      count: data.length,
    };
  }
  return {
    type: '单个值',
    item: data,
    count: 1,
  };
}
```

## 交互式示例

```tsx live
function IsArrayExample() {
  const [result, setResult] = React.useState(null);

  const testValues = [
    { label: '空数组 []', value: [] },
    { label: '数字数组 [1,2,3]', value: [1, 2, 3] },
    { label: '混合数组', value: [1, '你好', true, null] },
    {
      label: '嵌套数组 [[1,2],[3,4]]',
      value: [
        [1, 2],
        [3, 4],
      ],
    },
    { label: '类数组 {length: 0}', value: { length: 0 } },
    { label: '字符串 "数组"', value: '数组' },
    { label: '数字 123', value: 123 },
    { label: '对象 {}', value: {} },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
  ];

  const handleTest = (value) => {
    const isArray_result = isArray(value);
    setResult({
      value: JSON.stringify(value),
      isArray: isArray_result,
      length: isArray_result ? value.length : 'N/A',
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>isArray 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>选择测试值:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
          {testValues.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTest(item.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          <strong>测试值:</strong> {result.value} <br />
          <strong>isArray 结果:</strong>{' '}
          <span style={{ color: result.isArray ? '#52c41a' : '#f5222d', fontWeight: 'bold' }}>
            {result.isArray ? 'true' : 'false'}
          </span>{' '}
          <br />
          {result.isArray && (
            <>
              <strong>数组长度:</strong> {result.length}
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- 🔒 **类型守卫**: 在 TypeScript 中返回类型 `value is any[]`，可用于类型缩小
- 💡 **类数组对象**: 具有 `length` 属性的对象（如 `arguments`、`NodeList`）不被认为是数组
- ⚠️ **跨框架**: 在 iframe 或 Web Worker 中创建的数组仍然会被正确识别
- 📚 **性能**: 该函数使用原生 `Array.isArray()`，性能最优
- 🔍 **与 typeof 的区别**: `typeof []` 返回 `'object'`，而 `isArray([])` 返回 `true`

## 相关函数

- [`isEmpty`](./isEmpty) - 检查值是否为空
- [`isObject`](./isObject) - 检查值是否为对象
- [`isString`](./isString) - 检查值是否为字符串
- [`isFunction`](./isFunction) - 检查值是否为函数

## 版本历史

- **v1.0.0** - 初始版本
