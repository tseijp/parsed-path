/** @type {import('@docusaurus/types').DocusaurusConfig} */

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

module.exports = {
  title: 'parsed-path👋',
  tagline: 'Use the best bits of ES6 to parse your path without stress 👋',
  url: 'https://tseijp.github.io',
  baseUrl: '/parsed-path/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'tseijp',
  projectName: 'parsed-path',
  favicon: 'img/favicon.png',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/tseijp/parsed-path/edit/master/examples/docs/',
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: '👋 parsed path',
      items: [
        {position: 'left', type: 'doc', docId: 'intro', label: 'Documentation'},
        {position: 'right', label: 'GitHub', href: 'https://github.com/tseijp/parsed-path'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{label: 'Tutorial', to: '/docs/intro'}],
        },
        {
          title: 'Community',
          items: [
            {label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/parsed-path'},
            {label: 'Twitter', href: 'https://twitter.com/tseijp'},
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/tseijp/parsed-path' },
          ],
        },
      ],
      copyright: `©tseijp ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};
