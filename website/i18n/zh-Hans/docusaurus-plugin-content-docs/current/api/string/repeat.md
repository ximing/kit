---
id: repeat
title: repeat
description: '重复给定的字符串 n 次'
---

# `repeat`

重复给定的字符串 n 次。对于生成分隔符、创建模式和复制字符串很有用。

## 语法

```typescript
function repeat(str: string, n: number): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述                               |
| ------ | -------- | ---- | ------ | ---------------------------------- |
| `str`  | `string` | ✅   | -      | 要重复的字符串                     |
| `n`    | `number` | ✅   | -      | 重复字符串的次数（必须是非负整数） |

## 返回值

- **类型**: `string`
- **描述**: 重复后的字符串。如果 n 为 0 或负数，返回空字符串。非字符串输入或非整数 n 返回空字符串。

## 示例

### 基础用法

```typescript
import { repeat } from '@rabjs/kit';

// 示例1: 重复一个字符
const str1 = repeat('*', 3);
console.log(str1); // '***'

// 示例2: 重复一个字符串
const str2 = repeat('abc', 2);
console.log(str2); // 'abcabc'

// 示例3: 重复零次
const str3 = repeat('abc', 0);
console.log(str3); // ''
```

### 高级用法

```typescript
// 示例4: 重复更大的数字
const str4 = repeat('=', 10);
console.log(str4); // '=========='

// 示例5: 重复多字符字符串
const str5 = repeat('-> ', 3);
console.log(str5); // '-> -> -> '

// 示例6: 创建模式
const str6 = repeat('ab', 5);
console.log(str6); // 'ababababab'
```

### 实际应用场景

```typescript
// 示例7: 创建分隔线
function createSeparator(char: string = '-', length: number = 50): string {
  return repeat(char, Math.ceil(length / char.length)).slice(0, length);
}

console.log(createSeparator()); // '---...---' (50 个破折号)
console.log(createSeparator('=', 20)); // '===================='
console.log(createSeparator('*=', 15)); // '*=*=*=*=*=*=*=*'

// 示例8: 创建缩进
function createIndent(level: number, indentStr: string = '  '): string {
  return repeat(indentStr, level);
}

console.log(createIndent(0) + '第 0 级'); // '第 0 级'
console.log(createIndent(1) + '第 1 级'); // '  第 1 级'
console.log(createIndent(3) + '第 3 级'); // '      第 3 级'

// 示例9: 生成测试数据
function generatePattern(pattern: string, repetitions: number): string {
  return repeat(pattern, repetitions);
}

console.log(generatePattern('123', 4)); // '123123123123'
console.log(generatePattern('a', 10)); // 'aaaaaaaaaa'

// 示例10: 创建视觉元素
function createProgressBar(filled: number, total: number = 20): string {
  const filledPart = repeat('█', filled);
  const emptyPart = repeat('░', total - filled);
  return `[${filledPart}${emptyPart}] ${filled}/${total}`;
}

console.log(createProgressBar(5, 20)); // '[█████░░░░░░░░░░░░░░] 5/20'
console.log(createProgressBar(15, 20)); // '[███████████████░░░░░] 15/20'
```

## 交互式示例

```tsx live
function RepeatExample() {
  const [input, setInput] = React.useState('*');
  const [count, setCount] = React.useState(5);
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(repeat(input, parseInt(count) || 0));
  }, [input, count]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>repeat 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>要重复的字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入字符串"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>重复次数:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min="0"
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

- ⚠️ **边界情况**: 非字符串输入返回空字符串
- ⚠️ **边界情况**: 非整数或负数 n 返回空字符串
- ⚠️ **边界情况**: n 必须是有限的
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n\*m)，其中 n 是重复次数，m 是字符串长度
- 💡 **大重复次数**: 小心使用非常大的重复次数以避免内存问题
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于创建分隔符、模式和视觉元素

## 相关函数

- [`padStart`](./padStart) - 在左侧填充
- [`padEnd`](./padEnd) - 在右侧填充
- [`template`](./template) - 替换模板占位符

## 版本历史

- **v0.0.1** - 初始版本
