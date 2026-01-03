---
id: ceil
title: ceil
description: 'Rounds a number up to a specified precision'
---

# `ceil`

将数字向上舍入到指定精度。支持正负精度值，可以对小数位或整数位进行向上舍入。

## 语法

```typescript
function ceil(number: number, precision: number = 0): number;
```

## 参数

| 参数名      | 类型     | 必填 | 默认值 | 描述                                   |
| ----------- | -------- | ---- | ------ | -------------------------------------- |
| `number`    | `number` | ✅   | -      | 要向上舍入的数字                       |
| `precision` | `number` | ❌   | `0`    | 精度值，正数表示小数位，负数表示整数位 |

## 返回值

- **类型**: `number`
- **描述**: 返回向上舍入后的数字。

## 示例

### 基础用法

```typescript
import { ceil } from '@rabjs/kit';

// 示例1: 默认向上舍入到整数
console.log(ceil(4.006)); // 5
console.log(ceil(4.0)); // 4
console.log(ceil(-4.006)); // -4

// 示例2: 向上舍入到小数位
console.log(ceil(4.006, 2)); // 4.01
console.log(ceil(4.004, 2)); // 4.01
console.log(ceil(4.123, 1)); // 4.2

// 示例3: 向上舍入到整数位
console.log(ceil(4060, -2)); // 4100
console.log(ceil(1234, -1)); // 1240
console.log(ceil(1234, -3)); // 2000
```

### 高级用法

```typescript
// 示例4: 价格向上取整
function ceilPrice(price: number, precision: number = 2): string {
  return `$${ceil(price, precision).toFixed(precision)}`;
}

console.log(ceilPrice(19.991)); // "$20.00"
console.log(ceilPrice(19.991, 1)); // "$20.0"
console.log(ceilPrice(19.123, 2)); // "$19.13"

// 示例5: 计算需要的页数
function calculatePages(itemCount: number, itemsPerPage: number): number {
  return ceil(itemCount / itemsPerPage);
}

console.log(calculatePages(100, 10)); // 10
console.log(calculatePages(101, 10)); // 11
console.log(calculatePages(95, 10)); // 10

// 示例6: 容量向上取整
function ceilCapacity(size: number, unit: 'KB' | 'MB' | 'GB' = 'MB'): string {
  const ceiledSize = ceil(size, 2);
  return `${ceiledSize} ${unit}`;
}

console.log(ceilCapacity(10.234)); // "10.24 MB"
console.log(ceilCapacity(10.236)); // "10.24 MB"
```

### 实际应用场景

```typescript
// 示例7: 批次计算
interface BatchCalculation {
  totalItems: number;
  batchSize: number;
  totalBatches: number;
  lastBatchSize: number;
}

function calculateBatches(totalItems: number, batchSize: number): BatchCalculation {
  const totalBatches = ceil(totalItems / batchSize);
  const lastBatchSize = totalItems % batchSize || batchSize;

  return {
    totalItems,
    batchSize,
    totalBatches,
    lastBatchSize,
  };
}

console.log(calculateBatches(100, 30));
// { totalItems: 100, batchSize: 30, totalBatches: 4, lastBatchSize: 10 }

// 示例8: 价格分级
function getPriceTier(price: number): number {
  // 价格向上取整到最近的10
  return ceil(price, -1);
}

console.log(getPriceTier(23)); // 30
console.log(getPriceTier(95)); // 100
console.log(getPriceTier(101)); // 110

// 示例9: 评分向上取整
function ceilRating(rating: number): number {
  // 向上取整到最近的 0.5
  return ceil(rating * 2) / 2;
}

console.log(ceilRating(3.2)); // 3.5
console.log(ceilRating(3.6)); // 4
console.log(ceilRating(4.1)); // 4.5
```

## 交互式示例

```tsx live
function CeilExample() {
  const [number, setNumber] = React.useState(4.006);
  const [precision, setPrecision] = React.useState(2);
  const [result, setResult] = React.useState(null);

  const handleCeil = () => {
    const ceiled = ceil(number, precision);
    setResult(ceiled);
  };

  React.useEffect(() => {
    handleCeil();
  }, [number, precision]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>ceil 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>数字: </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            step="0.001"
            style={{ width: '150px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>精度: </label>
          <input
            type="number"
            value={precision}
            onChange={(e) => setPrecision(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
          <small style={{ marginLeft: '10px', color: '#666' }}>(正数=小数位, 负数=整数位)</small>
        </div>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px' }}>{result}</pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **精度方向**: 正数精度表示小数位数，负数精度表示整数位数
- ⚠️ **向上舍入**: 总是向数值增大的方向舍入（正数变大，负数变小绝对值）
- 💡 **性能提示**: 使用乘除法和 Math.ceil 实现，性能良好
- 🔒 **类型安全**: 所有参数和返回值都是 number 类型
- 📚 **最佳实践**: 适用于需要向上取整的场景，如分页、容量计算等

## 相关函数

- [`floor`](./floor) - 向下舍入到指定精度
- [`round`](./round) - 四舍五入到指定精度
- [`clamp`](./clamp) - 将数字限制在指定范围内

## 版本历史

- **v0.0.1** - 初始版本
