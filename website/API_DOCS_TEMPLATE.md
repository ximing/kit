# API 文档模板和规范

> 用于手动创建高质量 API 文档的标准模板和编写规范

## 📋 文档模板

### 英文版模板 (`website/docs/api/{category}/{function}.md`)

````markdown
---
id: { functionName }
title: { functionName }
description: '{简短的功能描述，用于SEO}'
---

# `{functionName}`

{详细的功能描述，说明函数的作用和使用场景}

## 语法

```typescript
{完整的函数签名，包含所有重载}
```
````

## 参数

| 参数名   | 类型    | 必填 | 默认值         | 描述            |
| -------- | ------- | ---- | -------------- | --------------- |
| `param1` | `Type1` | ✅   | -              | 参数1的详细说明 |
| `param2` | `Type2` | ❌   | `defaultValue` | 参数2的详细说明 |

## 返回值

- **类型**: `ReturnType`
- **描述**: 返回值的详细说明

## 示例

### 基础用法

```typescript
import { {functionName} } from '@rabjs/kit';

// 示例1: 最基本的用法
const result1 = {functionName}(basicParams);
console.log(result1); // 预期输出

// 示例2: 带选项的用法
const result2 = {functionName}(params, options);
console.log(result2); // 预期输出
```

### 高级用法

```typescript
// 示例3: 复杂场景的使用
const complexResult = { functionName }(complexParams);

// 示例4: 与其他函数组合使用
const combinedResult = otherFunction({ functionName }(params));
```

### 实际应用场景

```typescript
// 示例5: 实际项目中的使用场景
function realWorldExample() {
  // 具体的业务场景代码
  const data = getData();
  const processed = { functionName }(data, {
    // 实际的配置选项
  });
  return processed;
}
```

## 交互式示例

```tsx live
function {FunctionName}Example() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleProcess = () => {
    try {
      const processed = {functionName}(input);
      setResult(processed);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div style={{padding: '20px', background: '#f5f5f5', borderRadius: '8px'}}>
      <h4>{functionName} 交互式示例</h4>
      <div style={{marginBottom: '10px'}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入测试数据"
          style={{marginRight: '10px', padding: '5px'}}
        />
        <button onClick={handleProcess} style={{padding: '5px 10px'}}>
          执行
        </button>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{background: 'white', padding: '10px', marginTop: '5px'}}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 说明函数在边界条件下的行为
- 💡 **性能提示**: 性能相关的注意事项和优化建议
- 🔒 **类型安全**: TypeScript 类型相关的注意事项

## 相关函数

- [`relatedFunction1`](./related-function1) - 相关功能的函数
- [`relatedFunction2`](../other-category/related-function2) - 其他分类的相关函数

## 版本历史

- **v1.0.0** - 初始版本
- **v1.1.0** - 添加了新的选项参数

````

### 中文版模板 (`website/i18n/zh-CN/docusaurus-plugin-content-docs/current/api/{category}/{function}.md`)

```markdown
---
id: {functionName}
title: {functionName}
description: "{简短的功能描述，用于SEO}"
---

# `{functionName}`

{详细的功能描述，说明函数的作用和使用场景}

## 语法

```typescript
{完整的函数签名，包含所有重载}
````

## 参数

| 参数名   | 类型    | 必填 | 默认值         | 描述            |
| -------- | ------- | ---- | -------------- | --------------- |
| `param1` | `Type1` | ✅   | -              | 参数1的详细说明 |
| `param2` | `Type2` | ❌   | `defaultValue` | 参数2的详细说明 |

## 返回值

- **类型**: `ReturnType`
- **描述**: 返回值的详细说明

## 示例

### 基础用法

```typescript
import { {functionName} } from '@rabjs/kit';

// 示例1: 最基本的用法
const result1 = {functionName}(basicParams);
console.log(result1); // 预期输出

// 示例2: 带选项的用法
const result2 = {functionName}(params, options);
console.log(result2); // 预期输出
```

### 高级用法

```typescript
// 示例3: 复杂场景的使用
const complexResult = { functionName }(complexParams);

