---
id: padStart
title: padStart
description: '如果字符串短于指定长度，则在左侧填充字符串'
---

# `padStart`

如果字符串短于指定长度，则在左侧填充字符串。对于使用前导零格式化数字、对齐文本和创建固定宽度字符串很有用。

## 语法

```typescript
function padStart(str: string, length: number, chars?: string): string;
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
import { padStart } from '@rabjs/kit';

// 示例1: 使用空格填充（默认）
const str1 = padStart('abc', 6);
console.log(str1); // '   abc'

// 示例2: 使用自定义字符填充
const str2 = padStart('abc', 6, '_-');
console.log(str2); // '_-_abc'

// 示例3: 字符串已经满足长度
const str3 = padStart('abc', 3);
console.log(str3); // 'abc'
```

### 高级用法

```typescript
// 示例4: 使用前导零填充数字
const str4 = padStart('5', 3, '0');
console.log(str4); // '005'

// 示例5: 使用多字符模式填充
const str5 = padStart('hello', 10, '=*');
console.log(str5); // '=*=*hello'

// 示例6: 多个填充模式
const nums = ['1', '42', '123'];
const padded = nums.map((n) => padStart(n, 3, '0'));
console.log(padded); // ['001', '042', '123']
```

### 实际应用场景

```typescript
// 示例7: 格式化时间值
function formatTime(hours: number, minutes: number): string {
  return `${padStart(String(hours), 2, '0')}:${padStart(String(minutes), 2, '0')}`;
}

console.log(formatTime(9, 5)); // '09:05'
console.log(formatTime(14, 30)); // '14:30'

// 示例8: 格式化产品代码
function formatProductCode(code: string): string {
  return `PROD-${padStart(code, 5, '0')}`;
}

console.log(formatProductCode('123')); // 'PROD-00123'
console.log(formatProductCode('5')); // 'PROD-00005'

// 示例9: 创建对齐的输出
function createAlignedList(items: string[]): string {
  const maxLength = Math.max(...items.map((i) => i.length));
  return items.map((item) => padStart(item, maxLength, '.')).join('\n');
}

console.log(createAlignedList(['短', '中等文本', 'x']));
// '短......
//  中等文本
//  x.......'

// 示例10: 格式化发票号码
function formatInvoice(number: number): string {
  return `INV-${padStart(String(number), 6, '0')}`;
}

console.log(formatInvoice(42)); // 'INV-000042'
console.log(formatInvoice(1234)); // 'INV-001234'
```

## 交互式示例

```tsx live
function PadStartExample() {
  const [input, setInput] = React.useState('abc');
  const [length, setLength] = React.useState(6);
  const [chars, setChars] = React.useState('_-');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(padStart(input, parseInt(length) || 0, chars || ' '));
  }, [input, length, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>padStart 交互式示例</h4>
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
          placeholder="例如 _- 或 0"
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
- 📚 **最佳实践**: 用于格式化数字、创建固定宽度输出和对齐文本

## 相关函数

- [`padEnd`](./padEnd) - 在右侧填充
- [`trim`](./trim) - 移除前导和尾部字符
- [`truncate`](./truncate) - 截断字符串到最大长度

## 版本历史

- **v1.0.0** - 初始版本
