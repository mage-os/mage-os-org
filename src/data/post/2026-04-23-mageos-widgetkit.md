---
title: "MageOS WidgetKit 1.3.0: A More Mature Page Builder Experience"
publishDate: "2026-04-23T00:00:00.000Z"
category: "Updates"
author: "davide-lunardon"
draft: false
excerpt: "MageOS WidgetKit 1.3.0 introduces a more refined and reliable page builder experience, delivering improved stability, enhanced flexibility, and new features that streamline content creation for developers and store owners alike."
image: "~/assets/images/blog/2026/New-Mage-OS-Website.png"
tags:
  - "Community"
  - "Page Builder"
---

The MageOS community is introducing [**MageOS_WidgetKit 1.3.0**](https://www.linkedin.com/posts/davide-lunardon-b78813a1_community-mageos-magento-activity-7436680455027998720-c--e/), a release that can reasonably be considered the first stable and production ready version of the module. This milestone is the result of the work led by [Davide Lunardon](https://www.linkedin.com/in/davide-lunardon-b78813a1?miniProfileUrn=urn%3Ali%3Afsd_profile%3AACoAABWn28wBoeCdysd3NwSi8RMpNTWJxKTofjg&lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BqtqgMhoiSVK2xVUmX2u3CA%3D%3D), with valuable contributions from [Samuele Martini](https://www.linkedin.com/in/samuele-martini-02820795/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BqtqgMhoiSVK2xVUmX2u3CA%3D%3D), [Yuriy Boyko](https://www.linkedin.com/in/yuriy-boyko-2463a6115/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BqtqgMhoiSVK2xVUmX2u3CA%3D%3D), and [Luca Fuser](https://www.linkedin.com/in/luca-alessio-fuser/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BqtqgMhoiSVK2xVUmX2u3CA%3D%3D), and ongoing support from the broader community.

This update reflects several months of iterative work driven by real world needs. The goal has been consistent from the beginning, to improve how content is created and managed in Magento without increasing complexity for developers or editors.

## **A practical evolution of Page Builder**

Magento's Page Builder has always been a powerful tool, but extending it often required significant effort, especially when building custom components or trying to achieve accurate previews.

WidgetKit changes that dynamic. With this version, widgets can be developed with previews that are directly tied to the frontend output. What you see during editing is much closer to what users will actually experience. This reduces guesswork and removes the need for duplicated logic between backend previews and frontend rendering.

The development process becomes more straightforward as a result. Instead of building complex abstractions, developers can focus on frontend implementation and reuse it consistently.

## **More flexibility where it matters**

Another area of improvement is configuration. Widgets are no longer constrained to simple inputs. It is now possible to define more structured and reusable configurations, including repeatable fields, media inputs, and product selections.

This has a direct impact on how content teams work. Instead of requesting frequent developer intervention, editors can compose richer layouts and reuse them across pages with greater autonomy.

## **Moving content between environments**

One of the recurring challenges in Magento projects is moving Page Builder content between environments. This release addresses that through integration with the [`module-pagebuilder-template-import-export`](https://github.com/mage-os/module-pagebuilder-template-import-export) module.

With import and export capabilities for templates and CMS blocks, teams can move content from development to staging and production in a controlled and predictable way. This reduces friction in deployment workflows and improves consistency across environments.

## **A foundation for developers**

Behind the scenes, WidgetKit introduces a lightweight structure for building widget previews. It functions as a small framework that standardizes how previews are defined and rendered.

The intention is not to add abstraction for its own sake, but to remove repetition and make extensions easier to maintain. Developers can adopt it incrementally and adapt it to their own workflows.

## **Ready-to-use components**

The suite also includes a set of prebuilt widgets designed to work out of the box, including compatibility with modern frontend approaches such as Hyvä. These serve both as usable components and as reference implementations for further customization.

## **Documentation and ongoing work**

Comprehensive documentation for the Page Builder suite is already available and continuously evolving. You can access it here:
[https://dadolun95.github.io/mage-os-pagebuilder-suite](https://dadolun95.github.io/mage-os-pagebuilder-suite)

The documentation is automatically generated and will continue to improve with community feedback and contributions. It covers the full suite, including WidgetKit and related modules.

## **Community driven development**

This release reflects a focused effort led by Davide Lunardon, who not only initiated the Page Builder suite but also shaped its direction around real developer and merchant needs. His work established a practical foundation. A system that prioritizes usability, extensibility, and alignment with modern frontend workflows.

Contributions from Samuele Martini, Yuriy Boyko, and Luca Fuser played a key role in refining implementation details, improving reliability, and validating the approach across different use cases. At the same time, the broader MageOS community ensured quality through code reviews, feedback loops, and structured release management.

The result is not just a feature set, but a shared baseline the community can now build upon.

## **Closing thoughts**

MageOS_WidgetKit 1.3.0 represents a shift toward a more usable and maintainable Page Builder experience. It simplifies development, improves editorial workflows, and introduces tools that make content more portable.

The project remains fully open source. Feedback, contributions, and real world usage will continue to guide its direction.

