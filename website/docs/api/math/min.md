---
id: min
title: min
description: 'Computes the minimum value of an array'
---

# `min`

计算数组中的最小值。如果数组为空或无效，返回 `undefined`。这是一个简单但常用的数学工具函数。

## 语法

```typescript
function min(numbers: number[]): number | undefined;
```

## 参数

| 参数名    | 类型       | 必填 | 默认值 | 描述                   |
| --------- | ---------- | ---- | ------ | ---------------------- |
| `numbers` | `number[]` | ✅   | -      | 要计算最小值的数字数组 |

## 返回值

- **类型**: `number | undefined`
- **描述**: 返回数组中的最小值。如果数组为空或不是有效数组，返回 `undefined`

## 示例

### 基础用法

```typescript
import { min } from '@rabjs/kit';

// 示例1: 整数数组
const numbers = [1, 2, 3, 4, 5];
console.log(min(numbers)); // 1

// 示例2: 浮点数数组
const decimals = [1.5, 2.8, 3.2, 4.1];
console.log(min(decimals)); // 1.5

// 示例3: 负数数组
const negatives = [-5, -2, -8, -1];
console.log(min(negatives)); // -8

// 示例4: 空数组
console.log(min([])); // undefined
```

### 高级用法

```typescript
// 示例5: 与解构结合使用
const prices = [19.99, 29.99, 9.99, 39.99];
const lowest = min(prices);
console.log(`最低价格: $${lowest}`); // 最低价格: $9.99

// 示例6: 处理可能为空的数组
function getMinSafe(arr: number[], defaultValue = 0): number {
  const result = min(arr);
  return result !== undefined ? result : defaultValue;
}
console.log(getMinSafe([1, 2, 3])); // 1
console.log(getMinSafe([])); // 0

// 示例7: 组合多个数组
const batch1 = [10, 20, 30];
const batch2 = [15, 5, 35];
const overallMin = min([...batch1, ...batch2]);
console.log(overallMin); // 5
```

### 实际应用场景

```typescript
// 示例8: 查找最低分
interface Student {
  name: string;
  score: number;
}

const students: Student[] = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 72 },
  { name: 'Charlie', score: 78 },
];

const scores = students.map((s) => s.score);
const lowestScore = min(scores);
console.log(`班级最低分: ${lowestScore}`); // 班级最低分: 72

// 示例9: 找出最便宜的商品
const productPrices = [299, 199, 399, 149, 249];
const cheapestPrice = min(productPrices);
console.log(`最低价: ¥${cheapestPrice}`); // 最低价: ¥149

// 示例10: 温度监控 - 找最低温度
const temperatures = [18.5, 22.3, 15.8, 24.1, 20.5];
const minTemp = min(temperatures);
if (minTemp && minTemp < 16) {
  console.log(`警告: 温度过低 (${minTemp}°C)`); // 警告: 温度过低 (15.8°C)
}

// 示例11: 数据质量检查
function validatePositiveNumbers(numbers: number[]): boolean {
  const minimum = min(numbers);
  return minimum !== undefined && minimum > 0;
}
console.log(validatePositiveNumbers([1, 2, 3])); // true
console.log(validatePositiveNumbers([-1, 2, 3])); // false
```

## 交互式示例

```tsx live
function MinExample() {
  const [input, setInput] = React.useState('5,2,8,1,9,3');
  const [result, setResult] = React.useState(null);

  const handleCalculate = () => {
    try {
      const numbers = input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map(Number);

      if (numbers.some(isNaN)) {
        setResult('错误: 请输入有效的数字');
        return;
      }

      const minValue = min(numbers);
      setResult(minValue);
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>min 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入数字 (用逗号分隔):</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          placeholder="例如: 1,2,3,4,5"
        />
      </div>
      <div
        style={{
          background: 'white',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '10px',
        }}
      >
        <strong>最小值:</strong>
        <div
          style={{
            fontSize: '24px',
            color: typeof result === 'number' ? '#1976d2' : '#d32f2f',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          {result !== null ? result.toString() : 'undefined'}
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 当数组为空时，函数返回 `undefined`
- ⚠️ **边界情况**: 当参数不是数组时，函数返回 `undefined`
- 💡 **性能提示**: 函数使用 `Math.min(...numbers)` 实现，时间复杂度为 O(n)
- 🔒 **类型安全**: 函数仅接受 `number[]` 类型，确保类型安全
- ⚡ **内存限制**: 对于超大数组，扩展运算符可能导致栈溢出。建议数组长度不超过 10000
- 📚 **最佳实践**: 在使用前检查返回值是否为 `undefined`，避免后续计算错误
- 🔢 **特殊值**: 函数可以正确处理负数、零和浮点数

## 相关函数

- [`max`](./max) - 计算数组中的最大值
- [`minBy`](./minBy) - 按条件获取数组中的最小项
- [`sumBy`](../math/sumBy) - 按条件计算数组元素的总和
- [`meanBy`](../math/meanBy) - 按条件计算数组元素的平均值

## 版本历史

- **v0.0.1** - 初始版本
