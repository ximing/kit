# 预先生成可交互代码块技术方案（简化版）

## 1. 方案概述

### 1.1 需求背景

当前 `generate-api-docs.ts` 脚本在生成 API 文档时，为每个函数生成的可交互代码块（Live Codeblock）只是一个通用的示例片段，缺乏实际的函数演示，用户无法在浏览器中直接看到函数的真实效果。

### 1.2 核心目标

实现一个简洁高效的解决方案：

1. **预先生成真实代码块**：为每个函数预先生成真实的、可在浏览器中运行的交互式代码块
2. **一次性生成**：通过 AI 大模型一次性为所有函数生成高质量示例代码，**无需复杂的自动化脚本**
3. **集中管理代码块**：建立统一的代码块存储和管理机制
4. **文档集成**：在脚本中读取预生成的代码块，并正确替换为真实的代码
5. **易于维护**：采用简单直接的方式，易于理解和维护

### 1.3 核心特性

- 📝 **AI 生成示例**：通过大模型为每个函数生成高质量的交互代码块
- 🎯 **真实可运行代码**：所有代码块都是真实的、经过验证的 React 组件
- 📦 **集中存储**：建立标准化的代码块存储目录
- 🔄 **简单集成**：在文档生成时读取并集成预生成的代码块
- ✅ **质量保证**：人工审查所有生成的代码块
- 🌐 **多语言支持**：支持中英文代码块的独立管理

## 2. 方案细节

### 2.1 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│               AI 大模型生成代码块（一次性）                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. 分析函数文档和用法                                 │   │
│  │ 2. 生成交互式 React 组件                              │   │
│  │ 3. 人工审查和优化                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            代码块存储系统                                     │
│  ├── interactive-examples/                                  │
│  │   ├── array/chunk.tsx                                    │
│  │   ├── object/clone.tsx                                   │
│  │   ├── string/camelCase.tsx                               │
│  │   ├── ... (所有分类的代码块)                             │
│  └── index.ts (导出所有代码块)                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            文档生成脚本（升级版）                             │
│  ├── 读取预生成的代码块                                     │
│  ├── 插入到 MDX 文档中                                      │
│  └── 生成最终的 API 文档                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          生成的 API 文档 (MDX)                               │
│  ├── website/docs/api/array/chunk.md                        │
│  ├── website/docs/api/object/clone.md                       │
│  └── ... (所有 API 文档)                                    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
kit/
├── scripts/
│   └── generate-api-docs.ts              # 升级版文档生成脚本
│
├── interactive-examples/                 # 新增：交互代码块存储目录
│   ├── array/
│   │   ├── chunk.tsx
│   │   ├── compact.tsx
│   │   ├── flatten.tsx
│   │   └── ... (所有 array 函数的代码块)
│   ├── object/
│   │   ├── clone.tsx
│   │   ├── merge.tsx
│   │   └── ... (所有 object 函数的代码块)
│   ├── string/
│   ├── function/
│   ├── number/
│   ├── is/
│   ├── date/
│   ├── promise/
│   ├── collection/
│   ├── math/
│   ├── index.ts                          # 导出所有代码块（手动维护）
│   └── README.md                         # 代码块编写指南
│
└── website/
    └── docs/api/
        ├── array/chunk.md                # 包含预生成的交互代码块
        └── ...
```

### 2.3 代码块生成方式

#### 2.3.1 准备阶段

为每个函数准备以下信息作为 AI 输入：

```typescript
interface FunctionInfo {
  name: string; // 函数名称
  category: string; // 分类（array, object, string 等）
  signature: string; // 函数签名
  description: string; // 函数描述
  params: Array<{
    // 参数列表
    name: string;
    type: string;
    description: string;
  }>;
  returns: {
    // 返回值
    type: string;
    description: string;
  };
  examples: string[]; // 现有的 @example 示例代码
}
```

#### 2.3.2 AI 生成阶段

**AI 生成提示词示例**：

```
函数信息：
- 名称：chunk
- 分类：array
- 签名：chunk<T>(array: T[], size: number): T[][]
- 描述：将数组分割成指定大小的块
- 参数：
  - array: 要分割的数组
  - size: 每个块的大小
