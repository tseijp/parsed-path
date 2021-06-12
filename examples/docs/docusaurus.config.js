/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'parsed-path',
  tagline: 'Use the best bits of ES6 to parse your path without stress 👋',
  url: 'https://tsei.jp',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tseijp', // Usually your GitHub org/user name.
  projectName: 'parsed-path', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '<👋> parsed path',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/tseijp/parsed-path',
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
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/parsed-path' },
            { label: 'Twitter', href: 'https://twitter.com/tseijp' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/tseijp/parsed-path' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
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
};
