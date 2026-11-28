/**
 * Agent-readable output: a Markdown version of every page, plus /llms.txt and /llms-full.txt.
 *
 * Layout.astro declares each page's Markdown version with
 * <link rel="alternate" type="text/markdown" href="/page.md">. After the build, this integration
 * converts the <main> element of every page that declares one, so the header, footer and banners
 * stay out. Inside <main>, add `data-llms-ignore` to anything agents should skip.
 *
 * llms.txt follows https://llmstxt.org: a short summary plus links to the Markdown pages, grouped
 * by section. llms-full.txt holds the Markdown of all those pages in one file.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import type { Element, ElementContent, Nodes } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { toMdast } from 'hast-util-to-mdast';
import { gfmToMarkdown } from 'mdast-util-gfm';
import { toMarkdown, type Options as MarkdownOptions } from 'mdast-util-to-markdown';

export interface MarkdownPage {
  /** Canonical URL of the HTML page */
  url: string;
  /** Absolute URL of the Markdown version */
  markdownUrl: string;
  title: string;
  description?: string;
  /** Blog post (og:type article) */
  isPost: boolean;
  published?: Date;
  /** Markdown of the page's <main> element */
  body: string;
}

const SITE_NAME = 'Mage-OS';
const SUMMARY =
  'Mage-OS is a community-owned, open-source ecommerce platform built on Magento Open Source. It is an independent, community-driven distribution of Magento Open Source, maintained by the not-for-profit Mage-OS Association.';
const INTRO = [
  '- Source code: https://github.com/mage-os',
  '- Composer repository: https://repo.mage-os.org/',
  '- Developer documentation: https://devdocs.mage-os.org/',
  '- Agent skill for installing, upgrading and migrating to Mage-OS: https://mage-os.org/.well-known/agent-skills/mage-os/SKILL.md (install with `npx skills add https://mage-os.org --skill mage-os`)',
];

/** llms.txt sections for pages, matched by path prefix. Other pages go to "Overview". */
const SECTIONS: Array<[heading: string, prefix: string]> = [
  ['Get started', '/get-started'],
  ['Product', '/product'],
  ['Community', '/community'],
  ['About', '/about'],
  ['Events', '/events'],
];
/** Post listings; llms.txt links the posts themselves. */
const LISTING_PREFIXES = ['/blog', '/category'];
const OPTIONAL_PAGES = ['/privacy', '/terms', '/imprint'];
const RELEASES_PREFIX = '/releases';
/** Number of recent non-release posts listed under "News"; older ones go to "Optional". */
const LATEST_NEWS = 20;

const DROPPED_TAGS = new Set([
  'audio',
  'canvas',
  'dialog',
  'form',
  'iframe',
  'noscript',
  'script',
  'style',
  'svg',
  'template',
  'video',
]);

const MARKDOWN_OPTIONS: MarkdownOptions = {
  bullet: '-',
  emphasis: '_',
  rule: '-',
  listItemIndent: 'one',
  extensions: [gfmToMarkdown()],
};

const isElement = (node: Nodes): node is Element => node.type === 'element';

const tokens = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(String) : typeof value === 'string' ? value.split(/\s+/) : [];

function find(node: Nodes, test: (element: Element) => boolean): Element | undefined {
  if (isElement(node) && test(node)) return node;
  if (!('children' in node)) return undefined;
  for (const child of node.children) {
    const match = find(child, test);
    if (match) return match;
  }
  return undefined;
}

const textOf = (node: Nodes): string =>
  node.type === 'text' ? node.value : 'children' in node ? node.children.map(textOf).join('') : '';

function absolute(value: string, base: URL): string {
  try {
    return new URL(value, base).href;
  } catch {
    return value;
  }
}

/** Line breaks inside a heading would turn it into a setext heading; use spaces instead. */
function replaceBreaks(element: Element): void {
  element.children = element.children.map((child): ElementContent => {
    if (!isElement(child)) return child;
    if (child.tagName === 'br') return { type: 'text', value: ' ' };
    replaceBreaks(child);
    return child;
  });
}

