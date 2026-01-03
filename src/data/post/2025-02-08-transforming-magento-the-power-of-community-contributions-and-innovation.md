---
title: "Transforming Magento: The Power of Community, Contributions, and Innovation"
publishDate: "2025-02-08T00:00:00.000Z"
category: "eCommerce Insights"
author: "Mage-OS Team"
draft: false
excerpt: "E-commerce is constantly changing, and Magento continues to be a leading platform, providing great tools for developers and businesses. Two exciting additions..."
tags:
  - "Updates"
image: "~/assets/images/blog/2025/IMG-20241130-WA0002-.jpg"
---

E-commerce is constantly changing, and Magento continues to be a leading platform, providing great tools for developers and businesses. Two exciting additions to this system have recently stood out: the Automatic Translations Module and the PageBuilder Import-Export Module. Created by [Davide Lunardon](https://www.linkedin.com/in/davide-lunardon-b78813a1/), [Luca Fuser](https://www.linkedin.com/in/luca-alessio-fuser/) and [Samuele Martini](https://www.linkedin.com/in/samuele-martini-02820795/), these tools aim to make Magento even more useful and easy to use.

## **The Automatic Translations Module**

### **How It Was Developed**

During the Covid period, [Samuele Martini](https://www.linkedin.com/in/samuele-martini-02820795/) began exploring generative AI technologies, particularly OpenAI, with the goal of innovating within e-commerce. An old challenge resurfaced: years ago, a client requested automatic product description generation during ERP imports, which was not feasible at the time.

Fast-forward to a new client of Davide Lunardon, who needed to expand into the French market but lacked translated product data. Given high translation costs and the prospect of further expansions, Samuele and Davide revisited the AI-based module concept, integrating it with DeepL, OpenAI, and Google Gemini to create high-quality translations at a fraction of the cost. The result was an efficient, scalable translation module for Magento. 

The module enables the translation of all entities, including products, categories, CMS pages, and static blocks, into almost any language. For the product catalog, it offers two modes: a manual option, accessible via a button in the admin panel, and an automatic mode using cron jobs. The automatic mode includes configurable control systems to prevent the retranslation of manually modified products while allowing forced retranslation if descriptions in the primary language change. Categories, CMS pages, and static blocks, however, can only be translated manually via the admin panel button. Given the module's effectiveness, we decided to make it available to communities through Mage-OS.

### **Challenges in Development**

1. **Handling HTML in Descriptions** – Ensuring AI engines preserved structural elements while translating text was complex.

3. **Prompt Engineering** – While DeepL required no prompts, OpenAI and Gemini needed specific instructions to produce quality translations.

5. **Attribute Translation** – Unlike textual attributes, select and multiselect attributes store only IDs, requiring a separate translation mechanism.

7. **Alt Text Handling** – Since Magento associates alt text with a "gallery" entity, special logic was needed to integrate it seamlessly.

Today, [the module](https://github.com/mage-os-lab/module-automatic-translation) allows merchants to translate products, categories, CMS pages, and static blocks either manually or automatically via cron jobs, ensuring efficient multilingual expansion. Recognizing its potential, Samuele and Davide made it available to the Mage-OS community.

## **PageBuilder Import-Export Module**

### **How It Was Developed**

Magento’s PageBuilder is widely used for content management, but one major limitation has always been the inability to export and import CMS pages and blocks between environments. Recognizing this issue, Davide Lunardon proposed an extension to enable seamless content transfers. 

The module allows users to export templates as zip files containing:

- **template.html** (HTML content)

- **preview.jpg** (visual representation)

- **config.xml** (metadata configuration)

- **Children folder** (nested CMS blocks)

- **Asset folder** (related images)

Additionally, a Dropbox API integration enables remote template imports. This innovation means merchants can now version and distribute CMS content efficiently across sites.

### **Challenges in Development**

1. **Recursive CMS Dependency Handling** – Extracting interdependent assets and templates in a structured manner was a significant challenge.

3. **Choosing the Right Remote Service** – A flexible API solution was needed for sustainable integration with Mage-OS.

Supported by fellow developers Luca Fuser and Samuele Martini, Davide’s vision took shape, and [the module](https://github.com/mage-os-lab/module-pagebuilder-template-import-export) is now actively being refined for stability and efficiency.

The module was created by [**Samuele Martini**](https://www.linkedin.com/in/samuele-martini-02820795/) and [**Davide Lunardon**](https://www.linkedin.com/in/davide-lunardon-b78813a1/), two experienced developers with a strong background in e-commerce solutions.

## **About the Developers**

![](~/assets/images/blog/2025/AD_4nXc3l9wjH95o8Nah8a5dR7ZF33NlgfoJroZN-7IrOxBdipcTs5RsIAt2LU5hdqHN0RJAmZQpvMIVxHrtbmxKXrvWlWwxU9Joo-QItqsE0ErUKsSFflay3kNx_PECYOIICAAJH-ch.png)

Samuele, a developer from Treviso, Italy, has a diverse academic background in statistics, business management, and computer science. After earning his degree from the University of Padua in 2011, he built his career across multiple web agencies, progressing from developer to technical director. In 2025, he decided to start his own business, collaborating with Davide, a longtime friend and former colleague.

Davide is a passionate web developer and an amateur table tennis player. Since becoming a freelancer in late 2020, he has primarily worked with companies and agencies in Italy, bringing his expertise in web development to various projects. Together, Samuele and Davide combined their skills to develop this module, aiming to make translation in e-commerce more efficient and accessible.

### **How They Discovered Magento**

Samuele and Davide’s journey with Magento began at different times, but for similar reasons – its flexibility and power as an e-commerce platform.

Davide first encountered Magento in 2016 while working on projects for one of the companies he was employed at. It was instant love, especially with Magento 1, as Magento 2 was not yet fully stable at the time. The platform’s capabilities and potential drew him in, sparking his deep interest in e-commerce development.

For Samuele, the transition to Magento came as a strategic decision. Initially working on corporate websites with WordPress, he witnessed the agency he worked for pivot toward e-commerce due to the industry's rapid growth. During their research, they evaluated multiple platforms, including Prestashop, Shopware, and Magento. After a detailed analysis, Samuele recommended Magento because it functioned more like a framework than a traditional CMS, making it ideal for custom, scalable developments. This adaptability made it the perfect choice for handling complex, tailored e-commerce projects.

Their shared passion for Magento eventually led them to specialize in the platform, laying the foundation for their later collaboration and the development of their module.

### **What They Love About Magento**

Both Samuele and Davide appreciate Magento for its robustness, flexibility, and developer-friendly architecture, which makes it a powerful tool for building and maintaining e-commerce platforms.

For Samuele, Magento’s greatest strength is its comprehensiveness. Unlike other platforms that are still catching up on essential features like wishlists and bundled products, Magento has offered these since 2007. From a developer’s perspective, Magento provides an innovative yet intuitive set of patterns that make extending functionality seamless. Features like preferences, plugins, viewModels, virtual types, argument preferences, and dependency injection are unique tools not commonly found in other PHP frameworks, making Magento an extremely versatile and customizable platform.

Davide values Magento’s elasticity and the structured framework that enables scalability and maintainability when managed correctly. The dependency injection system, virtual types, and plugin architecture give developers unparalleled control over customizations. Additionally, its open-source nature allows for deep, ad-hoc integrations tailored to specific business needs. He also highlights the out-of-the-box features that have been present since Magento 1 and continue in Magento 2, making it a large, stable, and complete codebase for e-commerce development. For Davide, working on complex e-commerce projects without Magento would be unimaginable.

### **Their Relationship with Mage-OS**

Mage-OS provides an independent, community-driven environment for Magento development. It ensures that Magento remains open-source and continues evolving with valuable features. Through their contributions, Davide and Samuele have enhanced Magento’s capabilities, making it more accessible and powerful for businesses worldwide. Both Samuele and Davide see Mage-OS as a crucial initiative for preserving and expanding Magento’s open-source ecosystem, allowing them to contribute to the platform in ways that weren’t possible before.

Samuele first learned about Mage-OS through [Alessandro Ronchi](https://www.linkedin.com/in/alessandroronchi/) and was immediately drawn to its clear objectives. He sees its role as twofold: first, ensuring that Magento remains open source, no matter what; and second, enhancing Magento’s core functionality, rather than just integrating Adobe SaaS services. Samuele has actively contributed by working on an AI-powered automatic translation suite alongside Davide, and participating in the OpenAI integration module developed by [Ryan Sun](https://www.linkedin.com/in/ryanyinsun/).

For Davide, Mage-OS represents freedom – the ability to contribute to Magento without restrictions imposed by corporate ownership. While he acknowledges Adobe’s contributions, he feels that Magento has changed significantly since the acquisition. With Mage-OS, he can now develop and release tools that directly benefit the Magento ecosystem, something he couldn't do while working within agencies. Seeing how much Magento has shaped his career, he is eager to give back to the community and help restore Magento’s reputation and strength through Mage-OS.

With the Automatic Translations Module and PageBuilder Import-Export Module, Magento developers and merchants can now work more efficiently, scale into new markets, and manage content seamlessly. As Mage-OS grows, these innovations will help shape the future of the Magento ecosystem.
