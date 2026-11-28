/**
 * Site search with Pagefind (https://pagefind.app).
 *
 * After the build, indexes every page whose <main> carries data-pagefind-body (set by PageLayout on
 * searchable pages) and writes the search bundle to dist/pagefind/, which SearchDialog.astro loads on
 * demand. Results link to each page's canonical URL. Inside <main>, data-pagefind-ignore excludes
 * an element from the index.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import * as pagefind from 'pagefind';

/** URL path for a built page: its canonical URL, or else the path derived from the file name. */
export function searchUrl(html: string, file: string): string {
  const canonicalLink = /<link\b[^>]*\brel="canonical"[^>]*>/.exec(html)?.[0];
  const href = canonicalLink && /\bhref="([^"]+)"/.exec(canonicalLink)?.[1];
  if (href) return new URL(href, 'https://mage-os.org').pathname;
  return '/' + file.replaceAll(path.sep, '/').replace(/(?:^|\/)index\.html$|\.html$/, '');
}

export default function search(): AstroIntegration {
  return {
    name: 'mage-os:search',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = path.resolve(fileURLToPath(dir));
        const { index, errors } = await pagefind.createIndex();
        if (!index) throw new Error(`Pagefind could not start: ${errors.join('; ')}`);

        try {
          let pages = 0;
          const htmlFiles = (await fs.readdir(outDir, { recursive: true })).filter((file) => file.endsWith('.html'));
          for (const file of htmlFiles.sort()) {
            const content = await fs.readFile(path.join(outDir, file), 'utf8');
            if (!content.includes('data-pagefind-body')) continue;

            const added = await index.addHTMLFile({ url: searchUrl(content, file), content });
            if (added.errors.length) logger.warn(`${file}: ${added.errors.join('; ')}`);
            else pages++;
          }

          const written = await index.writeFiles({ outputPath: path.join(outDir, 'pagefind') });
          if (written.errors.length)
            throw new Error(`Pagefind could not write the index: ${written.errors.join('; ')}`);
          logger.info(`Indexed ${pages} pages for search`);
        } finally {
          await pagefind.close();
        }
      },
    },
  };
}
