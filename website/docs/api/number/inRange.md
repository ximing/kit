---
id: inRange
title: inRange
description: 'Checks if a number is within a specified range'
---

# `inRange`

检查数字是否在指定的范围内（包含起始值，不包含结束值）。这是一个实用的验证函数，常用于数值范围检查。

## 语法

```typescript
function inRange(number: number, start: number, end?: number): boolean;
```

## 参数

| 参数名   | 类型     | 必填 | 默认值      | 描述                                              |
| -------- | -------- | ---- | ----------- | ------------------------------------------------- |
| `number` | `number` | ✅   | -           | 要检查的数字                                      |
| `start`  | `number` | ✅   | -           | 范围的起始值（包含），如果 end 未提供，则为结束值 |
| `end`    | `number` | ❌   | `undefined` | 范围的结束值（不包含）                            |

## 返回值

- **类型**: `boolean`
- **描述**: 如果数字在范围内返回 `true`，否则返回 `false`。范围包含 start，不包含 end。

## 示例

### 基础用法

```typescript
import { inRange } from '@rabjs/kit';

// 示例1: 标准范围检查
console.log(inRange(3, 2, 4)); // true (3 在 [2, 4) 内)
console.log(inRange(4, 2, 4)); // false (4 不在范围内，不包含 end)
console.log(inRange(2, 2, 4)); // true (2 在范围内，包含 start)

// 示例2: 单参数模式 (0 到 start)
console.log(inRange(3, 5)); // true (3 在 [0, 5) 内)
console.log(inRange(5, 5)); // false (5 不在范围内)

// 示例3: 自动交换范围
console.log(inRange(3, 4, 2)); // true (自动交换为 [2, 4))
```

### 高级用法

```typescript
// 示例4: 年龄验证
function isAdult(age: number): boolean {
  return inRange(age, 18, 150);
}

console.log(isAdult(25)); // true
console.log(isAdult(16)); // false
console.log(isAdult(200)); // false

// 示例5: 价格范围筛选
interface Product {
  name: string;
  price: number;
}

function filterByPriceRange(products: Product[], min: number, max: number): Product[] {
  return products.filter((p) => inRange(p.price, min, max));
}

const products = [
  { name: '商品A', price: 50 },
  { name: '商品B', price: 150 },
  { name: '商品C', price: 300 },
];

console.log(filterByPriceRange(products, 100, 200));
// [{ name: '商品B', price: 150 }]
```

### 实际应用场景

```typescript
// 示例6: 评分验证
function validateRating(rating: number): { valid: boolean; message: string } {
  if (!inRange(rating, 1, 6)) {
    return {
      valid: false,
      message: '评分必须在 1-5 之间',
    };
  }
  return {
    valid: true,
    message: '评分有效',
  };
}

console.log(validateRating(3)); // { valid: true, message: '评分有效' }
console.log(validateRating(0)); // { valid: false, message: '评分必须在 1-5 之间' }
console.log(validateRating(6)); // { valid: false, message: '评分必须在 1-5 之间' }

// 示例7: 进度检查
function getProgressStatus(progress: number): string {
  if (inRange(progress, 0, 25)) return '刚开始';
  if (inRange(progress, 25, 50)) return '进行中';
  if (inRange(progress, 50, 75)) return '过半';
  if (inRange(progress, 75, 100)) return '即将完成';
  if (progress === 100) return '已完成';
  return '无效进度';
}

console.log(getProgressStatus(10)); // '刚开始'
console.log(getProgressStatus(60)); // '过半'
console.log(getProgressStatus(100)); // '已完成'

// 示例8: 温度等级判断
function getTemperatureLevel(temp: number): string {
  if (inRange(temp, -Infinity, 0)) return '冰冻';
  if (inRange(temp, 0, 15)) return '寒冷';
  if (inRange(temp, 15, 25)) return '凉爽';
  if (inRange(temp, 25, 35)) return '温暖';
  return '炎热';
}

console.log(getTemperatureLevel(-5)); // '冰冻'
console.log(getTemperatureLevel(20)); // '凉爽'
console.log(getTemperatureLevel(30)); // '温暖'
```

## 交互式示例

```tsx live
function InRangeExample() {
  const [number, setNumber] = React.useState(5);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const [result, setResult] = React.useState(null);

  const handleCheck = () => {
    const isInRange = inRange(number, start, end);
    setResult(isInRange);
  };

  React.useEffect(() => {
    handleCheck();
  }, [number, start, end]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>inRange 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>数字: </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>起始值: </label>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>结束值: </label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
      </div>
      <div>
        <strong>结果:</strong>
        <pre
          style={{
            background: 'white',
            padding: '10px',
            marginTop: '5px',
            color: result ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {number} {result ? '在' : '不在'} [{start}, {end}) 范围内
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **范围边界**: 包含 start，不包含 end（左闭右开区间 [start, end)）
- ⚠️ **自动交换**: 如果 start > end，函数会自动交换它们
- ⚠️ **单参数模式**: 如果只提供 start，范围为 [0, start)
- 💡 **性能提示**: 该函数执行简单的比较操作，性能优秀
- 🔒 **类型安全**: 所有参数都是 number 类型，返回 boolean
- 📚 **最佳实践**: 常用于数据验证、范围过滤、条件判断

## 相关函数

- [`clamp`](./clamp) - 将数字限制在指定范围内
- [`range`](./range) - 生成数字序列数组
- [`random`](./random) - 生成指定范围的随机数

## 版本历史

- **v0.0.1** - 初始版本
