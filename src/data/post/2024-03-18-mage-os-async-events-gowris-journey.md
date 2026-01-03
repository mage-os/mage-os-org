---
title: "Mage-OS Async Events: Gowri's Journey"
publishDate: "2024-03-18T00:00:00.000Z"
category: "Updates"
author: "Mage-OS Team"
draft: false
excerpt: "Gowri Sankar is a DevOps engineer from down under with a lot of interest in distributed systems and programming and solving problems at scale. Gowri is a..."
image: "~/assets/images/blog/2024/gowri-1.jpg"
---

Gowri Sankar is a DevOps engineer from down under with a lot of interest in distributed systems and programming and solving problems at scale. Gowri is a frequent attendee and contributor to Mage-OS via the technical working group.

## **Introduction**

Over the past few months I've been helping out Mage-OS with getting asynchronous events over the finish line. A lot has happened since then. I got to visit Amsterdam and its picturesque canals, experience one of the longest direct flights in the world from Perth to London \[1\], enjoy a lot of Dutch pastries and speak at a conference about building real-time webhooks with Magento.

In this post, I want to build on our work so far, expanding on what asynchronous events are and its applications, and why they’re useful.

## **Event-Driven Architecture**

If you’ve written a module (or even any framework) before, you’re probably familiar with event observers \[2\]. They are a way to write code which reacts to a certain event happening within the system. For example, when a new user signs in, you may want to record their login activity. This in a sense, is an application of event-driven architecture.

In object-oriented programming it can refer to the observer pattern. In distributed systems it could mean different services communicate asynchronously through a message broker.

There’s a variety of applications, but the underlying idea is the same. Event-driven architecture is a software design pattern that focuses on the production, consumption, and reaction to events in a system.

## **Integrations**

There’s one area where event-driven architecture can shine in Magento and it is integrations. Currently, there are many different and often bespoke approaches when sending data out of Magento.

I’ve often seen integrations that are file-based where a simple cron job runs on a schedule and writes to /var. This is far from ideal for many reasons. There’s also network-based integrations that’s akin to a single system or a vendor. For example, a payment provider’s module will likely only be able to send data out to their own services.

There’s an obvious problem here though. The framework doesn’t provide any standard tooling. A module’s author is responsible for managing how that data is pulled out. It could be file-based, FTP, HTTP or with emails if you’d like to live on the edge.

Then there’s the murky problem of error handling. Anything that can go wrong will go wrong. The external system could be in a scheduled maintenance window, have an outage or even have network packets lost in transit. It is within the module to decide how failures should be handled. It could take the simple route of simply logging it to a custom log file, to a more sophisticated approach of having a retry job somewhere.

They also need to be more flexible. If I wanted to send the same event to a second system, a third and a fourth, chances are I’ll have to modify the module each time and deploy the changes. If I want to send a different set of data but to an existing system(s), that’s again another deployment.

I would also be confident in saying that observability is the one thing that’s nearly impossible to achieve in integrations today. There simply isn’t a way to collect any sort of metrics to later pull up a dashboard and say “Ok, how many individual integrations have failed, where, when and why?” I believe we can do far better than looking through thousands of lines of error log files or emails to an error inbox saying something failed.

It’s also far from ideal when we’re migrating between systems. For example, if we had customer platform A and we’re migrating to customer platform B, we’d likely have to install platform B’s module alongside platform A. Make them work together for a while, and then at some time in the future, disable and remove platform A’s module.

That’s already a fair few points that describe the subpar developer, operations and merchant experience.

We would like our integrations to be

1. Fast and scalable, so we can have a high throughput stream of events enabling real-time systems like webhooks.

3. Fault-tolerant. If something fails, it shouldn’t be lost in an ocean of events. We should be able to retry as many times as we want automatically and manually.

5. Flexible such that modifications don’t need a code change and a deployment.

7. Observable so that we can add telemetry tools to collect and aggregate metrics.

<figure>

![Gowri speaking at Meet Magento NL](~/assets/images/blog/2024/gowri-mmnl-talk-684x1024.jpg)

<figcaption>

Gowri speaking at Meet Magento NL

</figcaption>

</figure>

## **Streaming Events**

With the asynchronous events module, it’s possible to build a real-time webhooks delivery system like GitHub, Stripe or Shopify. Webhooks are a perfect candidate to build an event-driven integration system because it is possible to make them real-time, observable and fault-tolerant.

To provide some more flavour of what I’m talking about, we can look at how a webhook-based integration system addresses the shortcomings we just discussed.

1. Webhooks powered by asynchronous events run in a dedicated queue consumer process. It’s possible to offload this entirely off of your main web server.

3. Asynchronous events are fault-tolerant by default. The framework will retry retryable errors (think 50x error codes for HTTP) with exponential backoff.

5. Asynchronous events are subscription-based, it’s possible to add or disable subscriptions without needing to touch code or do a deployment.

7. Events are recorded in a log and they are optionally indexed into Elasticsearch, which makes it a breeze to query failures and anomalies with queries.

At its core, the module provides a framework to define events that can be listened to outside of the main request thread in Magento. When we talk about asynchronous, we’re actually talking about this and not promises or futures found in other languages.

Defining an asynchronous event is similar to a regular event.

```
<?xml version="1.0"?>

<config

    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

    xsi:noNamespaceSchemaLocation="urn:magento:module:MageOS_AsyncEvents:etc/async_events.xsd"

>

    <async_event name="sales.order.created">

        <service class="Magento\Sales\Api\OrderRepositoryInterface" method="get"/>

    </async_event>

</config>
```

