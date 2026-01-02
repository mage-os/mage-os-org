---
title: 'Installation Guide'
description: 'Comprehensive installation guide for Mage-OS covering Composer, Docker, cloud, and manual installation methods.'
tagline: 'Get Started'
layout: '~/layouts/ContentPageLayout.astro'
---

This guide covers detailed installation methods for various environments. For a quick setup, see the [Quick Start Guide](/get-started/quick-start).

## On This Page

- [Installation Methods](#installation-methods)
- [Composer Installation](#composer-installation) - Production servers, custom environments
- [Docker Installation](#docker-installation) - Local development, testing
- [Cloud Deployment](#cloud-deployment) - AWS, GCP, Azure
- [Web Server Configuration](#web-server-configuration)
- [Post-Installation Setup](#post-installation-setup)
- [Troubleshooting](#troubleshooting)

---

## Installation Methods

Choose the installation method that best fits your needs:

| Method | Best For | Difficulty | Time |
|--------|----------|------------|------|
| **Composer** | Production servers, VPS, dedicated hosting | Intermediate | 30-45 min |
| **Docker (DDEV)** | Local development, quick testing | Easy | 15-20 min |
| **Docker (Warden)** | Magento-focused development teams | Intermediate | 20-30 min |
| **Docker (docker-magento)** | Production-like local environment | Intermediate | 15-20 min |
| **Cloud** | Scalable production environments | Advanced | 1-2 hours |

---

## Composer Installation

The recommended method for production installations and custom server environments.

### Prerequisites

Ensure your system meets the [System Requirements](/get-started/system-requirements):

- **PHP 8.3 or 8.4** with required extensions
- **Composer 2.8+** ([Get Composer](https://getcomposer.org/))
- **MySQL 8.4+** or **MariaDB 11.4+**
- **OpenSearch 2.19+** or **Elasticsearch 8.x**
- **Apache 2.4+** or **Nginx 1.26+**

### Step 1: Create Project

```bash
composer create-project --repository-url=https://repo.mage-os.org/ \
  mage-os/project-community-edition <install-directory>
```

Replace `<install-directory>` with your desired path or `.` for current directory.

### Step 2: Set File Permissions

```bash
cd <install-directory>
find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} +
find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} +
chown -R :www-data .
chmod u+x bin/magento
```

### Step 3: Create Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE mageos;
CREATE USER 'mageos'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL ON mageos.* TO 'mageos'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Run Installer

```bash
bin/magento setup:install \
  --base-url="http://your-domain.com/" \
  --db-host="localhost" \
  --db-name="mageos" \
  --db-user="mageos" \
  --db-password="your_password" \
  --admin-firstname="Admin" \
  --admin-lastname="User" \
  --admin-email="admin@example.com" \
  --admin-user="admin" \
  --admin-password="Admin123!" \
  --language="en_US" \
  --currency="USD" \
  --timezone="America/New_York" \
  --use-rewrites="1" \
  --search-engine="opensearch" \
  --opensearch-host="localhost" \
  --opensearch-port="9200" \
  --opensearch-index-prefix="mageos" \
  --opensearch-timeout="15"
```

### Step 5: Post-Installation

```bash
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f
bin/magento indexer:reindex
bin/magento cache:flush
```

---

## Docker Installation

Docker-based environments are ideal for local development and testing. They provide consistent, reproducible setups without modifying your host system.

We recommend one of these Docker-based options:

| Tool | Best For                                                  | Setup Time |
| ---- |-----------------------------------------------------------| ---------- |
| [DDEV](https://ddev.com/) | Easiest setup, great for beginners                        | 5 minutes |
| [docker-magento](https://github.com/markshust/docker-magento) | Production-like, excellent docs                           | 10 minutes |
| [Warden](https://warden.dev/) | Production-like, built for managing multiple environments | 10 minutes |

### Using DDEV

DDEV is the easiest way to get started with Mage-OS development. It handles all service configuration automatically.

```bash
# Install DDEV
curl -fsSL https://ddev.com/install.sh | bash

# Create project directory
mkdir mageos && cd mageos

# Configure DDEV
ddev config --project-type=magento2 --docroot=pub --php-version=8.3

# Start environment
ddev start

# Create Mage-OS project
ddev composer create-project --repository-url=https://repo.mage-os.org/ \
  mage-os/project-community-edition .

# Run installer
ddev magento setup:install \
  --base-url="https://mageos.ddev.site/" \
  --db-host="db" \
  --db-name="db" \
  --db-user="db" \
  --db-password="db" \
  --admin-firstname="Admin" \
  --admin-lastname="User" \
  --admin-email="admin@example.com" \
  --admin-user="admin" \
  --admin-password="Admin123!" \
  --search-engine="opensearch" \
  --opensearch-host="opensearch" \
  --opensearch-port="9200"

# Deploy
ddev magento setup:di:compile
ddev magento setup:static-content:deploy -f
ddev magento cache:flush
```

### Using docker-magento

[docker-magento](https://github.com/markshust/docker-magento) by Mark Shust is a production-like Docker environment with excellent documentation and community support.

```bash
# Download the setup script
curl -s https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup | bash -s -- mageos.test

# Navigate to project directory
cd mageos.test

# Install Mage-OS (instead of default Magento)
bin/removeall
bin/download --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition

# Start containers and install
bin/setup mageos.test

# Access admin panel
bin/magento admin:user:create \
  --admin-user="admin" \
  --admin-password="Admin123!" \
  --admin-email="admin@example.com" \
  --admin-firstname="Admin" \
  --admin-lastname="User"
```

**Access your store:** `https://mageos.test/`

**Features:**
- Production-ready Nginx, PHP-FPM, and Redis configuration
- Xdebug integration for debugging
- Comprehensive helper scripts (`bin/magento`, `bin/composer`, etc.)
- Excellent [documentation](https://github.com/markshust/docker-magento#readme)

### Using Warden

Warden is a Docker-based development environment specifically designed for Magento and Mage-OS projects. It provides a more advanced setup with additional features for professional development teams.

```bash
# Install Warden (macOS)
brew install davidalger/warden/warden

# Initialize Warden (first time only)
warden svc up

# Create project
mkdir mageos && cd mageos
warden env-init mageos magento2

# Start environment
warden env up

# Enter shell and install Mage-OS
warden shell
composer create-project --repository-url=https://repo.mage-os.org/ \
  mage-os/project-community-edition .

# Run installer (inside warden shell)
bin/magento setup:install \
  --base-url="https://app.mageos.test/" \
  --db-host="db" \
  --db-name="magento" \
  --db-user="magento" \
  --db-password="magento" \
  --admin-firstname="Admin" \
  --admin-lastname="User" \
  --admin-email="admin@example.com" \
  --admin-user="admin" \
  --admin-password="Admin123!" \
  --search-engine="opensearch" \
  --opensearch-host="opensearch" \
  --opensearch-port="9200"

# Deploy static content
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f
bin/magento cache:flush
```

**Access your store:** `https://app.mageos.test/`

---

## Cloud Deployment

Cloud platforms offer scalable infrastructure for production Mage-OS deployments. Below are detailed setup guides for major cloud providers.

### AWS EC2

**Recommended instance:** t3.large (minimum) or t3.xlarge for production

```bash
# Connect to your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Update system packages
sudo yum update -y

# Install required packages (Amazon Linux 2023)
sudo dnf install -y php8.3 php8.3-{bcmath,cli,common,curl,fpm,gd,intl,mbstring,mysqlnd,opcache,soap,sodium,xml,zip}
sudo dnf install -y nginx mariadb105-server composer
sudo dnf install -y opensearch

# Start services
sudo systemctl enable --now nginx mariadb opensearch php-fpm

# Create database
sudo mysql -e "CREATE DATABASE mageos; CREATE USER 'mageos'@'localhost' IDENTIFIED BY 'your_password'; GRANT ALL ON mageos.* TO 'mageos'@'localhost'; FLUSH PRIVILEGES;"

# Install Mage-OS (in /var/www/mageos)
cd /var/www
sudo composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition mageos
sudo chown -R nginx:nginx mageos

# Follow Composer installation steps 4-5 above
```

**Security group rules:**
- Port 80 (HTTP) - 0.0.0.0/0
- Port 443 (HTTPS) - 0.0.0.0/0
- Port 22 (SSH) - Your IP only

### Google Cloud Platform

**Recommended instance:** n2-standard-2 (minimum) or n2-standard-4 for production

```bash
# Connect via gcloud
gcloud compute ssh your-instance-name

# Update and install packages (Debian/Ubuntu)
sudo apt update && sudo apt upgrade -y
sudo apt install -y php8.3 php8.3-{bcmath,cli,common,curl,fpm,gd,intl,mbstring,mysql,opcache,soap,xml,zip}
sudo apt install -y nginx mysql-server composer

# Install OpenSearch (follow OpenSearch documentation)
# https://opensearch.org/docs/latest/install-and-configure/install-opensearch/debian/

# Start services
sudo systemctl enable --now nginx mysql php8.3-fpm

# Create database
sudo mysql -e "CREATE DATABASE mageos; CREATE USER 'mageos'@'localhost' IDENTIFIED BY 'your_password'; GRANT ALL ON mageos.* TO 'mageos'@'localhost'; FLUSH PRIVILEGES;"

# Install Mage-OS
cd /var/www
sudo composer create-project --repository-url=https://repo.mage-os.org/ mage-os/project-community-edition mageos
sudo chown -R www-data:www-data mageos

# Follow Composer installation steps 4-5 above
```

**Firewall rules:**
- Allow HTTP (tcp:80)
- Allow HTTPS (tcp:443)

### Azure

**Recommended VM:** Standard_D2s_v3 (minimum) or Standard_D4s_v3 for production

```bash
# Connect via Azure CLI
az ssh vm -n your-vm-name -g your-resource-group

# Update and install packages (Ubuntu)
sudo apt update && sudo apt upgrade -y
sudo apt install -y php8.3 php8.3-{bcmath,cli,common,curl,fpm,gd,intl,mbstring,mysql,opcache,soap,xml,zip}
sudo apt install -y nginx mysql-server composer

# Follow same steps as GCP above
```

**Network security group rules:**
- Allow inbound TCP 80, 443 from Any

---

## Web Server Configuration

### Apache Virtual Host

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/mageos/pub

    <Directory /var/www/mageos/pub>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/mageos-error.log
    CustomLog ${APACHE_LOG_DIR}/mageos-access.log combined
</VirtualHost>
```

### Nginx Configuration

```nginx
upstream fastcgi_backend {
    server unix:/var/run/php/php8.3-fpm.sock;
}

server {
    listen 80;
    server_name your-domain.com;

    set $MAGE_ROOT /var/www/mageos;
    set $MAGE_MODE production;

    include /var/www/mageos/nginx.conf.sample;
}
```

---

## Post-Installation Setup

After completing the installation, configure these essential settings for optimal performance.

### Configure Cron Jobs

Mage-OS requires cron for scheduled tasks like indexing, email sending, and cache management. Use Magento's built-in command to automatically configure the crontab:

```bash
# Install cron jobs for the current user
bin/magento cron:install

# Or for a specific user (e.g., www-data)
sudo -u www-data bin/magento cron:install
```

This automatically adds the necessary cron entries. To verify cron is configured:

```bash
# Check crontab entries
crontab -l

# Verify cron status in Magento
bin/magento cron:status
```

To remove cron jobs if needed:

```bash
bin/magento cron:remove
```

### Set Production Mode

For production environments, enable production mode for best performance:

```bash
bin/magento deploy:mode:set production
```

**Deploy modes explained:**

| Mode | Use Case | Performance |
|------|----------|-------------|
| `default` | Initial installation | Moderate |
| `developer` | Local development | Low (debugging enabled) |
| `production` | Live stores | Optimized |

### Enable Caches

Ensure all caches are enabled:

```bash
bin/magento cache:enable
bin/magento cache:status
```

### Install Sample Data (Optional)

For testing or demonstration, install Mage-OS sample data:

```bash
bin/magento sampledata:deploy
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f
bin/magento cache:flush
```

### Configure Redis (Recommended)

Redis significantly improves cache and session performance. Install Redis first:

```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl enable --now redis-server

# Verify Redis is running
redis-cli ping
# Should return: PONG
```

Edit `app/etc/env.php`:

```php
'cache' => [
    'frontend' => [
        'default' => [
            'backend' => 'Magento\\Framework\\Cache\\Backend\\Redis',
            'backend_options' => [
                'server' => '127.0.0.1',
                'port' => '6379',
                'database' => '0'
            ]
        ],
        'page_cache' => [
            'backend' => 'Magento\\Framework\\Cache\\Backend\\Redis',
            'backend_options' => [
                'server' => '127.0.0.1',
                'port' => '6379',
                'database' => '1'
            ]
        ]
    ]
],
'session' => [
    'save' => 'redis',
    'redis' => [
        'host' => '127.0.0.1',
        'port' => '6379',
        'database' => '2'
    ]
],
```

---

## Troubleshooting

### Common Issues

**Permission denied errors:**

```bash
sudo chown -R www-data:www-data /var/www/mageos
sudo chmod -R 755 /var/www/mageos
sudo chmod -R 775 var generated pub/static pub/media
```

**Memory limit exceeded:**

```bash
php -d memory_limit=4G bin/magento setup:di:compile
```

Or add to `php.ini`:

```ini
memory_limit = 4G
```

**Static content deployment fails:**

```bash
# Use parallel jobs and force mode
bin/magento setup:static-content:deploy -f --jobs=4

# For specific locales
bin/magento setup:static-content:deploy -f en_US en_GB --jobs=4
```

**OpenSearch/Elasticsearch connection failed:**

```bash
# Check if OpenSearch is running
curl http://localhost:9200

# Check service status
sudo systemctl status opensearch

# Restart if needed
sudo systemctl restart opensearch
```

**Admin URL forgotten:**

```bash
# Get current admin URI
bin/magento info:adminuri

# Or check env.php
grep -A2 "backend" app/etc/env.php
```

**Clear all caches and regenerate:**

```bash
rm -rf var/cache/* var/page_cache/* var/view_preprocessed/* generated/*
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f
bin/magento cache:flush
```

---

## Next Steps

- [System Requirements](/get-started/system-requirements) - Verify your setup
- [Migration Guide](/get-started/migration-guide) - Migrate from Magento
- [Quick Start Guide](/get-started/quick-start) - Quick setup overview
- [Developer Documentation](https://devdocs.mage-os.org) - Full developer docs
