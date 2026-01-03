---
id: map
title: map
description: '遍历数组并返回一个 Promise，解决为映射值的数组'
---

# `map`

遍历数组并返回一个 Promise，解决为映射值的数组。支持并发限制，用于控制异步转换。

## 语法

```typescript
function map<T, U>(array: T[], mapper: (value: T, index: number) => Promise<U> | U, concurrency?: number): Promise<U[]>;
```

## 参数

| 参数名        | 类型                                           | 必填 | 默认值     | 描述                                            |
| ------------- | ---------------------------------------------- | ---- | ---------- | ----------------------------------------------- |
| `array`       | `T[]`                                          | ✅   | -          | 要遍历的数组                                    |
| `mapper`      | `(value: T, index: number) => Promise<U> \| U` | ✅   | -          | 应用于每个元素的函数 (可以是异步或返回 Promise) |
| `concurrency` | `number`                                       | ❌   | `Infinity` | 最大并发操作数                                  |

## 返回值

- **类型**: `Promise<U[]>`
- **描述**: 返回一个 Promise，解决为映射值的数组，顺序与输入数组相同。如果任何映射器失败，Promise 立即拒绝。

## 示例

### 基础用法

```typescript
import { map } from '@rabjs/kit';

// 示例1: 简单的异步映射
const ids = [1, 2, 3];
const users = await map(ids, (id) => fetchUser(id));
console.log(users); // [user1, user2, user3]

// 示例2: 带并发限制的映射
const numbers = [1, 2, 3, 4, 5];
const doubled = await map(numbers, (n) => Promise.resolve(n * 2), 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### 高级用法

```typescript
// 示例3: 在映射器中使用索引
const items = ['a', 'b', 'c'];
const indexed = await map(items, (item, index) => ({
  item,
  index,
  processed: true,
}));

// 示例4: 链接异步操作
const results = await map(
  urls,
  (url) => fetch(url).then((r) => r.json()),
  3, // 最多 3 个并发请求
);

// 示例5: 复杂转换
const transformed = await map(
  records,
  async (record) => {
    const processed = await processRecord(record);
    const saved = await saveToDatabase(processed);
    return saved;
  },
  5, // 最多 5 个并发操作
);
```

### 实际应用场景

```typescript
// 示例6: 使用并发控制获取用户详情
async function enrichUsersWithDetails(userIds: number[]) {
  return map(
    userIds,
    async (userId) => {
      const user = await fetchUser(userId);
      const profile = await fetchUserProfile(userId);
      const settings = await fetchUserSettings(userId);
      return { ...user, profile, settings };
    },
    3, // 最多 3 个并发充实操作
  );
}

// 示例7: 带转换的批量处理
async function processBatch(items: Item[], batchSize: number = 10) {
  return map(
    items,
    async (item) => {
      const validated = validateItem(item);
      if (!validated) throw new Error(`无效项: ${item.id}`);
      return transformItem(item);
    },
    batchSize,
  );
}

// 示例8: 图像处理管道
async function processImageBatch(imagePaths: string[]) {
  return map(
    imagePaths,
    async (path) => {
      const image = await loadImage(path);
      const resized = await resizeImage(image, { width: 800, height: 600 });
      const compressed = await compressImage(resized);
      const url = await uploadImage(compressed);
      return { path, url };
    },
    4, // 最多 4 个并发图像操作
  );
}

// 示例9: API 数据转换
async function fetchAndTransformData(endpoints: string[]) {
  return map(
    endpoints,
    async (endpoint) => {
      const response = await fetch(`/api${endpoint}`);
      const data = await response.json();
      return {
        endpoint,
        data,
        fetchedAt: new Date(),
        count: Array.isArray(data) ? data.length : 1,
      };
    },
    5,
  );
}

// 示例10: 带进度的数据库迁移
async function migrateRecords(records: any[], concurrency: number = 10) {
  let processed = 0;
  return map(
    records,
    async (record) => {
      const migrated = migrateRecord(record);
      const saved = await db.save(migrated);
      processed++;
      console.log(`已迁移 ${processed}/${records.length}`);
      return saved;
    },
    concurrency,
  );
}
```

## 交互式示例

```tsx live
function MapExample() {
  const [itemCount, setItemCount] = React.useState(10);
  const [concurrency, setConcurrency] = React.useState(3);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const items = Array.from({ length: itemCount }, (_, i) => i + 1);

    try {
      const startTime = Date.now();
      const results = await map(
        items,
        (item) => {
          const delay = Math.random() * 1000 + 300;
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                input: item,
                output: item * 2,
                delay: Math.round(delay),
              });
            }, delay);
          });
        },
        concurrency,
      );
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        results,
        stats: {
          itemCount,
          concurrency,
          totalTime: duration,
          avgDelay: Math.round(results.reduce((sum, r) => sum + r.delay, 0) / results.length),
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
      <h4>map 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>项目数: </label>
          <input
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(Math.max(1, Number(e.target.value)))}
            min="1"
            max="20"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>并发数: </label>
          <input
            type="number"
            value={concurrency}
            onChange={(e) => setConcurrency(Math.max(1, Number(e.target.value)))}
            min="1"
            max="20"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
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
        {loading ? '处理中...' : '执行映射'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>执行统计:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>总耗时: {result.duration}ms</div>
                  <div>项目数: {result.stats.itemCount}</div>
                  <div>并发数: {result.stats.concurrency}</div>
                  <div>平均延迟: {result.stats.avgDelay}ms</div>
                </div>
              </div>
              <div>
                <strong>结果:</strong>
                <div style={{ fontSize: '12px', marginTop: '5px', maxHeight: '200px', overflow: 'auto' }}>
                  {result.results.map((r, idx) => (
                    <div
                      key={idx}
                      style={{ padding: '4px', background: '#f9f9f9', marginBottom: '4px', borderRadius: '2px' }}
                    >
                      {r.input} → {r.output} ({r.delay}ms)
                    </div>
                  ))}
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

- ⚠️ **并发控制**: 设置适当的并发数以平衡性能和资源使用
- 💡 **性能提示**: 对于网络操作，3-5 的并发数通常是最优的
- 🔒 **错误处理**: 如果任何映射器失败，整个 Promise 拒绝；使用 try-catch
- 📚 **最佳实践**: 使用并发限制以尊重 API 速率限制和防止资源耗尽
- ⚠️ **顺序保留**: 结果按输入项的顺序返回

## 相关函数

- [`parallel`](./parallel) - 并发执行多个 Promise
- [`series`](./series) - 顺序执行任务
- [`filter`](./filter) - 带并发控制的异步过滤
- [`reduce`](./reduce) - 异步归约操作

## 版本历史

- **v0.0.1** - 初始版本
