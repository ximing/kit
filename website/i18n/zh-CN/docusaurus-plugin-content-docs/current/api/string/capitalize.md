---
id: capitalize
title: capitalize
description: '将首字符转换为大写，其余转换为小写'
---

# `capitalize`

将字符串的首字符转换为大写，其余字符转换为小写。这对于将字符串规范化为标准格式很有用。

## 语法

```typescript
function capitalize(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述           |
| ------ | -------- | ---- | ------ | -------------- |
| `str`  | `string` | ✅   | -      | 要大写的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 首字符大写、其余小写的字符串。空字符串和非字符串按原样返回。

## 示例

### 基础用法

```typescript
import { capitalize } from '@rabjs/kit';

// 示例1: 大写小写字符串
const str1 = capitalize('fred');
console.log(str1); // 'Fred'

// 示例2: 规范化大写字符串
const str2 = capitalize('FRED');
console.log(str2); // 'Fred'

// 示例3: 混合大小写字符串
const str3 = capitalize('fReD');
console.log(str3); // 'Fred'
```

### 高级用法

```typescript
// 示例4: 大写列表中的名字
const names = ['john', 'JANE', 'bOb'];
const capitalizedNames = names.map(capitalize);
console.log(capitalizedNames); // ['John', 'Jane', 'Bob']

// 示例5: 格式化用户输入
function formatUserName(input: string): string {
  return capitalize(input.trim());
}

console.log(formatUserName('  alice  ')); // 'Alice'
console.log(formatUserName('CHARLIE')); // 'Charlie'
```

### 实际应用场景

```typescript
// 示例6: 显示格式化的名字
function displayUserName(firstName: string, lastName: string): string {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
}

console.log(displayUserName('john', 'DOE')); // 'John Doe'
console.log(displayUserName('JANE', 'smith')); // 'Jane Smith'

// 示例7: 规范化句子开头
function normalizeSentence(sentence: string): string {
  const words = sentence.split(' ');
  return [capitalize(words[0]), ...words.slice(1)].join(' ');
}

console.log(normalizeSentence('hello WORLD')); // 'Hello WORLD'
console.log(normalizeSentence('tHE QUICK BROWN FOX')); // 'The QUICK BROWN FOX'

// 示例8: 表单字段显示
const formData = {
  status: 'active',
  role: 'admin',
  type: 'premium',
};

const displayLabels = Object.fromEntries(
  Object.entries(formData).map(([key, value]) => [key, capitalize(value as string)]),
);
console.log(displayLabels);
// { status: 'Active', role: 'Admin', type: 'Premium' }
```

## 交互式示例

```tsx live
function CapitalizeExample() {
  const [input, setInput] = React.useState('hello world');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(capitalize(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>capitalize 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要大写的文本"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', borderRadius: '4px' }}>
          {result}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 空字符串按原样返回
- ⚠️ **边界情况**: 非字符串输入按原样返回
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于规范化面向用户的文本和显示名称

## 相关函数

- [`upperFirst`](./upperFirst) - 仅大写首字符
- [`lowerFirst`](./lowerFirst) - 仅小写首字符
- [`camelCase`](./camelCase) - 转换为驼峰命名 (firstName)
- [`pascalCase`](./pascalCase) - 转换为 PascalCase (FirstName)

## 版本历史

- **v1.0.0** - 初始版本
