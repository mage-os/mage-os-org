---
title: "Mage-OS October Update"
publishDate: "2025-10-31T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "Happy Halloween, developers and merchants! 👻      While others are out hunting for candy, the Mage-OS community has been serving up something even sweeter,..."
image: "~/assets/images/blog/2025/ChatGPT-Image-31.-Okt.-2025-15_31_29.png"
---

### **🎃 A Halloween Recap of October’s Highlights** **🎃**

### Mage-OS 2.0 Has Arrived

Happy Halloween, developers and merchants! 👻  
  
While others are out hunting for candy, the Mage-OS community has been serving up something even sweeter, the **official release of Mage-OS 2.0**.

After months of work, testing, and collaboration, Mage-OS 2.0 marks a major milestone in the evolution of open commerce. This release focuses on stability, modular flexibility, and performance, setting the foundation for everything coming next.

You can install Mage-OS 2.0 right now:

```
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition .
```

📄 [Release Notes](/?p=4914)  
💬 [LinkedIn Announcement](https://www.linkedin.com/feed/update/urn:li:activity:7384595764854951937/)

The release includes a wide range of enhancements, from streamlined frontend tooling to more robust CI workflows and new module capabilities. Community contributors across the world, developers, maintainers, and testers alike, made this milestone possible.

### Looking Ahead to Mage-OS 3

With version 2.0 now stable, the community is already setting its sights on **Mage-OS 3**. The next major release aims to further modernize the platform and explore intelligent, data-driven features.

Some early ideas include:

- **Agentic Commerce Protocol** - enabling more automated and adaptive commerce flows.

- **Admin Activity Logs** - for better transparency and auditing.

- **Basic Blog Module** - integrated publishing for merchants.

- **Catalog Data AI** - smarter product data management and enrichment.

- **LLMs.txt** - a proposed standard for AI-friendly site metadata.

There’s also discussion around a **base AI module**, which would provide configuration for API credentials, model selection, and integration hooks. This would make it easy to plug in different AI models for various features across Mage-OS. The idea will likely be developed further during an upcoming hackathon.

### Upcoming Events: Meet Magento Netherlands & Mage-OS Hackathon

The next big community event is just around the corner:  
**Meet Magento Netherlands** takes place on **November 6, 2025**, in Amsterdam.

The day before the conference (on **November 5**) Mage-OS Netherlands is hosting a **Mage-OS Hackathon** at **Bold Commerce**, conveniently located near the main venue.

The hackathon will focus on real-world module development, collaborative experimentation, and testing new ideas for Mage-OS 3, including the proposed AI module framework and theme optimizations.

Spots are limited, so make sure to reserve yours here:  
👉 [Register for the Hackathon](https://www.eventbrite.com/e/pre-mm25nl-hackaton-tickets-1658933638169)

Expect a day of creative problem-solving, coding, and open discussion with Mage-OS maintainers and community contributors.

### Technical Updates and Progress

#### CMS Page Localization and SEO Improvements

**Davide Lunardon** introduced a new module enabling CMS pages to behave like products and categories across different websites and store views.  
This feature brings proper **hreflang** and **canonical** support for multilingual content, helping prevent duplicate pages while improving SEO linking between translations.

The system is functional and may soon expand to other entity types beyond CMS pages.

#### UI Kit Optimization and Meta-Packaging

A new **UI Kit meta-package** is in development, bundling the base theme with key optimization modules.  
This approach will simplify frontend development while maintaining modular flexibility and third-party compatibility.

#### GitHub Actions and Legacy Package Policy

**Ryan Hoerr** reported improvements to the **semantic version matrix** used in GitHub Actions.  
Older Composer 1 packages caused testing issues, the workflow now limits tests to supported versions.

The group agreed to **retain legacy packages** for historical completeness, even though they will no longer be tested. Future focus will include build time optimization.

#### GeoIP Redirect Module Update

**Sam** upgraded the **GeoIP Redirect** module to support **MaxMind v3**, ensuring full **PHP 8 compatibility**.  
It is now production-ready and will migrate from the **MageLab** namespace to **Mage-OS**.  
**Simon** and **Vinai** are coordinating this migration with **Terraform automation**.

#### Repository Organization and Discoverability

With the growing number of modules, the team discussed ways to make repositories easier to find.  
Options included GitHub “topics” for filtering and meta-repositories for experimental or bundled code.  
The group decided to **keep a unified organization structure** for now, focusing on simplicity.

### Documentation and Benchmarking

**David** is preparing a comprehensive update to **Mage-OS documentation**, which will include:

- Guides for configuring **bfcache (back-forward cache)** in Varnish using the Theme Optimization module.

- Documentation on new **Page Builder features** and developer best practices.

Additionally, **David Lambauer** will be exploring **performance benchmarks** comparing Mage-OS and Magento, potentially assisted by AI for metrics and insights.

### Infrastructure and Testing Improvements

- **Michiel** developed a new **“Magento-in-a-box” Docker environment** for integration testing on GitHub Actions.

- Standardized **GitHub Actions templates** are being designed for Mage-OS add-on modules, making it easier for developers to test and validate their code.

- The **demo environment** at [demo.mage-os.org](https://github.com/mage-os-lab/demo.mage-os.org) now resets automatically every 6 hours, ensuring consistent testing conditions.

### What’s Next

Mage-OS continues to evolve as a modern, open alternative for the Magento ecosystem, powered by collaboration, transparency, and innovation.

Upcoming priorities include:

- Advancing **CMS localization** and **UI Kit meta-packaging**.

- Refining **build performance** and repository structure.

- Expanding **Mage-OS documentation** and benchmarks.

- Driving innovation toward **Mage-OS 3** through community hackathons and experimental modules.

The journey toward Mage-OS 3 has already begun and it’s an exciting one!  
Join the conversation, contribute to the repositories, and help shape the future of open commerce.

## **Opportunities**

Mage-OS is built by the community, for the community. You can help by:

- Have a contribution idea or interested in the Mage-OS Distribution? Join our weekly tech meetings, public on [Discord](http://chat.mage-os.org/) at 3 PM CET / 2 PM UTC / 9 AM EST every Tuesday: chat.mage-os.org

- Contributing to modules, documentation, or the website

- Track open work on our [Technical Initiatives Board](https://tree.taiga.io/project/mage-os-mage-os-technical-initiatives/kanban)

- Or explore ideas in [Mage-OS Lab](https://github.com/mage-os-lab)

- Providing feedback on new features or release candidates

- Sharing your ideas in the Discord server or [GitHub](https://github.com/mage-os) discussions

- We’re looking for new features to enhance Mage-OS this year that will help to modernize and excite merchants. This might include AI enhancements, low/no code processes, or more. Talk to Vinai Kopp or #tech if you’re interested!

Whether you’re a developer, merchant, or just interested in open source, there’s always a way to get involved

## **Partners**

### **Powered by Strong Partnerships**

We are proud to collaborate with industry leaders who believe in open source and help accelerate the Mage-OS ecosystem. Their support makes our growth, innovation, and community-driven progress possible.

#### **Gold Partners**

[![](~/assets/images/blog/2025/image-1-1024x1024.png)](https://opencollective.com/mdoq)

[MDOQ](https://opencollective.com/mdoq)

#### **Silver Partners**

<figure>

[![](~/assets/images/blog/2025/image-2.png)](https://opencollective.com/paradoxlabs)

<figcaption>

[ParadoxLabs](https://opencollective.com/paradoxlabs)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-5-1024x1008.png)](https://opencollective.com/vendic)

<figcaption>

[Vendic](https://opencollective.com/vendic)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-6.png)](https://opencollective.com/hyva-themes)

<figcaption>

[Hyvä](https://opencollective.com/hyva-themes)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-7-1024x1024.png)](https://opencollective.com/inchoo)

<figcaption>

[Inchoo](https://opencollective.com/inchoo)

</figcaption>

</figure>

#### **Bronze Partners**

<figure>

[![](~/assets/images/blog/2025/image-8.png)](https://opencollective.com/jetrails)

<figcaption>

[JetRails](https://opencollective.com/jetrails)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-9.png)](https://opencollective.com/develo)

<figcaption>

[Develo](https://opencollective.com/develo)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-10.png)](https://opencollective.com/canary)

<figcaption>

[FindCanary](https://opencollective.com/canary)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-11.png)](https://opencollective.com/integer_net)

<figcaption>

[integer\_net](https://opencollective.com/integer_net)

</figcaption>

</figure>

<figure>

[![](~/assets/images/blog/2025/image-12.png)](https://opencollective.com/wearejh)

<figcaption>

[JH](https://opencollective.com/wearejh)

</figcaption>

</figure>

**Why Partner With Us?**

Becoming a Mage-OS partner means more than visibility. It means shaping the future of open source commerce, gaining early insights into technical developments, and showcasing your brand to a global audience of merchants, developers, and agencies.

[Learn more about partnership opportunities](/?page_id=384)
