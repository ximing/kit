---
id: diffYears
title: diffYears
description: '计算两个日期之间的年份差'
---

# `diffYears`

计算两个日期之间的年份差。如果第一个日期晚于第二个日期，结果为正；否则为负。

## 语法

```typescript
function diffYears(date1: Date, date2: Date): number;
```

## 参数

| 参数名  | 类型   | 必填 | 默认值 | 描述           |
| ------- | ------ | ---- | ------ | -------------- |
| `date1` | `Date` | ✅   | -      | 第一个日期对象 |
| `date2` | `Date` | ✅   | -      | 第二个日期对象 |

## 返回值

- **类型**: `number`
- **描述**: 两个日期之间的年份差（date1 - date2）。如果输入无效，返回 NaN。

## 示例

### 基础用法

```typescript
import { diffYears } from '@rabjs/kit';

// 示例1: 计算年份差
const date1 = new Date('2026-01-15');
const date2 = new Date('2024-01-15');
console.log(diffYears(date1, date2)); // => 2

// 示例2: 反向日期计算
console.log(diffYears(date2, date1)); // => -2

// 示例3: 相同日期
const sameDate = new Date('2024-01-15');
console.log(diffYears(sameDate, sameDate)); // => 0
```

### 高级用法

```typescript
// 示例4: 计算年龄
function getAge(birthDate: Date) {
  return diffYears(new Date(), birthDate);
}

const age = getAge(new Date('1990-03-15'));
console.log(age); // => 年龄（年）

// 示例5: 检查年份范围
function isWithinYearRange(date: Date, startDate: Date, endDate: Date) {
  const yearsFromStart = diffYears(date, startDate);
  const yearsFromEnd = diffYears(endDate, date);
  return yearsFromStart >= 0 && yearsFromEnd >= 0;
}

const inRange = isWithinYearRange(new Date('2024-06-15'), new Date('2020-01-01'), new Date('2030-12-31'));
console.log(inRange); // => true
```

### 实际应用场景

```typescript
// 示例6: 工作经验年数
function getWorkExperienceYears(startDate: Date) {
  return diffYears(new Date(), startDate);
}

const experience = getWorkExperienceYears(new Date('2015-06-01'));
console.log(experience); // => 工作年数

// 示例7: 合同有效期检查
function isContractExpired(signDate: Date, validYears: number = 1) {
  const yearsPassed = diffYears(new Date(), signDate);
  return yearsPassed > validYears;
}

const expired = isContractExpired(new Date('2023-01-15'), 1);
console.log(expired); // => true or false

// 示例8: 公司成立年份
function getCompanyAge(foundingDate: Date) {
  return diffYears(new Date(), foundingDate);
}

const companyAge = getCompanyAge(new Date('2000-05-20'));
console.log(companyAge); // => 公司成立至今的年数

// 示例9: 项目周期统计
function getProjectDurationYears(startDate: Date, endDate: Date) {
  return diffYears(endDate, startDate);
}

const duration = getProjectDurationYears(new Date('2020-01-01'), new Date('2024-12-31'));
console.log(duration); // => 5 年

// 示例10: 多年期数据分析
function generateYearlyReport(startDate: Date, endDate: Date) {
  const yearsDiff = diffYears(endDate, startDate);
  const years = [];

  for (let i = 0; i <= yearsDiff; i++) {
    years.push({
      year: startDate.getFullYear() + i,
      date: addYears(startDate, i),
    });
  }

  return years;
}
```

## 交互式示例

```tsx live
function DiffYearsExample() {
  const [date1Str, setDate1Str] = React.useState('2026-01-15');
  const [date2Str, setDate2Str] = React.useState('2024-01-15');
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    try {
      const d1 = new Date(date1Str);
      const d2 = new Date(date2Str);
      const diff = diffYears(d1, d2);
      setResult(diff);
    } catch (error) {
      setResult(NaN);
    }
  }, [date1Str, date2Str]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>diffYears 交互式示例</h4>
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
        <strong>年份差 (日期1 - 日期2):</strong>
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
          {isNaN(result) ? 'Invalid' : result} 年
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果任一输入不是有效的 Date 对象，返回 NaN
- ⚠️ **边界情况**: 该函数计算的是完整年份，不包括月份和日期部分
- 💡 **年份计算**: 计算基于年份，忽略月份和日期部分
- 💡 **符号**: 结果的符号表示日期的相对顺序
- 🔒 **不可变性**: 原始日期对象不会被修改
- 📚 **最佳实践**: 对于需要精确年龄计算的场景，考虑同时检查月份和日期

## 相关函数

- [`addYears`](./addYears) - 增加年份
- [`diffMonths`](./diffMonths) - 计算月份差
- [`diffDays`](./diffDays) - 计算天数差
- [`addMonths`](./addMonths) - 增加月份

## 版本历史

- **v0.0.1** - 初始版本
