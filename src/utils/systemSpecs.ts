/**
 * System Specifications Utility
 *
 * Fetches Mage-OS system specifications from the authoritative GitHub source.
 * Follows the same caching pattern as openCollective.ts.
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { z } from 'zod';
import type { ComponentVersion, ComponentSpecs, VersionSpecs, SystemSpecs } from '~/types';

// GitHub raw URLs for version data
const COMPOSITE_URL =
  'https://raw.githubusercontent.com/mage-os/github-actions/main/supported-version/src/versions/mage-os/composite.json';
const INDIVIDUAL_URL =
  'https://raw.githubusercontent.com/mage-os/github-actions/main/supported-version/src/versions/mage-os/individual.json';

// Cache configuration
const CACHE_FILE = path.join(process.cwd(), '.cache/system-specs.json');
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes for dev

// Zod schemas for GitHub data validation
const GitHubVersionEntrySchema = z.object({
  magento: z.string(),
  upstream: z.string().optional(),
  php: z.union([z.string(), z.number()]),
  composer: z.string(),
  mysql: z.string().optional(),
  opensearch: z.string().optional(),
  elasticsearch: z.string().optional(),
  rabbitmq: z.string().optional(),
  redis: z.string().optional(),
  varnish: z.string().optional(),
  nginx: z.string().optional(),
  os: z.string().optional(),
  release: z.string(),
  eol: z.string(),
});

const GitHubCompositeSchema = z.record(z.string(), GitHubVersionEntrySchema);
const GitHubIndividualSchema = z.record(z.string(), GitHubVersionEntrySchema);

// Config file schema
const ConfigComponentSchema = z.object({
  minimum: z.string(),
  recommended: z.string().optional(),
  supported: z.string().optional(),
});

const ConfigSchema = z.object({
  components: z.record(z.string(), ConfigComponentSchema),
});

type GitHubVersionEntry = z.infer<typeof GitHubVersionEntrySchema>;
type ConfigData = z.infer<typeof ConfigSchema>;

interface CachedData {
  timestamp: number;
  specs: SystemSpecs;
}

function ensureCacheDir(): void {
  const cacheDir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}

function readCache(): CachedData | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    return data;
  } catch {
    return null;
  }
}

function writeCache(specs: SystemSpecs): void {
  ensureCacheDir();
  const data: CachedData = {
    timestamp: Date.now(),
    specs,
  };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
}

/**
 * Load configuration file with min/recommended overrides
 */
function loadConfig(): ConfigData | null {
  try {
    const configPath = path.join(process.cwd(), 'src/data/system-specs-config.yaml');
    if (!fs.existsSync(configPath)) return null;
    const content = fs.readFileSync(configPath, 'utf-8');
    const data = yaml.load(content);
    return ConfigSchema.parse(data);
  } catch (error) {
    console.warn('[SystemSpecs] Failed to load config:', error);
    return null;
  }
}

/**
 * Load fallback data from YAML file
 */
function loadFallbackData(): SystemSpecs | null {
  try {
    const fallbackPath = path.join(process.cwd(), 'src/data/system-specs-fallback.yaml');
    if (!fs.existsSync(fallbackPath)) {
      console.warn('[SystemSpecs] Fallback file not found');
      return null;
    }
    const content = fs.readFileSync(fallbackPath, 'utf-8');
    const data = yaml.load(content) as SystemSpecs;
    return data;
  } catch (error) {
    console.error('[SystemSpecs] Failed to load fallback:', error);
    return null;
  }
}

/**
 * Extract version number from Docker image string
 * e.g., "mysql:8.4" -> "8.4", "opensearchproject/opensearch:2.19.1" -> "2.19"
 */
function extractVersion(imageString: string | undefined): string {
  if (!imageString) return '';
  const match = imageString.match(/:(\d+\.?\d*)/);
  return match ? match[1] : '';
}

/**
 * Parse Mage-OS version from constraint string
 * e.g., "mage-os/project-community-edition:>=1.1 <1.2" -> "1.1"
 * e.g., "mage-os/project-community-edition:1.0.5" -> "1.0.5"
 */
function parseMageOSVersion(constraint: string): string {
  // Match exact version (e.g., ":1.0.5")
  const exactMatch = constraint.match(/:(\d+\.\d+\.\d+)$/);
  if (exactMatch) return exactMatch[1];

  // Match version range (e.g., ">=1.1 <1.2")
  const rangeMatch = constraint.match(/>=(\d+\.\d+)/);
  if (rangeMatch) return rangeMatch[1];

  // Match simple version (e.g., ":1.1")
  const simpleMatch = constraint.match(/:(\d+\.\d+)/);
  if (simpleMatch) return simpleMatch[1];

  return constraint;
}

/**
 * Build component specs from GitHub data and config overrides
 *
 * Config values always take precedence. For components not in GitHub data
 * (mariadb, valkey, apache), config values are required.
 */
