---
id: timeout
title: timeout
description: '返回一个 Promise，如果给定的 Promise 未在指定时间内解决，则拒绝'
---

# `timeout`

返回一个 Promise，如果给定的 Promise 未在指定时间内解决，则拒绝。这是控制 Promise 执行时间和防止操作无限期挂起的实用工具。

## 语法

```typescript
function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>;
```

## 参数

| 参数名    | 类型         | 必填 | 默认值              | 描述                   |
| --------- | ------------ | ---- | ------------------- | ---------------------- |
| `promise` | `Promise<T>` | ✅   | -                   | 要用超时包装的 Promise |
| `ms`      | `number`     | ✅   | -                   | 超时时长 (毫秒)        |
| `message` | `string`     | ❌   | `'Promise timeout'` | 超时时使用的错误消息   |

## 返回值

- **类型**: `Promise<T>`
- **描述**: 返回一个 Promise，根据原始 Promise 或超时而解决或拒绝。如果在 Promise 解决之前达到超时，则以超时错误拒绝。

## 示例

### 基础用法

```typescript
import { timeout } from '@rabjs/kit';

// 示例1: 使用默认消息的简单超时
try {
  const result = await timeout(fetchData(), 5000);
  console.log(result); // 5 秒内获取的数据
} catch (error) {
  console.error(error.message); // 'Promise timeout'
}

// 示例2: 自定义错误消息的超时
try {
  const response = await timeout(fetchAPI(), 3000, 'API 请求耗时过长');
  console.log(response); // API 响应
} catch (error) {
  console.error(error.message); // 'API 请求耗时过长'
}
```

### 高级用法

```typescript
// 示例3: 多个操作的超时
async function fetchWithTimeout(url: string, timeoutMs: number = 5000) {
  try {
    const response = await timeout(fetch(url), timeoutMs, `对 ${url} 的请求超时`);
    return await response.json();
  } catch (error) {
    if (error.message.includes('超时')) {
      console.warn('请求超时，使用缓存数据...');
      return getCachedData(url);
    }
    throw error;
  }
}

// 示例4: 组合多个超时
const [user, posts, comments] = await Promise.all([
  timeout(fetchUser(userId), 3000, '用户获取超时'),
  timeout(fetchPosts(userId), 3000, '文章获取超时'),
  timeout(fetchComments(userId), 3000, '评论获取超时'),
]);
```

### 实际应用场景

```typescript
// 示例5: 数据库查询超时
async function queryWithTimeout(query: string, timeoutMs: number = 10000) {
  return timeout(db.query(query), timeoutMs, `数据库查询超过 ${timeoutMs}ms 超时`);
}

// 示例6: 文件上传超时
async function uploadFileWithTimeout(file: File, uploadUrl: string) {
  const formData = new FormData();
  formData.append('file', file);

  return timeout(
    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    }),
    30000, // 文件上传 30 秒超时
    '文件上传超时',
  );
}

// 示例7: 级联超时以提高可靠性
async function reliableFetch(url: string, retries: number = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await timeout(
        fetch(url),
        5000 + i * 1000, // 每次重试增加超时时间
        `第 ${i + 1} 次尝试在 ${5000 + i * 1000}ms 后超时`,
      );
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// 示例8: 带清理的超时
async function operationWithCleanup(operation: Promise<any>) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('操作超时')), 5000);
  });

  try {
    return await timeout(operation, 5000, '操作超过时间限制');
  } finally {
    // 清理逻辑
    console.log('操作清理完成');
  }
}
```

## 交互式示例

```tsx live
function TimeoutExample() {
  const [duration, setDuration] = React.useState(3000);
  const [operationTime, setOperationTime] = React.useState(2000);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);

    // 创建模拟操作
    const operation = new Promise((resolve) => {
      setTimeout(() => {
        resolve(`操作在 ${operationTime}ms 后完成`);
      }, operationTime);
    });

    try {
      const result = await timeout(operation, duration, `超时超过: ${duration}ms`);
      setResult({
        success: true,
        message: result,
        status: '操作成功完成',
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
        status: '操作超时',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>timeout 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>超时时长 (毫秒): </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Math.max(100, Number(e.target.value)))}
            min="100"
            step="100"
            style={{ width: '100px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{duration}ms</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>操作时长 (毫秒): </label>
          <input
            type="number"
            value={operationTime}
            onChange={(e) => setOperationTime(Math.max(100, Number(e.target.value)))}
            min="100"
            step="100"
            style={{ width: '100px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{operationTime}ms</span>
        </div>
      </div>
      <div style={{ marginBottom: '15px', fontSize: '12px', color: '#666' }}>
        <div>
          {operationTime <= duration ? (
            <span style={{ color: 'green' }}>✓ 操作将在超时前完成</span>
          ) : (
            <span style={{ color: 'red' }}>✗ 操作将超时</span>
          )}
        </div>
      </div>
      <button
        onClick={handleTest}
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
        {loading ? '运行中...' : '测试超时'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          <div style={{ marginBottom: '5px' }}>
            <strong>状态:</strong>
            <span
              style={{
                marginLeft: '10px',
                color: result.success ? 'green' : 'red',
              }}
            >
              {result.status}
            </span>
          </div>
          <div>
            <strong>消息:</strong>
            <div
              style={{ marginTop: '5px', padding: '8px', background: '#f9f9f9', borderRadius: '4px', fontSize: '12px' }}
            >
              {result.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 注意事项

- ⚠️ **原始 Promise**: 即使达到超时，原始 Promise 仍会继续执行；如需清理，使用清理逻辑
- 💡 **性能提示**: 根据预期操作时长设置合理的超时时间，以捕捉挂起的操作
- 🔒 **错误处理**: 超时错误可通过其消息与其他错误区分
- 📚 **最佳实践**: 使用自定义错误消息以识别哪个操作超时
- ⚠️ **资源管理**: 注意原始 Promise 在超时后可能仍消耗资源

## 相关函数

- [`retry`](./retry) - 使用指数退避重试操作
- [`parallel`](./parallel) - 并发执行多个 Promise
- [`series`](./series) - 顺序执行多个 Promise
- [`delay`](./delay) - 延迟 Promise 解决

## 版本历史

- **v1.0.0** - 初始版本
