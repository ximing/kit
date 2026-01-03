---
id: round
title: round
description: '将数字四舍五入到指定精度'
---

# `round`

将数字四舍五入到指定精度。支持正负精度值，可以对小数位或整数位进行标准四舍五入。

## 语法

```typescript
function round(number: number, precision: number = 0): number;
```

## 参数

| 参数名      | 类型     | 必填 | 默认值 | 描述                                   |
| ----------- | -------- | ---- | ------ | -------------------------------------- |
| `number`    | `number` | ✅   | -      | 要四舍五入的数字                       |
| `precision` | `number` | ❌   | `0`    | 精度值，正数表示小数位，负数表示整数位 |

## 返回值

- **类型**: `number`
- **描述**: 返回四舍五入后的数字。

## 示例

### 基础用法

```typescript
import { round } from '@rabjs/kit';

// 示例1: 默认四舍五入到整数
console.log(round(4.006)); // 4
console.log(round(4.5)); // 5
console.log(round(4.4)); // 4

// 示例2: 四舍五入到小数位
console.log(round(4.006, 2)); // 4.01
console.log(round(4.004, 2)); // 4.00
console.log(round(4.125, 2)); // 4.13

// 示例3: 四舍五入到整数位
console.log(round(4060, -2)); // 4100
console.log(round(1234, -1)); // 1230
console.log(round(1250, -2)); // 1300
```

### 高级用法

```typescript
// 示例4: 价格四舍五入
function roundPrice(price: number, precision: number = 2): string {
  return `￥${round(price, precision).toFixed(precision)}`;
}

console.log(roundPrice(19.995)); // "￥20.00"
console.log(roundPrice(19.994)); // "￥19.99"
console.log(roundPrice(19.125, 2)); // "￥19.13"

// 示例5: 百分比计算
function calculatePercentage(value: number, total: number, decimals: number = 1): number {
  const percentage = (value / total) * 100;
  return round(percentage, decimals);
}

console.log(calculatePercentage(7, 20)); // 35.0
console.log(calculatePercentage(1, 3)); // 33.3
console.log(calculatePercentage(2, 7, 2)); // 28.57

// 示例6: 评分系统
function roundRating(rating: number): number {
  // 四舍五入到最近的 0.5
  return round(rating * 2) / 2;
}

console.log(roundRating(3.2)); // 3.0
console.log(roundRating(3.3)); // 3.5
console.log(roundRating(3.7)); // 3.5
console.log(roundRating(3.8)); // 4.0
```

### 实际应用场景

```typescript
// 示例7: 金融计算
interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

function calculateInvoiceItem(name: string, quantity: number, unitPrice: number): InvoiceItem {
  const total = round(quantity * unitPrice, 2);
  return {
    name,
    quantity,
    unitPrice: round(unitPrice, 2),
    total,
  };
}

console.log(calculateInvoiceItem('商品A', 3, 12.345));
// { name: '商品A', quantity: 3, unitPrice: 12.35, total: 37.04 }

// 示例8: 统计数据格式化
interface Statistics {
  mean: number;
  median: number;
  stdDev: number;
}

function formatStatistics(stats: Statistics, precision: number = 2): Statistics {
  return {
    mean: round(stats.mean, precision),
    median: round(stats.median, precision),
    stdDev: round(stats.stdDev, precision),
  };
}

const rawStats = { mean: 12.3456, median: 10.9876, stdDev: 3.4567 };
console.log(formatStatistics(rawStats));
// { mean: 12.35, median: 10.99, stdDev: 3.46 }

// 示例9: 温度转换
function celsiusToFahrenheit(celsius: number): number {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return round(fahrenheit, 1);
}

console.log(celsiusToFahrenheit(0)); // 32.0
console.log(celsiusToFahrenheit(100)); // 212.0
console.log(celsiusToFahrenheit(37)); // 98.6
```

## 交互式示例

```tsx live
function RoundExample() {
  const [number, setNumber] = React.useState(4.125);
  const [precision, setPrecision] = React.useState(2);
  const [result, setResult] = React.useState(null);

  const handleRound = () => {
    const rounded = round(number, precision);
    setResult(rounded);
  };

  React.useEffect(() => {
    handleRound();
  }, [number, precision]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>round 交互式示例</h4>
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
- ⚠️ **四舍五入**: 使用标准的四舍五入规则（>= 0.5 向上，< 0.5 向下）
- 💡 **性能提示**: 使用乘除法和 Math.round 实现，性能良好
- 🔒 **类型安全**: 所有参数和返回值都是 number 类型
- 📚 **最佳实践**: 最常用的舍入方式，适用于大多数场景

## 相关函数

- [`ceil`](./ceil) - 向上舍入到指定精度
- [`floor`](./floor) - 向下舍入到指定精度
- [`clamp`](./clamp) - 将数字限制在指定范围内

## 版本历史

- **v0.0.1** - 初始版本
