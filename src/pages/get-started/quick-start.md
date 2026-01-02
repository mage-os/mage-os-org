---
title: 'Quick Start Guide'
description: 'Launch your first Mage-OS store in under 30 minutes with this step-by-step guide.'
tagline: 'Get Started'
layout: '~/layouts/ContentPageLayout.astro'
---

Get from **zero to a working Mage-OS store** in under 30 minutes. This guide is designed for developers, merchants evaluating the platform, or anyone wanting a fast local development environment.

**Total time:** 20-30 minutes | **Difficulty:** Beginner-friendly

---

## Before You Begin

### System Requirements

| Component | Version Required |
| --------- | ---------------- |
| PHP | 8.3 or 8.4 |
| Composer | 2.8+ |
| MySQL | 8.4+ (or MariaDB 11.4+) |
| OpenSearch | 2.19+ |
| Web Server | Apache 2.4+ or Nginx 1.26+ |

Need the full list? See [System Requirements](/get-started/system-requirements).

### Choose Your Environment

**Already have a development environment?** Skip to [Step 1](#step-1-create-project).

**Need an environment?** We recommend these Docker-based options:

| Tool | Best For | Setup Time |
| ---- | -------- | ---------- |
| [DDEV](https://ddev.com/) | Easiest setup, great for beginners | 5 minutes |
| [Warden](https://warden.dev/) | Magento-focused, production-like | 10 minutes |

For detailed Docker installation, see the [Installation Guide](/get-started/installation#docker-installation).

---

## Step 1: Create Project

**Time:** 3-5 minutes

Navigate to your web server's document root and create a new project:

```bash
composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition .
```

**What this does:**

- Downloads Mage-OS Distribution and all dependencies
- Sets up the basic file structure
- Configures Composer autoloading

---

## Step 2: Create Database

**Time:** 1 minute

Create an empty database for your Mage-OS installation:

```bash
mysql -u root -p -e "CREATE DATABASE mage_os;"
mysql -u root -p -e "CREATE USER 'mage_os_user'@'localhost' IDENTIFIED BY 'secure_password';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON mage_os.* TO 'mage_os_user'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"
```

> **Security note:** Replace `secure_password` with a strong, unique password for production environments.

---

## Step 3: Run Installation

**Time:** 5-10 minutes

Run the setup installer with your configuration:

```bash
bin/magento setup:install \
  --base-url=http://yourdomain.local/ \
  --db-host=localhost \
  --db-name=mage_os \
  --db-user=mage_os_user \
  --db-password=secure_password \
  --admin-firstname=Admin \
  --admin-lastname=User \
  --admin-email=admin@example.com \
  --admin-user=admin \
  --admin-password=Admin123! \
  --language=en_US \
  --currency=USD \
  --timezone=America/New_York \
  --use-rewrites=1 \
  --search-engine=opensearch \
  --opensearch-host=localhost \
  --opensearch-port=9200
```

**Customize these values:**

| Parameter | Description | Example |
| --------- | ----------- | ------- |
| `--base-url` | Your store URL | `http://mystore.local/` |
| `--db-name` | Database name | `mage_os` |
| `--db-user` | Database username | `mage_os_user` |
| `--db-password` | Database password | Your secure password |
| `--admin-email` | Admin email address | `you@example.com` |
| `--admin-user` | Admin login username | `admin` |
| `--admin-password` | Admin login password | Min 7 chars, 1 letter, 1 number |

---

## Step 4: Set Permissions and Deploy

**Time:** 5-10 minutes

After installation completes, set permissions and deploy assets:

```bash
# Set file permissions
find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} +
find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} +
chmod u+x bin/magento

# Compile dependency injection
bin/magento setup:di:compile

# Deploy static content
bin/magento setup:static-content:deploy -f

# Flush cache
bin/magento cache:flush
```

---

## Step 5: Set Deploy Mode

**For local development:**

```bash
bin/magento deploy:mode:set developer
```

Developer mode provides detailed error messages and disables static file caching for easier debugging.

**For production:**

```bash
bin/magento deploy:mode:set production
```

Production mode enables full caching and optimizations for performance.

---

## Step 6: Access Your Store

### Storefront

Open your browser and navigate to:

```
http://yourdomain.local/
```

You should see the default Mage-OS/Magento storefront with the Luma theme.

### Admin Panel

Navigate to:

```
http://yourdomain.local/admin
```

**Login with:**

- **Username:** `admin` (or your custom value)
- **Password:** `Admin123!` (or your custom value)

---

## Success! Your Store is Live

Congratulations! You now have a working Mage-OS installation. Here is what to do next:

### Essential Configuration

Access **Admin > Stores > Configuration** to configure:

| Setting | Location | Purpose |
| ------- | -------- | ------- |
| Store Information | General > General | Store name, address, contact |
| Base URLs | General > Web | Secure URLs for production |
| Payment Methods | Sales > Payment Methods | Enable payment gateways |
| Shipping Methods | Sales > Shipping Methods | Configure shipping options |
| Tax Rules | Sales > Tax | Set up tax calculations |

### Set Up Cron Jobs

Mage-OS requires cron for scheduled tasks (indexing, emails, etc.):

@TODO: Change to cron:install

```bash
crontab -e
```

Add this line (adjust the path to match your installation):

```
* * * * * /usr/bin/php /var/www/html/bin/magento cron:run 2>&1 | grep -v "Ran jobs by schedule" >> /var/www/html/var/log/magento.cron.log
```

---

## Troubleshooting

### Blank Page After Installation

**Cause:** Usually a cache or compilation issue.

```bash
rm -rf var/cache/* var/page_cache/* generated/*
bin/magento setup:upgrade
bin/magento cache:flush
```

### 404 Errors on Storefront Pages

**Cause:** Apache mod_rewrite not enabled.

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

For Nginx, ensure your configuration includes the rewrite rules. See the [Installation Guide](/get-started/installation#nginx-configuration).

### Composer Memory Limit Errors

**Cause:** PHP memory limit too low for Composer.

```bash
php -d memory_limit=1G /usr/local/bin/composer create-project ...
```

### OpenSearch Connection Failed

**Cause:** OpenSearch service not running.

Verify OpenSearch is running:

```bash
curl http://localhost:9200
```

You should see a JSON response with cluster information. If not, start OpenSearch:

```bash
sudo systemctl start opensearch
```

### Admin Login Not Working

**Cause:** Two-factor authentication is enabled by default.

@TODO: Suggest disable-2fa module for dev instead

Disable 2FA temporarily for development:

```bash
bin/magento module:disable Magento_AdminAdobeImsTwoFactorAuth Magento_TwoFactorAuth
bin/magento cache:flush
```

### Static Content Not Loading (CSS/JS Missing)

**Cause:** Static content not deployed or permissions issue.

```bash
bin/magento setup:static-content:deploy -f
bin/magento cache:clean
```

---

## Next Steps

Now that your store is running, explore these resources:

| Resource | Description |
| -------- | ----------- |
| [Full Installation Guide](/get-started/installation) | Detailed installation for custom environments |
| [Migration Guide](/get-started/migration-guide) | Migrating from Magento Open Source |
| [System Requirements](/get-started/system-requirements) | Detailed technical specifications |
| [Developer Documentation](https://devdocs.mage-os.org) | Full developer documentation |

### Join the Community

- **Discord:** Get real-time help from the community
- **GitHub:** Report issues and contribute code
- **Forums:** Discuss best practices and solutions

Visit [mage-os.org/community](/community) to get connected.
