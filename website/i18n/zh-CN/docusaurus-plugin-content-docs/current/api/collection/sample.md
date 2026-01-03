---
id: sample
title: sample
description: '从集合中随机获取一个元素'
---

# `sample`

从集合中随机获取一个元素。

## 语法

```typescript
function sample<T>(collection: T[]): T | undefined;
```

## 参数

| 参数名       | 类型  | 必填 | 默认值 | 描述         |
| ------------ | ----- | ---- | ------ | ------------ |
| `collection` | `T[]` | ✅   | -      | 要采样的集合 |

## 返回值

- **类型**: `T | undefined`
- **描述**: 集合中的随机元素，如果集合为空则返回 `undefined`

## 示例

### 基础用法

```typescript
import { sample } from '@rabjs/kit';

// 示例1: 从数组中随机取一个元素
const numbers = [1, 2, 3, 4, 5];
const randomNumber = sample(numbers);
console.log(randomNumber); // 随机返回 1-5 中的一个

// 示例2: 从对象数组中随机取一个
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
];
const randomUser = sample(users);
console.log(randomUser); // 随机返回一个用户对象
```

### 高级用法

```typescript
// 示例3: 随机推荐
const products = [
  { id: 1, name: '笔记本电脑', price: 1200 },
  { id: 2, name: '鼠标', price: 30 },
  { id: 3, name: '显示器', price: 300 },
];

function getRandomRecommendation() {
  const product = sample(products);
  return product ? `推荐: ${product.name}` : '暂无推荐';
}

console.log(getRandomRecommendation()); // 随机推荐一个产品
```

## 交互式示例

```tsx live
function SampleExample() {
  const [result, setResult] = React.useState(null);
  const [count, setCount] = React.useState(0);

  const items = ['🎁 iPhone', '🎁 iPad', '🎁 AirPods', '🎁 Apple Watch', '🎁 MacBook'];

  const handleSample = () => {
    const sampled = sample(items);
    setResult(sampled);
    setCount(count + 1);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>sample 交互式示例 - 随机抽奖</h4>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleSample}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          点击抽奖
        </button>
      </div>
      {result && (
        <div
          style={{
            padding: '15px',
            background: 'white',
            borderRadius: '4px',
            marginBottom: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          🎉 恭喜获得: {result}
        </div>
      )}
      <div style={{ fontSize: '14px', color: '#666' }}>已抽奖 {count} 次</div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **空数组**: 当集合为空时返回 `undefined`
- 💡 **性能提示**: 时间复杂度为 O(1)
- 📚 **最佳实践**: 用于随机选择、推荐系统

## 相关函数

- [`sampleSize`](./sampleSize) - 从集合中随机取 N 个元素
- [`shuffle`](./shuffle) - 随机排序集合

## 版本历史

- **v1.0.0** - 初始版本
