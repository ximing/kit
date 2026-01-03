---
id: template
title: template
description: '将模板占位符替换为数据对象中的值'
---

# `template`

将模板占位符替换为数据对象中的值。支持多种占位符格式：`<%= %>`、`${}`和`{}`。这对于创建动态字符串、电子邮件模板和消息格式化很有用。

## 语法

```typescript
function template(str: string, data?: Record<string, any>): string;
```

## 参数

| 参数名 | 类型                  | 必填 | 默认值 | 描述                   |
| ------ | --------------------- | ---- | ------ | ---------------------- |
| `str`  | `string`              | ✅   | -      | 包含占位符的模板字符串 |
| `data` | `Record<string, any>` | ❌   | -      | 包含占位符值的数据对象 |

## 返回值

- **类型**: `string`
- **描述**: 占位符被数据对象中的相应值替换的模板字符串。如果找不到占位符键，则将其替换为空字符串。

## 支持的占位符格式

- `<%= key %>` - ERB 风格占位符
- `${ key }` - 模板字符串风格
- `{ key }` - 花括号风格

## 示例

### 基础用法

```typescript
import { template } from '@rabjs/kit';

// 示例1: ERB 风格占位符
const str1 = template('Hello <%= name %>', { name: 'World' });
console.log(str1); // 'Hello World'

// 示例2: 模板字符串风格
const str2 = template('${name} is ${age} years old', { name: 'John', age: 30 });
console.log(str2); // 'John is 30 years old'

// 示例3: 花括号风格
const str3 = template('Welcome, {name}!', { name: 'Alice' });
console.log(str3); // 'Welcome, Alice!'
```

### 高级用法

```typescript
// 示例4: 混合占位符格式
const str4 = template('User: <%= user %>, Age: ${age}, Status: {status}', { user: 'Bob', age: 25, status: 'active' });
console.log(str4); // 'User: Bob, Age: 25, Status: active'

// 示例5: 缺少的键（替换为空字符串）
const str5 = template('Hello <%= name %>, your email is <%= email %>', { name: 'John' });
console.log(str5); // 'Hello John, your email is '

// 示例6: 没有提供数据
const str6 = template('Hello <%= name %>');
console.log(str6); // 'Hello '
```

### 实际应用场景

```typescript
// 示例7: 电子邮件模板
function generateEmailBody(user: { name: string; email: string; orderId: string }) {
  const emailTemplate = `
    尊敬的 <%= name %>，
    
    感谢您的订单。您的订单 ID 是：<%= orderId %>
    确认电子邮件已发送到 <%= email %>。
    
    此致
    敬礼
  `;
  return template(emailTemplate, user);
}

console.log(
  generateEmailBody({
    name: '张三',
    email: 'zhangsan@example.com',
    orderId: 'ORD-12345',
  }),
);

// 示例8: 动态消息格式化
function formatMessage(message: string, variables: Record<string, any>): string {
  return template(message, variables);
}

const message = 'Hello {firstName}，你有 {count} 条来自 {sender} 的新消息';
const result = formatMessage(message, {
  firstName: '张三',
  count: 5,
  sender: '李四',
});
console.log(result); // 'Hello 张三，你有 5 条来自 李四 的新消息'

// 示例9: SQL 查询构建器（仅用于演示）
function buildQuery(template: string, params: Record<string, any>): string {
  return template(template, params);
}

const queryTemplate = 'SELECT * FROM users WHERE id = ${id} AND name = ${name}';
const query = buildQuery(queryTemplate, { id: 123, name: 'John' });
console.log(query); // 'SELECT * FROM users WHERE id = 123 AND name = John'
```

## 交互式示例

```tsx live
function TemplateExample() {
  const [tpl, setTpl] = React.useState('Hello <%= name %>, you have ${count} messages');
  const [name, setName] = React.useState('Alice');
  const [count, setCount] = React.useState('5');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(template(tpl, { name, count }));
  }, [tpl, name, count]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>template 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>模板字符串:</label>
        <input
          type="text"
          value={tpl}
          onChange={(e) => setTpl(e.target.value)}
          placeholder="输入模板，使用 <%= name %>, ${key}, 或 {key}"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>名称:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入名称"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>数量:</label>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="输入数量"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', borderRadius: '4px' }}>
          {result}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 数据中缺少的键被替换为空字符串
- ⚠️ **边界情况**: 非字符串输入返回空字符串
- ⚠️ **没有提供数据**: 返回模板字符串原样
- 💡 **多种格式**: 所有三种占位符格式可以混合在同一模板中
- 💡 **性能提示**: 对于典型的模板字符串效率很高
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于电子邮件模板、动态消息和面向用户的字符串

## 相关函数

- [`truncate`](./truncate) - 截断字符串到最大长度
- [`camelCase`](./camelCase) - 转换为驼峰命名
- [`capitalize`](./capitalize) - 首字符大写

## 版本历史

- **v1.0.0** - 初始版本
