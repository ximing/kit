---
id: mean
title: mean
description: 'Computes the mean (average) of an array of numbers'
---

# `mean`

计算数字数组的平均值（算术平均数）。这是统计分析中最常用的集中趋势度量。

## 语法

```typescript
function mean(numbers: number[]): number;
```

## 参数

| 参数名    | 类型       | 必填 | 默认值 | 描述                   |
| --------- | ---------- | ---- | ------ | ---------------------- |
| `numbers` | `number[]` | ✅   | -      | 要计算平均值的数字数组 |

## 返回值

- **类型**: `number`
- **描述**: 返回数组的平均值。如果数组为空或无效，返回 0。

## 示例

### 基础用法

```typescript
import { mean } from '@rabjs/kit';

// 示例1: 基本平均值计算
console.log(mean([1, 2, 3, 4])); // 2.5
console.log(mean([10, 20, 30])); // 20
console.log(mean([5])); // 5

// 示例2: 处理空数组
console.log(mean([])); // 0

// 示例3: 包含小数的计算
console.log(mean([1.5, 2.5, 3.5])); // 2.5
```

### 高级用法

```typescript
// 示例4: 计算学生平均分
interface Student {
  name: string;
  scores: number[];
}

function calculateAverageScore(student: Student): number {
  return mean(student.scores);
}

const student = {
  name: '张三',
  scores: [85, 92, 78, 90, 88],
};

console.log(calculateAverageScore(student)); // 86.6

// 示例5: 批量计算平均值
function calculateClassAverages(students: Student[]): Record<string, number> {
  return students.reduce(
    (result, student) => {
      result[student.name] = mean(student.scores);
      return result;
    },
    {} as Record<string, number>,
  );
}

const students = [
  { name: '张三', scores: [85, 90, 88] },
  { name: '李四', scores: [92, 95, 89] },
  { name: '王五', scores: [78, 82, 85] },
];

console.log(calculateClassAverages(students));
// { '张三': 87.67, '李四': 92, '王五': 81.67 }
```

### 实际应用场景

```typescript
// 示例6: 性能指标监控
interface PerformanceMetrics {
  responseTime: number[];
  cpuUsage: number[];
  memoryUsage: number[];
}

function analyzePerformance(metrics: PerformanceMetrics) {
  return {
    avgResponseTime: mean(metrics.responseTime),
    avgCpuUsage: mean(metrics.cpuUsage),
    avgMemoryUsage: mean(metrics.memoryUsage),
  };
}

const metrics = {
  responseTime: [120, 150, 135, 142, 138],
  cpuUsage: [45, 52, 48, 50, 49],
  memoryUsage: [2048, 2156, 2089, 2134, 2098],
};

console.log(analyzePerformance(metrics));
// {
//   avgResponseTime: 137,
//   avgCpuUsage: 48.8,
//   avgMemoryUsage: 2105
// }

// 示例7: 评分系统
function getRatingLevel(ratings: number[]): string {
  const avgRating = mean(ratings);

  if (avgRating >= 4.5) return '优秀';
  if (avgRating >= 3.5) return '良好';
  if (avgRating >= 2.5) return '一般';
  if (avgRating >= 1.5) return '较差';
  return '很差';
}

console.log(getRatingLevel([5, 4, 5, 4, 5])); // '优秀'
console.log(getRatingLevel([3, 4, 3, 4, 3])); // '一般'

// 示例8: 移动平均线计算
function calculateMovingAverage(data: number[], windowSize: number): number[] {
  const result: number[] = [];

  for (let i = 0; i <= data.length - windowSize; i++) {
    const window = data.slice(i, i + windowSize);
    result.push(mean(window));
  }

  return result;
}

const prices = [100, 102, 98, 105, 103, 107, 104];
console.log(calculateMovingAverage(prices, 3));
// [100, 101.67, 102, 105, 104.67]
```

## 交互式示例

```tsx live
function MeanExample() {
  const [input, setInput] = React.useState('1, 2, 3, 4, 5');
  const [result, setResult] = React.useState(null);

  const handleCalculate = () => {
    try {
      const numbers = input
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number);

      if (numbers.some(isNaN)) {
        setResult('错误: 请输入有效的数字');
        return;
      }

      const avg = mean(numbers);
      setResult({
        numbers,
        mean: avg,
        count: numbers.length,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCalculate();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>mean 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>输入数字 (用逗号分隔): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '250px', padding: '5px' }}
          placeholder="例如: 1, 2, 3, 4, 5"
        />
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **空数组**: 当数组为空时，函数返回 0
- ⚠️ **非数组输入**: 当输入不是数组时，函数返回 0
- 💡 **性能提示**: 使用 reduce 实现，时间复杂度为 O(n)
- 🔒 **类型安全**: 输入必须是 number 数组，返回 number
- 📚 **最佳实践**: 适用于计算集中趋势、性能指标、统计分析等

## 相关函数

- [`median`](./median) - 计算中位数
- [`sum`](./sum) - 计算总和
- [`max`](../math/max) - 获取最大值
- [`min`](../math/min) - 获取最小值

## 版本历史

- **v0.0.1** - 初始版本
