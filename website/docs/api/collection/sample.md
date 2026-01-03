---
id: sample
title: sample
description: 'Gets a random element from collection'
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
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
const randomUser = sample(users);
console.log(randomUser); // 随机返回一个用户对象

// 示例3: 处理空数组
const emptyArray = [];
const result = sample(emptyArray);
console.log(result); // undefined
```

### 高级用法

```typescript
// 示例4: 随机推荐
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 30 },
  { id: 3, name: 'Monitor', price: 300 },
  { id: 4, name: 'Keyboard', price: 80 },
];

function getRandomRecommendation() {
  const product = sample(products);
  return product ? `推荐: ${product.name}` : '暂无推荐';
}

console.log(getRandomRecommendation()); // 随机推荐一个产品

// 示例5: 随机抽奖
const prizes = ['iPhone', 'iPad', 'AirPods', '现金100元', '优惠券'];

function drawPrize() {
  return sample(prizes);
}

console.log(drawPrize()); // 随机返回一个奖品

// 示例6: 随机选择配置
const colorSchemes = ['light', 'dark', 'auto'];

function getRandomTheme() {
  return sample(colorSchemes) || 'light';
}

console.log(getRandomTheme()); // 随机返回一个主题
```

### 实际应用场景

```typescript
// 示例7: 随机选择测试数据
interface TestUser {
  id: number;
  email: string;
  role: string;
}

const testUsers: TestUser[] = [
  { id: 1, email: 'user1@test.com', role: 'admin' },
  { id: 2, email: 'user2@test.com', role: 'user' },
  { id: 3, email: 'user3@test.com', role: 'moderator' },
];

function getRandomTestUser() {
  return sample(testUsers);
}

// 示例8: 随机选择服务器
const servers = ['server-1.example.com', 'server-2.example.com', 'server-3.example.com', 'server-4.example.com'];

function getRandomServer() {
  return sample(servers) || 'default-server.example.com';
}

// 示例9: 随机问卷题目
interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  { id: 1, text: '你最喜欢的编程语言?', options: ['JavaScript', 'TypeScript', 'Python'] },
  { id: 2, text: '你的开发经验?', options: ['新手', '中级', '高级'] },
];

function getRandomQuestion() {
  return sample(questions);
}

// 示例10: 随机选择背景
const backgrounds = ['url(bg-1.jpg)', 'url(bg-2.jpg)', 'url(bg-3.jpg)', 'url(bg-4.jpg)'];

function getRandomBackground() {
  return sample(backgrounds);
}
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
- ⚠️ **随机性**: 使用 `Math.random()` 实现，具有伪随机性
- 💡 **性能提示**: 时间复杂度为 O(1)，性能最优
- 🔒 **类型安全**: 函数支持泛型，保持类型一致性
- 📚 **最佳实践**: 用于随机选择、推荐系统、测试数据生成

## 相关函数

- [`sampleSize`](./sampleSize) - 从集合中随机取 N 个元素
- [`shuffle`](./shuffle) - 随机排序集合

## 版本历史

- **v0.0.1** - 初始版本
