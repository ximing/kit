---
id: upperFirst
title: upperFirst
description: '将字符串的首字符转换为大写'
---

# `upperFirst`

将字符串的首字符转换为大写，其余字符保持不变。这在你只想大写首字母而不修改其余字符串时很有用。

## 语法

```typescript
function upperFirst(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述           |
| ------ | -------- | ---- | ------ | -------------- |
| `str`  | `string` | ✅   | -      | 要转换的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 首字符大写的字符串。空字符串和非字符串按原样返回。

## 示例

### 基础用法

```typescript
import { upperFirst } from '@rabjs/kit';

// 示例1: 大写首字符
const str1 = upperFirst('fred');
console.log(str1); // 'Fred'

// 示例2: 已经是大写
const str2 = upperFirst('FRED');
console.log(str2); // 'FRED'

// 示例3: 混合大小写
const str3 = upperFirst('fRED');
console.log(str3); // 'FRED'
```

### 高级用法

```typescript
// 示例4: 处理单词列表
const words = ['hello', 'WORLD', 'fOO'];
const processed = words.map(upperFirst);
console.log(processed); // ['Hello', 'WORLD', 'FOO']

// 示例5: 格式化首字母大写的缩写
function formatAcronym(acronym: string): string {
  return upperFirst(acronym.toLowerCase());
}

console.log(formatAcronym('API')); // 'Api'
console.log(formatAcronym('html')); // 'Html'
```

### 实际应用场景

```typescript
// 示例6: 大写句子开头
function startSentence(text: string): string {
  return upperFirst(text);
}

console.log(startSentence('the quick brown fox')); // 'The quick brown fox'
console.log(startSentence('hello WORLD')); // 'Hello WORLD'

// 示例7: 格式化显示名称，保留大小写
function formatDisplayName(name: string): string {
  return upperFirst(name);
}

console.log(formatDisplayName('mCDonald')); // 'MCDonald'
console.log(formatDisplayName('oConnell')); // 'OConnell'

// 示例8: 从代码生成标签
function generateLabel(code: string): string {
  return upperFirst(code.replace(/_/g, ' '));
}

console.log(generateLabel('user_profile')); // 'User profile'
console.log(generateLabel('api_key')); // 'Api key'
```

## 交互式示例

```tsx live
function UpperFirstExample() {
  const [input, setInput] = React.useState('hello world');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(upperFirst(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>upperFirst 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要转换的文本"
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
- ⚠️ **与 capitalize 的区别**: 此函数仅影响首字符，其余部分保持不变
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 当需要保留字符串其余部分的大小写时使用

## 相关函数

- [`lowerFirst`](./lowerFirst) - 首字符转换为小写
- [`capitalize`](./capitalize) - 大写首字符，其余小写
- [`camelCase`](./camelCase) - 转换为驼峰命名 (firstName)
- [`pascalCase`](./pascalCase) - 转换为 PascalCase (FirstName)

## 版本历史

- **v1.0.0** - 初始版本
