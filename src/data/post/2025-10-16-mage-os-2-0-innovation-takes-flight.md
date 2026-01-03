---
title: "Mage-OS 2.0: Innovation Takes Flight"
publishDate: "2025-10-16T00:00:00.000Z"
category: "Releases"
author: "Mage-OS Team"
draft: false
excerpt: "We are excited to announce the release of Mage-OS Distribution 2.0, a major milestone that shows the power of community-driven innovation. This release..."
tags:
  - "Updates"
image: "~/assets/images/blog/2025/mage-os-2.0-scaled.png"
---

We are excited to announce the release of **Mage-OS Distribution 2.0**, a major milestone that shows the power of community-driven innovation. This release represents a significant step forward in Mage-OS's commitment to advancing open-source e-commerce.

## Our Foundation

Mage-OS 2.0 builds on **Magento Open Source 2.4.8-p3**, including all the latest security fixes and platform improvements from the upstream release. This ensures that our distribution maintains the solid foundation that hundreds of thousands of developers and merchants worldwide depend on, while adding the improvements that make Mage-OS special.​

### See recommended software versions

| **Component** | **Recommended Version** |
| --- | --- |
| Composer | 2.8 |
| OpenSearch | 2.19 |
| MariaDB | 11.4 |
| MySQL | 8.4 |
| PHP | 8.4/8.3 |
| RabbitMQ | 4 |
| Redis | Valkey 8 (or Redis 7.2+) |
| Varnish | 7.6 |
| Apache | 2.4 |
| nginx | 1.26 |

## Version and Support Policy

We adopted a new versioning policy, starting with Mage-OS 1.2 in June. This is our first major update.

- **#.0.0** **Major Updates**
    - 2x per year, around April/May and October.
    
    - These may include new features, useful bundled extensions, significant changes, or changes to system requirements like PHP versions.
    
    - They should stay mostly compatible with Magento and existing extensions, allowing you to easily switch between Mage-OS and Magento.

- **2.#.0 Minor Updates**
    - Any Magento release or security patch between a feature release will become a Mage-OS minor version update, unless there is a change in system requirements.
    
    - These should be compatible with existing installations.​

- **2.0.# Patch Updates**
    - Small but critical off-schedule fixes to a Mage-OS release. These should be rare.​

This reflects our plan for more rapid releases and innovation, and lets everyone know and plan for updates in advance.

Adobe announced plans to release security patches on the second Tuesday of each month in 2026. Mage-OS will publish an update each time with the latest security patches included.

As a mostly-volunteer-run nonprofit, our resources are limited. As such, for now, Mage-OS will only support the latest release branch at a time. You must stay up to date with the latest Mage-OS release to stay secure.

## The [Mage-OS Lab](https://github.com/mage-os-lab): Where Innovation Develops

One of the most exciting aspects of Mage-OS 2.0 is that **we've graduated multiple Mage-OS Lab modules** into the core distribution. The [Mage-OS Lab](https://github.com/mage-os-lab) is our innovation space, where we welcome everyone in the community to experiment, improve, and perfect new ideas and improvements for the Magento ecosystem.

The Lab represents our future of open-source Magento: **collaborative, experimental, and community-driven**. It's where new ideas are tested, improved, and ultimately brought to life for the benefit of the entire ecosystem.

These modules represent months of dedicated work by talented developers who believe in pushing the platform forward.

## New Features

### Enhanced Security with PCI DSS 4.0 Compliance

Mage-OS 2.0 bundles the **aligent/magento2-pci-4-compatibility** module, which updates default admin policies for PCI DSS 4.0 requirements. This includes:​

- **Automatic account deactivation** after 90 days of inactivity

- **Enhanced session security** with 15-minute idle timeout enforcement

- **Strengthened authentication** with improved lockout policies

- **More strict password requirements** with 12-character minimum length and complexity rules

### AI-Powered Automatic Translation

The **Automatic Translation module** changes how merchants expand globally. This powerful tool uses AI services from DeepL, OpenAI, or Google Gemini to provide:

- **Product catalog translation** with support for both text and select/multiselect attributes

- **Automated cron-based translation workflows** for hands-off operation

- **Manual translation controls** for categories, CMS pages, and static blocks

- **Intelligent retranslation prevention** that respects manual edits while adapting to source changes

Use of AI translation requires a separate AI service account and API key, and will involve costs by usage.

### Advanced Inventory Management

The new **Inventory Reservations Grid** brings better visibility to your inventory management, allowing you to directly see and manage stock reservations in Magento's inventory system.

### SEO Tuning Made Simple

The **Meta Robots Tag module** gives you detailed control over search engine indexing. With three new attributes in the "Search Engine Optimization" section of products, categories, and CMS pages, you can fine-tune your NOINDEX, NOFOLLOW, and NOARCHIVE tags page by page.

### Page Builder Enhancements

Two powerful Page Builder enhancements from Mage-OS Lab are now part of Mage-OS 2:

#### **Embedded Widgets**

**Page Builder Widgets** adds "CMS Widget" support directly into Page Builder, including previews of the widget output. This can be used anywhere Page Builder is supported, including pages, blocks, and content descriptions.

#### Import/Export and Remote Sync

**PageBuilder Template Import/Export** enables Page Builder templates to be easily shared between Magento instances. This module supports both local file transfers and cloud-based Dropbox integration for template management workflows across multiple websites or instances.

### Performance Optimization

The **Theme Optimization module** delivers better user experience based on the latest browser features:

