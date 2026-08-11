---
title: Mage-OS 3.4.0 – Security Release
excerpt: Ports Adobe's August security patch (APSB26-92), covering access-control fixes in the admin media gallery, product review saving and customer account edit. All 3.x users should upgrade promptly.
publishDate: 2026-08-11T18:00:00
draft: false
category: Releases
image: ~/assets/images/blog/2026/New-Mage-OS-Website.png
imageAlt: ''
author: mage-os-team
---

**Mage-OS Distribution 3.4.0** is now available. This is a **security release** and we recommend upgrading promptly.

It ports Adobe's isolated security patch `249-2026-08-001-CE`, released as part of [security bulletin APSB26-92](https://helpx.adobe.com/security/products/magento/apsb26-92.html), and includes one fix for a crash on the admin new-product page. It is built on the same **Magento Open Source 2.4.9** base as 3.3.0, with no dependency additions or removals and no change to PHP support, so it remains a drop-in upgrade from 3.3.x.

One thing to read before you upgrade: the media gallery fix deliberately changes admin behaviour, and some administrator roles will lose access they currently have. See the upgrade notes below.

### Security

Adobe ships these fixes as `vendor/`-level isolated patches rather than as a tagged Magento release, so there is no new upstream version to move to — 3.4.0 tracks Magento Open Source 2.4.9, the same as 3.3.0. We have mapped the patch onto the Mage-OS source tree so you get it through a normal Composer upgrade.

**For the full issue list, CVE identifiers and severity ratings, see [APSB26-92](https://helpx.adobe.com/security/products/magento/apsb26-92.html).** Adobe rates the most severe issue in the bulletin as critical (CVSS 9.1).

What changed in Mage-OS:

- **Media gallery operations in the WYSIWYG image browser now honour granular permissions.**
  The controllers behind the legacy image browser all inherited the single `Magento_Cms::media_gallery` resource, so the fine-grained upload, insert, delete, create-folder and delete-folder permissions — which already existed, and were already enforced in the newer media gallery UI — were ignored. Each controller now checks its own resource.

- **Saving a product review no longer accepts a review ID from the request body.**
  The admin review save controller passed submitted data straight through, so a crafted `review_id` could reassign the identity of the review that had just been loaded and validated. That field is now discarded before the data is applied.

- **The customer account edit form no longer repopulates unfiltered session data.**
  Form data held in the session was rebuilt into the customer object without being checked against the form definition, allowing attributes outside the account edit form — including a foreign entity ID — into the rendered page. Data is now restricted to the attributes the form declares, and the customer ID is forced back to the session customer.

The underscore.js update covered by the same bulletin already shipped in Mage-OS 3.3.0 and needs no action here.

The affected code lives in core packages that Mage-OS 3.0.0 through 3.3.0 pin at exact versions, so there is no practical per-package workaround. Upgrading is the fix.

### Other fixes

- **The admin new-product page no longer throws a `TypeError`** when the `type` parameter is missing or is not a string. ([#318](https://github.com/mage-os/mageos-magento2/pull/318)) by [@michielgerritsen](https://github.com/michielgerritsen)

### Upgrade notes

**Some administrators will lose media gallery access, and this is intentional.** After upgrading, any admin role that has **Content > Media Gallery** but does *not* have the individual *Upload assets*, *Insert assets*, *Delete assets*, *Create folder* or *Delete folder* resources will find those operations denied in the WYSIWYG image browser. Previously the top-level permission was enough on its own.

The good news is you can prepare ahead of time: those granular resources already exist in 3.3.0 and earlier — they simply were not enforced by this part of the admin — so you can review your admin roles and grant them explicitly *before* upgrading.

**Customer account edit form repopulation is stricter.** If your store renders customer attributes on the account edit page that are not declared on the `customer_account_edit` form, those values will no longer survive a failed validation round-trip. Attributes correctly declared on the form are unaffected.

**`Magento_Cms` now depends on `Magento_MediaGalleryUiApi`.** Both modules ship in the standard distribution, so no action is needed for normal installations. Custom distributions that strip `Magento_MediaGalleryUiApi` will need to keep it.

### Our foundation

Mage-OS 3.4.0 is built on **Magento Open Source 2.4.9**, the same upstream base as 3.3.0, 3.2.0, 3.1.0 and 3.0.0. For details on the upstream release, see the [Magento Open Source 2.4.9 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-9).

The certified stack is unchanged from 3.3.0: PHP 8.4, Composer 2.10.2, MySQL 8.4, OpenSearch 3, RabbitMQ 4.1, Valkey 8, Varnish 7.7 and nginx 1.28.

Every bundled add-on carries the same version as in 3.3.0, and there are no dependency additions, removals or constraint changes anywhere in the distribution.

Mage-OS 3.3.0 reaches end of life with this release.

### Thanks to everyone who contributed!

This release was made possible by:

[@marcelmtz](https://github.com/marcelmtz), [@michielgerritsen](https://github.com/michielgerritsen), [@rhoerr](https://github.com/rhoerr)

With upstream credit to Adobe for the security patch this release ports.

### How to upgrade

#### Upgrading from Mage-OS 3.3.x

```bash
composer require mage-os/product-community-edition=3.4.0 --no-update
composer update
bin/magento setup:upgrade
```

#### Upgrading from an older Mage-OS version

```bash
composer require mage-os/product-community-edition=^3.4 --no-update
composer update
bin/magento setup:upgrade
```

#### Migrating from Adobe Commerce or Magento Open Source

See our [migration guide](/get-started/migration-guide) for detailed instructions on switching to Mage-OS.

We hope you enjoy Mage-OS 3.4.0. As always, please report any issues on [GitHub](https://github.com/mage-os/mageos-magento2/issues) and join the conversation on [Discord](/discord-channel).
