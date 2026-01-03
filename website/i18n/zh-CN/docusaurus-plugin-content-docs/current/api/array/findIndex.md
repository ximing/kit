---
id: findIndex
title: findIndex
description: '查找匹配谓词的第一个元素的索引，并从数组中移除元素'
---

# `findIndex`

查找数组中匹配提供的谓词函数的第一个元素的索引。该模块还包含用于变异数组操作的 `remove` 函数。

## 语法

```typescript
function findIndex<T>(array: T[], predicate: (item: T, index: number) => boolean): number;
function remove<T>(array: T[], predicate: (item: T, index: number) => boolean): T[];
```

## 参数

### `findIndex`

| 参数名      | 类型                                  | 必填 | 默认值 | 描述               |
| ----------- | ------------------------------------- | ---- | ------ | ------------------ |
| `array`     | `T[]`                                 | ✅   | -      | 要搜索的数组       |
| `predicate` | `(item: T, index: number) => boolean` | ✅   | -      | 测试每个元素的函数 |

### `remove`

| 参数名      | 类型                                  | 必填 | 默认值 | 描述                   |
| ----------- | ------------------------------------- | ---- | ------ | ---------------------- |
| `array`     | `T[]`                                 | ✅   | -      | 要修改的数组（会变异） |
| `predicate` | `(item: T, index: number) => boolean` | ✅   | -      | 测试要移除的元素的函数 |

## 返回值

### `findIndex`

- **类型**: `number`
- **描述**: 第一个匹配元素的索引，如果未找到则返回 `-1`。

### `remove`

- **类型**: `T[]`
- **描述**: 被移除元素的数组。原始数组会被修改。

## 示例

### 基础用法

```typescript
import { findIndex, remove } from '@rabjs/kit';

// 示例1: 查找第一个匹配项的索引
const numbers = [1, 2, 3, 4, 5];
const index = findIndex(numbers, (n) => n > 2);
console.log(index); // 2 (3 的索引)

// 示例2: 未找到元素
const notFound = findIndex(numbers, (n) => n > 10);
console.log(notFound); // -1

// 示例3: 移除匹配的元素（会变异数组）
const arr = [1, 2, 3, 4, 5];
const removed = remove(arr, (n) => n > 3);
console.log(removed); // [4, 5]
console.log(arr); // [1, 2, 3] - 原数组被修改
```

### 高级用法

```typescript
// 示例4: 按对象属性查找
interface User {
  id: number;
  name: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: '张三', active: true },
  { id: 2, name: '李四', active: false },
  { id: 3, name: '王五', active: true },
];

const inactiveIndex = findIndex(users, (user) => !user.active);
console.log(inactiveIndex); // 1 (李四)

// 示例5: 使用索引参数
const items = ['a', 'b', 'c', 'd', 'e'];
const indexAfter2 = findIndex(items, (item, idx) => idx > 2 && item === 'd');
console.log(indexAfter2); // 3

// 示例6: 移除未激活的用户
const userList = [
  { id: 1, name: '张三', active: true },
  { id: 2, name: '李四', active: false },
  { id: 3, name: '王五', active: false },
  { id: 4, name: '赵六', active: true },
];

const inactiveUsers = remove(userList, (user) => !user.active);
console.log(inactiveUsers);
// [{ id: 2, name: '李四', active: false }, { id: 3, name: '王五', active: false }]
console.log(userList);
// [{ id: 1, name: '张三', active: true }, { id: 4, name: '赵六', active: true }]
```

### 实际应用场景

```typescript
// 示例7: 表单验证 - 查找第一个错误
interface FormField {
  name: string;
  value: string;
  valid: boolean;
}

function findFirstInvalidField(fields: FormField[]): number {
  return findIndex(fields, (field) => !field.valid);
}

const formFields = [
  { name: 'email', value: 'test@example.com', valid: true },
  { name: 'password', value: '123', valid: false },
  { name: 'confirm', value: '123', valid: false },
];

const firstError = findFirstInvalidField(formFields);
if (firstError !== -1) {
  console.log(`第一个错误在字段: ${formFields[firstError].name}`);
  // "第一个错误在字段: password"
}

// 示例8: 购物车管理
interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

class ShoppingCart {
  private items: CartItem[] = [];

  findItemIndex(itemId: string): number {
    return findIndex(this.items, (item) => item.id === itemId);
  }

  removeOutOfStock(): CartItem[] {
    return remove(this.items, (item) => item.quantity === 0);
  }

  removeCheapItems(maxPrice: number): CartItem[] {
    return remove(this.items, (item) => item.price < maxPrice);
  }
}

// 示例9: 任务队列处理
interface Task {
  id: number;
  priority: number;
  completed: boolean;
}

class TaskQueue {
  private tasks: Task[] = [];

  findHighPriorityTask(): number {
    return findIndex(this.tasks, (task) => task.priority > 8 && !task.completed);
  }

  removeCompletedTasks(): Task[] {
    return remove(this.tasks, (task) => task.completed);
  }

  processAndRemoveTask(): Task | null {
    const highPriorityIdx = this.findHighPriorityTask();
    if (highPriorityIdx !== -1) {
      const [task] = this.tasks.splice(highPriorityIdx, 1);
      return task;
    }
    return null;
  }
}
```

## 交互式示例

```tsx live
function FindIndexExample() {
  const [input, setInput] = React.useState('1,2,3,4,5,6,7,8,9');
  const [threshold, setThreshold] = React.useState(5);
  const [mode, setMode] = React.useState('findIndex');
  const [result, setResult] = React.useState(null);

  const handleOperation = () => {
    try {
      const array = input
        .split(',')
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));

      if (mode === 'findIndex') {
        const idx = findIndex(array, (n) => n > threshold);
        setResult({
          operation: 'findIndex',
          array: array,
          threshold: threshold,
          index: idx,
          foundValue: idx !== -1 ? array[idx] : null,
        });
      } else {
        // 演示用，创建副本以显示前后对比
        const arrayCopy = [...array];
        const removed = remove(arrayCopy, (n) => n > threshold);
        setResult({
          operation: 'remove',
          originalArray: array,
          threshold: threshold,
          removed: removed,
          remainingArray: arrayCopy,
        });
      }
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleOperation();
  }, [input, threshold, mode]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>findIndex/remove 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 (逗号分隔的数字): </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>阈值 (查找/移除大于阈值的项): </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>操作: </label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '5px' }}>
            <option value="findIndex">findIndex (查找第一个)</option>
            <option value="remove">remove (移除所有)</option>
          </select>
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

- ⚠️ **变异**: `remove` 会修改原数组，与库中大多数其他函数不同
- ⚠️ **返回值**: `findIndex` 在未找到匹配时返回 `-1`（与原生 `Array.findIndex` 相同）
- ⚠️ **边界情况**: 当数组不是数组时，`findIndex` 返回 `-1`，`remove` 返回 `[]`
- 💡 **性能提示**: 两个函数都具有 O(n) 时间复杂度
- 🔒 **类型安全**: 泛型类型保持类型信息
- 📚 **最佳实践**: 使用 `findIndex` 进行搜索，仅在可接受变异时使用 `remove`
- ⚡ **替代方案**: 对于非变异移除，使用 `filter` 代替 `remove`
- 🎯 **使用场景**: 按复杂条件查找元素、从列表中移除项

## 相关函数

- [原生 `Array.findIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) - 类似的内置方法
- [原生 `Array.filter`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - `remove` 的非变异替代方案
- [原生 `Array.splice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) - 直接数组变异

## 版本历史

- **v1.0.0** - 初始版本