- **Back/Forward Cache (bfcache) support** gives almost instant browser navigation backwards/forwards on cacheable pages

- **Speculative preloading** intelligently preloads links before the user clicks them

- **Smooth page transitions** create a premium user experience

All of these combine to give a smoother experience and better Core Web Vitals than without.

## Core Platform Improvements

Beyond the new modules, Mage-OS 2.0 includes several important platform improvements developed by our community:

### GitHub Pull Request Contributions

Several key contributions from the community have been integrated:

- **Admin Dashboard JavaScript Fix** (#164): Ryan Hoerr resolved a JavaScript error that could occur on admin login.​

- **Config Load Safety Check** (#167): ProxiBlue added a config safety check to better handle missing config `id` values.​

- **Configurable Product Export Fix** (#169): Ryan Hoerr fixed product export issues for configurable products with multiple super attributes.

- ​**PHP 8.4 Compatibility** (#157): aelmizeb fixed PHP 8.4 deprecation errors on compilation.​

- **USPS API Migration** (#170): We added Magento patch AC-15210 for support of the USPS REST API. USPS will be turning off the legacy Web Services API on January 26, 2026.

## Celebrating Our Community

Mage-OS wouldn't exist without the support of our growing community. We extend our thanks to our **172 financial contributors** who have collectively contributed over **€106,000** to fund this mission since 2022. This has gotten us where we are today, but every bit more will help us to do more faster. Please add your support and help us do something great!

### Our Partner Ecosystem

**Gold Partners** (€10,000/year):

- MDOQ - Leading the way with €20,000 in total contributions

- Interactiv4 - Our first Gold Partner with €10,000 contributed

**Silver Partners** (€4,000/year):

- ParadoxLabs

- Hyvä Themes

- Vendic

- Inchoo

- Mollie

- WilMa Digital

**Bronze Partners** (€1,250/year):

- JetRails, Develo, FindCanary, JH, integer\_net, and basecom

We also celebrate our **81 Community Members and 67 Professional Members** who power the grassroots support that makes everything possible.

## Special Recognition

Thank you to the people who made Mage-OS 2.0 possible:

- **Davide Lunardon, Luca Fuser, and Samuele Martini** for the Automatic Translation and PageBuilder modules​

- **Ryan Hoerr, **Oliver Jaufmann/**JaJuMa GmbH******, ****Sean van Zuidam, and** David Lambauer** for the Theme Optimization module​

- **The Aligent team** for their PCI 4.0 Compatibility module​

- **Ryan Hoerr and Fabrizio Balliano** for multiple platform fixes and release management

- **ProxiBlue and aelmizeb** for their platform improvements​

And to the many more that participated, tested, commented, worked in Mage-OS Lab, or otherwise supported our efforts.

## Join the Community

**Do you want to be part of the future of e-commerce?**

The success of Mage-OS depends on community support and involvement. Whether you're a developer, merchant, agency, or technology partner, we need you.

**For Individuals**

- **Community Member**: €10/year - Show your support and get voting rights

- **Professional Member**: €100/year - For those making a living with the platform

**For Businesses**

- **Bronze Partner**: €1,250/year - Perfect for small companies

- **Silver Partner**: €4,000/year - Includes logo placement on Mage-OS.org

- **Gold Partner**: €10,000/year - Premium visibility and partnership benefits

- **Platinum Partner**: €25,000/year - Be the first! Maximum impact and recognition

**Become a sponsor today:** [**mage-os.org/about/mage-os-membership**](/?page_id=384)

### **Get Involved in Development**

Join our **weekly tech meetings** every Tuesday at 3 PM CET on Discord. Contribute to the Mage-OS Lab, submit pull requests, or share your ideas with the community.​

Repository: [github.com/mage-os/mageos-magento2](https://github.com/mage-os/mageos-magento2)  
Lab Projects: [github.com/mage-os-lab​](https://github.com/mage-os-lab)  
Community Chat: [chat.mage-os.org](https://discord.com/invite/nvZDVA2NdC)

If you have an Open Source module you are interested in including or contributing, get in touch!

## Installing Mage-OS 2.0

Ready to experience the future? Create a new Mage-OS project with:

```
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition .
```

### **Upgrading from Magento**

You can convert from Magento to Mage-OS with one line (sort of):

```
composer config repositories.0 composer https://repo.mage-os.org/ &&
composer require mage-os/product-community-edition --no-update &&
composer remove magento/product-community-edition magento/composer-dependency-version-audit-plugin magento/composer-root-update-plugin --no-update &&
composer update --no-plugins --with-all-dependencies
```

We recommend updating to the latest available Magento version before switching to Mage-OS, to make the process as smooth as possible.

## The Future

Mage-OS 2.0 represents more than just a software release, it's proof that **community-driven innovation works**. Every module that graduated from the Lab, every security enhancement, and every performance improvement exists because dedicated developers and forward-thinking businesses chose to invest in the future of open-source e-commerce.

This is just the beginning. With your support, Mage-OS will continue to evolve, innovate, and lead the way toward a more accessible, powerful, and community-controlled e-commerce future.

**Welcome to Mage-OS 2.0. Welcome to the future of e-commerce.**

* * *

_For complete installation instructions and technical details, visit [devdocs.mage-os.org](https://devdocs.mage-os.org/). Join our community discussions on [Discord](http://chat.mage-os.org), and follow our progress on [GitHub](https://github.com/mage-os)._
