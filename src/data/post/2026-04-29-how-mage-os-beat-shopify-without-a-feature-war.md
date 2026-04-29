---
title: "How a Mage-OS Pitch Beat Shopify Without a Feature War"
publishDate: "2026-04-29T00:00:00.000Z"
category: "Community"
author: "david-lambauer"
draft: false
excerpt: "A 900-person German publisher was ready to sign with Shopify. David Lambauer from run_as_root walked in without a feature checklist and walked out with the contract."
tags:
  - "Mage-OS"
  - "Sales"
  - "AI"
  - "Hyva"
---

The marketing department had just taken over responsibility for the online shop. Within weeks, they had one request: Shopify.

Their reasoning wasn't irrational. The existing Magento installation was several years behind on upgrades. No Hyva. None of the modern features that had shipped since. When a competing integrator demoed a Business Central connection they'd stood up in 50 minutes, the pitch looked even more compelling.

David Lambauer, CEO of run_as_root GmbH and VP of the Mage-OS Association, walked into that pitch with something different from a features list.

## Stop comparing today

The feature comparison game is one you can't win against a larger SaaS platform. Shopify has a big app store, polished dashboards, and years of marketing spend telling merchants it's the easy choice.

So David didn't play that game.

His first move was to reframe the question entirely. Instead of "which platform has a better page builder today?", he asked: "What will your competitors look like in 12 months?"

His answer: AI is about to commoditize every feature on any comparison spreadsheet. ChatGPT, Claude, and their successors are available to every merchant and every competitor equally. Everyone has access to the same knowledge.

The only thing that can't be copied is your data.

## What the pitch actually showed

The demo wasn't a 50-slide deck. David assembled it in roughly 20 minutes from things the Mage-OS community had already built.

The first piece was the Hyva Commerce admin. The page builder question came up early. His answer was direct: every platform needs CI work to match a brand's design. That's true whether you pick Shopify, Hyva, or anything else. That's not a differentiator.

The differentiator was what came next.

He showed an agentic admin proof-of-concept built by the Mage-OS team. The idea: type a prompt inside your e-commerce admin, and the system creates a landing page skeleton using content it already knows about your store. Products, categories, past purchase behavior, brand tone. You finish the last 20% in the page builder.

The room's reaction was immediate. Marketing people don't care how the plumbing works. They care about getting from "we have new Easter products" to "we have a live landing page" without a two-week agency sprint.

The second demo was product data enrichment. A common pain: every new product needs a name, description, short description, SEO description, and schema markup. The AI enrichment feature takes a raw input and fills the rest automatically.

The third was reporting. Forget opening a reports tab, exporting an Excel file, and pivoting a table. The pitch showed a chat interface inside the admin: ask a natural language question, get an answer. "What were the top five bestselling categories over the last three months?" is a question you type, not a dashboard you configure.

## Handling the objections nobody puts on the agenda

Every pitch like this has two people in the room who never lead with their actual concern.

There's always someone who cares about data privacy. The answer: Mage-OS runs on infrastructure you control. You host your own LLM on AWS Frankfurt or wherever you need it. Your store's data never trains a competitor's model.

There's usually someone who asks about sustainability. Hetzner and many managed cloud providers power their infrastructure with green energy. Covered.

And then there's the quiet "but is this thing actually backed by anyone?" anxiety that SaaS platforms benefit from without earning. David used the Linux distribution analogy. Adobe Commerce is Red Hat: enterprise-grade, expensive, built for a specific bracket. Mage-OS is closer to Ubuntu: community-driven, SMB-focused, and moving fast. The Hyva and Mollie integrations add credibility for a European merchant audience.

None of these objections derailed the meeting.

## What other agencies can take from this

The demo that won this pitch was built from community work. AI data enrichment, the agentic content creation proof-of-concept, and the Typesense integration are all being built into Mage-OS core. Any agency can show up with the same story.

The technical parts aren't the hard part. A chat interface that answers questions about your store's data isn't a multi-year project. A working version can be built in days with the right stack.

The hard part is the reframe. When a client is already sold on Shopify, meeting them on the features battlefield gives you a losing hand. Shift the conversation to what e-commerce actually looks like when AI is everywhere and SaaS vendors control your data.

That's the pitch that won.
