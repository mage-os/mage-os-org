---
title: "Mage-OS April Update"
publishDate: "2026-05-01T00:00:00.000Z"
category: "Updates"
author: "mage-os-team"
draft: false
excerpt: "April was shaped by growing adoption of AI in Magento and MageOS development, alongside steady progress toward the MageOS 3.0 release. The community focused on balancing productivity gains with security, stability, and maintainability."
image: "~/assets/images/blog/2026/mage-os-april-blog.jpg"
---

## MageOS April Update

April’s main highlight was the recent AI session, which led to a broad and practical discussion about how artificial intelligence is influencing Magento and MageOS development.

The session confirmed that AI tools are becoming part of everyday development workflows. They help developers generate code faster, explore unfamiliar areas of the codebase, and automate routine tasks. At the same time, the role of developers is shifting more toward reviewing and validating output rather than writing everything manually.

Magento’s structured architecture and strong documentation work well with AI tools, which leads to relatively reliable results. However, there are still open questions, especially around how junior developers should use AI and how to maintain code quality over time. One clear takeaway is that human oversight remains essential, AI can assist, but responsibility stays with the developer.

Security was also a key topic. With more automation and external tools, risks in dependency management and generated code are increasing. The community is leaning toward stricter practices, such as pinning exact dependency versions, even if that means more maintenance.

### General Development Updates

Work on the Magento LSP server is progressing. The package has already been published on npm and submitted to additional marketplaces. Broader availability across development environments is expected soon, which should improve the overall developer experience.

At the same time, there is increased awareness of supply chain risks and social engineering attacks, which ties back into the stronger focus on security practices.

### Module Updates

Several modules made progress during April.

The Varnish Extended Module has been tested in multiple scenarios and is now approved for merge. The Custom Admin Logo feature has been implemented and tested successfully and is currently in a short feedback phase before final integration.

Other modules are nearing production readiness. The Admin Activity Log (2.0 RC1) includes improved exception handling and is considered stable, but still requires broader testing. The RMA module received a security improvement by adding proper MIME type validation for file uploads. In addition, a bug in the Theme Optimization module related to cache headers has been resolved.

Some areas still need attention. The Catalog Data AI module is currently unmaintained and requires contributors to review and organize existing pull requests.

### MageOS 3.0 Release

The MageOS 3.0 release is approaching and is expected within the next few weeks. It will be based on Magento 2.4.9 and require PHP 8.3 or higher.

The focus of this release is on compatibility, stability, and maintenance rather than introducing major new features. A separate security update (MageOS 2.3) is also planned alongside it.

### Performance and Benchmarking

Performance testing is an active topic. Initial benchmarking comparing Magento and MageOS shows promising results, especially for uncached performance.

However, there is currently no standardized approach to performance testing. The next step is to define shared testing standards and potentially provide benchmarking tools for the community.

### Minimal Package Initiative

The minimal package effort continues, with the system now reduced to around 150 packages. While this has not yet resulted in measurable performance improvements, it simplifies the overall structure and supports future development efforts, especially around decoupling.

### Installer Project

The MageOS installer is nearly complete and ready for broader testing. Feedback is especially requested from users working with Warden setups. This will help ensure stability and usability before the official release.

### Powered by Strong Partnerships

We are proud to collaborate with industry leaders who believe in open source and help accelerate the Mage-OS ecosystem.

#### Gold Partners

<div class="not-prose" style="max-width: 140px;">

[![MDOQ](https://mage-os.org/_astro/image-1-1024x1024.NIMfNPuV_nB3oK.webp)](https://opencollective.com/mdoq)

</div>

#### Silver Partners

<div class="not-prose" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; align-items: center;">

<div>

[![ParadoxLabs](https://mage-os.org/_astro/image-2.D_u1eXG2_Z2rJvmm.webp)](https://opencollective.com/paradoxlabs)

</div>

<div>

[![Vendic](~/assets/images/blog/2026/image-5-1024x1008.png)](https://opencollective.com/vendic)

</div>

<div>

[![Hyvä](https://mage-os.org/_astro/image-6.Dx4acMHc_ZxUYjO.webp)](https://opencollective.com/hyva-themes)

</div>

<div>

[![Inchoo](https://mage-os.org/_astro/image-7-1024x1024.NaJD7DMt_12hOM7.webp)](https://opencollective.com/inchoo)

</div>

</div>

#### Bronze Partners

<div class="not-prose" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; align-items: center;">

<div>

[![JetRails](https://mage-os.org/_astro/image-8.D6K3zNZg_Z1PONGI.webp)](https://opencollective.com/jetrails)

</div>

<div>

[![Develo](https://mage-os.org/_astro/image-9.CXJtEzF__1tlU8r.webp)](https://opencollective.com/develo)

</div>

<div>

[![FindCanary](https://mage-os.org/_astro/image-10.B-7DFoGZ_UsgfC.webp)](https://opencollective.com/canary)

</div>

<div>

[![integer_net](https://mage-os.org/_astro/image-11.uDHWm4v9_Z2jQqIt.webp)](https://opencollective.com/integer_net)

</div>

<div>

[![JH](https://mage-os.org/_astro/image-12.C71asHZQ_14DMgh.webp)](https://opencollective.com/wearejh)

</div>

</div>

**Why Partner With Us?**

Becoming a Mage-OS partner means more than visibility. It means shaping the future of open source commerce, gaining early insights into technical developments, and showcasing your brand to a global audience of merchants, developers, and agencies.

[Learn more about partnership opportunities](https://mage-os.org/community/partners)
