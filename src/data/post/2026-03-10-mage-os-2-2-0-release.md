---
title: Mage-OS 2.2 is out now!
excerpt: Mage-OS 2.2.0 adds important security patches from Magento Open Source 2.4.8-p4, along with bug fixes and UI improvements.
publishDate: 2026-03-10T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

> **Update:** Mage-OS 2.2.1 is now available with important security and stability fixes. [Read the 2.2.1 release post](/releases/2026-03-18-mage-os-2-2-1-release).

We are excited to announce the release of **Mage-OS Distribution 2.2.0**, incorporating important security patches from upstream, along with bug fixes and UI improvements. We strongly recommend updating as soon as possible.

### Our foundation

Mage-OS 2.2.0 is built on **Magento Open Source 2.4.8-p4**, released today with a variety of security fixes.

Please check the [Magento Open Source 2.4.8 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-8) and the [2.4.8 security patch notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/security-patches/2-4-8-patches#p4) for details on upstream changes.

| Software | Version |
| --- | --- |
| Composer | 2.9 |
| OpenSearch | 3.x (or Elasticsearch 8.x) |
| MariaDB | 11.4 |
| MySQL | 8.4 |
| nginx | 1.28 |
| PHP | 8.3, 8.4 |
| RabbitMQ | 4.1 |
| Redis | Valkey 8 (or Redis 7.2+) |
| Varnish | 7.7 |

### What's changed

- **Real column type introspection fix**
  Fixed an issue where `setup:db:status` and `setup:db-schema:upgrade` perpetually reported pending `modify_column` changes for certain `DOUBLE UNSIGNED` columns. ([#205](https://github.com/mage-os/mageos-magento2/pull/205)) by [@furan917](https://github.com/furan917)

- **Mage-OS Admin Theme (m137) updated from 1.3.2 to 1.3.4**
  - Refactored action-split, page-builder standard/connected buttons to align with Google Material Design 3
  - UI improvements to field labels, control spacing, modal messaging, newsletter, and order/shipment styling
  - Replaced GIF loader with SVG

- **PCI 4 Compatibility module updated from 1.3.1 to 1.4.1**
  - Structural improvements to the session expiry modal
  - Fixed z-index to ensure the session expiry modal renders above all other page elements

### Mirror updates

The latest Magento versions, including 2.4.8-p4, are also available from our public Magento mirror at [mirror.mage-os.org](https://mirror.mage-os.org). This mirror is a drop-in replacement for `repo.magento.com` (except Magento Marketplace), allowing you to install Magento without any login credentials.

### Thanks to everyone who contributed!

Thank you to [@rhoerr](https://github.com/rhoerr) (Ryan Hoerr) and [@marcelmtz](https://github.com/marcelmtz) (Marcel Martinez) for handling this release!

This release was also made possible by the contributions of:

- [@artKozynets](https://github.com/artKozynets) (Artem Kozynets)
- [@furan917](https://github.com/furan917) (Francis Gallagher)
- [@aligent-lturner](https://github.com/aligent-lturner) (Lachlan Turner, [Aligent](https://github.com/aligent))

### Want to participate?

Mage-OS is a community-driven project, and we welcome contributions of all kinds. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions make a difference.

- [Mage-OS GitHub](https://github.com/mage-os)
- [Mage-OS Discord](/discord-channel)

### Installation

#### New installations

```bash
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition=2.2.0 <install-directory-name>
```

#### Upgrading from a previous Mage-OS version

```bash
composer require mage-os/product-community-edition=^2.2 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 2.2.0. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
