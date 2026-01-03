---
id: format
title: format
description: '按照给定的格式字符串格式化日期，支持多种 token'
---

# `format`

按照给定的格式字符串格式化日期。该函数支持多种格式 token（YYYY、MM、DD、HH、mm、ss、SSS）来自定义日期输出，用于展示目的。

## 语法

```typescript
function format(date: Date, formatStr?: string): string;
```

## 参数

| 参数名      | 类型     | 必填 | 默认值                  | 描述                                                                                            |
| ----------- | -------- | ---- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `date`      | `Date`   | ✅   | -                       | 要格式化的日期对象                                                                              |
| `formatStr` | `string` | ❌   | `'YYYY-MM-DD HH:mm:ss'` | 格式字符串，支持的token: YYYY (年), MM (月), DD (日), HH (小时), mm (分钟), ss (秒), SSS (毫秒) |

## 返回值

- **类型**: `string`
- **描述**: 格式化后的日期字符串。如果输入日期无效，返回空字符串。

## 支持的格式 Token

| Token  | 说明              | 示例          |
| ------ | ----------------- | ------------- |
| `YYYY` | 4位年份           | 2024          |
| `MM`   | 2位月份 (01-12)   | 01, 12        |
| `DD`   | 2位日期 (01-31)   | 01, 15, 31    |
| `HH`   | 2位小时 (00-23)   | 00, 14, 23    |
| `mm`   | 2位分钟 (00-59)   | 00, 30, 59    |
| `ss`   | 2位秒 (00-59)     | 00, 45, 59    |
| `SSS`  | 3位毫秒 (000-999) | 000, 123, 999 |

## 示例

### 基础用法

```typescript
import { format } from '@rabjs/kit';

// 示例1: 默认格式
const date = new Date('2024-01-15T14:30:45.123Z');
console.log(format(date));
// => '2024-01-15 14:30:45'

// 示例2: 自定义日期格式
console.log(format(date, 'YYYY/MM/DD'));
// => '2024/01/15'

// 示例3: 自定义时间格式
console.log(format(date, 'HH:mm:ss'));
// => '14:30:45'
```

### 高级用法

```typescript
// 示例4: 多种格式组合
const date = new Date('2024-01-15T14:30:45.123Z');

console.log(format(date, 'DD-MM-YYYY'));
// => '15-01-2024'

console.log(format(date, 'YYYY年MM月DD日 HH:mm:ss'));
// => '2024年01月15日 14:30:45'

console.log(format(date, 'MM/DD/YYYY HH:mm'));
// => '01/15/2024 14:30'

// 示例5: 包含毫秒的完整格式
console.log(format(date, 'YYYY-MM-DD HH:mm:ss.SSS'));
// => '2024-01-15 14:30:45.123'
```

### 实际应用场景

```typescript
// 示例6: 日志记录
function logEvent(eventName: string) {
  const timestamp = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(`[${timestamp}] 事件: ${eventName}`);
}

logEvent('用户登录');
// => '[2024-01-15 14:30:45] 事件: 用户登录'

// 示例7: 数据导出
function exportData(records: any[]) {
  const exportDate = format(new Date(), 'YYYY-MM-DD');
  const filename = `export_${exportDate}.csv`;
  return { filename, records };
}

// 示例8: 显示友好的日期时间
function formatEventTime(date: Date) {
  return {
    date: format(date, 'YYYY-MM-DD'),
    time: format(date, 'HH:mm:ss'),
    datetime: format(date, 'YYYY-MM-DD HH:mm:ss'),
  };
}

const eventTime = formatEventTime(new Date('2024-01-15T14:30:45.123Z'));
console.log(eventTime);
// => {
//   date: '2024-01-15',
//   time: '14:30:45',
//   datetime: '2024-01-15 14:30:45'
// }
```

## 交互式示例

```tsx live
function FormatExample() {
  const [formatStr, setFormatStr] = React.useState('YYYY-MM-DD HH:mm:ss');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    try {
      const formatted = format(new Date(), formatStr);
      setResult(formatted);
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  }, [formatStr]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>format 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>格式字符串:</label>
        <input
          type="text"
          value={formatStr}
          onChange={(e) => setFormatStr(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          placeholder="例如: YYYY-MM-DD HH:mm:ss"
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>当前日期:</strong>
        <div style={{ background: 'white', padding: '10px', marginTop: '5px', borderRadius: '4px' }}>
          {new Date().toString()}
        </div>
      </div>
      <div>
        <strong>格式化结果:</strong>
        <div
          style={{
            background: 'white',
            padding: '10px',
            marginTop: '5px',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: '#2563eb',
          }}
        >
          {result}
        </div>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <strong>支持的 Token:</strong> YYYY (年), MM (月), DD (日), HH (小时), mm (分钟), ss (秒), SSS (毫秒)
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果输入不是有效的 Date 对象，返回空字符串
- ⚠️ **边界情况**: 如果输入是 NaN 日期，返回空字符串
- 💡 **Token 区分**: `mm` 表示分钟，`MM` 表示月份，两者不可混淆
- 💡 **Token 区分**: `ss` 表示秒，`SS` 不是有效 token
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 使用标准格式 `YYYY-MM-DD HH:mm:ss` 存储日期，便于数据交换

## 相关函数

- [`parse`](./parse) - 解析字符串为日期对象
- [`startOfDay`](./startOfDay) - 获取当天开始时间
- [`endOfDay`](./endOfDay) - 获取当天结束时间
- [`addDays`](./addDays) - 增加天数
- [`diffDays`](./diffDays) - 计算天数差

## 版本历史

- **v0.0.1** - 初始版本
