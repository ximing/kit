---
id: delay
title: delay
description: '返回一个在指定延迟后解决的 Promise，带有可选值'
---

# `delay`

返回一个在指定延迟后解决的 Promise，带有可选值。这是一个简单但有用的实用工具，用于延迟操作、实现超时和控制执行时序。

## 语法

```typescript
function delay<T = void>(ms: number, value?: T): Promise<T | void>;
```

## 参数

| 参数名  | 类型     | 必填 | 默认值      | 描述           |
| ------- | -------- | ---- | ----------- | -------------- |
| `ms`    | `number` | ✅   | -           | 延迟的毫秒数   |
| `value` | `T`      | ❌   | `undefined` | 要解决的可选值 |

## 返回值

- **类型**: `Promise<T | void>`
- **描述**: 返回一个在指定延迟后解决的 Promise。如果提供了值，Promise 解决为该值；否则解决为 `undefined`。

## 示例

### 基础用法

```typescript
import { delay } from '@rabjs/kit';

// 示例1: 简单延迟
await delay(1000);
console.log('1 秒已过去');

// 示例2: 带返回值的延迟
const message = await delay(500, 'Hello');
console.log(message); // 500ms 后输出 'Hello'

// 示例3: 在循环中使用延迟
for (let i = 0; i < 3; i++) {
  console.log(`步骤 ${i}`);
  await delay(1000);
}
```

### 高级用法

```typescript
// 示例4: 使用指数退避重试
async function retryWithBackoff(fn, maxAttempts = 3) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
}

// 示例5: 防抖实现
function debounce(fn, wait) {
  let timeout;
  return async function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

// 示例6: 节流实现
function throttle(fn, limit) {
  let inThrottle;
  return async function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      await delay(limit);
      inThrottle = false;
    }
  };
}
```

### 实际应用场景

```typescript
// 示例7: 速率限制的 API 调用
async function fetchWithRateLimit(urls: string[], delayMs: number = 1000) {
  const results = [];
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    results.push(data);
    await delay(delayMs);
  }
  return results;
}

// 示例8: 轮询直到成功
async function pollUntilSuccess(checkFn, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await checkFn();
    if (result.success) return result;
    if (i < maxAttempts - 1) {
      await delay(1000);
    }
  }
  throw new Error('轮询失败');
}

// 示例9: 逐步执行任务
async function executeTasksGradually(tasks: Array<() => Promise<any>>, delayMs: number = 500) {
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
    if (tasks.indexOf(task) < tasks.length - 1) {
      await delay(delayMs);
    }
  }
  return results;
}

// 示例10: 模拟处理时间
async function simulateProcessing(data: any, processingTime: number = 1000) {
  console.log('处理开始...');
  await delay(processingTime);
  console.log('处理完成!');
  return {
    ...data,
    processedAt: new Date(),
    processingTime,
  };
}

// 示例11: 类似动画的顺序更新
async function animatedUpdate(element: HTMLElement, updates: string[], delayMs: number = 500) {
  for (const update of updates) {
    element.textContent = update;
    await delay(delayMs);
  }
}

// 示例12: 延迟初始化
async function initializeWithDelay(services: any[], delayBetween: number = 100) {
  const initialized = [];
  for (const service of services) {
    await service.init();
    initialized.push(service);
    await delay(delayBetween);
  }
  return initialized;
}
```

## 交互式示例

```tsx live
function DelayExample() {
  const [delayMs, setDelayMs] = React.useState(2000);
  const [value, setValue] = React.useState('Hello');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleDelay = async () => {
    setLoading(true);
    setResult(null);

    try {
      const startTime = Date.now();
      const result = await delay(delayMs, value);
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        value: result,
        duration,
        expectedDuration: delayMs,
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
      <h4>delay 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>延迟 (毫秒): </label>
          <input
            type="number"
            value={delayMs}
            onChange={(e) => setDelayMs(Math.max(0, Number(e.target.value)))}
            min="0"
            step="100"
            style={{ width: '100px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{delayMs}ms</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>返回值: </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '150px', padding: '5px', marginLeft: '10px' }}
          />
        </div>
      </div>
      <button
        onClick={handleDelay}
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
        {loading ? `等待中 ${delayMs}ms...` : '开始延迟'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>返回值:</strong>
                <div style={{ marginTop: '5px', padding: '8px', background: '#f9f9f9', borderRadius: '4px' }}>
                  {result.value === undefined ? '(undefined)' : result.value}
                </div>
              </div>
              <div>
                <strong>时序:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>预期: {result.expectedDuration}ms</div>
                  <div>实际: {result.duration}ms</div>
                  <div style={{ color: result.duration >= result.expectedDuration ? 'green' : 'orange' }}>
                    差异: {result.duration - result.expectedDuration}ms
                  </div>
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

- ⚠️ **时序精度**: JavaScript 定时器不完全精确；实际延迟可能略有不同
- 💡 **性能提示**: 使用延迟进行速率限制和顺序操作，以避免压倒系统
- 🔒 **取消**: 延迟启动后无法取消；使用 `AbortController` 配合超时以取消
- 📚 **最佳实践**: 谨慎使用延迟；尽可能优先使用事件驱动或基于回调的方法
- ⚠️ **内存**: 每个延迟创建一个定时器；过多延迟可能在内存中累积

## 相关函数

- [`timeout`](./timeout) - 为 Promise 添加超时控制
- [`retry`](./retry) - 使用指数退避重试操作
- [`parallel`](./parallel) - 并发执行多个 Promise
- [`series`](./series) - 顺序执行任务

## 版本历史

- **v0.0.1** - 初始版本
