import type { Messages } from './en';

export const zh: Messages = {
  meta: {
    title: '@rabjs/kit',
    description: '给人和 coding agent 用的、lodash 风格的 TypeScript 工具库。',
  },
  nav: {
    search: '搜索',
    guide: '指南',
    api: 'API',
    skills: 'Skills',
    langEn: 'EN',
    langZh: '中',
    skip: '跳到正文',
  },
  home: {
    pitch: '给人和 coding agent 用的、lodash 风格的 TypeScript 工具库。',
    install: 'pnpm add @rabjs/kit',
    copy: '复制',
    copied: '已复制',
    searchLabel: '搜索函数',
    searchPlaceholder: '名称、摘要或分类',
    searchCount: (n: number) => `${n} 个结果`,
    searchEmpty: '没有匹配的函数。',
    featured: '常用',
    categories: '分类',
    functions: (n: number) => `${n} 个函数`,
  },
  api: {
    indexTitle: 'API',
    indexLead: '全部具名导出，按分类排列。',
    signature: '签名',
    summary: '摘要',
    params: '参数',
    examples: '示例',
    playground: 'Playground',
    source: '源码',
    notFound: '找不到这个函数。',
    categoryNotFound: '找不到这个分类。',
    breadcrumbApi: 'API',
  },
  playground: {
    run: '运行',
    running: '运行中…',
    result: '结果',
    error: '错误',
    hint: '@rabjs/kit 的具名导出已注入作用域。编辑示例后在浏览器中运行。',
  },
  skills: {
    title: 'Skills',
    lead: '给 coding agent 用的仓库内 skills。只放在本仓库里 — 不要复制到 ~/.grok/skills 或 ~/.agents/skills。',
    useWhen: '使用时机',
    viewOnGithub: '在 GitHub 查看 SKILL.md',
    items: [
      {
        name: 'using-rabjs-kit',
        useWhen:
          'Use when writing application code that needs array, object, string, function, or promise helpers, or when choosing between native JavaScript APIs and @rabjs/kit.',
        href: 'https://github.com/ximing/kit/blob/main/skills/using-rabjs-kit/SKILL.md',
      },
      {
        name: 'adding-kit-function',
        useWhen: 'Use when adding or changing a public function in this @rabjs/kit repository.',
        href: 'https://github.com/ximing/kit/blob/main/skills/adding-kit-function/SKILL.md',
      },
      {
        name: 'migrating-lodash-to-kit',
        useWhen: 'Use when replacing lodash or lodash-es with @rabjs/kit.',
        href: 'https://github.com/ximing/kit/blob/main/skills/migrating-lodash-to-kit/SKILL.md',
      },
    ],
  },
  notFound: {
    title: '页面不存在',
    body: '目录里没有这条路径。',
    home: '回到目录',
  },
  footer: {
    license: 'MIT',
    github: 'GitHub',
    npm: 'npm',
  },
};
