import assert from 'node:assert/strict';
import test from 'node:test';

import { buildLlmsFullTxt, buildLlmsTxt, htmlToMarkdownPage, toMarkdownFile } from '../src/integrations/llms.ts';

function html({
  path = '/community',
  title = 'Community | Mage-OS',
  type = 'website',
  main = '',
  alternate = true,
} = {}) {
  const markdownPath = `${path === '/' ? '/index' : path}.md`;
  return `<!doctype html><html><head>
    <title>${title}</title>
    <meta content="Join the community." name="description">
    <meta content="${type}" property="og:type">
    <link href="https://mage-os.org${path === '/' ? '' : path}" rel="canonical">
    ${alternate ? `<link href="${markdownPath}" rel="alternate" type="text/markdown">` : ''}
  </head><body>
    <header><nav>Menu</nav></header>
    <aside>Support Mage-OS</aside>
    <main id="main-content">${main}</main>
    <footer>Footer</footer>
  </body></html>`;
}

const page = (path, options = {}) => ({
  url: `https://mage-os.org${path}`,
  markdownUrl: `https://mage-os.org${path === '/' ? '/index' : path}.md`,
  title: `${path} | Mage-OS`,
  description: `About ${path}`,
  isPost: false,
  body: `# ${path}`,
  ...options,
});

test('pages without a Markdown alternate are skipped', () => {
  assert.equal(htmlToMarkdownPage(html({ alternate: false })), undefined);
});

test('converts only <main> and drops scripts, icons and ignored or decorative content', () => {
  const result = htmlToMarkdownPage(
    html({
      main: `
        <h1>Built by the Community,<br>For the Community</h1>
        <p>Read the <a href="/code-of-conduct">Code of Conduct</a>.</p>
        <svg aria-hidden="true"><path d="M0"></path></svg>
        <script>alert('x')</script>
        <span aria-hidden="true">decorative</span>
        <div data-llms-ignore>Skip me</div>
        <img src="/images/divider.png" alt="">
        <img src="/images/team.png" alt="The team">
        <div hidden><p>Inactive tab panel</p></div>
        <pre data-language="bash"><code>composer create-project</code></pre>`,
    })
  );

  assert.equal(result.url, 'https://mage-os.org/community');
  assert.equal(result.markdownUrl, 'https://mage-os.org/community.md');
  assert.equal(result.title, 'Community | Mage-OS');
  assert.equal(result.description, 'Join the community.');
  assert.equal(result.isPost, false);
  assert.match(result.body, /^# Built by the Community, For the Community$/m);
  assert.match(result.body, /\[Code of Conduct\]\(https:\/\/mage-os\.org\/code-of-conduct\)/);
  assert.match(result.body, /!\[The team\]\(https:\/\/mage-os\.org\/images\/team\.png\)/);
  assert.match(result.body, /Inactive tab panel/);
  assert.match(result.body, /```bash\ncomposer create-project\n```/);
  for (const unwanted of ['Menu', 'Support Mage-OS', 'Footer', 'alert', 'decorative', 'Skip me', 'divider.png']) {
    assert.doesNotMatch(result.body, new RegExp(unwanted));
  }
});

test('blog posts carry their publish date into the front matter', () => {
  const result = htmlToMarkdownPage(
    html({
      path: '/releases/mage-os-4-0-0',
      title: 'Mage-OS 4.0.0 | Mage-OS',
      type: 'article',
      main: '<time datetime="2026-10-30T18:00:00.000Z">Oct 30, 2026</time><p>Release notes</p>',
    })
  );

  assert.equal(result.isPost, true);
  assert.equal(result.published.toISOString(), '2026-10-30T18:00:00.000Z');
  assert.equal(
    toMarkdownFile(result),
    [
      '---',
      'title: "Mage-OS 4.0.0 | Mage-OS"',
      'description: "Join the community."',
      'published: 2026-10-30',
      'url: https://mage-os.org/releases/mage-os-4-0-0',
      '---',
      '',
      'Oct 30, 2026',
      '',
      'Release notes',
      '',
    ].join('\n')
  );
});

test('llms.txt groups pages into sections and keeps only recent news outside Optional', () => {
  const news = Array.from({ length: 22 }, (_, i) =>
    page(`/updates/post-${String(i).padStart(2, '0')}`, { isPost: true, published: new Date(Date.UTC(2026, 0, i + 1)) })
  );
  const pages = [
    page('/privacy'),
    page('/community'),
    page('/get-started/installation'),
    page('/blog'),
    page('/category/releases'),
    page('/', { title: 'Mage-OS | Community-Driven Open Source Commerce Platform' }),
    page('/releases/mage-os-4-0-0', { isPost: true, published: new Date('2026-10-30') }),
    ...news,
  ];
  const llms = buildLlmsTxt(pages, 'https://mage-os.org');

  assert.match(llms, /^# Mage-OS\n\n> /);
  assert.deepEqual(
    [...llms.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
    ['Overview', 'Get started', 'Community', 'Releases', 'News', 'Optional']
  );
  assert.match(llms, /^- \[\/community\]\(https:\/\/mage-os\.org\/community\.md\): About \/community$/m);
  assert.match(llms, /^- \[\/releases\/mage-os-4-0-0\]\(.+\): Published 2026-10-30\. About/m);
  assert.doesNotMatch(llms, /\/blog\.md|\/category\//);

  const [, newsSection, optionalSection] = llms.split(/^## (?:News|Optional)$/m);
  assert.equal(newsSection.match(/^- /gm).length, 20);
  assert.match(newsSection, /post-21\.md/);
  assert.match(optionalSection, /post-01\.md[\s\S]*post-00\.md[\s\S]*privacy\.md/);

  const full = buildLlmsFullTxt(pages);
  assert.match(full, /Source: https:\/\/mage-os\.org\/community\n\n# \/community/);
  assert.doesNotMatch(full, /privacy|post-00/);
});
