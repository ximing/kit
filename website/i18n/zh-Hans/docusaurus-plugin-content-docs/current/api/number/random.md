---
id: random
title: random
description: '生成指定范围内的随机数'
---

# `random`

生成指定范围内的随机数。支持整数和浮点数模式，是一个灵活的随机数生成工具。

## 语法

```typescript
function random(lower: number, upper?: number, floating?: boolean): number;
```

## 参数

| 参数名     | 类型      | 必填 | 默认值      | 描述                                      |
| ---------- | --------- | ---- | ----------- | ----------------------------------------- |
| `lower`    | `number`  | ✅   | -           | 下界（包含），如果 upper 未提供，则为上界 |
| `upper`    | `number`  | ❌   | `undefined` | 上界（包含）                              |
| `floating` | `boolean` | ❌   | `false`     | 是否返回浮点数                            |

## 返回值

- **类型**: `number`
- **描述**: 返回指定范围内的随机数。默认返回整数，设置 `floating` 为 `true` 时返回浮点数。

## 示例

### 基础用法

```typescript
import { random } from '@rabjs/kit';

// 示例1: 生成 0-5 之间的随机整数
const num1 = random(5);
console.log(num1); // 可能输出: 0, 1, 2, 3, 4, 5

// 示例2: 生成 5-10 之间的随机整数
const num2 = random(5, 10);
console.log(num2); // 可能输出: 5, 6, 7, 8, 9, 10

// 示例3: 生成 5-10 之间的随机浮点数
const num3 = random(5, 10, true);
console.log(num3); // 可能输出: 7.382910451251
```

### 高级用法

```typescript
// 示例4: 骰子模拟
function rollDice(): number {
  return random(1, 6);
}

console.log(rollDice()); // 1-6 之间的随机数

// 示例5: 随机价格生成
function generatePrice(min: number, max: number): string {
  const price = random(min, max, true);
  return `￥${price.toFixed(2)}`;
}

console.log(generatePrice(10, 100)); // 例如: "￥45.67"

// 示例6: 随机延迟
async function randomDelay(minMs: number, maxMs: number): Promise<void> {
  const delay = random(minMs, maxMs);
  return new Promise((resolve) => setTimeout(resolve, delay));
}

await randomDelay(1000, 3000); // 随机延迟 1-3 秒
```

### 实际应用场景

```typescript
// 示例7: 测试数据生成
interface User {
  id: number;
  name: string;
  age: number;
  score: number;
}

function generateMockUser(id: number): User {
  return {
    id,
    name: `用户${id}`,
    age: random(18, 65),
    score: random(0, 100, true),
  };
}

const users = Array.from({ length: 5 }, (_, i) => generateMockUser(i + 1));
console.log(users);
// [
//   { id: 1, name: '用户1', age: 34, score: 78.45 },
//   { id: 2, name: '用户2', age: 22, score: 91.23 },
//   ...
// ]

// 示例8: 随机颜色生成
function randomColor(): string {
  const r = random(0, 255);
  const g = random(0, 255);
  const b = random(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log(randomColor()); // 例如: "rgb(123, 45, 200)"

// 示例9: 随机 ID 生成
function generateRandomId(): string {
  return `${Date.now()}-${random(1000, 9999)}`;
}

console.log(generateRandomId()); // 例如: "1704326400000-5678"
```

## 交互式示例

```tsx live
function RandomExample() {
  const [lower, setLower] = React.useState(0);
  const [upper, setUpper] = React.useState(100);
  const [floating, setFloating] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const handleGenerate = () => {
    const num = random(lower, upper, floating);
    setResult(num);
  };

  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>random 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>下界: </label>
          <input
            type="number"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>上界: </label>
          <input
            type="number"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            style={{ width: '100px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input type="checkbox" checked={floating} onChange={(e) => setFloating(e.target.checked)} /> 返回浮点数
          </label>
        </div>
        <button onClick={handleGenerate} style={{ padding: '5px 15px' }}>
          生成随机数
        </button>
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

- ⚠️ **范围自动交换**: 如果 `lower > upper`，函数会自动交换它们
- ⚠️ **包含边界**: 返回的随机数包含 lower 和 upper
- 💡 **浮点数精度**: 浮点数模式下可能返回很多小数位，需要时请使用 `toFixed()`
- 🔒 **类型安全**: 所有参数和返回值都是 number 类型
- 📚 **最佳实践**: 用于测试数据生成、游戏开发、模拟等场景

## 相关函数

- [`clamp`](./clamp) - 将数字限制在指定范围内
- [`range`](./range) - 生成数字序列数组
- [`inRange`](./inRange) - 检查数字是否在范围内

## 版本历史

- **v1.0.0** - 初始版本
