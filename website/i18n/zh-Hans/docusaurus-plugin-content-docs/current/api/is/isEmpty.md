---
id: isEmpty
title: isEmpty
description: '检查值是否为空'
---

# `isEmpty`

检查一个值是否为空。一个值被认为是空的，如果它满足以下任何条件：

- `null` 或 `undefined`
- 空字符串
- 空数组
- 空对象（没有可枚举属性）
- `NaN`

## 语法

```typescript
function isEmpty(value: unknown): boolean;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `boolean`
- **描述**: 如果值为空返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isEmpty } from '@rabjs/kit';

// 检查 null 和 undefined
console.log(isEmpty(null)); // true
console.log(isEmpty(undefined)); // true

// 检查字符串
console.log(isEmpty('')); // true
console.log(isEmpty('你好')); // false

// 检查数组
console.log(isEmpty([])); // true
console.log(isEmpty([1, 2])); // false

// 检查对象
console.log(isEmpty({})); // true
console.log(isEmpty({ a: 1 })); // false

// 检查数字
console.log(isEmpty(NaN)); // true
console.log(isEmpty(0)); // false
console.log(isEmpty(1)); // false

// 检查布尔值
console.log(isEmpty(false)); // false
console.log(isEmpty(true)); // false
```

### 高级用法

```typescript
// 表单验证
function validateFormField(value: unknown): boolean {
  if (isEmpty(value)) {
    console.log('字段不能为空');
    return false;
  }
  return true;
}

validateFormField(''); // false
validateFormField('你好'); // true
validateFormField(null); // false

// 数据过滤
const data = [
  { name: '张三', bio: '软件工程师' },
  { name: '李四', bio: '' },
  { name: '王五', bio: null },
  { name: '赵六', bio: '产品经理' },
];

const validUsers = data.filter((user) => !isEmpty(user.bio));
console.log(validUsers);
// [
//   { name: '张三', bio: '软件工程师' },
//   { name: '赵六', bio: '产品经理' }
// ]
```

### 实际应用场景

```typescript
// API 响应数据处理
function processApiResponse(response: unknown) {
  if (isEmpty(response)) {
    return { status: 'error', message: '服务器返回空数据' };
  }
  return { status: 'success', data: response };
}

// 条件渲染
function renderContent(content: unknown) {
  if (isEmpty(content)) {
    return '<div class="empty-state">暂无内容</div>';
  }
  return `<div class="content">${content}</div>`;
}

// 配置对象验证
function initializeApp(config: unknown) {
  if (isEmpty(config)) {
    console.warn('配置对象为空，使用默认配置');
    return getDefaultConfig();
  }
  return mergeWithDefaults(config);
}
```

## 交互式示例

```tsx live
function IsEmptyExample() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState(null);

  const testValues = [
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
    { label: '空字符串 ""', value: '' },
    { label: '字符串 "你好"', value: '你好' },
    { label: '空数组 []', value: [] },
    { label: '数组 [1,2]', value: [1, 2] },
    { label: '空对象 {}', value: {} },
    { label: '对象 {a:1}', value: { a: 1 } },
    { label: '数字 0', value: 0 },
    { label: '数字 42', value: 42 },
    { label: 'NaN', value: NaN },
    { label: '布尔值 false', value: false },
    { label: '布尔值 true', value: true },
  ];

  const handleTest = (value) => {
    const isEmpty_result = isEmpty(value);
    setResult({
      value: value === undefined ? 'undefined' : value === null ? 'null' : JSON.stringify(value),
      isEmpty: isEmpty_result,
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>isEmpty 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>选择测试值:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px' }}>
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
          <strong>isEmpty 结果:</strong>{' '}
          <span style={{ color: result.isEmpty ? '#52c41a' : '#f5222d', fontWeight: 'bold' }}>
            {result.isEmpty ? 'true' : 'false'}
          </span>
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- ⚠️ **特殊情况**: `NaN` 被认为是空值，因为 `Number.isNaN(NaN)` 返回 `true`
- ⚠️ **对象检查**: 只检查可枚举属性，使用 `Object.defineProperty` 定义的不可枚举属性不会影响结果
- 💡 **性能提示**: 该函数对各种类型的检查都很高效，时间复杂度为 O(1) 或 O(n)（对象属性数量）
- 🔒 **类型安全**: 函数接受任何类型的值，返回布尔值
- 📚 **最佳实践**: 在表单验证、数据处理和条件渲染中广泛使用

## 相关函数

- [`isNil`](./isNil) - 检查值是否为 `null` 或 `undefined`
- [`isArray`](./isArray) - 检查值是否为数组
- [`isObject`](./isObject) - 检查值是否为对象
- [`isString`](./isString) - 检查值是否为字符串

## 版本历史

- **v0.0.1** - 初始版本
