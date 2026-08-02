#!/usr/bin/env node

// Refreshes the Mage-OS Lab catalogue. Repository metadata is fetched first;
// unchanged projects retain their existing enriched data so later runs only
// inspect repositories that have actually received a new push.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORGANISATION = 'mage-os-lab';
const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(rootDirectory, 'src/data/lab-modules.json');
const forceRefresh = process.argv.includes('--all');
const dryRun = process.argv.includes('--dry-run');
const contributorsOnly = process.argv.includes('--contributors-only');
const checkedAt = new Date().toISOString();
const recentCutoff = new Date(checkedAt);
recentCutoff.setUTCDate(recentCutoff.getUTCDate() - 180);

const excludedRepositories = new Set([
  '.github',
  'demo.mage-os.org',
  'mageos-module-template',
  'pagebuilder-suite-doc',
  'zed-editor-extensions',
]);

const curation = {
  'graphql-playground': {
    title: 'GraphQL Playground',
    category: 'Developer tools',
    kind: 'Developer module',
    summary: 'An in-store GraphiQL workspace for exploring Mage-OS and Magento GraphQL queries and mutations.',
    howToUse: 'Enable the module, then open /graphiql while the store is in developer mode.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2 with GraphQL',
    status: 'Experimental',
    note: 'The maintainers explicitly state that this module is not intended for production use.',
  },
  'llms.txt': {
    title: 'LLMs.txt',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary: 'Creates an editable llms.txt for a store, with optional OpenAI-assisted content generation.',
    howToUse:
      'Configure the module under Stores → Configuration → AI → LLMs.txt, generate or edit the content, then publish it at /llms.txt.',
    requirements: 'Mage-OS or Magento 2.4.x; OpenAI API key for assisted generation',
  },
  'mage-os-installer': {
    title: 'Mage-OS Installer',
    category: 'Developer tools',
    kind: 'CLI tool',
    summary: 'An interactive installer that prepares a local Mage-OS project using DDEV or Warden.',
    howToUse:
      'Run mage-os-install in the directory where you want a project and follow the environment and admin setup prompts.',
    requirements: 'Docker plus DDEV or Warden',
    install: 'Download a release binary, or run: go install github.com/mage-os-lab/mage-os-installer@latest',
  },
  'magento2-lsp': {
    title: 'Magento 2 LSP & MCP',
    category: 'Developer tools',
    kind: 'Editor tooling',
    summary:
      'Magento-aware language and MCP servers for navigation, diagnostics, refactoring, and merged configuration insight.',
    howToUse:
      'Install the package globally, then configure magento2-lsp in an editor or magento2-lsp-mcp in an AI coding agent.',
    requirements: 'Node.js 20+',
    install: 'npm install -g @mage-os/magento2-lsp',
  },
  'mageos-pretty-cli': {
    title: 'Pretty CLI',
    category: 'Developer tools',
    kind: 'Developer module',
    summary: 'Reusable components for producing clearer output in Mage-OS console commands.',
    howToUse: 'Reference the package from a custom console command and use its output components.',
    note: 'This repository is archived and no longer actively maintained.',
  },
  'migrate-m2-to-mageos': {
    title: 'Migrate Magento 2 to Mage-OS',
    category: 'Developer tools',
    kind: 'Migration tool',
    summary:
      'A guided shell migration that switches a compatible Magento Open Source installation to Mage-OS packages.',
    howToUse:
      'Back up and test on staging, review the migration script, then run the command documented in the repository.',
    requirements: 'A compatible Magento Open Source installation; shell access',
    install:
      'bash <(curl -s https://raw.githubusercontent.com/mage-os-lab/migrate-m2-to-mageos/refs/heads/main/migrate-to-mage-os.sh)',
  },
  'module-admin-assistant': {
    title: 'Admin Assistant',
    category: 'AI & automation',
    kind: 'Admin module',
    summary: 'Adds an AI chat assistant to the Magento admin for store operations and contextual help.',
    howToUse: 'Install and enable the module, configure an AI provider, then use the assistant from the admin panel.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; supported AI provider credentials',
  },
  'module-admin-user-time-zone': {
    title: 'Admin User Time Zone',
    category: 'Admin & operations',
    kind: 'Admin module',
    summary: 'Lets each admin user view backend dates and times in their own time zone.',
    howToUse: 'Install the module, run setup:upgrade, and choose a time zone in each admin user profile.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2',
  },
  'module-advanced-widget': {
    title: 'Advanced Widget',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'Extends CMS widgets with configurable repeatable rows, image pickers, product pickers, and richer fields.',
    howToUse:
      'Install the module, define an advanced widget, then configure its repeatable content in Page Builder or CMS.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; Page Builder Widget dependency',
  },
  'module-ai-base': {
    title: 'AI Base',
    category: 'AI & automation',
    kind: 'Foundation module',
    summary: 'A shared configuration and adapter layer for modules that need one or more AI backends.',
    howToUse:
      'Install and enable the module, configure providers under Services → AI Configuration, then integrate through its provider interfaces.',
    requirements: 'PHP 8.2+; Mage-OS or Magento 2',
  },
  'module-alpine-loader': {
    title: 'Alpine Loader',
    category: 'Storefront',
    kind: 'Frontend module',
    summary: 'An early proof of concept for initializing Alpine.js in a Mage-OS storefront.',
    howToUse: 'Evaluate from source in a development store; the public API and feature set are still being defined.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2',
    status: 'Experimental',
    note: 'The README labels this as a proof of concept and does not yet document finished features.',
  },
  'module-alpine-local-storage': {
    title: 'Alpine Local Storage',
    category: 'Storefront',
    kind: 'Frontend module',
    summary: 'Provides local-storage behaviour for the experimental Alpine-based storefront module set.',
    howToUse:
      'Install alongside the related Alpine storefront modules and validate the integration in a development environment.',
    requirements: 'Mage-OS or Magento 2; related Alpine storefront modules',
  },
  'module-alpine-messages': {
    title: 'Alpine Messages',
    category: 'Storefront',
    kind: 'Frontend module',
    summary: 'Implements storefront message handling for the experimental Alpine-based frontend stack.',
    howToUse:
      'Install alongside the Alpine module set and test storefront notices and session messages in development.',
    requirements: 'Mage-OS or Magento 2; related Alpine storefront modules',
  },
  'module-alpine-minicart': {
    title: 'Alpine Minicart',
    category: 'Storefront',
    kind: 'Frontend module',
    summary: 'An Alpine.js implementation of the Mage-OS storefront minicart experience.',
    howToUse: 'Install it as part of the Alpine storefront stack and validate cart behaviour with the selected theme.',
    requirements: 'Mage-OS or Magento 2; related Alpine storefront modules',
  },
  'module-alpine-toplinks': {
    title: 'Alpine Top Links',
    category: 'Storefront',
    kind: 'Frontend concept',
    summary: 'A reserved Lab project for Alpine-powered customer and account links in the storefront header.',
    howToUse: 'Not installable yet; follow the repository for its first implementation.',
    requirements: 'Not yet documented',
    install: 'Not installable yet',
    status: 'Incubating',
    note: 'The repository does not yet contain an implementation or installation documentation.',
  },
  'module-blog': {
    title: 'Blog',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'A full blog for Mage-OS and Magento with authors, scheduling, SEO, RSS, widgets, GraphQL, Luma, and Hyvä support.',
    howToUse:
      'Enable the module, manage posts and taxonomy in the admin, then place its routes or widgets in the storefront.',
    requirements: 'PHP 8.2+; Mage-OS or Magento 2; Luma or Hyvä',
  },
  'module-blog-hyva': {
    title: 'Blog Hyvä Compatibility',
    category: 'Content & merchandising',
    kind: 'Compatibility module',
    summary: 'Hyvä storefront templates and compatibility work for the Mage-OS Blog module.',
    howToUse: 'Install it with the main Blog module when the storefront uses a Hyvä theme.',
    requirements: 'Mage-OS Blog and a Hyvä theme',
  },
  'module-catalog-data-ai': {
    title: 'AI Catalog Data',
    category: 'AI & automation',
    kind: 'Admin module',
    summary: 'Generates and refines product descriptions and other catalog content with an AI provider.',
    howToUse: 'Configure an AI provider, then generate content from supported product-editing workflows in the admin.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; AI provider credentials',
  },
  'module-digital-signature': {
    title: 'Digital Signature',
    category: 'Admin & operations',
    kind: 'Commerce module',
    summary: 'Builds order contract PDFs and sends them to an external provider for digital signature.',
    howToUse: 'Configure a signature provider and PDF template, then initiate and track signing for eligible orders.',
    requirements: 'PHP 8.1–8.5; Mage-OS or Magento 2; supported signature provider',
  },
  'module-eav-debug-views': {
    title: 'EAV Debug Views',
    category: 'Developer tools',
    kind: 'Developer module',
    summary: 'Creates database views that flatten EAV entity values into easier-to-query JSON structures.',
    howToUse:
      'Install in a development environment and query the generated database views during debugging or data analysis.',
    requirements: 'Mage-OS or Magento 2.4.x; database access',
    note: 'Designed for development and debugging; the maintainers advise evaluating database overhead before production use.',
  },
  'module-flexible-ads': {
    title: 'Flexible Ads',
    category: 'Content & merchandising',
    kind: 'Commerce concept',
    summary: 'A newly reserved Lab project for flexible promotional and advertising content.',
    howToUse: 'Not installable yet; follow the repository as the initial scope is defined.',
    requirements: 'Not yet documented',
    install: 'Not installable yet',
    status: 'Incubating',
    note: 'The repository was created recently and does not yet contain an implementation.',
  },
  'module-hreflang': {
    title: 'Hreflang',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary: 'Adds locale-aware hreflang links for CMS pages, products, and categories.',
    howToUse: 'Install and enable the module, then configure locale relationships for relevant store views and URLs.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2',
  },
  'module-js-replacement': {
    title: 'JavaScript Replacement',
    category: 'Performance & runtime',
    kind: 'Frontend concept',
    summary: 'A reserved project for replacing selected legacy storefront JavaScript dependencies.',
    howToUse: 'Not installable yet; track the repository for a documented implementation.',
    requirements: 'Not yet documented',
    install: 'Not installable yet',
    status: 'Incubating',
    note: 'The repository does not yet contain an implementation.',
  },
  'module-maxmind-geoip-redirect': {
    title: 'MaxMind GeoIP Redirect',
    category: 'Storefront',
    kind: 'Commerce module',
    summary:
      'Routes visitors to an appropriate store view using MaxMind GeoLite2 location data, with IPv4, IPv6, and Varnish support.',
    howToUse: 'Install the module, provide a GeoLite2 database, and configure country-to-store redirect rules.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; MaxMind GeoLite2 data',
  },
  'module-newsletter-coupon': {
    title: 'Newsletter Coupon',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'Creates a unique cart-rule coupon for each new newsletter subscriber and includes it in the welcome email.',
    howToUse:
      'Configure the source cart rule and newsletter behaviour, then the module generates coupons during subscription.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2',
  },
  'module-page-builder-graph-ql': {
    title: 'Page Builder GraphQL',
    category: 'Content & merchandising',
    kind: 'Headless module',
    summary: 'Converts Page Builder output into structured JSON for GraphQL and headless storefronts.',
    howToUse:
      'Install the module and request Page Builder content through its GraphQL fields instead of consuming rendered HTML.',
    requirements: 'Mage-OS or Magento 2 with Page Builder and GraphQL',
  },
  'module-passkey-auth': {
    title: 'Passkey Authentication',
    category: 'Security & access',
    kind: 'Customer module',
    summary: 'Lets storefront customers register and sign in with WebAuthn passkeys.',
    howToUse: 'Enable the module over HTTPS, then customers can register and manage passkeys from their account.',
    requirements: 'PHP 8.2+; Mage-OS or Magento 2; HTTPS and a WebAuthn-capable browser',
    note: 'The latest published release is a beta; evaluate account recovery and browser coverage before production rollout.',
  },
  'module-require-js-optimizer': {
    title: 'RequireJS Optimizer',
    category: 'Performance & runtime',
    kind: 'Frontend module',
    summary: 'Removes selected unnecessary dependencies from generated RequireJS configuration assets.',
    howToUse:
      'Evaluate on a development store, configure replacement rules, and verify every affected storefront flow.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2 with RequireJS storefront assets',
    status: 'Experimental',
    note: 'The README describes this as a proof of concept with incomplete controller handling.',
  },
  'module-seo': {
    title: 'SEO, AEO & GEO',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary:
      'A broad search and answer-engine toolkit covering structured data, social metadata, canonicals, hreflang, and AI discovery files.',
    howToUse:
      'Install the module, configure the required SEO features per store, then validate generated markup and crawler files.',
    requirements: 'PHP 8.1–8.5; Mage-OS or Magento 2',
  },
  'module-store-locator': {
    title: 'Store Locator',
    category: 'Storefront',
    kind: 'Commerce module',
    summary:
      'Manages physical locations and helps customers find them with text search, maps, and browser geolocation.',
    howToUse:
      'Create stores in the admin, choose Google Maps or OpenStreetMap, then link the locator page from the storefront.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; map provider configuration',
  },
  'module-theme-uikit': {
    title: 'UIkit Theme Utilities',
    category: 'Storefront',
    kind: 'Theme module',
    summary: 'Build and asset utilities used by the Mage-OS UIkit storefront theme.',
    howToUse: 'Install it with theme-frontend-uikit, then use its asset compilation and theme utility features.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; UIkit frontend theme',
  },
  'module-uikit-js-replacement': {
    title: 'UIkit JavaScript Replacement',
    category: 'Storefront',
    kind: 'Theme module',
    summary: 'Removes selected unnecessary JavaScript dependencies from UIkit-based storefront themes.',
    howToUse: 'Test with the UIkit theme in development and verify affected customer journeys before wider use.',
    requirements: 'PHP 8.1+; UIkit frontend theme',
    status: 'Experimental',
    note: 'The README labels this a proof of concept and notes incomplete controller handling.',
  },
  'module-uikit-menu': {
    title: 'UIkit Menu',
    category: 'Storefront',
    kind: 'Theme module',
    summary: 'Provides the storefront navigation implementation for the Mage-OS UIkit theme.',
    howToUse: 'Install it with the UIkit theme and configure the standard catalog navigation.',
    requirements: 'PHP 8.1+; UIkit frontend theme',
  },
  'module-uikit-product-page': {
    title: 'UIkit Product Page',
    category: 'Storefront',
    kind: 'Theme module',
    summary: 'Product-page layout and JavaScript adaptations for the Mage-OS UIkit theme.',
    howToUse:
      'Install it with the UIkit theme and validate product configuration, media, pricing, and cart interactions.',
    requirements: 'PHP 8.1+; UIkit frontend theme',
  },
  'module-vanilla-core': {
    title: 'Vanilla Core',
    category: 'Storefront',
    kind: 'Frontend concept',
    summary: 'A reserved Lab project for a minimal, framework-light storefront foundation.',
    howToUse: 'Not installable yet; follow the repository for the first public implementation.',
    requirements: 'Not yet documented',
    install: 'Not installable yet',
    status: 'Incubating',
    note: 'The repository does not yet contain an implementation.',
  },
  'module-widgetkit': {
    title: 'Widgetkit',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary: 'A collection of Page Builder CMS widgets with previews and Hyvä-compatible Tailwind output.',
    howToUse: 'Install the module, then add and configure its widget collection through Page Builder.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; Page Builder; Hyvä supported',
  },
  'module-worker-mode': {
    title: 'FrankenPHP Worker Mode',
    category: 'Performance & runtime',
    kind: 'Runtime module',
    summary: 'Resets request-scoped Magento state so a store can run safely in FrankenPHP worker mode.',
    howToUse:
      'Install and enable the module, configure FrankenPHP worker mode, then load-test state isolation before production use.',
    requirements: 'PHP 8.0–8.5; Mage-OS or Magento 2; FrankenPHP',
  },
  'module-worker-mode-hyva': {
    title: 'FrankenPHP Worker Mode for Hyvä',
    category: 'Performance & runtime',
    kind: 'Compatibility module',
    summary: 'Prevents Hyvä CSP state leaking between requests under FrankenPHP worker mode.',
    howToUse: 'Install it alongside Worker Mode and Hyvä, then verify CSP behaviour across repeated worker requests.',
    requirements: 'Worker Mode module; Hyvä theme module; FrankenPHP',
  },
  'patch-objectmanager-lazy-object': {
    title: 'ObjectManager Lazy Object Patch',
    category: 'Performance & runtime',
    kind: 'Experimental patch',
    summary: 'Explores PHP 8.4 native lazy objects in the Magento ObjectManager to reduce request startup work.',
    howToUse:
      'Apply the patch with cweagans/composer-patches only in a controlled test environment and benchmark compatibility.',
    requirements: 'PHP 8.4+; Mage-OS or Magento 2; composer-patches',
    install: 'Apply lazyObjectsPatch.patch with cweagans/composer-patches',
    status: 'Experimental',
    note: 'The maintainers describe this as experimental and not yet battle-tested in production.',
  },
  'theme-frontend-uikit': {
    title: 'UIkit Frontend Theme',
    category: 'Storefront',
    kind: 'Theme',
    summary: 'A UIkit 3 storefront theme that retains native Magento LESS tooling and broad Luma-style compatibility.',
    howToUse:
      'Install the theme and its utilities module, register it in the admin, then inherit or customize it for the storefront.',
    requirements: 'Mage-OS or Magento 2; UIkit Theme Utilities module',
  },
  'web-installer': {
    title: 'Web Installer',
    category: 'Developer tools',
    kind: 'Installer component',
    summary: 'A browser-based setup experiment for installing Mage-OS.',
    howToUse: 'Kept for historical reference; do not start a new installation workflow with this archived project.',
    note: 'Archived after not reaching a stable release; the repository invites interested maintainers to contact Mage-OS.',
  },
  'zed-magento2-snippets': {
    title: 'Magento 2 Snippets for Zed',
    category: 'Developer tools',
    kind: 'Editor extension',
    summary: 'Zed snippets for common Magento 2 and Hyvä PHP, XML, PHTML, CSP, and Alpine patterns.',
    howToUse: 'Open Zed Extensions, search for “Magento 2 Snippets”, and install the extension.',
    requirements: 'Zed editor',
    install: 'Install “Magento 2 Snippets” from the Zed Extensions panel',
  },
};

