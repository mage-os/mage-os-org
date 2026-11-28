---
name: mage-os
description: Install, upgrade or migrate to Mage-OS, the community-driven distribution of Magento Open Source. Use when creating a new Mage-OS store, switching an existing Magento Open Source 2.4 project to Mage-OS, upgrading a Mage-OS project to a newer release (for example 3.x to 4.0), or when you need Mage-OS system requirements, Composer package names or repository URLs.
compatibility: Needs a shell with PHP 8.3+, Composer 2.10.2+ and access to https://repo.mage-os.org/. Store commands run through the project's bin/magento CLI.
metadata:
  mage-os-version: '4.0.0'
  source: https://mage-os.org/get-started
---

# Mage-OS

Mage-OS is a community-driven distribution of Magento Open Source, maintained by the not-for-profit Mage-OS Association. Mage-OS 4.0 is built on Magento Open Source 2.4.9.

- Composer packages come from **https://repo.mage-os.org/** and use the `mage-os/` vendor (`mage-os/product-community-edition`, `mage-os/module-catalog`, …).
- PHP namespaces and module names stay `Magento\…` / `Magento_…`, and the codebase structure matches Magento Open Source. Magento extensions, themes (Luma, Hyvä and others) and customizations work with little or no change.
- `bin/magento` is the CLI. Run every command below from the project root.

Before pinning versions, check the current release on https://mage-os.org/product/releases.

## Rules

- Back up the database, files, `pub/media` and `app/etc/env.php` before an upgrade or migration.
- Migrate and upgrade on a local or staging copy first, never directly on production.
- Never edit `vendor/`. Extend through modules: plugins, observers, preferences, layout XML and declarative schema (`db_schema.xml`).
- Ask before running destructive commands (dropping databases, `rm -rf`, `composer remove`) on an existing store.

## System requirements (Mage-OS 4.0)

| Component | Minimum | Recommended |
| --- | --- | --- |
| PHP | 8.3 | 8.5 |
| Composer | 2.10.2 | 2.10.2+ |
| MySQL / MariaDB / Percona | 8.4 / 11.4 / 8.4 | 8.4 / 12.3 / 8.4 |
| OpenSearch (or Elasticsearch 8.x) | 2 | 3 |
| Redis / Valkey | 7.2 / 7.0 | Valkey 8.0 |
| RabbitMQ (optional) | 4.0 | 4.1 |
| Varnish (production) | 7.x | 7.7 |
| Web server | Apache 2.4 or nginx 1.26 | nginx 1.28 |

Production requires Linux. macOS 14+ and Windows 10/11 (WSL2) are for local development only; Docker-based tools such as DDEV, Warden or docker-magento are recommended there.

Required PHP extensions: bcmath, ctype, curl, dom, fileinfo, gd, hash, iconv, intl, json, libxml, mbstring, openssl, pcntl, pcre, pdo_mysql, simplexml, soap, sockets, sodium, xml, xsl, zip, zlib. Check with `php -m`.

Full list: https://mage-os.org/get-started/system-requirements

## Install a new store

### With DDEV or Warden: Mage-OS Installer

