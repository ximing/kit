---
sidebar_position: 1
---

# 快速开始

欢迎来到 **@rabjs/kit** 文档！

@rabjs/kit 是一个包含 100+ 辅助函数的全面 TypeScript 工具库。它提供了用于数组、对象、字符串、函数、数字、日期、Promise 等操作的强大工具。

## 为什么选择 @rabjs/kit？

- 📦 **完整的工具库**：100+ 精心设计的辅助函数
- 🎯 **完全 TypeScript 支持**：100% 使用 TypeScript 编写，提供完整的类型推断
- ⚡ **Tree-shaking 友好**：支持 ES modules，可实现最小化的打包体积
- 📚 **详细的文档**：每个函数都有详细的说明和示例
- 🧪 **完整的测试覆盖**：所有函数都经过充分测试
- 🔄 **与 lodash 兼容**：API 与 lodash 相似，易于上手

## 快速示例

```typescript
import { chunk, isEmpty, pick } from '@rabjs/kit';

// 数组操作
const chunked = chunk([1, 2, 3, 4, 5], 2);
// => [[1, 2], [3, 4], [5]]

// 类型检查
isEmpty([]);
// => true

// 对象操作
pick({ a: 1, b: 2, c: 3 }, 'a', 'b');
// => { a: 1, b: 2 }
```

## 下一步

- 📖 查看 [安装指南](./installation.md) 了解如何安装
- 💡 阅读 [使用方法](./usage.md) 学习基本用法
- 🔧 浏览 [API 文档](/docs/api/array) 了解所有可用函数
- 📝 查看 [TypeScript 支持](./typescript.md) 了解类型系统

祝你使用愉快！
