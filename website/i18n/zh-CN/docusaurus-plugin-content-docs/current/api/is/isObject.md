---
id: isObject
title: isObject
description: '检查值是否为对象'
---

# `isObject`

检查一个值是否为对象类型。在 JavaScript 中，对象类型包括数组、函数、正则表达式、日期对象等。这是一个类型守卫函数。

## 语法

```typescript
function isObject(value: unknown): value is Record<string, any>;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is Record<string, any>`（类型守卫）
- **描述**: 如果值是对象返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isObject } from '@rabjs/kit';

// 对象
console.log(isObject({})); // true
console.log(isObject({ a: 1 })); // true
console.log(isObject(new Object())); // true

// 数组（在 JavaScript 中也是对象）
console.log(isObject([])); // true
console.log(isObject([1, 2, 3])); // true

// 函数
console.log(isObject(() => {})); // true
console.log(isObject(function () {})); // true

// 特殊对象
console.log(isObject(new Date())); // true
console.log(isObject(/regex/)); // true
console.log(isObject(new Map())); // true

// 原始类型
console.log(isObject('字符串')); // false
console.log(isObject(123)); // false
console.log(isObject(true)); // false
console.log(isObject(null)); // false
console.log(isObject(undefined)); // false
```

### 高级用法 - 类型守卫

```typescript
// 类型守卫示例
function processValue(value: unknown) {
  if (isObject(value)) {
    // 在这个块内，TypeScript 知道 value 是对象
    console.log('对象类型:', typeof value);

    if (Array.isArray(value)) {
      console.log('这是数组');
    } else if (typeof value === 'function') {
      console.log('这是函数');
    } else {
      console.log('这是普通对象');
    }
  } else {
    console.log('原始类型值');
  }
}

// 过滤对象
function filterObjects(items: unknown[]): Record<string, any>[] {
  return items.filter((item) => isObject(item) && !Array.isArray(item) && typeof item !== 'function');
}

const mixed = [1, { name: '张三' }, '字符串', [2, 3], { age: 30 }];
const objects = filterObjects(mixed);
console.log(objects); // [{ name: '张三' }, { age: 30 }]
```

### 实际应用场景

```typescript
// API 响应处理
function handleResponse(response: unknown) {
  if (isObject(response)) {
    if (Array.isArray(response)) {
      console.log(`获取列表，共 ${response.length} 条`);
      return response;
    } else {
      console.log('获取单个对象');
      return [response];
    }
  }
  throw new Error('无效的响应格式');
}

// 深拷贝实现（简化版）
function deepClone(obj: unknown): unknown {
  if (!isObject(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Map) {
    const newMap = new Map();
    obj.forEach((value, key) => {
      newMap.set(key, deepClone(value));
    });
    return newMap;
  }

  if (typeof obj === 'object') {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key]);
      }
    }
    return newObj;
  }

  return obj;
}

// 配置对象验证
function validateConfig(config: unknown): boolean {
  if (!isObject(config) || Array.isArray(config)) {
    console.error('配置必须是对象');
    return false;
  }
  return true;
}
```

## 交互式示例

```tsx live
function IsObjectExample() {
  const [result, setResult] = React.useState(null);

  const testValues = [
    { label: '空对象 {}', value: {} },
    { label: '对象 {a:1}', value: { a: 1 } },
    { label: '空数组 []', value: [] },
    { label: '数组 [1,2]', value: [1, 2] },
    { label: '函数 () => {}', value: () => {} },
    { label: '日期 new Date()', value: new Date() },
    { label: '正则 /regex/', value: /regex/ },
    { label: 'Map', value: new Map() },
    { label: '字符串 "你好"', value: '你好' },
    { label: '数字 123', value: 123 },
    { label: '布尔 true', value: true },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
  ];

  const handleTest = (value) => {
    const isObject_result = isObject(value);
    let typeInfo = typeof value;
    if (isObject_result && Array.isArray(value)) {
      typeInfo = '数组';
    } else if (isObject_result && value instanceof Date) {
      typeInfo = '日期';
    } else if (isObject_result && value instanceof Map) {
      typeInfo = 'Map';
    }

    setResult({
      value: JSON.stringify(value),
      isObject: isObject_result,
      typeInfo: typeInfo,
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>isObject 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>选择测试值:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
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
          <strong>isObject 结果:</strong>{' '}
          <span style={{ color: result.isObject ? '#52c41a' : '#f5222d', fontWeight: 'bold' }}>
            {result.isObject ? 'true' : 'false'}
          </span>{' '}
          <br />
          <strong>类型:</strong> {result.typeInfo}
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- ⚠️ **null 是特殊情况**: `typeof null === 'object'`，但 `isObject(null)` 返回 `false`
- 🔒 **包含数组和函数**: 在 JavaScript 中，数组和函数也是对象，所以 `isObject([])` 和 `isObject(() => {})` 都返回 `true`
- 💡 **与 isPlainObject 的区别**: `isObject` 包括所有对象类型，而 `isPlainObject` 只包括普通对象
- 📚 **性能**: 该函数使用 `typeof` 检查，性能最优
- 🔍 **类型守卫**: 返回类型 `value is Record<string, any>`，可用于 TypeScript 类型缩小

## 相关函数

- [`isPlainObject`](./isPlainObject) - 检查值是否为普通对象
- [`isArray`](./isArray) - 检查值是否为数组
- [`isFunction`](./isFunction) - 检查值是否为函数
- [`isEmpty`](./isEmpty) - 检查值是否为空

## 版本历史

- **v1.0.0** - 初始版本
