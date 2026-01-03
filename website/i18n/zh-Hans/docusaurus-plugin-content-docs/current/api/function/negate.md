---
id: negate
title: negate
description: '创建一个函数，否定谓词函数的结果'
---

# `negate`

创建一个函数，否定谓词函数的结果。这对于反转布尔逻辑、创建相反条件和使用反演谓词进行过滤很有用。

## 语法

```typescript
function negate<T extends (...args: any[]) => boolean>(predicate: T): T;
```

## 参数

| 参数名      | 类型                                    | 必填 | 默认值 | 描述             |
| ----------- | --------------------------------------- | ---- | ------ | ---------------- |
| `predicate` | `T extends (...args: any[]) => boolean` | ✅   | -      | 要否定的谓词函数 |

## 返回值

- **类型**: `T`
- **描述**: 返回新函数，返回谓词的相反布尔值。

## 示例

### 基础用法

```typescript
import { negate } from '@rabjs/kit';

// 示例1: 否定简单谓词
const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isOdd(3)); // => true
console.log(isOdd(4)); // => false

// 示例2: 否定对象属性检查
const isActive = (user: { active: boolean }) => user.active;
const isInactive = negate(isActive);

const users = [
  { name: '张三', active: true },
  { name: '李四', active: false },
  { name: '王五', active: true },
];

console.log(users.filter(isInactive)); // => [{ name: '李四', active: false }]
```

### 高级用法

```typescript
// 示例3: 否定复杂谓词
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isInvalidEmail = negate(isValidEmail);

console.log(isInvalidEmail('alice@example.com')); // => false
console.log(isInvalidEmail('invalid-email')); // => true

// 示例4: 与数组方法结合
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const isMultipleOfThree = (n: number) => n % 3 === 0;
const isNotMultipleOfThree = negate(isMultipleOfThree);

console.log(numbers.filter(isNotMultipleOfThree));
// => [1, 2, 4, 5, 7, 8, 10]
```

### 实际应用场景

```typescript
// 示例5: 用户过滤和权限检查
class UserManager {
  private users = [
    { id: 1, name: '张三', admin: true, active: true },
    { id: 2, name: '李四', admin: false, active: true },
    { id: 3, name: '王五', admin: false, active: false },
    { id: 4, name: '赵六', admin: true, active: false },
  ];

  isAdmin(user: any) {
    return user.admin;
  }

  isActive(user: any) {
    return user.active;
  }

  getRegularUsers() {
    // 获取不是管理员的用户
    return this.users.filter(negate(this.isAdmin.bind(this)));
  }

  getInactiveUsers() {
    // 获取不活跃的用户
    return this.users.filter(negate(this.isActive.bind(this)));
  }

  getInactiveRegularUsers() {
    // 获取既不是管理员也不活跃的用户
    const notAdmin = negate(this.isAdmin.bind(this));
    const notActive = negate(this.isActive.bind(this));
    return this.users.filter((user) => notAdmin(user) && notActive(user));
  }
}

const manager = new UserManager();
console.log(manager.getRegularUsers());
// => [{ id: 2, name: '李四', ... }, { id: 3, name: '王五', ... }]

console.log(manager.getInactiveUsers());
// => [{ id: 3, name: '王五', ... }, { id: 4, name: '赵六', ... }]

console.log(manager.getInactiveRegularUsers());
// => [{ id: 3, name: '王五', ... }]
```

## 交互式示例

```tsx live
function NegateExample() {
  const [numbers, setNumbers] = React.useState('1,2,3,4,5,6,7,8,9,10');
  const [result, setResult] = React.useState([]);

  const isEven = (n) => n % 2 === 0;
  const isOdd = negate(isEven);

  const handleFilter = () => {
    try {
      const nums = numbers
        .split(',')
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n));
      const odd = nums.filter(isOdd);
      setResult(odd);
    } catch (error) {
      setResult([]);
    }
  };

  React.useEffect(() => {
    handleFilter();
  }, [numbers]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>否定交互式示例</h4>
      <p>过滤掉偶数（保留奇数）:</p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>数字（逗号分隔）:</label>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>输入:</strong> {numbers}
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>奇数:</strong> {result.join(', ')}
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **布尔返回**: 谓词函数必须返回布尔值。否定将 true 反演为 false，反之亦然。
- 💡 **可读性**: 使用 `negate` 可以使代码比内联写 `!predicate(...)` 更易读。
- 🔒 **类型安全**: 返回的函数保持与原始谓词相同的类型。
- 🐛 **常见错误**: 在不返回布尔值的函数上使用否定会产生意外结果。
- 📚 **最佳实践**: 使用否定为过滤和条件逻辑创建相反条件。

## 相关函数

- [`partial`](./partial) - 为函数部分应用参数
- [`bind`](./bind) - 绑定 `this` 上下文并部分应用参数
- [`compose`](./compose) - 从右到左组合函数
- [`pipe`](./pipe) - 从左到右组合函数

## 版本历史

- **v0.0.1** - 初始版本
