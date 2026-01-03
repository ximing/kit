---
id: sum
title: sum
description: 'Computes the sum of an array of numbers'
---

# `sum`

计算数字数组的总和。这是一个基础的数学运算函数，广泛应用于各种计算场景。

## 语法

```typescript
function sum(numbers: number[]): number;
```

## 参数

| 参数名    | 类型       | 必填 | 默认值 | 描述             |
| --------- | ---------- | ---- | ------ | ---------------- |
| `numbers` | `number[]` | ✅   | -      | 要求和的数字数组 |

## 返回值

- **类型**: `number`
- **描述**: 返回数组中所有数字的总和。如果数组为空或无效，返回 0。

## 示例

### 基础用法

```typescript
import { sum } from '@rabjs/kit';

// 示例1: 基本求和
console.log(sum([1, 2, 3, 4])); // 10
console.log(sum([10, 20, 30])); // 60

// 示例2: 处理小数
console.log(sum([1.5, 2.5, 3])); // 7

// 示例3: 单个元素
console.log(sum([5])); // 5

// 示例4: 空数组
console.log(sum([])); // 0

// 示例5: 包含负数
console.log(sum([10, -5, 3, -2])); // 6
```

### 高级用法

```typescript
// 示例6: 计算购物车总价
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function calculateCartTotal(items: CartItem[]): number {
  const itemTotals = items.map((item) => item.price * item.quantity);
  return sum(itemTotals);
}

const cart = [
  { name: '商品A', price: 10, quantity: 2 },
  { name: '商品B', price: 15, quantity: 1 },
  { name: '商品C', price: 20, quantity: 3 },
];

console.log(calculateCartTotal(cart)); // 95

// 示例7: 计算总分
interface Student {
  name: string;
  scores: number[];
}

function getTotalScore(student: Student): number {
  return sum(student.scores);
}

const student = {
  name: '张三',
  scores: [85, 92, 78, 90, 88],
};

console.log(getTotalScore(student)); // 433
```

### 实际应用场景

```typescript
// 示例8: 统计报表
interface SalesData {
  month: string;
  revenue: number;
}

function calculateQuarterlyRevenue(salesData: SalesData[]): number {
  const revenues = salesData.map((d) => d.revenue);
  return sum(revenues);
}

const q1Sales = [
  { month: '1月', revenue: 50000 },
  { month: '2月', revenue: 65000 },
  { month: '3月', revenue: 72000 },
];

console.log(calculateQuarterlyRevenue(q1Sales)); // 187000

// 示例9: 资源使用统计
interface ResourceUsage {
  service: string;
  cpu: number;
  memory: number;
  storage: number;
}

function getTotalResourceUsage(resources: ResourceUsage[]) {
  return {
    totalCpu: sum(resources.map((r) => r.cpu)),
    totalMemory: sum(resources.map((r) => r.memory)),
    totalStorage: sum(resources.map((r) => r.storage)),
  };
}

const resources = [
  { service: '服务A', cpu: 2, memory: 4096, storage: 100 },
  { service: '服务B', cpu: 4, memory: 8192, storage: 200 },
  { service: '服务C', cpu: 1, memory: 2048, storage: 50 },
];

console.log(getTotalResourceUsage(resources));
// { totalCpu: 7, totalMemory: 14336, totalStorage: 350 }

// 示例10: 时间统计
interface Task {
  name: string;
  duration: number; // 分钟
}

function getTotalDuration(tasks: Task[]): string {
  const totalMinutes = sum(tasks.map((t) => t.duration));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}小时${minutes}分钟`;
}

const tasks = [
  { name: '任务1', duration: 45 },
  { name: '任务2', duration: 90 },
  { name: '任务3', duration: 30 },
  { name: '任务4', duration: 60 },
];

console.log(getTotalDuration(tasks)); // "3小时45分钟"
```

## 交互式示例

```tsx live
function SumExample() {
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

      const total = sum(numbers);

      setResult({
        numbers,
        sum: total,
        count: numbers.length,
        average: numbers.length > 0 ? total / numbers.length : 0,
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
      <h4>sum 交互式示例</h4>
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
- 💡 **性能提示**: 使用 reduce 实现，时间复杂度为 O(n)，性能优秀
- 🔒 **类型安全**: 输入必须是 number 数组，返回 number
- 📚 **最佳实践**: 广泛用于统计计算、金额汇总、资源统计等场景

## 相关函数

- [`mean`](./mean) - 计算平均值
- [`median`](./median) - 计算中位数
- [`max`](../math/max) - 获取最大值
- [`min`](../math/min) - 获取最小值

## 版本历史

- **v1.0.0** - 初始版本
