---
id: trimEnd
title: trimEnd
description: '从字符串结尾移除空格或指定字符'
---

# `trimEnd`

从字符串的结尾移除空格或指定字符。也称为 `trimRight`。这在你只想从字符串的结尾移除字符时很有用。

## 语法

```typescript
function trimEnd(str: string, chars?: string): string;
```

## 参数

| 参数名  | 类型     | 必填 | 默认值 | 描述                                   |
| ------- | -------- | ---- | ------ | -------------------------------------- |
| `str`   | `string` | ✅   | -      | 要修剪的字符串                         |
| `chars` | `string` | ❌   | -      | 要移除的字符（如果不提供，则移除空格） |

## 返回值

- **类型**: `string`
- **描述**: 移除尾部字符的字符串。非字符串输入返回空字符串。

## 示例

### 基础用法

```typescript
import { trimEnd } from '@rabjs/kit';

// 示例1: 修剪尾部空格（默认）
const str1 = trimEnd('  abc  ');
console.log(str1); // '  abc'

// 示例2: 修剪尾部特定字符
const str2 = trimEnd('-_-abc-_-', '-_');
console.log(str2); // '-_-abc'

// 示例3: 修剪尾部制表符和换行符
const str3 = trimEnd('\t\nabc\n\t');
console.log(str3); // '\t\nabc'
```

### 高级用法

```typescript
// 示例4: 修剪尾部自定义后缀
const str4 = trimEnd('hello***', '*');
console.log(str4); // 'hello'

// 示例5: 修剪多种尾部字符类型
const str5 = trimEnd('---===text===---', '-=');
console.log(str5); // '---===text'

// 示例6: 仅修剪尾部字符
const str6 = trimEnd('  a  b  c  ');
console.log(str6); // '  a  b  c'
```

### 实际应用场景

```typescript
// 示例7: 移除尾部换行符
function removeTrailingNewlines(text: string): string {
  return trimEnd(text, '\n\r');
}

console.log(removeTrailingNewlines('你好\n\n')); // '你好'
console.log(removeTrailingNewlines('世界\r\n')); // '世界'

// 示例8: 移除路径中的尾部斜杠
function normalizePath(path: string): string {
  return trimEnd(path, '/');
}

console.log(normalizePath('/home/user/')); // '/home/user'
console.log(normalizePath('/var/log///')); // '/var/log'

// 示例9: 移除尾部标点符号
function cleanSentence(sentence: string): string {
  return trimEnd(sentence, '.,!?;:');
}

console.log(cleanSentence('你好!!!')); // '你好'
console.log(cleanSentence('什么??')); // '什么'

// 示例10: 移除列表中的尾部逗号
function cleanList(list: string): string {
  return trimEnd(list, ',');
}

console.log(cleanList('苹果,香蕉,橙子,')); // '苹果,香蕉,橙子'
```

## 交互式示例

```tsx live
function TrimEndExample() {
  const [input, setInput] = React.useState('  hello world  ');
  const [chars, setChars] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(trimEnd(input, chars || undefined));
  }, [input, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>trimEnd 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要修剪的文本"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>要修剪的字符（留空则修剪空格）:</label>
        <input
          type="text"
          value={chars}
          onChange={(e) => setChars(e.target.value)}
          placeholder="例如 -_ 或留空"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', borderRadius: '4px' }}>
          '{result}'
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 非字符串输入返回空字符串
- ⚠️ **字符转义**: `chars` 参数中的特殊正则表达式字符会自动转义
- ⚠️ **也称为**: 某些库中的 `trimRight`
- 💡 **默认行为**: 如果未提供 `chars`，则使用原生 JavaScript `trimEnd()` 来移除空格
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于移除尾部空格、后缀和行尾

## 相关函数

- [`trim`](./trim) - 移除前导和尾部字符
- [`trimStart`](./trimStart) - 仅移除前导字符
- [`truncate`](./truncate) - 截断字符串到最大长度

## 版本历史

- **v0.0.1** - 初始版本
