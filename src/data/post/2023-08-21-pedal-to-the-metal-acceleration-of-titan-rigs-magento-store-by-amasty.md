---
title: "Pedal to the Metal: Acceleration of Titan Rig’s Magento Store by Amasty"
publishDate: "2023-08-21T00:00:00.000Z"
category: "Case Studies"
author: "Mage-OS Team"
draft: false
excerpt: "A popular US-based provider of PC cooling components, Titan Rig, helps thousands of customers keep their technical equipment at maximum performance with minimum risks via their Magento Open Source store."
image: "~/assets/images/blog/2023/Screen-2.png"
---

![](~/assets/images/blog/2023/Screen-2-1024x768.png)

A popular US-based provider of PC cooling components, Titan Rig, helps thousands of customers keep their technical equipment at maximum performance with minimum risks via their Magento Open Source store. However, due to poor implementation they were facing multiple technical and performance related challenges. 

To accelerate the big rig hauling their entire business forward and help them smoothly deal with any traffic, the company turned to [Amasty](https://amasty.com/)'s “repair shop” with a request to realize Magento's full potential.

## Drop-Off

After contacting Amasty, who developed over **80%** of the extensions used on the cooling components store, Titan Rig explained that the maintenance of their Magento-powered website was being outsourced. However, the results of their cooperation so far had been underwhelming. 

Many store pages took from **12** to whopping **25 seconds** to load and search results appeared in no less than **16 seconds**. Waiting times got even longer in the evenings, when the traffic was at its peak. Worse than that, the website would regularly crash and stay down for around 10 minutes – on a lucky day, that is.  

No doubt, all of this had a very negative effect on organic traffic, customer satisfaction, conversions, and online sales. But Titan Rig was not looking to move e-commerce systems. They appreciated Magento’s flexible, omnichannel, and open-source nature and simply wanted to have their store optimized.  

## Inspections & Diagnosis

A performance audit of Titan Rig’s store unveiled a clear imbalance in server resources; they were overpowered for the slow morning traffic yet too weak to handle peak times in the evenings.

Testing also helped to detect a number of code errors and Magento best practices violations, which caused loading speed decline. Some of the key issues were:

- **ObjectManager** direct call in template files

- **ObjectManager** in module logic

- Too much logic in **PHTML** templates

- **Block objects** created in template files

- Plugins with **around()** instead of **before()** and **after()**

- **cacheable=“false”** in layout handles

## Repair Works

To balance out server resources, Amasty’s “mechanics” decided to enable **auto-scaling.** Thanks to Magento’s flexible hosting, the team easily activated additional server nodes and further customized hosting services to match the website’s traffic patterns. All these efforts helped to ensure that the website would smoothly tackle even peak loads.

Fixing all the uncovered coding issues and implementing Magento best practices was all it took to significantly increase the website speed. With pages loading in just **2-4 seconds** and Time to First Byte (TTFB) equalling **150-180 milliseconds**, Titan Rig’s store officially entered the green _‘Good’_ speed zone. 

## Engine Tuning

The results were already excellent but Amasty knew that Magento could go even faster. The team offered to replace the existing MySQL-powered search engine with [**Algolia**](https://amasty.com/algolia-search-for-magento-2.html) –a lightning-fast search technology that fit both the Magento environment and Titan Rig’s business needs like a glove. Implementing Algolia on the store helped to achieve more relevant search results that fully loaded in under **2-3 seconds** instead of the crazy 16.  

## Test Drive

With the page load speed raised from 15-25 seconds to 2-4 and Algolia search showing results in just 2-3 seconds, Titan Rig’s desktop Magento store got a definite **‘Passed’** in Core Web Vitals Assessment by Google’s PageSpeed Insights.

![](~/assets/images/blog/2023/Screen-1-1024x768.png)

Kevin Keating, Vice President of Marketing and Sales at Titan Rig, provided more details on the results of the collaboration:

_“We’ve seen a significant improvement in our overall traffic, and the website has been better equipped to handle it. We’ve had better visibility in Google because we don’t have any more errors on our page. We have A+ ratings on other testing websites, and even our customers have seen a noticeable improvement in the website’s performance.”_

## Customization

Convinced of Magento’s potential and Amasty’s competence, Titan Rig decided to re-launch one of the projects they had unsuccessfully attempted with the freelancers: the implementation of **a real-time PC cable configurator**. The solution was aimed at helping customers personalize their cables on the website by choosing different plugs and combining as many as 40 different cable colors.

Because of Magento’s extensive capabilities for customization and integration, the Amasty team successfully developed the product configurator and integrated it with Titan Rig’s entire e-commerce system. Now, whenever a client creates a unique cable right on the website, the order specifications are automatically transferred via **Linnworks and APIs** to the warehouse. There, the magic of creating one-of-a-kind cables happens.

## Back on The Road Again

Refined and upgraded, Titan Rig’s store hit the road – now faster, more stable, and ready to handle any traffic. The enhanced Magento performance helped the company to boost customer satisfaction, conversions, and sales. The cable configurator, a brand-new website feature, successfully attracts new clients and makes the company stand out among competitors. 

Pleased with the revitalized Magento store, Titan Rig now entrust Amasty with the full ongoing maintenance of their website.

_“It’s the professionalism that’s most impressive. They’re honest. I’ve never worked with a company that’s so responsive, even when dealing with other third-party software applications. They don’t just let things sit around. I feel I can trust them with our website.” — Kevin Keating, VP of Marketing and Sales at Titan Rig._
