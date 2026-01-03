---
id: sampleSize
title: sampleSize
description: '从集合中随机获取 N 个不重复的元素'
---

# `sampleSize`

从集合中随机获取 N 个不重复的元素。

## 语法

```typescript
function sampleSize<T>(collection: T[], n: number): T[];
```

## 参数

| 参数名       | 类型     | 必填 | 默认值 | 描述             |
| ------------ | -------- | ---- | ------ | ---------------- |
| `collection` | `T[]`    | ✅   | -      | 要采样的集合     |
| `n`          | `number` | ✅   | -      | 要采样的元素个数 |

## 返回值

- **类型**: `T[]`
- **描述**: 包含 N 个随机元素的数组，元素不重复

## 示例

### 基础用法

```typescript
import { sampleSize } from '@rabjs/kit';

// 示例1: 从数组中随机取多个元素
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomNumbers = sampleSize(numbers, 3);
console.log(randomNumbers); // 随机返回 3 个不重复的数字

// 示例2: 从对象数组中随机取多个
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
];
const randomUsers = sampleSize(users, 2);
console.log(randomUsers); // 随机返回 2 个用户
```

### 高级用法

```typescript
// 示例3: 随机推荐多个产品
const products = [
  { id: 1, name: '笔记本电脑', price: 1200 },
  { id: 2, name: '鼠标', price: 30 },
  { id: 3, name: '显示器', price: 300 },
  { id: 4, name: '键盘', price: 80 },
  { id: 5, name: '耳机', price: 150 },
];

function getRandomRecommendations(count: number) {
  return sampleSize(products, count);
}

console.log(getRandomRecommendations(3)); // 随机推荐 3 个产品
```

## 交互式示例

```tsx live
function SampleSizeExample() {
  const [sampleCount, setSampleCount] = React.useState(2);
  const [result, setResult] = React.useState(null);

  const items = ['🎁 iPhone', '🎁 iPad', '🎁 AirPods', '🎁 Apple Watch', '🎁 MacBook', '🎁 Magic Keyboard'];

  const handleSample = () => {
    const sampled = sampleSize(items, sampleCount);
    setResult(sampled);
  };

  React.useEffect(() => {
    handleSample();
  }, [sampleCount]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>sampleSize 交互式示例 - 随机抽奖</h4>
      <div style={{ marginBottom: '15px' }}>
        <label>抽取数量: </label>
        <input
          type="number"
          min="1"
          max={items.length}
          value={sampleCount}
          onChange={(e) => setSampleCount(Number(e.target.value))}
          style={{ padding: '5px', marginLeft: '10px', width: '80px' }}
        />
      </div>
      {result && (
        <div
          style={{
            padding: '15px',
            background: 'white',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
        >
          <strong>🎉 恭喜获得:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            {result.map((item, index) => (
              <li key={index} style={{ fontSize: '16px', marginBottom: '5px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- ⚠️ **采样大小**: 如果 `n` 大于集合大小，返回整个集合的随机排列
- ⚠️ **无重复**: 保证返回的元素互不重复
- 💡 **性能提示**: 时间复杂度为 O(n)

## 相关函数

- [`sample`](./sample) - 从集合中随机取一个元素
- [`shuffle`](./shuffle) - 随机排序集合

## 版本历史

- **v0.0.1** - 初始版本
