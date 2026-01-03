---
title: "Mage-OS November Update"
publishDate: "2025-11-30T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "November has been an exciting and busy month for the Mage-OS community. Between major announcements, global conferences, and hackathon sessions, there’s a lot..."
image: "~/assets/images/blog/2025/mage-os-may-blog-2.jpg"
---

November has been an exciting and busy month for the Mage-OS community. Between major announcements, global conferences, and hackathon sessions, there’s a lot to share.

### Big News

**Hyvä Theme Goes Open Source**  
The biggest highlight of the month is that the Hyvä Theme is now [fully open source](https://www.hyva.io/blog/news/hyva-is-free-open-source.html). This means anyone can use, modify, and contribute to the theme without worrying about licensing. For Mage-OS users and developers, it opens new possibilities to customize and streamline storefronts.

![](~/assets/images/blog/2025/Hackathon-Logo.png)

### Upcoming Hackathon: December 14

We are hosting an **online, live-streamed Mage-OS Hackathon** on **December 14**. Connect via Discord and join anytime during the day, participation is flexible!

**Challenge Yourself:**

- Rebuild the Magento Installer with support for multiple frontends

- Create a standardized AI module

- Build a simple blog module

**Why Participate?**

- Showcase your skills in a collaborative, live environment

- Connect with developers and tech enthusiasts worldwide

- Receive a free t-shirt sponsored by [run\_as\_root](https://run-as-root.sh/) based on participation

**Sign Up:** [Reserve your spot and submit t-shirt size](https://forms.gle/rPJL5KAzhJiH9FaX8)

This hackathon is a great opportunity to innovate, collaborate, and level up your development skills while having fun with the Mage-OS community.

### Conferences and Community Events

**[Meet Magento New York](https://meetmagentonyc.com/)**  
In late October, Meet Magento New York brought together developers and merchants to discuss modern commerce trends, performance optimization, and frontend solutions. Hyvä, Mage-OS, and other community members shared insights and updates, with plenty of opportunities for networking and collaboration.

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.45.22-1024x682.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.45.222-1024x682.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.45.221-1024x682.jpeg)

**[Meet Magento Netherlands](https://nl.meet-magento.com/)**  
The Netherlands edition kicked off with a Mage-OS hackathon. Around 15–20 developers worked on UIkit themes, AI modules, and performance tools. The hackathon was a productive space for experimentation, collaboration, and direct feedback from active contributors.

![](~/assets/images/blog/2025/rn_image_picker_lib_temp_436a99e9-75dc-4a58-9fae-81785d37560c-768x1024.jpg)

![](~/assets/images/blog/2025/image-1024x768.jpg)

**[Meet Magento Canada](https://ca.meet-magento.com/)**  
The first Meet Magento Canada featured a Mage-OS warm-up session. Participants got a chance to explore new ideas, discuss performance improvements, and connect with other community members across North America.

![](~/assets/images/blog/2025/WhatsApp_Image_2025-11-12_at_20.18.34-1024x576.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.46.56-1024x682.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.46.561-1024x682.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.46.55-1024x682.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.46.551-1024x682.jpeg)

![](~/assets/images/blog/2025/WhatsApp-Image-2025-11-29-at-22.46.552-1024x682.jpeg)

**[Meet Magento Poland](https://meetmagento.pl/)**  
The Poland conference focused on practical implementations, theme integrations, and modular architecture. Speakers shared case studies and migration experiences, highlighting how Mage-OS and Magento alternatives are shaping European commerce.

### Join Us: Release Manager Wanted

Mage-OS is currently looking for a part-time **Release Manager**. This role is critical to maintaining release quality, coordinating builds, and supporting the community. If you’re interested in helping shape the next Mage-OS releases, check out the details here: [Join Mage-OS as a part-time Release Manager](https://mage-os.org/updates/join-mage-os-as-a-part-time-release-manager/).

November has been a month of growth, experimentation, and community engagement. With the open-sourcing of Hyvä, hackathons, and active development on core tools, the Mage-OS ecosystem is stronger and more collaborative than ever.

### Technical Highlights

**Release and Build Infrastructure**  
The team is exploring moving release packages into bucket storage to speed up builds and improve consistency. Static Composer repositories are being considered to reduce the need for full server builds, though incremental builds would require some deeper changes.

**Meta Packages and Minimal Distribution**  
Work continues on refactoring Mage-OS meta packages, allowing for flexible configurations and a new “minimal” distribution that includes only essential modules. This helps reduce dependencies and simplifies maintenance.

**Dependency Validation and Composer Tools**  
Several initiatives aim to make dependency management easier:

- Detect modules relying on replaced packages.

- Validate missing or incorrect dependencies.

- Analyze circular dependencies in Magento’s module graph.

### Performance and AI

- **Performance Testing:** Plans are underway to benchmark Mage-OS against Magento Open Source using automated load tests to highlight improvements.

- **AI Base Module:** A central module is being proposed to manage AI integrations, store API keys, and configure models. This would unify tools like OpenAI and Anthropic under a single interface.

- **AI Content for Page Builder:** Damien demonstrated an open-source Angular AI content generator. Davide is exploring integrating it into Page Builder workflows.

### Tools, Installers, and Themes

**Interactive Installer**  
Development is ongoing for a CLI installer that can optionally install Hyvä during setup. Options include adding parameters to `setup:install` or offering a separate command similar to sample data.

**Web Installer**  
The web installer is working on Nginx, and volunteers are testing it on Apache. Contributions are welcome, especially as the repo was recently re-opened.

**Admin Theme Updates**  
Minor improvements have been made, including a new body class (m137-admin-theme) for alignment fixes, along with updated documentation.

### PHP 8.4 and Lazy Object Loading

Early tests of PHP 8.4’s native lazy-loading show about a 10% performance improvement. Some modules need adjustments because certain native PHP objects cannot yet be lazy-loaded. Progress started during hackathons and continues.

### Migration Tools

A prototype migration meta-package aims to simplify the process of moving from Magento to Mage-OS. It reduces multiple manual Composer commands into a single, streamlined approach. Community testing is encouraged to refine it further.

### DevOps and Infrastructure

- Terraform state on Google Cloud is currently blocked due to an expired billing card.

- Mirror packages have been updated.

- A security fix for the Session Reaper module is ready to merge, protecting against spam uploads.

### Documentation and Community Support

Documentation is being updated to cover new Mage-OS 2 features, including VCL configuration for bfcache support and Page Builder enhancements. There’s also work to standardize GitHub Actions for testing Mage-OS modules, making it easier for contributors to validate their work.

### Looking Ahead to Mage-OS 3.0

The community is sharing ideas for Mage-OS 3.0, including:

- Admin activity logging

- A simple blog module

- AI-powered catalog tools

- Optional configuration files for LLM integration

Even partial implementation of these features will make a significant difference, and everyone is encouraged to contribute.

### **Partners**

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
