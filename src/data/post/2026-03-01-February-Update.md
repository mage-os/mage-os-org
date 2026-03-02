---
title: "Mage-OS February Update"
publishDate: "2026-03-01T00:00:00.000Z"
category: "Updates"
author: "mage-os-team"
draft: false
excerpt: "February was an active month for Mage-OS, with important progress in development, testing, infrastructure, and community collaboration..."
image: "~/assets/images/blog/2026/mageos_blog_feb-2025-update.jpg"
---

February was an active month for Mage-OS, with important progress in development, testing, infrastructure, and community collaboration.

### New Release Manager

Please welcome [**Marcel Martinez**](https://www.linkedin.com/in/marcelmart/) as our new Release Manager. Marcel will coordinate releases, improve processes, and help ensure stability and consistency across future Mage-OS versions. This is an important step toward a more structured and predictable release cycle.

### New Website

A new Mage-OS website went live. It is based on a static site generator and replaces the previous WordPress setup. The [repository ](https://github.com/mage-os/mage-os-org)is public, and content can be edited directly via GitHub, supporting transparency and easier community contributions.

### 2nd Mage-OS Hackathon

On 13 February, we held our second Mage-OS Hackathon. Community members collaborated on several initiatives:

- Extension of the Mage-Check GitHub Action, including Mage-OS support and potential integration of PHPStan and additional static analysis tools.
- Work on Playwright testing and CI integration.
- Progress on a JavaScript optimizer and RequireJS-related improvements.
- Development of an open source RMA (Return Merchandise Authorization) module, providing built-in return management functionality for merchants.
- Initial ideas for a simplified Mage-OS installer that can auto-detect environments such as DDEV or Warden and guide users through setup.

The hackathon showed strong collaboration and delivered practical improvements to the ecosystem.

### Playwright Testing Progress

Significant work was done on integrating Playwright end-to-end tests into Mage-OS.

- Around two-thirds of the existing Elgentos Playwright test suite are currently passing.
- A CI workflow was prepared to execute Playwright tests directly within the Mage-OS repository.
- Key challenges include differences between Mage-OS and Adobe Commerce (especially in the Admin UI), as well as dependencies on themes, sample data, and checkout implementations.
- It was discussed that a fork or Mage-OS–specific adaptation of the test suite is likely necessary.
- An alternative modular Playwright architecture was introduced, separating base tests, theme tests, and checkout tests, and supporting multiple locales and checkout variations.

The goal is to achieve reliable end-to-end coverage that fits Mage-OS requirements.

### Development Environment Improvements

A new GitHub Codespaces based development container was presented. The goal is to simplify local development and reduce setup friction.

Key characteristics:

- Support for multiple Magento versions.
- Alpine-based images with daily builds.
- Preconfigured tools such as Xdebug and common developer utilities.
- VS Code integration.
- Designed as a maintainable alternative to older Docker-based setups.

This approach aims to standardize development environments and lower the entry barrier for contributors.

### Design System Update

The Mage-OS design system was updated to version 1.1.0. The UI now aligns more closely with Google Material guidelines, with improved consistency in layout, spacing, and interaction behavior. Several component-level refinements were introduced to improve visual alignment and usability.

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