- 返回值：分割后的二维数组
- 现有示例：chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

请生成一个可在浏览器中运行的 React 组件，展示这个函数的用法。
要求：
1. 组件必须是默认导出的函数组件
2. 必须导入 @rabjs/kit 中的函数
3. 必须包含实际的函数调用和结果展示
4. 可以包含用户交互（输入、按钮等）
5. 结果应该清晰易读
```

#### 2.3.3 生成的代码块示例

**简单函数示例**：

```tsx
import React, { useState } from 'react';
import { chunk } from '@rabjs/kit';

export default function ChunkExample() {
  const [size, setSize] = useState(2);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = chunk(array, size);

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <label>Chunk size: </label>
        <input type="number" min="1" value={size} onChange={(e) => setSize(Number(e.target.value))} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Output:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}
```

**复杂函数示例**（防抖）：

```tsx
import React, { useState } from 'react';
import { debounce } from '@rabjs/kit';

export default function DebounceExample() {
  const [count, setCount] = useState(0);
  const [lastCallTime, setLastCallTime] = useState(null);

  const debouncedFn = debounce(() => {
    setCount((c) => c + 1);
    setLastCallTime(new Date().toLocaleTimeString());
  }, 500);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={debouncedFn}>Click (debounced, 500ms)</button>
      <p>Count: {count}</p>
      {lastCallTime && <p>Last executed at: {lastCallTime}</p>}
    </div>
  );
}
```

#### 2.3.4 人工审查和优化

**审查清单**：

- ✅ 代码语法正确
- ✅ 代码能在浏览器中运行
- ✅ 正确导入了函数
- ✅ 展示了函数的核心功能
- ✅ 用户交互合理
- ✅ 输出清晰易读
- ✅ 代码风格一致

**优化内容**：

- 改进 UI/UX 设计
- 优化代码可读性
- 添加更多交互选项
- 改进错误处理
- 添加有用的注释

### 2.4 代码块存储格式

#### 2.4.1 单个代码块文件

**文件路径**：`interactive-examples/array/chunk.tsx`

```typescript
/**
 * Interactive example for chunk function
 *
 * @category array
 * @functionName chunk
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2024-01-03
 */

import React, { useState } from 'react';
import { chunk } from '@rabjs/kit';

export default function ChunkExample() {
  const [size, setSize] = useState(2);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = chunk(array, size);

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <label>Chunk size: </label>
        <input
          type="number"
          min="1"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <p><strong>Input:</strong> {JSON.stringify(array)}</p>
        <p><strong>Output:</strong> {JSON.stringify(result)}</p>
      </div>
    </div>
  );
}
```

#### 2.4.2 索引文件

**文件路径**：`interactive-examples/index.ts`

```typescript
// Interactive examples index
// 手动维护，每个分类的代码块都需要在此导出

import ChunkExample from './array/chunk';
import CompactExample from './array/compact';
import FlattenExample from './array/flatten';
// ... 更多导入

export const INTERACTIVE_EXAMPLES = {
  'array/chunk': ChunkExample,
  'array/compact': CompactExample,
  'array/flatten': FlattenExample,
  // ... 更多导出
} as const;

export type ExampleKey = keyof typeof INTERACTIVE_EXAMPLES;

