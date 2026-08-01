---
title: "Mage-OS July Update"
publishDate: "2026-08-01T00:00:00.000Z"
category: "Updates"
author: "mage-os-team"
draft: false
excerpt: "July was a busy month for Mage-OS, with the release of Mage-OS 3.2.0, continued progress on SEO and AI tooling, new community modules, FrankenPHP Worker Mode testing, and improvements across the wider Mage-OS ecosystem."
image: "~/assets/images/blog/2026/mageos_blog_july-update.jpg"
---

# Mage-OS Monthly Update – July 2026

July was a busy month across the Mage-OS project. We shipped an important security release, continued work on developer and AI tooling, saw progress across several community modules, and explored improvements to the way Mage-OS itself is built and maintained.

Here's what happened this month.

## Mage-OS 3.2.0 Released

The biggest release of the month was **Mage-OS 3.2.0**, published shortly after Adobe released its July security patches.

Mage-OS 3.2.0 incorporates the security fixes from Magento Open Source 2.4.9, including fixes addressing guest cart takeover, stored XSS through inline translation, a template-injection sanitizer bypass, disabled-product disclosure through GraphQL, and customer-address media handling.

The release also fixes an issue in the Mage-OS interactive installer where resuming an installation could leave an `env.php` backup readable more broadly than intended, potentially exposing service credentials.

If you maintain your own nginx configuration rather than using the configuration shipped with Mage-OS, make sure you also add the new `/media/customer_address/` deny rule manually.

Beyond the security fixes, 3.2.0 includes several other improvements:

* A fix for multi-store URL cache-key collisions
* `GLOB_BRACE` support on musl/Alpine environments
* Redis cache backend improvements in the installer
* Mage-OS RMA 2.4.0
* Mage-OS Automatic Translation 2.2.1
* Composer 2.10.2 as the certified Composer version

With this release, **Mage-OS 3.1.0 has reached end of life**.

A major part of the achievement was the turnaround time. Preparatory work before the upstream patch became available allowed the Mage-OS team to incorporate the changes and publish Mage-OS 3.2.0 very quickly after the security disclosure.

## SEO, AEO and GEO Work Continues

Work on the new SEO tooling continued during July, with the project expanding beyond traditional search engine optimization.

Current work includes multi-store support, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), FAQ functionality with JSON-LD generation, robots.txt and LLM configuration, canonical URL improvements, Open Graph enhancements, local-business schema support and product catalog JSONL generation intended for AI consumption.

Initial foundations for UCP support are also being explored.

A substantial code review identified around 30 issues and potential improvements, which have since been addressed. Performance work is also underway, including moving expensive generation operations into queues and updating inventory integrations to use MSI.

The objective is to provide a comprehensive SEO solution while leaving open the possibility of splitting functionality into smaller packages later if that proves more useful for merchants and developers.

## AI and MCP Developer Tooling

AI-assisted Magento development continued to generate considerable discussion and experimentation this month.

The community discussed where Model Context Protocol (MCP) integrations make the most sense within Magento and Mage-OS. Developer tooling, admin integrations and product discovery emerged as some of the most promising areas.

AI-driven checkout remains more experimental. Authentication, authorization, bearer-token security, privacy and compliance all need careful consideration before such integrations can become broadly practical.

Product discovery appears particularly interesting: an MCP-enabled system could allow users or AI agents to search a Magento catalog using natural-language requests.

## Magento Bricklayer 1.17.0

Magento Bricklayer also received an update this month.

Version **1.17.0** introduces a new `order-create` tool, improvements to guidelines and skills, and improvements and security hardening for the code runner.

Community members have been testing Bricklayer in real Magento development workflows, particularly for understanding plugins, observers and interactions between different module layers.

That feedback is useful evidence for where AI-assisted development tooling can provide practical value rather than simply acting as another interface around the codebase.

## Magequery: Another Approach to AI-Assisted Development

July also brought **magequery**, a new command-line tool designed to make Magento codebases easier for both developers and AI tools to inspect.

Written in Rust, magequery can query Magento concepts including dependency injection, preferences, plugins and events without executing PHP. It can also query project and database information.

The command-line approach is particularly interesting because the same queries can be used directly by developers as well as by AI coding agents.

Together with projects such as Bricklayer and Magento2-LSP integrations, this adds another approach to the rapidly growing ecosystem of AI-assisted Magento development tools.

## Worker Mode and FrankenPHP

Work on **MageOS_WorkerMode** and its Hyvä companion module reached an important milestone during July.

The modules are now considered stable enough for development-stage testing with FrankenPHP Worker Mode.

Worker mode keeps application workers warm between requests, which can significantly change Magento's execution model. Shared application state therefore needs to be reset correctly between requests, including areas such as the object manager, sessions and layout generation.

