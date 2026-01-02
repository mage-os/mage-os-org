---
title: 'System Requirements'
description: 'Complete technical requirements for Mage-OS including PHP versions, database specifications, and server configuration.'
tagline: 'Get Started'
layout: '~/layouts/ContentPageLayout.astro'
---

This guide outlines the technical requirements for running Mage-OS in development and production environments. Verify your server meets these specifications before beginning installation.

## Quick Reference (Mage-OS 2.0)

| Component      | Minimum              | Recommended              |
| -------------- | -------------------- | ------------------------ |
| PHP            | 8.3                  | 8.4                      |
| Composer       | 2.7                  | 2.9                      |
| OpenSearch     | 2.5                  | 2.19                     |
| MariaDB        | 10.6                 | 11.4                     |
| MySQL          | 8.0                  | 8.4                      |
| RabbitMQ       | 3.12                 | 4.0                      |
| Redis / Valkey | Redis 7.0 / Valkey 7 | Valkey 8 (or Redis 7.2+) |
| Varnish        | 7.x                  | 7.6                      |
| Apache         | 2.4                  | 2.4 (latest)             |
| nginx          | 1.24                 | 1.26                     |

**Minimum** versions are the oldest supported. **Recommended** versions provide optimal performance and security.

---

## Operating System

### Production (Linux Only)

| Distribution      | Minimum Version | Notes                                    |
| ----------------- | --------------- | ---------------------------------------- |
| Ubuntu LTS        | 22.04           | Recommended for most deployments         |
| Debian            | 12              | Stable alternative                       |
| Rocky Linux       | 9               | RHEL-compatible, enterprise environments |
| AlmaLinux         | 9               | RHEL-compatible, enterprise environments |

### Development

- **macOS:** 13+ (Ventura or later)
- **Windows:** Windows 10/11 via WSL2

Production deployments require Linux. macOS and Windows are suitable for local development only.

---

## Web Server

### Apache

| Requirement              | Value             |
| ------------------------ | ----------------- |
| Version                  | 2.4+              |
| Required modules         | `mod_rewrite`     |
| Configuration            | `.htaccess` support enabled |

### nginx

| Requirement              | Value             |
| ------------------------ | ----------------- |
| Version                  | 1.24+ (1.26 recommended) |
| Configuration            | Custom rewrite rules required |

Choose one web server. nginx generally offers better performance at scale, while Apache provides easier configuration via `.htaccess` files.

---

## PHP Requirements

### Supported Versions

| Version | Status                           |
| ------- | -------------------------------- |
| PHP 8.4 | Recommended (latest features)    |
| PHP 8.3 | Supported (proven stability)     |

### Required Extensions

```
bcmath, ctype, curl, dom, fileinfo, gd, hash, iconv, intl,
json, libxml, mbstring, openssl, pcre, pdo_mysql, simplexml,
soap, sockets, sodium, xml, xsl, zip, zlib
```

Verify extensions with: `php -m | grep -i <extension_name>`

---

## Database

### Supported Databases

| Database | Minimum Version | Recommended | Notes                          |
| -------- | --------------- | ----------- | ------------------------------ |
| MySQL    | 8.0             | 8.4         | Oracle's official distribution |
| MariaDB  | 10.6            | 11.4        | Popular MySQL alternative      |
| Percona  | 8.0             | 8.0         | Enterprise MySQL variant       |

Choose one database server. MariaDB and MySQL are the most common choices for Mage-OS deployments.

### Database Settings

Recommended `my.cnf` or `my.ini` configuration:

```ini
[mysqld]
# Buffer pool: Set to 50-70% of available RAM for dedicated DB servers
innodb_buffer_pool_size = 1G

# Log file size: Larger values improve write performance
innodb_log_file_size = 256M

# Packet size: Required for large imports
max_allowed_packet = 64M

# Temp tables: Prevents disk-based temp tables for most queries
tmp_table_size = 64M
max_heap_table_size = 64M

# Connection settings
max_connections = 150
wait_timeout = 28800
```

For production servers with 8GB+ RAM, increase `innodb_buffer_pool_size` to 4G or higher.

---

## Search Engine

A search engine is **required** for Mage-OS. It powers catalog search, layered navigation, and admin grids.

### Supported Search Engines

| Engine        | Minimum Version | Recommended | Notes                              |
| ------------- | --------------- | ----------- | ---------------------------------- |
| OpenSearch    | 2.5             | 2.19        | Recommended (open source, active)  |
| Elasticsearch | 7.17            | 8.x         | Requires license for some features |

OpenSearch is recommended for new installations as it is fully open source and actively maintained by the community.

### Memory Requirements

| Environment  | Heap Size | Notes                         |
| ------------ | --------- | ----------------------------- |
| Development  | 1GB       | Suitable for small catalogs   |
| Staging      | 2GB       | Mirrors production            |
| Production   | 4GB+      | Scale based on catalog size   |

Set heap size via `ES_JAVA_OPTS` or `OPENSEARCH_JAVA_OPTS`:

```bash
export OPENSEARCH_JAVA_OPTS="-Xms4g -Xmx4g"
```

---

## Cache and Sessions

### Redis / Valkey (Recommended)

Redis or Valkey provides high-performance caching for sessions, page cache, and the application cache backend.