Similar to an event observer, an async event has a name. The service class and method define what the shape of the event’s data should resolve to (Remember that we only dispatch the event with minimal parameters; the data is resolved later, hence asynchronous).

In my opinion,  this is a great way to declare async events because there’s the huge benefit of reusability. Should the data interface be changed in a future version of Magento, you can be sure that the async event (and your webhook integrations) will automatically receive them too! This is because we’re re-using the same data transfer objects as the web APIs. Not only that, but it works with any plugins added on them too!

## **The Async Runtime**

By design, the core module does not define or dispatch any events. A separate package like [mageos-common-async-events](https://github.com/mage-os/mageos-common-async-events) covers several standard events and dispatches them at the appropriate places. But dispatching an event is straightforward in itself.

```
public function execute(Observer $observer): void

{

    /** @var Order $object */

    $object = $observer->getEvent()->getData('order');

    // arguments are the inputs required by the service class in the asynchronous

    // event definition in async_events.xml

    // e.g: Magento\Sales\Api\OrderRepositoryInterface::get

    $arguments = ['id' => $object->getId()];

    $data = ['sales.order.created', $this->json->serialize($arguments)];

    $this->publisher->publish(

        QueueMetadataInterface::EVENT_QUEUE,

        $data

    );

}
```

It is not any different from publishing a message to a topic in Magento. The PublisherInterface takes in the event queue as the topic name and a serialised set of arguments that are needed to resolve the data later.

## **Notifying Subscribers**

<figure>

![Example event-driven integrations from Mage-OS to various external platforms](~/assets/images/blog/2024/async-events-1024x660.png)

<figcaption>

Example event-driven integrations from Mage-OS to various external platforms

</figcaption>

</figure>

Events are delivered to the recipient by a concept called notifiers. They’re a topic for another day, but just remember that a notifier is responsible for sending it somewhere. It could support any protocol or application in theory. For example, HTTP, Amazon EventBridge, AMQP, Kafka, raw TCP or even just stdout if you want to simply stream it.

A subscription comes in place to tie in the event to the destination. Subscriptions are created via the rest API provided by the module.

```
curl --request POST 'https://dev.mageos.internal/rest/V1/async_event' \

--header 'Authorization: Bearer TOKEN' \

--header 'Content-Type: application/json' \

--data-raw '{

    "asyncEvent": {

        "event_name": "sales.order.created",

        "recipient_url": "https://example.com/order_created",

        "verification_token": "sha-signing-secret",

        "metadata": "http"

    }

}'
```

The metadata field is important. Here it describes that this subscription is http-based. Once this subscription is created, all sales.order.created in Magento will be sent to the recipent url specified in the subscription.

```
curl --request POST 'https://dev.mageos.internal/rest/V1/async_event'' \

--data-raw '{

    "asyncEvent": {

        "event_name": "sales.order.created",

        "recipient_url": "arn:aws:events:ap-southeast-2:005158166381:rule/Test.EventBridge.Rule",

        "verification_token": "sha-signing-secret",

        "metadata": "amazon-eventbrige"

    }

}'
```

Here’s another example to send the data to Amazon EventBrige. Once this subscription is created, the sales.order.created will flow to the HTTP endpoint and the Amazon Event Bus. Note that we did not have to do a deployment in order to send the data to another platform!

With that, we would have

1. All `sales.order.created` events will be processed asynchronously without having a hiccup on your request thread, meaning it doesn’t affect users directly if one of those destinations is down or needs multiple retries.

3. Failures and back pressure handling are taken care of by the framework. If one or both destinations are unreachable, the framework will appropriately schedule retries with backoff. If they’re still unreachable, we have an archive of events that we can replay in the future.

5. All deliveries are logged and indexed in the admin panel, which we can query using the Lucene Query Syntax \[3\].

These are just the beginnings of what is possible with asynchronous events. The goal is to have wider adoption of async events just like regular events. If extension vendors and developers leverage the tools provided by the framework, it should develop into a very robust ecosystem that is standardised, functional and one that benefits everyone.

I'm delighted that Async Events is a part of Mage-OS. I've enjoyed working on it and it has been fantastic to present it at a conference in Amsterdam and see all the support for it.

Now of course, I had to put on my tourist hat for the next few days and explore every nook and cranny of this vibrant city, immersing myself in its culture, history, and hidden gems, leaving me with unforgettable memories.

![Amsterdam](~/assets/images/blog/2024/amsterdam-768x1024.jpg)

Thank you, and see you next time Amsterdam!

* * *

###### Learn More

Find out more about Mage-OS's Async Events on GitHub:

- [Base Module](https://github.com/mage-os/mageos-async-events)

- [Common Events](https://github.com/mage-os/mageos-common-async-events)

- [Admin UI](https://github.com/mage-os/mageos-async-events-admin-ui)

###### Get Involved

If you want to help contribute to Asnyc Events or anything else Mage-OS related then join our Discord server and one of our weekly meetings

[Join Discord](http://chat.mage-os.org/)

[Get Involved](/?page_id=331)

###### References

1. [https://en.wikipedia.org/wiki/Longest\_flights#Longest\_passenger\_flights](https://en.wikipedia.org/wiki/Longest_flights#Longest_passenger_flights)

3. [https://refactoring.guru/design-patterns/observer](https://refactoring.guru/design-patterns/observer)

5. [https://lucene.apache.org/core/2\_9\_4/queryparsersyntax.html](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html)

<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<script>hljs.highlightAll();</script>
