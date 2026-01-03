---
sidebar_position: 7
---

# 部署指南

本指南介绍如何将 @rabjs/kit 文档站点部署到 GitHub Pages，以及相关的 SEO 优化配置。

## 自动化部署

### GitHub Actions 工作流

文档站点已配置自动化部署工作流，位于 `.github/workflows/deploy-docs.yml`。

#### 触发条件

工作流在以下情况下自动触发：

1. **代码推送到 main 分支**
   - 当 `website/` 目录中的文件发生变化
   - 当 `src/` 目录中的文件发生变化（源码更新）
   - 当 `scripts/generate-api-docs.ts` 文件发生变化

2. **手动触发**
   - 访问 GitHub Actions 页面，点击 "Deploy Documentation" 工作流
   - 点击 "Run workflow" 按钮

#### 工作流步骤

```
1. 检出代码
   ↓
2. 安装 pnpm 和 Node.js
   ↓
3. 安装项目依赖
   ↓
4. 生成 API 文档
   ↓
5. 构建网站
   ↓
6. 上传构建产物
   ↓
7. 部署到 GitHub Pages
```

### 部署流程

#### 首次部署

1. **确保代码已提交**

   ```bash
   git add .
   git commit -m "feat: add documentation site"
   git push origin main
   ```

2. **等待 GitHub Actions 完成**
   - 访问 https://github.com/ximing/kit/actions
   - 查看 "Deploy Documentation" 工作流的执行进度
   - 工作流通常在 3-5 分钟内完成

3. **验证部署成功**
   - 访问 https://ximing.github.io/kit/
   - 检查页面是否正常加载
   - 验证所有导航链接是否工作正常

#### 后续部署

任何对以下文件的更改都会自动触发新的部署：

- `website/` - 文档内容和配置
- `src/` - 源码（用于生成 API 文档）
- `scripts/generate-api-docs.ts` - API 文档生成脚本

只需推送代码到 main 分支，工作流会自动处理其余的工作。

### 部署故障排查

#### 构建失败

如果工作流失败，请检查：

1. **查看错误日志**
   - 访问 GitHub Actions 页面
   - 点击失败的工作流运行
   - 查看详细的错误信息

2. **常见错误**
   - **依赖安装失败**：检查 pnpm-lock.yaml 是否正确
   - **API 文档生成失败**：检查 TypeScript 源码是否有语法错误
   - **构建失败**：检查 Docusaurus 配置是否正确

3. **本地测试**
   ```bash
   # 在本地运行相同的步骤
   pnpm install
   cd website && pnpm run build
   ```

#### 部署后页面未更新

- 清除浏览器缓存（Ctrl+Shift+Delete 或 Cmd+Shift+Delete）
- 等待 CDN 缓存更新（通常 5-10 分钟）
- 检查 GitHub Pages 设置是否正确

## SEO 优化

### Sitemap

Sitemap 帮助搜索引擎发现和索引网站上的所有页面。

**配置**

- 位置：`website/build/sitemap.xml`（构建后生成）
- 更新频率：每周
- 优先级：0.5（默认）

**访问 Sitemap**

```
https://ximing.github.io/kit/sitemap.xml
```

### robots.txt

robots.txt 文件告诉搜索引擎爬虫如何访问网站。

**配置**

- 位置：`website/static/robots.txt`
- 允许：所有爬虫可以访问所有页面
- 包含：Sitemap URL

**访问 robots.txt**

```
https://ximing.github.io/kit/robots.txt
```

### Meta 标签

完整的 Meta 标签配置用于改进搜索引擎优化和社交媒体分享。

#### 基础 Meta 标签

```html
<meta name="description" content="@rabjs/kit - A comprehensive TypeScript utility library..." />
<meta name="keywords" content="typescript, utility, library, javascript, helper functions..." />
<meta name="author" content="@rabjs/kit" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#2e8555" />
```

#### Open Graph 标签

