# AGENTS.md

Instructions for AI coding agents (and humans) working on this repository. This file is the single source of truth: `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md` and `.aider.conf.yml` only point here. Put new guidance in this file, not in those.

## Project

The Mage-OS marketing website, https://mage-os.org. Mage-OS is a community-driven distribution of Magento Open Source; the site explains the product, gets people started, and covers the community, events and releases.

- Static site: Astro 5 on the AstroWind theme, Tailwind CSS 3, TypeScript. No frontend framework; client code is plain TypeScript in `<script>` tags.
- Hosted on Cloudflare Pages. Every push to `main` deploys, every pull request gets a preview URL, and a scheduled job rebuilds daily at 12:00 UTC.
- Editors also change content through Sveltia CMS at `/admin` (`public/admin/config.yml`), which commits to `main`.
- Audiences and messaging: `docs/PERSONAS.md` and `docs/WEBSITE-STRATEGY.md`.

## Setup and commands

Use Node.js 22 (what CI runs) and npm.

| Command | What it does |
| --- | --- |
| `npm ci` | Install dependencies from the lockfile |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run check` | Type check (`astro check`), ESLint and Prettier. **Run before every commit**; CI runs the same checks |
| `npm run fix` | Apply ESLint fixes and Prettier formatting |
| `node --test tests/*.test.mjs` | Unit tests (Node test runner) |
| `npm run test:a11y` | Build, then run pa11y accessibility checks |

If `npm ci` fails while installing `sharp` because a system-wide libvips is present, rerun it with `SHARP_IGNORE_GLOBAL_LIBVIPS=1`.

## Repository layout

```text
src/
  pages/               File-based routes, mostly .astro; [...blog]/ renders posts and listings
  layouts/             Layout.astro (<html>, <head>), PageLayout.astro (header, footer, <main>), others
  components/ui/       Building blocks: Callout, CodeBlock, TabbedContent, AccordionFAQ, Button, ...
  components/widgets/  Page sections: PageHero, Features, Content, CallToAction, ...
  components/blog/     Post lists and single post
  components/common/   Head tags, analytics, cookie consent, structured data
  content/config.ts    Content collection schemas (posts, events, authors)
  data/post/           Blog posts
  data/events/         Events
  data/authors/        Authors
  data/*.json, *.yaml  Lab catalogue, system specs settings, minimal-distribution packages
  assets/images/       Images processed by Astro
  navigation.ts        Header and footer menus
  config.yaml          Site URL, SEO defaults, blog settings
  utils/               Helpers (permalinks, images, blog, ...)
public/                Served as-is: _headers, _redirects, robots.txt, admin/ (Sveltia CMS)
vendor/integration/    AstroWind integration (loads src/config.yaml, adds the sitemap to robots.txt)
scripts/               Maintenance scripts (Lab catalogue refresh, one-off migrations)
tests/                 Unit tests
docs/                  Guides, see below
```

## Writing code

- **Reuse first.** Check `src/components/ui` and `src/components/widgets` (catalogued in `docs/DEVELOPMENT-GUIDE.md`) before creating a component.
- **Dark mode is required.** Every color utility needs a `dark:` variant, e.g. `bg-white dark:bg-gray-900 text-gray-900 dark:text-white`.
- Use `Callout` (`info`, `tip`, `warning`, `danger`) instead of `<blockquote>`, and `CodeBlock` for code.
- Wrap Markdown-like content in `prose dark:prose-invert prose-headings:font-heading prose-headings:font-bold max-w-none`.
- Import from `src` with the `~/` alias. Icons: `<Icon name="tabler:..." />` from `astro-icon/components`.
- Images go in `src/assets/images/` and render through `~/components/common/Image.astro`. Every meaningful image needs alt text; decorative ones get `alt=""`.
- Build internal links with `getPermalink()` from `~/utils/permalinks`.
- Page metadata: pass `{ title, description }` to the layout. The title template appends ` | Mage-OS`, so don't include it in `title`.
- Pages use View Transitions (`ClientRouter`). Scripts that touch the DOM must also run on `astro:after-swap` or `astro:page-load`, not only on the first load.
- Accessibility: keep heading levels in order, label controls, keep keyboard navigation and color contrast intact. CI runs pa11y and Lighthouse.
- Formatting is Prettier (120 columns, single quotes) plus ESLint; `npm run fix` applies both.
- Don't add dependencies for things a few lines of code can do.

New page skeleton:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import PageHero from '~/components/widgets/PageHero.astro';

const metadata = { title: 'Page Title', description: 'One or two sentences for search results.' };
---

<Layout metadata={metadata}>
  <PageHero tagline="Section">
    <Fragment slot="title">Page Title</Fragment>
    <Fragment slot="subtitle">Brief description.</Fragment>
  </PageHero>
  <section class="px-4 py-8 sm:px-6 mx-auto lg:px-8 max-w-4xl">
    <div class="prose dark:prose-invert prose-headings:font-heading prose-headings:font-bold max-w-none">...</div>
  </section>
</Layout>
```

Add new pages to `src/navigation.ts` if they belong in the menus.

## Content

Full guide: `docs/CONTENT-MANAGEMENT.md`.

- **Posts:** `src/data/post/YYYY-MM-DD-slug.md` (or `.mdx` for components). Front matter: `title`, `publishDate` (ISO 8601), `category`, `author`, `excerpt`, `tags`, optional `image` and `draft`. Categories in use: Updates, Releases, Events, Initiatives, Case Studies, eCommerce Insights. A post's URL is `/<category slug>/<file name>`, e.g. `/releases/2026-10-30-mage-os-4-0-0-release` or `/case-studies/...`.
- **Events:** `src/data/events/YYYY-MM-DD-event-slug.md` with `title`, `date`, `location`, and optionally `endDate`, `venue`, `url`, `excerpt`, `image`.
- **New Mage-OS release:** follow the checklist under "New Mage-OS Release" in `docs/CONTENT-MANAGEMENT.md` (release post, releases page, Get Started pages).
- **Moving or removing a page:** add a 301 to `public/_redirects`. Rules there are exact paths.
- **Lab catalogue** (`src/data/lab-modules.json`): generated by `npm run refresh:labs` and refreshed weekly by a workflow pull request. Don't edit it by hand.
- **System requirements** come from mage-os/github-actions at build time; minimum and recommended versions are set in `src/data/system-specs-config.yaml`.
- If you change a content schema in `src/content/config.ts`, update the matching CMS collection in `public/admin/config.yml`.
- Write in US English, plainly, for an international audience, and in line with the [Code of Conduct](https://mage-os.org/code-of-conduct).

## Pull requests

- Branch from `main` (`fix/...`, `feature/...`, `content/...`).
- Commit messages and PR titles: imperative, sentence case, no prefixes, e.g. "Add Meet Magento Florida 2027 event". PRs are usually squash-merged.
- Before opening a PR, run `npm run check` and `npm run build`.
- For visual changes, check light and dark mode on mobile and desktop, and add screenshots to the PR. Cloudflare Pages comments a preview URL on each PR.
- Never commit secrets. Settings such as `DONATION_CAMPAIGN_ENABLED` are build-time environment variables in Cloudflare Pages.

## More documentation

| File | Covers |
| --- | --- |
| `docs/DEVELOPMENT-GUIDE.md` | Components, widgets, styling, accessibility, page patterns |
| `docs/CONTENT-MANAGEMENT.md` | Posts, events, pages, navigation, release checklist |
| `docs/PERSONAS.md` | Who the site is for |
| `docs/WEBSITE-STRATEGY.md` | Messaging and site structure |
| `docs/donation-tracking.md` | Membership campaign and its analytics |
| `README.md` | Overview, deployment, redirects and headers |

## Agent tool support

Which file each tool reads (late 2026). Keep the pointer files as pointers.

| Tool | Reads |
| --- | --- |
| OpenAI Codex, Cursor, GitHub Copilot (VS Code agent, cloud agent, code review on github.com), Windsurf / Devin Desktop, JetBrains Junie, Cline, Kilo Code, OpenCode, Amp, Kiro, Augment, Factory Droid, Continue | `AGENTS.md` directly |
| Claude Code | `CLAUDE.md`, which imports this file |
| Gemini CLI | `GEMINI.md`, which imports this file |
| Copilot Chat and code review in VS Code, Visual Studio, JetBrains IDEs, Xcode and Eclipse; Zed | `.github/copilot-instructions.md`, which points here |
| Aider | `.aider.conf.yml`, which loads this file |

Don't add `.junie/AGENTS.md`, `.rules`, `.cursorrules`, `.windsurfrules` or `.clinerules`: Junie and Zed would read those instead of this file.
