# Algolia DocSearch 配置指南

## 概述

本文档说明如何为 @rabjs/kit 文档站点配置 Algolia DocSearch，以提供强大的全文搜索功能。

## 前置条件

1. 项目需要是开源项目
2. 文档站点已公开部署
3. 文档内容可被公开访问

## 申请步骤

### 1. 申请 Algolia DocSearch

访问 [Algolia DocSearch 申请页面](https://docsearch.algolia.com/apply/)，填写以下信息：

- **Website URL**: https://ximing.github.io/kit/
- **Email**: 您的邮箱地址
- **Repository URL**: https://github.com/ximing/kit
- **Description**: A comprehensive TypeScript utility library with 100+ helper functions

### 2. 等待审核

Algolia 团队通常会在 1-2 周内审核您的申请。对于活跃的开源项目，审核通常会很快通过。

### 3. 收到配置信息

审核通过后，您会收到一封包含以下信息的邮件：

- `appId`: 您的应用 ID
- `apiKey`: 搜索 API 密钥（公开密钥，可以提交到代码库）
- `indexName`: 索引名称

### 4. 更新配置文件

收到配置信息后，更新 `website/docusaurus.config.ts` 文件中的 Algolia 配置：

```typescript
algolia: {
  appId: 'YOUR_APP_ID',           // 替换为您收到的 appId
  apiKey: 'YOUR_SEARCH_API_KEY',  // 替换为您收到的 apiKey
  indexName: 'rabjs_kit',         // 替换为您收到的 indexName
  contextualSearch: true,
  searchParameters: {},
  searchPagePath: 'search',
  insights: false,
},
```

## 备选方案：本地搜索

在等待 Algolia 审核期间，或者如果不想使用 Algolia，可以使用本地搜索插件：

### 1. 安装插件

```bash
cd website
pnpm add @easyops-cn/docusaurus-search-local
```

### 2. 配置插件

在 `docusaurus.config.ts` 中添加插件配置：

```typescript
themes: [
  '@docusaurus/theme-live-codeblock',
  [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    {
      hashed: true,
      language: ["en", "zh"],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    },
  ],
],
```

### 3. 删除 Algolia 配置

注释或删除 `themeConfig` 中的 `algolia` 配置项。

## 搜索优化建议

### 1. 优化文档结构

确保文档有清晰的标题层次结构：

```markdown
# 一级标题（页面标题）

## 二级标题（主要章节）

### 三级标题（子章节）
```

### 2. 添加关键词

在文档的 frontmatter 中添加关键词：

```yaml
---
title: Array Utilities
description: Utility functions for array manipulation
keywords: [array, chunk, flatten, unique, utilities]
---
```

### 3. 优化搜索结果

使用 `searchParameters` 配置来优化搜索结果：

```typescript
algolia: {
  // ... 其他配置
  searchParameters: {
    facetFilters: ['language:en', ['filter1', 'filter2']],
    hitsPerPage: 10,
  },
},
```

## 测试搜索功能

### 1. 本地测试

```bash
cd website
pnpm run build
pnpm run serve
```

访问 http://localhost:3000 并测试搜索功能。

### 2. 常见搜索测试用例

- 搜索函数名：`chunk`
- 搜索功能描述：`array utilities`
- 搜索类型：`TypeScript`
- 中文搜索：`数组工具`

## 故障排查

### 问题 1: 搜索框不显示

**可能原因**:

- Algolia 配置未正确设置
- 插件未正确安装

**解决方案**:

```bash
cd website
pnpm install @docusaurus/theme-live-codeblock --save
pnpm run clear
pnpm run start
```

### 问题 2: 搜索结果为空

**可能原因**:

- 索引尚未创建或更新
- 网站尚未被 Algolia 爬虫索引

**解决方案**:

- 等待 Algolia 爬虫下次运行（通常每周一次）
- 联系 Algolia 支持请求手动触发索引

### 问题 3: 搜索结果不准确

**可能原因**:

- 文档结构不清晰
- 缺少元数据

**解决方案**:

- 优化文档标题和描述
- 添加关键词到 frontmatter
- 使用 `searchParameters` 调整搜索配置

## 监控和维护

### 1. 查看搜索统计

登录 [Algolia Dashboard](https://www.algolia.com/dashboard) 查看：

- 搜索查询统计
- 热门搜索词
- 搜索成功率

### 2. 定期更新索引

Algolia 会自动爬取您的网站并更新索引。您也可以：

- 配置爬虫频率
- 手动触发重新索引
- 设置 webhook 在部署后自动更新

## 参考资源

- [Algolia DocSearch 文档](https://docsearch.algolia.com/docs/what-is-docsearch)
- [Docusaurus 搜索文档](https://docusaurus.io/docs/search)
- [本地搜索插件](https://github.com/easyops-cn/docusaurus-search-local)

## 联系支持

如有问题，可以：

- 查阅 [Algolia 社区论坛](https://discourse.algolia.com/)
- 发送邮件至 Algolia 支持团队
- 在 GitHub 上提 issue
