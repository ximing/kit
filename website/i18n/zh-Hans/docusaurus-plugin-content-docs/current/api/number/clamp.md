---
id: clamp
title: clamp
description: '将数字限制在指定的上下界范围内'
---

# `clamp`

将数字限制在指定的上下界范围内。这是一个非常实用的函数,常用于数值约束、进度条控制和边界处理。

## 语法

```typescript
function clamp(number: number, lower: number, upper: number): number;
```

## 参数

| 参数名   | 类型     | 必填 | 默认值 | 描述               |
| -------- | -------- | ---- | ------ | ------------------ |
| `number` | `number` | ✅   | -      | 要限制的数字       |
| `lower`  | `number` | ✅   | -      | 范围的下界（包含） |
| `upper`  | `number` | ✅   | -      | 范围的上界（包含） |

## 返回值

- **类型**: `number`
- **描述**: 返回限制后的数字。如果数字小于下界，返回下界；如果数字大于上界，返回上界；否则返回原数字。

## 示例

### 基础用法

```typescript
import { clamp } from '@rabjs/kit';

// 示例1: 数字在范围内
const result1 = clamp(10, 5, 15);
console.log(result1); // 10

// 示例2: 数字小于下界
const result2 = clamp(3, 5, 15);
console.log(result2); // 5

// 示例3: 数字大于上界
const result3 = clamp(20, 5, 15);
console.log(result3); // 15
```

### 高级用法

```typescript
// 示例4: 进度条控制
function updateProgress(value: number): number {
  // 确保进度值在 0-100 之间
  return clamp(value, 0, 100);
}

console.log(updateProgress(50)); // 50
console.log(updateProgress(-10)); // 0
console.log(updateProgress(150)); // 100

// 示例5: 音量控制
const adjustVolume = (currentVolume: number, delta: number) => {
  const newVolume = currentVolume + delta;
  return clamp(newVolume, 0, 100);
};

let volume = 50;
volume = adjustVolume(volume, 60); // 100 (不会超过100)
volume = adjustVolume(volume, -120); // 0 (不会低于0)
```

### 实际应用场景

```typescript
// 示例6: 图片缩放限制
interface ImageScale {
  scale: number;
  minScale: number;
  maxScale: number;
}

function scaleImage(image: ImageScale, delta: number): ImageScale {
  const newScale = image.scale + delta;
  return {
    ...image,
    scale: clamp(newScale, image.minScale, image.maxScale),
  };
}

const image = { scale: 1, minScale: 0.5, maxScale: 3 };
console.log(scaleImage(image, 0.5).scale); // 1.5
console.log(scaleImage(image, -2).scale); // 0.5 (最小值)
console.log(scaleImage(image, 5).scale); // 3 (最大值)

// 示例7: 评分系统
function normalizeRating(rating: number): number {
  return clamp(rating, 1, 5);
}

const ratings = [0, 2.5, 5, 6, -1];
const normalized = ratings.map(normalizeRating);
console.log(normalized); // [1, 2.5, 5, 5, 1]
```

## 交互式示例

```tsx live
function ClampExample() {
  const [number, setNumber] = React.useState(10);
  const [lower, setLower] = React.useState(5);
  const [upper, setUpper] = React.useState(15);
  const [result, setResult] = React.useState(null);

  const handleClamp = () => {
    try {
      const clamped = clamp(number, lower, upper);
      setResult(clamped);
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleClamp();
  }, [number, lower, upper]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>clamp 交互式示例</h4>
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
          <label>下界: </label>
          <input
            type="number"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>上界: </label>
          <input
            type="number"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
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

- ⚠️ **边界情况**: 当 `lower > upper` 时，函数会抛出错误
- ⚠️ **参数验证**: 确保 `lower` 小于或等于 `upper`
- 💡 **性能提示**: 该函数使用 Math.max 和 Math.min，性能非常好
- 🔒 **类型安全**: 所有参数和返回值都是 number 类型
- 📚 **最佳实践**: 用于任何需要限制数值范围的场景

## 相关函数

- [`inRange`](./inRange) - 检查数字是否在指定范围内
- [`random`](./random) - 生成指定范围的随机数
- [`round`](./round) - 四舍五入到指定精度

## 版本历史

- **v0.0.1** - 初始版本