Testing so far has produced promising performance results with warm workers.

There is also ongoing work with the OpenGento FrankenPHP modules. The intention is to upstream as much functionality as practical rather than maintaining overlapping Mage-OS-specific implementations indefinitely.

This collaboration could help reduce divergence between projects while making alternative Magento hosting architectures easier to explore.

## Community Indexing Work

Catalog indexing was another area of experimentation this month.

The community discussed the `magento2-category-product-indexer` project, which focuses on improving one of Magento's more demanding catalog indexers. Testing shared by community members included a catalog with more than 600,000 products, where indexing completed in around eight minutes.

There is some overlap with existing commercial solutions, but an open-source implementation creates opportunities for broader testing, benchmarking and community contributions.

## Inventory Experiments

The community also saw work around Magento's Multi-Source Inventory system.

The `jeanmarcos/inventory` project was shared as a drop-in MSI fork containing curated fixes and additional functionality. These include source-level reservations, concurrency locking intended to reduce overselling under load, reservation integrity tooling and a storefront availability panel.

The project supports Magento 2.4.7 through 2.4.9 as well as Mage-OS 3 and is looking for additional real-world testing.

## More Module Updates

Several Mage-OS and Mage-OS Lab projects received updates during July.

**Mage-OS RMA 2.4.1** was published with PHP 8.2 support and a more open Magento compatibility range, along with API-related improvements.

The **Advanced Widget module** received version 1.2.5.

Work also started on a new **Digital Signature module**, with an initial implementation published in Mage-OS Lab for community review and testing.

The `module-ai-base` project also saw a collection of pull requests as work continues toward publishing the module and using it as a foundation for AI functionality in other Mage-OS modules.

## Exploring Nx for Mage-OS

Toward the end of the month, work began around using **Nx** within Mage-OS infrastructure.

Nx is a toolkit for managing monorepos and their build graphs. It hashes the inputs to build and test tasks, caches their outputs and can skip work when the relevant inputs have not changed.

For a project with many interconnected packages, this has the potential to reduce unnecessary build and testing work and make CI pipelines considerably more efficient.

Initial work is now being explored through the Mage-OS `nx-for-php` and infrastructure repositories.


## Thank You

Thank you to everyone who contributed this month—whether by attending meetings, reviewing pull requests, building new modules, sharing ideas, or helping others in the community.

Mage-OS continues to grow because of its contributors. If you'd like to get involved, join one of our weekly community meetings or contribute on GitHub. We look forward to seeing what we build together in the months ahead.


## Get Involved

Mage-OS continues to grow because of its contributors, members, sponsors, and community volunteers.

Whether you contribute code, documentation, testing, design, translations, or simply provide feedback, your participation helps move the project forward.

If you want a direct voice in the future of Mage-OS, join the Association before the General Assembly and make sure your vote counts on June 17.

We look forward to seeing you there.


### Powered by Strong Partnerships

We are proud to collaborate with industry leaders who believe in open source and help accelerate the Mage-OS ecosystem.

#### Silver Partners

<div class="not-prose" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; align-items: center;">

<div>

[![ParadoxLabs](~/assets/images/blog/2026/image-2.png)](https://opencollective.com/paradoxlabs)

</div>

<div>

[![Vendic](~/assets/images/blog/2026/image-5-1024x1008.png)](https://opencollective.com/vendic)

</div>

<div>

[![Hyvä](~/assets/images/blog/2026/image-6.png)](https://opencollective.com/hyva-themes)

</div>

<div>

[![JH](~/assets/images/blog/2026/image-12.png)](https://opencollective.com/wearejh)

</div>

</div>

#### Bronze Partners

<div class="not-prose" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.5rem; align-items: center;">

<div>

[![JetRails](~/assets/images/blog/2026/image-8.png)](https://opencollective.com/jetrails)

</div>

<div>

[![Develo](~/assets/images/blog/2026/image-9.png)](https://opencollective.com/develo)

</div>

<div>

[![FindCanary](~/assets/images/blog/2026/image-10.png)](https://opencollective.com/canary)

</div>

<div>

[![integer_net](~/assets/images/blog/2026/image-11.png)](https://opencollective.com/integer_net)

</div>

<div>

[![Inchoo](~/assets/images/blog/2026/image-7-1024x1024.png)](https://opencollective.com/inchoo)

</div>

<div>

[![Bulldog Media](~/assets/images/blog/2026/bulldog-media.jpg)](https://opencollective.com/bulldog-media)

</div>

</div>

**Why Partner With Us?**

Becoming a Mage-OS partner means more than visibility. It means shaping the future of open source commerce, gaining early insights into technical developments, and showcasing your brand to a global audience of merchants, developers, and agencies.

[Learn more about partnership opportunities](https://mage-os.org/community/partners)
