---
title: "Mage-OS 1.1: A new admin experience, and so much more!"
publishDate: "2025-04-15T00:00:00.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are excited to announce the release of Mage-OS Distribution 1.1.0, a milestone in the development of our community project! This release packs one huge..."
tags:
  - "Updates"
image: "~/assets/images/blog/2025/New-Mage-OS-Website.png"
---

We are excited to announce the release of Mage-OS Distribution 1.1.0, a milestone in the development of our community project!

This release packs one huge change, some major ones and many minor security improvements, for the biggest release we've ever had!

But first of all, let's start with...

## Our foundation

Mage-OS 1.1 is built on Magento Open Source 2.4.8, and includes all platform updates and community fixes from the upstream release. See the full [Magento Open Source 2.4.8 Release Notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-8) for details.

As part of that, Mage-OS 1.1 adds support for PHP 8.4, drops support for PHP 8.1, and requires OpenSearch 2.x going forward.

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

## A new backend experience

Thanks to the hard work of **Artem Kozynets**, one of the members of our community, we're proud to announce that Mage-OS 1.1 includes a completely redesigned theme for the admin panel!

![](~/assets/images/blog/2025/mage-os-110-dashboard-936x1024.png)

This is not just a quick style, it's a complete design system inspired by Material Design 3. The design system is [available for you to preview and use on Figma](https://www.figma.com/community/file/1486802857979032188/m137-design-system-and-ui-kit). We would like to extend a huge thank you to Artem for all of his effort and dedication here.

This is such a big change that we've dedicated [a full blog post to it](/?p=4400)!

## Major performance improvements

In addition to the new admin theme, we've chosen to bundle the [Creatuity Compiled Interceptors](https://github.com/creatuity/magento2-interceptors) open source module. Thank you to Franciszek Wawrzak for his tireless work creating and maintaining this solution.

This module changes the way Magento 2 generates Interceptor classes (a mechanism that allows plugins to work together), to make plugins faster to execute. This is a drop-in replacement for Magento's normal interceptor classes. In the process, since Magento uses a lot of plugins, including this lowers the production TTFB (response times) by an average of 10%!

## Security improvements and bugfix

Magento 2.4.8 allows for disclosing of all catalog/sales promotion rules, and customer groups, via GraphQL API calls. We believe these details should stay private unless merchants opt in to sharing them. Thanks to Damien Retzinger, Mage-OS 1.1.0 [disables](https://github.com/mage-os/mageos-magento2/pull/135) [these](https://github.com/mage-os/mageos-magento2/pull/136) calls.

We also found an error in the calculation of the lowest price of a products when child products are out of stock... [and fixed it thanks to Melinda Humphrey](https://github.com/mage-os/mageos-inventory/pull/2).

## Thanks to everyone that helped with this release!

Mage-OS wouldn't exist without a great community. ❤️ Among others, thank you to:

- Artem Kozynets

- Damien Retzinger

- Fabrizio Balliano

- Franciszek S Wawrzak

- Lucas van Staden

- Melinda Humphrey

- Ryan Hoerr

- Tjitse Efdé

- Vinai Kopp

Along with recent [Mage-OS Lab](https://github.com/mage-os-lab) contributors:

- Antonio Carboni

- Christian Münch

- Davide Lunardon

- Jakub winkler

- Luca Fuser

- Nils Preuß

- Ryan Sun

- Samuele Martini

- Stefano Tusino

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
