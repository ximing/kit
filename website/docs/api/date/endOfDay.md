---
id: endOfDay
title: endOfDay
description: 'Returns a new Date object set to the end of the day (23:59:59.999)'
---

# `endOfDay`

Returns a new Date object set to the end of the day (23:59:59.999). This function is useful for date range queries and daily aggregations.

## 语法

```typescript
function endOfDay(date: Date): Date;
```

## 参数

| 参数名 | 类型   | 必填 | 默认值 | 描述             |
| ------ | ------ | ---- | ------ | ---------------- |
| `date` | `Date` | ✅   | -      | 要处理的日期对象 |

## 返回值

- **类型**: `Date`
- **描述**: 返回一个新的 Date 对象，表示同一天的结束时间（23:59:59.999）。如果输入无效，返回 NaN 日期。

## 示例

### 基础用法

```typescript
import { endOfDay } from '@rabjs/kit';

// 示例1: 获取当天结束时间
const date = new Date('2024-01-15T14:30:45.123Z');
const dayEnd = endOfDay(date);
console.log(dayEnd); // => Date object for 2024-01-15T23:59:59.999Z

// 示例2: 当前时间的当天结束
const now = new Date();
const todayEnd = endOfDay(now);
console.log(todayEnd); // => 今天 23:59:59.999
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

// 示例4: 计算距离当天结束的时间
function getTimeUntilDayEnd() {
  const now = new Date();
  const end = endOfDay(now);
  const millisLeft = end.getTime() - now.getTime();
  return {
    milliseconds: millisLeft,
    seconds: Math.floor(millisLeft / 1000),
    minutes: Math.floor(millisLeft / 60000),
    hours: Math.floor(millisLeft / 3600000),
  };
}

const timeLeft = getTimeUntilDayEnd();
console.log(timeLeft);
```

### 实际应用场景

```typescript
// 示例5: 数据库查询 - 查询今天的所有数据
function getTodayRecords(records: any[]) {
  const today = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  return records.filter((record) => {
    const recordDate = new Date(record.createdAt);
    return recordDate >= today && recordDate <= todayEnd;
  });
}

// 示例6: 完整的日期范围查询
function getRecordsBetweenDates(records: any[], startDate: Date, endDate: Date) {
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  return records.filter((record) => {
    const recordDate = new Date(record.createdAt);
    return recordDate >= start && recordDate <= end;
  });
}

// 示例7: 截止时间检查
function isDeadlineMet(deadline: Date, completionDate: Date) {
  const deadlineEnd = endOfDay(deadline);
  return completionDate <= deadlineEnd;
}

const met = isDeadlineMet(new Date('2024-01-15'), new Date('2024-01-15T23:30:00'));
console.log(met); // => true

// 示例8: 日期有效期检查
function isDateValid(date: Date, validUntil: Date) {
  const now = new Date();
  const validEnd = endOfDay(validUntil);
  return now <= validEnd;
}

const valid = isDateValid(new Date(), new Date('2024-12-31'));
console.log(valid); // => true or false

// 示例9: 日度统计报告
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
    firstRecord: dayRecords[0],
    lastRecord: dayRecords[dayRecords.length - 1],
    records: dayRecords,
  };
}

// 示例10: 优惠券/促销活动有效期
function isPromotionActive(promotionEndDate: Date) {
  const now = new Date();
  const promotionEnd = endOfDay(promotionEndDate);
  return now <= promotionEnd;
}

const active = isPromotionActive(new Date('2024-01-31'));
console.log(active); // => true or false
```

## 交互式示例

```tsx live
function EndOfDayExample() {
  const [dateStr, setDateStr] = React.useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    try {
      const date = new Date(dateStr);
      const dayEnd = endOfDay(date);
      setResult(dayEnd);
    } catch (error) {
      setResult(null);
    }
  }, [dateStr]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>endOfDay 交互式示例</h4>
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
        <strong>当天结束时间:</strong>
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
- 💡 **组合使用**: 通常与 `startOfDay` 配合使用来获取完整的日期范围
- 💡 **精度**: 精确到毫秒（.999），确保包含整个最后一秒
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 用于数据库查询前的日期标准化

## 相关函数

- [`startOfDay`](./startOfDay) - 获取当天开始时间
- [`addDays`](./addDays) - 增加天数
- [`diffDays`](./diffDays) - 计算天数差
- [`format`](./format) - 格式化日期

## 版本历史

- **v0.0.1** - 初始版本
