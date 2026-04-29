# Blog Posts: Shopify Pitch + Performance Benchmark — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish two blog posts to the Mage-OS website and open a PR for review.

**Architecture:** Two standard Mage-OS blog posts in `src/data/post/` with correct frontmatter. Post 2 uses Grafana screenshots copied from the comparison repo into `src/assets/images/blog/2026/`. Both attributed to `david-lambauer`. No new components or layouts needed.

**Tech Stack:** Astro 5.x content collections, Markdown, existing `PageLayout` + blog routing. `npm run check` for validation.

---

### Task 1: Create feature branch

**Step 1: Create and switch to branch**

```bash
git checkout -b feat/shopify-pitch-and-benchmark-blog-posts
```

Expected: `Switched to a new branch 'feat/shopify-pitch-and-benchmark-blog-posts'`

---

### Task 2: Copy Grafana screenshots

**Files:**
- Create: `src/assets/images/blog/2026/benchmark-grafana-results.png`
- Create: `src/assets/images/blog/2026/benchmark-grafana-top.png`
- Create: `src/assets/images/blog/2026/benchmark-grafana-bottom.png`

**Step 1: Copy the three screenshots**

```bash
cp /Users/david/Herd/mage-os-comparison/grafana-final-results.png src/assets/images/blog/2026/benchmark-grafana-results.png
cp /Users/david/Herd/mage-os-comparison/grafana-final-top.png src/assets/images/blog/2026/benchmark-grafana-top.png
cp /Users/david/Herd/mage-os-comparison/grafana-final-bottom.png src/assets/images/blog/2026/benchmark-grafana-bottom.png
```

**Step 2: Verify**

```bash
ls src/assets/images/blog/2026/benchmark-grafana-*.png
```

Expected: three files listed.

**Step 3: Commit**

```bash
git add src/assets/images/blog/2026/benchmark-grafana-results.png \
        src/assets/images/blog/2026/benchmark-grafana-top.png \
        src/assets/images/blog/2026/benchmark-grafana-bottom.png
git commit -m "feat: add Grafana benchmark screenshots for performance blog post"
```

---

### Task 3: Write Post 1 — Shopify pitch story

**Files:**
- Create: `src/data/post/2026-04-29-how-mage-os-beat-shopify-without-a-feature-war.md`

**Step 1: Create the file with complete content**

Write exactly the following to `src/data/post/2026-04-29-how-mage-os-beat-shopify-without-a-feature-war.md`:

```markdown
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

The second demo was product data enrichment. A common pain: every new product needs a name, description, short description, SEO description, and schema markup. That's the same content in four different formats. The AI enrichment feature takes a raw input and fills the rest automatically.

The third was reporting. Forget opening a reports tab, exporting an Excel file, and pivoting a table. The pitch showed a chat interface inside the admin: ask a natural language question, get an answer. "What were the top five bestselling categories over the last three months?" is a question you type, not a dashboard you configure.

## Handling the objections nobody puts on the agenda

Every pitch like this has two people in the room who never lead with their actual concern.

There's always someone who cares about data privacy. The answer: Mage-OS runs on infrastructure you control. You host your own LLM on AWS Frankfurt or wherever you need it. Your store's data never trains a competitor's model.

There's usually someone who asks about sustainability. Hetzner and many managed cloud providers power their infrastructure with green energy. Covered.

And then there's the quiet "but is this thing actually backed by anyone?" anxiety that SaaS platforms benefit from without earning. David used the Linux distribution analogy. Adobe Commerce is Red Hat: enterprise-grade, expensive, built for a specific bracket. Mage-OS is closer to Ubuntu: community-driven, SMB-focused, and moving fast. The Hyva and Mollie partnerships add credibility for a European merchant audience.

None of these objections derailed the meeting.

## What other agencies can take from this

The demo that won this pitch was built from community work. AI data enrichment, the agentic content creation proof-of-concept, and the Typesense integration are all being built into Mage-OS core. Any agency can show up with the same story.

The technical parts aren't the hard part. A chat interface that answers questions about your store's data isn't a multi-year project. A working version can be built in days with the right stack.

The hard part is the reframe. When a client is already sold on Shopify, meeting them on the features battlefield gives you a losing hand. Shift the conversation to what e-commerce actually looks like when AI is everywhere and SaaS vendors control your data.

That's the pitch that won.
```

**Step 2: Verify frontmatter is valid YAML (eyeball check)**

Confirm: `title`, `publishDate`, `category`, `author`, `draft`, `excerpt`, `tags` all present. No trailing spaces after `---`.