function ghApi(arguments_) {
  return JSON.parse(
    execFileSync('gh', ['api', ...arguments_], {
      cwd: rootDirectory,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
    })
  );
}

function readExistingCatalogue() {
  try {
    return JSON.parse(readFileSync(outputPath, 'utf8'));
  } catch {
    return { modules: [] };
  }
}

function readRepositoryDetails(repository) {
  const query = `
    query RepositoryDetails($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        defaultBranchRef {
          name
          target { ... on Commit { history { totalCount } } }
        }
        latestRelease { tagName publishedAt }
        readme: object(expression: "HEAD:README.md") { ... on Blob { text } }
        composer: object(expression: "HEAD:composer.json") { ... on Blob { text } }
        package: object(expression: "HEAD:package.json") { ... on Blob { text } }
        workflows: object(expression: "HEAD:.github/workflows") { ... on Tree { entries { name } } }
        testsUpper: object(expression: "HEAD:Test") { ... on Tree { entries { name } } }
        testsLower: object(expression: "HEAD:tests") { ... on Tree { entries { name } } }
      }
    }
  `;

  return ghApi(['graphql', '-f', `query=${query}`, '-F', `owner=${ORGANISATION}`, '-F', `name=${repository.name}`]).data
    .repository;
}

function normaliseContributors(entries) {
  return entries
    .filter(
      (entry) =>
        entry?.login && entry.type === 'User' && !entry.login.endsWith('[bot]') && entry.login !== 'github-actions'
    )
    .slice(0, 12)
    .map((entry) => ({
      login: entry.login,
      url: entry.html_url,
      contributions: entry.contributions,
    }));
}

