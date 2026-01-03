---
id: diffDays
title: diffDays
description: '计算两个日期之间的天数差'
---

# `diffDays`

计算两个日期之间的天数差。如果第一个日期晚于第二个日期，结果为正；否则为负。

## 语法

```typescript
function diffDays(date1: Date, date2: Date): number;
```

## 参数

| 参数名  | 类型   | 必填 | 默认值 | 描述           |
| ------- | ------ | ---- | ------ | -------------- |
| `date1` | `Date` | ✅   | -      | 第一个日期对象 |
| `date2` | `Date` | ✅   | -      | 第二个日期对象 |

## 返回值

- **类型**: `number`
- **描述**: 两个日期之间的天数差（date1 - date2）。如果输入无效，返回 NaN。

## 示例

### 基础用法

```typescript
import { diffDays } from '@rabjs/kit';

// 示例1: 计算天数差
const date1 = new Date('2024-01-20');
const date2 = new Date('2024-01-15');
console.log(diffDays(date1, date2)); // => 5

// 示例2: 反向日期计算
console.log(diffDays(date2, date1)); // => -5

// 示例3: 相同日期
const sameDate = new Date('2024-01-15');
console.log(diffDays(sameDate, sameDate)); // => 0
```

### 高级用法

```typescript
// 示例4: 计算订单已发货天数
function getDaysSinceShipment(shipmentDate: Date) {
  return diffDays(new Date(), shipmentDate);
}

const days = getDaysSinceShipment(new Date('2024-01-10'));
console.log(days); // => 取决于当前日期

// 示例5: 计算剩余天数
function getRemainingDays(deadline: Date) {
  return diffDays(deadline, new Date());
}

const remaining = getRemainingDays(new Date('2024-02-15'));
console.log(remaining); // => 计算到截止日期的天数

// 示例6: 检查日期是否在范围内
function isDateInRange(date: Date, startDate: Date, endDate: Date) {
  const daysFromStart = diffDays(date, startDate);
  const daysFromEnd = diffDays(endDate, date);
  return daysFromStart >= 0 && daysFromEnd >= 0;
}

const inRange = isDateInRange(new Date('2024-01-15'), new Date('2024-01-10'), new Date('2024-01-20'));
console.log(inRange); // => true
```

### 实际应用场景

```typescript
// 示例7: 计算用户账户年龄
function getAccountAgeDays(createdDate: Date) {
  return diffDays(new Date(), createdDate);
}

const ageDays = getAccountAgeDays(new Date('2023-01-15'));
console.log(ageDays); // => 大约 365 天

// 示例8: 会员有效期检查
function isMembershipValid(joinDate: Date, validDays: number = 365) {
  const daysSinceJoin = diffDays(new Date(), joinDate);
  return daysSinceJoin <= validDays;
}

const isValid = isMembershipValid(new Date('2024-01-15'), 365);
console.log(isValid); // => true or false

// 示例9: 订单配送时间统计
function getDeliveryStats(orderDate: Date, deliveryDate: Date) {
  const deliveryDays = diffDays(deliveryDate, orderDate);
  return {
    orderDate,
    deliveryDate,
    deliveryDays,
    isOnTime: deliveryDays <= 3,
    isDelayed: deliveryDays > 3,
  };
}

const stats = getDeliveryStats(new Date('2024-01-15'), new Date('2024-01-18'));
console.log(stats);
// => { orderDate, deliveryDate, deliveryDays: 3, isOnTime: true, isDelayed: false }

// 示例10: 生成日期统计报告
function generateDateReport(dates: Date[]) {
  if (dates.length < 2) return null;

  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  const firstDate = sorted[0];
  const lastDate = sorted[sorted.length - 1];
  const totalDays = diffDays(lastDate, firstDate);

  return {
    firstDate,
    lastDate,
    totalDays,
    averageDaysPerEvent: totalDays / (dates.length - 1),
  };
}
```

## 交互式示例

```tsx live
function DiffDaysExample() {
  const [date1Str, setDate1Str] = React.useState('2024-01-20');
  const [date2Str, setDate2Str] = React.useState('2024-01-15');
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    try {
      const d1 = new Date(date1Str);
      const d2 = new Date(date2Str);
      const diff = diffDays(d1, d2);
      setResult(diff);
    } catch (error) {
      setResult(NaN);
    }
  }, [date1Str, date2Str]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>diffDays 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>日期 1:</label>
        <input
          type="date"
          value={date1Str}
          onChange={(e) => setDate1Str(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>日期 2:</label>
        <input
          type="date"
          value={date2Str}
          onChange={(e) => setDate2Str(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>天数差 (日期1 - 日期2):</strong>
        <div
          style={{
            background: 'white',
            padding: '10px',
            marginTop: '5px',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: '#2563eb',
            fontSize: '18px',
          }}
        >
          {isNaN(result) ? 'Invalid' : result} 天
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果任一输入不是有效的 Date 对象，返回 NaN
- ⚠️ **边界情况**: 该函数计算的是完整天数，不包括时间部分
- 💡 **时间忽略**: 计算时会忽略时间部分，只考虑日期
- 💡 **符号**: 结果的符号表示日期的相对顺序
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 对于精确的时间差计算，考虑时区问题

## 相关函数

- [`addDays`](./addDays) - 增加天数
- [`diffMonths`](./diffMonths) - 计算月份差
- [`diffYears`](./diffYears) - 计算年份差
- [`startOfDay`](./startOfDay) - 获取当天开始时间
- [`endOfDay`](./endOfDay) - 获取当天结束时间

## 版本历史

- **v1.0.0** - 初始版本