function buildComponentSpecs(entry: GitHubVersionEntry, config: ConfigData | null): ComponentSpecs {
  /**
   * Get version spec for a component, preferring config over extracted GitHub data
   */
  const getVersion = (component: string, githubValue: string | undefined): ComponentVersion => {
    const extracted = extractVersion(githubValue);
    const configComponent = config?.components[component];

    // Config values take precedence, fall back to extracted GitHub value
    return {
      minimum: configComponent?.minimum || extracted,
      recommended: configComponent?.recommended || extracted,
    };
  };

  /**
   * Get version spec for components not in GitHub data (config-only)
   * These components must have values defined in the config file
   */
  const getConfigOnlyVersion = (component: string): ComponentVersion => {
    const configComponent = config?.components[component];
    if (!configComponent) {
      console.warn(`[SystemSpecs] Missing config for ${component}, using empty values`);
      return { minimum: '', recommended: '' };
    }
    return {
      minimum: configComponent.minimum,
      recommended: configComponent.recommended || configComponent.minimum,
    };
  };

  // Extract RabbitMQ major version from GitHub data (e.g., "rabbitmq:4.0" -> "4")
  const rabbitmqExtracted = extractVersion(entry.rabbitmq);
  const rabbitmqMajor = rabbitmqExtracted ? rabbitmqExtracted.split('.')[0] : '';

  return {
    php: {
      minimum: config?.components.php?.minimum || String(entry.php),
      recommended: config?.components.php?.recommended || String(entry.php),
    },
    composer: {
      minimum: config?.components.composer?.minimum || entry.composer.split('.').slice(0, 2).join('.'),
      recommended: config?.components.composer?.recommended || entry.composer,
    },
    mysql: getVersion('mysql', entry.mysql),
    mariadb: getConfigOnlyVersion('mariadb'),
    opensearch: getVersion('opensearch', entry.opensearch),
    elasticsearch: entry.elasticsearch
      ? {
          minimum: config?.components.elasticsearch?.minimum || extractVersion(entry.elasticsearch),
          recommended: config?.components.elasticsearch?.supported || extractVersion(entry.elasticsearch),
        }
      : undefined,
    redis: getVersion('redis', entry.redis),
    valkey: getConfigOnlyVersion('valkey'),
    varnish: getVersion('varnish', entry.varnish),
    nginx: getVersion('nginx', entry.nginx),
    apache: getConfigOnlyVersion('apache'),
    rabbitmq: {
      minimum: config?.components.rabbitmq?.minimum || rabbitmqMajor || '',
      recommended: config?.components.rabbitmq?.recommended || (rabbitmqMajor ? `${rabbitmqMajor}.0` : ''),
    },
  };
}

/**
 * Fetch data from GitHub
 */
async function fetchGitHubData(): Promise<{
  composite: Record<string, GitHubVersionEntry>;
  individual: Record<string, GitHubVersionEntry>;
}> {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Mage-OS-Website/1.0',
  };

  const [compositeRes, individualRes] = await Promise.all([
    fetch(COMPOSITE_URL, { headers }),
    fetch(INDIVIDUAL_URL, { headers }),
  ]);

  if (!compositeRes.ok || !individualRes.ok) {
    throw new Error(`GitHub fetch failed: composite=${compositeRes.status}, individual=${individualRes.status}`);
  }

  const compositeData = await compositeRes.json();
  const individualData = await individualRes.json();

  return {
    composite: GitHubCompositeSchema.parse(compositeData),
    individual: GitHubIndividualSchema.parse(individualData),
  };
}

/**
 * Transform GitHub data into SystemSpecs
 */
function transformData(
  composite: Record<string, GitHubVersionEntry>,
  individual: Record<string, GitHubVersionEntry>,
  config: ConfigData | null
): SystemSpecs {
  const versions: Record<string, VersionSpecs> = {};

  // Find the latest version (the one with key "mage-os/project-community-edition" without version constraint)
  const latestKey = 'mage-os/project-community-edition';
  const latestComposite = composite[latestKey];

  // Process individual releases
  for (const [key, entry] of Object.entries(individual)) {
    const version = parseMageOSVersion(key);
    const componentSpecs = buildComponentSpecs(entry, config);

    versions[version] = {
      ...componentSpecs,
      mageosVersion: version,
      magentoBase: entry.upstream || '',
      releaseDate: entry.release,
      eolDate: entry.eol,
      isLatest: false,
    };
  }

  // Find the actual latest version from individual releases
  const sortedVersions = Object.keys(versions).sort((a, b) => {
    const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
    const [bMajor, bMinor, bPatch] = b.split('.').map(Number);
    if (aMajor !== bMajor) return bMajor - aMajor;
    if (aMinor !== bMinor) return bMinor - aMinor;
    return (bPatch || 0) - (aPatch || 0);
  });

  const latestVersion = sortedVersions[0];
  if (latestVersion && versions[latestVersion]) {
    versions[latestVersion].isLatest = true;
  }

  // Build the latest specs from composite data
  const latestSpecs: VersionSpecs = latestComposite
    ? {
        ...buildComponentSpecs(latestComposite, config),
        mageosVersion: latestVersion || '2.1',
        magentoBase: latestComposite.upstream || versions[latestVersion]?.magentoBase || '2.4.8-p3',
        releaseDate: latestComposite.release,
        eolDate: latestComposite.eol,
        isLatest: true,
      }
    : versions[latestVersion];

  return {
    fetchedAt: new Date().toISOString(),
    latest: latestSpecs,
    versions,
  };
}

