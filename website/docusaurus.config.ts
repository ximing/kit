import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '@rabjs/kit',
  tagline: 'A comprehensive TypeScript utility library with 100+ helper functions',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Performance optimizations
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Set the production url of your site here
  url: 'https://ximing.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/kit/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ximing', // Usually your GitHub org/user name.
  projectName: 'kit',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // Internationalization configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      },
      'zh-CN': {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/ximing/kit/tree/main/website/',
          editLocalizedFiles: true, // Enable locale-specific edit links
          showLastUpdateTime: true,
        },
        blog: false, // Disable blog functionality
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: [],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',

    // Metadata for SEO
    metadata: [
      {
        name: 'description',
        content:
          '@rabjs/kit - A comprehensive TypeScript utility library with 100+ helper functions for arrays, objects, strings, functions, numbers, dates, promises, and more.',
      },
      {
        name: 'keywords',
        content:
          'typescript, utility, library, javascript, helper functions, array, object, string, function, number, date, promise, collection, math',
      },
      { name: 'author', content: '@rabjs/kit' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#2e8555' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: '@rabjs/kit - TypeScript Utility Library' },
      {
        property: 'og:description',
        content:
          'A comprehensive TypeScript utility library with 100+ helper functions for arrays, objects, strings, functions, numbers, dates, promises, and more.',
      },
      { property: 'og:url', content: 'https://ximing.github.io/kit/' },
      { property: 'og:image', content: 'https://ximing.github.io/kit/img/docusaurus-social-card.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: '@rabjs/kit - TypeScript Utility Library' },
      {
        name: 'twitter:description',
        content: 'A comprehensive TypeScript utility library with 100+ helper functions.',
      },
      { name: 'twitter:image', content: 'https://ximing.github.io/kit/img/docusaurus-social-card.jpg' },
    ],

    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },

    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },

    // Performance: Disable unnecessary features
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: '@rabjs/kit',
      logo: {
        alt: '@rabjs/kit Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ximing/kit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/ximing/kit/issues',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/ximing/kit/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ximing/kit',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/@rabjs/kit',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} @rabjs/kit. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Algolia search configuration - temporarily disabled until credentials are configured
    // algolia: {
    //   // The application ID provided by Algolia
    //   appId: 'YOUR_APP_ID',
    //
    //   // Public API key: it is safe to commit it
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //
    //   indexName: 'rabjs_kit',
    //
    //   // Optional: see doc section below
    //   contextualSearch: true,
    //
    //   // Optional: Algolia search parameters
    //   searchParameters: {},
    //
    //   // Optional: path for search page that enabled by default (`false` to disable it)
    //   searchPagePath: 'search',
    //
    //   // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
    //   insights: false,
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
