# 示例: chunk 函数文档

> 这是使用模板创建的 chunk 函数文档示例，展示高质量 API 文档的标准格式

## 英文版文档示例

### 文件路径: `website/docs/api/array/chunk.md`

````markdown
---
id: chunk
title: chunk
description: 'Splits an array into chunks of a specified size'
---

# `chunk`

将数组拆分为指定大小的分块。这是一个非常实用的函数，常用于分页处理、批量操作和数据组织。

## 语法

```typescript
function chunk<T>(array: T[], size: number): T[][];
```
````

## 参数

| 参数名  | 类型     | 必填 | 默认值 | 描述                         |
| ------- | -------- | ---- | ------ | ---------------------------- |
| `array` | `T[]`    | ✅   | -      | 要拆分的数组                 |
| `size`  | `number` | ✅   | -      | 每个分块的大小，必须是正整数 |

## 返回值

- **类型**: `T[][]`
- **描述**: 包含分块的二维数组。如果输入数组为空或 size 无效，返回空数组。

## 示例

### 基础用法

```typescript
import { chunk } from '@rabjs/kit';

// 示例1: 将数字数组分块
const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunked = chunk(numbers, 3);
console.log(chunked); // [[1, 2, 3], [4, 5, 6], [7]]

// 示例2: 将字符串数组分块
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
const fruitChunks = chunk(fruits, 2);
console.log(fruitChunks); // [['apple', 'banana'], ['orange', 'grape'], ['kiwi']]
```

### 高级用法

```typescript
// 示例3: 处理对象数组
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
];
const userBatches = chunk(users, 3);
console.log(userBatches);
// [
//   [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }],
//   [{ id: 4, name: 'David' }, { id: 5, name: 'Eve' }]
// ]

// 示例4: 与其他函数组合使用
const processInBatches = (data: number[], batchSize: number) => {
  return chunk(data, batchSize).map((batch) => batch.reduce((sum, num) => sum + num, 0));
};
const results = processInBatches([1, 2, 3, 4, 5, 6], 2);
console.log(results); // [3, 7, 11] (每个分块的和)
```

### 实际应用场景

```typescript
// 示例5: 分页显示数据
function paginateData<T>(data: T[], itemsPerPage: number = 10) {
  const pages = chunk(data, itemsPerPage);

  return {
    totalPages: pages.length,
    totalItems: data.length,
    getPage: (pageIndex: number) => pages[pageIndex] || [],
    pages,
  };
}

// 使用示例
const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));
const pagination = paginateData(products, 10);
console.log(pagination.totalPages); // 3
console.log(pagination.getPage(0).length); // 10
console.log(pagination.getPage(2).length); // 5
```

## 交互式示例

```tsx live
function ChunkExample() {
  const [input, setInput] = React.useState('1,2,3,4,5,6,7,8,9');
  const [size, setSize] = React.useState(3);
  const [result, setResult] = React.useState(null);

  const handleChunk = () => {
    try {
      const array = input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      const chunked = chunk(array, size);
      setResult(chunked);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleChunk();
  }, [input, size]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>chunk 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>输入数组 (用逗号分隔): </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '200px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>分块大小: </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min="1"
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 当 `size` 小于等于 0 时，函数返回空数组
- ⚠️ **边界情况**: 当输入不是数组时，函数返回空数组
- 💡 **性能提示**: 对于大数组，该函数具有 O(n) 时间复杂度，性能良好
- 🔒 **类型安全**: 函数支持泛型，保持输入和输出的类型一致性
- 📚 **最佳实践**: 在使用前验证 `size` 参数，确保它是正整数

## 相关函数

- [`flatten`](./flatten) - 将嵌套数组展平为一维数组
- [`partition`](../collection/partition) - 按条件将数组分为两部分
- [`take`](./take) - 从数组开头取指定数量的元素
- [`drop`](./drop) - 从数组开头跳过指定数量的元素

## 版本历史

- **v0.0.1** - 初始版本

````

---

## 中文版文档示例

### 文件路径: `website/i18n/zh-CN/docusaurus-plugin-content-docs/current/api/array/chunk.md`

```markdown
---
id: chunk
title: chunk
description: "将数组拆分为指定大小的分块"
---

# `chunk`

