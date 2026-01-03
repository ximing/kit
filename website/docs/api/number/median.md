---
id: median
title: median
description: 'Computes the median value of an array of numbers'
---

# `median`

计算数字数组的中位数。中位数是将数据按大小排序后位于中间位置的值，是统计学中重要的集中趋势度量。

## 语法

```typescript
function median(numbers: number[]): number;
```

## 参数

| 参数名    | 类型       | 必填 | 默认值 | 描述                   |
| --------- | ---------- | ---- | ------ | ---------------------- |
| `numbers` | `number[]` | ✅   | -      | 要计算中位数的数字数组 |

## 返回值

- **类型**: `number`
- **描述**: 返回数组的中位数。对于奇数个元素，返回中间值；对于偶数个元素，返回中间两个值的平均值。如果数组为空或无效，返回 0。

## 示例

### 基础用法

```typescript
import { median } from '@rabjs/kit';

// 示例1: 奇数个元素
console.log(median([1, 2, 3, 4, 5])); // 3
console.log(median([5, 1, 3, 2, 4])); // 3 (自动排序)

// 示例2: 偶数个元素
console.log(median([1, 2, 3, 4])); // 2.5 (中间两个值的平均)
console.log(median([10, 20, 30, 40])); // 25

// 示例3: 单个元素
console.log(median([5])); // 5

// 示例4: 处理空数组
console.log(median([])); // 0
```

### 高级用法

```typescript
// 示例5: 计算房价中位数
interface House {
  address: string;
  price: number;
}

function getMedianPrice(houses: House[]): number {
  const prices = houses.map((h) => h.price);
  return median(prices);
}

const houses = [
  { address: '地址1', price: 300000 },
  { address: '地址2', price: 250000 },
  { address: '地址3', price: 500000 },
  { address: '地址4', price: 350000 },
  { address: '地址5', price: 400000 },
];

console.log(getMedianPrice(houses)); // 350000

// 示例6: 异常值检测
function detectOutliers(data: number[]): { outliers: number[]; median: number } {
  const med = median(data);
  const deviations = data.map((x) => Math.abs(x - med));
  const madMedian = median(deviations);
  const threshold = 3 * madMedian;

  const outliers = data.filter((x, i) => deviations[i] > threshold);

  return { outliers, median: med };
}

const data = [10, 12, 13, 12, 11, 100, 14, 13, 12];
console.log(detectOutliers(data));
// { outliers: [100], median: 12 }
```

### 实际应用场景

```typescript
// 示例7: 性能分析（中位数更能反映典型情况）
interface BenchmarkResult {
  test: string;
  executionTimes: number[];
}

function analyzeBenchmark(result: BenchmarkResult) {
  return {
    test: result.test,
    median: median(result.executionTimes),
    mean: result.executionTimes.reduce((a, b) => a + b, 0) / result.executionTimes.length,
    min: Math.min(...result.executionTimes),
    max: Math.max(...result.executionTimes),
  };
}

const benchmark = {
  test: 'API响应时间',
  executionTimes: [120, 125, 122, 500, 118, 121, 123], // 包含一个异常值
};

console.log(analyzeBenchmark(benchmark));
// {
//   test: 'API响应时间',
//   median: 122,    // 更能反映典型情况
//   mean: 161.29,   // 受异常值影响较大
//   min: 118,
//   max: 500
// }

// 示例8: 薪资统计
interface Employee {
  name: string;
  salary: number;
}

function analyzeSalaries(employees: Employee[]) {
  const salaries = employees.map((e) => e.salary);
  const med = median(salaries);
  const avg = salaries.reduce((a, b) => a + b, 0) / salaries.length;

  return {
    medianSalary: med,
    averageSalary: avg,
    belowMedian: employees.filter((e) => e.salary < med).length,
    aboveMedian: employees.filter((e) => e.salary > med).length,
  };
}

const employees = [
  { name: '员工1', salary: 50000 },
  { name: '员工2', salary: 55000 },
  { name: '员工3', salary: 60000 },
  { name: '员工4', salary: 65000 },
  { name: '老板', salary: 500000 }, // 极端值
];

console.log(analyzeSalaries(employees));
// {
//   medianSalary: 60000,      // 更能代表大多数员工
//   averageSalary: 146000,    // 被老板薪资拉高
//   belowMedian: 2,
//   aboveMedian: 2
// }

// 示例9: 评分系统（过滤极端评分）
function getRepresentativeRating(ratings: number[]): number {
  // 移除最高和最低评分后计算中位数
  const sorted = [...ratings].sort((a, b) => a - b);
  const trimmed = sorted.slice(1, -1);

  return median(trimmed);
}

console.log(getRepresentativeRating([5, 4, 4, 5, 1, 4, 5]));
// 移除1和5，剩余[4, 4, 4, 5, 5]的中位数 = 4
```

## 交互式示例

```tsx live
function MedianExample() {
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

      const med = median(numbers);
      const sorted = [...numbers].sort((a, b) => a - b);

      setResult({
        original: numbers,
        sorted,
        median: med,
        count: numbers.length,
        isEven: numbers.length % 2 === 0,
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
      <h4>median 交互式示例</h4>
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
- ⚠️ **自动排序**: 函数会自动对数组进行排序，不会修改原数组
- 💡 **性能提示**: 需要排序操作，时间复杂度为 O(n log n)
- 🔒 **类型安全**: 输入必须是 number 数组，返回 number
- 📚 **最佳实践**: 中位数比平均值更能抵抗异常值的影响，适用于有极端值的数据集

## 相关函数

- [`mean`](./mean) - 计算平均值
- [`sum`](./sum) - 计算总和
- [`max`](../math/max) - 获取最大值
- [`min`](../math/min) - 获取最小值

## 版本历史

- **v1.0.0** - 初始版本
