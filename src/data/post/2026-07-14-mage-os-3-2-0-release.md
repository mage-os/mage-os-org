---
title: Mage-OS 3.2.0 – Security Release
excerpt: Mage-OS 3.2.0 is a security release. It ports Adobe's isolated security patch 249-2026-07-001 to source, fixes a world-readable env.php backup written by the installer, and updates the bundled RMA and Automatic Translation modules. All 3.x users should upgrade.
publishDate: 2026-07-14T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

**Mage-OS Distribution 3.2.0** is now available. This is a **security release** and we recommend upgrading promptly.

It ports Adobe's isolated security patch `249-2026-07-001` to source, and fixes a lower-severity issue in the interactive installer that could leave service credentials in a world-readable backup file. It is built on the same **Magento Open Source 2.4.9** base as 3.1.0, with no dependency additions or removals and no change to PHP support, so it remains a drop-in upgrade from 3.1.x.

### Security

#### Adobe isolated security patch 249-2026-07-001

Adobe distributes isolated patches out-of-band, separately from the quarterly release train — the content is not published to any Magento git tag or Composer package. Mage-OS 3.2.0 ports the patch to source, so you receive it by upgrading rather than by applying a patch file by hand.

The patch addresses several distinct issues:

- **Guest cart takeover.** The guest cart endpoints did not verify that a masked cart ID actually resolved to a *guest* cart, allowing a masked ID to be used to reach a signed-in customer's cart. Every guest-facing entry point — cart, items, coupons, billing and shipping addresses, payment and shipping methods, totals, and gift messages — now validates cart ownership before acting. Quote address validation is also promoted from REST-only to all entry points, including GraphQL.
- **Stored cross-site scripting via inline translation.** Translated content is now stripped of `script`, `iframe`, `object`, `form`, `style` and similar tags, along with `on*` event handlers, and external links are filtered out.
- **Template-injection sanitizer bypass.** The UI component data sanitizer could be evaded by embedding a newline inside a `${...}` payload. It now matches across newlines.
- **Template injection via product data.** Product gallery and product-view-counter data injected into JSON is no longer treated as an interpolatable template.
- **Disabled product disclosure via GraphQL.** Disabled products could be surfaced through the CatalogUrlRewrite GraphQL URL resolver.
- **Customer address media hardening.** The `customer_address` directory is removed from the allowed media resources, additional dangerous file extensions (`hta`, `mhtml`, `mht`, `htc`, `xht`, `shtm`, `php8`) are blocked, and `nginx.conf.sample` gains a `deny all` rule for `/media/customer_address/`.

> **If you maintain your own nginx configuration** rather than using the shipped `nginx.conf.sample`, add the `/media/customer_address/` deny rule yourself. Upgrading will not modify your live web server config, so this is the one item that does not take effect automatically.

Adobe's patch also ships a `vendor/bin/patch-status` tool, which reports installed-patch state to Adobe's registry using `repo.magento.com` credentials. **This tool is deliberately not included in Mage-OS.** It is a Composer-generated binary with no source-tree equivalent, Mage-OS users have no `repo.magento.com` credentials, and none of the security fixes depend on it. If you diff Mage-OS against Adobe's patch and notice the file missing, this is why.

#### Interactive installer wrote a world-readable env.php backup

When the **interactive installer** was re-run over an existing installation, it backed up `app/etc/env.php` to a world-readable file without a `.php` extension, potentially exposing service credentials. The backup is now written with owner-only (`0600`) permissions and keeps a `.php` extension, so it cannot be served as raw plaintext.

This affects only the interactive installer's resume path, not `bin/magento setup:install`, and exposure additionally requires `app/etc` to sit inside the web root (the legacy root-as-docroot layout). Severity is low.

