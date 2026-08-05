---
title: Mage-OS 3.3.0 – Security Release
excerpt: Fixes a critical vulnerability in the bundled PageBuilder template import module, plus PHP 8.5 compatibility work and Redis cache fixes. All 3.x users should upgrade.
publishDate: 2026-08-05T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

**Mage-OS Distribution 3.3.0** is now available. This is a **security release** and we recommend upgrading promptly.

It fixes a critical remote code execution vulnerability in the bundled PageBuilder template import/export module, and ships a substantial round of PHP 8.5 compatibility work — several fixes of which are still waiting on review upstream. It is built on the same **Magento Open Source 2.4.9** base as 3.2.0, with no dependency additions or removals and no change to PHP support, so it remains a drop-in upgrade from 3.2.x.

### Security

#### Remote code execution via PageBuilder template import

The security issues in this release are isolated to the `mage-os/module-page-builder-template-import-export` package. Exploitation requires admin access to the Page Builder import/export features, but is critical for anyone that has that access.

The template import endpoint accepted arbitrary file types and copied archive contents into `pub/media` without validating entry paths or file contents, which allowed an administrator with template import access to write executable content into a web-served directory. Archive entry paths were not checked for traversal, and the export side could be pointed at files outside `pub/media`.

The fix hardens both sides of the feature. Import is now restricted to `.zip` uploads; template assets are limited to image types and re-encoded through the image adapter, so appended data, EXIF-embedded payloads and polyglot files do not survive import. Archive entries containing traversal sequences, absolute paths or drive-letter prefixes are rejected before extraction, entry count and uncompressed size are capped, and symbolic links are skipped. On export, only assets that resolve inside `pub/media` are included, verified with `realpath()`.

