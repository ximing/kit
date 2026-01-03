---
id: trimStart
title: trimStart
description: '从字符串开头移除空格或指定字符'
---

# `trimStart`

从字符串的开头移除空格或指定字符。也称为 `trimLeft`。这在你只想从字符串的开头移除字符时很有用。

## 语法

```typescript
function trimStart(str: string, chars?: string): string;
```

## 参数

| 参数名  | 类型     | 必填 | 默认值 | 描述                                   |
| ------- | -------- | ---- | ------ | -------------------------------------- |
| `str`   | `string` | ✅   | -      | 要修剪的字符串                         |
| `chars` | `string` | ❌   | -      | 要移除的字符（如果不提供，则移除空格） |

## 返回值

- **类型**: `string`
- **描述**: 移除前导字符的字符串。非字符串输入返回空字符串。

## 示例

### 基础用法

```typescript
import { trimStart } from '@rabjs/kit';

// 示例1: 修剪前导空格（默认）
const str1 = trimStart('  abc  ');
console.log(str1); // 'abc  '

// 示例2: 修剪前导特定字符
const str2 = trimStart('-_-abc-_-', '-_');
console.log(str2); // 'abc-_-'

// 示例3: 修剪前导制表符和换行符
const str3 = trimStart('\t\nabc\n\t');
console.log(str3); // 'abc\n\t'
```

### 高级用法

```typescript
// 示例4: 修剪前导自定义前缀
const str4 = trimStart('***hello***', '*');
console.log(str4); // 'hello***'

// 示例5: 修剪多种前导字符类型
const str5 = trimStart('---===text===---', '-=');
console.log(str5); // 'text===---'

// 示例6: 仅修剪前导字符
const str6 = trimStart('  a  b  c  ');
console.log(str6); // 'a  b  c  '
```

### 实际应用场景

```typescript
// 示例7: 移除前导缩进
function removeIndentation(line: string): string {
  return trimStart(line, ' \t');
}

console.log(removeIndentation('    代码在这里')); // '代码在这里'
console.log(removeIndentation('\t\t缩进')); // '缩进'

// 示例8: 移除前导 URL 斜杠
function normalizeUrl(url: string): string {
  return trimStart(url, '/');
}

console.log(normalizeUrl('///example.com')); // 'example.com'
console.log(normalizeUrl('/path/to/page')); // 'path/to/page'

// 示例9: 解析命令行参数
function parseArgument(arg: string): string {
  return trimStart(arg, '-');
}

console.log(parseArgument('--verbose')); // 'verbose'
console.log(parseArgument('---flag')); // '-flag'

// 示例10: 清理消息前缀
function stripMessagePrefix(message: string): string {
  return trimStart(message, '[!] ');
}

console.log(stripMessagePrefix('[!] [!] 警告')); // '警告'
```

## 交互式示例

```tsx live
function TrimStartExample() {
  const [input, setInput] = React.useState('  hello world  ');
  const [chars, setChars] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(trimStart(input, chars || undefined));
  }, [input, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>trimStart 交互式示例</h4>
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
- ⚠️ **也称为**: 某些库中的 `trimLeft`
- 💡 **默认行为**: 如果未提供 `chars`，则使用原生 JavaScript `trimStart()` 来移除空格
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于移除前导空格、前缀和缩进

## 相关函数

- [`trim`](./trim) - 移除前导和尾部字符
- [`trimEnd`](./trimEnd) - 仅移除尾部字符
- [`truncate`](./truncate) - 截断字符串到最大长度

## 版本历史

- **v0.0.1** - 初始版本