**Step 3: Commit**

```bash
git add src/data/post/2026-04-29-how-mage-os-beat-shopify-without-a-feature-war.md
git commit -m "feat: add Shopify pitch blog post by David Lambauer"
```

---

### Task 4: Write Post 2 — Performance benchmark

**Files:**
- Create: `src/data/post/2026-04-29-mage-os-hyva-vs-magento-luma-performance-benchmark.md`

**Step 1: Create the file with complete content**

Write exactly the following to `src/data/post/2026-04-29-mage-os-hyva-vs-magento-luma-performance-benchmark.md`:

```markdown
---
title: "Mage-OS + Hyva vs. Magento + Luma: Real Performance Numbers"
publishDate: "2026-04-29T12:00:00.000Z"
category: "Technical"
author: "david-lambauer"
draft: false
excerpt: "David Lambauer from run_as_root ran a controlled 250-user load test on identical AWS infrastructure to find out how much faster Mage-OS + Hyva is than Magento + Luma under real concurrency."
tags:
  - "Performance"
  - "Hyva"
  - "Benchmark"
  - "Mage-OS"
image: "~/assets/images/blog/2026/benchmark-grafana-results.png"
imageAlt: "Grafana dashboard showing p95 response time comparison: Luma at 8,000ms vs Hyva at 3,680ms under 250 concurrent users"
---

During a recent client pitch, a question came up that vendor benchmarks couldn't answer cleanly: how much faster is Mage-OS with Hyva than Magento with Luma under real concurrency?

David Lambauer from run_as_root GmbH decided to find out properly. That meant identical AWS infrastructure for both stacks, a controlled k6 load test, and Full Page Cache deliberately disabled so PHP actually renders every request.

The full methodology, Terraform configurations, Helm charts, and k6 scripts are published openly so you can reproduce this on your own infrastructure.

## What was tested

Two stacks, zero shared resources. Each ran on its own dedicated EKS node group: four m6i.2xlarge nodes (8 vCPU, 32 GB each). Same Magento 2.4.7-p9 base. Same catalog generated by `magento setup:perf:generate-fixtures`: 4,000 simple products, 200 configurable products, 8 categories. The Luma database was generated first, then dumped and imported into the Hyva schema to guarantee identical data.

Stack A was standard Magento with Luma: RequireJS, KnockoutJS, jQuery, layout XML with deep block nesting. Stack B was Mage-OS with Hyva, Alpine.js, Tailwind CSS, and Typesense replacing OpenSearch for storefront search.

The key difference at the PHP level: Luma processes layout XML with complex UI component hierarchies on every request. Hyva replaces the entire frontend layer with simpler PHTML templates and Alpine.js directives. The server-side rendering path is shorter.

Both stacks had Full Page Cache and Varnish disabled. With FPC on, both serve cached HTML at near-identical speeds. That benchmarks your cache layer, not your platform. Disabling it forces every request through the full rendering pipeline.

## The results

250 virtual users, ramped over six minutes, sustained for five minutes, across a realistic traffic mix: 30% browse (homepage + category), 25% search, 25% product detail pages, 20% add-to-cart via REST API. Both stacks ran in parallel in the same time window.

| Metric | Luma | Hyva | Difference |
|--------|------|------|------------|
| p50 (median) | 1,040 ms | 201 ms | 5.2x faster |
| p90 | 6,610 ms | 3,580 ms | 1.8x faster |
| p95 | 8,000 ms | 3,680 ms | 2.2x faster |
| Throughput | 36 req/s | 51 req/s | +42% |
| Error rate | 0% | 0% | Both clean |

The median is the number that matters most for most users. At p50, Hyva responded in 201 ms while Luma took 1,040 ms. Five times faster, same hardware.

The 42% throughput gap is the capacity planning number. Same infrastructure, same VU count, but Hyva completed 40,021 requests to Luma's 28,147 over the 13-minute test. Faster rendering frees PHP-FPM workers sooner, so more requests get through per second.

Neither stack hit a CPU or memory ceiling. Peak CPU on both was around 20-25%. The bottleneck is PHP-FPM worker concurrency, not compute.

![Grafana dashboard showing p95 and p50 response time comparison between Luma and Hyva stacks](~/assets/images/blog/2026/benchmark-grafana-results.png)

![Infrastructure and throughput metrics during the benchmark run](~/assets/images/blog/2026/benchmark-grafana-top.png)

## Per-page breakdown

The improvement isn't isolated to one slow endpoint. Every page type shows the same gap.

| Page | Luma p95 | Hyva p95 | Ratio |
|------|----------|----------|-------|
| Homepage | 7,545 ms | 3,698 ms | 2.0x |
| Category | 7,899 ms | 3,738 ms | 2.1x |
| Search | 8,320 ms | 3,646 ms | 2.3x |
| Product detail | 8,121 ms | 3,703 ms | 2.2x |
| Add to cart (API) | 7,754 ms | 3,670 ms | 2.1x |

Search shows the largest gap at 2.3x. Part of that is the Typesense module (`run-as-root/magento2-typesense`) returning results faster than OpenSearch for storefront queries. Typesense is also the foundation for the RAG-based AI features described in the [companion post about the Shopify pitch](/community/how-mage-os-beat-shopify-without-a-feature-war).

## What the database data shows

Both stacks shared the same RDS MySQL 8.0 instance with separate schemas. Hyva executed fewer SQL queries per HTTP request (43 vs 56 for Luma) but examined more rows per query. Despite 7x the row I/O, Hyva's response times are still 2.2x faster. PHP rendering overhead dominates. Database behavior matters for optimization, but frontend architecture is the bigger lever for perceived performance.

The RDS instance stayed well below its limits throughout. Threads running peaked at 8-10, slow queries were near zero.

## Reproduce it yourself

The full benchmark is published at [github.com/mage-os/mage-os-comparison](https://github.com/mage-os/mage-os-comparison). It includes:

- Terraform for EKS, RDS, EC2, VPC, and ALB
- Helm values for both stacks via the Mappia chart
- k6 load test script with the traffic mix described above
- Grafana dashboards for results and infrastructure metrics

Running the full benchmark costs around $3.07/hour on AWS. Tear it down with `terraform destroy` when you're done.

Benchmarked on 2026-04-12 by David Lambauer using Claude Code for infrastructure automation and analysis.
```

