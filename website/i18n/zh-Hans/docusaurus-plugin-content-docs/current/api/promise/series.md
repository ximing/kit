---
id: series
title: series
description: '顺序执行多个 Promise (一个接一个)'
---

# `series`

顺序执行多个 Promise (一个接一个)。这对于具有依赖关系或需要按顺序执行以维持顺序或防止资源冲突的任务很有用。

## 语法

```typescript
function series<T>(tasks: Array<() => Promise<T> | T>): Promise<T[]>;
```

## 参数

| 参数名  | 类型                           | 必填 | 默认值 | 描述                        |
| ------- | ------------------------------ | ---- | ------ | --------------------------- |
| `tasks` | `Array<() => Promise<T> \| T>` | ✅   | -      | 返回 Promise 或值的函数数组 |

## 返回值

- **类型**: `Promise<T[]>`
- **描述**: 返回一个 Promise，解决为结果数组，顺序与任务相同。如果任何任务失败，Promise 立即拒绝该错误。

## 示例

### 基础用法

```typescript
import { series } from '@rabjs/kit';

// 示例1: 顺序执行任务
const results = await series([() => fetchUser(1), () => fetchUser(2), () => fetchUser(3)]);
console.log(results); // [user1, user2, user3]

// 示例2: 具有依赖关系的顺序操作
const results = await series([() => createDatabase(), () => initializeTables(), () => seedData()]);
```

### 高级用法

```typescript
// 示例3: 构建依赖操作链
async function setupApplication() {
  return series([() => connectToDatabase(), () => loadConfiguration(), () => initializeCache(), () => startServer()]);
}

// 示例4: 带状态累积的处理
let state = { step: 0 };
const results = await series([
  () => {
    state.step = 1;
    return '步骤 1 完成';
  },
  () => {
    state.step = 2;
    return '步骤 2 完成';
  },
  () => {
    state.step = 3;
    return '步骤 3 完成';
  },
]);
```

### 实际应用场景

```typescript
// 示例5: 数据库迁移工作流
async function runMigrations() {
  return series([
    () => db.createTable('users'),
    () => db.createTable('posts'),
    () => db.createTable('comments'),
    () => db.createIndex('users', 'email'),
    () => db.createIndex('posts', 'user_id'),
    () => db.seedData('users', initialUsers),
  ]);
}

// 示例6: 多步骤身份验证流程
async function authenticateUser(credentials: any) {
  return series([
    () => validateCredentials(credentials),
    () => lookupUser(credentials.email),
    () => verifyPassword(credentials.password),
    () => generateToken(),
    () => updateLastLogin(),
  ]);
}

// 示例7: 带顺序步骤的数据处理管道
async function processDataFile(filePath: string) {
  return series([
    () => readFile(filePath),
    () => parseData(),
    () => validateData(),
    () => transformData(),
    () => saveToDatabase(),
    () => generateReport(),
  ]);
}

// 示例8: API 同步工作流
async function syncExternalAPI() {
  return series([
    () => fetchRemoteData(),
    () => compareWithLocal(),
    () => identifyChanges(),
    () => updateLocalDatabase(),
    () => notifySubscribers(),
    () => logSyncEvent(),
  ]);
}

// 示例9: 顺序批量操作
async function processBatchSequentially(batches: any[][]) {
  return series(batches.map((batch) => () => Promise.all(batch.map((item) => processItem(item)))));
}

// 示例10: 以相反顺序清理和拆卸
async function setupAndTeardown() {
  const resources = [];

  try {
    const results = await series([
      () => acquireResource('database').then((r) => (resources.push(r), r)),
      () => acquireResource('cache').then((r) => (resources.push(r), r)),
      () => acquireResource('logger').then((r) => (resources.push(r), r)),
      () => runMainTask(resources),
    ]);
    return results;
  } finally {
    // 以相反顺序清理
    await series(resources.reverse().map((resource) => () => resource.release()));
  }
}
```

## 交互式示例

```tsx live
function SeriesExample() {
  const [taskCount, setTaskCount] = React.useState(4);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const tasks = Array.from({ length: taskCount }, (_, i) => () => {
      const delay = Math.random() * 1000 + 300;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            taskId: i + 1,
            delay: Math.round(delay),
            timestamp: new Date().toLocaleTimeString(),
          });
        }, delay);
      });
    });

    try {
      const startTime = Date.now();
      const results = await series(tasks);
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        results,
        stats: {
          taskCount,
          totalTime: duration,
          avgTime: Math.round(duration / taskCount),
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
      <h4>series 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>任务数: </label>
          <input
            type="number"
            value={taskCount}
            onChange={(e) => setTaskCount(Math.max(1, Number(e.target.value)))}
            min="1"
            max="10"
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
        {loading ? '执行中...' : '执行系列'}
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
                  <div>每个任务平均: {result.stats.avgTime}ms</div>
                </div>
              </div>
              <div>
                <strong>结果 (顺序执行):</strong>
                <div style={{ fontSize: '12px', marginTop: '5px', maxHeight: '200px', overflow: 'auto' }}>
                  {result.results.map((r, idx) => (
                    <div
                      key={idx}
                      style={{ padding: '4px', background: '#f9f9f9', marginBottom: '4px', borderRadius: '2px' }}
                    >
                      任务 {r.taskId}: {r.delay}ms - {r.timestamp}
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

- ⚠️ **顺序执行**: 任务一个接一个执行；总时间是所有任务时间的总和
- 💡 **性能提示**: 对于独立任务，使用 `parallel` 以提高性能
- 🔒 **错误处理**: 如果任何任务失败，整个 Promise 拒绝；使用 try-catch
- 📚 **最佳实践**: 对于具有依赖关系或顺序重要的任务，使用 series
- ⚠️ **资源管理**: Series 执行较慢，但对于资源受限的操作更安全

## 相关函数

- [`parallel`](./parallel) - 并发执行多个 Promise
- [`map`](./map) - 带并发控制的异步映射
- [`filter`](./filter) - 带并发控制的异步过滤
- [`reduce`](./reduce) - 异步归约操作

## 版本历史

- **v0.0.1** - 初始版本
