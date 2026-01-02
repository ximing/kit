# 构建指南

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 构建项目

```bash
npm run build
```

### 开发模式

```bash
npm run build:cjs    # 构建 CommonJS
npm run build:esm    # 构建 ES Module
npm run build:types  # 生成类型声明
```

## 构建架构

### 三层构建系统

```
┌─────────────────────────────────────────────────────┐
│              npm run build                          │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
   build:clean build:cjs build:esm build:types
        │        │        │        │
        ▼        ▼        ▼        ▼
      清理    Rollup    Rollup   TypeScript
              (CJS)     (ESM)    (Types)
        │        │        │        │
        └────────┼────────┼────────┘
                 ▼
            dist/ 目录
```

### 环境配置

| 环境    | 输出格式   | Target | 配置文件                   | 输出目录      |
| ------- | ---------- | ------ | -------------------------- | ------------- |
| Node.js | CommonJS   | ES2020 | `tsconfig.prod.cjs.json`   | `dist/cjs/`   |
| 浏览器  | ES Module  | ES2020 | `tsconfig.prod.esm.json`   | `dist/esm/`   |
| 类型    | TypeScript | ES2020 | `tsconfig.prod.types.json` | `dist/types/` |

## 输出产物

### CommonJS (dist/cjs/)

```
dist/cjs/
├── index.js                    # 主入口
├── index.js.map               # 源码映射
├── array/
│   ├── index.js
│   └── index.js.map
├── object/
│   ├── index.js
│   └── index.js.map
└── ... (其他模块)
```

**特点**：

- 使用 `'use strict'` 模式
- 支持 `require()` 导入
- 最小化垫片代码
- 完整的 tree-shaking 支持

### ES Module (dist/esm/)

```
dist/esm/
├── index.js                    # 主入口
├── index.js.map               # 源码映射
├── array/
│   ├── index.js
│   └── index.js.map
├── object/
│   ├── index.js
│   └── index.js.map
└── ... (其他模块)
```

**特点**：

- 使用 ES Module 语法
- 支持 `import` 导入
- 优化的模块结构
- 完整的 tree-shaking 支持

### 类型声明 (dist/types/)

```
dist/types/
├── index.d.ts                  # 主入口类型
├── index.d.ts.map             # 源码映射
├── array/
│   ├── index.d.ts
│   └── index.d.ts.map
├── object/
│   ├── index.d.ts
│   └── index.d.ts.map
└── ... (其他模块)
```

**特点**：

- 完整的 TypeScript 类型定义
- 源码映射支持
- IDE 智能提示

## 导入方式

所有以下导入方式都支持完整的 tree-shaking：

### 1. 从主入口导入（推荐用于多个函数）

```typescript
import { chunk, flatten, compact } from '@rabjs/kit';
import { clone, merge, pick } from '@rabjs/kit';
```

### 2. 从子模块导入（推荐用于同一类型的函数）

```typescript
import { chunk, flatten, compact } from '@rabjs/kit/array';
import { clone, merge, pick } from '@rabjs/kit/object';
```

### 3. 从具体文件导入（推荐用于单个函数）

```typescript
import chunk from '@rabjs/kit/array/chunk';
import clone from '@rabjs/kit/object/clone';
```

### 4. 命名空间导入

```typescript
import * as array from '@rabjs/kit/array';
import * as object from '@rabjs/kit/object';

array.chunk([1, 2, 3], 2);
object.clone({ a: 1 });
```

## 配置文件说明

### rollup.config.cjs.js

CJS 构建配置，使用 Node.js 友好的设置：

- 输出格式：`cjs`
- 模块解析：`preferBuiltins: true`
- Tree-shaking：启用

### rollup.config.esm.js

ESM 构建配置，使用浏览器友好的设置：

- 输出格式：`es`
- 模块解析：`preferBuiltins: false`
- Tree-shaking：启用

### tsconfig.prod.cjs.json

CJS 编译配置：

- 目标：ES2020
- 模块：esnext（Rollup 处理转换）

### tsconfig.prod.esm.json

ESM 编译配置：

- 目标：ES2020
- 模块：esnext

### tsconfig.prod.types.json

类型声明生成配置：

- 仅生成声明文件
- 包含声明映射

## 构建优化

### 垫片代码优化

通过 Rollup 的 `preserveModules` 模式，完全消除了每个文件的垫片代码冗余。

**改进前**：每个文件 ~15 行垫片代码
**改进后**：每个文件 0 行垫片代码

### Tree-shaking 优化

```javascript
// rollup 配置中
treeshake: {
  moduleSideEffects: false,      // 无副作用
  propertyReadSideEffects: false, // 属性读取无副作用
}
```

## 故障排除

### 问题：构建失败，提示 tslib 缺失

**解决方案**：

```bash
pnpm install
```

### 问题：类型声明生成失败

**解决方案**：
检查 `tsconfig.prod.types.json` 中是否有冲突的编译选项。

### 问题：产物中仍有垫片代码

**解决方案**：
确保使用的是最新的 Rollup 配置，运行：

```bash
npm run build:clean
npm run build
```

## 性能指标

| 指标              | 值      |
| ----------------- | ------- |
| CJS 构建时间      | ~600ms  |
| ESM 构建时间      | ~500ms  |
| 类型生成时间      | ~500ms  |
| 总构建时间        | ~1600ms |
| 垫片代码行数/文件 | 0       |

## 浏览器兼容性

- **Chrome**: >= 70
- **Safari**: >= 12
- **Firefox**: >= 68
- **Edge**: >= 79

## Node.js 兼容性

- **Node.js**: >= 20

## 相关文档

- [构建重构详情](./.catpaw/commands/build-refactor.md)
- [技术方案](./specs/technical-design.md)
