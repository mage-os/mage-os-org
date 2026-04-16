---
title: Mage-OS 2.2.2 – Bug Fixes & Compatibility Improvements
excerpt: Mage-OS 2.2.2 brings PHP 8.2 compatibility for Automatic Translation, bug fixes across several modules, and a refined GraphQL dependency constraint.
publishDate: 2026-04-15T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

**Mage-OS Distribution 2.2.2** is now available. This release brings bug fixes and compatibility improvements across several Mage-OS modules. We recommend updating at your convenience.

Note that it is no longer possible to install the previous version due to a security advisory on `webonyx/graphql-php`. This update allows the latest versions of that package to fix it.

### What's changed

- **GraphQL dependency constraint refined**
  Updated `webonyx/graphql-php` constraint from `<15.31.0` to `!=15.31.0 !=15.31.1`, allowing future 15.31.2+ releases while continuing to block the two known-broken versions. ([#218](https://github.com/mage-os/mageos-magento2/pull/218)) by [@rhoerr](https://github.com/rhoerr)

- **Automatic Translation module updated to 2.1.0**
  - PHP 8.2 compatibility: removed typed constants that caused errors on PHP 8.2+ ([#56](https://github.com/mage-os/module-automatic-translation/pull/56)) by [@SamueleMartini](https://github.com/SamueleMartini)
  - Fixed CMS page plain text fields not being translated ([#54](https://github.com/mage-os/module-automatic-translation/pull/54)) by [@SamueleMartini](https://github.com/SamueleMartini)
  - Fixed CMS block ID and type errors ([#60](https://github.com/mage-os/module-automatic-translation/pull/60)) by [@rikwillems](https://github.com/rikwillems)

- **Inventory Reservations Grid: admin OutOfRangeException fixed**
  Added `Magento_InventoryAdminUi` to the module sequence to resolve an `OutOfRangeException` in the admin panel. ([#16](https://github.com/mage-os/module-inventory-reservations-grid/pull/16)) by [@proxiblue](https://github.com/proxiblue)

### Our foundation

Mage-OS 2.2.2 is built on **Magento Open Source 2.4.8-p4**, the same upstream base as 2.2.0 and 2.2.1. For details on upstream changes, see the [Magento Open Source 2.4.8 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-8) and [2.4.8 security patch notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/security-patches/2-4-8-patches#p4).

### Thanks to everyone who contributed!

This release was made possible by:

- [@rikwillems](https://github.com/rikwillems) (Rik Willems) — type error and CMS block fixes in Automatic Translation
- [@SamueleMartini](https://github.com/SamueleMartini) (Samuele Martini) — PHP 8.2 compatibility and CMS translation fixes
- [@dadolun95](https://github.com/dadolun95) (Luca Visciola) — PR reviews for Automatic Translation
- [@proxiblue](https://github.com/proxiblue) (Lucas van Staden) — Inventory Reservations Grid fix
- [@rhoerr](https://github.com/rhoerr) (Ryan Hoerr) — GraphQL constraint update and Page Builder cleanup

### Want to participate?

Mage-OS is a community-driven project, and we welcome contributions of all kinds. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions make a difference.

- [Mage-OS GitHub](https://github.com/mage-os)
- [Mage-OS Discord](/discord-channel)

### Installation

#### New installations

```bash
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition=2.2.2 <install-directory-name>
```

#### Upgrading from Mage-OS 2.2.x

```bash
composer require mage-os/product-community-edition=2.2.2 --no-update
composer update
bin/magento setup:upgrade
```

#### Upgrading from an older Mage-OS version

```bash
composer require mage-os/product-community-edition=^2.2 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 2.2.2. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
