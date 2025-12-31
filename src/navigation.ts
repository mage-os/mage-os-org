import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Product',
      links: [
        { text: 'Overview', href: getPermalink('/product') },
        { text: 'Features', href: getPermalink('/product/features') },
        { text: 'Why Mage-OS', href: getPermalink('/product/why-mage-os') },
        { text: 'Roadmap', href: getPermalink('/product/roadmap') },
        { text: 'Releases', href: getPermalink('/product/releases') },
      ],
    },
    {
      text: 'Get Started',
      links: [
        { text: 'Overview', href: getPermalink('/get-started') },
        { text: 'Quick Start', href: getPermalink('/get-started/quick-start') },
        { text: 'Installation', href: getPermalink('/get-started/installation') },
        { text: 'Migration Guide', href: getPermalink('/get-started/migration-guide') },
        { text: 'System Requirements', href: getPermalink('/get-started/system-requirements') },
      ],
    },
    {
      text: 'Documentation',
      href: getPermalink('/documentation'),
    },
    {
      text: 'Community',
      href: getPermalink('/community'),
    },
    {
      text: 'Events',
      href: getPermalink('/events'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: 'Download', href: getPermalink('/get-started/quick-start'), icon: 'tabler:download' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: getPermalink('/product/features') },
        { text: 'Why Mage-OS', href: getPermalink('/product/why-mage-os') },
        { text: 'Roadmap', href: getPermalink('/product/roadmap') },
        { text: 'Releases', href: getPermalink('/product/releases') },
      ],
    },
    {
      title: 'Get Started',
      links: [
        { text: 'Quick Start', href: getPermalink('/get-started/quick-start') },
        { text: 'Installation', href: getPermalink('/get-started/installation') },
        { text: 'Migration Guide', href: getPermalink('/get-started/migration-guide') },
        { text: 'Documentation', href: getPermalink('/documentation') },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'Get Involved', href: getPermalink('/community') },
        { text: 'Events', href: getPermalink('/events') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'GitHub', href: 'https://github.com/mage-os' },
        { text: 'Discord', href: 'https://discord.com/invite/nvZDVA2NdC' },
      ],
    },
    {
      title: 'About',
      links: [
        { text: 'About Mage-OS', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/maborak' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/mage-os' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.com/invite/nvZDVA2NdC' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    &copy; ${new Date().getFullYear()} Mage-OS Association. All rights reserved.
  `,
};
