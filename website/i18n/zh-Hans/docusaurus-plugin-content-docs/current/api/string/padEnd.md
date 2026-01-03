---
id: padEnd
title: padEnd
description: '如果字符串短于指定长度，则在右侧填充字符串'
---

# `padEnd`

如果字符串短于指定长度，则在右侧填充字符串。对于格式化文本对齐、创建固定宽度列和对齐输出很有用。

## 语法

```typescript
function padEnd(str: string, length: number, chars?: string): string;
```

## 参数

| 参数名   | 类型     | 必填 | 默认值 | 描述                           |
| -------- | -------- | ---- | ------ | ------------------------------ |
| `str`    | `string` | ✅   | -      | 要填充的字符串                 |
| `length` | `number` | ✅   | -      | 字符串的目标长度               |
| `chars`  | `string` | ❌   | ' '    | 用于填充的字符串（默认：空格） |

## 返回值

- **类型**: `string`
- **描述**: 填充后的字符串。如果字符串已经长于或等于目标长度，按原样返回。非字符串输入返回空字符串。

## 示例

### 基础用法

```typescript
import { padEnd } from '@rabjs/kit';

// 示例1: 使用空格填充（默认）
const str1 = padEnd('abc', 6);
console.log(str1); // 'abc   '

// 示例2: 使用自定义字符填充
const str2 = padEnd('abc', 6, '_-');
console.log(str2); // 'abc_-_'

// 示例3: 字符串已经满足长度
const str3 = padEnd('abc', 3);
console.log(str3); // 'abc'
```

### 高级用法

```typescript
// 示例4: 使用点填充
const str4 = padEnd('Item', 10, '.');
console.log(str4); // 'Item......'

// 示例5: 使用多字符模式填充
const str5 = padEnd('hello', 10, '=*');
console.log(str5); // 'hello=*=*='

// 示例6: 创建类似表格的输出
const items = ['Name', 'Age', 'City'];
const padded = items.map((item) => padEnd(item, 15, '.'));
console.log(padded.join('\n'));
// 'Name...........
//  Age............
//  City............'
```

### 实际应用场景

```typescript
// 示例7: 格式化表格列
function formatTableRow(columns: string[], width: number = 20): string {
  return columns.map((col) => padEnd(col, width, ' ')).join('|');
}

console.log(formatTableRow(['名称', '邮箱', '状态']));
// '名称                |邮箱                |状态                '

// 示例8: 创建带点的菜单项
function createMenuLine(label: string, price: number): string {
  const dotCount = 40 - label.length - String(price).length;
  return `${label}${'.'.repeat(dotCount)}${price}`;
}

console.log(createMenuLine('咖啡', 3.5)); // '咖啡.................................3.5'
console.log(createMenuLine('浓缩咖啡', 2.0)); // '浓缩咖啡...............................2'

// 示例9: 格式化日志输出
function formatLogLine(level: string, message: string): string {
  const paddedLevel = padEnd(`[${level}]`, 10);
  return `${paddedLevel} ${message}`;
}

console.log(formatLogLine('INFO', '应用程序已启动'));
// '[INFO]     应用程序已启动'

// 示例10: 创建对齐的标签
function createLabelValue(label: string, value: string): string {
  return `${padEnd(label, 20)}: ${value}`;
}

console.log(createLabelValue('用户名', 'john_doe'));
// '用户名              : john_doe'
console.log(createLabelValue('邮箱', 'john@example.com'));
// '邮箱                : john@example.com'
```

## 交互式示例

```tsx live
function PadEndExample() {
  const [input, setInput] = React.useState('abc');
  const [length, setLength] = React.useState(6);
  const [chars, setChars] = React.useState('_-');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(padEnd(input, parseInt(length) || 0, chars || ' '));
  }, [input, length, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>padEnd 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要填充的文本"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>目标长度:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min="0"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>填充字符:</label>
        <input
          type="text"
          value={chars}
          onChange={(e) => setChars(e.target.value)}
          placeholder="例如 _- 或 ."
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
- ⚠️ **空填充**: 如果 `chars` 为空，字符串按原样返回
- 💡 **模式重复**: 填充模式根据需要重复以达到目标长度
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于创建固定宽度列、表格格式化和对齐输出

## 相关函数

- [`padStart`](./padStart) - 在左侧填充
- [`trim`](./trim) - 移除前导和尾部字符
- [`truncate`](./truncate) - 截断字符串到最大长度

## 版本历史

- **v0.0.1** - 初始版本