The [Mage-OS Installer](https://github.com/mage-os-lab/mage-os-installer) creates the project, database and `setup:install` run for DDEV and Warden. Download the binary for your platform from its [latest release](https://github.com/mage-os-lab/mage-os-installer/releases/latest) (or `go install github.com/mage-os-lab/mage-os-installer@latest`), then run it in the directory that should contain the project:

```bash
mage-os-install
```

It asks for the project name, environment, admin credentials, and shows the `setup:install` command before running it. The store is then at `https://{project}.test` (DDEV) or `https://app.{project}.test` (Warden).

### Anywhere else: Composer

1. Create the project (use `.` for the current directory, or pin a version with `mage-os/project-community-edition:4.0.0`):

   ```bash
   composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition <install-directory>
   ```

   For the experimental Minimal Distribution, which installs only the essential modules, use `mage-os/project-minimal-edition` instead and add packages with `composer require mage-os/<package>`.

2. Create an empty MySQL/MariaDB database and a user with all privileges on it.

3. Install. `bin/magento install` asks for every setting interactively; for scripted setups pass flags:

   ```bash
   bin/magento setup:install \
     --base-url=http://mystore.local/ \
     --db-host=localhost --db-name=mage_os --db-user=mage_os_user --db-password='<password>' \
     --admin-firstname='<first>' --admin-lastname='<last>' --admin-email='<email>' \
     --admin-user='<username>' --admin-password='<password>' \
     --language=en_US --currency=USD --timezone=America/New_York --use-rewrites=1 \
     --search-engine=opensearch --opensearch-host=localhost --opensearch-port=9200
   ```

4. Set permissions, compile and deploy:

   ```bash
   find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} +
   find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} +
   chmod u+x bin/magento
   bin/magento setup:di:compile
   bin/magento setup:static-content:deploy -f
   bin/magento cache:flush
   ```

5. Set the mode: `bin/magento deploy:mode:set developer` locally, `production` for live stores.

The storefront is at the base URL and the admin at `<base-url>/admin`. Admin two-factor authentication is on by default. For local development only, this module turns it off in developer mode and keeps it on in production:

```bash
composer require --dev markshust/magento2-module-disabletwofactorauth
bin/magento module:enable MarkShust_DisableTwoFactorAuth
bin/magento setup:upgrade
```

Details, Docker and cloud setups: https://mage-os.org/get-started/installation

## Migrate from Magento Open Source

Mage-OS swaps the Magento product packages for the Mage-OS ones; the database and code structure stay the same.

1. Check the Magento version (`bin/magento --version`). The migration script needs Magento Open Source 2.4.8 or later; update older stores to the latest Magento Open Source release first.
2. Back up:

   ```bash
   mysqldump -u <user> -p <database> > backup.sql
   tar -czvf magento-backup.tar.gz /path/to/magento
   ```

3. On a local or staging copy in developer mode (never on production), run the official migration script from the Magento root. It adds the Mage-OS repository and swaps the packages:

   ```bash
   bash <(curl -s https://raw.githubusercontent.com/mage-os-lab/migrate-m2-to-mageos/refs/heads/main/migrate-to-mage-os.sh)
   ```

   Script documentation: https://github.com/mage-os-lab/migrate-m2-to-mageos

4. Upgrade and rebuild:

   ```bash
   bin/magento setup:upgrade
   bin/magento setup:di:compile
   bin/magento setup:static-content:deploy -f
   bin/magento indexer:reindex
   bin/magento cache:flush
   ```

5. Verify: `bin/magento --version` reports Mage-OS. Test checkout, the admin and third-party integrations, then repeat on production in a maintenance window (`bin/magento maintenance:enable` / `maintenance:disable`).

To roll back, restore the backup, or switch the packages back:

```bash
composer config repositories.0 composer https://repo.magento.com/
composer require magento/product-community-edition --no-update
composer remove mage-os/product-community-edition --no-update
composer update --no-plugins --with-all-dependencies
bin/magento setup:upgrade
```

Full guide: https://mage-os.org/get-started/migration-guide

## Upgrade Mage-OS

```bash
composer require mage-os/product-community-edition=^4.0 --no-update
composer update
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f
bin/magento cache:flush
```

Read the release notes of every version you skip: https://mage-os.org/product/releases

Upgrading to 4.0 in particular:

- If the root `composer.json` requires `mage-os/module-meta-robots-tag` or `mage-os/module-hreflang` directly, remove them first (`composer remove mage-os/module-meta-robots-tag mage-os/module-hreflang --no-update`). `mage-os/module-seo` replaces both and imports their settings.
- Recompile after upgrading: the compiled DI format changed, and extensions that read compiled configuration directly may need attention.
- Fill in Marketing > SEO > Organization; structured data and the store's `/llms.txt` depend on it.
- Make sure queue consumers run under cron or a supervisor (`mageosSeoFeedRegenerate` builds SEO and AEO documents).
- `n98/magerun2-dist` moves to `^10.0`; check scripts and CI that call magerun.
- Passkey login, AEO documents and AI-crawler rules, Stock Visualizer, source-level reservations and the Mago AI assistant are off by default.

## Help

- Developer documentation: https://devdocs.mage-os.org/
- Bugs and issues: https://github.com/mage-os/mageos-magento2/issues
- Community and support: https://mage-os.org/discord-channel
- All mage-os.org pages as Markdown: https://mage-os.org/llms.txt