export function getExample(key: ExampleKey) {
  return INTERACTIVE_EXAMPLES[key];
}
```

### 2.5 文档生成脚本的升级

#### 2.5.1 主要变化

```typescript
async function generateFunctionDoc(
  func: FunctionDoc,
  category: string,
  locale: 'en' | 'zh-CN',
  interactiveExamples?: Map<string, string>, // 新增参数
): Promise<string> {
  // ... 现有逻辑 ...

  // 新增：读取预生成的交互代码块
  const exampleKey = `${category}/${func.name}`;
  const interactiveCode = interactiveExamples?.get(exampleKey);

  if (interactiveCode) {
    content += `## ${interactiveText}

\`\`\`tsx live
${interactiveCode}
\`\`\`

`;
  } else {
    // 降级处理：如果没有预生成的代码块，使用占位符
    content += `## ${interactiveText}

> 此函数的交互示例正在编写中，敬请期待。

`;
  }

  return content;
}
```

#### 2.5.2 加载预生成代码块

```typescript
async function loadInteractiveExamples(examplesDir: string): Promise<Map<string, string>> {
  const examples = new Map<string, string>();

  try {
    for (const category of CATEGORIES) {
      const categoryPath = path.join(examplesDir, category);

      if (!fs.existsSync(categoryPath)) {
        console.warn(`Category directory not found: ${categoryPath}`);
        continue;
      }

      const files = await fs.readdir(categoryPath);

      for (const file of files) {
        if (!file.endsWith('.tsx')) continue;

        const filePath = path.join(categoryPath, file);
        const content = await fs.readFile(filePath, 'utf-8');

        // 提取导出的组件代码（去除导入和元数据注释）
        const componentCode = extractComponentCode(content);
        const functionName = file.replace('.tsx', '');

        examples.set(`${category}/${functionName}`, componentCode);
      }
    }
  } catch (error) {
    console.error('Error loading interactive examples:', error);
  }

  return examples;
}

// 提取组件代码的辅助函数
function extractComponentCode(fileContent: string): string {
  const lines = fileContent.split('\n');
  const startIdx = lines.findIndex((line) => line.includes('export default function'));

  if (startIdx === -1) {
    return fileContent;
  }

  return lines.slice(startIdx).join('\n');
}
```

### 2.6 代码块编写指南

#### 2.6.1 命名规范

- **文件名**：使用函数名称，例如 `chunk.tsx`、`debounce.tsx`
- **组件名**：使用 `{FunctionName}Example` 格式
- **默认导出**：每个文件必须导出一个默认的函数组件

#### 2.6.2 代码块结构

```typescript
/**
 * Interactive example for {functionName} function
 *
 * @category {category}
 * @functionName {functionName}
 * @complexity {simple|medium|complex}
 * @generatedBy AI
 * @lastReviewedAt {date}
 */

import React, { useState } from 'react';
import { {functionName} } from '@rabjs/kit';

export default function {FunctionName}Example() {
  // 组件实现
  return (
    <div style={{ padding: '20px' }}>
      {/* UI 内容 */}
    </div>
  );
}
```

#### 2.6.3 设计原则

1. **简洁性**：代码应该简洁清晰，易于理解
2. **功能性**：展示函数的核心功能和用法
3. **交互性**：提供用户交互（输入、按钮等）来演示不同场景
4. **可读性**：输出结果应该清晰易读
5. **浏览器兼容性**：所有代码必须能在现代浏览器中运行

#### 2.6.4 常见模式

**简单函数模式**（数据转换）：

```tsx
export default function ChunkExample() {
  const input = [1, 2, 3, 4, 5];
  const output = chunk(input, 2);

  return (
    <div>
      <p>Input: {JSON.stringify(input)}</p>
      <p>Output: {JSON.stringify(output)}</p>
    </div>
  );
}
```

**复杂函数模式**（需要状态）：

```tsx
export default function DebounceExample() {
  const [count, setCount] = useState(0);
  const debouncedFn = debounce(() => setCount((c) => c + 1), 500);

  return (
    <div>
      <button onClick={debouncedFn}>Click</button>
      <p>Count: {count}</p>
    </div>
  );
}
```

**异步函数模式**（Promise）：

```tsx
export default function DelayExample() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await delay(1000);
    setResult('Done!');
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Execute'}
      </button>
      {result && <p>{result}</p>}
    </div>
  );
}
```

### 2.7 工作流程

```
1. 代码块生成阶段（一次性，约 2-3 天）
   ├─ 收集所有函数的信息
   ├─ 使用 AI 大模型生成代码块（批量）
   ├─ 人工审查和优化
   ├─ 保存到 interactive-examples/ 目录
   └─ 维护 index.ts 索引文件

2. 文档生成阶段（每次构建）
   ├─ 加载预生成的代码块
   ├─ 为每个函数生成 API 文档
   ├─ 替换文档中的占位符为真实代码块
   └─ 输出最终的 MDX 文档

3. 维护阶段（按需）
   ├─ 函数更新时，更新对应的代码块
   ├─ 人工审查新的代码块
   └─ 更新 index.ts 索引文件
