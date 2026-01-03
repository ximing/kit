---
id: throttle
title: throttle
description: '创建一个节流函数，每个等待时间间隔内最多调用一次原函数'
---

# `throttle`

创建一个节流函数，每个等待时间间隔内最多调用一次原函数。与防抖不同，节流会以固定间隔执行函数。这对于控制连续高频事件（如滚动或鼠标移动）期间的函数执行速率很有用。

## 语法

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait?: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  },
): T & { cancel: () => void; flush: () => void };
```

## 参数

| 参数名             | 类型                                | 必填 | 默认值 | 描述                 |
| ------------------ | ----------------------------------- | ---- | ------ | -------------------- |
| `func`             | `T extends (...args: any[]) => any` | ✅   | -      | 要节流的函数         |
| `wait`             | `number`                            | ❌   | `0`    | 节流调用的毫秒数     |
| `options`          | `object`                            | ❌   | `{}`   | 配置选项             |
| `options.leading`  | `boolean`                           | ❌   | `true` | 是否在超时的前沿调用 |
| `options.trailing` | `boolean`                           | ❌   | `true` | 是否在超时的后沿调用 |

## 返回值

- **类型**: `T & { cancel: () => void; flush: () => void }`
- **描述**: 返回节流后的函数，带有 `cancel()` 和 `flush()` 方法。`cancel()` 方法取消待定的调用，`flush()` 立即调用待定的函数。

## 示例

### 基础用法

```typescript
import { throttle } from '@rabjs/kit';

// 示例1: 节流滚动事件
const handleScroll = throttle(() => {
  console.log('检测到滚动事件');
}, 1000);

// 模拟快速滚动事件
handleScroll(); // 立即输出（前沿）
handleScroll(); // 被忽略
handleScroll(); // 被忽略
// 1秒后: 再次输出（后沿）

// 示例2: 节流鼠标移动
const handleMouseMove = throttle((x: number, y: number) => {
  console.log(`鼠标位置: ${x}, ${y}`);
}, 500);

handleMouseMove(100, 200); // 立即输出
handleMouseMove(101, 201); // 被忽略
handleMouseMove(102, 202); // 被忽略
// 500ms 后: 输出最新坐标
```

### 高级用法

```typescript
// 示例3: 没有前沿的节流
const handleResize = throttle(
  () => {
    console.log('窗口已调整大小');
  },
  300,
  { leading: false, trailing: true },
);

handleResize(); // 等待 300ms 后输出
handleResize(); // 被忽略
// 300ms 后: 输出 '窗口已调整大小'

// 示例4: 使用 cancel 和 flush 方法
const throttledClick = throttle(() => {
  console.log('按钮被点击');
}, 2000);

throttledClick(); // 立即输出
throttledClick(); // 被忽略
throttledClick(); // 被忽略

// 取消待定的调用
throttledClick.cancel();
// 不会有额外的输出

// 或立即执行
throttledClick();
throttledClick.flush(); // 立即输出
```

### 实际应用场景

```typescript
// 示例5: 无限滚动加载
function InfiniteScroll() {
  let page = 1;

  const loadMoreContent = throttle(async () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 接近底部时加载更多
    if (scrollTop + windowHeight >= documentHeight - 500) {
      console.log(`加载第 ${page} 页`);
      try {
        const response = await fetch(`/api/items?page=${page}`);
        const data = await response.json();
        page++;
        // 将数据追加到 DOM
        console.log('已加载', data.length, '项');
      } catch (error) {
        console.error('加载失败:', error);
      }
    }
  }, 1000); // 每秒最多检查一次

  window.addEventListener('scroll', loadMoreContent);

  return {
    cleanup: () => {
      window.removeEventListener('scroll', loadMoreContent);
      loadMoreContent.cancel();
    },
  };
}

// 使用示例
const scroller = InfiniteScroll();
// ... 稍后
scroller.cleanup();
```

## 交互式示例

```tsx live
function ThrottleExample() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [callCount, setCallCount] = React.useState(0);
  const [lastCallTime, setLastCallTime] = React.useState('从未');

  const handleMouseMove = React.useMemo(() => {
    return throttle((e) => {
      setPosition({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      setCallCount((prev) => prev + 1);
      setLastCallTime(new Date().toLocaleTimeString());
    }, 500);
  }, []);

  const containerRef = React.useRef(null);

  const handleMouseMoveEvent = (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
      handleMouseMove(e);
    }
  };

  const handleCancel = () => {
    handleMouseMove.cancel();
    setCallCount(0);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveEvent);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveEvent);
      handleMouseMove.cancel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '8px',
        minHeight: '200px',
        border: '2px dashed #ccc',
      }}
    >
      <h4>节流交互式示例</h4>
      <p>在此框中移动鼠标（每 500ms 节流一次）:</p>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>当前位置:</strong> X: {position.x}, Y: {position.y}
      </div>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>函数调用次数:</strong> {callCount}
      </div>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>最后调用时间:</strong> {lastCallTime}
      </div>
      <button onClick={handleCancel} style={{ padding: '5px 10px' }}>
        重置
      </button>
    </div>
  );
}
```

## 注意事项

- ⚠️ **执行频率**: 与防抖不同，节流保证以固定间隔执行。默认情况下，它在前沿和后沿都执行。
- 💡 **性能提示**: 对于连续事件（如滚动、调整大小或鼠标移动），使用节流可以限制函数执行速率，同时保持响应性。
- 🔒 **前沿 vs 后沿**: 设置 `leading: false` 跳过第一次立即调用。设置 `trailing: false` 跳过间隔后的最终调用。
- 🐛 **常见错误**: 混淆节流和防抖。节流定期执行，防抖等待不活动。
- 📚 **最佳实践**: 组件卸载时始终清理事件监听器并调用 `cancel()` 以防止内存泄漏。

## 相关函数

- [`debounce`](./debounce) - 在不活动等待时间后延迟执行
- [`once`](./once) - 限制函数仅执行一次
- [`memoize`](./memoize) - 根据参数缓存函数结果

## 版本历史

- **v0.0.1** - 初始版本
