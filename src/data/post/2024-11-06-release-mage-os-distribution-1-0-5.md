---
title: "Release: Mage-OS Distribution 1.0.5"
publishDate: "2024-11-06T00:00:00.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are excited to announce the release of Mage-OS Distribution 1.0.5! This release achieves full parity with Magento Open Source 2.4.7-p3, which incorporates..."
tags:
  - "Updates"
image: "~/assets/images/blog/2024/New-Mage-OS-Website.png"
---

We are excited to announce the release of Mage-OS Distribution 1.0.5!

## Release Notes

This release achieves full parity with Magento Open Source 2.4.7-p3, which incorporates critical platform security enhancements.

Please check the [release notes for Magento Open Source 2.4.7](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-7) and the [patch notes for 2.4.7-p3](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/security-patches/2-4-7-patches).

You can get Mage-OS from our primary composer repository, [repo.mage-os.org](https://repo.mage-os.org).

### What's Changed

- [Mage-OS 1.0.5 is based on Magento 2.4.7-p3](https://github.com/mage-os/mageos-magento2/pull/107) by [rhoerr](https://github.com/rhoerr)

- [Changed TinyMCE 7 to 6 for license compatibility](https://github.com/mage-os/mageos-magento2/pull/107) by [fballiano](https://github.com/fballiano)

- [Improved menu/toolbar settings for TinyMCE 6](https://github.com/mage-os/mageos-magento2/pull/109) by [rhoerr](https://github.com/rhoerr)

- [Disabled javascript minifying of TinyMCE, fixing a bug loading language files](https://github.com/mage-os/mageos-magento2/pull/107) by [hostep](https://github.com/hostep)

- [Restored compatibility with TinyMCE plugins, after upgrading from v5](https://github.com/mage-os/mageos-magento2/pull/107) by [hostep](https://github.com/hostep)

- [Fixed a bug with autocomplete suggesting non-searchable terms](https://github.com/mage-os/mageos-magento2/pull/110) by [kuafucode](https://github.com/kuafucode)

**Full Changelog**: [1.0.4...1.0.5](https://github.com/mage-os/mageos-magento2/compare/1.0.4...1.0.5)

### Mirror Updates

The latest Magento versions are also available from our public Magento mirror, [mirror.mage-os.org](https://mirror.mage-os.org):

- 2.4.4-p11

- 2.4.5-p10

- 2.4.6-p8

- 2.4.7-p3

This mirror composer repository is a drop-in replacement for Magento packages from repo.magento.com. This way you can install Magento without any login, using our public and repeatable build process from the official Magento sources.

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
composer config repositories.0 composer https://repo.mage-os.org/ && 
    composer require mage-os/product-community-edition --no-update && 
    composer remove magento/product-community-edition magento/composer-dependency-version-audit-plugin magento/composer-root-update-plugin --no-update && 
    composer remove sebastian/comparator --dev --no-update && 
    composer update --no-plugins --with-all-dependencies
```

We strongly recommend updating to the latest Magento version (currently 2.4.7-p2) before changing to Mage-OS, to minimize issues.

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