| Software | Minimum Version | Recommended | Notes                         |
| -------- | --------------- | ----------- | ----------------------------- |
| Valkey   | 7.0             | 8.0         | Open source Redis fork        |
| Redis    | 7.0             | 7.2+        | Industry standard             |

Valkey is recommended for new installations as an open source Redis alternative.

### Varnish (Production)

Varnish is a full-page cache that dramatically improves frontend performance. While optional for development, it is recommended for production.

| Version | Status      | Notes                     |
| ------- | ----------- | ------------------------- |
| 7.6     | Recommended | Latest stable             |
| 7.x     | Supported   | All 7.x versions work     |

---

## Message Queue

### RabbitMQ (Optional)

RabbitMQ enables asynchronous processing of bulk operations, inventory updates, and order processing. It is optional for small stores but recommended for high-traffic sites.

| Version | Status      | Notes                     |
| ------- | ----------- | ------------------------- |
| 4.0     | Recommended | Latest stable             |
| 3.12+   | Supported   | Minimum supported version |

---

## Composer

Composer is required for installing and updating Mage-OS.

| Requirement   | Value    |
| ------------- | -------- |
| Version       | 2.7+ (2.8 recommended) |
| PHP memory    | 1GB+ available during installation |
| Disk space    | 500MB+ for cache |

Verify your version with: `composer --version`

---

## Disk Space

| Purpose          | Minimum | Recommended | Notes                              |
| ---------------- | ------- | ----------- | ---------------------------------- |
| Application      | 5GB     | 10GB        | Includes vendor directory          |
| Database         | 10GB    | 50GB+       | Scales with catalog and orders     |
| Media files      | Varies  | Varies      | Product images, PDFs, downloads    |
| Logs             | 5GB     | 10GB        | Rotate logs to manage disk usage   |
| **Total Server** | 30GB    | 80GB+       | SSD storage recommended            |

Use SSD storage for optimal performance. NVMe drives provide the best results for database and search engine workloads.

---

## Server Hardware

### Minimum Requirements

| Resource | Development | Production (Small) | Production (Large) |
| -------- | ----------- | ------------------ | ------------------ |
| CPU      | 2 cores     | 4 cores            | 8+ cores           |
| RAM      | 4GB         | 8GB                | 16GB+              |
| Storage  | 30GB SSD    | 50GB SSD           | 100GB+ NVMe        |

These are baseline requirements. Actual needs depend on catalog size, traffic volume, and customizations.

---

## Compatibility Matrix

| Mage-OS Version | PHP     | MySQL | OpenSearch | Magento Base | Release Date   |
| --------------- | ------- | ----- | ---------- | ------------ | -------------- |
| 2.0             | 8.3-8.4 | 8.0+  | 2.5+       | 2.4.8-p3     | October 2025   |
| 1.3             | 8.2-8.3 | 8.0+  | 2.5+       | 2.4.7-p3     | August 2025    |
| 1.2             | 8.2-8.3 | 8.0+  | 2.5+       | 2.4.7-p2     | June 2025      |
| 1.1             | 8.1-8.2 | 8.0+  | 2.5+       | 2.4.6-p4     | April 2025     |
@TODO: Those base versions aren't right
For the latest version information, see the [Releases](/product/releases) page.

---

## Recommended Hosting Environments

### Managed Magento Hosting

These providers offer pre-configured environments optimized for Mage-OS and Magento:

| Provider    | Type                     | Notes                                   |
| ----------- | ------------------------ | --------------------------------------- |
| Hypernode   | Managed Magento hosting  | Purpose-built for Magento/Mage-OS       |
| Nexcess     | Managed Magento hosting  | Auto-scaling, managed infrastructure    |
| Cloudways   | Managed cloud platform   | Multiple cloud backends available       |

@TODO: Cover, or not? Providers vary greatly by region, quality, price

### Cloud Providers (Self-Managed)

For teams with DevOps expertise, these cloud providers offer flexible infrastructure:

| Provider      | Recommended Instance     | vCPUs | RAM  | Notes                      |
| ------------- | ------------------------ | ----- | ---- | -------------------------- |
| AWS EC2       | t3.large or larger       | 2+    | 8GB+ | Most popular choice        |
| Google Cloud  | n2-standard-2 or larger  | 2+    | 8GB+ | Strong global network      |
| Azure         | Standard_D2s_v3          | 2+    | 8GB+ | Enterprise integration     |
| DigitalOcean  | Premium Droplets 4GB+    | 2+    | 4GB+ | Cost-effective option      |
| Hetzner       | CPX31 or larger          | 4+    | 8GB+ | European data centers      |

### Development Environments

Docker-based local development environments provide consistent, reproducible setups:

| Tool     | Description                            | Best For                        |
| -------- | -------------------------------------- | ------------------------------- |
| DDEV     | Docker-based local development         | Beginners, quick setup          |
| Warden   | Docker environment for Magento         | Magento-specific workflows      |

All tools support Mage-OS out of the box with minimal configuration.

---

## Next Steps

Ready to install Mage-OS? Follow these guides:

- [Quick Start Guide](/get-started/quick-start) - Install Mage-OS in 30 minutes
- [Installation Guide](/get-started/installation) - Detailed installation instructions
- [Migration Guide](/get-started/migration-guide) - Switch from Magento Open Source
- [Releases](/product/releases) - Download the latest version
