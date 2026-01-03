---
id: filter
title: filter
description: '遍历数组并返回一个 Promise，解决为通过谓词测试的元素数组'
---

# `filter`

遍历数组并返回一个 Promise，解决为通过谓词测试的元素数组。支持并发限制，用于控制异步过滤操作。

## 语法

```typescript
function filter<T>(
  array: T[],
  predicate: (value: T, index: number) => Promise<boolean> | boolean,
  concurrency?: number,
): Promise<T[]>;
```

## 参数

| 参数名        | 类型                                                       | 必填 | 默认值     | 描述                                          |
| ------------- | ---------------------------------------------------------- | ---- | ---------- | --------------------------------------------- |
| `array`       | `T[]`                                                      | ✅   | -          | 要遍历的数组                                  |
| `predicate`   | `(value: T, index: number) => Promise<boolean> \| boolean` | ✅   | -          | 测试每个元素的函数 (可以是异步或返回 Promise) |
| `concurrency` | `number`                                                   | ❌   | `Infinity` | 最大并发操作数                                |

## 返回值

- **类型**: `Promise<T[]>`
- **描述**: 返回一个 Promise，解决为通过谓词测试的元素数组，顺序与输入数组相同。如果任何谓词失败，Promise 立即拒绝。

## 示例

### 基础用法

```typescript
import { filter } from '@rabjs/kit';

// 示例1: 简单过滤
const numbers = [1, 2, 3, 4, 5];
const evens = await filter(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4]

// 示例2: 带并发控制的异步过滤
const userIds = [1, 2, 3, 4, 5];
const activeUsers = await filter(
  userIds,
  (id) => checkUserActive(id),
  2, // 最多 2 个并发检查
);
console.log(activeUsers); // [1, 3, 5] (假设这些是活跃的)
```

### 高级用法

```typescript
// 示例3: 在谓词中使用索引
const items = ['apple', 'banana', 'orange', 'grape'];
const longNames = await filter(items, (item, index) => item.length > 5);

// 示例4: 复杂的异步验证
const users = await filter(
  userIds,
  async (id) => {
    const user = await fetchUser(id);
    return user.status === 'active' && user.verified;
  },
  3,
);

// 示例5: 带副作用的过滤
const validated = await filter(
  records,
  async (record) => {
    try {
      await validateRecord(record);
      return true;
    } catch (error) {
      logError(record.id, error);
      return false;
    }
  },
  5,
);
```

### 实际应用场景

```typescript
// 示例6: 过滤有效的电子邮件地址
async function filterValidEmails(emails: string[]) {
  return filter(
    emails,
    async (email) => {
      try {
        const result = await verifyEmail(email);
        return result.isValid;
      } catch {
        return false;
      }
    },
    5, // 最多 5 个并发电子邮件验证
  );
}

// 示例7: 过滤可访问的 URL
async function filterAccessibleUrls(urls: string[]) {
  return filter(
    urls,
    async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
        return response.ok;
      } catch {
        return false;
      }
    },
    3,
  );
}

// 示例8: 数据库查询过滤
async function filterByDatabaseCriteria(ids: number[], criteria: any) {
  return filter(
    ids,
    async (id) => {
      const record = await db.findById(id);
      return record && matchesCriteria(record, criteria);
    },
    10, // 数据库查询的批量大小
  );
}

// 示例9: 基于权限的过滤
async function filterAccessibleResources(resourceIds: string[], userId: string) {
  return filter(
    resourceIds,
    async (resourceId) => {
      const hasAccess = await checkUserAccess(userId, resourceId);
      return hasAccess;
    },
    5,
  );
}

// 示例10: 图像验证过滤
async function filterValidImages(imagePaths: string[]) {
  return filter(
    imagePaths,
    async (path) => {
      try {
        const image = await loadImage(path);
        return image.width >= 800 && image.height >= 600;
      } catch {
        return false;
      }
    },
    3, // 最多 3 个并发图像加载
  );
}

// 示例11: 带重试的 API 响应过滤
async function filterWithRetry(items: any[], predicate: (item: any) => Promise<boolean>) {
  return filter(
    items,
    async (item) => {
      for (let i = 0; i < 3; i++) {
        try {
          return await predicate(item);
        } catch (error) {
          if (i === 2) return false;
          await new Promise((r) => setTimeout(r, 100 * (i + 1)));
        }
      }
      return false;
    },
    3,
  );
}
```

## 交互式示例

```tsx live
function FilterExample() {
  const [itemCount, setItemCount] = React.useState(10);
  const [concurrency, setConcurrency] = React.useState(3);
  const [threshold, setThreshold] = React.useState(50);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    const items = Array.from({ length: itemCount }, (_, i) => ({
      id: i + 1,
      value: Math.random() * 100,
    }));

    try {
      const startTime = Date.now();
      const filtered = await filter(
        items,
        (item) => {
          // 模拟异步操作
          return new Promise((resolve) => {
            setTimeout(
              () => {
                resolve(item.value >= threshold);
              },
              Math.random() * 500 + 100,
            );
          });
        },
        concurrency,
      );
      const duration = Date.now() - startTime;

      setResult({
        success: true,
        duration,
        original: items,
        filtered,
        stats: {
          totalItems: items.length,
          filteredCount: filtered.length,
          concurrency,
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
      <h4>filter 交互式示例</h4>
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
        <div style={{ marginBottom: '10px' }}>
          <label>阈值: </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            min="0"
            max="100"
            style={{ width: '60px', padding: '5px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>(保留值 ≥ {threshold})</span>
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
        {loading ? '过滤中...' : '执行过滤'}
      </button>
      {result && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
          {result.success ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>过滤统计:</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <div>总项目数: {result.stats.totalItems}</div>
                  <div>过滤后数量: {result.stats.filteredCount}</div>
                  <div>并发数: {result.stats.concurrency}</div>
                  <div>总耗时: {result.stats.totalTime}ms</div>
                </div>
              </div>
              <div>
                <strong>过滤结果:</strong>
                <div style={{ fontSize: '12px', marginTop: '5px', maxHeight: '200px', overflow: 'auto' }}>
                  {result.filtered.length > 0 ? (
                    result.filtered.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ padding: '4px', background: '#f9f9f9', marginBottom: '4px', borderRadius: '2px' }}
                      >
                        ID {item.id}: {item.value.toFixed(2)}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#999' }}>没有项目符合条件</div>
                  )}
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
- 💡 **性能提示**: 对于异步谓词，3-5 的并发数通常是最优的
- 🔒 **错误处理**: 如果任何谓词失败，整个 Promise 拒绝；使用 try-catch
- 📚 **最佳实践**: 使用并发限制以尊重 API 速率限制和防止资源耗尽
- ⚠️ **顺序保留**: 结果按输入项的顺序返回

## 相关函数

- [`map`](./map) - 带并发控制的异步映射
- [`parallel`](./parallel) - 并发执行多个 Promise
- [`series`](./series) - 顺序执行任务
- [`reduce`](./reduce) - 异步归约操作

## 版本历史

- **v1.0.0** - 初始版本