function readContributors(repository) {
  return normaliseContributors(ghApi([`repos/${ORGANISATION}/${repository.name}/contributors?per_page=100&anon=0`]));
}

async function readPublicContributors(repositoryName) {
  const response = await fetch(
    `https://api.github.com/repos/${ORGANISATION}/${encodeURIComponent(repositoryName)}/contributors?per_page=100&anon=0`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'mage-os-lab-catalogue',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  if (response.status === 204) return [];
  if (!response.ok) {
    throw new Error(`GitHub contributors request failed for ${repositoryName}: ${response.status}`);
  }

  return normaliseContributors(await response.json());
}

function parseJson(text) {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function titleFromRepository(name) {
  return name
    .replace(/^module-/, '')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function composerNameIsUsable(name) {
  return Boolean(name && !name.includes(':') && name.includes('/'));
}

function buildModule(repository, details, contributors) {
  const curated = curation[repository.name] ?? {};
  const readme = details.readme?.text ?? '';
  const composer = parseJson(details.composer?.text);
  const packageJson = parseJson(details.package?.text);
  const composerName = composerNameIsUsable(composer.name) ? composer.name : null;
  const npmName = packageJson.name && !packageJson.private ? packageJson.name : null;
  const install =
    curated.install ??
    (composerName
      ? `composer require ${composerName}`
      : npmName
        ? `npm install -g ${npmName}`
        : 'See the repository for installation guidance');
  const latestRelease = details.latestRelease
    ? { tag: details.latestRelease.tagName, date: details.latestRelease.publishedAt }
    : null;
  const hasDocumentation = readme.length >= 250 && /(install|usage|getting started|how to)/i.test(readme);
  const isInstallable =
    install !== 'Not installable yet' &&
    (Boolean(composerName || npmName || curated.install) || Boolean(latestRelease));
  const hasTests = Boolean(
    details.testsUpper || details.testsLower || packageJson.scripts?.test || /## Testing\b/i.test(readme)
  );
  const hasAutomation = (details.workflows?.entries?.length ?? 0) > 0;
  const isRecentlyMaintained = new Date(repository.pushed_at) >= recentCutoff;
  const signals = {
    documentation: hasDocumentation,
    installable: isInstallable,
    release: Boolean(latestRelease),
    tests: hasTests,
    automation: hasAutomation,
    recentActivity: isRecentlyMaintained,
  };
  const score = Object.values(signals).filter(Boolean).length;
  const hasImplementation = Boolean(
    details.defaultBranchRef && (details.defaultBranchRef.target?.history?.totalCount ?? 0) > 0
  );
  let label = score >= 5 ? 'Strong signals' : score >= 3 ? 'Developing' : score >= 1 ? 'Experimental' : 'Incubating';

  if (!hasImplementation || install === 'Not installable yet') label = 'Incubating';
  if (curated.status) label = curated.status;
  if (repository.archived) label = 'Archived';

  return {
    slug: repository.name,
    title: curated.title ?? titleFromRepository(repository.name),
    repository: repository.name,
    url: repository.html_url,
    issuesUrl: `${repository.html_url}/issues`,
    summary: curated.summary ?? repository.description ?? 'A Mage-OS Lab project.',
    category: curated.category ?? 'Other',
    kind: curated.kind ?? 'Lab project',
    howToUse: curated.howToUse ?? 'See the repository README for current usage guidance.',
    install,
    requirements:
      curated.requirements ??
      (composer.require?.php ? `PHP ${composer.require.php}; Mage-OS or Magento 2` : 'See repository documentation'),
    compatibility:
      curated.compatibility ?? 'Check the package constraints and README against your store version before installing.',
    caveat: curated.note ?? null,
    package: composerName ?? npmName,
    archived: repository.archived,
    sourceUpdatedAt: repository.pushed_at,
    dataCheckedAt: checkedAt,
    latestRelease,
    language: repository.language ?? null,
    license:
      repository.license?.spdx_id && repository.license.spdx_id !== 'NOASSERTION' ? repository.license.spdx_id : null,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    openIssues: repository.open_issues_count,
    defaultBranch: details.defaultBranchRef?.name ?? repository.default_branch ?? null,
    commitCount: details.defaultBranchRef?.target?.history?.totalCount ?? 0,
    contributors,
    quality: { score, total: 6, label, signals },
  };
}

if (contributorsOnly) {
  const existingCatalogue = readExistingCatalogue();
  const modules = [];

  for (const module of existingCatalogue.modules) {
    const contributors = await readPublicContributors(module.repository);
    modules.push({ ...module, contributors, dataCheckedAt: checkedAt });
    console.log(`Contributors: ${module.repository} (${contributors.length})`);
  }

  const catalogue = {
    ...existingCatalogue,
    schemaVersion: 2,
    catalogueUpdatedAt: checkedAt,
    modules,
  };

  if (!dryRun) writeFileSync(outputPath, `${JSON.stringify(catalogue, null, 2)}\n`);
  console.log(`Mage-OS Lab catalogue: contributor data refreshed for ${modules.length} projects.`);
  if (dryRun) console.log('Dry run: no file written.');
} else {
  const existingCatalogue = readExistingCatalogue();
  const existingByRepository = new Map(existingCatalogue.modules.map((module) => [module.repository, module]));
  const repositories = ghApi([`orgs/${ORGANISATION}/repos?per_page=100&type=public&sort=full_name`])
    .filter((repository) => !excludedRepositories.has(repository.name) && !repository.fork)
    .sort((a, b) => a.name.localeCompare(b.name));

  const modules = [];
  const refreshed = [];
  const unchanged = [];

  for (const repository of repositories) {
    const existing = existingByRepository.get(repository.name);
    if (!forceRefresh && existing?.sourceUpdatedAt === repository.pushed_at && Array.isArray(existing.contributors)) {
      modules.push(existing);
      unchanged.push(repository.name);
      continue;
    }

    const details = readRepositoryDetails(repository);
    modules.push(buildModule(repository, details, readContributors(repository)));
    refreshed.push(repository.name);
  }

  const catalogue = {
    schemaVersion: 2,
    organisation: ORGANISATION,
    catalogueUpdatedAt: checkedAt,
    methodology: {
      label: 'Repository quality signals',
      totalSignals: 6,
      signals: [
        'Usage documentation',
        'Installable package or tool',
        'Published GitHub release',
        'Tests',
        'Automated checks',
        'Push within 180 days',
      ],
      disclaimer:
        'Signals describe public repository readiness, not a security audit, support promise, or production certification.',
    },
    modules,
  };

  if (!dryRun) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(catalogue, null, 2)}\n`);
  }

  console.log(
    `Mage-OS Lab catalogue: ${modules.length} projects, ${refreshed.length} refreshed, ${unchanged.length} unchanged.`
  );
  if (refreshed.length) console.log(`Refreshed: ${refreshed.join(', ')}`);
  if (dryRun) console.log('Dry run: no file written.');
}
