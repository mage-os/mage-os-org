---
title: Mage-OS 3.1.0 – Bug Fixes & Composer Plugin Improvements
excerpt: Mage-OS 3.1.0 brings Mage-OS package name support to the Composer root-update plugin, sixteen core stability fixes, and bundled add-on updates. Built on the same Magento Open Source 2.4.9 base as 3.0.0 — a low-risk, drop-in upgrade.
publishDate: 2026-06-18T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

**Mage-OS Distribution 3.1.0** is now available. This is a maintenance release built on the same **Magento Open Source 2.4.9** base as 3.0.0, with a fix to the Composer root-update plugin and a batch of core stability improvements. There are no dependency additions or removals and no change to PHP support, so it is a low-risk, drop-in upgrade from 3.0.0. We recommend updating at your convenience.

### What's changed

- **Composer root-update plugin now supports Mage-OS package names**
  `mage-os/composer-root-update-plugin` now correctly resolves Mage-OS package names in the `require-commerce` path, so root `composer.json` updates and upgrades work cleanly for Mage-OS-named distributions. ([#7](https://github.com/mage-os/mageos-composer-root-update-plugin/pull/7)) by [@marcelmtz](https://github.com/marcelmtz)

- **Sixteen core stability fixes**, all contributed by [@ddevallan](https://github.com/ddevallan), including:
  - Let `PaymentException` propagate from `savePaymentInformationAndPlaceOrder`, so checkout surfaces the real payment error ([#266](https://github.com/mage-os/mageos-magento2/pull/266))
  - Persist the auto-selected payment method when only one is available ([#265](https://github.com/mage-os/mageos-magento2/pull/265))
  - Map HTTP 429 (Too Many Requests) in the WebAPI `ErrorProcessor` ([#267](https://github.com/mage-os/mageos-magento2/pull/267))
  - Fix `QueryParamsResolver` corrupting base64 values and crashing on valueless params ([#263](https://github.com/mage-os/mageos-magento2/pull/263))
  - Switch AMQP cron consumers from `basic_get` polling to `basic_consume` push ([#213](https://github.com/mage-os/mageos-magento2/pull/213))
  - Convert the admin forgot-password email to HTML with a clickable reset link ([#261](https://github.com/mage-os/mageos-magento2/pull/261))
  - Plus null-safety, validator, admin-UI, and collection-ordering fixes ([#255](https://github.com/mage-os/mageos-magento2/pull/255), [#257](https://github.com/mage-os/mageos-magento2/pull/257), [#259](https://github.com/mage-os/mageos-magento2/pull/259), [#264](https://github.com/mage-os/mageos-magento2/pull/264), [#268](https://github.com/mage-os/mageos-magento2/pull/268), [#273](https://github.com/mage-os/mageos-magento2/pull/273), [#274](https://github.com/mage-os/mageos-magento2/pull/274), [#275](https://github.com/mage-os/mageos-magento2/pull/275), [#276](https://github.com/mage-os/mageos-magento2/pull/276), [#277](https://github.com/mage-os/mageos-magento2/pull/277))

- **RMA module updated to 2.3.1**
  Fixed an unqualified column reference in a database query. ([#36](https://github.com/mage-os/module-rma/pull/36)) by [@norgeindian](https://github.com/norgeindian), reviewed by [@SamueleMartini](https://github.com/SamueleMartini)

- **Ignition for Magento updated to 1.3.0**
  The bundled `swissup/module-ignition` developer tool gains optional JS error reporting and improved stack-trace handling, maintained by [Swissup Labs](https://github.com/swissup).

### Our foundation

Mage-OS 3.1.0 is built on **Magento Open Source 2.4.9**, the same upstream base as 3.0.0. For details on the upstream release, see the [Magento Open Source 2.4.9 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-9).

### Thanks to everyone who contributed!

This release was made possible by:

- [@ddevallan](https://github.com/ddevallan) (Allan Fernandes), from São Paulo, Brazil — the entirety of this release's core stability work, sixteen fixes spanning checkout, the WebAPI layer, message queues, and the admin UI
- [@marcelmtz](https://github.com/marcelmtz) (Marcel Martinez) — Composer root-update plugin fix and release engineering
- [@norgeindian](https://github.com/norgeindian) — RMA database query fix
- [@SamueleMartini](https://github.com/SamueleMartini) (Samuele Martini) — RMA review and maintainership

And thanks to [Swissup Labs](https://github.com/swissup) for the bundled Ignition developer tool.

### Want to participate?

Mage-OS is a community-driven project, and we welcome contributions of all kinds. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions make a difference.

- [Mage-OS GitHub](https://github.com/mage-os)
- [Mage-OS Discord](/discord-channel)

### Installation

#### New installations

```bash
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition=3.1.0 <install-directory-name>
```

#### Upgrading from Mage-OS 3.0.x

```bash
composer require mage-os/product-community-edition=3.1.0 --no-update
composer update
bin/magento setup:upgrade
```

#### Upgrading from an older Mage-OS version

```bash
composer require mage-os/product-community-edition=^3.1 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 3.1.0. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
