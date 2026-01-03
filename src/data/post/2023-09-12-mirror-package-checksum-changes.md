---
title: "Mirror Package Checksum Changes"
publishDate: "2023-09-12T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "On Saturday, the 16. September 2023, the checksum of several of the composer packages on\_mirror.mage-os.org\_will change. This will likely lead to warnings..."
image: "~/assets/images/blog/2023/January-2023-Updates.png"
---

On Saturday, the 16. September 2023, the checksum of several of the composer packages on [mirror.mage-os.org](https://mirror.mage-os.org/) will change. This will likely lead to warnings during subsequent composer operations on projects utilizing the mirror.

There is no reason for alarm - there is a technical reason for the update.

We recently discovered a flaw in the integrity check used to confirm that Mage-OS mirror packages are identical to Magento Open Source packages. We have fixed the flaw, and have ensured all Mage-OS mirror packages are identical to their Magento Open Source counterparts.

We do not expect to have to change the checksums of released packages again.

If you are interested in details, please read on.

## Why are the checksums changing?

Ever since we started publishing self-built packages on [mirror.mage-os.org](https://mirror.mage-os.org/) we have been using GitHub actions to ensure our packages are a drop-in replacement for the packages from repo.magento.com.

### [](https://gist.github.com/Vinai/71de90b17b3f44fb7fa25169114c2a87#the-old-package-integrity-check-process)The old package integrity check process

After the packages for a given Magento Open Source Mirror release were generated, that release was installed twice:  
once using the Mage-OS composer repository, and once using the Magento composer repository.

```
Composer create-project --repository-url="https://mirror.mage-os.org" magento/project-community-edition:$VERSION ./mageos
composer create-project --repository-url="https://repo.magento.com" magento/project-community-edition:$VERSION ./magento
```

Then the check compared the versions of all installed packages using `composer show`.

```
diff <(composer show -d ./magento | sort) <(composer show -d ./mageos | sort)
```

If there were no differences, the same package versions were used in both installations, meaning the requirements of all `composer.json` files were resolved to the same package versions.

Finally, the check compared all files, excluding composer and caching files.

```
diff -rq -x "*composer*" -x "*autoload*" -x "*mage---*" ./magento ./mageos
```

If any differences were found, the mirror release failed. If all versions and files were the same, the check succeeded.

### [](https://gist.github.com/Vinai/71de90b17b3f44fb7fa25169114c2a87#the-problem)The problem

The old integrity check only checked the installed versions were identical at the point in time the two installations were made.

It turned out that in some `composer.json` files of Magento Open Source, wildcard constraints were used, while Mage-OS used exact version constraints.

For example, version 1.3.0 of the package `magento/module-adobe-stock-image` requires (among others) the package `magento/module-adobe-stock-client-api`.

Magento Open Source uses the version constraint `2.1.*`, while Mage-OS used to use `2.1.0`.

Now, when Adobe releases a new package that matches such a wildcard constraint, the new version would be installed on Magento Open Source installations, but not on Mage-OS installations.  
Consequently, the integrity check for a release that previously passed would no longer succeed, because the Mage-OS installation would not change.

Regardless of which approach to package version constraints is "better", since the goal of the Mage-OS mirror is to provide drop-in replacement packages, the Mage-OS packages had to be updated to also use the same wildcard constraints as Magento Open Source.

For more information, please refer to the [GitHub issue](https://github.com/mage-os/generate-mirror-repo-js/issues/75), where Damien Retzinger describes the problem in depth.

### [](https://gist.github.com/Vinai/71de90b17b3f44fb7fa25169114c2a87#the-new-package-integrity-check-process)The new package integrity check process

To fix the problem, the integrity check now no longer compares only the version of installed packages, but instead compares the `require`, `require-dev`, and `suggests` sections of all Mage-OS packages with their corresponding Magento Open Source counterpart directly.

This allowed us to identify all packages that might have caused installations to diverge over time.

The [new integrity check](https://github.com/mage-os/generate-mirror-repo-js/blob/develop/.github/workflows/integrity-check.yml) was written by Vladyslav Podorozhnyi during the Mage-OS Hackathon in Würzburg a few days ago. Thank you very much!

## Get Involved

Want to get involved with learning more and contributing to our package and distribution process? Join our [weekly tech calls](/?page_id=331) to find out more.

[Get Involved](/?page_id=331)
