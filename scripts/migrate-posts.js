import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

const WP_POSTS_DIR = '../wp-export/output/posts';
const ASTRO_POSTS_DIR = './src/data/post';

// Category mapping from lowercase to title case
const categoryMap = {
  updates: 'Updates',
  releases: 'Releases',
  initiatives: 'Initiatives',
  'ecommerce-insights': 'eCommerce Insights',
  'case-studies': 'Case Studies',
  events: 'Events',
  community: 'Community',
  technical: 'Technical',
};

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  try {
    const frontmatter = yaml.load(match[1]);
    const body = match[2];
    return { frontmatter, body };
  } catch (e) {
    console.error('Failed to parse frontmatter:', e.message);
    return null;
  }
}

function extractExcerpt(body, maxLength = 160) {
  // Remove markdown formatting and get plain text
  let text = body
    .replace(/^#+\s+.*/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[*_`]/g, '') // Remove emphasis markers
    .replace(/\n+/g, ' ') // Convert newlines to spaces
    .trim();

  if (text.length <= maxLength) return text;

  // Truncate at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

function getYearFromFilename(filename) {
  const match = filename.match(/^(\d{4})-/);
  return match ? match[1] : '2025';
}

function transformPost(filename, content) {
  const parsed = extractFrontmatter(content);
  if (!parsed) return null;

  const { frontmatter, body } = parsed;
  const year = getYearFromFilename(filename);

  // Transform categories
  const categories = frontmatter.categories || [];
  const primaryCategory = categories[0] || 'updates';
  const additionalCategories = categories.slice(1);

  // Parse date - handle both string and Date object
  let dateStr;
  if (frontmatter.date instanceof Date) {
    dateStr = frontmatter.date.toISOString();
  } else {
    dateStr = new Date(frontmatter.date + 'T00:00:00.000Z').toISOString();
  }

  // Build new frontmatter
  const newFrontmatter = {
    title: frontmatter.title,
    publishDate: dateStr,
    category: categoryMap[primaryCategory] || 'Updates',
    author: 'Mage-OS Team',
    draft: false,
  };

  // Add excerpt
  newFrontmatter.excerpt = extractExcerpt(body);

  // Add tags if there are additional categories
  if (additionalCategories.length > 0) {
    newFrontmatter.tags = additionalCategories.map((c) => categoryMap[c] || c);
  }

  // Handle cover image
  if (frontmatter.coverImage) {
    newFrontmatter.image = `~/assets/images/blog/${year}/${frontmatter.coverImage}`;
  }

  // Update image references in body
  let updatedBody = body;

  // Fix markdown image references
  updatedBody = updatedBody.replace(
    /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
    (match, alt, src) => {
      // Strip 'images/' prefix if present since assets are stored directly in year folders
      const cleanSrc = src.replace(/^images\//, '');
      return `![${alt}](~/assets/images/blog/${year}/${cleanSrc})`;
    }
  );

  // Generate new content
  const newContent = `---
${yaml.dump(newFrontmatter, { lineWidth: -1, quotingType: '"', forceQuotes: true }).trim()}
---
${updatedBody}`;

  return newContent;
}

async function migratePost(filename, sourceDir, targetDir) {
  const sourcePath = join(sourceDir, filename);
  const content = await readFile(sourcePath, 'utf-8');

  const transformed = transformPost(filename, content);
  if (!transformed) {
    console.error(`Failed to transform: ${filename}`);
    return false;
  }

  const targetPath = join(targetDir, filename);
  await writeFile(targetPath, transformed);
  console.log(`Migrated: ${filename}`);
  return true;
}

async function main() {
  // Ensure target directory exists
  if (!existsSync(ASTRO_POSTS_DIR)) {
    await mkdir(ASTRO_POSTS_DIR, { recursive: true });
  }

  // Get all markdown files from year subdirectories (which have coverImage)
  const yearDirs = ['2021', '2022', '2023', '2024', '2025'];
  let allMdFiles = [];

  for (const year of yearDirs) {
    const yearDir = join(WP_POSTS_DIR, year);
    if (existsSync(yearDir)) {
      const files = await readdir(yearDir);
      const mdFiles = files
        .filter((f) => f.endsWith('.md') && !f.startsWith('.'))
        .map((f) => ({ file: f, sourceDir: yearDir }));
      allMdFiles = allMdFiles.concat(mdFiles);
    }
  }

  console.log(`Found ${allMdFiles.length} posts to migrate from year subdirectories`);

  let success = 0;
  let failed = 0;

  for (const { file, sourceDir } of allMdFiles) {
    try {
      if (await migratePost(file, sourceDir, ASTRO_POSTS_DIR)) {
        success++;
      } else {
        failed++;
      }
    } catch (e) {
      console.error(`Error migrating ${file}:`, e.message);
      failed++;
    }
  }

  console.log(`\nMigration complete: ${success} succeeded, ${failed} failed`);
}

main().catch(console.error);
