---
id: difference
title: difference
description: '创建一个数组，包含第一个数组中不在其他数组中的唯一值'
---

# `difference`

创建一个数组，包含第一个数组中不在任何其他提供的数组中的唯一值。此函数对于查找第一个数组独有的元素非常有用。

## 语法

```typescript
function difference<T>(array: T[], ...arrays: T[][]): T[];
```

## 参数

| 参数名      | 类型    | 必填 | 默认值 | 描述             |
| ----------- | ------- | ---- | ------ | ---------------- |
| `array`     | `T[]`   | ✅   | -      | 要检查的数组     |
| `...arrays` | `T[][]` | ❌   | -      | 要排除的值的数组 |

## 返回值

- **类型**: `T[]`
- **描述**: 包含第一个数组中不在其他数组中的唯一值的新数组。如果第一个输入不是数组，返回空数组。

## 示例

### 基础用法

```typescript
import { difference } from '@rabjs/kit';

// 示例1: 基本差集
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const diff = difference(array1, array2);
console.log(diff); // [1, 2]

// 示例2: 多个排除数组
const base = [1, 2, 3, 4, 5];
const exclude1 = [2, 4];
const exclude2 = [3];
const result = difference(base, exclude1, exclude2);
console.log(result); // [1, 5]

// 示例3: 字符串数组
const allTags = ['javascript', 'react', 'vue', 'angular', 'node'];
const frontendTags = ['react', 'vue', 'angular'];
const backendOnly = difference(allTags, frontendTags);
console.log(backendOnly); // ['javascript', 'node']
```

### 高级用法

```typescript
// 示例4: 查找独有权限
interface Permission {
  id: number;
  name: string;
}

function findExclusivePermissions(userPermissions: number[], rolePermissions: number[]): number[] {
  return difference(userPermissions, rolePermissions);
}

const user1Permissions = [1, 2, 3, 4, 5];
const rolePermissions = [3, 4, 5];
console.log(findExclusivePermissions(user1Permissions, rolePermissions));
// [1, 2] - 用户拥有的超出角色的权限

// 示例5: 第一个数组中的去重
const withDuplicates = [1, 1, 2, 2, 3, 3];
const toRemove = [2];
const cleaned = difference(withDuplicates, toRemove);
console.log(cleaned); // [1, 3] - 同时也会移除第一个数组中的重复项

// 示例6: 对象比较（按引用）
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };

const objects1 = [obj1, obj2, obj3];
const objects2 = [obj2];
const diffObjects = difference(objects1, objects2);
console.log(diffObjects); // [{ id: 1 }, { id: 3 }]
```

### 实际应用场景

```typescript
// 示例7: 管理功能标志
function getNewFeatures(allFeatures: string[], deployedFeatures: string[]): string[] {
  return difference(allFeatures, deployedFeatures);
}

const allFeatures = ['feature-a', 'feature-b', 'feature-c', 'feature-d'];
const deployed = ['feature-a', 'feature-b'];
console.log(getNewFeatures(allFeatures, deployed));
// ['feature-c', 'feature-d']

// 示例8: 处理表单变更
interface FormState {
  selectedIds: number[];
}

function getAddedItems(currentSelection: number[], previousSelection: number[]): number[] {
  return difference(currentSelection, previousSelection);
}

function getRemovedItems(currentSelection: number[], previousSelection: number[]): number[] {
  return difference(previousSelection, currentSelection);
}

const previous = [1, 2, 3, 4];
const current = [2, 3, 5, 6];
console.log(getAddedItems(current, previous)); // [5, 6]
console.log(getRemovedItems(current, previous)); // [1, 4]

// 示例9: 过滤被封禁的用户
function getActiveUserIds(allUserIds: number[], blockedUserIds: number[], deletedUserIds: number[]): number[] {
  return difference(allUserIds, blockedUserIds, deletedUserIds);
}

const allUsers = [1, 2, 3, 4, 5, 6, 7, 8];
const blocked = [2, 5];
const deleted = [7];
console.log(getActiveUserIds(allUsers, blocked, deleted));
// [1, 3, 4, 6, 8]
```

## 交互式示例

```tsx live
function DifferenceExample() {
  const [array1, setArray1] = React.useState('1,2,3,4,5');
  const [array2, setArray2] = React.useState('3,4,5');
  const [array3, setArray3] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleDifference = () => {
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
        ? array3
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const arrays = [arr2, arr3].filter((arr) => arr.length > 0);
      const diff = difference(arr1, ...arrays);

      setResult({
        array1: arr1,
        array2: arr2,
        array3: arr3.length > 0 ? arr3 : '(空)',
        difference: diff,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleDifference();
  }, [array1, array2, array3]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>difference 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 1 (基础数组): </label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 2 (要排除): </label>
          <input
            type="text"
            value={array2}
            onChange={(e) => setArray2(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 3 (可选，要排除): </label>
          <input
            type="text"
            value={array3}
            onChange={(e) => setArray3(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            placeholder="留空则跳过"
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

- ⚠️ **自动去重**: 结果会自动移除第一个数组中的重复项
- ⚠️ **边界情况**: 当第一个参数不是数组时，返回空数组
- ⚠️ **比较方式**: 使用 `Set` 进行比较（类似 `===` 但将 `NaN` 视为相等）
- 💡 **性能提示**: O(n + m) 时间复杂度，其中 n 是第一个数组长度，m 是所有排除数组的总长度
- 🔒 **类型安全**: 泛型类型确保所有数组的类型一致性
- 📚 **最佳实践**: 适用于权限系统、功能标志和数据同步
- ⚡ **对象比较**: 对象按引用比较，不是深度相等比较
- 🎯 **使用场景**: 适合查找集合独有的元素、过滤不需要的项

## 相关函数

- [`intersection`](./intersection) - 查找所有数组中的共同值
- [`union`](./union) - 合并数组并去重
- [`uniq`](./uniq) - 移除单个数组中的重复项
- [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - JavaScript 原生的过滤方法

## 版本历史

- **v1.0.0** - 初始版本
