---
title: "Mage OS Sept Update"
publishDate: "2025-10-01T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "Meet Magento Italy was attended by several Mage-OS contributors. While the event was more marketing-oriented with fewer technical sessions, the networking..."
image: "~/assets/images/blog/2025/mage-os-may-blog-2.jpg"
---

## **Events and Community Engagement**

[Meet Magento Italy](https://it.meet-magento.com/) was attended by several Mage-OS contributors. While the event was more marketing-oriented with fewer technical sessions, the networking opportunities and community feedback were valuable. Suggestions were made to improve Mage-OS visibility at future events.

Vinai shared impressions from [Meet Magento Kiev](https://ua.meet-magento.com/en/), highlighting both the normal rhythm of city life and the strong local community connections. His presentation on [Hyvä certifications](https://www.hyva.io/hyva-certification.html) was well received.

Looking ahead, [Meet Magento Netherlands](https://www.meet-magento.com/meet-magento-netherlands-november-6-2025/) takes place on November 6, with a [Mage-OS hackathon](https://www.eventbrite.com/e/pre-mm25nl-hackaton-tickets-1658933638169) hosted by the Dutch chapter the day before.

## **Demo Environment Improvements**

Work on the demo environment has been a major focus this month. The setup now automatically resets every six hours, ensuring a fresh state for testing and exploration. The sample data installation workflow has been fixed, resolving earlier reliability issues.

The environment now runs with PHP 8.3, OpenSearch, and Redis enabled. Some issues remain with category images not displaying, likely due to file permission or product type differences, but these are being investigated. Discussions around robots.txt confirmed that Magento’s configuration already covers this.

Varnish activation is being considered to further improve caching and performance. There were also suggestions to include the UI Kit theme in the demo, possibly add multiple store views, and clearly document which modules and themes are included to avoid confusion when comparing with default installations.

The demo repository is now public: [mage-os-lab/demo.mage-os.org](https://github.com/mage-os-lab/demo.mage-os.org).

## **Releases and Repository Management**

[Mage-OS 1.3.1](/?p=4884) was released earlier this month. Some issues with missing historical JSON data in the build process were quickly resolved.

The work on Mage-OS 2.0 continues. Review of bundled community modules shows that most adjustments are minor and fixes are in progress. The release process refactor, including improved version management, is ready pending final approval. Preview builds are recommended before merging into production.

The package generator saw important improvements this month, including structural refactoring for maintainability. These changes were merged after broad agreement during the technical meetings. Further refinements and minor releases are planned, including compatibility updates for PHP 8.4.

## **Performance and Frontend Work**

The theme optimization module continues to evolve. Back-Forward Cache (BF Cache) support has been implemented and merged. Additional enhancements such as VCL configuration adjustments are under discussion, though not urgent.

The UI Kit work is progressing with a focus on removing Knockout.js and reducing RequireJS dependencies for specific page types. The goal is a lighter, faster storefront experience, while balancing compatibility with third-party modules. Related work on performance modules is also underway.

## **Modules and Ecosystem**

Several community and lab modules received updates, including a geoIP redirect module and a new caching module for configurable and bundle product variants. Module management and versioning remain an active area of discussion, particularly around whether to lock dependencies or allow greater flexibility.

## **Technical Highlights**

- A new version of **Magerun** was released with support for creating Magento 2 module skeletons.  
    

- Experiments with **headless Magento demos** showcased GraphQL API usage and potential for multi-platform storefronts.  
    

- CSP compliance improvements remain on the agenda, with ongoing discussions about GDPR and security considerations.  
    

- The SeaVoice bot continues to provide free meeting transcription, working with around 80-90% accuracy.

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
