import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, basename } from 'path';
import { parseStringPromise } from 'xml2js';
import yaml from 'js-yaml';

const WP_XML_FILE = '../wp-export/mage-os.WordPress.2026-01-03.xml';
const ASTRO_EVENTS_DIR = './src/data/events';
const ASTRO_IMAGES_DIR = './src/assets/images/events';
const WP_IMAGES_BASE = '../wp-export/output/';

async function parseWPExport() {
  const xml = readFileSync(WP_XML_FILE, 'utf-8');
  const result = await parseStringPromise(xml, {
    explicitArray: false,
    mergeAttrs: true,
  });

  return result.rss.channel;
}

function extractMeta(item, key) {
  if (!item['wp:postmeta']) return null;

  const metas = Array.isArray(item['wp:postmeta'])
    ? item['wp:postmeta']
    : [item['wp:postmeta']];

  for (const meta of metas) {
    if (meta['wp:meta_key'] === key) {
      return meta['wp:meta_value'];
    }
  }
  return null;
}

function extractLocation(item) {
  if (!item.category) return null;

  const categories = Array.isArray(item.category) ? item.category : [item.category];

  for (const cat of categories) {
    if (typeof cat === 'object' && cat.domain === 'event_location') {
      return cat._ || cat;
    }
  }
  return null;
}

function timestampToISO(timestamp) {
  if (!timestamp) return null;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return null;
  return new Date(ts * 1000).toISOString();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractExcerpt(content, maxLength = 160) {
  if (!content || typeof content !== 'string') return '';

  // Remove WordPress blocks and HTML
  let text = content
    .replace(/<!-- wp:.*?-->/gs, '')
    .replace(/<!-- \/wp:.*?-->/gs, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

async function main() {
  console.log('Parsing WordPress XML export...');
  const channel = await parseWPExport();

  // Ensure items is an array
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];

  // Build attachment map (post_id -> image URL)
  const attachments = new Map();
  for (const item of items) {
    if (item['wp:post_type'] === 'attachment') {
      const postId = item['wp:post_id'];
      const guid = item.guid;
      // Extract just the filename from the URL
      if (guid) {
        const url = typeof guid === 'object' ? guid._ : guid;
        attachments.set(postId, url);
      }
    }
  }
  console.log(`Found ${attachments.size} attachments`);

  // Extract events
  const events = items.filter((item) => item['wp:post_type'] === 'ajde_events');
  console.log(`Found ${events.length} events`);

  // Ensure directories exist
  if (!existsSync(ASTRO_EVENTS_DIR)) {
    mkdirSync(ASTRO_EVENTS_DIR, { recursive: true });
  }

  let migrated = 0;
  let skipped = 0;

  for (const event of events) {
    const title = event.title;
    const slug = event['wp:post_name'] || slugify(title);
    const postDate = event['wp:post_date'];

    // Get event-specific dates (Unix timestamps)
    const eventStartTs = extractMeta(event, 'evcal_srow');
    const eventEndTs = extractMeta(event, 'evcal_erow');

    // Get location from taxonomy
    const location = extractLocation(event);

    // Get external URL
    const eventUrl = extractMeta(event, 'evcal_lmlink');

    // Get thumbnail
    const thumbnailId = extractMeta(event, '_thumbnail_id');
    let image = null;
    if (thumbnailId && attachments.has(thumbnailId)) {
      const fullUrl = attachments.get(thumbnailId);
      // Extract filename from URL
      const filename = basename(fullUrl.replace(/\?.*$/, ''));
      image = filename;
    }

    // Get body content
    let body = '';
    if (event['content:encoded']) {
      body = event['content:encoded']
        .replace(/<!-- wp:pattern.*?\/-->/gs, '')
        .replace(/<!-- wp:.*?-->/gs, '')
        .replace(/<!-- \/wp:.*?-->/gs, '')
        .trim();
    }

    // Build frontmatter
    const frontmatter = {
      title: title,
    };

    // Use event start date if available, otherwise fall back to post date
    if (eventStartTs) {
      frontmatter.eventDate = timestampToISO(eventStartTs);
    }

    if (eventEndTs && eventEndTs !== eventStartTs) {
      frontmatter.endDate = timestampToISO(eventEndTs);
    }

    if (location) {
      frontmatter.location = location;
    }

    if (eventUrl) {
      frontmatter.url = eventUrl;
    }

    if (image) {
      frontmatter.image = image;
    }

    // Add excerpt if there's body content
    const excerpt = extractExcerpt(body);
    if (excerpt) {
      frontmatter.excerpt = excerpt;
    }

    // Generate filename based on event date (or post date if no event date)
    const dateForFilename = eventStartTs
      ? new Date(parseInt(eventStartTs, 10) * 1000).toISOString().split('T')[0]
      : postDate.split(' ')[0];

    const filename = `${dateForFilename}-${slug}.md`;

    // Generate content
    const content = `---
${yaml.dump(frontmatter, { lineWidth: -1, quotingType: '"', forceQuotes: false }).trim()}
---
${body}`;

    const targetPath = join(ASTRO_EVENTS_DIR, filename);
    writeFileSync(targetPath, content);
    console.log(`Migrated: ${filename}`);
    migrated++;
  }

  console.log(`\nMigration complete: ${migrated} events migrated, ${skipped} skipped`);
}

main().catch(console.error);
