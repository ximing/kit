---
id: debounce
title: debounce
description: '创建一个防抖函数，在最后一次调用后等待指定时间后才执行原函数'
---

# `debounce`

创建一个防抖函数，在最后一次调用后等待指定时间后才执行原函数。当等待时间内再次调用时，计时器会重置。这常用于处理高频事件，如窗口调整大小、输入框变化或用户交互期间的 API 请求。

## 语法

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait?: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  },
): T & { cancel: () => void; flush: () => void };
```

## 参数

| 参数名             | 类型                                | 必填 | 默认值      | 描述                       |
| ------------------ | ----------------------------------- | ---- | ----------- | -------------------------- |
| `func`             | `T extends (...args: any[]) => any` | ✅   | -           | 要防抖的函数               |
| `wait`             | `number`                            | ❌   | `0`         | 延迟执行的毫秒数           |
| `options`          | `object`                            | ❌   | `{}`        | 配置选项                   |
| `options.leading`  | `boolean`                           | ❌   | `false`     | 是否在超时的前沿调用       |
| `options.trailing` | `boolean`                           | ❌   | `true`      | 是否在超时的后沿调用       |
| `options.maxWait`  | `number`                            | ❌   | `undefined` | 允许延迟的最大时间（毫秒） |

## 返回值

- **类型**: `T & { cancel: () => void; flush: () => void }`
- **描述**: 返回防抖后的函数，带有 `cancel()` 和 `flush()` 方法。`cancel()` 方法取消待定的调用，`flush()` 立即调用待定的函数。

## 示例

### 基础用法

```typescript
import { debounce } from '@rabjs/kit';

// 示例1: 简单的防抖，使用默认选项
const logMessage = debounce(() => {
  console.log('用户停止输入');
}, 500);

// 模拟用户输入
logMessage(); // 计时器启动
logMessage(); // 计时器重置
logMessage(); // 计时器重置
// 500ms 后: 输出 '用户停止输入'

// 示例2: 搜索输入防抖
const search = debounce((query: string) => {
  console.log(`搜索: ${query}`);
  // 在这里发起 API 请求
}, 300);

search('java'); // 计时器启动
search('javas'); // 计时器重置
search('javascri'); // 计时器重置
search('javascript'); // 计时器重置
// 300ms 后: 输出 '搜索: javascript'
```

### 高级用法

```typescript
// 示例3: 在前沿和后沿都调用的防抖
const handleWindowResize = debounce(
  () => {
    console.log('窗口已调整大小');
  },
  250,
  { leading: true, trailing: true },
);

handleWindowResize(); // 立即输出（前沿）
handleWindowResize(); // 计时器重置
// 250ms 后: 再次输出（后沿）

// 示例4: 使用 cancel 和 flush 方法
const debouncedSave = debounce((data: any) => {
  console.log('保存:', data);
}, 1000);

debouncedSave({ name: '张三' });
debouncedSave({ name: '李四' });

// 取消待定的调用
debouncedSave.cancel();
// 不会保存任何数据

// 或立即执行
debouncedSave({ name: '王五' });
debouncedSave.flush(); // 立即保存: '保存: { name: "王五" }'
```

### 实际应用场景

```typescript
// 示例5: 带防抖的表单自动保存
function AutoSaveForm() {
  const saveForm = debounce(
    async (formData: Record<string, any>) => {
      try {
        const response = await fetch('/api/save', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        console.log('表单保存成功');
      } catch (error) {
        console.error('表单保存失败:', error);
      }
    },
    1500,
    { maxWait: 5000 },
  ); // 1.5s 或最多 5s 后自动保存

  const handleInputChange = (field: string, value: any) => {
    const formData = { [field]: value };
    saveForm(formData);
  };

  return {
    handleInputChange,
    cancelSave: () => saveForm.cancel(),
    forceSave: () => saveForm.flush(),
  };
}

// 使用示例
const form = AutoSaveForm();
form.handleInputChange('email', 'user@example.com');
form.handleInputChange('email', 'user@example.com'); // 重置计时器
// 1.5s 后: 保存表单
```

## 交互式示例

```tsx live
function DebounceExample() {
  const [input, setInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState('');
  const [callCount, setCallCount] = React.useState(0);

  const handleSearch = React.useMemo(() => {
    return debounce((query) => {
      setSearchResults(`搜索: "${query}"`);
      setCallCount((prev) => prev + 1);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    handleSearch(value);
  };

  const handleCancel = () => {
    handleSearch.cancel();
    setSearchResults('搜索已取消');
  };

  const handleFlush = () => {
    handleSearch.flush();
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>防抖交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入搜索内容 (500ms 后执行):</label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="输入内容..."
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleCancel} style={{ marginRight: '10px', padding: '5px 10px' }}>
          取消
        </button>
        <button onClick={handleFlush} style={{ padding: '5px 10px' }}>
          立即执行
        </button>
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>结果:</strong> {searchResults}
      </div>
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>函数调用次数: {callCount} 次</div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **计时机制**: 每次调用防抖函数时，计时器都会重置。只有当函数在指定的 `wait` 时间内没有被调用时，才会执行。
- 💡 **性能提示**: 对于高频事件（如滚动、调整大小或输入变化），使用防抖可以减少不必要的函数调用，提高性能。
- 🔒 **前沿 vs 后沿**: 设置 `leading: true` 在第一次调用时立即执行，然后等待。设置 `trailing: true`（默认）在等待期后执行。
- 🐛 **常见错误**: 忘记使用返回的防抖函数而不是原始函数。始终使用 `debounce()` 的结果。
- 📚 **最佳实践**: 组件卸载时始终调用 `cancel()` 以防止内存泄漏和意外调用。

## 相关函数

- [`throttle`](./throttle) - 与防抖类似，但每个等待间隔最多调用一次
- [`once`](./once) - 限制函数仅执行一次
- [`memoize`](./memoize) - 根据参数缓存函数结果

## 版本历史

- **v1.0.0** - 初始版本
