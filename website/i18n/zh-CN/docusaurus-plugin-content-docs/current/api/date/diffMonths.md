---
id: diffMonths
title: diffMonths
description: '计算两个日期之间的月份差'
---

# `diffMonths`

计算两个日期之间的月份差。如果第一个日期晚于第二个日期，结果为正；否则为负。

## 语法

```typescript
function diffMonths(date1: Date, date2: Date): number;
```

## 参数

| 参数名  | 类型   | 必填 | 默认值 | 描述           |
| ------- | ------ | ---- | ------ | -------------- |
| `date1` | `Date` | ✅   | -      | 第一个日期对象 |
| `date2` | `Date` | ✅   | -      | 第二个日期对象 |

## 返回值

- **类型**: `number`
- **描述**: 两个日期之间的月份差（date1 - date2）。如果输入无效，返回 NaN。

## 示例

### 基础用法

```typescript
import { diffMonths } from '@rabjs/kit';

// 示例1: 计算月份差
const date1 = new Date('2024-04-15');
const date2 = new Date('2024-01-15');
console.log(diffMonths(date1, date2)); // => 3

// 示例2: 反向日期计算
console.log(diffMonths(date2, date1)); // => -3

// 示例3: 相同日期
const sameDate = new Date('2024-01-15');
console.log(diffMonths(sameDate, sameDate)); // => 0
```

### 高级用法

```typescript
// 示例4: 计算订阅剩余月份
function getSubscriptionMonthsRemaining(expiryDate: Date) {
  return diffMonths(expiryDate, new Date());
}

const remaining = getSubscriptionMonthsRemaining(new Date('2024-12-31'));
console.log(remaining); // => 剩余月份

// 示例5: 贷款已偿还月份
function getLoanRepaidMonths(loanDate: Date) {
  return diffMonths(new Date(), loanDate);
}

const repaid = getLoanRepaidMonths(new Date('2023-01-15'));
console.log(repaid); // => 已偿还的月份

// 示例6: 检查月份范围
function isWithinMonthRange(date: Date, startDate: Date, endDate: Date, months: number) {
  const monthsFromStart = diffMonths(date, startDate);
  return monthsFromStart >= 0 && monthsFromStart <= months;
}
```

### 实际应用场景

```typescript
// 示例7: 计算工作经验（月份）
function getWorkExperienceMonths(startDate: Date) {
  return diffMonths(new Date(), startDate);
}

const experience = getWorkExperienceMonths(new Date('2022-06-15'));
console.log(experience); // => 工作月数

// 示例8: 项目周期统计
function getProjectDurationMonths(startDate: Date, endDate: Date) {
  return diffMonths(endDate, startDate);
}

const duration = getProjectDurationMonths(new Date('2024-01-01'), new Date('2024-06-30'));
console.log(duration); // => 6 个月

// 示例9: 保修期检查（月份）
function isUnderWarranty(purchaseDate: Date, warrantyMonths: number = 12) {
  const monthsPassed = diffMonths(new Date(), purchaseDate);
  return monthsPassed <= warrantyMonths;
}

const underWarranty = isUnderWarranty(new Date('2024-01-15'), 24);
console.log(underWarranty); // => true or false

// 示例10: 年度报告生成
function generateMonthlyReport(startDate: Date, endDate: Date) {
  const monthsDiff = diffMonths(endDate, startDate);
  const months = [];

  for (let i = 0; i <= monthsDiff; i++) {
    months.push({
      month: i + 1,
      date: addMonths(startDate, i),
    });
  }

  return months;
}
```

## 交互式示例

```tsx live
function DiffMonthsExample() {
  const [date1Str, setDate1Str] = React.useState('2024-04-15');
  const [date2Str, setDate2Str] = React.useState('2024-01-15');
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    try {
      const d1 = new Date(date1Str);
      const d2 = new Date(date2Str);
      const diff = diffMonths(d1, d2);
      setResult(diff);
    } catch (error) {
      setResult(NaN);
    }
  }, [date1Str, date2Str]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>diffMonths 交互式示例</h4>
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
        <strong>月份差 (日期1 - 日期2):</strong>
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
          {isNaN(result) ? 'Invalid' : result} 个月
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果任一输入不是有效的 Date 对象，返回 NaN
- ⚠️ **边界情况**: 该函数计算的是完整月份，不包括时间部分
- 💡 **日期计算**: 计算基于年份和月份，忽略日期部分
- 💡 **符号**: 结果的符号表示日期的相对顺序
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 对于需要精确月份计算的场景，考虑使用 `diffDays` 后转换

## 相关函数

- [`addMonths`](./addMonths) - 增加月份
- [`diffDays`](./diffDays) - 计算天数差
- [`diffYears`](./diffYears) - 计算年份差
- [`addDays`](./addDays) - 增加天数

## 版本历史

- **v1.0.0** - 初始版本