Reported by Volker Dusch ([@edorian](https://github.com/edorian)) of the [PHP Ecosystem Security Team](https://thephp.foundation/blog/2026/05/18/announcing-ecosystem-security-team/) at The PHP Foundation, and fixed by [@marcelmtz](https://github.com/marcelmtz). See [GHSA-rcp4-m32j-8fhj](https://github.com/mage-os/mageos-magento2/security/advisories/GHSA-rcp4-m32j-8fhj) (CWE-276).

### Other fixes

- **Multi-store URL cache collision**
  The URL cache key now includes the scope ID, preventing URLs from colliding across stores. ([#271](https://github.com/mage-os/mageos-magento2/pull/271)) by [@ddevallan](https://github.com/ddevallan)

- **`GLOB_BRACE` on non-GNU systems**
  Fixes glob handling on systems whose libc does not support `GLOB_BRACE`, such as Alpine/musl. by [@rhoerr](https://github.com/rhoerr)

- **Installer Redis cache backend**
  The installer now writes the `redis` backend type rather than `Cm_Cache_Backend_Redis`. ([#281](https://github.com/mage-os/mageos-magento2/pull/281)) by [@marcelmtz](https://github.com/marcelmtz)

- **Integration tests** now support a Unix-socket `db-host`. ([#285](https://github.com/mage-os/mageos-magento2/pull/285)) by [@pingiun](https://github.com/pingiun)

### Bundled add-on updates

- **RMA module updated to 2.4.0**
  Adds an `rma_commit_after` event and refines RMA email dispatch logic ([#43](https://github.com/mage-os/module-rma/pull/43)); guest-form RMAs are now linked to the customer when the order has one, RMA lookup labels are localized in the resolver and emails, and a `TypeError` in the RMA repositories' `getList()` caused by untyped SearchResults is fixed ([#44](https://github.com/mage-os/module-rma/pull/44)). by [@yuriy-boyko](https://github.com/yuriy-boyko) and [@orilupo](https://github.com/orilupo), reviewed by [@SamueleMartini](https://github.com/SamueleMartini)

- **Automatic Translation updated to 2.2.1**
  Paginates per 100 items to avoid failures on large catalogs ([#66](https://github.com/mage-os/module-automatic-translation/pull/66)) and fixes the cron expression ([#67](https://github.com/mage-os/module-automatic-translation/pull/67)); uses the DeepL `v2/languages` endpoint for target-language normalization ([#69](https://github.com/mage-os/module-automatic-translation/pull/69)); and fixes a PHP 8.5 `ErrorException` on a new product from a null `getById()` ([#70](https://github.com/mage-os/module-automatic-translation/pull/70)). by [@rikwillems](https://github.com/rikwillems), [@dadolun95](https://github.com/dadolun95) and [@rhoerr](https://github.com/rhoerr)

- **Ignition for Magento updated to 1.3.1** and **PCI 4 Compatibility updated to 1.4.2**

### Our foundation

Mage-OS 3.2.0 is built on **Magento Open Source 2.4.9**, the same upstream base as 3.1.0 and 3.0.0. For details on the upstream release, see the [Magento Open Source 2.4.9 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-9).

Composer **2.10.2** is now the certified version for Mage-OS 3.2.0 (previously 2.9.8). The rest of the certified stack is unchanged: PHP 8.4, MySQL 8.4, OpenSearch 3, RabbitMQ 4.1, Valkey 8, Varnish 7.7 and nginx 1.28.

Mage-OS 3.1.0 reaches end of life with this release.

### Thanks to everyone who contributed!

This release was made possible by:

- Volker Dusch ([@edorian](https://github.com/edorian)) and the [PHP Ecosystem Security Team](https://thephp.foundation/blog/2026/05/18/announcing-ecosystem-security-team/) at The PHP Foundation — for responsibly reporting the installer `env.php` backup vulnerability
- [@marcelmtz](https://github.com/marcelmtz) (Marcel Martinez) — security patch porting, installer fixes and release engineering
- [@rhoerr](https://github.com/rhoerr) (Ryan Hoerr) — `GLOB_BRACE` fix and the PHP 8.5 fix in Automatic Translation
- [@ddevallan](https://github.com/ddevallan) (Allan Fernandes) — multi-store URL cache fix
- [@pingiun](https://github.com/pingiun) (Jelle Besseling) — Unix-socket support in integration tests
- [@yuriy-boyko](https://github.com/yuriy-boyko) (Yuriy Boyko) and [@orilupo](https://github.com/orilupo) (Oreste Luppi) — RMA enhancements and fixes
- [@rikwillems](https://github.com/rikwillems) (Rik Willems) and [@dadolun95](https://github.com/dadolun95) (Davide Lunardon) — Automatic Translation fixes
- [@SamueleMartini](https://github.com/SamueleMartini) (Samuele Martini) — add-on review and maintainership

And thanks to [Swissup Labs](https://github.com/swissup) for the bundled Ignition developer tool.

### Want to participate?

Mage-OS is a community-driven project, and we welcome contributions of all kinds. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions make a difference.

- [Mage-OS GitHub](https://github.com/mage-os)
- [Mage-OS Discord](/discord-channel)

### Installation

#### New installations

```bash
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition=3.2.0 <install-directory-name>
```

#### Upgrading from Mage-OS 3.1.x

```bash
composer require mage-os/product-community-edition=3.2.0 --no-update
composer update
bin/magento setup:upgrade
```

#### Upgrading from an older Mage-OS version

```bash
composer require mage-os/product-community-edition=^3.2 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 3.2.0. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
