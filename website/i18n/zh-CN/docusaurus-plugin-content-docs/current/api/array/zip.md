---
id: zip
title: zip
description: '将数组压缩组合，获取前 N 个元素，或跳过前 N 个元素'
---

# `zip`

从多个数组创建分组元素的数组。该模块还包含用于提取数组子集的 `take` 和 `drop` 函数。

## 语法

```typescript
function zip<T>(...arrays: T[][]): T[][];
function take<T>(array: T[], n?: number): T[];
function drop<T>(array: T[], n?: number): T[];
```

## 参数

### `zip`

| 参数名      | 类型    | 必填 | 默认值 | 描述             |
| ----------- | ------- | ---- | ------ | ---------------- |
| `...arrays` | `T[][]` | ❌   | -      | 要压缩组合的数组 |

### `take`

| 参数名  | 类型     | 必填 | 默认值 | 描述             |
| ------- | -------- | ---- | ------ | ---------------- |
| `array` | `T[]`    | ✅   | -      | 要获取元素的数组 |
| `n`     | `number` | ❌   | `1`    | 要获取的元素数量 |

### `drop`

| 参数名  | 类型     | 必填 | 默认值 | 描述             |
| ------- | -------- | ---- | ------ | ---------------- |
| `array` | `T[]`    | ✅   | -      | 要跳过元素的数组 |
| `n`     | `number` | ❌   | `1`    | 要跳过的元素数量 |

## 返回值

### `zip`

- **类型**: `T[][]`
- **描述**: 分组元素的数组。长度等于最短数组的长度。

### `take`

- **类型**: `T[]`
- **描述**: 包含前 `n` 个元素的新数组。如果 `n` ≤ 0 返回空数组。

### `drop`

- **类型**: `T[]`
- **描述**: 不包含前 `n` 个元素的新数组。如果 `n` ≤ 0 返回数组副本。

## 示例

### 基础用法

```typescript
import { zip, take, drop } from '@rabjs/kit';

// 示例1: 压缩两个数组
const names = ['张三', '李四', '王五'];
const ages = [25, 30, 35];
const zipped = zip(names, ages);
console.log(zipped);
// [['张三', 25], ['李四', 30], ['王五', 35]]

// 示例2: 获取前 N 个元素
const numbers = [1, 2, 3, 4, 5];
const firstThree = take(numbers, 3);
console.log(firstThree); // [1, 2, 3]

// 示例3: 跳过前 N 个元素
const remaining = drop(numbers, 2);
console.log(remaining); // [3, 4, 5]

// 示例4: 压缩不同长度的数组（使用最短的）
const short = ['a', 'b'];
const long = [1, 2, 3, 4];
const zipped2 = zip(short, long);
console.log(zipped2); // [['a', 1], ['b', 2]]
```

### 高级用法

```typescript
// 示例5: 创建键值对
const keys = ['name', 'email', 'age'];
const values = ['张三', 'zhang@example.com', 25];
const keyValuePairs = zip(keys, values);
const obj = Object.fromEntries(keyValuePairs);
console.log(obj);
// { name: '张三', email: 'zhang@example.com', age: 25 }

// 示例6: 使用 take 实现分页
function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  const pageItems = drop(items, startIndex);
  return take(pageItems, pageSize);
}

const allItems = Array.from({ length: 25 }, (_, i) => i + 1);
console.log(paginate(allItems, 2, 10)); // [11, 12, ..., 20]
console.log(paginate(allItems, 3, 10)); // [21, 22, 23, 24, 25]

// 示例7: 合并并行数组
interface User {
  id: number;
  name: string;
  score: number;
}

function combineUserData(ids: number[], names: string[], scores: number[]): User[] {
  return zip(ids, names, scores).map(([id, name, score]) => ({
    id: id as number,
    name: name as string,
    score: score as number,
  }));
}

const ids = [1, 2, 3];
const names = ['张三', '李四', '王五'];
const scores = [95, 87, 92];
console.log(combineUserData(ids, names, scores));
// [
//   { id: 1, name: '张三', score: 95 },
//   { id: 2, name: '李四', score: 87 },
//   { id: 3, name: '王五', score: 92 }
// ]
```

### 实际应用场景

