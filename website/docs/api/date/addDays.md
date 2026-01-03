---
id: addDays
title: addDays
description: 'Adds or subtracts a specified number of days from a given date'
---

# `addDays`

Adds or subtracts a specified number of days from a given date. This function returns a new Date object without modifying the original date.

## 语法

```typescript
function addDays(date: Date, amount: number): Date;
```

## 参数

| 参数名   | 类型     | 必填 | 默认值 | 描述                                 |
| -------- | -------- | ---- | ------ | ------------------------------------ |
| `date`   | `Date`   | ✅   | -      | 基准日期对象                         |
| `amount` | `number` | ✅   | -      | 要增加的天数，可以为负数表示减少天数 |

## 返回值

- **类型**: `Date`
- **描述**: 返回一个新的 Date 对象，表示增加指定天数后的日期。如果输入无效，返回 NaN 日期。

## 示例

### 基础用法

```typescript
import { addDays } from '@rabjs/kit';

// 示例1: 增加天数
const date = new Date('2024-01-15');
const futureDate = addDays(date, 5);
console.log(futureDate); // => Date object for 2024-01-20

// 示例2: 减少天数
const pastDate = addDays(date, -3);
console.log(pastDate); // => Date object for 2024-01-12

// 示例3: 零天数
const sameDate = addDays(date, 0);
console.log(sameDate); // => Date object for 2024-01-15
```

### 高级用法

```typescript
// 示例4: 计算截止日期
function calculateDeadline(startDate: Date, daysUntilDeadline: number) {
  return addDays(startDate, daysUntilDeadline);
}

const deadline = calculateDeadline(new Date('2024-01-15'), 7);
console.log(deadline); // => Date object for 2024-01-22

// 示例5: 月度周期计算
function getNextMonthlyDate(date: Date) {
  // 近似为 30 天
  return addDays(date, 30);
}

// 示例6: 计算工作日
function addWorkdays(date: Date, workdays: number) {
  let current = new Date(date);
  let count = 0;

  while (count < workdays) {
    current = addDays(current, 1);
    const dayOfWeek = current.getDay();
    // 跳过周末 (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
  }

  return current;
}

const workdayDate = addWorkdays(new Date('2024-01-15'), 5);
console.log(workdayDate);
```

### 实际应用场景

```typescript
// 示例7: 会员过期日期
function calculateMembershipExpiry(joinDate: Date, validDays: number = 365) {
  return addDays(joinDate, validDays);
}

const expiryDate = calculateMembershipExpiry(new Date('2024-01-01'), 365);
console.log(expiryDate); // => Date object for 2025-01-01

// 示例8: 订单发货期限
function getShippingDeadline(orderDate: Date, shippingDays: number = 3) {
  return addDays(orderDate, shippingDays);
}

const shippingDeadline = getShippingDeadline(new Date('2024-01-15'), 3);
console.log(shippingDeadline); // => Date object for 2024-01-18

// 示例9: 生成日期范围
function generateDateRange(startDate: Date, numberOfDays: number) {
  const dates = [];
  for (let i = 0; i < numberOfDays; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
}

const dateRange = generateDateRange(new Date('2024-01-15'), 7);
console.log(dateRange.length); // => 7

// 示例10: 计算相对日期
function getRelativeDates(baseDate: Date) {
  return {
    tomorrow: addDays(baseDate, 1),
    nextWeek: addDays(baseDate, 7),
    nextMonth: addDays(baseDate, 30),
    nextYear: addDays(baseDate, 365),
    yesterday: addDays(baseDate, -1),
    lastWeek: addDays(baseDate, -7),
  };
}

const relatives = getRelativeDates(new Date('2024-01-15'));
console.log(relatives);
```

## 交互式示例

```tsx live
function AddDaysExample() {
  const [days, setDays] = React.useState(5);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    try {
      const added = addDays(new Date(), days);
      setResult(added);
    } catch (error) {
      setResult(null);
    }
  }, [days]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>addDays 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>增加天数:</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>今天:</strong>
        <div style={{ background: 'white', padding: '10px', marginTop: '5px', borderRadius: '4px' }}>
          {new Date().toLocaleDateString()}
        </div>
      </div>
      <div>
        <strong>结果日期:</strong>
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
          {result ? result.toLocaleDateString() : 'Error'}
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果输入不是有效的 Date 对象，返回 NaN 日期
- ⚠️ **边界情况**: 如果 amount 不是有限数字，返回 NaN 日期
- 💡 **月份边界**: 函数会自动处理月份边界（如 1 月 31 日 + 1 天 = 2 月 1 日）
- 💡 **闰年**: 函数会自动处理闰年计算
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 对于精确的时间计算，考虑时区问题

## 相关函数

- [`diffDays`](./diffDays) - 计算两个日期之间的天数差
- [`addMonths`](./addMonths) - 增加月份
- [`addYears`](./addYears) - 增加年份
- [`startOfDay`](./startOfDay) - 获取当天开始时间
- [`endOfDay`](./endOfDay) - 获取当天结束时间

## 版本历史

- **v0.0.1** - 初始版本
