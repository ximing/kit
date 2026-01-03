---
id: meanBy
title: meanBy
description: '通过迭代函数计算数组元素生成的值的平均值'
---

# `meanBy`

通过迭代函数计算数组元素生成的值的平均值。这个函数允许你对对象数组进行平均值计算，是统计分析中的常用工具。

## 语法

```typescript
function meanBy<T>(array: T[], iteratee: (item: T) => number): number;
```

## 参数

| 参数名     | 类型                  | 必填 | 默认值 | 描述                                             |
| ---------- | --------------------- | ---- | ------ | ------------------------------------------------ |
| `array`    | `T[]`                 | ✅   | -      | 要迭代的数组                                     |
| `iteratee` | `(item: T) => number` | ✅   | -      | 每个元素调用的迭代函数，返回用于计算平均值的数值 |

## 返回值

- **类型**: `number`
- **描述**: 返回计算得到的平均值。如果数组为空或无效，返回 `0`

## 示例

### 基础用法

```typescript
import { meanBy } from '@rabjs/kit';

// 示例1: 对象数组 - 按属性计算平均值
const students = [
  { name: '张三', score: 85 },
  { name: '李四', score: 90 },
  { name: '王五', score: 88 },
];
const avgScore = meanBy(students, (s) => s.score);
console.log(avgScore); // 87.67 (约)

// 示例2: 计算属性平均值
const products = [
  { name: '商品A', ratings: [4, 5, 5, 4] },
  { name: '商品B', ratings: [3, 4, 4] },
  { name: '商品C', ratings: [5, 5, 4, 5] },
];
const avgRatingCount = meanBy(products, (p) => p.ratings.length);
console.log(avgRatingCount); // 3.67 (约)

// 示例3: 空数组
console.log(meanBy([], (x) => x.value)); // 0
```

### 高级用法

```typescript
// 示例4: 嵌套对象
interface Employee {
  name: string;
  performance: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
}

const employees: Employee[] = [
  { name: '张三', performance: { q1: 85, q2: 90, q3: 88, q4: 92 } },
  { name: '李四', performance: { q1: 78, q2: 82, q3: 80, q4: 85 } },
  { name: '王五', performance: { q1: 92, q2: 95, q3: 90, q4: 94 } },
];

// 计算员工年度平均绩效
const avgPerformance = meanBy(employees, (emp) => {
  const { q1, q2, q3, q4 } = emp.performance;
  return (q1 + q2 + q3 + q4) / 4;
});
console.log(avgPerformance.toFixed(2)); // 87.08

// 示例5: 条件平均值
const scores = [
  { student: '张三', score: 85, subject: '数学' },
  { student: '李四', score: 92, subject: '数学' },
  { student: '王五', score: 78, subject: '科学' },
  { student: '赵六', score: 88, subject: '数学' },
];

// 只计算数学科目的平均分
const mathAvg = meanBy(
  scores.filter((s) => s.subject === '数学'),
  (s) => s.score,
);
console.log(mathAvg); // 88.33

// 示例6: 字符串长度平均值
const words = [
  { text: '你好', language: 'zh' },
  { text: '世界', language: 'zh' },
  { text: '测试', language: 'zh' },
];
const avgLength = meanBy(words, (w) => w.text.length);
console.log(avgLength); // 2
```

### 实际应用场景

