
---
title: "Mage-OS Aug Update"
publishDate: "2026-09-01T00:00:00.000Z"
category: "Updates"
author: "mage-os-team"
draft: false
excerpt: "Mage-OS is moving forward on several fronts, from a new public roadmap and the upcoming Mage-OS Hackathon in Zwolle to the growing Extension Directory and new projects in Mage-OS Lab. This month’s update looks at what’s being built, the ideas shaping Mage-OS 4.0, and where the community can get involved."
image: "~/assets/images/blog/2026/mage-os-aug-blog.jpg"
---

# **A Roadmap Takes Shape, the Extension Directory Comes to Life, and Labs Keeps Growing**

There is a lot happening across Mage-OS right now, but one theme connects much of the work this month, making the project easier to understand, easier to contribute to, and easier to use in the real world.

That means giving the community a clearer view of where Mage-OS is heading, making extensions easier to discover and evaluate, and continuing to move useful projects into Mage-OS Lab where they can grow in the open.

## **Mage-OS Hackathon in Zwolle**

September is a chance to work on Mage-OS together in person. On **24 September**, the community is meeting at the Made by Mouses office in Zwolle for a day dedicated to turning ideas, issues and unfinished work into actual contributions.

The hackathon is open to both regular contributors and developers who have been looking for an opportunity to make their first contribution. There will be experienced Mage-OS developers around to help get things moving, from picking an issue to getting a PR ready.

**Thursday, 24 September · 10:00–17:00**
**Made by Mouses, Westerlaan 129A, Zwolle, Netherlands**

Bring a laptop and something you'd like to improve in Mage-OS.

