import assert from 'node:assert/strict';
import test from 'node:test';

import { searchUrl } from '../src/integrations/search.ts';

test('search results link to the canonical URL', () => {
  const html = (link) => `<!doctype html><html><head>${link}</head><body></body></html>`;

  assert.equal(
    searchUrl(html('<link href="https://mage-os.org/community" rel="canonical">'), 'community/index.html'),
    '/community'
  );
  assert.equal(searchUrl(html('<link rel="canonical" href="https://mage-os.org">'), 'index.html'), '/');
  assert.equal(
    searchUrl(html('<link href="https://mage-os.org/releases/mage-os-4-0-0" rel="canonical">'), 'releases/x.html'),
    '/releases/mage-os-4-0-0'
  );
});

test('pages without a canonical URL fall back to their file path', () => {
  assert.equal(searchUrl('<html></html>', 'index.html'), '/');
  assert.equal(searchUrl('<html></html>', 'about/index.html'), '/about');
  assert.equal(searchUrl('<html></html>', 'get-started/installation.html'), '/get-started/installation');
});
