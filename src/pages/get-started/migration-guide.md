---
title: 'Migration Guide'
description: 'Seamlessly migrate from Magento Open Source to Mage-OS with zero downtime and full compatibility.'
tagline: 'Get Started'
layout: '~/layouts/ContentPageLayout.astro'
---

Migrating from Magento Open Source to Mage-OS is straightforward and typically takes **15-30 minutes**. Your existing extensions, themes, and customizations will continue to work without modification.

## Why Migrate to Mage-OS?

Mage-OS is built on the same Magento Open Source foundation you already trust, enhanced with community-driven improvements that deliver real business value:

### Performance & Security
- **Enhanced Performance** - Optimized caching and database queries for faster page loads
- **Faster Security Patches** - Community-accelerated security updates, often released ahead of upstream
- **PCI DSS 4.0 Ready** - Built-in compliance settings for modern payment security requirements

### Features & Innovation
- **AI-Powered Translation** - Automatic content translation using DeepL, OpenAI, or Google Gemini
- **Theme Optimization** - Back/forward cache support and speculative preloading for better Core Web Vitals
- **Enhanced Page Builder** - CMS Widget support with live previews and import/export capabilities

### Compatibility & Freedom
- **100% Compatible** - All your existing Magento extensions, themes, and customizations work without modification
- **No Vendor Lock-in** - Fully open source with transparent, community-led governance
- **Seamless Upgrade Path** - Stay current with Magento improvements while gaining Mage-OS enhancements

---

## Pre-Migration Checklist

Complete these items before starting your migration:

### Backups
- [ ] Complete file system backup of your Magento installation
- [ ] Database backup (use the command in Step 1 below)
- [ ] Media files backup (`pub/media` directory)
- [ ] Custom configuration files backup (`.env`, `app/etc/env.php`)

### Environment Requirements
- [ ] SSH/command-line access to your server
- [ ] Composer 2.8+ installed (`composer --version` to verify)
- [ ] Sufficient disk space (at least 2x your current installation size for backups)
- [ ] Current Magento version is 2.4.6 or later

### Recommended Preparations
- [ ] Review third-party extension documentation for any known issues
- [ ] Notify your team about the planned migration window
- [ ] Prepare a staging environment for testing (recommended for production sites)

> **Tip:** If your Magento version is older than the latest version, we strongly suggest you update to the latest Magento Open Source version first, then migrate to Mage-OS.

---

## Migration Process

### Step 1: Create Backup

```bash
# Backup database
mysqldump -u username -p database_name > backup.sql

# Backup files
tar -czvf magento-backup.tar.gz /path/to/magento
```

### Step 2: Switch to Mage-OS Repository

```bash
cd /path/to/your/magento

# Add Mage-OS repository
composer config repositories.0 composer https://repo.mage-os.org/

# Require Mage-OS product
composer require mage-os/product-community-edition --no-update

# Remove Magento product
composer remove magento/product-community-edition \
  magento/composer-dependency-version-audit-plugin \
  magento/composer-root-update-plugin --no-update

# Update all dependencies
composer update --no-plugins --with-all-dependencies
```

### Step 3: Run Upgrade

```bash
# Run setup upgrade
bin/magento setup:upgrade

# Compile DI
bin/magento setup:di:compile

# Deploy static content
bin/magento setup:static-content:deploy -f

# Reindex
bin/magento indexer:reindex

# Flush cache
bin/magento cache:flush
```

### Step 4: Verify Installation

```bash
# Check version
bin/magento --version

# Should output: Mage-OS 2.x.x
```

---

## One-Line Migration

For experienced users, the entire process can be condensed:

```bash
composer config repositories.0 composer https://repo.mage-os.org/ && \
composer require mage-os/product-community-edition --no-update && \
composer remove magento/product-community-edition \
  magento/composer-dependency-version-audit-plugin \
  magento/composer-root-update-plugin --no-update && \
composer update --no-plugins --with-all-dependencies && \
bin/magento setup:upgrade && \
bin/magento setup:di:compile && \
bin/magento setup:static-content:deploy -f && \
bin/magento cache:flush
```

---

## Compatibility

Mage-OS is designed for seamless migration. Your existing Magento ecosystem remains fully functional.

### Extensions

Mage-OS maintains **100% compatibility** with Magento Open Source extensions. Your existing extensions will continue to work without modification, including:

- Marketplace extensions from Adobe Commerce Marketplace
- Third-party payment gateways and shipping providers
- Custom modules developed for your store
- All composer-based extensions

### Themes

All Magento 2 themes are fully compatible with Mage-OS:

- **Luma** - Default Magento theme
- **Blank** - Base theme for custom development
- **Custom themes** - Your own theme implementations
- **Third-party themes** - Hyva, Porto, and other popular themes

### Customizations

Custom modules, plugins, observers, and customizations built for Magento Open Source will work on Mage-OS without changes. This includes:

- Custom API integrations
- Event observers and plugins
- Layout and template overrides
- Custom CLI commands

> **Important:** Mage-OS uses the same codebase structure as Magento Open Source. There are no breaking changes to worry about.

---

## Zero-Downtime Migration

For production environments, use a staged approach:

### 1. Clone Environment

```bash
# Clone your production to a staging environment
rsync -avz production/ staging/
```

### 2. Test Migration on Staging

Perform the migration on staging first and thoroughly test:

- Checkout flow
- Admin panel functionality
- Third-party integrations
- Custom functionality

### 3. Schedule Maintenance Window

For the final switchover:

1. Enable maintenance mode
2. Sync any database changes
3. Perform migration
4. Test critical paths
5. Disable maintenance mode

```bash
# Enable maintenance mode
bin/magento maintenance:enable

# ... perform migration ...

# Disable maintenance mode
bin/magento maintenance:disable
```

---

## Rollback Procedure

If issues arise, you can rollback:

```bash
# Restore database
mysql -u username -p database_name < backup.sql

# Restore files
tar -xzvf magento-backup.tar.gz -C /
```

To switch back to Magento repositories:

```bash
composer config repositories.0 composer https://repo.magento.com/
composer require magento/product-community-edition --no-update
composer remove mage-os/product-community-edition --no-update
composer update --no-plugins --with-all-dependencies
bin/magento setup:upgrade
```

---

## Post-Migration

Congratulations on migrating to Mage-OS! Complete these verification steps to ensure everything is working correctly.

### Verify Your Installation

Run these checks to confirm a successful migration:

```bash
# Confirm Mage-OS version
bin/magento --version
# Expected output: Mage-OS 2.x.x

# Check module status
bin/magento module:status

# Verify indexer health
bin/magento indexer:status
```

### Test Critical Functionality

Manually verify these key areas:

- [ ] **Storefront** - Browse products, add to cart, complete a test checkout
- [ ] **Admin Panel** - Log in and navigate key sections
- [ ] **Payment Methods** - Verify payment gateway connections
- [ ] **Shipping** - Confirm shipping method calculations
- [ ] **Third-party Integrations** - Test any external system connections (ERP, CRM, etc.)

### Explore New Mage-OS Features

Mage-OS 2.0 includes powerful new capabilities:

- **PCI DSS 4.0 Compliance** - Review new security settings in Admin > Stores > Configuration > Security
- **AI-Powered Translation** - Configure in Admin > Stores > Configuration > General > AI Translation (requires API key)
- **Theme Optimization** - Enable bfcache and speculative loading in theme settings
- **Enhanced Page Builder** - Try the new CMS Widget support with live previews

### Finalize Your Migration

```bash
# Ensure cron is running
bin/magento cron:run

# Clear all caches
bin/magento cache:flush

# Recompile (if needed)
bin/magento setup:di:compile
```

---

## Troubleshooting

### Composer Conflicts

If you encounter dependency conflicts:

```bash
composer update --with-all-dependencies
```

### Module Version Mismatches

```bash
bin/magento setup:upgrade --keep-generated
bin/magento module:status
```

### Static Content Issues

```bash
rm -rf pub/static/* var/view_preprocessed/*
bin/magento setup:static-content:deploy -f
```

---

## Need Help?

@TODO: Change Discord references to embedded widgetbot page

You are not alone. The Mage-OS community is here to support your migration journey.

### Community Support (Free)

- **Discord** - Get real-time help from community members and core contributors: [chat.mage-os.org](https://discord.com/invite/nvZDVA2NdC)
- **GitHub Discussions** - Ask questions and share solutions: [github.com/mage-os](https://github.com/mage-os)
- **Developer Documentation** - Comprehensive technical guides: [devdocs.mage-os.org](https://devdocs.mage-os.org)

### Professional Support

For enterprise migrations or complex environments, our partner network offers:

- Dedicated migration assistance
- Custom development and integration
- Ongoing support and maintenance

[Find a Mage-OS Partner](/about)

> **Pro Tip:** Most migration issues can be resolved quickly on Discord. The community is active and eager to help new members.

---

## Next Steps

- [Quick Start Guide](/get-started/quick-start) - New installation guide
- [System Requirements](/get-started/system-requirements) - Technical specifications
- [Features](/product/features) - Explore Mage-OS features