```typescript
// 示例7: 电商评分统计
interface ProductReview {
  productId: string;
  productName: string;
  reviews: Array<{
    rating: number;
    comment: string;
  }>;
}

const products: ProductReview[] = [
  {
    productId: 'p1',
    productName: '笔记本电脑',
    reviews: [
      { rating: 5, comment: '非常好!' },
      { rating: 4, comment: '不错' },
      { rating: 5, comment: '很棒' },
    ],
  },
  {
    productId: 'p2',
    productName: '鼠标',
    reviews: [
      { rating: 4, comment: '挺好' },
      { rating: 3, comment: '还行' },
    ],
  },
];

// 计算每个产品的平均评分
const avgRatings = products.map((p) => ({
  name: p.productName,
  avgRating: meanBy(p.reviews, (r) => r.rating),
}));

console.log(avgRatings);
// [
//   { name: '笔记本电脑', avgRating: 4.67 },
//   { name: '鼠标', avgRating: 3.5 }
// ]

// 示例8: 响应时间监控
interface ApiLog {
  endpoint: string;
  responseTime: number;
  timestamp: Date;
  statusCode: number;
}

const apiLogs: ApiLog[] = [
  { endpoint: '/api/users', responseTime: 120, timestamp: new Date(), statusCode: 200 },
  { endpoint: '/api/users', responseTime: 150, timestamp: new Date(), statusCode: 200 },
  { endpoint: '/api/products', responseTime: 200, timestamp: new Date(), statusCode: 200 },
  { endpoint: '/api/users', responseTime: 130, timestamp: new Date(), statusCode: 200 },
];

// 计算特定接口的平均响应时间
const usersEndpointLogs = apiLogs.filter((log) => log.endpoint === '/api/users');
const avgResponseTime = meanBy(usersEndpointLogs, (log) => log.responseTime);

console.log(`/api/users 平均响应时间: ${avgResponseTime.toFixed(2)}ms`);
// /api/users 平均响应时间: 133.33ms

// 示例9: 学生成绩分析
interface StudentGrade {
  studentId: string;
  name: string;
  grades: {
    assignments: number[];
    midterm: number;
    final: number;
  };
}

const students: StudentGrade[] = [
  {
    studentId: 's1',
    name: '张三',
    grades: { assignments: [85, 90, 88], midterm: 87, final: 92 },
  },
  {
    studentId: 's2',
    name: '李四',
    grades: { assignments: [78, 82, 80], midterm: 81, final: 85 },
  },
];

// 计算班级平均成绩 (作业 40%, 期中 30%, 期末 30%)
const classAvg = meanBy(students, (student) => {
  const assignmentsAvg = student.grades.assignments.reduce((a, b) => a + b, 0) / student.grades.assignments.length;
  return assignmentsAvg * 0.4 + student.grades.midterm * 0.3 + student.grades.final * 0.3;
});

console.log(`班级平均分: ${classAvg.toFixed(2)}`); // 班级平均分: 85.37

// 示例10: 销售业绩分析
interface SalesRep {
  id: string;
  name: string;
  monthlySales: number[];
}

const salesTeam: SalesRep[] = [
  { id: 'r1', name: '张三', monthlySales: [50000, 55000, 52000, 58000] },
  { id: 'r2', name: '李四', monthlySales: [45000, 48000, 47000, 50000] },
  { id: 'r3', name: '王五', monthlySales: [60000, 62000, 58000, 65000] },
];

// 计算团队平均月销售额
const teamAvgMonthlySales = meanBy(salesTeam, (rep) => {
  return rep.monthlySales.reduce((a, b) => a + b, 0) / rep.monthlySales.length;
});

console.log(`团队平均月销售额: ¥${teamAvgMonthlySales.toFixed(2)}`);
// 团队平均月销售额: ¥54166.67

// 找出高于平均水平的销售代表
const topPerformers = salesTeam.filter((rep) => {
  const repAvg = rep.monthlySales.reduce((a, b) => a + b, 0) / rep.monthlySales.length;
  return repAvg > teamAvgMonthlySales;
});

console.log(
  '优秀销售:',
  topPerformers.map((r) => r.name),
); // ['张三', '王五']
```

## 交互式示例

```tsx live
function MeanByExample() {
  const [students, setStudents] = React.useState([
    { name: '张三', score: 85 },
    { name: '李四', score: 92 },
    { name: '王五', score: 78 },
    { name: '赵六', score: 88 },
  ]);

  const average = meanBy(students, (s) => s.score);

  const handleScoreChange = (index, newScore) => {
    const newStudents = [...students];
    newStudents[index].score = Math.max(0, Math.min(100, Number(newScore) || 0));
    setStudents(newStudents);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>meanBy 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <strong>学生成绩:</strong>
        <div style={{ marginTop: '10px' }}>
          {students.map((student, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '5px 0',
                background: 'white',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 'bold', minWidth: '100px' }}>{student.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="number"
                  value={student.score}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  min="0"
                  max="100"
                  style={{ width: '60px', padding: '5px' }}
                />
                <span
                  style={{
                    color: student.score >= average ? '#4caf50' : '#ff9800',
                    fontSize: '12px',
                  }}
                >
                  {student.score >= average ? '高于平均' : '低于平均'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: 'white',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '15px',
        }}
      >
        <strong>班级平均分:</strong>
        <div style={{ fontSize: '24px', color: '#1976d2', fontWeight: 'bold', marginTop: '10px' }}>
          {average.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 当数组为空时，函数返回 `0`
- ⚠️ **边界情况**: 当参数不是数组时，函数返回 `0`
- 💡 **性能提示**: 函数时间复杂度为 O(n)，先求和再除以数组长度
- 🔒 **类型安全**: 使用泛型 `<T>` 支持任意类型的数组
- 📚 **最佳实践**: iteratee 函数应该返回数字类型，否则可能导致 `NaN` 结果
- 🎯 **返回值**: 返回的是数字平均值，不是数组元素
- ⚡ **浮点数**: JavaScript 浮点数可能有精度问题，建议使用 `toFixed()` 格式化结果
- 📊 **统计意义**: 平均值对异常值敏感，考虑是否需要使用中位数等其他统计指标

## 相关函数

- [`sumBy`](./sumBy) - 按条件计算数组元素的总和
- [`maxBy`](./maxBy) - 按条件获取数组中的最大项
- [`minBy`](./minBy) - 按条件获取数组中的最小项
- [`groupBy`](../collection/groupBy) - 按条件分组数据

## 版本历史

- **v0.0.1** - 初始版本
