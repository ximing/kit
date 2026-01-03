---
id: parallel
title: parallel
description: '并发执行多个 Promise，具有并发限制'
---

# `parallel`

并发执行多个 Promise，具有并发限制。这是管理并发操作、控制资源使用和防止压倒外部服务的实用工具。

## 语法

```typescript
function parallel<T>(tasks: Array<() => Promise<T> | T>, concurrency?: number): Promise<T[]>;
```

## 参数

| 参数名        | 类型                           | 必填 | 默认值     | 描述                        |
| ------------- | ------------------------------ | ---- | ---------- | --------------------------- |
| `tasks`       | `Array<() => Promise<T> \| T>` | ✅   | -          | 返回 Promise 或值的函数数组 |
| `concurrency` | `number`                       | ❌   | `Infinity` | 最大并发执行的 Promise 数   |

## 返回值

- **类型**: `Promise<T[]>`
- **描述**: 返回一个 Promise，解决为结果数组，顺序与任务相同。如果任何任务失败，Promise 立即拒绝该错误。

## 示例

### 基础用法

```typescript
import { parallel } from '@rabjs/kit';

// 示例1: 并发执行所有任务
const results = await parallel([() => fetchUser(1), () => fetchUser(2), () => fetchUser(3)]);
console.log(results); // [user1, user2, user3] 按顺序

// 示例2: 带并发限制
const results = await parallel([() => fetchUser(1), () => fetchUser(2), () => fetchUser(3)], 2); // 最多 2 个并发请求
console.log(results); // [user1, user2, user3]
```

### 高级用法

```typescript
// 示例3: 混合同步和异步任务
const results = await parallel([
  () => '同步值',
  async () => await fetchData(),
  () => Promise.resolve('promise 值'),
  () => expensiveComputation(),
]);

// 示例4: 使用并发控制处理大型数据集
async function processUsers(userIds: number[]) {
  const tasks = userIds.map((id) => () => fetchAndProcessUser(id));
  return parallel(tasks, 5); // 最多并发处理 5 个用户
}

const processedUsers = await processUsers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### 实际应用场景

```typescript
// 示例5: 批量 API 调用，带并发控制
async function fetchMultipleResources(urls: string[], maxConcurrent: number = 3) {
  const tasks = urls.map((url) => () => fetch(url).then((res) => res.json()));
  return parallel(tasks, maxConcurrent);
}

const data = await fetchMultipleResources(['/api/users', '/api/posts', '/api/comments', '/api/tags'], 2);

// 示例6: 数据库操作，带并发限制
async function bulkInsertWithConcurrency(records: any[], batchSize: number = 10) {
  const tasks = records.map((record) => () => db.insert(record));
  return parallel(tasks, batchSize);
}

// 示例7: 图像处理，带并发控制
async function processImages(imagePaths: string[], maxConcurrent: number = 4) {
  const tasks = imagePaths.map(
    (path) => () =>
      loadImage(path)
        .then((img) => resizeImage(img))
        .then((img) => compressImage(img)),
  );
  return parallel(tasks, maxConcurrent);
}

// 示例8: 带重试逻辑的并行数据获取
async function fetchDataWithRetry(dataIds: string[]) {
  const tasks = dataIds.map(
    (id) => () =>
      retry(() => fetchData(id), {
        maxAttempts: 3,
        delay: 500,
      }),
  );
  return parallel(tasks, 5);
}

// 示例9: 超时保护的并行执行
async function fetchWithTimeout(urls: string[], timeoutMs: number = 5000) {
  const tasks = urls.map(
    (url) => () =>
      timeout(
        fetch(url).then((r) => r.json()),
        timeoutMs,
      ),
  );
  return parallel(tasks, 3);
}
```

## 交互式示例

```tsx live
function ParallelExample() {
  const [taskCount, setTaskCount] = React.useState(6);
  const [concurrency, setConcurrency] = React.useState(3);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const tasks = Array.from({ length: taskCount }, (_, i) => () => {
      const delay = Math.random() * 2000 + 500; // 500-2500ms
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: i + 1,
            delay: Math.round(delay),
            timestamp: new Date().toLocaleTimeString(),
          });
        }, delay);
      });
    });

    try {
      const startTime = Date.now();
      const results = await parallel(tasks, concurrency);
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        results,
        stats: {
          taskCount,
          concurrency,
          totalTime: duration,
          estimatedParallel: Math.ceil(results.reduce((sum, r) => sum + r.delay, 0) / concurrency),
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
      <h4>parallel 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>任务数: </label>
          <input
            type="number"
            value={taskCount}
            onChange={(e) => setTaskCount(Math.max(1, Number(e.target.value)))}
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
        {loading ? '执行中...' : '执行并行'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>执行统计:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>总耗时: {result.duration}ms</div>
                  <div>任务数: {result.stats.taskCount}</div>
                  <div>并发数: {result.stats.concurrency}</div>
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
                      任务 {r.id}: {r.delay}ms - {r.timestamp}
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

- ⚠️ **并发限制**: 设置合理的并发数防止资源耗尽
- 💡 **性能提示**: 对于 I/O 密集型操作，更高的并发更有益；对于 CPU 密集型，匹配 CPU 核心数
- 🔒 **错误处理**: 如果任何任务失败，整个 Promise 立即拒绝；使用 try-catch 处理
- 📚 **最佳实践**: 进行外部 API 调用时使用并发限制以尊重速率限制
- ⚠️ **顺序保留**: 结果按任务顺序返回，与完成顺序无关

## 相关函数

- [`series`](./series) - 顺序执行多个 Promise
- [`map`](./map) - 带并发控制的异步映射
- [`retry`](./retry) - 使用指数退避重试操作
- [`timeout`](./timeout) - 为 Promise 添加超时控制

## 版本历史

- **v0.0.1** - 初始版本
