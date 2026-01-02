# @rabjs/kit Documentation Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## 🚀 Quick Start

### Installation

```bash
cd website
pnpm install
```

### Local Development

```bash
pnpm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
pnpm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
pnpm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## 📁 Project Structure

```
website/
├── docs/                          # Documentation files (Markdown/MDX)
│   ├── api/                       # API documentation
│   │   ├── array.md
│   │   ├── object.md
│   │   └── ...
│   ├── examples/                  # Usage examples
│   │   ├── api-doc-example.mdx    # ApiDoc component examples
│   │   └── common-patterns.md
│   ├── intro.md
│   ├── installation.md
│   └── usage.md
├── i18n/                          # Internationalization
│   └── zh-CN/                     # Chinese translations
├── src/                           # React components and custom code
│   ├── components/
│   │   ├── ApiDoc/                # API documentation component
│   │   └── HomepageFeatures/      # Homepage features
│   ├── css/                       # Global styles
│   ├── pages/                     # Custom pages
│   │   └── index.tsx              # Homepage
│   └── theme/                     # Theme customizations
│       └── ReactLiveScope/        # Live Codeblock scope
├── static/                        # Static assets
│   └── img/
├── docusaurus.config.ts           # Docusaurus configuration
├── sidebars.ts                    # Sidebar configuration
├── package.json
└── tsconfig.json
```

## 🎨 Components

### ApiDoc Component

A professional component for displaying API documentation with parameters, return types, and examples.

**Usage:**

```tsx
import ApiFunction, { ApiCategory } from '@site/src/components/ApiDoc';

<ApiFunction
  name="functionName"
  description="Function description"
  signature="function signature"
  params={[...]}
  returns={{...}}
  examples={[...]}
  since="1.0.0"
/>
```

See `docs/examples/api-doc-example.mdx` for complete examples.

### Live Codeblock

Interactive code editor powered by react-live. Use the `live` flag in code blocks:

````mdx
```tsx live
function Example() {
  const result = chunk([1, 2, 3, 4, 5], 2);
  return <div>{JSON.stringify(result)}</div>;
}
```
````

## 🌐 Internationalization

The website supports English and Chinese (Simplified).

### Add a new locale

1. Update `i18n.locales` in `docusaurus.config.ts`
2. Create translation files:

```bash
pnpm run write-translations -- --locale <locale>
```

3. Translate the JSON files in `i18n/<locale>/`

### Add translated docs

Create translated versions in `i18n/<locale>/docusaurus-plugin-content-docs/current/`

## 🔍 Search

The website uses Algolia DocSearch for search functionality. Configuration is in `docusaurus.config.ts`:

```typescript
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'rabjs_kit',
}
```

To enable search:

1. Apply for [Algolia DocSearch](https://docsearch.algolia.com/)
2. Update the credentials in the config

## 🎯 Features

- ✅ **Interactive Code Examples** - Live code editor with instant preview
- ✅ **API Documentation Component** - Professional API docs with examples
- ✅ **TypeScript Support** - Full TypeScript integration
- ✅ **Dark Mode** - Automatic theme switching
- ✅ **Responsive Design** - Mobile-friendly layout
- ✅ **Fast Navigation** - Instant page transitions
- ✅ **SEO Optimized** - Meta tags and sitemap generation
- ✅ **Internationalization** - Multi-language support

## 📝 Writing Documentation

### Markdown Files

Documentation is written in Markdown or MDX (Markdown + JSX).

**Front matter:**

```markdown
---
sidebar_position: 1
title: Page Title
---

# Content
```

### Using React Components in MDX

```mdx
import MyComponent from '@site/src/components/MyComponent';

# My Page

<MyComponent prop="value" />
```

### Live Code Blocks

Add the `live` flag to code blocks for interactive examples:

````mdx
```tsx live
function Demo() {
  return <div>Hello World!</div>;
}
```
````

## 🛠️ Development Workflow

1. **Start dev server**: `pnpm run start`
2. **Edit docs**: Modify files in `docs/` or `src/`
3. **See changes**: Changes reflect immediately in the browser
4. **Build**: `pnpm run build` to verify production build
5. **Deploy**: `pnpm run deploy` to publish

## 🧪 Testing

Before deploying:

1. **Build test**:

```bash
pnpm run build
```

2. **Serve locally**:

```bash
pnpm run serve
```

3. **Check**:
   - All pages load correctly
   - Search works (if configured)
   - Live code blocks work
   - Dark mode toggles
   - Responsive design
   - Links are not broken

## 📦 Deployment

### GitHub Pages

1. Configure in `docusaurus.config.ts`:

```typescript
organizationName: 'ximing',
projectName: 'kit',
```

2. Deploy:

```bash
GIT_USER=<your-username> pnpm run deploy
```

### Other Platforms

- **Vercel**: Connect your GitHub repo
- **Netlify**: Connect your GitHub repo
- **Cloudflare Pages**: Connect your GitHub repo

Build command: `cd website && pnpm run build`
Output directory: `website/build`

## 🔧 Configuration

### Main Config

Edit `docusaurus.config.ts` to configure:

- Site metadata
- Theme settings
- Plugins
- Navbar and footer
- Internationalization

### Sidebar

Edit `sidebars.ts` to organize documentation structure.

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [MDX Documentation](https://mdxjs.com/)
- [React Live Documentation](https://github.com/FormidableLabs/react-live)

## 🎉 Phase Two Completion

This marks the completion of **Phase Two: React Component Development**.

Completed tasks:

- ✅ ApiDoc component with full TypeScript support
- ✅ Optimized homepage components
- ✅ Live Codeblock configuration
- ✅ React Live scope setup
- ✅ Interactive code examples
- ✅ Development server testing

See `PHASE_TWO_COMPLETION.md` for detailed completion report.

## 🚧 Next Steps

**Phase Three: Automated Documentation Generation**

- Develop scripts to parse TypeScript source code
- Extract JSDoc comments
- Generate MDX files with ApiDoc components
- Integrate with Live Codeblock examples
- Update all API documentation automatically

## 📄 License

Same as the parent project.
