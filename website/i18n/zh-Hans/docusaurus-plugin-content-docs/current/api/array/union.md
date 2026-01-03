---
id: union
title: union
description: '创建一个数组，包含所有给定数组中的唯一值'
---

# `union`

创建一个包含所有提供的数组中所有唯一值的数组。这是集合并集操作，带有自动去重。

## 语法

```typescript
function union<T>(...arrays: T[][]): T[];
```

## 参数

| 参数名      | 类型    | 必填 | 默认值 | 描述               |
| ----------- | ------- | ---- | ------ | ------------------ |
| `...arrays` | `T[][]` | ❌   | -      | 要合并和去重的数组 |

## 返回值

- **类型**: `T[]`
- **描述**: 包含所有输入数组中所有唯一值的新数组。如果没有提供数组，返回空数组。

## 示例

### 基础用法

```typescript
import { union } from '@rabjs/kit';

// 示例1: 基本并集
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const combined = union(array1, array2);
console.log(combined); // [1, 2, 3, 4, 5]

// 示例2: 多个数组
const a = [1, 2];
const b = [2, 3];
const c = [3, 4];
const result = union(a, b, c);
console.log(result); // [1, 2, 3, 4]

// 示例3: 字符串数组
const tags1 = ['javascript', 'react'];
const tags2 = ['react', 'vue'];
const tags3 = ['angular', 'vue'];
const allTags = union(tags1, tags2, tags3);
console.log(allTags); // ['javascript', 'react', 'vue', 'angular']
```

### 高级用法

```typescript
// 示例4: 合并用户权限
function mergePermissions(...userPermissions: number[][]): number[] {
  return union(...userPermissions);
}

const admin = [1, 2, 3, 4, 5];
const editor = [2, 3, 6];
const viewer = [7, 8];
console.log(mergePermissions(admin, editor, viewer));
// [1, 2, 3, 4, 5, 6, 7, 8]

// 示例5: 合并搜索结果
interface SearchResult {
  id: string;
  title: string;
}

function mergeSearchResults(...resultSets: string[][]): string[] {
  return union(...resultSets);
}

const dbResults = ['id1', 'id2', 'id3'];
const cacheResults = ['id2', 'id3', 'id4'];
const indexResults = ['id3', 'id4', 'id5'];
console.log(mergeSearchResults(dbResults, cacheResults, indexResults));
// ['id1', 'id2', 'id3', 'id4', 'id5']

// 示例6: 顺序保留
const first = [3, 1, 2];
const second = [2, 4, 1];
const ordered = union(first, second);
console.log(ordered); // [3, 1, 2, 4] - 按首次出现的顺序
```

### 实际应用场景

```typescript
// 示例7: 从多个来源聚合标签
class TagAggregator {
  getAllTags(...tagArrays: string[][]): string[] {
    return union(...tagArrays);
  }

  mergePosts(posts: Array<{ tags: string[] }>): string[] {
    const tagArrays = posts.map((post) => post.tags);
    return union(...tagArrays);
  }
}

const aggregator = new TagAggregator();
const posts = [{ tags: ['javascript', 'react'] }, { tags: ['react', 'typescript'] }, { tags: ['node', 'javascript'] }];
console.log(aggregator.mergePosts(posts));
// ['javascript', 'react', 'typescript', 'node']

// 示例8: 合并功能集
function getAllFeatures(baseFeatures: string[], premiumFeatures: string[], betaFeatures: string[]): string[] {
  return union(baseFeatures, premiumFeatures, betaFeatures);
}

const base = ['登录', '个人资料', '仪表板'];
const premium = ['分析', '导出', '仪表板'];
const beta = ['AI助手', '导出'];
console.log(getAllFeatures(base, premium, beta));
// ['登录', '个人资料', '仪表板', '分析', '导出', 'AI助手']

// 示例9: 合并通知接收者
async function getAllRecipients(eventId: string): Promise<string[]> {
  const [subscribers, participants, admins] = await Promise.all([
    fetch(`/api/events/${eventId}/subscribers`).then((r) => r.json()),
    fetch(`/api/events/${eventId}/participants`).then((r) => r.json()),
    fetch(`/api/events/${eventId}/admins`).then((r) => r.json()),
  ]);

  return union(subscribers, participants, admins);
}
```

## 交互式示例

```tsx live
function UnionExample() {
  const [array1, setArray1] = React.useState('1,2,3');
  const [array2, setArray2] = React.useState('3,4,5');
  const [array3, setArray3] = React.useState('5,6,7');
  const [result, setResult] = React.useState(null);

  const handleUnion = () => {
    try {
      const arr1 = array1
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const arr2 = array2
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const arr3 = array3
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const arrays = [arr1, arr2, arr3].filter((arr) => arr.length > 0);
      const unionResult = union(...arrays);

      setResult({
        arrays: { array1: arr1, array2: arr2, array3: arr3 },
        union: unionResult,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleUnion();
  }, [array1, array2, array3]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>union 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 1: </label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 2: </label>
          <input
            type="text"
            value={array2}
            onChange={(e) => setArray2(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 3: </label>
          <input
            type="text"
            value={array3}
            onChange={(e) => setArray3(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
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

- ⚠️ **顺序**: 保持所有数组中首次出现的顺序
- ⚠️ **自动去重**: 自动移除所有重复项
- ⚠️ **边界情况**: 如果没有提供数组则返回空数组
- ⚠️ **边界情况**: 优雅地跳过非数组参数
- 💡 **性能提示**: O(n) 时间复杂度，其中 n 是总元素数量
- 🔒 **类型安全**: 泛型类型确保所有数组具有兼容的类型
- 📚 **最佳实践**: 适用于合并列表、合并标签、聚合权限
- ⚡ **比较方式**: 使用 `Set` 进行去重（`===` 相等性，NaN 视为相等）

## 相关函数

- [`difference`](./difference) - 查找第一个数组中不在其他数组中的值
- [`intersection`](./intersection) - 查找所有数组中的共同值
- [`uniq`](./uniq) - 移除单个数组中的重复项

## 版本历史

- **v1.0.0** - 初始版本
