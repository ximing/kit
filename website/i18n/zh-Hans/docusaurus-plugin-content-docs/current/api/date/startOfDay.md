---
id: startOfDay
title: startOfDay
description: '返回一个新的 Date 对象，设置为当天开始时间 (00:00:00.000)'
---

# `startOfDay`

返回一个新的 Date 对象，设置为当天开始时间（00:00:00.000）。该函数对于日期范围查询和日度聚合很有用。

## 语法

```typescript
function startOfDay(date: Date): Date;
```

## 参数

| 参数名 | 类型   | 必填 | 默认值 | 描述             |
| ------ | ------ | ---- | ------ | ---------------- |
| `date` | `Date` | ✅   | -      | 要处理的日期对象 |

## 返回值

- **类型**: `Date`
- **描述**: 返回一个新的 Date 对象，表示同一天的开始时间（00:00:00.000）。如果输入无效，返回 NaN 日期。

## 示例

### 基础用法

```typescript
import { startOfDay } from '@rabjs/kit';

// 示例1: 获取当天开始时间
const date = new Date('2024-01-15T14:30:45.123Z');
const dayStart = startOfDay(date);
console.log(dayStart); // => Date object for 2024-01-15T00:00:00.000Z

// 示例2: 当前时间的当天开始
const now = new Date();
const todayStart = startOfDay(now);
console.log(todayStart); // => 今天 00:00:00
```

### 高级用法

```typescript
// 示例3: 获取当天时间范围
function getDayTimeRange(date: Date) {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
}

const range = getDayTimeRange(new Date('2024-01-15T14:30:45'));
console.log(range);
// => {
//   start: Date(2024-01-15T00:00:00),
//   end: Date(2024-01-15T23:59:59.999)
// }

// 示例4: 检查两个时间是否在同一天
function isSameDay(date1: Date, date2: Date) {
  return startOfDay(date1).getTime() === startOfDay(date2).getTime();
}

const same = isSameDay(new Date('2024-01-15T10:30:00'), new Date('2024-01-15T20:45:30'));
console.log(same); // => true
```

### 实际应用场景

```typescript
// 示例5: 数据库查询 - 查询今天的数据
function getTodayRecords(records: any[]) {
  const today = startOfDay(new Date());
  return records.filter((record) => {
    const recordDate = new Date(record.createdAt);
    return recordDate >= today;
  });
}

// 示例6: 日期范围查询
function getRecordsBetweenDates(records: any[], startDate: Date, endDate: Date) {
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  return records.filter((record) => {
    const recordDate = new Date(record.createdAt);
    return recordDate >= start && recordDate <= end;
  });
}

// 示例7: 日期分组
function groupRecordsByDay(records: any[]) {
  const grouped: Record<string, any[]> = {};

  records.forEach((record) => {
    const dayKey = startOfDay(new Date(record.createdAt)).toISOString().split('T')[0];
    if (!grouped[dayKey]) {
      grouped[dayKey] = [];
    }
    grouped[dayKey].push(record);
  });

  return grouped;
}

// 示例8: 计算天数间隔
function getDaysBetween(date1: Date, date2: Date) {
  const start = startOfDay(date1);
  const end = startOfDay(date2);
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
}

const days = getDaysBetween(new Date('2024-01-15T10:30:00'), new Date('2024-01-20T15:45:30'));
console.log(days); // => 5

// 示例9: 事件日程表
function getUpcomingEvents(events: any[], daysAhead: number = 7) {
  const today = startOfDay(new Date());
  const future = addDays(today, daysAhead);

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= future;
  });
}

// 示例10: 日统计报告
function generateDailyStats(records: any[], date: Date) {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const dayRecords = records.filter((record) => {
    const recordDate = new Date(record.createdAt);
    return recordDate >= dayStart && recordDate <= dayEnd;
  });

  return {
    date: format(date, 'YYYY-MM-DD'),
    recordCount: dayRecords.length,
    records: dayRecords,
  };
}
```

## 交互式示例

```tsx live
function StartOfDayExample() {
  const [dateStr, setDateStr] = React.useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    try {
      const date = new Date(dateStr);
      const dayStart = startOfDay(date);
      setResult(dayStart);
    } catch (error) {
      setResult(null);
    }
  }, [dateStr]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>startOfDay 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>选择日期:</label>
        <input
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>当天开始时间:</strong>
        <div style={{ background: 'white', padding: '10px', marginTop: '5px', borderRadius: '4px' }}>
          {result ? (
            <>
              <div>{result.toLocaleDateString()}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>{result.toLocaleTimeString()}</div>
            </>
          ) : (
            'Error'
          )}
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果输入不是有效的 Date 对象，返回 NaN 日期
- 💡 **时区**: 函数保持原始日期的时区
- 💡 **组合使用**: 通常与 `endOfDay` 配合使用来获取完整的日期范围
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 用于数据库查询前的日期标准化

## 相关函数

- [`endOfDay`](./endOfDay) - 获取当天结束时间
- [`addDays`](./addDays) - 增加天数
- [`diffDays`](./diffDays) - 计算天数差
- [`format`](./format) - 格式化日期

## 版本历史

- **v1.0.0** - 初始版本