/**
 * Fetch all system specifications from GitHub with caching
 */
async function fetchSystemSpecs(): Promise<SystemSpecs> {
  const config = loadConfig();

  console.log('[SystemSpecs] Fetching from GitHub...');
  const { composite, individual } = await fetchGitHubData();
  return transformData(composite, individual, config);
}

/**
 * Get system specifications with caching and fallback
 */
export async function getSystemSpecs(options?: { skipCache?: boolean }): Promise<SystemSpecs> {
  const isDev = import.meta.env.DEV;

  // In dev mode, use cache if valid
  if (isDev && !options?.skipCache) {
    const cached = readCache();
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      console.log('[SystemSpecs] Using cached data');
      return cached.specs;
    }
  }

  try {
    const specs = await fetchSystemSpecs();

    // Cache results in dev mode
    if (isDev) {
      writeCache(specs);
    }

    return specs;
  } catch (error) {
    console.error('[SystemSpecs] GitHub fetch failed, using fallback:', error);

    // Try cache first (even if expired)
    const cached = readCache();
    if (cached) {
      console.log('[SystemSpecs] Using expired cache');
      return cached.specs;
    }

    // Fall back to YAML file
    const fallback = loadFallbackData();
    if (fallback) {
      console.log('[SystemSpecs] Using YAML fallback');
      return fallback;
    }

    throw new Error('Failed to load system specs from any source');
  }
}

/**
 * Get only the latest version specs (most common use case)
 */
export async function getLatestSpecs(): Promise<VersionSpecs> {
  const specs = await getSystemSpecs();
  return specs.latest;
}

/**
 * Get specs for a specific Mage-OS version
 */
export async function getSpecsByVersion(version: string): Promise<VersionSpecs | null> {
  const specs = await getSystemSpecs();
  return specs.versions[version] || null;
}

/**
 * Format a version range for display
 * e.g., formatVersionRange("8.3", "8.4") -> "8.3 - 8.4"
 */
export function formatVersionRange(min: string, recommended: string): string {
  if (min === recommended) return min;
  return `${min} - ${recommended}`;
}

/**
 * Format a component spec for display in ItemGrid
 * Returns HTML string with min/recommended styling
 */
export function formatSpecForDisplay(spec: ComponentVersion): string {
  if (spec.minimum === spec.recommended) {
    return `<span class="text-green-600 dark:text-green-400 font-medium">${spec.recommended}</span>`;
  }
  return `<span class="text-gray-500 dark:text-gray-400">Min:</span> ${spec.minimum} <span class="mx-1">|</span> <span class="text-green-600 dark:text-green-400 font-medium">Rec: ${spec.recommended}</span>`;
}

/**
 * Build ItemGrid items from specs for quick reference display
 */
export function buildQuickReferenceItems(specs: VersionSpecs): Array<{
  title: string;
  description: string;
  icon: string;
}> {
  return [
    {
      title: 'PHP',
      description: formatSpecForDisplay(specs.php),
      icon: 'tabler:brand-php',
    },
    {
      title: 'Composer',
      description: formatSpecForDisplay(specs.composer),
      icon: 'tabler:package',
    },
    {
      title: 'OpenSearch',
      description: formatSpecForDisplay(specs.opensearch),
      icon: 'tabler:search',
    },
    {
      title: 'MySQL / MariaDB',
      description: `<span class="text-gray-500 dark:text-gray-400">Min:</span> ${specs.mysql.minimum} / ${specs.mariadb.minimum} <span class="mx-1">|</span> <span class="text-green-600 dark:text-green-400 font-medium">Rec: ${specs.mysql.recommended} / ${specs.mariadb.recommended}</span>`,
      icon: 'tabler:database',
    },
    {
      title: 'Redis / Valkey',
      description: `<span class="text-gray-500 dark:text-gray-400">Min:</span> ${specs.redis.minimum} <span class="mx-1">|</span> <span class="text-green-600 dark:text-green-400 font-medium">Rec: Valkey ${specs.valkey.recommended}</span>`,
      icon: 'tabler:bolt',
    },
    {
      title: 'RabbitMQ',
      description: formatSpecForDisplay(specs.rabbitmq),
      icon: 'tabler:message-bolt',
    },
    {
      title: 'Varnish',
      description: `<span class="text-gray-500 dark:text-gray-400">Min:</span> 7.x <span class="mx-1">|</span> <span class="text-green-600 dark:text-green-400 font-medium">Rec: ${specs.varnish.recommended}</span>`,
      icon: 'tabler:rocket',
    },
    {
      title: 'Web Server',
      description: `Apache ${specs.apache.minimum}+ or nginx ${specs.nginx.minimum}+ <span class="text-green-600 dark:text-green-400 font-medium">(${specs.nginx.recommended} rec)</span>`,
      icon: 'tabler:server',
    },
  ];
}
