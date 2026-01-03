import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Product',
      href: getPermalink('/product'),
      links: [
        { text: 'Overview', href: getPermalink('/product') },
        { text: 'Features', href: getPermalink('/product/features') },
        { text: 'Roadmap', href: getPermalink('/product/roadmap') },
        { text: 'Releases', href: getPermalink('/product/releases') },
      ],
    },
    {
      text: 'Get Started',
      href: getPermalink('/get-started'),
      links: [
        { text: 'Overview', href: getPermalink('/get-started') },
        { text: 'Quick Start', href: getPermalink('/get-started/quick-start') },
        { text: 'Installation', href: getPermalink('/get-started/installation') },
        { text: 'Migration Guide', href: getPermalink('/get-started/migration-guide') },
        { text: 'System Requirements', href: getPermalink('/get-started/system-requirements') },
      ],
    },
    {
      text: 'Learn',
      href: 'https://devdocs.mage-os.org',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'User Guide', href: 'https://docs.magento-opensource.com/' },
        { text: 'Developer Docs', href: 'https://devdocs.mage-os.org' },
        { text: 'Case Studies', href: getPermalink('case-studies', 'category') },
      ],
    },
    {
      text: 'Community',
      href: getPermalink('/community'),
      links: [
        { text: 'Overview', href: getPermalink('/community') },
        { text: 'Get Involved', href: getPermalink('/community#get-involved') },
        { text: 'Partners', href: getPermalink('/community/partners') },
        { text: 'Events', href: getPermalink('/events') },
        { text: 'Apparel', href: getPermalink('/community/apparel') },
        { text: 'GitHub', href: 'https://github.com/mage-os' },
        { text: 'Discord', href: getPermalink('/discord-channel') },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
      links: [
        { text: 'About Mage-OS', href: getPermalink('/about') },
        { text: 'Leadership', href: getPermalink('/about/leadership') },
        { text: 'Contributors', href: getPermalink('/about/contributors') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'FAQ', href: getPermalink('/faq') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: getPermalink('/product/features') },
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
        { text: 'Documentation', href: 'https://devdocs.mage-os.org' },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'Get Involved', href: getPermalink('/community') },
        { text: 'Events', href: getPermalink('/events') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'GitHub', href: 'https://github.com/mage-os' },
        { text: 'Discord', href: getPermalink('/discord-channel') },
      ],
    },
    {
      title: 'About',
      links: [
        { text: 'About Mage-OS', href: getPermalink('/about') },
        { text: 'Leadership', href: getPermalink('/about/leadership') },
        { text: 'Contributors', href: getPermalink('/about/contributors') },
        { text: 'FAQ', href: getPermalink('/faq') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Code of Conduct', href: getPermalink('/code-of-conduct') },
    { text: 'Imprint', href: getPermalink('/imprint') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/mage-os/' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/mage-os' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: getPermalink('/discord-channel') },
  ],
  footNote: `
    &copy; ${new Date().getFullYear()} Mage-OS Association. All rights reserved.
  `,
};
