---
title: Mage-OS 2.2.1 – Security & Stability Patch
excerpt: Mage-OS 2.2.1 is a patch release addressing a GraphQL API breaking change, a checkout reCAPTCHA regression, and a critical upload vulnerability.
publishDate: 2026-03-18T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

**Mage-OS Distribution 2.2.1** is now available. This is a security and stability patch for the 2.2 release line — we strongly recommend updating as soon as possible.

### What's fixed

- **"PolyShell" upload vulnerability blocked (security)**
  Cherry-picked upstream Magento patch (ACP2E-4138) that prevents an attacker from sending an RCE payload via REST API POST requests. This addresses the ["PolyShell" vulnerability](https://sansec.io/research/magento-polyshell) that can affect insecure server environments. ([#210](https://github.com/mage-os/mageos-magento2/pull/210)) by [@marcelmtz](https://github.com/marcelmtz)

- **GraphQL API compatibility restored**
  Pinned `webonyx/graphql-php` to `<15.31.0` to work around a breaking change in that library that broke Magento's GraphQL API. ([#211](https://github.com/mage-os/mageos-magento2/pull/211)) by [@rhoerr](https://github.com/rhoerr)

- **Checkout reCAPTCHA regression reverted**
  Reverted the reCAPTCHA deferred-loading optimization introduced in 2.2.0, which caused reCAPTCHA failures on checkout pages using hosted/iframe payment forms (e.g. Braintree) and some other integrations. ([mageos-security-package#8](https://github.com/mage-os/mageos-security-package/pull/8)) by [@rhoerr](https://github.com/rhoerr)

### Our foundation

Mage-OS 2.2.1 is built on **Magento Open Source 2.4.8-p4**, the same upstream base as 2.2.0. For details on upstream changes, see the [Magento Open Source 2.4.8 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-8) and [2.4.8 security patch notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/security-patches/2-4-8-patches#p4).

### Thanks to everyone who contributed!

Thank you to [@rhoerr](https://github.com/rhoerr) (Ryan Hoerr) and [@marcelmtz](https://github.com/marcelmtz) (Marcel Martinez) for handling this release!

Thanks also to [@ProxiBlue](https://github.com/ProxiBlue) (Lucas van Staden), [@damienwebdev](https://github.com/damienwebdev) (Damien Retzinger), and [@Vinai](https://github.com/Vinai) (Vinai Kopp) for assistance with discovery and testing of the issues and solutions.

### Want to participate?

Mage-OS is a community-driven project, and we welcome contributions of all kinds. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions make a difference.

- [Mage-OS GitHub](https://github.com/mage-os)
- [Mage-OS Discord](/discord-channel)

### Installation

#### New installations

```bash
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition=2.2.1 <install-directory-name>
```

#### Upgrading from Mage-OS 2.2.0

```bash
composer require mage-os/product-community-edition=2.2.1 --no-update
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

We hope you enjoy Mage-OS 2.2.1. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
