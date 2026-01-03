---
id: max
title: max
description: 'Computes the maximum value of an array'
---

# `max`

计算数组中的最大值。如果数组为空或无效，返回 `undefined`。这是一个简单但常用的数学工具函数。

## 语法

```typescript
function max(numbers: number[]): number | undefined;
```

## 参数

| 参数名    | 类型       | 必填 | 默认值 | 描述                   |
| --------- | ---------- | ---- | ------ | ---------------------- |
| `numbers` | `number[]` | ✅   | -      | 要计算最大值的数字数组 |

## 返回值

- **类型**: `number | undefined`
- **描述**: 返回数组中的最大值。如果数组为空或不是有效数组，返回 `undefined`

## 示例

### 基础用法

```typescript
import { max } from '@rabjs/kit';

// 示例1: 整数数组
const numbers = [1, 2, 3, 4, 5];
console.log(max(numbers)); // 5

// 示例2: 浮点数数组
const decimals = [1.5, 2.8, 3.2, 4.1];
console.log(max(decimals)); // 4.1

// 示例3: 负数数组
const negatives = [-5, -2, -8, -1];
console.log(max(negatives)); // -1

// 示例4: 空数组
console.log(max([])); // undefined
```

### 高级用法

```typescript
// 示例5: 与解构结合使用
const scores = [85, 92, 78, 95, 88];
const highest = max(scores);
console.log(`最高分: ${highest}`); // 最高分: 95

// 示例6: 处理可能为空的数组
function getMaxSafe(arr: number[]): number {
  const result = max(arr);
  return result !== undefined ? result : 0;
}
console.log(getMaxSafe([1, 2, 3])); // 3
console.log(getMaxSafe([])); // 0

// 示例7: 组合多个数组
const array1 = [10, 20, 30];
const array2 = [15, 25, 35];
const allMax = max([...array1, ...array2]);
console.log(allMax); // 35
```

### 实际应用场景

```typescript
// 示例8: 计算学生最高分
interface Student {
  name: string;
  score: number;
}

const students: Student[] = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 },
];

const scores = students.map((s) => s.score);
const highestScore = max(scores);
console.log(`班级最高分: ${highestScore}`); // 班级最高分: 92

// 示例9: 价格比较
const prices = [29.99, 49.99, 19.99, 39.99];
const maxPrice = max(prices);
console.log(`最高价格: $${maxPrice}`); // 最高价格: $49.99

// 示例10: 温度监控
const temperatures = [18.5, 22.3, 19.8, 24.1, 20.5];
const maxTemp = max(temperatures);
if (maxTemp && maxTemp > 25) {
  console.log('温度过高！');
} else {
  console.log(`最高温度: ${maxTemp}°C`); // 最高温度: 24.1°C
}
```

## 交互式示例

```tsx live
function MaxExample() {
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

      const maxValue = max(numbers);
      setResult(maxValue);
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>max 交互式示例</h4>
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
        <strong>最大值:</strong>
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
- 💡 **性能提示**: 函数使用 `Math.max(...numbers)` 实现，时间复杂度为 O(n)
- 🔒 **类型安全**: 函数仅接受 `number[]` 类型，确保类型安全
- ⚡ **内存限制**: 对于超大数组，扩展运算符可能导致栈溢出。建议数组长度不超过 10000
- 📚 **最佳实践**: 在使用前检查返回值是否为 `undefined`，避免后续计算错误

## 相关函数

- [`min`](./min) - 计算数组中的最小值
- [`maxBy`](./maxBy) - 按条件获取数组中的最大项
- [`sumBy`](../math/sumBy) - 按条件计算数组元素的总和
- [`meanBy`](../math/meanBy) - 按条件计算数组元素的平均值

## 版本历史

- **v1.0.0** - 初始版本
