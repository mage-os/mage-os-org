---
title: "Revitalizing Magento Through Mage-OS and Smarter Frontend Design"
publishDate: "2025-07-14T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "In a world where Magento has often felt caught between its open-source roots and corporate oversight, Davide Lunardon is one of the developers pushing it back..."
image: "~/assets/images/blog/2025/davide.jpg"
---

In a world where Magento has often felt caught between its open-source roots and corporate oversight, _[Davide Lunardon](https://www.linkedin.com/in/davide-lunardon-b78813a1/)_ is one of the developers pushing it back toward its community-driven origins. Known to many as **dadolun95**, Davide is a freelance web developer based in Italy, spending his days crafting Magento solutions and his downtime at the ping pong table.

With Mage-OS gaining momentum as a true open-source alternative to Adobe's version of Magento, Davide’s contributions, especially in improving content editing and frontend flexibility, are helping redefine what it means to build with Magento in 2025.

## Building a Smarter Page Builder

One of Davide’s standout contributions is the **[page-builder-widgets](https://github.com/mage-os-lab/module-page-builder-widget)** module, a clever workaround for Magento’s long-standing struggle with user-friendly content management.

Page Builder has always felt like it was missing something critical, Davide explains. Especially when it comes to creating custom components. You end up diving into a labyrinth of UI components and JavaScript structures that barely make sense, even for seasoned Magento devs.

His module fixes this by allowing CMS widgets to be previewed directly inside Page Builder, complete with the actual data the user enters. Before this, adding a widget meant inserting a shortcode and hoping it worked on the frontend. Now, merchants get real previews, and developers only need a small XML snippet and a PHTML file to make it happen.

The result is a massive improvement in usability without sacrificing the Magento philosophy of extensibility and modularity.

## The Pain Behind the Progress

Building the module wasn’t exactly a walk in the park. Magento’s admin UI is infamously complex, and developing something that integrates cleanly without breaking standards required some serious determination.

"The hard part was designing its behavior at the UI/UX level in the admin and wiring the various calls needed in the component by untangling xml and js. All without changing any mode in widget development while remaining totally faithful to the standard in use." he says. I had to find ways to allow for custom JS, CSS, and backend logic without rewriting the core structure.

Davide also had to account for admin-specific behavior, such as using backend-only block classes, while making the preview system flexible enough to support future use cases. The entire development process took around 10 days of focused, intense work.

> “Developing such a complex uiComponent is in itself something that is debilitating and that leads you on several occasions to think that you will not be able to complete the work” - he admits.

## A Theme for the Future Without Losing the Past

Davide isn’t just looking at Page Builder; he has his eyes on the frontend, too. His next big proposal involves revamping Magento’s default theme Luma to make it more modern, flexible, and compliant with evolving digital standards.

Instead of replacing Luma entirely, he’s building a new Blank-based theme that incorporates **[UIkit3](https://getuikit.com/docs/introduction)**, a lightweight frontend framework that works perfectly with Magento’s static content deploy process. Unlike other modern frontend stacks, it doesn’t require Node.js or a custom build toolchain. It compiles via LESS, just like Magento expects.

> "We cannot afford as an opensource community to have to tell those who want to use the software we support << You have to install theme X or module Y to be able to sell online >> and vendors cannot be asked to make an extra effort to adapt to yet another new 'standard.'"

This new theme brings in responsive design utilities, UI components, and a faster path to modern layouts, all while preserving compatibility with Magento’s frontend architecture.

It’s already in beta, and Davide has shared it with the Mage-OS community for feedback. The next steps include refining it to meet regulatory requirements like the EU’s Cyber Resilience Act and eventually tackling Magento’s checkout experience, which still lacks proper CSP compliance.

## From Early Magento to Open-Source Advocacy

Davide discovered Magento back in 2016, when Magento 1 was still the dominant version and Magento 2 hadn’t yet stabilized. He was working at a company that used the platform and quickly fell in love with its structure and power.

> The flexibility it gives you, with dependency injection, plugins, preferences, is just unmatched, he says. If you know what you’re doing, you can really shape it to your business.

After going freelance in 2020, he began focusing more on community-led efforts, which is what eventually brought him to Mage-OS.

## Why Mage-OS Matters to Him

Mage-OS isn’t just a technical fork, for Davide, it’s a chance to give back to a platform that’s shaped his career. Adobe’s stewardship of Magento left many community members feeling locked out. Mage-OS gave them a new way in.

> Mage-OS lets me contribute directly without all the limitations and red tape, Davide says. "I owe a lot to Magento in terms of my own career so I'm glad to pay my 'debt' to it and that thanks to Mage-OS."

He’s not alone in seeing Mage-OS as the spiritual successor to the Magento many developers first fell in love with a project led by people who actually use and build with it every day.

## Looking Ahead

With the Page Builder Widgets module released, the frontend theme in beta, and a vision to bring widgets, layouts, and admin tools into a more modern ecosystem, Davide’s work is helping Mage-OS move from potential to reality.

> There’s still a lot to do, he says. But we’re at the point where we can finally make Magento or Mage-OS fun again.

Whether it's giving non-developers better tools or improving compatibility for third-party developers, Davide’s contributions are a reminder of what open source is supposed to be: practical, inclusive, and community-driven.

And with developers like him in the mix, the future of Mage-OS looks a whole lot brighter.
