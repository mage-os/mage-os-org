# Mage-OS Website

The official Mage-OS website built with Astro, featuring a product-focused design that showcases the Mage-OS Distribution as the community-driven Magento alternative.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [Configuration](#configuration)
- [Commands](#commands)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Communication Standards](#communication-standards)


## Overview

| Section | Pages |
|---------|-------|
| Homepage | `/` |
| Product | `/product`, `/product/features`, `/product/roadmap`, `/product/releases` |
| Get Started | `/get-started`, `/get-started/quick-start`, `/get-started/installation`, `/get-started/migration-guide`, `/get-started/system-requirements` |
| Documentation | `/documentation` |
| Community | `/community` |
| Events | `/events` |
| About | `/about`, `/about/leadership`, `/about/ambassadors`, `/about/contributors`, `/about/statutes` |
| FAQ | `/faq` |
| Legal | `/privacy`, `/terms`, `/code-of-conduct`, `/imprint` |
| Blog | `/blog` |

## Tech Stack

| Component | Choice | Purpose |
|-----------|--------|---------|
| Framework | [Astro 5.x](https://astro.build/) | Static site generation with component islands |
| Base Theme | AstroWind | Production-ready Astro template |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS with dark mode support |
| CMS | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | Git-based CMS with GitHub backend |
| Content | MDX + YAML | Markdown with components and data files |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.1+, v20.3.0+, or v21.0.0+)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mage-os/mage-os-org.git
   cd mage-os-org
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Project Structure

```
mage-os.org/
├── public/
│   ├── admin/           # Sveltia CMS configuration
│   ├── _redirects       # URL redirects for hosting
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── images/
│   │   │   ├── blog/    # Blog post images by year
│   │   │   ├── events/  # Event images
│   │   │   └── team/    # Leadership photos
│   │   └── styles/
│   ├── components/
│   │   ├── blog/        # Blog-specific components
│   │   ├── common/      # Shared components
│   │   ├── ui/          # UI primitives
│   │   ├── widgets/     # Page section widgets
│   │   └── Logo.astro   # Site logo
│   ├── content/
│   │   └── config.ts    # Content collection schemas
│   ├── data/
│   │   ├── post/        # Blog posts (Markdown/MDX)
│   │   ├── events/      # Event entries (Markdown)
│   │   ├── homepage/    # Homepage section data (YAML)
│   │   └── partners.yaml
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── PageLayout.astro
│   │   └── ContentPageLayout.astro
│   ├── pages/           # Route pages
│   ├── utils/           # Utility functions
│   ├── config.yaml      # Site configuration
│   └── navigation.ts    # Navigation structure
├── astro.config.ts
├── tailwind.config.js
└── package.json
```

## Content Management

### Content Collections

| Collection | Schema Location | Data Location | Purpose |
|------------|-----------------|---------------|---------|
| Blog Posts | `src/content/config.ts` | `src/data/post/` | News, updates, announcements |
| Events | `src/content/config.ts` | `src/data/events/` | Community events and meetups |

### Sveltia CMS

The site includes Sveltia CMS for non-technical content editing at `/admin`.

**CMS Collections:**
- **Blog Posts**: Create and edit blog posts
- **Events**: Manage community events
- **Homepage**: Edit hero, stats, testimonials
- **Partners**: Manage partner listings

**Setup Requirements:**
- GitHub OAuth application configured for authentication
- Repository access for the GitHub backend

### Adding Content via Git

**New Blog Post:**
```bash
# Create a new post file
touch src/data/post/2026-01-15-my-new-post.md
```

```markdown
---
title: My New Post
publishDate: 2026-01-15
author: Your Name
category: news
tags:
  - announcement
image: ~/assets/images/blog/2026/my-image.jpg
excerpt: A brief description of the post.
---

Your content here...
```

**New Event:**
```markdown
---
title: Mage-OS Community Meetup
publishDate: 2026-01-20
startDate: 2026-02-15T18:00:00
endDate: 2026-02-15T21:00:00
location: Online
image: ~/assets/images/events/meetup.jpg
excerpt: Join us for our monthly community meetup.
---

Event details...
```

## Configuration

### Site Configuration

Edit `src/config.yaml` for site-wide settings:

```yaml
site:
  name: 'Mage-OS'
  site: 'https://mage-os.org'
  base: '/'
  trailingSlash: false

metadata:
  title:
    default: 'Mage-OS'
    template: '%s - Mage-OS'
  description: 'The community-driven Magento distribution'
  # ... SEO settings
```

### Navigation

Edit `src/navigation.ts` to update site navigation:

```typescript
export const headerData = {
  links: [
    { text: 'Product', links: [...] },
    { text: 'Get Started', links: [...] },
    // ...
  ],
  actions: [{ text: 'Download', href: '...' }],
};
```

### Styling

Customize appearance in:
- `src/components/CustomStyles.astro` - Font families and colors
- `src/assets/styles/tailwind.css` - Tailwind customizations
- `tailwind.config.js` - Tailwind configuration

## Commands

Run all commands from the `astro/` directory:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Check project for errors |
| `npm run fix` | Run ESLint and format with Prettier |

## Deployment

### Production Build

```bash
npm run build
```

The optimized site is generated in the `dist/` folder.

### Cloudflare Pages (Recommended)

Cloudflare Pages is the recommended hosting platform, providing edge deployment, automatic HTTPS, and preview deployments for every PR.

#### Initial Setup

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git** → Authorize GitHub → Select the repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `astro` |

5. Add environment variable: `NODE_VERSION` = `20`
6. Click **Save and Deploy**

#### Preview Deployments

Cloudflare Pages automatically creates preview deployments for every branch and pull request:

| Branch | URL Pattern |
|--------|-------------|
| `main` (production) | `https://mage-os.org` or `https://<project>.pages.dev` |
| Feature branches | `https://<branch-name>.<project>.pages.dev` |
| Pull requests | `https://<commit-hash>.<project>.pages.dev` |

**Example:** A PR from branch `feature/new-hero` deploys to `https://feature-new-hero.mage-os-website.pages.dev`

Preview URLs are automatically posted as comments on pull requests.

#### Setting Up a Staging Environment

For a dedicated staging environment with a custom domain:

1. Create a `staging` branch in GitHub
2. In Cloudflare Pages → **Settings** → **Builds & deployments**
3. Under **Branch deployments**, configure:
   - Production branch: `main`
   - Preview branches: Include `staging`
4. Go to **Custom domains** → Add `staging.mage-os.org`
5. Configure DNS to point `staging.mage-os.org` to Cloudflare Pages

#### Manual Deployments

Trigger a manual deployment:

```bash
# Via GitHub Actions (uses deploy hook)
gh workflow run scheduled-deploy.yaml

# Or push to main branch
git push origin main
```

#### Rollback Procedure

To rollback to a previous deployment:

1. Go to Cloudflare Pages → Your project → **Deployments**
2. Find the previous working deployment
3. Click the three-dot menu → **Rollback to this deployment**

Alternatively, revert the commit in Git and push to trigger a new deployment.

#### Monitoring & Logs

- **Build logs:** Cloudflare Pages → Deployments → Select deployment → View logs
- **Analytics:** Cloudflare Dashboard → Analytics & Logs → Web Analytics
- **Real-time errors:** Enable Cloudflare Web Analytics for Core Web Vitals

### Alternative Hosting Platforms

**Netlify:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Vercel:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### URL Redirects

Legacy WordPress URLs are redirected via `public/_redirects`:

| Old URL | New URL |
|---------|---------|
| `/privacy-policy` | `/privacy` |
| `/leadership-team` | `/about/leadership` |
| `/frequently-asked-questions` | `/faq` |
| `/get-involved` | `/community` |

### Security Headers

Security headers are configured in `public/_headers` and include:

- **X-Content-Type-Options:** Prevents MIME sniffing
- **X-Frame-Options:** Prevents clickjacking
- **Referrer-Policy:** Controls referrer information
- **Strict-Transport-Security:** Enforces HTTPS
- **Permissions-Policy:** Restricts browser APIs

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For content contributions, you can also use the CMS interface at `/admin` (requires GitHub access).

## Communication Standards

All content must adhere to these standards:

### Code of Conduct

All writing must comply with the [Mage-OS Code of Conduct](https://mage-os.org/code-of-conduct).

### Language

- Use **US English** exclusively
- Avoid cultural idioms or references that might confuse international readers
- Prioritize clarity in technical writing

### Accessibility

- All images require descriptive `alt` tags
- Maintain proper heading hierarchy
- Ensure sufficient color contrast
- Support keyboard navigation

### Core Values

- **Collaboration**: Work together as a community
- **Positivity**: Maintain a constructive tone
- **Reliability**: Provide consistent, stable information

## Key Files Reference

| Purpose | File |
|---------|------|
| Site config | `src/config.yaml` |
| Navigation | `src/navigation.ts` |
| Homepage | `src/pages/index.astro` |
| CMS config | `public/admin/config.yml` |
| Content schemas | `src/content/config.ts` |
| Logo | `src/components/Logo.astro` |
| Homepage data | `src/data/homepage/*.yaml` |
| Partners data | `src/data/partners.yaml` |
| URL redirects | `public/_redirects` |

---

Built with [Astro](https://astro.build/) and the [AstroWind](https://github.com/arthelokyo/astrowind) theme.