[Reserve your place on Eventbrite](https://www.eventbrite.com/e/1999279184861?aff=oddtdtcreator)

## **A public roadmap for Mage-OS**

One of the clearest conclusions from recent community discussions is that Mage-OS needs a public roadmap.

The roadmap is not intended to become a list of promises with arbitrary deadlines. It should answer a much more practical question like **where are we trying to take Mage-OS next?**

That matters to several different parts of the community. Developers need to know where contributions would be useful. Agencies and merchants need some visibility into what is coming. Partners considering investing engineering time or funding into Mage-OS need to understand how that investment fits into the larger project.

The current proposal is to organize development around quarterly, theme based sprints. Those could focus on areas such as AI, SEO, developer experience, CMS improvements or catalog performance rather than trying to move every part of the platform forward simultaneously.

A lot of the potential roadmap already exists in community discussions and working documents. The next job is to bring those ideas together, organize them and turn them into something the entire community can follow.

The public Mage-OS roadmap is now available here:

[Mage-OS Product Roadmap](https://mage-os.org/product/roadmap/)

And importantly, the roadmap should not only be something you read, it should be something you can influence.

## **What should the next major Mage-OS release fix for you?**

Work has started on defining Mage-OS 4.0, currently targeted for October. The roadmap is still taking shape, and the rule for inclusion is deliberately simple, features need to be genuinely production ready. There are already plenty of candidates.

Ideas being discussed include template and scope hints in core, a native apply-patch command in bin/magento, replacing MFTF with Playwright or Cypress, dead letter queue support for message queues, a one line Docker setup and several AI related projects. But this is also where we want more input from people actually building and operating stores.

You know that module you install on almost every project? Or the workaround that somehow gets copied from one codebase to the next because the platform has never quite solved the underlying problem? **That is exactly what we want to hear about.**

Open an idea in Mage-OS Lab Discussions and describe the problem. It does not need to arrive as a polished technical specification. A rough explanation of the pain is enough, the community can help develop the solution. And if somebody has already described your problem, upvote it. That signal helps us understand which improvements would have the broadest impact.

[Join the Mage-OS Lab discussions on GitHub](https://github.com/orgs/mage-os-lab/discussions)

Longer term, we also want feature voting to become accessible beyond GitHub. GitHub Discussions works well for developers, but a public roadmap ultimately needs to work for merchants and other community members who do not spend their days inside GitHub.

## **The Mage-OS Extension Directory is taking shape**

![Mage-OS Extension Directory](~/assets/images/blog/2026/Mage-os-extension-directory.jpg)

One of the most visible projects this month is the **Mage-OS Extension Directory**, which Ryan Hoerr is working on. The screenshot above gives a good idea of the direction.

Instead of an extension directory being little more than a collection of names and descriptions, the goal is to provide information that is actually useful when deciding whether a module belongs in a Mage-OS installation.

Search for an extension and the directory can surface signals such as **Strict checks pass**, **No errors found** and **Installs cleanly**. Compatibility information is visible directly alongside the module, as are categories, installation numbers, update information and the Composer package name.

The interface also makes installation practical. Modules can be marked for installation and the directory builds the appropriate composer require command, ready to copy and run on the server. The directory itself does not secretly install anything on your store.

That distinction is important. It remains a discovery and decision making tool rather than another layer trying to take control of your Magento installation.

The underlying information comes from existing parts of the ecosystem rather than trying to recreate them. Package metadata is sourced from[ Packagist](https://packagist.org/), while quality and compatibility information is provided in partnership with[ PackageMaven](https://package-maven.com/?utm_source=chatgpt.com).

The result could solve a long standing problem in the Magento ecosystem, finding an extension is relatively easy, figuring out whether you actually want to install it is considerably harder.

The Extension Directory is being designed to make that second part much easier.

## **Mage-OS Lab is becoming easier to follow**

Mage-OS Lab is deliberately a place where projects can develop before they are necessarily candidates for Mage-OS core. That freedom is useful, but it has also created a discoverability problem unless you regularly browse GitHub repositories and discussions, it can be difficult to know what is happening.

There is now a much simpler way to look inside. [Browse Mage-OS Lab projects](https://mage-os-labs.develo.design/labs)

The page provides a view into current Lab activity without requiring people to hunt through GitHub. This becomes increasingly important as the number of projects grows and there are several new projects worth watching.

## **More open source modules arrive in Mage-OS Lab**

Rocket Web has contributed two substantial projects to the ecosystem. The RocketWeb Shopping Feed has been open sourced and is now available as a Mage-OS package here: [Mage-OS Shopping Feed on Packagist](https://packagist.org/packages/mage-os/module-shopping-feed)

Gregor Pollak has also brought Rocket Web's NetSuite connector into Mage-OS Lab. Work has been underway to consolidate what previously existed across several repositories into a community module that is easier to maintain and extend.

[Mage-OS NetSuite Connector on GitHub](https://github.com/mage-os-lab/module-netsuite-connector)

[Mage-OS NetSuite Connector on Packagist](https://packagist.org/packages/mage-os/module-netsuite-connector)

There has already been discussion about how Mage-OS asynchronous events could eventually be used for outbound NetSuite synchronization.

The Lab has also gained an Advanced Profiler and its accompanying Admin UI:

[Advanced Profiler on Packagist](https://packagist.org/packages/mage-os/module-profiler)

[Profiler Admin UI on Packagist](https://packagist.org/packages/mage-os/module-profiler-admin-ui)

And Hyvä support for the Mage-OS Blog module is available as another new package:

[Mage-OS Blog Hyvä module on Packagist](https://packagist.org/packages/mage-os/module-blog-hyva)

For more on Rocket Web's involvement with Mage-OS, there is also a video series covering their work and perspective:

[Watch the Rocket Web Mage-OS playlist](https://www.youtube.com/playlist?list=PLCwZS2wKLCe0)

## **A much more useful profiler**

The new Enhanced Profiler deserves particular attention because it addresses something almost every Magento developer eventually encounters which is where did all that time go?

The profiler can work with CLI, API, frontend and Admin requests.

It supports a tabular mode for getting profiling information directly through the CLI or logs, as well as JSON output that can be explored through an Admin interface.

The UI provides tree, flat and timeline views, with filtering and sorting to help developers isolate expensive operations. Profiling information can be filtered by keys such as SQL or by execution time, and custom modules can introduce their own profiling points.

There is a default limit of 5,000 spans to prevent the profiler itself from becoming excessively expensive.

This is intended as a development and debugging tool rather than a replacement for production APM platforms such as Tideways. Feedback on bringing the project further into Mage-OS has been positive, and work is underway to adapt it to Mage-OS conventions.

## **Build the AI foundation before the features**

AI remains one of the potential themes for Mage-OS 4.0, but the discussion has become more concrete. Instead of every new AI powered extension independently implementing integrations with OpenAI, Anthropic and other providers, the **Base AI module** aims to establish a common integration layer.

Recent work includes improved provider and package detection, a cleaner API, better configuration, named API keys, enable/disable controls and connection testing.

Several projects could eventually build on that foundation, including AI Catalog Data, AI Admin and AI Page Builder.

There is also a practical reason for being cautious. Enterprise AI governance is already affecting real projects. One AI Page Builder project slowed after the merchant involved was no longer permitted to use AI under its internal policies.

So while AI is very much part of the discussion around Mage-OS 4.0, the objective is not to add "AI" to a feature list for the sake of it. The underlying architecture and actual projects need to be ready first.

## **Rethinking catalog performance**

Some of the most interesting conversations this month went considerably deeper than individual features.

Magento's Product Listing Page architecture continues to be an obvious performance target. Existing approaches have demonstrated how much can be gained by moving more PLP data into OpenSearch instead of repeatedly assembling it through database queries at request time.

That naturally led to a bigger question such as **should Mage-OS keep optimizing the existing catalog indefinitely, or is it time to start designing a new one?**

A potential "Catalog 2" architecture could move significantly more business logic to indexation time and provide a cleaner catalog API backed primarily by OpenSearch or another search engine.

There are obvious complications. Magento's extensibility is one of its strengths, but it also means almost every part of the existing catalog can be intercepted or changed by extensions. Replacing internals while guaranteeing complete backwards compatibility can quickly prevent meaningful architectural improvements.

One possible answer is a new catalog implementation that exists alongside the current system, with a defined compatibility layer and migration path rather than attempting to preserve every internal behavior forever.

This is still an architectural discussion, not a finished project. But it is exactly the sort of discussion a public roadmap should make visible.

## **Smaller changes with potentially large effects**

Not every useful improvement requires a new architecture. A proposed Cron Group Model, for example, would allow cron jobs to be reassigned between groups rather than leaving unrelated workloads competing in the default group.

The idea came from a very real scaling problem, long running jobs can block other scheduled work, and the consequences become much more noticeable on extremely large stores. The implementation itself could be comparatively small, making it an interesting candidate for Mage-OS Lab and potentially Mage-OS 4.0.

Inventory performance is another area being investigated. MSI can trigger substantial database activity, particularly around configurable and bundle products, and repeated stock checks have been identified as a significant source of checkout overhead in some implementations.

There is also ongoing work to bring **PHPStan** support into Mage-OS GitHub Actions, including checkStore, checkExtension and a standalone PHPStan action. It is currently disabled by default in the existing checks because enabling it automatically would constitute a breaking change.

## **Mage-OS 3.4**

Before the bigger 4.0 work arrives, there is also a smaller release on the way.

Mage-OS 3.4 is planned around the latest Magento security patch from Adobe. This is intentionally a focused release, with the security update essentially forming the release rather than bundling unrelated changes alongside it.

That keeps the immediate priority where it belongs. Getting the security fixes into Mage-OS quickly while the larger roadmap develops separately.

## **From individual projects to a visible direction**

Taken individually, an extension directory, a profiler, a NetSuite connector, an AI abstraction layer and a discussion about catalog architecture can look like unrelated projects.

Together, they show where Mage-OS is heading.

The Extension Directory makes the wider extension ecosystem easier to navigate. Mage-OS Lab gives experimental and community driven projects somewhere to mature. The new Lab overview makes those projects visible without requiring everyone to follow GitHub activity. And the public roadmap starts connecting all of that work into a direction that developers, merchants, agencies and partners can understand.

The next part requires community input.

Take a look at the[ Mage-OS roadmap](https://mage-os.org/product/roadmap/). Browse what is happening in[ Mage-OS Lab](https://mage-os-labs.develo.design/labs). Then head to the[ Mage-OS Lab Discussions](https://github.com/orgs/mage-os-lab/discussions) and tell us what Mage-OS should solve next.

**What is the problem you wish you didn't have to solve again on your next project?**

That is probably a good place for the roadmap to start.


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