将数组拆分为指定大小的分块。这是一个非常实用的函数，常用于分页处理、批量操作和数据组织。

## 语法

```typescript
function chunk<T>(array: T[], size: number): T[][]
````

## 参数

| 参数名  | 类型     | 必填 | 默认值 | 描述                         |
| ------- | -------- | ---- | ------ | ---------------------------- |
| `array` | `T[]`    | ✅   | -      | 要拆分的数组                 |
| `size`  | `number` | ✅   | -      | 每个分块的大小，必须是正整数 |

## 返回值

- **类型**: `T[][]`
- **描述**: 包含分块的二维数组。如果输入数组为空或 size 无效，返回空数组。

## 示例

### 基础用法

```typescript
import { chunk } from '@rabjs/kit';

// 示例1: 将数字数组分块
const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunked = chunk(numbers, 3);
console.log(chunked); // [[1, 2, 3], [4, 5, 6], [7]]

// 示例2: 将字符串数组分块
const fruits = ['苹果', '香蕉', '橙子', '葡萄', '猕猴桃'];
const fruitChunks = chunk(fruits, 2);
console.log(fruitChunks); // [['苹果', '香蕉'], ['橙子', '葡萄'], ['猕猴桃']]
```

### 高级用法

```typescript
// 示例3: 处理对象数组
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
];
const userBatches = chunk(users, 3);
console.log(userBatches);
// [
//   [{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 3, name: '王五' }],
//   [{ id: 4, name: '赵六' }, { id: 5, name: '钱七' }]
// ]

// 示例4: 与其他函数组合使用
const processInBatches = (data: number[], batchSize: number) => {
  return chunk(data, batchSize).map((batch) => batch.reduce((sum, num) => sum + num, 0));
};
const results = processInBatches([1, 2, 3, 4, 5, 6], 2);
console.log(results); // [3, 7, 11] (每个分块的和)
```

### 实际应用场景

```typescript
// 示例5: 分页显示数据
function paginateData<T>(data: T[], itemsPerPage: number = 10) {
  const pages = chunk(data, itemsPerPage);

  return {
    totalPages: pages.length,
    totalItems: data.length,
    getPage: (pageIndex: number) => pages[pageIndex] || [],
    pages,
  };
}

// 使用示例
const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `商品 ${i + 1}`,
}));
const pagination = paginateData(products, 10);
console.log(pagination.totalPages); // 3
console.log(pagination.getPage(0).length); // 10
console.log(pagination.getPage(2).length); // 5
```

## 交互式示例

```tsx live
function ChunkExample() {
  const [input, setInput] = React.useState('1,2,3,4,5,6,7,8,9');
  const [size, setSize] = React.useState(3);
  const [result, setResult] = React.useState(null);

  const handleChunk = () => {
    try {
      const array = input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      const chunked = chunk(array, size);
      setResult(chunked);
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleChunk();
  }, [input, size]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>chunk 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          <label>输入数组 (用逗号分隔): </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '200px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>分块大小: </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min="1"
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 当 `size` 小于等于 0 时，函数返回空数组
- ⚠️ **边界情况**: 当输入不是数组时，函数返回空数组
- 💡 **性能提示**: 对于大数组，该函数具有 O(n) 时间复杂度，性能良好
- 🔒 **类型安全**: 函数支持泛型，保持输入和输出的类型一致性
- 📚 **最佳实践**: 在使用前验证 `size` 参数，确保它是正整数

## 相关函数

- [`flatten`](./flatten) - 将嵌套数组展平为一维数组
- [`partition`](../collection/partition) - 按条件将数组分为两部分
- [`take`](./take) - 从数组开头取指定数量的元素
- [`drop`](./drop) - 从数组开头跳过指定数量的元素

## 版本历史

- **v0.0.1** - 初始版本

```

---

## 📋 应用这个示例的步骤

1. **复制模板内容** - 使用上面的内容作为基础
2. **替换占位符** - 将 `{functionName}` 等占位符替换为实际函数信息
3. **调整示例代码** - 根据函数的实际功能编写合适的示例
4. **测试交互式示例** - 确保 React 组件能正常工作
5. **检查链接** - 验证相关函数的链接是否正确
6. **双语对照** - 确保中英文版本内容一致

这个示例展示了如何将抽象的模板转换为具体的、高质量的 API 文档。
```
