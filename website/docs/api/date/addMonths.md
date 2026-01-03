---
id: addMonths
title: addMonths
description: 'Adds or subtracts a specified number of months from a given date'
---

# `addMonths`

Adds or subtracts a specified number of months from a given date. This function returns a new Date object without modifying the original date.

## 语法

```typescript
function addMonths(date: Date, amount: number): Date;
```

## 参数

| 参数名   | 类型     | 必填 | 默认值 | 描述                                   |
| -------- | -------- | ---- | ------ | -------------------------------------- |
| `date`   | `Date`   | ✅   | -      | 基准日期对象                           |
| `amount` | `number` | ✅   | -      | 要增加的月份数，可以为负数表示减少月份 |

## 返回值

- **类型**: `Date`
- **描述**: 返回一个新的 Date 对象，表示增加指定月份后的日期。如果输入无效，返回 NaN 日期。

## 示例

### 基础用法

```typescript
import { addMonths } from '@rabjs/kit';

// 示例1: 增加月份
const date = new Date('2024-01-15');
const futureDate = addMonths(date, 3);
console.log(futureDate); // => Date object for 2024-04-15

// 示例2: 减少月份
const pastDate = addMonths(date, -2);
console.log(pastDate); // => Date object for 2023-11-15

// 示例3: 零月份
const sameDate = addMonths(date, 0);
console.log(sameDate); // => Date object for 2024-01-15
```

### 高级用法

```typescript
// 示例4: 计算季度日期
function getQuarterDate(date: Date, quarter: number) {
  // quarter: 0=Q1, 1=Q2, 2=Q3, 3=Q4
  return addMonths(date, quarter * 3);
}

const q2Date = getQuarterDate(new Date('2024-01-15'), 1);
console.log(q2Date); // => Date object for 2024-04-15

// 示例5: 月度周期
function getMonthlyRecurrence(startDate: Date, occurrences: number) {
  const dates = [];
  for (let i = 0; i < occurrences; i++) {
    dates.push(addMonths(startDate, i));
  }
  return dates;
}

const monthly = getMonthlyRecurrence(new Date('2024-01-15'), 12);
console.log(monthly.length); // => 12
```

### 实际应用场景

```typescript
// 示例6: 订阅续期日期
function getSubscriptionRenewalDate(startDate: Date, subscriptionMonths: number = 12) {
  return addMonths(startDate, subscriptionMonths);
}

const renewalDate = getSubscriptionRenewalDate(new Date('2024-01-15'), 12);
console.log(renewalDate); // => Date object for 2025-01-15

// 示例7: 贷款还款计划
function generateLoanPaymentSchedule(loanDate: Date, months: number) {
  const schedule = [];
  for (let i = 1; i <= months; i++) {
    schedule.push({
      paymentNumber: i,
      dueDate: addMonths(loanDate, i),
    });
  }
  return schedule;
}

// 示例8: 保修期计算
function getWarrantyExpiry(purchaseDate: Date, warrantyMonths: number = 12) {
  return addMonths(purchaseDate, warrantyMonths);
}

const expiry = getWarrantyExpiry(new Date('2024-01-15'), 24);
console.log(expiry); // => Date object for 2026-01-15
```

## 交互式示例

```tsx live
function AddMonthsExample() {
  const [months, setMonths] = React.useState(3);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    try {
      const added = addMonths(new Date(), months);
      setResult(added);
    } catch (error) {
      setResult(null);
    }
  }, [months]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>addMonths 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>增加月份:</label>
        <input
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
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
- 💡 **日期调整**: 如果目标月份没有相应的日期（如 1 月 31 日 + 1 月 = 2 月 28/29 日），会自动调整
- 💡 **闰年**: 函数会自动处理闰年计算
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 对于需要精确日期的场景，验证返回的日期是否符合预期

## 相关函数

- [`addDays`](./addDays) - 增加天数
- [`addYears`](./addYears) - 增加年份
- [`diffMonths`](./diffMonths) - 计算月份差
- [`diffDays`](./diffDays) - 计算天数差

## 版本历史

- **v1.0.0** - 初始版本
