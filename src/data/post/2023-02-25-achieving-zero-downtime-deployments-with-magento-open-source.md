---
title: "Achieving Zero-Downtime deployments with Magento Open Source"
publishDate: "2023-02-25T00:00:00.000Z"
category: "eCommerce Insights"
author: "Mage-OS Team"
draft: false
excerpt: "Introducing Zero-Downtime deployments facilitates faster, more frequent deployments As an agency working with Magento since 2009, we are always excited at the..."
---

_Introducing Zero-Downtime deployments facilitates faster, more frequent deployments_

As an agency working with Magento since 2009, we are always excited at the prospect of moving faster with developments for our clients. Achieving [CI/CD](https://en.wikipedia.org/wiki/CI/CD) for customers on a **budget** is no easy task. In this article we discuss the pain points and share some of our processes in achieving regular zero-downtime deployments for merchants using Magento Open Source or Adobe Commerce.

## Why is it so difficult with Magento 2?

A standard deployment on Magento 2 usually involves certain commands/processes being ran in the event of certain changes. Here we explain the key deployment types.

- **bin/Magento setup:static-content: deploy** - If you have frontend changes which involved typically Javascript or CSS, then you will need to run this. This can be achieved in \*zero-downtime.

- **bin/Magento setup: upgrade** - If you have upgrades to Magento or modules or are installing a new module, these require setup:upgrade to be ran and during this phase, the site should be in maintenance mode.

- **Custom code changes or patches** - Either of these in most cases can be achieved with \*zero-downtime 

\* Zero-downtime deployments can only be achieved if you have some way of executing the deployment commands away from the production site. If you do not have a non-production server or managed deployment pipeline such as MGT Code Deploy, MDOQ or Magento Commerce Cloud, then usually you have to put your website into maintenance mode whilst this runs. You want to avoid this. Without a solid deployment process, the TCO will be significantly more. 

### **How does this benefit the merchant?**

As an agency this is the question we always ask.

In summary, most of the work we carry out typically falls into one of the above 3 types. In 2 of these cases, with the correct deployment pipeline (building all your static content away from production), you can achieve these with zero-downtime, therefore, delivering fast, iterative changes (CI/CD). Due to costs, CI/CD is not typically common practice with smaller merchants however, with automation it is more cost-effective. So the up-shot is, if you have a deployment process where you can deploy your static content away from production, then for all your front-end development work, you could deploy many times a day. This is really where the Magento product outshines other platforms, since very few platforms allow such control over code and development processes. 

**Dare we comment on Adobe Commerce Cloud?**

In a word yes. It’s fair to say this product has yet to yield real success of it’s own making. Since launch it has flown on the coat-tails of the Magento reputation and been hampered with many issues. Key issues remain. There is no facilitation of development instances or the use of RDE technology, which means however quick a non-production instance can be rolled up on Commerce Cloud, the developer is still ultimately responsible for themselves before they can become a productive ‘coder’. Secondly, the short-sightedness and complete lack of consideration for the Open Source product around dev ops standardisation, continues to yield project/platform failures and ultimately remains a weakness in the future of Magento Open Source for SME’s. Good agencies work very hard in developing their operational processes to best manage this risk, but ultimately, different agencies have their own intellectual property and this makes it more difficult for merchants to feel in control and potentially work with multiple agencies. This needs to evolve! Since it is clear that Adobe have no interest in Open Source, then now is the time they should relinquish the platform to an independent organisation.

### **How to achieve zero-downtime deployments**

I'm almost certainly going to miss options here however this content is here to be revised and updated accordingly. 

1. Magento Commerce Cloud: Reading their documentation, it does not actually sound like true zero-downtime is achieved, however if there are no database changes or module upgrades then we assume that deployments could take place with minimal front-end customer impact. Ie the site does always go into maintenance mode however the amount of time could be very small. I've noted this here more for perspective, but since this article is focussed on supporting concepts with Magento Open Source, it's an irrelevant option.

3. MGT Code Deploy: Looks powerful, but since it’s only for AWS and carries a monthly fee of 99 Euros, it might not suit the smaller merchants. That said I would recommend any small business on Magento consider something like this to improve stability and therefore frequency of your deployment process. If you only deploy once every 6 months you should be asking yourself the question, did I pick the right platform?

5. MDOQ offers intelligent deployments and is compatible with AWS and any other production hosting, however with integrated production hosting, MDOQ slashes development costs even when deployment multiple times per day. 

7. If you have any recommendations on solid deployment tools for Magento, please feel free to suggest them for inclusion here. We intend for this article to be live and up-to-date
