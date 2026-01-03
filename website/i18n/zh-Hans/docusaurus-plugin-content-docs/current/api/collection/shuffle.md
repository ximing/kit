---
id: shuffle
title: shuffle
description: '使用 Fisher-Yates 算法随机排序集合中的元素'
---

# `shuffle`

使用 Fisher-Yates 算法随机排序集合中的元素。

## 语法

```typescript
function shuffle<T>(collection: T[]): T[];
```

## 参数

| 参数名       | 类型  | 必填 | 默认值 | 描述             |
| ------------ | ----- | ---- | ------ | ---------------- |
| `collection` | `T[]` | ✅   | -      | 要随机排序的集合 |

## 返回值

- **类型**: `T[]`
- **描述**: 包含相同元素但顺序随机的新数组

## 示例

### 基础用法

```typescript
import { shuffle } from '@rabjs/kit';

// 示例1: 随机排序数字
const numbers = [1, 2, 3, 4, 5];
const shuffled = shuffle(numbers);
console.log(shuffled); // 随机排序

// 示例2: 随机排序字符串
const words = ['苹果', '香蕉', '樱桃', '枣'];
const shuffledWords = shuffle(words);
console.log(shuffledWords); // 随机排序

// 示例3: 原数组不被修改
const original = [1, 2, 3];
const shuffledCopy = shuffle(original);
console.log(original); // [1, 2, 3] - 不变
```

### 高级用法

```typescript
// 示例4: 随机排序对象数组
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
];

const shuffledUsers = shuffle(users);
console.log(shuffledUsers); // 随机排序的用户数组

// 示例5: 随机排序后取前 N 个
const products = [
  { id: 1, name: '笔记本电脑' },
  { id: 2, name: '鼠标' },
  { id: 3, name: '显示器' },
  { id: 4, name: '键盘' },
  { id: 5, name: '耳机' },
];

const randomProducts = shuffle(products).slice(0, 3);
console.log(randomProducts); // 随机选择 3 个产品
```

## 交互式示例

```tsx live
function ShuffleExample() {
  const [result, setResult] = React.useState(null);
  const [shuffleCount, setShuffleCount] = React.useState(0);

  const items = ['🎴 A', '🎴 K', '🎴 Q', '🎴 J', '🎴 10', '🎴 9'];

  const handleShuffle = () => {
    const shuffled = shuffle(items);
    setResult(shuffled);
    setShuffleCount(shuffleCount + 1);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>shuffle 交互式示例 - 洗牌</h4>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleShuffle}
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
          洗牌
        </button>
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
          <strong>洗牌结果:</strong>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px',
              flexWrap: 'wrap',
            }}
          >
            {result.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '10px 15px',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ fontSize: '14px', color: '#666' }}>已洗牌 {shuffleCount} 次</div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **原始数组不变**: 返回新数组，不修改原始集合
- ⚠️ **Fisher-Yates 算法**: 使用高效的随机排序算法
- 💡 **性能提示**: 时间复杂度为 O(n)
- 📚 **最佳实践**: 用于游戏、随机抽样、随机播放

## 相关函数

- [`sample`](./sample) - 从集合中随机取一个元素
- [`sampleSize`](./sampleSize) - 从集合中随机取 N 个元素

## 版本历史

- **v0.0.1** - 初始版本
