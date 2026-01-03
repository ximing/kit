---
id: uniq
title: uniq
description: '移除数组中的重复值'
---

# `uniq`

移除数组中的重复值，只保留每个值的第一次出现。该函数还提供了 `uniqBy` 用于自定义唯一性标准。

## 语法

```typescript
function uniq<T>(array: T[]): T[];
function uniqBy<T>(array: T[], iteratee: (item: T) => any): T[];
```

## 参数

### `uniq`

| 参数名  | 类型  | 必填 | 默认值 | 描述         |
| ------- | ----- | ---- | ------ | ------------ |
| `array` | `T[]` | ✅   | -      | 要处理的数组 |

### `uniqBy`

| 参数名     | 类型               | 必填 | 默认值 | 描述                 |
| ---------- | ------------------ | ---- | ------ | -------------------- |
| `array`    | `T[]`              | ✅   | -      | 要处理的数组         |
| `iteratee` | `(item: T) => any` | ✅   | -      | 计算唯一性标准的函数 |

## 返回值

- **类型**: `T[]`
- **描述**: 移除重复值后的新数组。如果输入不是数组，返回空数组。

## 示例

### 基础用法

```typescript
import { uniq, uniqBy } from '@rabjs/kit';

// 示例1: 移除重复的数字
const numbers = [1, 2, 2, 3, 3, 3, 4];
const uniqueNumbers = uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4]

// 示例2: 移除重复的字符串
const fruits = ['苹果', '香蕉', '苹果', '樱桃', '香蕉'];
const uniqueFruits = uniq(fruits);
console.log(uniqueFruits); // ['苹果', '香蕉', '樱桃']

// 示例3: 使用 uniqBy 处理对象
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 1, name: '张三副本' },
  { id: 3, name: '王五' },
];
const uniqueUsers = uniqBy(users, (user) => user.id);
console.log(uniqueUsers);
// [
//   { id: 1, name: '张三' },
//   { id: 2, name: '李四' },
//   { id: 3, name: '王五' }
// ]
```

### 高级用法

```typescript
// 示例4: 按属性路径去重
interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
}

const products: Product[] = [
  { id: 1, sku: 'A001', name: '笔记本电脑', category: '电子产品' },
  { id: 2, sku: 'A002', name: '鼠标', category: '电子产品' },
  { id: 3, sku: 'A001', name: '笔记本电脑 Pro', category: '电子产品' },
];

const uniqueBySku = uniqBy(products, (p) => p.sku);
console.log(uniqueBySku);
// [
//   { id: 1, sku: 'A001', name: '笔记本电脑', category: '电子产品' },
//   { id: 2, sku: 'A002', name: '鼠标', category: '电子产品' }
// ]

// 示例5: 不区分大小写的字符串去重
const tags = ['JavaScript', 'javascript', 'JAVASCRIPT', 'Python', 'python'];
const uniqueTags = uniqBy(tags, (tag) => tag.toLowerCase());
console.log(uniqueTags); // ['JavaScript', 'Python']

// 示例6: 按多个属性去重
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const users2: User[] = [
  { firstName: '张', lastName: '三', email: 'zhang@example.com' },
  { firstName: '李', lastName: '四', email: 'li@example.com' },
  { firstName: '张', lastName: '三', email: 'zhangsan@example.com' },
];

const uniqueByFullName = uniqBy(users2, (user) => `${user.firstName}|${user.lastName}`);
console.log(uniqueByFullName);
// [
//   { firstName: '张', lastName: '三', email: 'zhang@example.com' },
//   { firstName: '李', lastName: '四', email: 'li@example.com' }
// ]
```

### 实际应用场景

```typescript
// 示例7: 移除 API 响应中的重复 ID
async function fetchUserFriends(userId: string): Promise<number[]> {
  const [friendsOfFriends, directFriends] = await Promise.all([
    fetch(`/api/users/${userId}/friends-of-friends`).then((r) => r.json()),
    fetch(`/api/users/${userId}/friends`).then((r) => r.json()),
  ]);

  const allIds = [...friendsOfFriends, ...directFriends];
  return uniq(allIds);
}

// 示例8: 合并搜索结果去重
interface SearchResult {
  id: string;
  title: string;
  score: number;
}

function mergeSearchResults(results1: SearchResult[], results2: SearchResult[]): SearchResult[] {
  const combined = [...results1, ...results2];
  // 保留第一次出现（来自第一个结果集的高分项）
  return uniqBy(combined, (result) => result.id);
}

// 示例9: 标签管理系统
class TagManager {
  private tags: string[] = [];

  addTag(tag: string) {
    this.tags.push(tag);
    this.tags = uniq(this.tags); // 自动去重
  }

  addTags(newTags: string[]) {
    this.tags = uniq([...this.tags, ...newTags]);
  }

  getTags(): string[] {
    return [...this.tags];
  }
}

const manager = new TagManager();
manager.addTags(['javascript', 'react', 'javascript', 'node']);
console.log(manager.getTags()); // ['javascript', 'react', 'node']
```

## 交互式示例

```tsx live
function UniqExample() {
  const [input, setInput] = React.useState('1,2,2,3,3,3,4,4,4,4');
  const [mode, setMode] = React.useState('basic');
  const [result, setResult] = React.useState(null);

  const handleUniq = () => {
    try {
      const array = input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      let uniqueResult;
      if (mode === 'basic') {
        uniqueResult = uniq(array);
      } else if (mode === 'caseInsensitive') {
        const objArray = array.map((val) => ({ original: val, lower: val.toLowerCase() }));
        uniqueResult = uniqBy(objArray, (item) => item.lower).map((item) => item.original);
      } else {
        // 按长度去重
        uniqueResult = uniqBy(array, (item) => item.length);
      }

      setResult({
        original: array,
        unique: uniqueResult,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleUniq();
  }, [input, mode]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>uniq 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>输入 (逗号分隔): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>模式: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '5px' }}>
          <option value="basic">基础去重</option>
          <option value="caseInsensitive">不区分大小写</option>
          <option value="byLength">按字符串长度</option>
        </select>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **顺序保留**: 函数保留第一次出现的元素，并维持原始顺序
- ⚠️ **边界情况**: 当输入不是数组时，返回空数组
- 💡 **性能提示**: 使用 `Set` 实现，时间复杂度为 O(n)，性能优异
- 🔒 **类型安全**: 泛型类型确保输入输出类型一致性
- 📚 **最佳实践**: 对于原始值使用 `uniq`，对于对象或自定义标准使用 `uniqBy`
- ⚡ **比较方式**: 值的比较使用 `Set` 语义（类似 `===` 但将 `NaN` 视为相等）
- 🎯 **使用场景**: 适用于去重 ID、标签、搜索结果和 API 响应

## 相关函数

- [`compact`](./compact) - 移除数组中的虚假值
- [`difference`](./difference) - 查找第一个数组中不在其他数组中的值
- [`intersection`](./intersection) - 查找多个数组的交集
- [`union`](./union) - 合并多个数组并去重

## 版本历史

- **v1.0.0** - 初始版本
