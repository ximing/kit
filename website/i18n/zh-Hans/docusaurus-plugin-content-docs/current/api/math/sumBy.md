---
id: sumBy
title: sumBy
description: '通过迭代函数计算数组元素生成的值的总和'
---

# `sumBy`

通过迭代函数计算数组元素生成的值的总和。这个函数允许你对对象数组进行求和操作，而不仅仅是简单的数字数组。

## 语法

```typescript
function sumBy<T>(array: T[], iteratee: (item: T) => number): number;
```

## 参数

| 参数名     | 类型                  | 必填 | 默认值 | 描述                                       |
| ---------- | --------------------- | ---- | ------ | ------------------------------------------ |
| `array`    | `T[]`                 | ✅   | -      | 要迭代的数组                               |
| `iteratee` | `(item: T) => number` | ✅   | -      | 每个元素调用的迭代函数，返回用于求和的数值 |

## 返回值

- **类型**: `number`
- **描述**: 返回计算得到的总和。如果数组为空或无效，返回 `0`

## 示例

### 基础用法

```typescript
import { sumBy } from '@rabjs/kit';

// 示例1: 对象数组 - 按属性求和
const products = [
  { name: '笔记本电脑', price: 1000 },
  { name: '鼠标', price: 25 },
  { name: '键盘', price: 75 },
];
const totalPrice = sumBy(products, (p) => p.price);
console.log(totalPrice); // 1100

// 示例2: 计算属性求和
const items = [
  { quantity: 3, unitPrice: 10 },
  { quantity: 2, unitPrice: 15 },
  { quantity: 5, unitPrice: 8 },
];
const totalValue = sumBy(items, (item) => item.quantity * item.unitPrice);
console.log(totalValue); // 100 (3*10 + 2*15 + 5*8)

// 示例3: 空数组
console.log(sumBy([], (x) => x.value)); // 0
```

### 高级用法

```typescript
// 示例4: 嵌套对象
interface Order {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

const orders: Order[] = [
  {
    id: 'order1',
    items: [
      { productId: 'p1', quantity: 2, price: 10 },
      { productId: 'p2', quantity: 1, price: 20 },
    ],
  },
  {
    id: 'order2',
    items: [{ productId: 'p3', quantity: 3, price: 15 }],
  },
];

// 计算所有订单的总金额
const totalRevenue = sumBy(orders, (order) => order.items.reduce((sum, item) => sum + item.quantity * item.price, 0));
console.log(totalRevenue); // 85 (40 + 45)

// 示例5: 条件求和
const scores = [
  { student: '张三', score: 85, passed: true },
  { student: '李四', score: 62, passed: false },
  { student: '王五', score: 90, passed: true },
];

// 只计算通过学生的分数
const passedTotal = sumBy(
  scores.filter((s) => s.passed),
  (s) => s.score,
);
console.log(passedTotal); // 175

// 示例6: 字符串长度求和
const messages = [
  { id: 1, text: '你好' },
  { id: 2, text: '世界' },
  { id: 3, text: '测试' },
];
const totalLength = sumBy(messages, (m) => m.text.length);
console.log(totalLength); // 6
```

### 实际应用场景