// 示例4: 与其他函数组合使用
const combinedResult = otherFunction({ functionName }(params));
```

### 实际应用场景

```typescript
// 示例5: 实际项目中的使用场景
function realWorldExample() {
  // 具体的业务场景代码
  const data = getData();
  const processed = { functionName }(data, {
    // 实际的配置选项
  });
  return processed;
}
```

## 交互式示例

```tsx live
function {FunctionName}Example() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleProcess = () => {
    try {
      const processed = {functionName}(input);
      setResult(processed);
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  return (
    <div style={{padding: '20px', background: '#f5f5f5', borderRadius: '8px'}}>
      <h4>{functionName} 交互式示例</h4>
      <div style={{marginBottom: '10px'}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入测试数据"
          style={{marginRight: '10px', padding: '5px'}}
        />
        <button onClick={handleProcess} style={{padding: '5px 10px'}}>
          执行
        </button>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{background: 'white', padding: '10px', marginTop: '5px'}}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 说明函数在边界条件下的行为
- 💡 **性能提示**: 性能相关的注意事项和优化建议
- 🔒 **类型安全**: TypeScript 类型相关的注意事项

## 相关函数

- [`relatedFunction1`](./related-function1) - 相关功能的函数
- [`relatedFunction2`](../other-category/related-function2) - 其他分类的相关函数

## 版本历史

- **v1.0.0** - 初始版本
- **v1.1.0** - 添加了新的选项参数

````

---

## 📝 编写规范

### 1. 文件命名规范

- **英文文档**: `website/docs/api/{category}/{functionName}.md`
- **中文文档**: `website/i18n/zh-CN/docusaurus-plugin-content-docs/current/api/{category}/{functionName}.md`
- **文件名**: 与函数名完全一致，使用 camelCase

### 2. Frontmatter 规范

```yaml
---
id: functionName           # 与函数名一致
title: functionName        # 与函数名一致
description: "简短描述"     # 50-80字符，用于SEO
---
````

### 3. 标题结构规范

```markdown
# `functionName` # H1: 函数名，使用代码格式

## 语法 # H2: 必须包含

## 参数 # H2: 如果有参数则必须包含

## 返回值 # H2: 必须包含

## 示例 # H2: 必须包含，至少3个示例

### 基础用法 # H3: 示例子分类

### 高级用法 # H3: 示例子分类

### 实际应用场景 # H3: 示例子分类

## 交互式示例 # H2: 必须包含

## 注意事项 # H2: 可选，但建议包含

## 相关函数 # H2: 可选，但建议包含

## 版本历史 # H2: 可选
```

### 4. TypeScript 类型规范

#### 函数签名格式

```typescript
// 单一签名
function functionName<T>(param: T): ReturnType;

// 多重载
function functionName(param: string): string;
function functionName(param: number): number;
function functionName<T>(param: T): T;
```

#### 泛型参数说明

```typescript
/**
 * @template T - 输入数组的元素类型
 * @template U - 映射函数的返回类型
 */
function map<T, U>(array: T[], mapper: (item: T) => U): U[];
```

### 5. 参数表格规范

| 列名   | 说明                                  |
| ------ | ------------------------------------- |
| 参数名 | 使用代码格式 `paramName`              |
| 类型   | 使用代码格式 `TypeName`，支持联合类型 |
| 必填   | ✅ 必填，❌ 可选                      |
| 默认值 | 使用代码格式，无默认值用 `-`          |
| 描述   | 详细说明参数的作用和注意事项          |

示例：

```markdown
| 参数名    | 类型           | 必填 | 默认值 | 描述                       |
| --------- | -------------- | ---- | ------ | -------------------------- |
| `array`   | `T[]`          | ✅   | -      | 要处理的数组               |
| `size`    | `number`       | ✅   | -      | 每个分块的大小，必须大于 0 |
| `options` | `ChunkOptions` | ❌   | `{}`   | 可选的配置选项             |
```

### 6. 示例代码规范

#### 基本要求

- 每个函数至少提供 **3个不同类型** 的示例
- 代码必须是 **可执行的**，不能有语法错误
- 包含 **预期输出** 的注释
- 使用 **真实的、有意义的** 数据

#### 示例分类

1. **基础用法**: 最简单的使用方式，1-2个示例
2. **高级用法**: 复杂参数、组合使用，1-2个示例
3. **实际应用场景**: 真实业务场景，1个示例

#### 代码格式

```typescript
import { functionName } from '@rabjs/kit';

// 示例1: 描述这个示例的目的
const input = [1, 2, 3, 4, 5];
const result = functionName(input, 2);
console.log(result); // [[1, 2], [3, 4], [5]]

// 示例2: 另一个使用场景
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];
const grouped = functionName(users, (user) => user.age > 25);
console.log(grouped); // { true: [Bob], false: [Alice] }
```

### 7. 交互式示例规范

#### 基本要求

- 每个函数都必须有一个交互式示例
- 使用 React Hook (useState) 管理状态
- 提供用户输入界面
- 实时显示结果
- 包含错误处理

#### 组件命名

- 组件名: `{FunctionName}Example` (PascalCase)
- 函数名首字母大写

#### 样式规范

```tsx
<div
  style={{
    padding: '20px',
    background: '#f5f5f5',
    borderRadius: '8px',
  }}
>
  <h4>{functionName} 交互式示例</h4>
  {/* 输入控件 */}
  {/* 执行按钮 */}
  {/* 结果显示 */}
</div>
```

### 8. 注意事项规范

使用图标和分类组织注意事项：

```markdown
## 注意事项

- ⚠️ **边界情况**: 当数组为空时，函数返回空数组
- 💡 **性能提示**: 对于大数组，考虑使用流式处理
- 🔒 **类型安全**: 确保传入的 size 参数为正整数
- 🐛 **常见错误**: 避免传入 0 或负数作为 size 参数
- 📚 **最佳实践**: 在处理用户输入时，先验证数据格式
```

### 9. 相关函数规范

```markdown
## 相关函数

- [`relatedFunction1`](./related-function1) - 简短的功能说明
- [`relatedFunction2`](../other-category/related-function2) - 简短的功能说明
- [`relatedFunction3`](/docs/api/category/related-function3) - 绝对路径引用
```

### 10. 版本历史规范

```markdown
## 版本历史

- **v1.2.0** - 添加了 `options` 参数支持
- **v1.1.0** - 优化了性能，支持大数组处理
- **v1.0.0** - 初始版本
```

---

## 🎯 质量检查清单

### 内容完整性

- [ ] 包含所有必需的章节 (语法、参数、返回值、示例、交互式示例)
- [ ] 至少3个不同类型的代码示例
- [ ] 交互式示例功能正常
- [ ] 类型定义准确完整

### 代码质量

- [ ] 所有代码示例可执行
- [ ] 包含预期输出注释
- [ ] 使用真实、有意义的数据
- [ ] 错误处理得当

### 文档质量

- [ ] 语言表达清晰简洁
- [ ] 技术术语使用准确
- [ ] 格式规范统一
- [ ] 链接引用正确

### 用户体验

- [ ] 从简单到复杂的示例顺序
- [ ] 实际应用场景贴近真实需求
- [ ] 注意事项覆盖常见问题
- [ ] 相关函数推荐有价值

---

## 📚 参考资源

### 优秀文档示例

- [Lodash 文档](https://lodash.com/docs/) - 参数表格和示例
- [Ramda 文档](https://ramdajs.com/docs/) - 函数式编程示例
- [Date-fns 文档](https://date-fns.org/docs/) - 类型定义和用法

### 工具推荐

- **VS Code 插件**: Markdown Preview Enhanced
- **类型检查**: TypeScript Compiler
- **代码格式化**: Prettier
- **示例验证**: 可以在项目中运行示例代码进行验证

---

**创建时间**: 2026-01-03
**适用版本**: @rabjs/kit v1.x
**维护状态**: 活跃维护
