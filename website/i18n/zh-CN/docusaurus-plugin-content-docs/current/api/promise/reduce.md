---
id: reduce
title: reduce
description: '遍历数组并使用异步归约函数将其归约为单个值'
---

# `reduce`

遍历数组并使用异步归约函数将其归约为单个值。这对于累积值、聚合数据和复杂转换很有用，其中每一步都依赖于前一个结果。

## 语法

```typescript
function reduce<T, U>(
  array: T[],
  reducer: (accumulator: U, value: T, index: number) => Promise<U> | U,
  initialValue: U,
): Promise<U>;
```

## 参数

| 参数名         | 类型                                                           | 必填 | 默认值 | 描述                                          |
| -------------- | -------------------------------------------------------------- | ---- | ------ | --------------------------------------------- |
| `array`        | `T[]`                                                          | ✅   | -      | 要归约的数组                                  |
| `reducer`      | `(accumulator: U, value: T, index: number) => Promise<U> \| U` | ✅   | -      | 归约每个元素的函数 (可以是异步或返回 Promise) |
| `initialValue` | `U`                                                            | ✅   | -      | 累加器的初始值                                |

## 返回值

- **类型**: `Promise<U>`
- **描述**: 返回一个 Promise，解决为最终累积值。如果任何归约调用失败，Promise 立即拒绝。

## 示例

### 基础用法

```typescript
import { reduce } from '@rabjs/kit';

// 示例1: 数字求和
const sum = await reduce([1, 2, 3, 4], (acc, value) => Promise.resolve(acc + value), 0);
console.log(sum); // 10

// 示例2: 从数组构建对象
const result = await reduce(['a', 'b', 'c'], (acc, value) => ({ ...acc, [value]: value.toUpperCase() }), {});
console.log(result); // { a: 'A', b: 'B', c: 'C' }
```

### 高级用法

```typescript
// 示例3: 获取并累积用户数据
const users = await reduce(
  userIds,
  async (acc, id) => {
    const user = await fetchUser(id);
    return [...acc, user];
  },
  [],
);

// 示例4: 具有异步操作的复杂聚合
const aggregated = await reduce(
  records,
  async (acc, record) => {
    const processed = await processRecord(record);
    const saved = await saveToDatabase(processed);
    return {
      ...acc,
      count: acc.count + 1,
      total: acc.total + saved.value,
      items: [...acc.items, saved],
    };
  },
  { count: 0, total: 0, items: [] },
);

// 示例5: 构建依赖链
const result = await reduce(
  operations,
  async (acc, operation) => {
    const result = await operation(acc);
    return result;
  },
  initialState,
);
```

### 实际应用场景

```typescript
// 示例6: 计算订单总价 (含税和折扣)
async function calculateOrderTotal(items: OrderItem[]) {
  return reduce(
    items,
    async (acc, item) => {
      const itemPrice = await fetchItemPrice(item.id);
      return acc + itemPrice * item.quantity;
    },
    0,
  );
}

// 示例7: 按类别分组数据
async function groupByCategory(items: any[]) {
  return reduce(
    items,
    async (acc, item) => {
      const category = await fetchCategory(item.categoryId);
      return {
        ...acc,
        [category.name]: [...(acc[category.name] || []), item],
      };
    },
    {},
  );
}

// 示例8: 合并 API 响应
async function mergeAPIResponses(endpoints: string[]) {
  return reduce(
    endpoints,
    async (acc, endpoint) => {
      const response = await fetch(`/api${endpoint}`).then((r) => r.json());
      return {
        ...acc,
        ...response,
      };
    },
    {},
  );
}

// 示例9: 构建树形结构
async function buildHierarchy(nodes: any[]) {
  return reduce(
    nodes,
    async (acc, node) => {
      const parent = await fetchParent(node.parentId);
      return {
        ...acc,
        [node.id]: {
          ...node,
          parent: parent ? parent.name : null,
        },
      };
    },
    {},
  );
}

// 示例10: 累积统计数据
async function gatherStatistics(dataPoints: any[]) {
  return reduce(
    dataPoints,
    async (acc, point) => {
      const processed = await processDataPoint(point);
      return {
        count: acc.count + 1,
        sum: acc.sum + processed.value,
        min: Math.min(acc.min, processed.value),
        max: Math.max(acc.max, processed.value),
        average: (acc.sum + processed.value) / (acc.count + 1),
      };
    },
    { count: 0, sum: 0, min: Infinity, max: -Infinity, average: 0 },
  );
}

// 示例11: 顺序批量处理
async function processBatchSequentially(items: any[]) {
  return reduce(
    items,
    async (acc, item) => {
      const result = await processBatch(item);
      return {
        ...acc,
        processed: acc.processed + 1,
        results: [...acc.results, result],
      };
    },
    { processed: 0, results: [] },
  );
}
```

## 交互式示例

```tsx live
function ReduceExample() {
  const [itemCount, setItemCount] = React.useState(5);
  const [operation, setOperation] = React.useState('sum');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const items = Array.from({ length: itemCount }, (_, i) => i + 1);

    try {
      const startTime = Date.now();
      let reduceResult;

      if (operation === 'sum') {
        reduceResult = await reduce(
          items,
          async (acc, value) => {
            await new Promise((r) => setTimeout(r, Math.random() * 200 + 50));
            return acc + value;
          },
          0,
        );
      } else if (operation === 'product') {
        reduceResult = await reduce(
          items,
          async (acc, value) => {
            await new Promise((r) => setTimeout(r, Math.random() * 200 + 50));
            return acc * value;
          },
          1,
        );
      } else {
        reduceResult = await reduce(
          items,
          async (acc, value) => {
            await new Promise((r) => setTimeout(r, Math.random() * 200 + 50));
            return acc + value * value;
          },
          0,
        );
      }

      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        result: reduceResult,
        stats: {
          itemCount,
          operation,
          totalTime: duration,
        },
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>reduce 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>项目数: </label>
          <input
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(Math.max(1, Number(e.target.value)))}
            min="1"
            max="10"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>操作: </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="sum">求和</option>
            <option value="product">乘积</option>
            <option value="sumOfSquares">平方和</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleExecute}
        disabled={loading}
        style={{
          padding: '8px 16px',
          background: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? '归约中...' : '执行归约'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>结果: {result.result}</strong>
              </div>
              <div>
                <strong>统计:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>项目数: {result.stats.itemCount}</div>
                  <div>操作: {result.stats.operation}</div>
                  <div>总耗时: {result.stats.totalTime}ms</div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ color: 'red' }}>错误: {result.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- ⚠️ **顺序执行**: Reduce 始终顺序执行；每一步等待前一步完成
- 💡 **性能提示**: 对于独立操作，考虑使用 `map` 配合 `parallel`
- 🔒 **错误处理**: 如果任何归约调用失败，整个 Promise 拒绝；使用 try-catch
- 📚 **最佳实践**: 对于每一步都依赖前一个结果的操作，使用 reduce
- ⚠️ **内存使用**: 小心每次迭代增长的累加器对象

## 相关函数

- [`map`](./map) - 带并发控制的异步映射
- [`parallel`](./parallel) - 并发执行多个 Promise
- [`series`](./series) - 顺序执行任务
- [`filter`](./filter) - 带并发控制的异步过滤

## 版本历史

- **v1.0.0** - 初始版本
