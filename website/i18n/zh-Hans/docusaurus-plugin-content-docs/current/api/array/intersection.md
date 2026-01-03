---
id: intersection
title: intersection
description: '创建一个数组，包含所有给定数组中都存在的唯一值'
---

# `intersection`

创建一个包含所有提供的数组中都存在的唯一值的数组。这是集合交集操作。

## 语法

```typescript
function intersection<T>(...arrays: T[][]): T[];
```

## 参数

| 参数名      | 类型    | 必填 | 默认值 | 描述               |
| ----------- | ------- | ---- | ------ | ------------------ |
| `...arrays` | `T[][]` | ✅   | -      | 要检查共同值的数组 |

## 返回值

- **类型**: `T[]`
- **描述**: 包含所有数组中都存在的值的新数组。如果没有提供数组或第一个数组无效，返回空数组。

## 示例

### 基础用法

```typescript
import { intersection } from '@rabjs/kit';

// 示例1: 基本交集
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const common = intersection(array1, array2);
console.log(common); // [3, 4, 5]

// 示例2: 多个数组
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];
const c = [3, 4, 5, 6];
const result = intersection(a, b, c);
console.log(result); // [3, 4]

// 示例3: 字符串数组
const tags1 = ['javascript', 'react', 'node', 'typescript'];
const tags2 = ['react', 'vue', 'typescript'];
const tags3 = ['react', 'angular', 'typescript'];
const commonTags = intersection(tags1, tags2, tags3);
console.log(commonTags); // ['react', 'typescript']
```

### 高级用法

```typescript
// 示例4: 查找共同权限
function findCommonPermissions(...userPermissions: number[][]): number[] {
  return intersection(...userPermissions);
}

const user1 = [1, 2, 3, 4, 5];
const user2 = [2, 3, 4, 6];
const user3 = [3, 4, 5, 7];
console.log(findCommonPermissions(user1, user2, user3)); // [3, 4]

// 示例5: 产品过滤
interface Product {
  id: number;
  name: string;
  categories: string[];
}

function findProductsInAllCategories(products: Product[], requiredCategories: string[]): Product[] {
  return products.filter((product) => {
    const common = intersection([...requiredCategories], product.categories);
    return common.length === requiredCategories.length;
  });
}

// 示例6: 结果中无重复项
const arr1 = [1, 1, 2, 2, 3];
const arr2 = [2, 2, 3, 3, 4];
const intersect = intersection(arr1, arr2);
console.log(intersect); // [2, 3] - 重复项已移除
```

### 实际应用场景

```typescript
// 示例7: 查找共同好友
async function getMutualFriends(userId1: string, userId2: string): Promise<string[]> {
  const [friends1, friends2] = await Promise.all([
    fetch(`/api/users/${userId1}/friends`).then((r) => r.json()),
    fetch(`/api/users/${userId2}/friends`).then((r) => r.json()),
  ]);
  return intersection(friends1, friends2);
}

// 示例8: 功能兼容性检查
function getCompatibleFeatures(
  deviceCapabilities: string[],
  appRequirements: string[],
  userPreferences: string[],
): string[] {
  return intersection(deviceCapabilities, appRequirements, userPreferences);
}

const device = ['bluetooth', 'gps', 'camera', 'nfc'];
const requirements = ['bluetooth', 'camera', 'wifi'];
const preferences = ['bluetooth', 'camera', 'nfc'];
console.log(getCompatibleFeatures(device, requirements, preferences));
// ['bluetooth', 'camera']

// 示例9: 协同过滤
class RecommendationEngine {
  findCommonInterests(userIds: string[], allInterests: Map<string, string[]>): string[] {
    const interestArrays = userIds.map((id) => allInterests.get(id) || []);
    return intersection(...interestArrays);
  }
}

const interests = new Map([
  ['user1', ['音乐', '运动', '旅游', '美食']],
  ['user2', ['运动', '旅游', '游戏']],
  ['user3', ['旅游', '美食', '运动']],
]);

const engine = new RecommendationEngine();
console.log(engine.findCommonInterests(['user1', 'user2', 'user3'], interests));
// ['运动', '旅游']
```

## 交互式示例

```tsx live
function IntersectionExample() {
  const [array1, setArray1] = React.useState('1,2,3,4,5');
  const [array2, setArray2] = React.useState('3,4,5,6,7');
  const [array3, setArray3] = React.useState('4,5,6,7,8');
  const [result, setResult] = React.useState(null);

  const handleIntersection = () => {
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
      const intersect = intersection(...arrays);

      setResult({
        arrays: { array1: arr1, array2: arr2, array3: arr3 },
        intersection: intersect,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleIntersection();
  }, [array1, array2, array3]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>intersection 交互式示例</h4>
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

- ⚠️ **顺序**: 结果保持第一个数组中的顺序
- ⚠️ **自动去重**: 自动从结果中移除重复项
- ⚠️ **边界情况**: 如果没有共同值则返回空数组
- ⚠️ **边界情况**: 如果第一个数组无效则返回空数组
- 💡 **性能提示**: O(n × m) 其中 n 是第一个数组长度，m 是数组数量
- 🔒 **类型安全**: 泛型类型确保所有数组具有兼容的类型
- 📚 **最佳实践**: 适用于查找共同元素、共享权限、相互关系
- ⚡ **比较方式**: 使用 `Set` 进行高效查找（`===` 相等性，NaN 视为相等）

## 相关函数

- [`difference`](./difference) - 查找第一个数组中不在其他数组中的值
- [`union`](./union) - 合并数组并去重
- [`uniq`](./uniq) - 移除单个数组中的重复项

## 版本历史

- **v1.0.0** - 初始版本
