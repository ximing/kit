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
    lead: 'Repo-local skills for coding agents. They live only in this repository — do not copy them to ~/.grok/skills or ~/.agents/skills.',
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
