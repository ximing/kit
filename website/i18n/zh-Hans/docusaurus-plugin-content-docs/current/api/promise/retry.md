---
id: retry
title: retry
description: '重试函数直到成功或达到最大尝试次数'
---

# `retry`

重试函数直到成功或达到最大尝试次数。这是处理瞬时故障、网络错误和不可靠操作的实用工具，支持自定义重试策略，包括指数退避。

## 语法

```typescript
function retry<T>(
  fn: () => T | Promise<T>,
  options?: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (attempt: number, error: Error) => void;
  },
): Promise<T>;
```

## 参数

| 参数名                | 类型                                      | 必填 | 默认值 | 描述                                           |
| --------------------- | ----------------------------------------- | ---- | ------ | ---------------------------------------------- |
| `fn`                  | `() => T \| Promise<T>`                   | ✅   | -      | 要重试的函数 (可以是异步函数或返回 Promise)    |
| `options`             | `object`                                  | ❌   | -      | 重试行为的配置选项                             |
| `options.maxAttempts` | `number`                                  | ❌   | `3`    | 放弃前的最大尝试次数                           |
| `options.delay`       | `number`                                  | ❌   | `1000` | 尝试之间的延迟 (毫秒)                          |
| `options.backoff`     | `number`                                  | ❌   | `1`    | 指数退避的乘数 (1 = 无退避, 2 = 指数退避)      |
| `options.onRetry`     | `(attempt: number, error: Error) => void` | ❌   | -      | 在每次重试时调用的回调函数，接收尝试次数和错误 |

## 返回值

- **类型**: `Promise<T>`
- **描述**: 如果成功，返回一个 Promise 解决为函数结果；如果所有尝试都失败，则拒绝最后一个错误。

## 示例

### 基础用法

```typescript
import { retry } from '@rabjs/kit';

// 示例1: 使用默认设置的简单重试
const data = await retry(() => fetchData());
console.log(data); // 成功获取的数据

// 示例2: 自定义最大尝试次数的重试
const result = await retry(() => fetchAPI(), { maxAttempts: 5 });
console.log(result); // API 响应 (最多 5 次尝试)
```

### 高级用法

```typescript
// 示例3: 指数退避策略
const data = await retry(() => fetchData(), {
  maxAttempts: 5,
  delay: 1000,
  backoff: 2, // 1000ms, 2000ms, 4000ms, 8000ms
  onRetry: (attempt, error) => {
    console.log(`第 ${attempt} 次尝试失败: ${error.message}`);
  },
});

// 示例4: 使用异步函数
const user = await retry(
  async () => {
    const response = await fetch('/api/user');
    if (!response.ok) throw new Error('获取用户失败');
    return response.json();
  },
  { maxAttempts: 3, delay: 500 },
);
```

### 实际应用场景

```typescript
// 示例5: 数据库连接重试
async function connectToDatabase() {
  return retry(() => db.connect(), {
    maxAttempts: 5,
    delay: 2000,
    backoff: 1.5,
    onRetry: (attempt, error) => {
      console.warn(`数据库连接第 ${attempt} 次尝试失败: ${error.message}`);
    },
  });
}

// 示例6: 智能重试的 API 调用
async function fetchUserWithRetry(userId: string) {
  return retry(
    async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (response.status === 429) {
        throw new Error('速率限制 - 将重试');
      }
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
    {
      maxAttempts: 4,
      delay: 1000,
      backoff: 2,
      onRetry: (attempt, error) => {
        logger.info(`第 ${attempt} 次重试: ${error.message}`);
      },
    },
  );
}

// 示例7: 批量操作的重试
async function processBatchWithRetry(items: any[], processor: (item: any) => Promise<void>) {
  for (const item of items) {
    try {
      await retry(() => processor(item), {
        maxAttempts: 3,
        delay: 500,
      });
    } catch (error) {
      console.error(`处理项目失败 (已重试):`, error);
      // 适当处理失败
    }
  }
}
```

## 交互式示例

```tsx live
function RetryExample() {
  const [attempts, setAttempts] = React.useState(3);
  const [delay, setDelay] = React.useState(500);
  const [backoff, setBackoff] = React.useState(1);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRetry = async () => {
    setLoading(true);
    setResult(null);

    let attemptCount = 0;
    const logs = [];

    try {
      const result = await retry(
        () => {
          attemptCount++;
          // 模拟随机失败 (前 2 次尝试有 60% 的失败概率)
          if (attemptCount <= 2 && Math.random() < 0.6) {
            throw new Error(`第 ${attemptCount} 次尝试模拟失败`);
          }
          return `第 ${attemptCount} 次尝试成功!`;
        },
        {
          maxAttempts: attempts,
          delay: delay,
          backoff: backoff,
          onRetry: (attempt, error) => {
            logs.push(`第 ${attempt} 次尝试失败: ${error.message}`);
          },
        },
      );

      setResult({
        success: true,
        message: result,
        logs: logs,
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
        logs: logs,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>retry 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>最大尝试次数: </label>
          <input
            type="number"
            value={attempts}
            onChange={(e) => setAttempts(Math.max(1, Number(e.target.value)))}
            min="1"
            max="10"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>延迟 (毫秒): </label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Math.max(0, Number(e.target.value)))}
            min="0"
            step="100"
            style={{ width: '80px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>退避乘数: </label>
          <input
            type="number"
            value={backoff}
            onChange={(e) => setBackoff(Math.max(1, Number(e.target.value)))}
            min="1"
            step="0.5"
            style={{ width: '80px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
      </div>
      <button
        onClick={handleRetry}
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
        {loading ? '重试中...' : '开始重试'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>结果:</strong>
            <div style={{ color: result.success ? 'green' : 'red', marginTop: '5px' }}>{result.message}</div>
          </div>
          {result.logs.length > 0 && (
            <div>
              <strong>重试日志:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {result.logs.map((log, idx) => (
                  <li key={idx} style={{ fontSize: '12px', color: '#666' }}>
                    {log}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- ⚠️ **指数退避**: 使用 `backoff: 2` 和 `delay: 1000` 时，重试延迟为: 1000ms, 2000ms, 4000ms, 8000ms
- 💡 **性能提示**: 对于外部 API 调用，使用指数退避以避免过度请求服务器
- 🔒 **错误处理**: 如果所有尝试都失败，函数将拒绝最后一个错误
- 📚 **最佳实践**: 实现 `onRetry` 回调以记录重试尝试，方便调试
- ⚠️ **警告**: 小心使用退避乘数 - 大量尝试时可能导致非常长的延迟

## 相关函数

- [`timeout`](./timeout) - 为 Promise 添加超时控制
- [`parallel`](./parallel) - 并发执行多个 Promise
- [`series`](./series) - 顺序执行多个 Promise
- [`map`](./map) - 带并发控制的异步映射

## 版本历史

- **v0.0.1** - 初始版本
