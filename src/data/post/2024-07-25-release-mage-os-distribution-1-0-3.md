---
title: "Release: Mage-OS Distribution 1.0.3"
publishDate: "2024-07-25T00:00:00.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are proud to announce Mage-OS Distribution version 1.0.3 is now available! This Mage-OS update brings parity with Magento Open Source 2.4.7 and 2.4.7-p1,..."
tags:
  - "Updates"
image: "~/assets/images/blog/2024/New-Mage-OS-Website.png"
---

We are proud to announce Mage-OS Distribution version 1.0.3 is now available!

## Release Notes

This Mage-OS update brings parity with Magento Open Source 2.4.7 and 2.4.7-p1, plus additional contributions particularly to the unit and integration testing suites.

Please see the [release notes for Magento Open Source 2.4.7](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-7) and the [patch notes for 2.4.7-p1](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/security-patches/2-4-7-patches).

### What's Changed

- Changes and fixes from upstream 2.4.7

- Security changes from upstream 2.4.7-p1 by [@rhoerr](https://github.com/rhoerr) in [#98](https://github.com/mage-os/mageos-magento2/pull/98)

- GitHub Actions
    - Add inputs to mage-os/github-actions/coding-standard-baseline by [@Tjitse-E](https://github.com/Tjitse-E) in [#59](https://github.com/mage-os/mageos-magento2/pull/59)
    
    - Add full integration tests workflow by [@vpodorozh](https://github.com/vpodorozh) in [#57](https://github.com/mage-os/mageos-magento2/pull/57)
    
    - Add Nx integration tests by [@adamzero1](https://github.com/adamzero1) in [#64](https://github.com/mage-os/mageos-magento2/pull/64)

- Unit and Integration Test Fixes
    - Integration tests/ fix failed tests by [@vpodorozh](https://github.com/vpodorozh) in [#61](https://github.com/mage-os/mageos-magento2/pull/61)
    
    - Resolve merge conflicts by [@Vinai](https://github.com/Vinai) in [#87](https://github.com/mage-os/mageos-magento2/pull/87)
    
    - Update incorrect dataprovider for Catalog\\SortingTest by [@vpodorozh](https://github.com/vpodorozh) in [#89](https://github.com/mage-os/mageos-magento2/pull/89)
    
    - GraphQl mutation state check | PlaceOrder and Customer actions - skip list adjustments by [@vpodorozh](https://github.com/vpodorozh) in [#90](https://github.com/mage-os/mageos-magento2/pull/90)
    
    - Skip some of the Bundle tests as the underlying problems are too big … by [@vpodorozh](https://github.com/vpodorozh) in [#92](https://github.com/mage-os/mageos-magento2/pull/92)
    
    - Fix expireDate formating for integration test by [@vpodorozh](https://github.com/vpodorozh) in [#91](https://github.com/mage-os/mageos-magento2/pull/91)
    
    - [#79](https://github.com/mage-os/mageos-magento2/issues/79) - add shutdown functions wrapper to make sure TestModules will be… by [@vpodorozh](https://github.com/vpodorozh) in [#93](https://github.com/mage-os/mageos-magento2/pull/93)
    
    - Fix failed tests after the upstream update - db&app isolation were missed by [@vpodorozh](https://github.com/vpodorozh) in [#94](https://github.com/mage-os/mageos-magento2/pull/94)
    
    - Fix invalid data-sets for unit tests by [@vpodorozh](https://github.com/vpodorozh) in [#95](https://github.com/mage-os/mageos-magento2/pull/95)

- Resolve merge conflict [https://github.com/mage-os/mageos-magen…](https://github.com/mage-os/mageos-magen%E2%80%A6) by [@vitaliy-golomoziy](https://github.com/vitaliy-golomoziy) in [#58](https://github.com/mage-os/mageos-magento2/pull/58)

**Full Changelog**: [1.0.1...1.0.3](https://github.com/mage-os/mageos-magento2/compare/1.0.1...1.0.3)

### Contributors

- [@vitaliy-golomoziy](https://github.com/vitaliy-golomoziy) made their first contribution in [#58](https://github.com/mage-os/mageos-magento2/pull/58)

- [@vpodorozh](https://github.com/vpodorozh) made their first contribution in [#57](https://github.com/mage-os/mageos-magento2/pull/57)

Thank you to all that contributed toward this release, including:

- Adam Crossland

- Christian Münch

- Damien Retzinger

- Ihor Sviziev

- Jakub Winkler

- Max Novik

- Ryan Hoerr

- Simon Sprankel

- Tjitse Efdé

- Vinai Kopp

- Vladyslav Podorozhnyi

Thank you also to all who attend our weekly tech meetings, and to all who have ongoing efforts underway!

## Contribute

Are you interested in contributing to Mage-OS, or have a bug or improvement you’d like to make? **We welcome pull requests** at [https://github.com/mage-os/mageos-magento2](https://github.com/mage-os/mageos-magento2)!

If you have a bigger project in mind, please [join Discord](http://chat.mage-os.org/) and summarize your idea. We’d be delighted to hear from you, and help figure out how your idea best fits into Mage-OS!

## Installing Mage-OS

You can create a new Mage-OS project with the following SSH command:

```
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition .
```

After a successful composer download, you will need to run the installer. Please see [DevDocs: Installation Guide for Mage-OS](https://devdocs.mage-os.org/docs/main)

## Moving to Mage-OS

If you are already using Magento 2.4 and PHP 8.1+, you can change to Mage-OS by running the following in SSH:

```
composer config repositories.0 composer https://repo.mage-os.org/ && \
    composer require mage-os/product-community-edition --no-update && \
    composer remove magento/product-community-edition magento/composer-dependency-version-audit-plugin magento/composer-root-update-plugin --no-update && \
    composer remove sebastian/comparator --dev --no-update && \
    composer update --no-plugins --with-all-dependencies
```

We strongly recommend updating to the latest Magento version (currently 2.4.7-p1) before changing to Mage-OS, to minimize issues.

Your specific situation may require additional changes to your `composer.json` file. Generally this will involve changing `magento/` package names to `mage-os/`, or updating dependency versions.

## What’s Next?

### Our Vision for Mage-OS

The Mage-OS Distribution is an upstream compatible metapackage based on Magento Open Source. Think of it as an independent version of Magento—based on Magento source code, but including additional changes specific to Mage-OS.

The purpose of the Mage-OS core distribution is to provide

- Improved decoupling of packages

- Improved developer experience while working with the product

- Improved developer experience while contributing to the product

- Full compatibility with Magento extensions

- Focus on additional security

- Reduced infrastructure stack dependencies

- Low-level code improvements, for example in the areas of caching and indexing

- Removal of most bundled extensions contained in upstream (still independently installable if desired)

- A simple documented migration path to Magento Open Source or Adobe Commerce

Mage-OS Distribution releases are made independently of upstream releases. This enables us to move faster when desired, for example when enabling compatibility with new PHP versions.

New functional features will be introduced through independently installable modules. This follows the same decoupling approach that Adobe Commerce is using, allowing for a more stable core and an independent feature module release schedule.

The goal of the reduced infrastructure stack dependencies is to enable new developers to be onboarded more easily. The goal is to be able to use a plain XAMPP stack on any machine, including Windows, to run and develop with Mage-OS. This requires making Elasticsearch optional, as well as ensuring services like Redis, RabbitMQ, Node.js and such remain optional.

Mage-OS will also maintain backwards compatibility and the ability to migrate upstream at multiple levels:

- Compatibility with third-party extensions

- Database level compatibility (data and schema)

- API stability

All of our work on [creating custom releases based on Magento](https://github.com/mage-os/generate-mirror-repo-js) is open source, meaning:

1. Mage-OS builds can be independently built and verified, and are fully reproducible;

3. If you want to create your own fork and version of Magento or Mage-OS, you can do that too.

That’s all for now!
