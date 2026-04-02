---
title: "Mage-OS March Update"
publishDate: "2026-04-01T00:00:00.000Z"
category: "Updates"
author: "mage-os-team"
draft: false
excerpt: "March was a focused and productive month for Mage-OS, marked by the release of versions 2.2 and 2.2.1..."
image: "~/assets/images/blog/2026/mage-os-march-blog-2.jpg"
---

March was a productive month for Mage-OS, with a focus on releases, infrastructure improvements, and continued ecosystem growth.

## **Community Discussion: AI and the Future of Software Development**

AI is rapidly reshaping how software is built, maintained, and scaled. This shift is increasingly visible within the Magento ecosystem, raising important questions about its long term impact.

Topics under discussion include:

- The potential impact of AI on jobs within the Magento ecosystem
- Whether AI reduces opportunities or increases competitiveness
- The role of broader market evolution vs AI itself
- How the community can actively influence future developments

To provide a space for these discussions, an open community session is being organized. Join us on [discord](https://discord.gg/jYHNhYY2u?event=1486727731805946036)!

[![AI and the Future of Software Development](blob:https://mage-os.org/76bad5e1-906a-468b-b4ad-c098221a9200 "AI and the Future of Software Development")](https://www.linkedin.com/events/7442933600414519296?viewAsMember=true)

## **Mage-OS 2.2 and 2.2.1 Released**

We released Mage-OS 2.2, based on the latest Magento security patch (2.4.8-p4). This version includes important upstream security updates along with ongoing Mage-OS improvements. Shortly after, version 2.2.1 was released to address several issues, including a reCAPTCHA bug affecting checkout payments, a GraphQL issue, and a polyfill-related security vulnerability. If you have not upgraded yet, updating is strongly recommended.

## **Progress Toward Mage-OS 3.0**

Work is underway on Mage-OS 3.0, currently targeted for mid May in alignment with the expected Magento 2.4.9 release. The scope is being finalized, and contributions are welcome. This is the right time to propose modules, fixes, or enhancements for inclusion. You can track progress on the[ milestone](https://github.com/mage-os/generate-mirror-repo-js/milestone/2) and join the discussion in[ Mage-OS Lab](https://github.com/orgs/mage-os-lab/discussions).

## **We hired Marcel Martinez as Release Manager**

To improve release consistency and reliability, [Marcel Martinez](https://www.linkedin.com/in/marcelmart/) joined as dedicated Release Manager.  Marcel has already been hard at work getting the nightly builds back on track, fixing CI issues, and making sure the release pipeline runs smoothly. Having a dedicated person on this means faster turnaround on security patches and more confidence in every release we put out.

## **New Mage-OS website**

You may have noticed: Thanks to [Ryan Hoerr](https://www.linkedin.com/in/rhoerr/), [mage-os.org](http://mage-os.org) got a fresh new look! The new website went live in February and gives the project a more polished and welcoming home. The code is open source, so if you spot something that could be improved, pull requests are welcome. We're continuing to improve it and working on getting installation options, devdocs, and other resources more prominently documented there as well.

## **Hackathon**

In February, we held another online hackathon. Herve submitted PRs for a Playwright end-to-end test suite for Mage-OS core, Samuele built a new open source RMA module and fixed up the GeoIP module, Ryan improved the catalog-data-ai module, Vinai contributed to the Elgentos Magento 2 dev MCP server, and Damien built a JS profile viewer for xdebug cachegrind files. We're planning more hackathons throughout the year, so keep an eye on our socials for the next date.

## **David's talk to the Magento Association**

The Magento Association holds a Townhall meeting every quarter. This time our vice president David Lambauer joined us to give a presentation about the current state of Mage-OS and how the broader Magento ecosystem can work together going forward. The Association also has an open call for maintainers - if you're interested in helping process Magento contributions, applications are open now.

## Tech News

#### **Testing & CI Improvements**

Significant progress has been made on the Playwright E2E test suite, with around 100 tests currently passing locally. Work is ongoing to stabilize CI integration via GitHub Actions and expand coverage (checkout, cart, and dynamic pricing scenarios). The current direction is to consolidate existing testing efforts rather than duplicate them.

#### **Installer Enhancements**

The Mage-OS installer now supports both DDEV and Warden environments. Initial automated tests have been added to validate setup, CLI functionality, and HTTP availability. Further improvements are planned, including broader test coverage and optional installation configurations.

#### **Ecosystem and Visibility Improvements**

Mage-OS is now detectable via Wappalyzer (HTTPArchive fork) and BuiltWith. This increases visibility and allows better tracking of adoption across the ecosystem.

#### **Ongoing Lab Development**

Mage-OS Lab continues to expand with several notable modules:

- Admin Activity Log for backend tracking (ongoing improvements and PRs under review)
- Open-source RMA module supporting EU requirements
- Page Builder enhancements with previews and translation support
- Advanced Widget & WidgetKit packages
- Passkey authentication module for passwordless login

These modules are actively being tested and may be candidates for inclusion in future core releases.

#### **New Tooling Initiatives**

Work has started on a Magento-specific Language Server Protocol (LSP) server. It provides improved developer experience through autocompletion, navigation between Magento components (XML, layouts, templates), and awareness of platform-specific concepts. An MCP integration is included to support AI-assisted workflows. The project may be promoted from Labs to a core repository pending feedback.

Additionally, Magento-focused snippets for the Zed editor have been introduced, aiming to improve developer productivity in alternative editor environments.

#### **Search & Performance Exploration**

Work is ongoing to integrate Meilisearch as an alternative search engine. A revised architecture using a dedicated controller and server-side rendering has been implemented to ensure compatibility with caching layers such as Varnish. The solution is already working with Hyvä, with Luma support in progress.

#### **Bug Investigations & Fixes**

Several issues are currently under investigation:

- A plugin interceptor/compiler issue causing silent failures in specific module combinations
- Checkout input validation gaps (e.g., missing trimming of whitespace)
Efforts are focused on isolating root causes and preparing fixes.

#### **Security Follow-up**

A previously identified security incident involving a reverse shell was investigated and resolved. The system has been verified as clean. This incident reinforced the importance of monitoring and validation in production environments.

#### **Community and Contributions**

Mage-OS is taking over maintenance of the Magento PHPStan integration to ensure continued support for this key developer tool. Contributors with experience in static analysis are encouraged to participate.

#### **Experimental AI Work**

A prototype AI-based product recommendation widget was introduced. It interprets user intent, maps it to catalog attributes, and returns structured product results. Additional validation layers are being implemented to ensure reliability and reduce incorrect outputs. Further testing on real catalogs is planned.

#### **Looking Ahead**

Preparations continue for upcoming community activities, including discussions around AI in software development and future hackathons. Collaboration efforts will focus on CI stabilization, test coverage expansion, and tooling improvements.

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
