---
id: sampleSize
title: sampleSize
description: 'Gets n random elements at unique keys from collection up to the size of collection'
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
console.log(randomNumbers); // 随机返回 3 个不重复的数字，如 [7, 2, 9]

// 示例2: 从对象数组中随机取多个
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
];
const randomUsers = sampleSize(users, 2);
console.log(randomUsers); // 随机返回 2 个用户

// 示例3: N 大于集合大小
const items = ['a', 'b', 'c'];
const result = sampleSize(items, 5);
console.log(result); // 返回全部 3 个元素，不会超过集合大小
```

### 高级用法

```typescript
// 示例4: 随机推荐多个产品
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 30 },
  { id: 3, name: 'Monitor', price: 300 },
  { id: 4, name: 'Keyboard', price: 80 },
  { id: 5, name: 'Headphones', price: 150 },
];

function getRandomRecommendations(count: number) {
  return sampleSize(products, count);
}

console.log(getRandomRecommendations(3)); // 随机推荐 3 个产品

// 示例5: 随机抽取多个奖品
const prizes = ['iPhone', 'iPad', 'AirPods', '现金100元', '优惠券', 'Apple Watch'];

function drawMultiplePrizes(count: number) {
  return sampleSize(prizes, count);
}

console.log(drawMultiplePrizes(3)); // 随机抽取 3 个奖品

// 示例6: 随机选择测试用例
const testCases = [
  { name: 'test-1', timeout: 1000 },
  { name: 'test-2', timeout: 2000 },
  { name: 'test-3', timeout: 1500 },
  { name: 'test-4', timeout: 3000 },
  { name: 'test-5', timeout: 1200 },
];

function selectRandomTestCases(count: number) {
  return sampleSize(testCases, count);
}

console.log(selectRandomTestCases(2)); // 随机选择 2 个测试用例
```

### 实际应用场景

```typescript
// 示例7: 随机选择推荐用户
interface User {
  id: number;
  name: string;
  avatar: string;
}

const allUsers: User[] = [
  { id: 1, name: 'Alice', avatar: 'url1' },
  { id: 2, name: 'Bob', avatar: 'url2' },
  { id: 3, name: 'Charlie', avatar: 'url3' },
  { id: 4, name: 'David', avatar: 'url4' },
  { id: 5, name: 'Eve', avatar: 'url5' },
];

function getRecommendedUsers(count: number) {
  return sampleSize(allUsers, Math.min(count, allUsers.length));
}

console.log(getRecommendedUsers(3)); // 推荐 3 个随机用户

// 示例8: 随机选择问卷题目
interface Question {
  id: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const questionBank: Question[] = [
  { id: 1, text: '什么是 JavaScript?', difficulty: 'easy' },
  { id: 2, text: '解释闭包的概念', difficulty: 'hard' },
  { id: 3, text: 'async/await 的用途', difficulty: 'medium' },
  { id: 4, text: '什么是原型链?', difficulty: 'hard' },
  { id: 5, text: '数组方法有哪些?', difficulty: 'easy' },
];

function generateRandomQuiz(questionCount: number) {
  return sampleSize(questionBank, questionCount);
}

console.log(generateRandomQuiz(3)); // 生成 3 道随机题目的问卷

// 示例9: 随机选择服务器进行负载测试
interface Server {
  id: string;
  host: string;
  port: number;
}

const servers: Server[] = [
  { id: 'srv-1', host: 'server1.example.com', port: 8080 },
  { id: 'srv-2', host: 'server2.example.com', port: 8080 },
  { id: 'srv-3', host: 'server3.example.com', port: 8080 },
  { id: 'srv-4', host: 'server4.example.com', port: 8080 },
];

function selectServersForTesting(count: number) {
  return sampleSize(servers, count);
}

console.log(selectServersForTesting(2)); // 随机选择 2 个服务器进行测试

// 示例10: 随机选择广告展示
interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
}

const ads: Advertisement[] = [
  { id: 'ad-1', title: '产品 A', imageUrl: 'url1' },
  { id: 'ad-2', title: '产品 B', imageUrl: 'url2' },
  { id: 'ad-3', title: '产品 C', imageUrl: 'url3' },
  { id: 'ad-4', title: '产品 D', imageUrl: 'url4' },
  { id: 'ad-5', title: '产品 E', imageUrl: 'url5' },
];

function getRandomAds(count: number) {
  return sampleSize(ads, Math.min(count, ads.length));
}

console.log(getRandomAds(3)); // 随机选择 3 个广告展示
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
- ⚠️ **无效输入**: 如果 `n <= 0`，返回空数组
- 💡 **性能提示**: 时间复杂度为 O(n)，空间复杂度为 O(n)
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 用于随机推荐、问卷抽样、负载测试等场景

## 相关函数

- [`sample`](./sample) - 从集合中随机取一个元素
- [`shuffle`](./shuffle) - 随机排序集合

## 版本历史

- **v0.0.1** - 初始版本
