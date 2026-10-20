#!/usr/bin/env node

// Refreshes the Mage-OS Lab catalogue. Repository metadata is fetched first;
// unchanged projects retain their existing enriched data so later runs only
// inspect repositories that have actually received a new push.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORGANISATION = 'mage-os-lab';
const GRADUATED_ORGANISATION = 'mage-os';
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

// This empty fixture is used to test packaging in CI, rather than being a
// community module that has graduated from the Lab.
const excludedGraduatedRepositories = new Set(['module-demo-package']);

const curation = {
  'module-admin-activity-log': {
    title: 'Admin Activity Log',
    category: 'Security & access',
    kind: 'Admin module',
    summary:
      'Tracks admin changes, login attempts, and optional page visits, with before-and-after field values for auditing.',
    howToUse:
      'Configure Admin Activity under Stores → Configuration → Advanced → Admin, then review action and login logs under System → Admin Activity.',
    requirements: 'PHP 8.2+; Magento Open Source 2.4.x or Mage-OS',
    note: 'Continues the open-source KiwiCommerce Admin Activity extension; page-visit logging is optional.',
  },
  'module-automatic-translation': {
    title: 'Automatic Translation',
    category: 'AI & automation',
    kind: 'Commerce module',
    summary:
      'Translates products, categories, CMS pages, and blocks using DeepL, OpenAI, or Google Gemini, with scheduled product translation.',
    howToUse:
      'Configure an engine, API credentials, and source and target languages for each store view, then translate content in the admin or schedule product translations.',
    requirements: 'PHP 8.2–8.5; Mage-OS or Magento 2; supported translation-provider credentials',
    note: 'Duplicate CMS pages and blocks before translation, because translated content replaces the original when saved.',
  },
  'module-inventory-reservations-grid': {
    title: 'Inventory Reservations Grid',
    category: 'Admin & operations',
    kind: 'Admin module',
    summary:
      'Shows inventory reservations in the admin so store teams can inspect stock commitments and clean balanced reservations.',
    howToUse:
      'Open Stores → Inventory → Reservations to inspect reservations. Use role permissions and configuration to control cleanup and deletion actions.',
    requirements: 'Mage-OS or Magento 2 with Multi-Source Inventory; Magento framework ^103.0',
    note: 'Deleting uncompensated reservations can create stock inconsistencies; the mass-delete action is disabled by default.',
  },
  'module-meta-robots-tag': {
    title: 'Meta Robots Tag',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary: 'Controls noindex, nofollow, and noarchive directives for individual products, categories, and CMS pages.',
    howToUse:
      'Enable the module, then set the required robot directives in the Search Engine Optimization section of each product, category, or CMS page.',
    requirements: 'PHP 8.2–8.5; Mage-OS or Magento 2 with Catalog and CMS modules',
    note: 'An unchecked directive uses the store design configuration; it does not explicitly force indexing or following.',
  },
  'module-page-builder-widget': {
    title: 'Page Builder Widget',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'Adds a draggable CMS Widget component to Page Builder, with configurable widgets and supported live stage previews.',
    howToUse:
      'Add the CMS Widget component in Page Builder and select a widget. Developers can add preview templates, styles, and scripts through widget.xml.',
    requirements: 'PHP 8.1–8.5; Mage-OS or Magento 2; Page Builder ^2.0',
  },
  'module-pagebuilder-template-import-export': {
    title: 'Page Builder Template Import / Export',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'Shares Page Builder templates between stores as ZIP files, with optional remote template libraries in Dropbox.',
    howToUse:
      'Import or export templates under Content → Elements → Templates, or use the CLI. Configure Dropbox only if you need a remote template library.',
    requirements: 'PHP 8.1–8.5; Mage-OS or Magento 2; Page Builder; PHP ZIP extension',
  },
  'module-rma': {
    title: 'Returns & RMA',
    category: 'Admin & operations',
    kind: 'Commerce module',
    summary:
      'Manages return requests from customers and guests, with configurable reasons, statuses, attachments, messages, and admin workflows.',
    howToUse:
      'Enable Return Management under Stores → Configuration → Sales, configure your return policy, then manage requests under Sales → RMA.',
    requirements: 'PHP 8.2–8.5; Mage-OS or Magento 2; Luma and Hyvä templates included',
  },
  'module-theme-adminhtml-switcher': {
    title: 'Admin Theme Switcher',
    category: 'Admin & operations',
    kind: 'Admin module',
    summary:
      'Lets administrators choose the active admin theme and provides the companion switcher for the Mage-OS M137 admin theme.',
    howToUse:
      'Install through the M137 admin theme package or on its own, then choose an installed theme under Stores → Configuration → Advanced → Admin → Admin Design.',
    requirements: 'PHP 8.2–8.5; Mage-OS or Magento 2; an installed admin theme',
  },
  'module-theme-optimization': {
    title: 'Theme Optimization',
    category: 'Performance & runtime',
    kind: 'Frontend module',
    summary:
      'Speeds up perceived storefront navigation with browser back/forward caching, speculative loading, and page transitions.',
    howToUse:
      'Configure back/forward cache, speculation rules, and view transitions under Stores → Configuration → Advanced → System, then test with your theme and caching setup.',
    requirements: 'PHP 8.1–8.5; Magento 2.4.5+ or equivalent Mage-OS / Adobe Commerce',
    note: 'Back/forward cache support may require extra Varnish or Fastly configuration; prerendering can affect analytics and dynamic UI.',
  },
  'agent-skills': {
    title: 'AI Agent Skills',
    category: 'Developer tools',
    kind: 'AI development tooling',
    summary:
      'Shared skills for AI coding tools, starting with a module-standards audit covering code quality, tests, admin experience, security, and documentation.',
    howToUse:
      'Install the module-standards skill in an Agent Skills-compatible tool, then use it to review and improve a Mage-OS or Magento module one area at a time.',
    requirements: 'An Agent Skills-compatible coding tool, such as Claude Code, Codex, Gemini CLI, or Cursor',
    install:
      'npx skills add https://github.com/mage-os-lab/agent-skills/tree/main/plugins/module-standards/skills/module-standards -g',
  },
  directory: {
    title: 'Extension Directory',
    category: 'Developer tools',
    kind: 'Discovery module',
    summary:
      'A searchable directory of open-source Mage-OS and Magento extensions, available on the web and inside the admin.',
    howToUse:
      'Install the admin module to browse compatibility and quality signals under System → Extensions → Extension Directory, or use the public directory site.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2.4',
  },
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
  'library-ai-opencode-custom-platform': {
    title: 'OpenCode Custom Platform',
    category: 'AI & automation',
    kind: 'AI integration library',
    summary:
      'Connects Symfony AI and Mage-OS AI Base to a self-hosted OpenCode server while keeping provider credentials on that server.',
    howToUse:
      'Install the Composer library, secure an OpenCode server, then configure its base URL and model through AI Base.',
    requirements: 'PHP; Symfony AI; a secured OpenCode server',
  },
  'library-ai-opencode-zen-platform': {
    title: 'OpenCode Zen Platform',
    category: 'AI & automation',
    kind: 'AI integration library',
    summary: 'Adds OpenCode Zen chat-completion models to Symfony AI and Mage-OS AI Base.',
    howToUse: 'Install the Composer library, add an OpenCode Zen credential in AI Base, and select a supported model.',
    requirements: 'PHP; Symfony AI; an OpenCode Zen API key',
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
  'magento-workflows': {
    title: 'Magento Workflows',
    category: 'AI & automation',
    kind: 'Automation suite',
    summary:
      'A native trigger-condition-action engine for automating store operations with an admin builder, REST API, CLI, and dry-run support.',
    howToUse:
      'Evaluate it in development, build a workflow from a trigger, conditions, and actions, then test it in dry-run mode before activation.',
    requirements: 'Mage-OS or Magento 2; currently pre-alpha',
    status: 'Experimental',
    note: 'The project is pre-alpha and should not yet be used in production.',
  },
  'migrate-m2-to-mageos': {
    title: 'Migrate Magento 2 to Mage-OS',
    category: 'Developer tools',
    kind: 'Migration tool',
    summary:
      'A guided shell migration that switches a compatible Magento Open Source installation to Mage-OS packages.',
    howToUse:
      'Back up and test on staging, review the migration script, then run the command documented in the repository.',
    requirements: 'Magento Open Source 2.4.9; developer mode; local or staging environment; shell access',
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
  'module-ai-shopping-assistant': {
    title: 'AI Shopping Assistant',
    category: 'AI & automation',
    kind: 'Storefront assistant',
    summary:
      'A streaming shopping assistant for Hyvä and Luma that searches products, explains choices, manages carts, checks orders, and answers store-policy questions.',
    howToUse:
      'Install with AI Base, configure an AI service and the storefront panel, then test product search, cart actions, order lookup, and policy answers in development.',
    requirements: 'PHP 8.2–8.5; Magento 2.4.7+ or Mage-OS; AI Base; Hyvä 1.5+ with Tailwind 4 or a Luma-based theme',
    status: 'Experimental',
    note: 'Renamed from Claude Consumer Agent; existing installations need the migration steps in the README.',
  },
  'module-aeo': {
    title: 'Answer Engine Optimisation',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary:
      'Publishes machine-readable store and catalogue information for AI assistants through llms.txt and related feeds.',
    howToUse:
      'Install the module, configure its answer-engine feeds, then validate the generated crawler files and catalogue output.',
    requirements: 'PHP 8.3–8.5; Magento 2.4.7+ or Mage-OS; SEO ^2.0',
  },
  'module-agentic': {
    title: 'Agentic Commerce',
    category: 'AI & automation',
    kind: 'Commerce module',
    summary: 'Explores the store APIs and capabilities needed for AI agents to discover and complete commerce tasks.',
    howToUse: 'Review the documented agent endpoints and evaluate the current implementation in a development store.',
    requirements: 'Mage-OS or Magento 2; evolving agent tooling',
    status: 'Experimental',
  },
  'module-alpine-loader': {
    title: 'Alpine Loader',
    category: 'Developer tools',
    kind: 'Frontend module',
    summary: 'An early proof of concept for initializing Alpine.js in a Mage-OS storefront.',
    howToUse: 'Evaluate from source in a development store; the public API and feature set are still being defined.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2',
    status: 'Experimental',
    note: 'The README labels this as a proof of concept and does not yet document finished features.',
  },
  'module-alpine-local-storage': {
    title: 'Alpine Local Storage',
    category: 'Developer tools',
    kind: 'Frontend module',
    summary: 'Provides local-storage behaviour for the experimental Alpine-based storefront module set.',
    howToUse:
      'Install alongside the related Alpine storefront modules and validate the integration in a development environment.',
    requirements: 'Mage-OS or Magento 2; related Alpine storefront modules',
  },
  'module-alpine-messages': {
    title: 'Alpine Messages',
    category: 'Developer tools',
    kind: 'Frontend module',
    summary: 'Implements storefront message handling for the experimental Alpine-based frontend stack.',
    howToUse:
      'Install alongside the Alpine module set and test storefront notices and session messages in development.',
    requirements: 'Mage-OS or Magento 2; related Alpine storefront modules',
  },
  'module-alpine-minicart': {
    title: 'Alpine Minicart',
    category: 'Developer tools',
    kind: 'Frontend module',
    summary: 'An Alpine.js implementation of the Mage-OS storefront minicart experience.',
    howToUse: 'Install it as part of the Alpine storefront stack and validate cart behaviour with the selected theme.',
    requirements: 'Mage-OS or Magento 2; related Alpine storefront modules',
  },
  'module-alpine-toplinks': {
    title: 'Alpine Top Links',
    category: 'Developer tools',
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
  'module-blog-seo': {
    title: 'Blog SEO Bridge',
    category: 'SEO & discovery',
    kind: 'Integration module',
    summary:
      'Connects the Blog and SEO modules so each post has one consistent BlogPosting description and shared organisation identity in its structured data.',
    howToUse:
      'Install alongside Blog and SEO, then configure the organisation under Marketing → SEO → Organization; no extra bridge settings are required.',
    requirements: 'PHP 8.3–8.5; Magento 2.4.7+ or Mage-OS; Blog ^1.3; SEO ^2.0',
  },
  'module-catalog-image-cleanup': {
    title: 'Catalog Image Cleanup',
    category: 'Admin & operations',
    kind: 'Maintenance module',
    summary:
      'Finds unused product and category image files, cleans old resized copies, and removes unreferenced images after catalogue changes.',
    howToUse:
      'Run mageos:catalog-images:cleanup with --dry-run first, review the report, then use --backup to move unused files before enabling automatic cleanup.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; local media filesystem',
    note: 'Back up media before cleanup. The CLI does not scan remote storage such as S3.',
  },
  'module-catalog-data-ai': {
    title: 'AI Catalog Data',
    category: 'AI & automation',
    kind: 'Admin module',
    summary: 'Generates and refines product descriptions and other catalog content with an AI provider.',
    howToUse: 'Configure an AI provider, then generate content from supported product-editing workflows in the admin.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; AI provider credentials',
  },
  'module-checkout-guard': {
    title: 'Checkout Guard',
    category: 'Security & access',
    kind: 'Security module',
    summary:
      'Blocks unused REST payment routes and deactivates carts after repeated failures to reduce automated card-testing attacks.',
    howToUse:
      'Configure the payment routes used by the storefront and set failure limits, then monitor blocked requests before tightening enforcement.',
    requirements: 'Mage-OS or Magento 2; Magewire or headless checkout',
  },
  'module-customer-two-factor-auth': {
    title: 'Customer Two-Factor Authentication',
    category: 'Security & access',
    kind: 'Customer security module',
    summary:
      'Adds customer TOTP authentication, recovery codes, admin reset controls, and Luma and Hyvä storefront support.',
    howToUse:
      'Install the module, enable customer two-factor authentication, and let customers enrol an authenticator from their account.',
    requirements: 'Mage-OS or Magento 2; Luma or Hyvä',
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
  'module-faq': {
    title: 'FAQ',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'Manages customer-facing FAQs and the structured data that helps search and answer engines understand them.',
    howToUse:
      'Create and organise FAQs in the admin, publish them in the storefront, and validate the generated schema.',
    requirements: 'PHP 8.3–8.5; Magento 2.4.7+ or Mage-OS; SEO ^2.0; optional Page Builder',
  },
  'module-hreflang': {
    title: 'Hreflang',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary: 'Adds locale-aware hreflang links for CMS pages, products, and categories.',
    howToUse: 'Install and enable the module, then configure locale relationships for relevant store views and URLs.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2',
  },
  'module-inline-docs': {
    title: 'Inline Admin Documentation',
    category: 'Admin & operations',
    kind: 'Admin module',
    summary:
      'Adds local documentation cards for around 7,400 core configuration fields, including accepted values and technical details.',
    howToUse:
      'Install the module, enable Inline Documentation under Stores → Configuration → Advanced, then use the help markers beside configuration fields.',
    requirements: 'Mage-OS or Magento 2; no external documentation service required',
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
  'module-netsuite-connector': {
    title: 'NetSuite Connector',
    category: 'Admin & operations',
    kind: 'Integration module',
    summary:
      'Synchronises products, customers, orders, inventory, and related commerce data between Mage-OS and Oracle NetSuite.',
    howToUse:
      'Configure NetSuite SOAP credentials, map the required records, then use the queue and monitoring tools to stage a controlled rollout.',
    requirements: 'Mage-OS or Magento 2; Oracle NetSuite SOAP access',
    status: 'Experimental',
    note: 'The connector is evolving and does not provide an automatic migration from earlier Rocket Web modules.',
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
  'module-opensearch-hybrid': {
    title: 'OpenSearch Hybrid',
    category: 'SEO & discovery',
    kind: 'Search module',
    summary:
      'Combines native keyword results with semantic reranking while preserving facets, counts, per-store controls, and fallback behaviour.',
    howToUse:
      'Enable it on a development store, configure the semantic model, and compare ranked results against the native search fallback.',
    requirements: 'Mage-OS 3.5; OpenSearch; embedding model',
    status: 'Experimental',
    note: 'The repository describes the current implementation as an engineering pilot.',
  },
  'module-opensearch-relevance-workbench': {
    title: 'OpenSearch Relevance Workbench',
    category: 'SEO & discovery',
    kind: 'Admin search tool',
    summary:
      'Lets merchants compare search tuning candidates, rate real results, review evidence, and activate or roll back accepted settings.',
    howToUse:
      'Create a candidate in the admin workbench, run guided result reviews, then activate it only after the evidence is accepted.',
    requirements: 'Mage-OS or Magento 2; OpenSearch',
    status: 'Experimental',
  },
  'module-opentelemetry': {
    title: 'OpenTelemetry',
    category: 'Developer tools',
    kind: 'Observability concept',
    summary: 'A reserved Lab project for adding OpenTelemetry traces and metrics to Mage-OS and Magento.',
    howToUse: 'Not installable yet; follow the repository for its first implementation.',
    requirements: 'Not yet documented',
    install: 'Not installable yet',
    status: 'Incubating',
    note: 'The repository does not yet contain an implementation or usage documentation.',
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
    summary: 'Adds customer passkey sign-in, account credential management, and an admin passkey two-factor provider.',
    howToUse:
      'Install over HTTPS, enable customer passkeys in Customer Configuration, and test registration, recovery, and sign-in for the selected storefront.',
    requirements: 'PHP 8.2+; Magento 2.4.6+ or Mage-OS; HTTPS and a WebAuthn-capable browser',
  },
  'module-profiler': {
    title: 'Profiler',
    category: 'Developer tools',
    kind: 'Developer module',
    summary: 'Adds table and JSON output formats to Magento profiling for easier analysis and tooling integrations.',
    howToUse:
      'Enable Magento profiling in development, select the table or JSON output type, then inspect request timings.',
    requirements: 'Mage-OS or Magento 2; developer environment',
  },
  'module-profiler-admin-ui': {
    title: 'Profiler Admin UI',
    category: 'Developer tools',
    kind: 'Developer module',
    summary: 'Provides an admin viewer for the JSON profiling reports created by the Mage-OS Profiler module.',
    howToUse: 'Install it with Mage-OS Profiler, generate JSON reports, then compare them in the admin viewer.',
    requirements: 'Mage-OS Profiler; Mage-OS or Magento 2',
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
    title: 'SEO & Structured Data',
    category: 'SEO & discovery',
    kind: 'Commerce module',
    summary:
      'A search and answer-engine foundation covering structured data, social metadata, canonicals, hreflang, and sitemaps, with separate FAQ, AEO, and Agentic companions.',
    howToUse:
      'Install the module, configure the required SEO features per store, then validate generated markup and crawler files.',
    requirements: 'PHP 8.3–8.5; Magento 2.4.7+ or Mage-OS; Magento MSI inventory modules',
  },
  'module-shopping-feed': {
    title: 'Shopping Feed',
    category: 'Content & merchandising',
    kind: 'Commerce module',
    summary:
      'Builds scheduled product feeds for Google, Meta, Microsoft, TikTok, Pinterest, local inventory, promotions, and custom destinations.',
    howToUse:
      'Choose a channel preset or custom mapping, configure filters and delivery, then preview and schedule feed generation.',
    requirements: 'Mage-OS or Magento 2; channel account or delivery destination',
  },
  'module-social-login': {
    title: 'Social Login',
    category: 'Security & access',
    kind: 'Customer module',
    summary: 'Adds Google, Facebook, LinkedIn, and Instagram sign-in for Mage-OS and Magento customer accounts.',
    howToUse: 'Install the module, configure supported identity providers, and test sign-in and account-linking flows.',
    requirements: 'PHP 8.1–8.5; Magento 2.4.6+ or Mage-OS 3.x; identity-provider credentials',
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
  'module-template-parser': {
    title: 'Template Parser',
    category: 'Developer tools',
    kind: 'Developer concept',
    summary: 'A reserved Lab project for parsing Mage-OS and Magento template structures.',
    howToUse: 'Not installable yet; follow the repository for its first documented implementation.',
    requirements: 'Not yet documented',
    install: 'Not installable yet',
    status: 'Incubating',
    note: 'The repository does not yet contain an implementation or usage documentation.',
  },
  'module-theme-uikit': {
    title: 'UIkit Theme Utilities',
    category: 'Developer tools',
    kind: 'Theme module',
    summary: 'Build and asset utilities used by the Mage-OS UIkit storefront theme.',
    howToUse: 'Install it with theme-frontend-uikit, then use its asset compilation and theme utility features.',
    requirements: 'PHP 8.1+; Mage-OS or Magento 2; UIkit frontend theme',
  },
  'module-uikit-js-replacement': {
    title: 'UIkit JavaScript Replacement',
    category: 'Developer tools',
    kind: 'Theme module',
    summary: 'Removes selected unnecessary JavaScript dependencies from UIkit-based storefront themes.',
    howToUse: 'Test with the UIkit theme in development and verify affected customer journeys before wider use.',
    requirements: 'PHP 8.1+; UIkit frontend theme',
    status: 'Experimental',
    note: 'The README labels this a proof of concept and notes incomplete controller handling.',
  },
  'module-uikit-menu': {
    title: 'UIkit Menu',
    category: 'Developer tools',
    kind: 'Theme module',
    summary: 'Provides the storefront navigation implementation for the Mage-OS UIkit theme.',
    howToUse: 'Install it with the UIkit theme and configure the standard catalog navigation.',
    requirements: 'PHP 8.1+; UIkit frontend theme',
  },
  'module-uikit-product-page': {
    title: 'UIkit Product Page',
    category: 'Developer tools',
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
    category: 'Developer tools',
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
  const response = execFileSync('gh', ['api', ...arguments_], {
    cwd: rootDirectory,
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  });

  // GitHub answers 204 No Content with an empty body for repositories that have
  // no contributors yet, so treat an empty response as an empty collection.
  return response.trim() ? JSON.parse(response) : [];
}

function readExistingCatalogue() {
  try {
    return JSON.parse(readFileSync(outputPath, 'utf8'));
  } catch {
    return { modules: [], graduatedModules: [] };
  }
}

function repositoryOwner(repository) {
  return repository.owner?.login ?? repository.organisation ?? ORGANISATION;
}

function readRepositories(organisation) {
  return ghApi([`orgs/${organisation}/repos?per_page=100&type=public&sort=full_name`, '--paginate', '--slurp'])
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name));
}

function hasGraduatedFromLab(repository, existingGraduates) {
  if (existingGraduates.has(repository.name)) return true;

  try {
    // GitHub keeps the old Lab URL working after a repository transfer. Check
    // that redirect before presenting a main-organisation module as graduated.
    const original = ghApi([`repos/${ORGANISATION}/${repository.name}`]);
    return original.full_name?.toLowerCase() === repository.full_name.toLowerCase();
  } catch (error) {
    // A new main-organisation module may never have lived in the Lab. Other
    // API failures must stop the refresh rather than silently hiding a module.
    if (/HTTP 404/.test(String(error.stderr))) return false;
    throw error;
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

  return ghApi([
    'graphql',
    '-f',
    `query=${query}`,
    '-F',
    `owner=${repositoryOwner(repository)}`,
    '-F',
    `name=${repository.name}`,
  ]).data.repository;
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
  return normaliseContributors(
    ghApi([`repos/${repositoryOwner(repository)}/${repository.name}/contributors?per_page=100&anon=0`])
  );
}

async function readPublicContributors(module) {
  const response = await fetch(
    `https://api.github.com/repos/${repositoryOwner(module)}/${encodeURIComponent(module.repository)}/contributors?per_page=100&anon=0`,
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
    throw new Error(`GitHub contributors request failed for ${module.repository}: ${response.status}`);
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
    ...(repositoryOwner(repository) === GRADUATED_ORGANISATION
      ? {
          organisation: GRADUATED_ORGANISATION,
          graduated: true,
          graduatedFromUrl: `https://github.com/${ORGANISATION}/${repository.name}`,
        }
      : {}),
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
  const graduatedModules = [];

  for (const module of [...existingCatalogue.modules, ...(existingCatalogue.graduatedModules ?? [])]) {
    const contributors = await readPublicContributors(module);
    const target = module.graduated ? graduatedModules : modules;
    target.push({ ...module, contributors, dataCheckedAt: checkedAt });
    console.log(`Contributors: ${repositoryOwner(module)}/${module.repository} (${contributors.length})`);
  }

  const catalogue = {
    ...existingCatalogue,
    schemaVersion: 3,
    catalogueUpdatedAt: checkedAt,
    modules,
    graduatedModules,
  };

  if (!dryRun) writeFileSync(outputPath, `${JSON.stringify(catalogue, null, 2)}\n`);
  console.log(
    `Mage-OS Lab catalogue: contributor data refreshed for ${modules.length} Lab and ${graduatedModules.length} graduated projects.`
  );
  if (dryRun) console.log('Dry run: no file written.');
} else {
  const existingCatalogue = readExistingCatalogue();
  const existingModules = [...existingCatalogue.modules, ...(existingCatalogue.graduatedModules ?? [])];
  const existingByRepository = new Map(
    existingModules.map((module) => [`${repositoryOwner(module)}/${module.repository}`.toLowerCase(), module])
  );
  const existingGraduates = new Set((existingCatalogue.graduatedModules ?? []).map((module) => module.repository));
  const repositories = readRepositories(ORGANISATION).filter(
    (repository) => !excludedRepositories.has(repository.name) && !repository.fork
  );
  const graduatedRepositories = readRepositories(GRADUATED_ORGANISATION).filter(
    (repository) =>
      repository.name.startsWith('module-') &&
      !excludedGraduatedRepositories.has(repository.name) &&
      hasGraduatedFromLab(repository, existingGraduates)
  );

  const modules = [];
  const graduatedModules = [];
  const refreshed = [];
  const unchanged = [];

  for (const repository of [...repositories, ...graduatedRepositories]) {
    const target = repositoryOwner(repository) === GRADUATED_ORGANISATION ? graduatedModules : modules;
    const existing = existingByRepository.get(`${repositoryOwner(repository)}/${repository.name}`.toLowerCase());
    if (!forceRefresh && existing?.sourceUpdatedAt === repository.pushed_at && Array.isArray(existing.contributors)) {
      target.push(existing);
      unchanged.push(`${repositoryOwner(repository)}/${repository.name}`);
      continue;
    }

    const details = readRepositoryDetails(repository);
    target.push(buildModule(repository, details, readContributors(repository)));
    refreshed.push(`${repositoryOwner(repository)}/${repository.name}`);
  }

  const catalogue = {
    schemaVersion: 3,
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
    graduatedModules,
  };

  if (!dryRun) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(catalogue, null, 2)}\n`);
  }

  console.log(
    `Mage-OS Lab catalogue: ${modules.length} Lab projects, ${graduatedModules.length} graduated projects, ${refreshed.length} refreshed, ${unchanged.length} unchanged.`
  );
  if (refreshed.length) console.log(`Refreshed: ${refreshed.join(', ')}`);
  if (dryRun) console.log('Dry run: no file written.');
}
