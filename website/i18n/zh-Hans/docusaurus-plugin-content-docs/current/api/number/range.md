---
id: range
title: range
description: '创建一个数字序列数组'
---

# `range`

创建一个数字序列数组，从 start 开始到 end 结束（不包含 end）。支持自定义步长，包括负数步长。

## 语法

```typescript
function range(start: number, end: number, step: number = 1): number[];
```

## 参数

| 参数名  | 类型     | 必填 | 默认值 | 描述             |
| ------- | -------- | ---- | ------ | ---------------- |
| `start` | `number` | ✅   | -      | 起始值（包含）   |
| `end`   | `number` | ✅   | -      | 结束值（不包含） |
| `step`  | `number` | ❌   | `1`    | 步长，可以为负数 |

## 返回值

- **类型**: `number[]`
- **描述**: 返回数字序列数组。如果步长为正，生成递增序列；如果步长为负，生成递减序列。

## 示例

### 基础用法

```typescript
import { range } from '@rabjs/kit';

// 示例1: 默认步长为 1
const numbers1 = range(0, 5);
console.log(numbers1); // [0, 1, 2, 3, 4]

// 示例2: 自定义步长
const numbers2 = range(0, 10, 2);
console.log(numbers2); // [0, 2, 4, 6, 8]

// 示例3: 负数步长（递减）
const numbers3 = range(5, 0, -1);
console.log(numbers3); // [5, 4, 3, 2, 1]
```

### 高级用法

```typescript
// 示例4: 生成字母序列
function charRange(start: string, end: string): string[] {
  const startCode = start.charCodeAt(0);
  const endCode = end.charCodeAt(0);
  return range(startCode, endCode + 1).map((code) => String.fromCharCode(code));
}

console.log(charRange('a', 'e')); // ['a', 'b', 'c', 'd', 'e']
console.log(charRange('A', 'E')); // ['A', 'B', 'C', 'D', 'E']

// 示例5: 批量创建数据
interface Item {
  id: number;
  name: string;
}

function createItems(count: number): Item[] {
  return range(1, count + 1).map((id) => ({
    id,
    name: `项目 ${id}`,
  }));
}

console.log(createItems(3));
// [
//   { id: 1, name: '项目 1' },
//   { id: 2, name: '项目 2' },
//   { id: 3, name: '项目 3' }
// ]
```

### 实际应用场景

```typescript
// 示例6: 分页页码生成
function generatePageNumbers(currentPage: number, totalPages: number): number[] {
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return range(start, end + 1);
}

console.log(generatePageNumbers(5, 10)); // [3, 4, 5, 6, 7]
console.log(generatePageNumbers(2, 10)); // [1, 2, 3, 4, 5]

// 示例7: 倒计时数组
function countdown(from: number): number[] {
  return range(from, 0, -1);
}

console.log(countdown(5)); // [5, 4, 3, 2, 1]

// 示例8: 生成时间刻度
function generateTimeSlots(startHour: number, endHour: number, intervalMinutes: number = 30): string[] {
  const totalSlots = ((endHour - startHour) * 60) / intervalMinutes;
  return range(0, totalSlots).map((i) => {
    const totalMinutes = startHour * 60 + i * intervalMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });
}

console.log(generateTimeSlots(9, 12, 30));
// ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
```

## 交互式示例

```tsx live
function RangeExample() {
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const [step, setStep] = React.useState(1);
  const [result, setResult] = React.useState([]);

  const handleGenerate = () => {
    try {
      const numbers = range(start, end, step);
      setResult(numbers);
    } catch (error) {
      setResult(['错误: ' + error.message]);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, [start, end, step]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>range 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>起始值: </label>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>结束值: </label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>步长: </label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
      </div>
      <div>
        <strong>结果 ({result.length} 个元素):</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **步长为 0**: 当 `step` 为 0 时，函数会抛出错误
- ⚠️ **结束值不包含**: 生成的数组不包含 `end` 值
- 💡 **性能提示**: 对于大范围的序列，注意内存使用
- 🔒 **类型安全**: 所有参数和返回值都是 number 类型
- 📚 **最佳实践**: 常用于循环、分页、序列生成等场景

## 相关函数

- [`random`](./random) - 生成随机数
- [`inRange`](./inRange) - 检查数字是否在范围内
- [`chunk`](../array/chunk) - 将数组分块

## 版本历史

- **v0.0.1** - 初始版本