**Step 2: Verify frontmatter**

Confirm: `title`, `publishDate`, `category`, `author`, `draft`, `excerpt`, `tags`, `image`, `imageAlt` all present.

Confirm the image path `~/assets/images/blog/2026/benchmark-grafana-results.png` matches the file copied in Task 2.

**Step 3: Commit**

```bash
git add src/data/post/2026-04-29-mage-os-hyva-vs-magento-luma-performance-benchmark.md
git commit -m "feat: add Mage-OS vs Luma performance benchmark blog post by David Lambauer"
```

---

### Task 5: Run checks and fix any issues

**Step 1: Run the full check suite**

```bash
npm run check
```

Expected: no errors. Astro type check, ESLint, and Prettier all pass.

**Step 2: If Prettier reports formatting issues, auto-fix**

```bash
npm run fix
git add -A
git commit -m "fix: apply prettier formatting to new blog posts"
```

**Step 3: If there are type errors in frontmatter**

The schema in `src/content/config.ts` has all fields as optional except `title`. If Astro reports a coercion error on `publishDate`, check the date string format — it must be parseable by `new Date()`. The format `"2026-04-29T00:00:00.000Z"` is correct.

---

### Task 6: Push branch and open PR

**Step 1: Push branch**

```bash
git push -u origin feat/shopify-pitch-and-benchmark-blog-posts
```

**Step 2: Open PR**

```bash
gh pr create \
  --title "feat: add Shopify pitch and performance benchmark blog posts" \
  --body "$(cat <<'EOF'
## Summary

- Adds two blog posts by David Lambauer (run_as_root GmbH) requested by Ryan Hoerr
- Post 1: Narrative case study of winning a Shopify pitch by reframing around data ownership and AI
- Post 2: Controlled 250-VU k6 benchmark comparing Mage-OS + Hyva vs Magento + Luma on identical AWS infrastructure, with Grafana screenshots

## Content

- `src/data/post/2026-04-29-how-mage-os-beat-shopify-without-a-feature-war.md`
- `src/data/post/2026-04-29-mage-os-hyva-vs-magento-luma-performance-benchmark.md`
- `src/assets/images/blog/2026/benchmark-grafana-results.png`
- `src/assets/images/blog/2026/benchmark-grafana-top.png`
- `src/assets/images/blog/2026/benchmark-grafana-bottom.png`

## Test plan

- [ ] `npm run check` passes with no errors
- [ ] Both posts render correctly at localhost:4321 via `npm run dev`
- [ ] Images display in Post 2
- [ ] Author attribution shows David Lambauer correctly
- [ ] Cross-link between posts resolves correctly
EOF
)"
```

**Step 3: Share PR URL with the user.**
