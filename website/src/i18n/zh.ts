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
    agentsCta: 'Coding agent：用 plugin 安装',
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
    lead: '给 coding agent 用的纯 SKILL.md。把本仓库作为 plugin 装进你的工具 — 不要复制到 ~/.grok/skills 或 ~/.agents/skills。',
    useWhen: '使用时机',
    viewOnGithub: '在 GitHub 查看 SKILL.md',
    items: [
      {
        name: 'using-rabjs-kit',
        useWhen:
          '写应用代码时需要数组、对象、字符串、函数或 Promise 辅助函数，或在原生 JavaScript API 和 @rabjs/kit 之间选择。',
        href: 'https://github.com/ximing/kit/blob/main/skills/using-rabjs-kit/SKILL.md',
      },
      {
        name: 'adding-kit-function',
        useWhen: '在本仓库中新增或修改公开函数。',
        href: 'https://github.com/ximing/kit/blob/main/skills/adding-kit-function/SKILL.md',
      },
      {
        name: 'migrating-lodash-to-kit',
        useWhen: '用 @rabjs/kit 替换 lodash 或 lodash-es。',
        href: 'https://github.com/ximing/kit/blob/main/skills/migrating-lodash-to-kit/SKILL.md',
      },
    ],
  },
  plugins: {
    title: '用 plugin 安装',
    lead: '同一份 skill 在各工具中通用。仓库里有各工具的插件清单，用哪个工具就装一次。',
    copy: '复制',
    copied: '已复制',
    tools: {
      claude: {
        label: 'Claude Code',
        note: '或把三个 skill 目录拷到 ~/.claude/skills/。清单：.claude-plugin/',
      },
      codex: {
        label: 'Codex',
        note: '本仓库就是 Codex 插件市场（.agents/plugins/marketplace.json）。添加后也可以打开 /plugins 搜索 kit。',
      },
      cursor: {
        label: 'Cursor',
        note: '清单：.cursor-plugin/plugin.json。斜杠命令不可用时，在 Cursor 插件市场搜索 kit。',
      },
      grok: {
        label: 'Grok',
        note: '本仓库就是 Grok 插件市场（.grok-plugin/marketplace.json）。也可直接 grok plugin install ximing/kit --trust',
      },
      kimi: {
        label: 'Kimi Code',
        note: '安装后新开会话（/new）使插件生效。',
      },
      opencode: {
        label: 'OpenCode',
        note: '在本仓库里，.opencode/plugins/kit.js 会注册 skills/。若 git 安装没有加载，把 skills 指到本仓库的 skills/ 目录。',
      },
      pi: {
        label: 'Pi',
        note: 'package.json 为 Pi 的原生发现声明了 skills/（keywords: pi-package）。',
      },
      manual: {
        label: '手动',
        note: '兜底做法。优先用对应工具的 plugin 命令，方便跟着 git 更新。',
      },
    },
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
