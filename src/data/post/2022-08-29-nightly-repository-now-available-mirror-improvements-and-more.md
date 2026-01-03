---
title: "Nightly repository now available; Mirror improvements; and more"
publishDate: "2022-08-29T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "We are moving at a quick pace — buckle up for a fresh batch of Mage-OS updates! We reached two milestones during the last week! 🎉🎉 The first step towards an..."
---

We are moving at a quick pace — buckle up for a fresh batch of Mage-OS updates!

## Milestones

We reached two milestones during the last week! 🎉🎉

### ✅ The Mage-OS Magento® Mirror Repository

The first step towards an independent Magento Open Source distribution was the creation of an independently built mirror repository.

We did this to learn what it takes to create an automated packaging system, and to provide an open alternative to the Adobe-managed `repo.magento.com` composer package repository. Even though we do not consider it a likely scenario, if something were to happen to the `repo.magento.com` composer repository, this ensures Magento Open Source will always be available to the public.

Thanks to the QA tools created by [Damien Retzinger](https://github.com/damienwebdev) and [Daniel Sloof](https://github.com/danslo), which verify file parity and ability to install successfully, we are confident that our mirror packages are a drop-in replacement for the official Magento Open Source releases. At this time, the mirror includes all packages for Magento versions 2.3.7-p3 through 2.4.5.

To install Magento Open Source from the mirror, change `repo.magento.com` to `mirror.mage-os.org` in the `composer create-project` command or your `composer.json` file.  
No composer authentication is required. For example:

```
composer create-project --repository-url=https://mirror.mage-os.org \
    magento/project-community-edition install-dir
```

You can also create your own mirror repository using the Mage-OS tooling. This might be useful for hosters who want to provide a mirror for their customers, or offer their own open-access mirror to the public. For more information, please refer to the [readme of the repo-generator](https://github.com/mage-os/generate-mirror-repo-js#usage) project on github.

We have a list of mirror composer repositories we are aware of at  
[mage-os.org/distribution#magento-mirrors](https://mage-os.org/distribution#magento-mirrors).

If you have any questions or would like us to add your mirror, please join and ask in the #tech channel of our [Discord](http://chat.mage-os.org/).

### ✅ The Mage-OS Magento® Nightly Upstream Repository

In addition to recreating previous upstream releases of Magento Open Source, we have also started to publish a nightly release based on the current development branches of Magento Open Source.

For the first time ever it is now possible to install a version close to the next upstream release with composer, matching the latest development code, without having to wait for an official beta release.

```
composer create-project --stability alpha \
    --repository-url=https://upstream-nightly.mage-os.org \
    magento/project-community-edition install-dir
```

Keep in mind that the nightly release might be broken sometimes, depending on the state of the code in the upstream Magento git repositories.

We hope this will be useful for vendors and extension providers to track compatibility of their products with upcoming releases.

It also was a great learning opportunity for us to figure out how to determine package dependencies and package versioning.

The nightly builds are available now. We will be publishing a status page to show if the current upstream version is broken or not, soon.  
We will also continue to tweak the versioning and generation process as we learn more.

Please join our [Discord](http://chat.mage-os-org/) if you have feedback or if you are interested in the release process.

### Next Steps

Now these two milestones are completed, we are focusing on the next steps towards a Mage-OS distribution that we can improve on while keeping compatibility intact. This will include:

- Forking our mirror repositories
- Automatically merging upstream changes
- Exploring ways to handle merge conflicts as efficiently as possible
- Running tests in a GitHub CI pipeline
- Exploring ways to reduce the runtime for tests
- Cleaning up the module dependency graph
- Automating the permission setup on GitHub
- Setting up a nightly build repository for the Mage-OS distribution
- Choosing unmerged upstream PRs we want to introduce into Mage-OS
- Figuring out how to make independent releases and consolidating them with upstream releases

We look forward to working through these topics and many more over the next weeks and months.  
If you are interested in helping, please join the Mage-OS [Discord](http://chat.mage-os.org/) and start chatting! We welcome any help!

## Organizational topics

### Mage-OS Association

We will probably be using [Open Collective](https://opencollective.com/) as a platform to manage paid memberships for the Mage-OS Association. This is an important step to accomplish many of our goals for Mage-OS and the community as a whole. We expect the money raised through membership and donations to go to infrastructure and services, to hiring people to oversee and drive Mage-OS forward, and to directly funding development of the Mage-OS distribution through grants and other programs.

The membership levels are currently being discussed in the #membership channel on [Discord](http://chat.mage-os.org/). Please join and let us know your thoughts if this is of interest to you!

As always, stay safe, and keep an eye on our blog. More news is coming soon!

Best,

The Mage-OS folks!
