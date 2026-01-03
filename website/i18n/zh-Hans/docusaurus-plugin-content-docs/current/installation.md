---
sidebar_position: 2
---

# 安装指南

## 使用 npm

```bash
npm install @rabjs/kit
```

## 使用 pnpm

```bash
pnpm add @rabjs/kit
```

## 使用 yarn

```bash
yarn add @rabjs/kit
```

## 使用 bun

```bash
bun add @rabjs/kit
```

## 验证安装

创建一个简单的测试文件来验证安装：

```typescript
import { chunk } from '@rabjs/kit';

console.log(chunk([1, 2, 3, 4], 2));
// 输出: [[1, 2], [3, 4]]
```

## 浏览器使用

@rabjs/kit 也可以在浏览器中使用。你可以通过 CDN 引入：

```html
<script src="https://unpkg.com/@rabjs/kit"></script>
<script>
  const { chunk } = window.rabjs.kit;
  console.log(chunk([1, 2, 3, 4], 2));
</script>
```

## 下一步

- 📖 阅读 [使用方法](./usage.md) 了解如何使用
- 🔧 浏览 [API 文档](/docs/api/array) 查看所有可用函数
