---
title: "Mage-OS WidgetKit: A More Mature Page Builder Experience"
publishDate: "2026-04-23T00:00:00.000Z"
category: "Initiatives"
author: "davide-lunardon"
draft: false
excerpt: "Mage-OS WidgetKit delivers a more refined and reliable Page Builder experience, with prebuilt Hyvä-compatible widgets, accurate live previews, and tighter integration with the wider Page Builder suite."
image: "~/assets/images/blog/2026/davide-page-builder-widgetkit.jpg"
---

[**Mage-OS WidgetKit**](https://github.com/mage-os-lab/module-widgetkit) is a suite of ready-to-use CMS widgets for Magento's Page Builder, built from the ground up to work with the [Hyvä](https://www.hyva.io/) frontend theme. After more than a year of steady development, it has grown into a mature toolkit for building and managing Page Builder content.

This is the result of work led by [Davide Lunardon](https://github.com/dadolun95), with valuable contributions from Samuele Martini, Yuriy Boyko, and Luca Fuser, and ongoing support from the broader community. It reflects months of iterative development driven by real-world needs — the goal has been consistent from the beginning: to improve how content is created and managed in Magento without increasing complexity for developers or editors.

## A practical evolution of Page Builder

Magento's Page Builder has always been a powerful tool, but extending it often required significant effort, especially when building custom components or trying to achieve accurate previews.

WidgetKit changes that dynamic. Widgets are developed with previews that are directly tied to the frontend output — what you see during editing is much closer to what users will actually experience. This reduces guesswork and removes the need for duplicated logic between backend previews and frontend rendering.

The development process becomes more straightforward as a result. Instead of building complex abstractions, developers can focus on frontend implementation and reuse it consistently.

## More flexibility where it matters

Another area of improvement is configuration. Through the companion [Mage-OS AdvancedWidget](https://github.com/mage-os-lab/module-advanced-widget) module, widgets are no longer constrained to simple inputs. Teams can define structured and reusable configurations, including repeatable fields, media inputs, and product selections.

This has a direct impact on how content teams work. Instead of requesting frequent developer intervention, editors can compose richer layouts and reuse them across pages with greater autonomy.

## Moving content between environments

One of the recurring challenges in Magento projects is moving Page Builder content between environments. The suite addresses that through the [`module-pagebuilder-template-import-export`](https://github.com/mage-os/module-pagebuilder-template-import-export) module.

With import and export capabilities for templates and CMS blocks, teams can move content from development to staging and production in a controlled and predictable way. This reduces friction in deployment workflows and improves consistency across environments.

## Ready-to-use components

WidgetKit ships a set of prebuilt widgets designed to work out-of-the-box with Hyvä:

- **Slideshow** — the original widget
- **Slider** — content carousel for images, videos, or custom HTML
- **Product slider** — a product-aware carousel
- **Grid** — a flexible content grid
- **Product grid** — a product-focused companion to the content grid

Each widget uses [twind](https://twind.dev/) to compile Tailwind classes at preview time and resolves Alpine.js bindings inside the admin stage, so previews behave like real Hyvä components rather than stripped-down placeholders. A short walkthrough is available on [YouTube](https://www.youtube.com/watch?v=Bv7WBvgK6Wk).

## Installation

WidgetKit requires Hyvä and PHP 8.1 or newer. Install via Composer:

```bash
composer require mage-os/module-widgetkit
bin/magento module:enable MageOS_Widgetkit
bin/magento setup:upgrade
```

The complementary modules — PageBuilderWidget, AdvancedWidget, and PageBuilder Template Import/Export — can be installed independently depending on the capabilities you need.

## Documentation and ongoing work

Comprehensive documentation for the Page Builder suite is available and continuously evolving:
[dadolun95.github.io/mage-os-pagebuilder-suite](https://dadolun95.github.io/mage-os-pagebuilder-suite)

The documentation is automatically generated and will continue to improve with community feedback and contributions. It covers the full suite, including WidgetKit and related modules.

## Community driven development

The suite reflects a focused effort led by Davide Lunardon, who not only initiated the project but also shaped its direction around real developer and merchant needs — a system that prioritizes usability, extensibility, and alignment with modern frontend workflows.

Contributions from Samuele Martini, Yuriy Boyko, and Luca Fuser played a key role in refining implementation details, improving reliability, and validating the approach across different use cases. The broader Mage-OS community has ensured quality through code reviews, feedback loops, and structured release management.

The result is not just a feature set, but a shared baseline the community can build upon.

## Closing thoughts

Mage-OS WidgetKit represents a shift toward a more usable and maintainable Page Builder experience. It simplifies development, improves editorial workflows, and introduces tools that make content more portable.

The project remains fully open source. Feedback, contributions, and real-world usage will continue to guide its direction.
