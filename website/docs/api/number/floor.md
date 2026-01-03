---
id: floor
title: floor
description: 'Rounds a number down to a specified precision'
---

# `floor`

将数字向下舍入到指定精度。支持正负精度值，可以对小数位或整数位进行向下舍入。

## 语法

```typescript
function floor(number: number, precision: number = 0): number;
```

## 参数

| 参数名      | 类型     | 必填 | 默认值 | 描述                                   |
| ----------- | -------- | ---- | ------ | -------------------------------------- |
| `number`    | `number` | ✅   | -      | 要向下舍入的数字                       |
| `precision` | `number` | ❌   | `0`    | 精度值，正数表示小数位，负数表示整数位 |

## 返回值

- **类型**: `number`
- **描述**: 返回向下舍入后的数字。

## 示例

### 基础用法

```typescript
import { floor } from '@rabjs/kit';

// 示例1: 默认向下舍入到整数
console.log(floor(4.006)); // 4
console.log(floor(4.9)); // 4
console.log(floor(-4.006)); // -5

// 示例2: 向下舍入到小数位
console.log(floor(4.006, 2)); // 4.00
console.log(floor(4.996, 2)); // 4.99
console.log(floor(4.123, 1)); // 4.1

// 示例3: 向下舍入到整数位
console.log(floor(4060, -2)); // 4000
console.log(floor(1234, -1)); // 1230
console.log(floor(1234, -3)); // 1000
```

### 高级用法

```typescript
// 示例4: 价格向下取整
function floorPrice(price: number, precision: number = 2): string {
  return `$${floor(price, precision).toFixed(precision)}`;
}

console.log(floorPrice(19.999)); // "$19.99"
console.log(floorPrice(19.991, 1)); // "$19.9"
console.log(floorPrice(19.876, 2)); // "$19.87"

// 示例5: 时间向下取整（按小时）
function floorToHour(minutes: number): number {
  return floor(minutes / 60);
}

console.log(floorToHour(125)); // 2 (2小时5分钟 → 2小时)
console.log(floorToHour(59)); // 0
console.log(floorToHour(180)); // 3

// 示例6: 折扣价格（向下舍入）
function applyDiscount(price: number, discountRate: number): number {
  const discountedPrice = price * (1 - discountRate);
  return floor(discountedPrice, 2);
}

console.log(applyDiscount(99.99, 0.15)); // 84.99
console.log(applyDiscount(50, 0.333)); // 33.35
```

### 实际应用场景

```typescript
// 示例7: 库存批次计算
function calculateFullBatches(totalItems: number, batchSize: number): number {
  return floor(totalItems / batchSize);
}

console.log(calculateFullBatches(100, 30)); // 3 (可以装满3批)
console.log(calculateFullBatches(95, 30)); // 3
console.log(calculateFullBatches(89, 30)); // 2

// 示例8: 分数归档（向下取整到0.5）
function floorToHalfPoint(score: number): number {
  return floor(score * 2) / 2;
}

console.log(floorToHalfPoint(3.8)); // 3.5
console.log(floorToHalfPoint(3.4)); // 3.0
console.log(floorToHalfPoint(4.1)); // 4.0

// 示例9: 预算控制（向下取整到最近的100）
function budgetFloor(amount: number): number {
  return floor(amount, -2);
}

console.log(budgetFloor(1234)); // 1200
console.log(budgetFloor(5678)); // 5600
console.log(budgetFloor(999)); // 900
```

## 交互式示例

```tsx live
function FloorExample() {
  const [number, setNumber] = React.useState(4.996);
  const [precision, setPrecision] = React.useState(2);
  const [result, setResult] = React.useState(null);

  const handleFloor = () => {
    const floored = floor(number, precision);
    setResult(floored);
  };

  React.useEffect(() => {
    handleFloor();
  }, [number, precision]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>floor 交互式示例</h4>
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
- ⚠️ **向下舍入**: 总是向数值减小的方向舍入（正数变小，负数变大绝对值）
- 💡 **性能提示**: 使用乘除法和 Math.floor 实现，性能良好
- 🔒 **类型安全**: 所有参数和返回值都是 number 类型
- 📚 **最佳实践**: 适用于需要向下取整的场景，如库存计算、折扣等

## 相关函数

- [`ceil`](./ceil) - 向上舍入到指定精度
- [`round`](./round) - 四舍五入到指定精度
- [`clamp`](./clamp) - 将数字限制在指定范围内

## 版本历史

- **v1.0.0** - 初始版本