/** Removes non-content nodes and makes link and image URLs absolute, in place. */
function prepare(element: Element, base: URL): void {
  element.children = element.children.filter((child: ElementContent) => {
    if (!isElement(child)) return child.type === 'text';

    const { properties } = child;
    if (DROPPED_TAGS.has(child.tagName)) return false;
    if (properties.ariaHidden === true || properties.ariaHidden === 'true') return false;
    if (properties.dataLlmsIgnore !== undefined) return false;

    if (child.tagName === 'img') {
      const src = typeof properties.src === 'string' ? properties.src : '';
      // Images without alt text are decorative.
      if (!properties.alt || !src || src.startsWith('data:')) return false;
      properties.src = absolute(src, base);
    }
    if (child.tagName === 'a' && typeof properties.href === 'string') {
      properties.href = absolute(properties.href, base);
    }
    if (child.tagName === 'pre' && typeof properties.dataLanguage === 'string') {
      // Shiki puts the language on <pre>; hast-util-to-mdast reads it from <code>.
      const code = child.children.find((node) => isElement(node) && node.tagName === 'code');
      if (code && isElement(code)) code.properties.className = [`language-${properties.dataLanguage}`];
    }

    prepare(child, base);
    if (/^h[1-6]$/.test(child.tagName)) replaceBreaks(child);
    return true;
  });
}

/** Converts a built page to Markdown, or returns undefined if it declares no Markdown version. */
export function htmlToMarkdownPage(html: string): MarkdownPage | undefined {
  const tree = fromHtml(html);
  const head = find(tree, (element) => element.tagName === 'head');
  if (!head) return undefined;

  const linkHref = (rel: string, type?: string) => {
    const href = find(
      head,
      (element) =>
        element.tagName === 'link' &&
        tokens(element.properties.rel).includes(rel) &&
        (type === undefined || element.properties.type === type)
    )?.properties.href;
    return typeof href === 'string' ? href : undefined;
  };
  const metaContent = (test: (element: Element) => boolean) => {
    const content = find(head, (element) => element.tagName === 'meta' && test(element))?.properties.content;
    return typeof content === 'string' ? content : undefined;
  };

  const markdownHref = linkHref('alternate', 'text/markdown');
  const canonical = linkHref('canonical');
  const main =
    find(tree, (element) => element.tagName === 'main') ?? find(tree, (element) => element.tagName === 'body');
  if (!markdownHref || !canonical || !main) return undefined;

  const base = new URL(canonical);
  const isPost = metaContent((element) => tokens(element.properties.property).includes('og:type')) === 'article';
  const time = find(main, (element) => element.tagName === 'time' && typeof element.properties.dateTime === 'string');
  const published = isPost && time ? new Date(String(time.properties.dateTime)) : undefined;
  const title = find(head, (element) => element.tagName === 'title');

  prepare(main, base);

  return {
    url: base.href,
    markdownUrl: absolute(markdownHref, base),
    title: title ? textOf(title).trim() : base.href,
    description: metaContent((element) => element.properties.name === 'description'),
    isPost,
    published: published && !Number.isNaN(published.getTime()) ? published : undefined,
    body: toMarkdown(toMdast(main), MARKDOWN_OPTIONS)
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
  };
}

export function toMarkdownFile(page: MarkdownPage): string {
  const frontMatter = [
    `title: ${JSON.stringify(page.title)}`,
    page.description && `description: ${JSON.stringify(page.description)}`,
    page.published && `published: ${page.published.toISOString().slice(0, 10)}`,
    `url: ${page.url}`,
  ].filter(Boolean);
  return `---\n${frontMatter.join('\n')}\n---\n\n${page.body}\n`;
}

interface Section {
  heading: string;
  pages: MarkdownPage[];
}

const pathOf = (page: MarkdownPage) => new URL(page.url).pathname.replace(/\/$/, '') || '/';
const under = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);
const byPath = (a: MarkdownPage, b: MarkdownPage) => pathOf(a).localeCompare(pathOf(b));
const byNewest = (a: MarkdownPage, b: MarkdownPage) =>
  (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0) || byPath(a, b);

