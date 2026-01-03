---
title: "Mage-OS 1.3.0 is out now!"
publishDate: "2025-08-15T00:00:00.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are excited to announce the release of Mage-OS Distribution 1.3.0, another step in the building of the definitive open source e-commerce platform! Mage-OS..."
tags:
  - "Updates"
image: "~/assets/images/blog/2025/New-Mage-OS-Website.png"
---

We are excited to announce the release of Mage-OS Distribution 1.3.0, another step in the building of the definitive open source e-commerce platform!

## Our foundation

Mage-OS 1.3.0 is built on Magento Open Source 2.4.8-p2, and includes all platform updates and community fixes from the upstream release. See the full [Magento Open Source 2.4.8-p2 Release Notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/security-patches/2-4-8-patches?lang=en#p2) for details.

The latest recommended software versions are:

| Composer | 2.8 |
| --- | --- |
| Elasticsearch | \-- (no longer supported) |
| OpenSearch | 2.19 |
| MariaDB | 11.4 |
| MySQL | 8.4 |
| PHP | 8.4/8.3 |
| RabbitMQ | 4 |
| Redis | Valkey 8 (or Redis 7.2+) |
| Varnish | 7.6 |
| Apache | 2.4 |
| nginx | 1.26 |

## Updates to our backend theme

In this release, we enhanced the user interface with improved icon styling, refined newsletter and email template views, optimized data grids and modals, updated jstree components and media galleries, refactored URL rewrites, and fixed LESS configuration issues for greater usability.

## Other updates

- [Fixed JavaScript error encountered when selecting "All Resources"](https://github.com/mage-os/mageos-magento2/pull/150) by Lucas van Staden

- [Fixed integration tests for Magento\_Backend and Magento\_Bundle](https://github.com/mage-os/mageos-magento2/pull/151) by Simon Humeau (Antadis)

- [Fixed missing screen-l styles added using .media-width mixin](https://github.com/mage-os/mageos-magento2/pull/155) by Vova Yatsyuk

- [Fixed city name validation to allow digits, &, ., () characters](https://github.com/mage-os/mageos-magento2/pull/156) by Bhushan Kumar

## Thanks to everyone that helped with this release!

Mage-OS wouldn't exist without a great community. ❤️ Among others, thank you to:

- Artem Kozynets

- Bhushan Kumar

- Fabrizio Balliano

- Lucas van Staden

- Ryan Hoerr

- Simon Humeau (Antadis)

- Vinai Kopp

- Vova Yatsyuk

And to everyone that has helped with testing, feedback, and our weekly tech meetings!

## Want to participate?

Are you interested in contributing to Mage-OS, or have a bug or improvement you’d like to make? **We welcome pull requests** at [https://github.com/mage-os/mageos-magento2](https://github.com/mage-os/mageos-magento2)!

If you have a bigger project in mind, please [join Discord](http://chat.mage-os.org/) and chat about your idea. We’d be delighted to hear from you, and help figure out how your idea best fits into Mage-OS!

## Installing Mage-OS

You can create a new Mage-OS project with the following SSH command:

```
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition .
```

After a successful composer download, you will need to run the installer. Please see [DevDocs: Installation Guide for Mage-OS](https://devdocs.mage-os.org/docs/main)

## Moving to Mage-OS

If you are already using Magento 2.4 and PHP 8.2+, you can change to Mage-OS by running the following in SSH:

```
composer config repositories.0 composer https://repo.mage-os.org/ && 
    composer require mage-os/product-community-edition --no-update && 
    composer remove magento/product-community-edition magento/composer-dependency-version-audit-plugin magento/composer-root-update-plugin --no-update && 
    composer remove sebastian/comparator --dev --no-update && 
    composer update --no-plugins --with-all-dependencies
```

We strongly recommend updating to the latest Magento version (currently 2.4.8) before changing to Mage-OS, to minimize issues.

Your specific situation may require additional changes to your `composer.json` file. Generally this will involve changing `magento/` package names to `mage-os/`, or updating dependency versions.