用于改进在 Facebook、LinkedIn 等社交媒体上的分享效果。

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="@rabjs/kit - TypeScript Utility Library" />
<meta property="og:description" content="A comprehensive TypeScript utility library..." />
<meta property="og:url" content="https://ximing.github.io/kit/" />
<meta property="og:image" content="https://ximing.github.io/kit/img/docusaurus-social-card.jpg" />
```

#### Twitter Card 标签

用于改进在 Twitter 上的分享效果。

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="@rabjs/kit - TypeScript Utility Library" />
<meta name="twitter:description" content="A comprehensive TypeScript utility library..." />
<meta name="twitter:image" content="https://ximing.github.io/kit/img/docusaurus-social-card.jpg" />
```

### SEO 最佳实践

1. **页面标题**
   - 每个页面都有唯一的、描述性的标题
   - 标题长度 50-60 个字符最佳

2. **页面描述**
   - 每个页面都有清晰的描述
   - 描述长度 150-160 个字符最佳

3. **关键词**
   - 使用相关的关键词
   - 避免关键词堆积

4. **标题层级**
   - 使用正确的 H1、H2、H3 等标题
   - 每个页面只有一个 H1 标题

5. **内部链接**
   - 使用描述性的锚文本
   - 链接到相关的页面

6. **外部链接**
   - 链接到权威的外部资源
   - 使用 `rel="noopener noreferrer"` 属性

7. **图片优化**
   - 使用描述性的文件名
   - 添加 alt 文本
   - 压缩图片大小

8. **移动优化**
   - 使用响应式设计
   - 确保触摸目标足够大
   - 避免弹出窗口

## 性能优化

### 构建性能

- **依赖缓存**：GitHub Actions 自动缓存 pnpm 依赖
- **增量构建**：Docusaurus 支持增量构建，加快重新部署
- **代码分割**：自动进行代码分割，减少初始加载大小

### 运行时性能

- **CDN 分发**：GitHub Pages 使用全球 CDN
- **资源压缩**：自动压缩 JavaScript、CSS 和 HTML
- **预加载**：关键资源预加载
- **懒加载**：按需加载非关键资源

### 性能指标

使用 Lighthouse 检测性能指标：

1. **访问页面**
   - 打开 Chrome DevTools（F12）
   - 点击 Lighthouse 标签
   - 点击 "Generate report"

2. **目标指标**
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90

## 监控和维护

### 监控工作流

访问 GitHub Actions 页面监控部署状态：

```
https://github.com/ximing/kit/actions
```

### 检查搜索引擎索引

1. **Google Search Console**
   - 访问 https://search.google.com/search-console
   - 验证网站所有权
   - 提交 Sitemap
   - 监控索引和查询数据

2. **Bing Webmaster Tools**
   - 访问 https://www.bing.com/webmaster
   - 验证网站所有权
   - 提交 Sitemap
   - 监控爬虫活动

### 定期维护

- 每周检查工作流运行状态
- 每月检查搜索引擎索引
- 每季度进行性能审计
- 及时更新依赖版本

## 常见问题

### Q: 部署后多久页面会在搜索引擎中出现？

A: 通常需要 1-2 周。新网站可能需要更长时间。使用 Google Search Console 加快索引速度。

### Q: 如何加快构建速度？

A:

- 确保依赖缓存已启用
- 减少不必要的文档
- 使用本地开发环境测试
- 避免频繁的小改动

### Q: 部署失败如何处理？

A:

1. 检查 GitHub Actions 日志
2. 在本地重现错误
3. 修复问题后重新推送
4. 或手动触发工作流重试

### Q: 可以自定义部署地址吗？

A: 可以。修改 `docusaurus.config.ts` 中的 `url` 和 `baseUrl` 配置。

## 相关资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Docusaurus 部署指南](https://docusaurus.io/docs/deployment)
- [Google Search Console](https://search.google.com/search-console)
- [SEO 最佳实践](https://developers.google.com/search/docs)
