---
id: addYears
title: addYears
description: 'Adds or subtracts a specified number of years from a given date'
---

# `addYears`

Adds or subtracts a specified number of years from a given date. This function returns a new Date object without modifying the original date.

## 语法

```typescript
function addYears(date: Date, amount: number): Date;
```

## 参数

| 参数名   | 类型     | 必填 | 默认值 | 描述                                   |
| -------- | -------- | ---- | ------ | -------------------------------------- |
| `date`   | `Date`   | ✅   | -      | 基准日期对象                           |
| `amount` | `number` | ✅   | -      | 要增加的年份数，可以为负数表示减少年份 |

## 返回值

- **类型**: `Date`
- **描述**: 返回一个新的 Date 对象，表示增加指定年份后的日期。如果输入无效，返回 NaN 日期。

## 示例

### 基础用法

```typescript
import { addYears } from '@rabjs/kit';

// 示例1: 增加年份
const date = new Date('2024-01-15');
const futureDate = addYears(date, 1);
console.log(futureDate); // => Date object for 2025-01-15

// 示例2: 减少年份
const pastDate = addYears(date, -2);
console.log(pastDate); // => Date object for 2022-01-15

// 示例3: 零年份
const sameDate = addYears(date, 0);
console.log(sameDate); // => Date object for 2024-01-15
```

### 高级用法

```typescript
// 示例4: 计算年度周期
function getAnnualRecurrence(startDate: Date, years: number) {
  const dates = [];
  for (let i = 0; i < years; i++) {
    dates.push(addYears(startDate, i));
  }
  return dates;
}

const annual = getAnnualRecurrence(new Date('2024-01-15'), 5);
console.log(annual.length); // => 5

// 示例5: 处理闰年
function getAnniversaryDate(date: Date, yearsLater: number) {
  return addYears(date, yearsLater);
}

// 2024年2月29日（闰年）
const leapDate = new Date('2024-02-29');
const nextYear = getAnniversaryDate(leapDate, 1);
console.log(nextYear); // => Date object for 2025-02-28 or 2025-03-01
```

### 实际应用场景

```typescript
// 示例6: 计算年龄
function getAgeYears(birthDate: Date) {
  return diffYears(new Date(), birthDate);
}

// 示例7: 计算生日下一次发生的日期
function getNextBirthday(birthDate: Date) {
  const today = new Date();
  let nextBirthday = addYears(birthDate, diffYears(today, birthDate));

  if (nextBirthday < today) {
    nextBirthday = addYears(nextBirthday, 1);
  }

  return nextBirthday;
}

const nextBday = getNextBirthday(new Date('1990-03-15'));
console.log(nextBday);

// 示例8: 合同到期日期
function getContractExpiryDate(signDate: Date, yearsValid: number = 1) {
  return addYears(signDate, yearsValid);
}

const expiry = getContractExpiryDate(new Date('2024-01-15'), 3);
console.log(expiry); // => Date object for 2027-01-15

// 示例9: 多年期投资计划
function generateInvestmentTimeline(investmentDate: Date, years: number) {
  const timeline = [];
  for (let i = 1; i <= years; i++) {
    timeline.push({
      year: i,
      date: addYears(investmentDate, i),
      milestone: `Year ${i} Review`,
    });
  }
  return timeline;
}
```

## 交互式示例

```tsx live
function AddYearsExample() {
  const [years, setYears] = React.useState(1);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    try {
      const added = addYears(new Date(), years);
      setResult(added);
    } catch (error) {
      setResult(null);
    }
  }, [years]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>addYears 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>增加年份:</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
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
- 💡 **闰年**: 2 月 29 日 + 1 年可能会变成 2 月 28 日或 3 月 1 日，取决于目标年份是否为闰年
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 对于需要精确日期的场景，验证返回的日期是否符合预期

## 相关函数

- [`addDays`](./addDays) - 增加天数
- [`addMonths`](./addMonths) - 增加月份
- [`diffYears`](./diffYears) - 计算年份差
- [`diffMonths`](./diffMonths) - 计算月份差

## 版本历史

- **v1.0.0** - 初始版本
