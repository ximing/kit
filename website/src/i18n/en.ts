export const en = {
  meta: {
    title: '@rabjs/kit',
    description: 'Typed lodash-shaped utilities for humans and coding agents.',
  },
  nav: {
    search: 'Search',
    guide: 'Guide',
    api: 'API',
    skills: 'Skills',
    langEn: 'EN',
    langZh: '中',
    skip: 'Skip to content',
  },
  home: {
    pitch: 'Typed lodash-shaped utilities for humans and coding agents.',
    install: 'pnpm add @rabjs/kit',
    copy: 'Copy',
    copied: 'Copied',
    searchLabel: 'Search functions',
    searchPlaceholder: 'Name, summary, or category',
    searchCount: (n: number) => `${n} match${n === 1 ? '' : 'es'}`,
    searchEmpty: 'No functions match that query.',
    featured: 'Featured',
    categories: 'Categories',
    functions: (n: number) => `${n} functions`,
    agentsCta: 'Coding agents: install as a plugin',
  },
  api: {
    indexTitle: 'API',
    indexLead: 'Every named export, grouped by category.',
    signature: 'Signature',
    summary: 'Summary',
    params: 'Parameters',
    examples: 'Examples',
    playground: 'Playground',
    source: 'Source',
    notFound: 'Function not found.',
    categoryNotFound: 'Category not found.',
    breadcrumbApi: 'API',
  },
  playground: {
    run: 'Run',
    running: 'Running…',
    result: 'Result',
    error: 'Error',
    hint: 'Named exports from @rabjs/kit are in scope. Edit the example and run it in the browser.',
  },
  skills: {
    title: 'Skills',
    lead: 'Plain SKILL.md files for coding agents. Install this repository as a plugin in your tool — do not copy them into ~/.grok/skills or ~/.agents/skills.',
    useWhen: 'Use when',
    viewOnGithub: 'View SKILL.md on GitHub',
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
  plugins: {
    title: 'Install as a plugin',
    lead: 'The same skills work in every tool. Each tool has its own plugin manifest in this repo, so install once per tool you use.',
    copy: 'Copy',
    copied: 'Copied',
    tools: {
      claude: {
        label: 'Claude Code',
        note: 'Or copy the three skill directories into ~/.claude/skills/. Manifest: .claude-plugin/',
      },
      codex: {
        label: 'Codex',
        note: 'This repo is a Codex marketplace (.agents/plugins/marketplace.json). After adding it, you can also open /plugins and search for kit.',
      },
      cursor: {
        label: 'Cursor',
        note: 'Manifest: .cursor-plugin/plugin.json. If the slash command is unavailable, search for kit in the Cursor plugin marketplace.',
      },
      grok: {
        label: 'Grok',
        note: 'This repo is a Grok marketplace (.grok-plugin/marketplace.json). Direct install: grok plugin install ximing/kit --trust',
      },
      kimi: {
        label: 'Kimi Code',
        note: 'Start a new session (/new) after installing so the plugin loads.',
      },
      opencode: {
        label: 'OpenCode',
        note: '.opencode/plugins/kit.js registers skills/ in this repo. If git install does not load, set "skills" to the kit skills/ directory.',
      },
      pi: {
        label: 'Pi',
        note: 'package.json declares skills/ for Pi native discovery (keywords: pi-package).',
      },
      manual: {
        label: 'Manual',
        note: 'Last resort. Prefer the plugin command for your tool so updates stay in git.',
      },
    },
  },
  notFound: {
    title: 'Page not found',
    body: 'That path is not in the catalog.',
    home: 'Back to catalog',
  },
  footer: {
    license: 'MIT',
    github: 'GitHub',
    npm: 'npm',
  },
};

export type Messages = typeof en;