```typescript
// 示例8: CSV 类数据处理
function createTableData(headers: string[], ...rows: any[][]): Array<Record<string, any>> {
  return rows.map((row) => {
    const pairs = zip(headers, row);
    return Object.fromEntries(pairs);
  });
}

const headers = ['姓名', '年龄', '城市'];
const row1 = ['张三', 25, '北京'];
const row2 = ['李四', 30, '上海'];
const tableData = createTableData(headers, row1, row2);
console.log(tableData);
// [
//   { 姓名: '张三', 年龄: 25, 城市: '北京' },
//   { 姓名: '李四', 年龄: 30, 城市: '上海' }
// ]

// 示例9: 无限滚动实现
class InfiniteScrollList<T> {
  private items: T[];
  private loadedCount: number = 0;
  private batchSize: number = 20;

  constructor(items: T[]) {
    this.items = items;
  }

  loadMore(): T[] {
    const remaining = drop(this.items, this.loadedCount);
    const batch = take(remaining, this.batchSize);
    this.loadedCount += batch.length;
    return batch;
  }

  reset() {
    this.loadedCount = 0;
  }

  hasMore(): boolean {
    return this.loadedCount < this.items.length;
  }
}

const list = new InfiniteScrollList(Array.from({ length: 100 }, (_, i) => i));
console.log(list.loadMore()); // [0, 1, ..., 19]
console.log(list.loadMore()); // [20, 21, ..., 39]

// 示例10: 比较两个数据集
function compareArrays<T>(oldData: T[], newData: T[], compareCount: number = 10): { old: T[]; new: T[] } {
  return {
    old: take(oldData, compareCount),
    new: take(newData, compareCount),
  };
}

const oldProducts = ['A', 'B', 'C', 'D', 'E'];
const newProducts = ['A', 'X', 'C', 'Y', 'E'];
console.log(compareArrays(oldProducts, newProducts, 3));
// { old: ['A', 'B', 'C'], new: ['A', 'X', 'C'] }
```

## 交互式示例

```tsx live
function ZipTakeDropExample() {
  const [array1, setArray1] = React.useState('a,b,c,d,e');
  const [array2, setArray2] = React.useState('1,2,3,4,5');
  const [n, setN] = React.useState(3);
  const [operation, setOperation] = React.useState('zip');
  const [result, setResult] = React.useState(null);

  const handleOperation = () => {
    try {
      const arr1 = array1
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const arr2 = array2
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      let output;
      if (operation === 'zip') {
        output = zip(arr1, arr2);
      } else if (operation === 'take') {
        output = take(arr1, n);
      } else {
        output = drop(arr1, n);
      }

      setResult({
        operation,
        array1: arr1,
        array2: operation === 'zip' ? arr2 : undefined,
        n: operation !== 'zip' ? n : undefined,
        result: output,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleOperation();
  }, [array1, array2, n, operation]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>zip/take/drop 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>操作: </label>
          <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{ padding: '5px' }}>
            <option value="zip">zip</option>
            <option value="take">take</option>
            <option value="drop">drop</option>
          </select>
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>数组 1: </label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        {operation === 'zip' && (
          <div style={{ marginBottom: '5px' }}>
            <label>数组 2 (用于 zip): </label>
            <input
              type="text"
              value={array2}
              onChange={(e) => setArray2(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        )}
        {operation !== 'zip' && (
          <div style={{ marginBottom: '5px' }}>
            <label>N (用于 take/drop): </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              min="0"
              style={{ width: '80px', padding: '5px' }}
            />
          </div>
        )}
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

- ⚠️ **Zip 长度**: 结果长度等于最短输入数组的长度
- ⚠️ **边界情况**: 不带数组调用 `zip()` 返回 `[]`
- ⚠️ **边界情况**: `take/drop` 传入无效数组返回 `[]`
- ⚠️ **边界情况**: `take/drop` 的 `n` ≤ 0 时返回 `[]` 或原数组副本
- 💡 **性能提示**: 所有函数都是 O(n) 时间复杂度
- 🔒 **类型安全**: 泛型在可能的情况下保持类型信息
- 📚 **最佳实践**: 使用 `zip` 组合并行数据，使用 `take/drop` 实现分页
- ⚡ **不可变性**: 所有函数返回新数组，原数组不变
- 🎯 **使用场景**: 数据转换、分页、CSV 处理、并行数组

## 相关函数

- [`chunk`](./chunk) - 将数组拆分为固定大小的块
- [`flatten`](./flatten) - 在某些场景下与 zip 相反
- [原生 `Array.slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) - 底层切片操作

## 版本历史

- **v1.0.0** - 初始版本