```

## 3. TODO 列表

### 阶段一：基础设施（预计 1 天）

- [x] 创建代码块存储目录结构
  - [x] 创建 `interactive-examples/` 目录
  - [x] 为每个分类创建子目录（array, object, string 等）
  - [x] 创建 README.md 编写指南

- [x] 升级文档生成脚本
  - [x] 添加加载预生成代码块的逻辑
  - [x] 修改 `generateFunctionDoc` 函数支持新参数
  - [x] 实现代码块的正确替换
  - [x] 添加代码块不存在时的降级处理

### 阶段二：AI 生成代码块（预计 2-3 天）

#### 2.1 array 模块代码块生成

- [x] 收集 array 模块所有函数信息
  - [x] 为每个 array 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 array 模块代码块
  - [x] 使用 AI 生成所有 array 函数的交互代码块
- [x] 人工审查和优化 array 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 array 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/array/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.2 collection 模块代码块生成

- [x] 收集 collection 模块所有函数信息
  - [x] 为每个 collection 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 collection 模块代码块
  - [x] 使用 AI 生成所有 collection 函数的交互代码块
- [x] 人工审查和优化 collection 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 collection 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/collection/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.3 date 模块代码块生成

- [x] 收集 date 模块所有函数信息
  - [x] 为每个 date 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 date 模块代码块
  - [x] 使用 AI 生成所有 date 函数的交互代码块
- [x] 人工审查和优化 date 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 date 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/date/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.4 function 模块代码块生成

- [x] 收集 function 模块所有函数信息
  - [x] 为每个 function 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 function 模块代码块
  - [x] 使用 AI 生成所有 function 函数的交互代码块
- [x] 人工审查和优化 function 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 function 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/function/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.5 is 模块代码块生成

- [x] 收集 is 模块所有函数信息
  - [x] 为每个 is 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 is 模块代码块
  - [x] 使用 AI 生成所有 is 函数的交互代码块
- [x] 人工审查和优化 is 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 is 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/is/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.6 math 模块代码块生成

- [x] 收集 math 模块所有函数信息
  - [x] 为每个 math 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 math 模块代码块
  - [x] 使用 AI 生成所有 math 函数的交互代码块
- [x] 人工审查和优化 math 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 math 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/math/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.7 number 模块代码块生成

- [x] 收集 number 模块所有函数信息
  - [x] 为每个 number 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 number 模块代码块
  - [x] 使用 AI 生成所有 number 函数的交互代码块
- [x] 人工审查和优化 number 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 number 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/number/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.8 object 模块代码块生成

- [x] 收集 object 模块所有函数信息
  - [x] 为每个 object 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 object 模块代码块
  - [x] 使用 AI 生成所有 object 函数的交互代码块
- [x] 人工审查和优化 object 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 object 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/object/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.9 promise 模块代码块生成

- [x] 收集 promise 模块所有函数信息
  - [x] 为每个 promise 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 promise 模块代码块
  - [x] 使用 AI 生成所有 promise 函数的交互代码块
- [x] 人工审查和优化 promise 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 promise 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/promise/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.10 string 模块代码块生成

- [x] 收集 string 模块所有函数信息
  - [x] 为每个 string 函数准备信息文档
  - [x] 组织成 AI 可处理的格式
- [x] AI 大模型生成 string 模块代码块
  - [x] 使用 AI 生成所有 string 函数的交互代码块
- [x] 人工审查和优化 string 代码块
  - [x] 逐个审查生成的代码块
  - [x] 验证代码的正确性和可运行性
  - [x] 优化代码质量和用户体验
- [x] 保存 string 代码块
  - [x] 保存为 TSX 文件到 `interactive-examples/string/`
  - [x] 添加元数据注释
  - [x] 更新索引文件

#### 2.11 types 模块代码块生成

- [x] 收集 types 模块所有函数信息
  - [x] 确认 types 模块只包含 TypeScript 类型定义
  - [x] 验证 types 模块不在文档生成流程中
- [x] AI 大模型生成 types 模块代码块
  - [x] 确认不需要为类型定义生成交互代码块
- [x] 人工审查和优化 types 代码块
  - [x] 确认 types 模块无可执行函数
  - [x] 确认不需要交互式演示
- [x] 保存 types 代码块
  - [x] 确认不需要创建 TSX 文件
  - [x] types 模块不需要添加到索引文件

> **注意**：types 模块只包含 TypeScript 类型定义（如 `Primitive`、`ObjectType`、`FunctionType` 等），没有可执行的函数，因此不需要创建交互式代码块。类型定义在文档中通过 TypeScript 接口文档展示即可。

### 阶段三：集成和测试（预计 1-2 天）

- [x] 集成测试
  - [x] 运行文档生成脚本
  - [x] 验证代码块正确插入文档
  - [x] 检查所有代码块是否正确显示

- [x] 浏览器测试
  - [x] 在浏览器中运行所有代码块
  - [x] 验证交互功能
  - [x] 验证性能

- [x] 多语言验证
  - [x] 验证英文代码块正常显示
  - [x] 验证中文代码块正常显示

## 4. 验证列表

### 4.1 功能验证

- [x] 代码块生成正常工作
  - [x] 所有 100+ 个函数都有对应的代码块
  - [x] 代码块文件都正确保存
  - [x] 索引文件正确维护

- [x] 文档生成脚本升级正常工作
  - [x] 能正确加载预生成的代码块
  - [x] 能正确替换文档中的占位符
  - [x] 能处理代码块不存在的情况

- [x] 代码块质量
  - [x] 所有代码块都能在浏览器中运行
  - [x] 所有代码块都展示了函数的核心功能
  - [x] 所有代码块都包含合理的用户交互
  - [x] 所有代码块的输出都清晰易读

### 4.2 集成验证

- [x] 生成流程验证
  - [x] `npm run docs:generate` 执行成功
  - [x] 所有 API 文档都包含交互代码块
  - [x] 代码块在文档中正确显示

- [x] 浏览器验证
  - [x] 完整的构建流程成功
  - [x] 生成的文档在浏览器中正确显示
  - [x] 交互代码块在浏览器中可运行
  - [x] Chrome 70+ 正常运行
  - [x] Safari 12+ 正常运行

## 5. 预期成果

### 5.1 输出物

1. **交互代码块库**
   - 100+ 个预生成的交互代码块
   - 完整的索引系统
   - 元数据和文档

2. **增强的 API 文档**
   - 每个函数都有真实的、可运行的代码示例
   - 用户可以直接在浏览器中试验函数
   - 更好的学习体验

3. **维护指南**
   - 代码块编写指南
   - 更新流程文档
   - 故障排查指南

### 5.2 效果指标

- **用户体验**：用户可以在文档中直接运行函数示例
- **学习效率**：通过交互式示例快速理解函数用法
- **质量保证**：所有代码块都经过人工审查
- **可维护性**：简单清晰的代码块管理方式

## 6. 实施时间表

| 阶段 | 任务          | 预计时间 | 依赖   |
| ---- | ------------- | -------- | ------ |
| 1    | 基础设施搭建  | 1 天     | 无     |
| 2    | AI 生成代码块 | 2-3 天   | 阶段 1 |
| 3    | 集成和测试    | 1-2 天   | 阶段 2 |

**总计**：约 4-6 天（工作日）

## 7. 风险和挑战

### 7.1 技术风险

1. **某些函数无法演示**
   - 某些函数可能无法在浏览器中有意义地演示
   - 应对：提供静态示例和文本说明作为备选

2. **AI 生成质量**
   - AI 生成的代码可能需要手工调整
   - 应对：人工审查和优化每个代码块

### 7.2 维护风险

1. **代码块过时**
   - 函数更新后，对应的代码块可能过时
   - 应对：在函数更新时同时更新代码块

2. **多语言维护**
   - 需要维护中英文两个版本的代码块
   - 应对：使用统一的代码块，通过注释支持多语言

## 8. 后续优化方向

1. **代码块版本管理**：支持不同版本的代码块
2. **性能基准测试**：在代码块中集成性能测试
3. **社区贡献**：允许用户提交改进的代码块
4. **高级交互**：支持更复杂的交互场景（如动画、实时数据等）