```typescript
// 示例7: 购物车总价计算
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  discount: number; // 折扣百分比
}

const cartItems: CartItem[] = [
  { productId: '1', name: '笔记本电脑', price: 1000, quantity: 1, discount: 10 },
  { productId: '2', name: '鼠标', price: 50, quantity: 2, discount: 0 },
  { productId: '3', name: '键盘', price: 80, quantity: 1, discount: 15 },
];

const cartTotal = sumBy(cartItems, (item) => {
  const subtotal = item.price * item.quantity;
  const discountAmount = subtotal * (item.discount / 100);
  return subtotal - discountAmount;
});

console.log(`购物车总计: ¥${cartTotal.toFixed(2)}`); // 购物车总计: ¥1068.00

// 示例8: 员工工资统计
interface Employee {
  id: string;
  name: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
}

const employees: Employee[] = [
  { id: 'e1', name: '张三', baseSalary: 5000, bonus: 1000, deductions: 500 },
  { id: 'e2', name: '李四', baseSalary: 6000, bonus: 1500, deductions: 600 },
  { id: 'e3', name: '王五', baseSalary: 5500, bonus: 1200, deductions: 550 },
];

const totalPayroll = sumBy(employees, (emp) => emp.baseSalary + emp.bonus - emp.deductions);
console.log(`工资总额: ¥${totalPayroll}`); // 工资总额: ¥18050

// 示例9: 项目时间统计
interface Task {
  name: string;
  estimatedHours: number;
  actualHours: number;
  completed: boolean;
}

const tasks: Task[] = [
  { name: '设计', estimatedHours: 20, actualHours: 22, completed: true },
  { name: '开发', estimatedHours: 40, actualHours: 45, completed: true },
  { name: '测试', estimatedHours: 15, actualHours: 12, completed: true },
  { name: '部署', estimatedHours: 5, actualHours: 0, completed: false },
];

const totalEstimated = sumBy(tasks, (t) => t.estimatedHours);
const totalActual = sumBy(
  tasks.filter((t) => t.completed),
  (t) => t.actualHours,
);
const variance = totalActual - totalEstimated + tasks.find((t) => !t.completed)!.estimatedHours;

console.log(`预计: ${totalEstimated}小时`); // 80小时
console.log(`实际 (已完成): ${totalActual}小时`); // 79小时
console.log(`偏差: ${variance}小时`); // 4小时

// 示例10: 数据传输统计
interface DataTransfer {
  filename: string;
  sizeInMB: number;
  compressionRatio: number; // 压缩比例 (0-1)
}

const transfers: DataTransfer[] = [
  { filename: 'data1.zip', sizeInMB: 100, compressionRatio: 0.6 },
  { filename: 'data2.zip', sizeInMB: 200, compressionRatio: 0.7 },
  { filename: 'data3.zip', sizeInMB: 150, compressionRatio: 0.65 },
];

const totalOriginalSize = sumBy(transfers, (t) => t.sizeInMB);
const totalCompressedSize = sumBy(transfers, (t) => t.sizeInMB * t.compressionRatio);
const savedSpace = totalOriginalSize - totalCompressedSize;

console.log(`原始: ${totalOriginalSize}MB`); // 450MB
console.log(`压缩后: ${totalCompressedSize}MB`); // 292.5MB
console.log(`节省: ${savedSpace}MB`); // 157.5MB
```

## 交互式示例

```tsx live
function SumByExample() {
  const [items, setItems] = React.useState([
    { name: '商品A', price: 100, quantity: 2 },
    { name: '商品B', price: 50, quantity: 3 },
    { name: '商品C', price: 75, quantity: 1 },
  ]);

  const total = sumBy(items, (item) => item.price * item.quantity);

  const handleQuantityChange = (index, delta) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(0, newItems[index].quantity + delta);
    setItems(newItems);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>sumBy 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <strong>购物清单:</strong>
        <div style={{ marginTop: '10px' }}>
          {items.map((item, index) => (
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
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>单价: ¥{item.price}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleQuantityChange(index, -1)} style={{ padding: '5px 10px' }}>
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)} style={{ padding: '5px 10px' }}>
                  +
                </button>
                <span style={{ minWidth: '60px', textAlign: 'right', color: '#1976d2' }}>
                  ¥{item.price * item.quantity}
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
        <strong>总计:</strong>
        <div style={{ fontSize: '24px', color: '#1976d2', fontWeight: 'bold', marginTop: '10px' }}>¥{total}</div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 当数组为空时，函数返回 `0`
- ⚠️ **边界情况**: 当参数不是数组时，函数返回 `0`
- 💡 **性能提示**: 函数时间复杂度为 O(n)，使用 `reduce` 实现
- 🔒 **类型安全**: 使用泛型 `<T>` 支持任意类型的数组
- 📚 **最佳实践**: iteratee 函数应该返回数字类型，否则可能导致 `NaN` 结果
- 🎯 **返回值**: 返回的是数字总和，不是数组元素
- ⚡ **浮点数**: 对于涉及金额的计算，注意 JavaScript 浮点数精度问题，建议使用专门的金额处理库

## 相关函数

- [`meanBy`](./meanBy) - 按条件计算数组元素的平均值
- [`maxBy`](./maxBy) - 按条件获取数组中的最大项
- [`minBy`](./minBy) - 按条件获取数组中的最小项
- [`groupBy`](../collection/groupBy) - 按条件分组数据

## 版本历史

- **v1.0.0** - 初始版本