Severity is **critical** (CWE-434, CWE-22). See [GHSA-hrj3-88v2-6wjx](https://github.com/mage-os/module-pagebuilder-template-import-export/security/advisories/GHSA-hrj3-88v2-6wjx).

**If you cannot upgrade immediately**, any of the following will close the issue:

1. Update to Mage-OS 3.3.0 (recommended).
2. Update just this package. Mage-OS 3.0.0 through 3.2.0 pin it at exactly `1.8.1`, so an inline alias is required:
   ```bash
   composer require mage-os/module-page-builder-template-import-export:"1.9.0 as 1.8.1"
   ```
3. Disable the module in `app/etc/config.php` until you are able to upgrade, by setting `'MageOS_PageBuilderTemplateImportExport' => 0`.

> **Note:** the module update brings behaviour changes. Most importantly, templates whose assets are not images no longer import — templates previously exported with SVG assets, for example, need to be re-exported. See the upgrade notes below.

This was reported to us by Volker Dusch ([@edorian](https://github.com/edorian)), Ecosystem AI Security Engineer in Residence at [The PHP Foundation](https://thephp.foundation/blog/2026/05/18/announcing-ecosystem-security-team/), as part of its Ecosystem Security efforts — funded by an Alpha-Omega grant and managed together with the OpenSSF. The report arrived with a standalone reproducer and a verified patch, which made turning the fix around quick. We're glad to be part of this work: a safer PHP ecosystem benefits everyone building on it.

### PHP 8.5 compatibility

Four of the fixes below come from pull requests that are **still open against magento/magento2**. We have cherry-picked them so Mage-OS users get them now rather than waiting on upstream review. Original authorship is preserved on every commit.

- **Tax rates with more than one store view** no longer raise a deprecation error when edited. ([magento/magento2#41026](https://github.com/magento/magento2/pull/41026)) by [@hostep](https://github.com/hostep)

- **Category attributes with a null `frontend_input`** no longer trigger a null array-offset deprecation. ([magento/magento2#40894](https://github.com/magento/magento2/pull/40894), [#312](https://github.com/mage-os/mageos-magento2/pull/312)) by [@hostep](https://github.com/hostep) and [@rhoerr](https://github.com/rhoerr)

- **Last visited category ID** is null-checked before use. ([magento/magento2#40890](https://github.com/magento/magento2/pull/40890), [#314](https://github.com/mage-os/mageos-magento2/pull/314)) by [@Bashev](https://github.com/Bashev) and [@rhoerr](https://github.com/rhoerr)

- **`KEY_MYSQL_SSL_VERIFY`**, previously hardcoded as `1014`, no longer collides with the renamed `Pdo\Mysql` constant. ([magento/magento2#40849](https://github.com/magento/magento2/pull/40849), [#313](https://github.com/mage-os/mageos-magento2/pull/313)) by [@shlrkb](https://github.com/shlrkb)

- **`ScopeCodeResolver::resolve()`** no longer performs a null array offset. ([#311](https://github.com/mage-os/mageos-magento2/pull/311)) by [@rhoerr](https://github.com/rhoerr)

- **Captcha `getCaptcha()`** no longer passes null to `array_key_exists()` when no form ID is set. ([#297](https://github.com/mage-os/mageos-magento2/pull/297)) by [@rhoerr](https://github.com/rhoerr)

- **Null element ID in form rendering.** ([#310](https://github.com/mage-os/mageos-magento2/pull/310)) by [@rhoerr](https://github.com/rhoerr)

### Cache and Redis

- **Redis cache tag-bookkeeping leak**
  Tag sets in the Symfony-based cache adapter accumulated stale members that were never reclaimed, growing unbounded over time. Tag sets are now swept on invalidation, garbage collection runs against a time budget, and existence checks are batched through pipelined `EXISTS`. ([#298](https://github.com/mage-os/mageos-magento2/pull/298)) by [@rhoerr](https://github.com/rhoerr)

- **Redis unix socket connections** now work correctly. ([#294](https://github.com/mage-os/mageos-magento2/pull/294)) by [@rhoerr](https://github.com/rhoerr)

### Other fixes

- **`setup:di:compile` truncated plugin lists** for every area except the first, producing incomplete compiled interception configuration. ([#301](https://github.com/mage-os/mageos-magento2/pull/301)) by [@paales](https://github.com/paales)

- **PHP 8.4 lazy-ghost eligibility** is now an opt-in allow-list rather than a deny-list, so classes are only given lazy proxies where that has been verified as safe. ([#293](https://github.com/mage-os/mageos-magento2/pull/293)) by [@rhoerr](https://github.com/rhoerr)

- **AMQP consumers no longer busy-wait at 100% CPU** — the wait timeout is passed as `0` rather than `null`. ([#292](https://github.com/mage-os/mageos-magento2/pull/292)) by [@jeanmarcos-dev](https://github.com/jeanmarcos-dev)

- **underscore.js upgraded to 1.13.8**, backported from upstream, addressing a known vulnerability in the bundled library. ([#309](https://github.com/mage-os/mageos-magento2/pull/309))

- **Review structured data** now emits the review author as a `schema.org/Person` object rather than a bare string. ([#296](https://github.com/mage-os/mageos-magento2/pull/296)) by [@TuVanDev](https://github.com/TuVanDev)

### Bundled add-on updates

- **PageBuilder Template Import/Export updated to 1.9.0** — the security fix described above.

- **RMA module updated to 2.4.1**
  Supports PHP 8.2 and declares an open Magento compatibility range ([#47](https://github.com/mage-os/module-rma/pull/47)); API interfaces and search-result PHPDocs use fully-qualified class names so Swagger generation works ([#49](https://github.com/mage-os/module-rma/pull/49)). by [@marcelmtz](https://github.com/marcelmtz), [@stollr](https://github.com/stollr) and [@Hawksama](https://github.com/Hawksama)

- **Admin Activity Log updated to 2.0.2**
  Removes unused `setConfig` calls in `ThemeConfig` and `SystemConfig`. ([#32](https://github.com/mage-os/module-admin-activity-log/pull/32)) by [@lucafuser](https://github.com/lucafuser)

- **Ignition for Magento updated to 1.3.2**

### Upgrade notes

**PageBuilder template import is stricter.** The security fix changes behaviour in three ways:

1. Templates containing assets that are not images no longer import — only `jpg`, `jpeg`, `png`, `gif` and `webp` assets are accepted. Templates previously exported with other asset types need to be re-exported.
2. `TemplateManagement::storePreviewImage()` throws a `LocalizedException` when a preview image cannot be processed, instead of returning `null`.
3. `CmsConverter::__construct()` and `TemplateManagement::__construct()` take additional arguments. Classes that extend either and call `parent::__construct()` positionally need updating.

**Redis cache bookkeeping changed.** No action is required, but if you run Redis cache with a large tag set, expect garbage collection activity as stale members are swept for the first time.

### Our foundation

Mage-OS 3.3.0 is built on **Magento Open Source 2.4.9**, the same upstream base as 3.2.0, 3.1.0 and 3.0.0. For details on the upstream release, see the [Magento Open Source 2.4.9 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-9).

The certified stack is unchanged from 3.2.0: PHP 8.4, Composer 2.10.2, MySQL 8.4, OpenSearch 3, RabbitMQ 4.1, Valkey 8, Varnish 7.7 and nginx 1.28.

Mage-OS 3.2.0 reaches end of life with this release.

### Thanks to everyone who contributed!

This release was made possible by:

[@Bashev](https://github.com/Bashev), [@edorian](https://github.com/edorian), [@Hawksama](https://github.com/Hawksama), [@hostep](https://github.com/hostep), [@jeanmarcos-dev](https://github.com/jeanmarcos-dev), [@lucafuser](https://github.com/lucafuser), [@marcelmtz](https://github.com/marcelmtz), [@paales](https://github.com/paales), [@rhoerr](https://github.com/rhoerr), [@shlrkb](https://github.com/shlrkb), [@stollr](https://github.com/stollr), [@TuVanDev](https://github.com/TuVanDev)

### How to upgrade

#### Upgrading from Mage-OS 3.2.x

```bash
composer require mage-os/product-community-edition=3.3.0 --no-update
composer update
bin/magento setup:upgrade
```

#### Upgrading from an older Mage-OS version

```bash
composer require mage-os/product-community-edition=^3.3 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 3.3.0. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
