---
title: "Introducing the Mage-OS Distribution"
publishDate: "2023-10-09T00:00:00.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are proud to announce version 1 of the Mage-OS Distribution! This release is based on Magento 2.4.6-p3, plus additional contributions including a refreshed..."
tags:
  - "Updates"
image: "~/assets/images/blog/2023/New-Mage-OS-Website.png"
---

We are proud to announce version 1 of the Mage-OS Distribution!

This release is based on Magento 2.4.6-p3, plus additional contributions including a refreshed admin panel. We will continue making enhancements over time, as they're contributed by the open source community.

Because they're based on the same code, all of your existing Magento extensions will work with Mage-OS too!

UPDATE 2023-10-11: With the release of Magento security patch 2.4.6-p3 today, we've also published Mage-OS Distribution 1.0.1.

## Installing Mage-OS

You can create a new Mage-OS project with the following SSH command:

```
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition .
```

After a successful composer download, you will need to run the installer. Please see [DevDocs: Installation Guide for Mage-OS](https://devdocs.mage-os.org/docs/main)

## Moving to Mage-OS

If you are already using Magento 2.4 and PHP 8.1+, you can change to Mage-OS by running the following in SSH:

```
composer config repositories.0 composer https://repo.mage-os.org/ && \
    composer require mage-os/product-community-edition --no-update && \
    composer remove magento/product-community-edition magento/composer-dependency-version-audit-plugin magento/composer-root-update-plugin --no-update && \
    composer remove sebastian/comparator --dev --no-update && \
    composer update --no-plugins --with-all-dependencies
```

We strongly recommend updating to the latest Magento version (currently 2.4.6-p3) before changing to Mage-OS, to minimize issues.

Your specific situation may require additional changes to your `composer.json` file. Generally this will involve changing `magento/` package names to `mage-os/`, or updating dependency versions.

## Release Notes

This release is based on Magento 2.4.6-p3, plus community contributions merged since. It also includes the following Mage-OS-specific changes:

- Removed adobe-commerce/adobe-ims-metapackage, magento/adobe-stock-integration, magento/google-shopping-ads, paypal/module-braintree, temando/module-shipping (thanks to Vinai Kopp)

- Admin theme Mage-OS re-brand (thanks to Ryan Hoerr)

- Mage-OS brand logo and name changes (thanks to Kiel Pykett)

- Fixed Maestro Domestic CC detection pattern to prevent false positives (thanks to Ryan Hoerr)

- Increased the default max admin session size to 1 MB (thanks to Ryan Hoerr, and Maciej Tomaszewski and others involved on the upstream discussions)

- Faster category product count (thanks to Damien Retzinger, and Vincent Enjalbert who created the original upstream PR)

Huge thank you to everyone that has contributed to the Mage-OS infrastructure, tests, actions, and more to get us here, including:

- Vinai Kopp

- Damien Retzinger

- Daniel Sloof

- Adam Crossland

- Tjitse Efdé

- Gowri Sankar

- Vitaliy Golomozy

- David Lambauer

- Simon Sprankel

- Kamlesh Luhana

- Kiel Pykett

- Christian Münch

- Fabian Schmengler

- Vladyslav Podorozhnyi

- and so many more

## What's Next?

### Our Vision for Mage-OS

The Mage-OS Distribution is an upstream compatible metapackage based on Magento Open Source. Think of it as an independent version of Magento—based on Magento source code, but including additional changes specific to Mage-OS.

The purpose of the Mage-OS core distribution is to provide

- Improved decoupling of packages

- Improved developer experience while working with the product

- Improved developer experience while contributing to the product

- Full compatibility with Magento extensions

- Focus on additional security

- Reduced infrastructure stack dependencies

- Low-level code improvements, for example in the areas of code generation and caching

- Removal of most bundled extensions contained in upstream (they can still be independently installed if desired)

- A simple documented migration path to Magento Open Source or Adobe Commerce

Mage-OS Distribution releases are made independently of upstream releases. This enables us to move faster when desired, for example when enabling compatibility with new PHP versions.

New functional features will be introduced through independently installable modules. This follows the same decoupling approach that Adobe Commerce is using, allowing for a more stable core and an independent feature module release schedule.

The goal of the reduced infrastructure stack dependencies is to enable new developers to be onboarded more easily. The goal is to be able to use a plain XAMPP stack on any machine, including Windows, to run and develop with Mage-OS. This requires making Elasticsearch optional, as well as ensuring services like Redis, RabbitMQ, Node.js and such remain optional.

Mage-OS will also maintain backwards compatibility and the ability to migrate upstream at multiple levels:

- Compatibility with third-party extensions

- Database level compatibility (data and schema)

- API stability

All of our work on [creating custom releases based on Magento](https://github.com/mage-os/generate-mirror-repo-js) is open source, meaning:

1. Mage-OS builds can be independently built and verified, and are fully reproducible;

3. If you want to create your own fork and version of Magento or Mage-OS, you can do that too.

### Up Next: Mage-OS Flavored Distributions

Soon, we will be working toward producing different 'flavors' of Mage-OS. These flavors will be different bundles of Mage-OS packages, for specific purposes. For example:

- The Mage-OS headless distribution might contain no storefront theme

- The Mage-OS minimal distribution might contain only a minimal set of packages to enable building lightweight applications

- The Mage-OS headful distribution might contain no GraphQL packages

Fundamentally these will be the same Mage-OS/Magento you've come to know and love, but without features that don't apply to a given use case -- and maybe with additional features that use case uniquely benefits from. In the process, Mage-OS will become more performant, more flexible, and appeal to an even broader market.

Our goal is also to allow others to create their own 'distributions as 'flavored' distributions too.

## Contribute

Are you interested in contributing to Mage-OS, or have a bug or improvement you'd like to make? We're open for pull requests now at [https://github.com/mage-os/mageos-magento2](https://github.com/mage-os/mageos-magento2)!

If you have a bigger project in mind, please [join Discord](http://chat.mage-os.org) and summarize your idea in #discussions. We'd be delighted to hear from you, and help figure out how your idea best fits into Mage-OS!

That's all for now!