/** Groups pages into the llms.txt sections, in order. The last section is "Optional". */
export function groupPages(pages: MarkdownPage[]): Section[] {
  const overview: MarkdownPage[] = [];
  const sections = SECTIONS.map(([heading]) => ({ heading, pages: [] as MarkdownPage[] }));
  const releases: MarkdownPage[] = [];
  const news: MarkdownPage[] = [];
  const optional: MarkdownPage[] = [];

  for (const page of pages) {
    const pathname = pathOf(page);
    if (LISTING_PREFIXES.some((prefix) => under(pathname, prefix))) continue;
    if (page.isPost) {
      (under(pathname, RELEASES_PREFIX) ? releases : news).push(page);
    } else if (OPTIONAL_PAGES.includes(pathname)) {
      optional.push(page);
    } else {
      const index = SECTIONS.findIndex(([, prefix]) => under(pathname, prefix));
      (index === -1 ? overview : sections[index].pages).push(page);
    }
  }

  news.sort(byNewest);
  return [
    { heading: 'Overview', pages: overview.sort(byPath) },
    ...sections.map((section) => ({ ...section, pages: section.pages.sort(byPath) })),
    { heading: 'Releases', pages: releases.sort(byNewest) },
    { heading: 'News', pages: news.slice(0, LATEST_NEWS) },
    { heading: 'Optional', pages: [...news.slice(LATEST_NEWS), ...optional.sort(byPath)] },
  ].filter((section) => section.pages.length > 0);
}

const pageName = (page: MarkdownPage) =>
  page.title.replace(new RegExp(`(\\s+\\|\\s+${SITE_NAME})+$`), '').replace(/[\\[\]]/g, '\\$&');

function entry(page: MarkdownPage): string {
  const notes = [
    page.published && `Published ${page.published.toISOString().slice(0, 10)}.`,
    page.description?.replace(/\s+/g, ' ').trim(),
  ]
    .filter(Boolean)
    .join(' ');
  return `- [${pageName(page)}](${page.markdownUrl})${notes ? `: ${notes}` : ''}`;
}

export function buildLlmsTxt(pages: MarkdownPage[], siteUrl: string): string {
  const home = new URL('/', siteUrl).href;
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SUMMARY}`,
    '',
    ...INTRO,
    `- Markdown versions: append \`.md\` to any page URL, for example ${new URL('/get-started/installation.md', home).href} (the homepage is ${new URL('/index.md', home).href}).`,
    `- Full text of the pages below, except the Optional section, in one file: ${new URL('/llms-full.txt', home).href}`,
  ];
  for (const section of groupPages(pages)) {
    lines.push('', `## ${section.heading}`, '', ...section.pages.map(entry));
  }
  return `${lines.join('\n')}\n`;
}

export function buildLlmsFullTxt(pages: MarkdownPage[]): string {
  const parts = [`# ${SITE_NAME}`, `> ${SUMMARY}`];
  for (const section of groupPages(pages)) {
    if (section.heading === 'Optional') continue;
    for (const page of section.pages) parts.push('---', `Source: ${page.url}`, page.body);
  }
  return `${parts.join('\n\n')}\n`;
}

export default function llms(): AstroIntegration {
  let siteUrl = 'https://mage-os.org';

  return {
    name: 'mage-os:llms',
    hooks: {
      'astro:config:done': ({ config }) => {
        if (config.site) siteUrl = config.site;
      },
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = path.resolve(fileURLToPath(dir));
        const htmlFiles = (await fs.readdir(outDir, { recursive: true })).filter((file) => file.endsWith('.html'));
        const pages: MarkdownPage[] = [];

        for (const file of htmlFiles) {
          const page = htmlToMarkdownPage(await fs.readFile(path.join(outDir, file), 'utf8'));
          if (!page) continue;

          const target = path.join(outDir, decodeURIComponent(new URL(page.markdownUrl).pathname));
          if (!target.startsWith(outDir + path.sep) || !target.endsWith('.md')) {
            logger.warn(`Skipping ${file}: unexpected Markdown path ${page.markdownUrl}`);
            continue;
          }
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, toMarkdownFile(page));
          pages.push(page);
        }

        await fs.writeFile(path.join(outDir, 'llms.txt'), buildLlmsTxt(pages, siteUrl));
        await fs.writeFile(path.join(outDir, 'llms-full.txt'), buildLlmsFullTxt(pages));
        logger.info(`Wrote ${pages.length} Markdown pages, llms.txt and llms-full.txt`);
      },
    },
  };
}
