---
title: "Mage-OS 2.1 is out now!"
publishDate: "2026-01-20T01:55:25.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are excited to announce the release of Mage-OS Distribution 2.1.0, continuing our mission to provide a community-driven, open, and reliable e-commerce..."
image: "~/assets/images/blog/2026/New-Mage-OS-Website.png"
---
We are excited to announce the release of **Mage-OS Distribution 2.1.0**, continuing our mission to provide a community-driven, open, and reliable e-commerce platform.

This release includes bug fixes, performance improvements, expanded database compatibility, and new developer tools.

### Our foundation

Mage-OS 2.1.0 is based on a solid foundation of proven, well-supported software:

| Software | Version |
| --- | --- |
| Composer | 2.x |
| Elasticsearch | 8.x |
| OpenSearch | 2.x |
| MariaDB | 10.2 – 10.11, 11.x |
| MySQL | 5.7, 8.0 – 8.4 |
| nginx | 1.24+ |
| PHP | 8.2, 8.3, 8.4 |
| RabbitMQ | 3.13+ |
| Redis | 7.x |
| Varnish | 7.x |

### Bug fixes

Several issues have been resolved in this release:

- **Customer group extension attributes**
Fixed a plugin that was overwriting existing extension attributes instead of preserving them ([#53](https://github.com/mage-os/mageos-magento2/pull/53))

- **Customer file attribute handling**
Prevents session files from being written to the filesystem for non-file customer attributes ([#174](https://github.com/mage-os/mageos-magento2/pull/174))

- **Full Page Cache after login**
Resolved an issue where native FPC didn't work properly for logged in customers (AC-14999) ([#176](https://github.com/mage-os/mageos-magento2/pull/176))

- **SRI hash failures**
Fixed Subresource Integrity hash failures that occurred when using JavaScript bundling and minification together ([#177](https://github.com/mage-os/mageos-magento2/pull/177))

- **Plugin generation area order**
Fixed setup:di:compile to generate plugins in the correct area order, preventing frontend cache regeneration on first request ([#194](https://github.com/mage-os/mageos-magento2/pull/194))

- **Mage-OS Page Builder Widgets module updated to 1.3.3**

Fixed css hiding other modal form labels ([#10](https://github.com/mage-os/module-page-builder-widget/pull/10))

- Fixed virtualTypes on Block classes used by widgets ([#13](https://github.com/mage-os/module-page-builder-widget/pull/13))

### New features

#### Theme registration status command

A new CLI command helps developers identify themes that exist in the filesystem but are not registered in the database:

```bash
bin/magento theme:registration:status
```

This helps detect when theme changes require setup to be run, for zero-downtime deployment processes. ([#186](https://github.com/mage-os/mageos-magento2/pull/186))

#### Queue configuration status command

A new CLI command detects inconsistencies in message queue configuration for both MySQL and AMQP (RabbitMQ/AmazonMQ) backends:

```bash
bin/magento queue:config:status
```

This helps detect when message queue changes require setup to be run, for zero-downtime deployment processes and health checks. ([#188](https://github.com/mage-os/mageos-magento2/pull/188))

### Expanded database support

We've expanded database compatibility to better match real-world hosting environments:

- **MySQL:** 5.7, 8.0 through 8.4

- **MariaDB:** 10.2 through 10.11, and all 11.x versions

This gives you more flexibility in choosing your database server and makes upgrades smoother. ([#189](https://github.com/mage-os/mageos-magento2/pull/189))

### Thanks to everyone who contributed!

This release was made possible by the contributions of our community members:

- [@avstudnitz](https://github.com/avstudnitz) (Andreas von Studnitz)

- [@dadolun95](https://github.com/dadolun95) (Davide Lunardon)

- [@furan917](https://github.com/furan917) (Francis Gallagher)

- [@jakwinkler](https://github.com/jakwinkler) (Jakub Winkler)

- [@melindash](https://github.com/melindash) (Melinda Humphrey)

- [@rhoerr](https://github.com/rhoerr) (Ryan Hoerr)

- [@rogerdz](https://github.com/rogerdz)

- [@samdjames](https://github.com/samdjames) (Sam James)

### Want to participate?

Mage-OS is a community-driven project, and we welcome contributions of all kinds. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions make a difference.

- [Mage-OS GitHub](https://github.com/mage-os)

- [Mage-OS Discord](/discord-channel)

### Installation

#### New installations

```bash
composer create-project --repository-url=https://mirror.mage-os.org/ mage-os/project-community-edition=2.1.0 <install-directory-name>
```

#### Upgrading from a previous Mage-OS version

```bash
composer require mage-os/product-community-edition=2.1.0 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 2.1.0. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
