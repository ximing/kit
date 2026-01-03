---
id: truncate
title: truncate
description: '如果字符串长于指定的最大长度，则截断该字符串'
---

# `truncate`

如果字符串长于指定的最大长度，则截断该字符串。对于显示文本摘要、预览和限制 UI 组件中的文本很有用。

## 语法

```typescript
function truncate(
  str: string,
  options?: {
    length?: number;
    omission?: string;
  },
): string;
```

## 参数

| 参数名             | 类型     | 必填 | 默认值 | 描述                         |
| ------------------ | -------- | ---- | ------ | ---------------------------- |
| `str`              | `string` | ✅   | -      | 要截断的字符串               |
| `options`          | `object` | ❌   | -      | 配置选项                     |
| `options.length`   | `number` | ❌   | 30     | 最大字符串长度（包括省略号） |
| `options.omission` | `string` | ❌   | '...'  | 表示文本被省略的字符串       |

## 返回值

- **类型**: `string`
- **描述**: 截断后的字符串。如果输入短于指定长度，按原样返回。非字符串输入返回空字符串。

## 示例

### 基础用法

```typescript
import { truncate } from '@rabjs/kit';

// 示例1: 默认截断
const str1 = truncate('Hi-Diddly-Ho there, Flanders!');
console.log(str1); // 'Hi-Diddly-Ho there, Flanders!' (无截断，31 字符 > 30)

// 示例2: 使用自定义长度截断
const str2 = truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 });
console.log(str2); // 'Hi-Diddly-Ho ther...'

// 示例3: 自定义省略号字符串
const str3 = truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' });
console.log(str3); // 'Hi-Diddly-Ho [...]'
```

### 高级用法

```typescript
// 示例4: 使用不同的省略号截断
const str4 = truncate('The quick brown fox jumps over the lazy dog', {
  length: 25,
  omission: '...',
});
console.log(str4); // 'The quick brown fox ju...'

// 示例5: 非常短的长度
const str5 = truncate('Hello World', { length: 5 });
console.log(str5); // 'He...'

// 示例6: 省略号比长度更长
const str6 = truncate('Hello', { length: 3, omission: '[...]' });
console.log(str6); // '' (length - omission.length = 3 - 5 = -2, max(0, -2) = 0)
```

### 实际应用场景

```typescript
// 示例7: 截断产品描述
function formatProductDescription(description: string, maxLength: number = 50): string {
  return truncate(description, { length: maxLength });
}

console.log(formatProductDescription('这是一个具有惊人功能的高质量产品'));
// 'This is a high-quality product with...'

// 示例8: 类似推文的文本预览
function createTweetPreview(text: string): string {
  return truncate(text, { length: 140, omission: '... (阅读更多)' });
}

console.log(createTweetPreview('这是一条非常长的推文，需要为社交媒体平台上的预览目的进行截断'));
// '这是一条非常长的推文，需要为社交媒体平台上的预览... (阅读更多)'

// 示例9: 表格单元格内容截断
function formatTableCell(content: string): string {
  return truncate(content, { length: 25, omission: '...' });
}

const cells = ['需要截断的非常长的产品名称', '短文本', '另一个需要显示的非常长的描述'];

const truncatedCells = cells.map(formatTableCell);
console.log(truncatedCells);
// ['需要截断的非常长的产品...', '短文本', '另一个需要显示的非常长...']

// 示例10: 评论预览
function getCommentPreview(comment: string): string {
  return truncate(comment, { length: 100, omission: '... (查看完整评论)' });
}

const comment = '这是一条非常长的评论，提供有关产品质量和功能的详细反馈';
console.log(getCommentPreview(comment));
// '这是一条非常长的评论，提供有关产品质量和功能的详细反馈... (查看完整评论)'
```

## 交互式示例

```tsx live
function TruncateExample() {
  const [input, setInput] = React.useState('Hi-Diddly-Ho there, Flanders! This is a long string.');
  const [length, setLength] = React.useState(30);
  const [omission, setOmission] = React.useState('...');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(truncate(input, { length: parseInt(length) || 30, omission }));
  }, [input, length, omission]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>truncate 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要截断的文本"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>最大长度:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min="1"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>省略号字符串:</label>
        <input
          type="text"
          value={omission}
          onChange={(e) => setOmission(e.target.value)}
          placeholder="输入省略号字符串"
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

- ⚠️ **边界情况**: 如果省略号字符串比指定长度更长，结果可能为空
- ⚠️ **边界情况**: 非字符串输入返回空字符串
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 💡 **最优省略号**: 一般使用 '...'，或根据特定 UI 需求自定义
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于文本预览、表格单元格和空间受限的 UI 组件

## 相关函数

- [`template`](./template) - 将模板占位符替换为值
- [`trim`](./trim) - 移除前导和尾部空格
- [`camelCase`](./camelCase) - 转换为驼峰命名

## 版本历史

- **v1.0.0** - 初始版本
