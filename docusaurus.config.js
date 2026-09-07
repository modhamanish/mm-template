// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MMTemplate',
  tagline: 'Production-Ready React Native TypeScript Boilerplate with Interactive CLI Setup',
  favicon: 'img/favicon.ico',

  url: 'https://modhamanish.github.io',
  baseUrl: '/mm-template/',

  organizationName: 'modhamanish',
  projectName: 'mm-template',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/modhamanish/mm-template/tree/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'MMTemplate',
        logo: {
          alt: 'MMTemplate Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/docs/intro',
            position: 'left',
            label: 'Documentation',
            activeBaseRegex: 'docs/(intro|getting-started/installation|category/getting-started)',
          },
          {
            to: '/docs/getting-started/interactive-wizard',
            position: 'left',
            label: 'Interactive Wizard',
            activeBasePath: 'docs/getting-started/interactive-wizard',
          },
          {
            to: '/docs/guides/architecture',
            position: 'left',
            label: 'Architecture & Guides',
            activeBaseRegex: 'docs/(guides|category/architecture)',
          },
          {
            href: 'https://github.com/modhamanish/mm-template',
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
                to: '/docs/getting-started/installation',
              },
              {
                label: 'Interactive Wizard',
                to: '/docs/getting-started/interactive-wizard',
              },
            ],
          },
          {
            title: 'Guides',
            items: [
              {
                label: 'Navigation Architecture',
                to: '/docs/guides/navigation',
              },
              {
                label: 'State & TanStack Query',
                to: '/docs/guides/state-and-api',
              },
              {
                label: 'Theming & Dark Mode',
                to: '/docs/guides/theming',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/modhamanish/mm-template',
              },
              {
                label: 'Issues & Discussions',
                href: 'https://github.com/modhamanish/mm-template/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MMTemplate. Built with Docusaurus & React.js.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'typescript', 'json'],
      },
    }),
};

export default config;
