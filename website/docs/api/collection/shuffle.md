---
id: shuffle
title: shuffle
description: 'Creates an array of shuffled values, using a version of the Fisher-Yates shuffle'
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
console.log(shuffled); // 随机排序，如 [3, 1, 5, 2, 4]

// 示例2: 随机排序字符串
const words = ['apple', 'banana', 'cherry', 'date'];
const shuffledWords = shuffle(words);
console.log(shuffledWords); // 随机排序

// 示例3: 原数组不被修改
const original = [1, 2, 3];
const shuffledCopy = shuffle(original);
console.log(original); // [1, 2, 3] - 不变
console.log(shuffledCopy); // 随机排序
```

### 高级用法

```typescript
// 示例4: 随机排序对象数组
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
];

const shuffledUsers = shuffle(users);
console.log(shuffledUsers); // 随机排序的用户数组

// 示例5: 随机排序后取前 N 个
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
  { id: 3, name: 'Monitor' },
  { id: 4, name: 'Keyboard' },
  { id: 5, name: 'Headphones' },
];

const randomProducts = shuffle(products).slice(0, 3);
console.log(randomProducts); // 随机选择 3 个产品

// 示例6: 多次随机排序
const items = ['A', 'B', 'C', 'D', 'E'];
const shuffled1 = shuffle(items);
const shuffled2 = shuffle(items);
const shuffled3 = shuffle(items);
console.log(shuffled1, shuffled2, shuffled3); // 三次不同的随机排列
```

### 实际应用场景

```typescript
// 示例7: 洗牌游戏
interface Card {
  suit: string;
  rank: string;
}

const deck: Card[] = [
  { suit: '♠', rank: 'A' },
  { suit: '♠', rank: 'K' },
  { suit: '♥', rank: 'A' },
  { suit: '♥', rank: 'K' },
  // ... 更多卡牌
];

function dealCards(count: number) {
  const shuffledDeck = shuffle(deck);
  return shuffledDeck.slice(0, count);
}

console.log(dealCards(5)); // 发 5 张随机卡牌

// 示例8: 随机排序问卷题目
interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  { id: 1, text: '问题 1' },
  { id: 2, text: '问题 2' },
  { id: 3, text: '问题 3' },
  { id: 4, text: '问题 4' },
];

function generateRandomQuiz() {
  return shuffle(questions);
}

console.log(generateRandomQuiz()); // 随机顺序的问卷

// 示例9: 随机播放列表
interface Song {
  id: string;
  title: string;
  artist: string;
}

const playlist: Song[] = [
  { id: '1', title: 'Song A', artist: 'Artist 1' },
  { id: '2', title: 'Song B', artist: 'Artist 2' },
  { id: '3', title: 'Song C', artist: 'Artist 3' },
  { id: '4', title: 'Song D', artist: 'Artist 4' },
];

function createShuffledPlaylist() {
  return shuffle(playlist);
}

console.log(createShuffledPlaylist()); // 随机顺序的播放列表

// 示例10: 随机分配任务
interface Task {
  id: string;
  title: string;
  priority: number;
}

const tasks: Task[] = [
  { id: 'task-1', title: '任务 A', priority: 1 },
  { id: 'task-2', title: '任务 B', priority: 2 },
  { id: 'task-3', title: '任务 C', priority: 3 },
  { id: 'task-4', title: '任务 D', priority: 1 },
];

function assignTasksRandomly(teamSize: number) {
  const shuffledTasks = shuffle(tasks);
  const tasksPerMember = Math.ceil(shuffledTasks.length / teamSize);

  const assignments = [];
  for (let i = 0; i < teamSize; i++) {
    assignments.push(shuffledTasks.slice(i * tasksPerMember, (i + 1) * tasksPerMember));
  }
  return assignments;
}

console.log(assignTasksRandomly(2)); // 随机分配任务给 2 个团队成员

// 示例11: 随机选择广告展示顺序
interface Ad {
  id: string;
  title: string;
}

const ads: Ad[] = [
  { id: 'ad-1', title: '广告 A' },
  { id: 'ad-2', title: '广告 B' },
  { id: 'ad-3', title: '广告 C' },
];

function getRandomAdOrder() {
  return shuffle(ads);
}

console.log(getRandomAdOrder()); // 随机顺序显示广告
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
- ⚠️ **Fisher-Yates 算法**: 使用高效的随机排序算法，保证每个排列等概率
- 💡 **性能提示**: 时间复杂度为 O(n)，空间复杂度为 O(n)
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 用于游戏、随机抽样、随机播放等场景

## 相关函数

- [`sample`](./sample) - 从集合中随机取一个元素
- [`sampleSize`](./sampleSize) - 从集合中随机取 N 个元素

## 版本历史

- **v0.0.1** - 初始版本
