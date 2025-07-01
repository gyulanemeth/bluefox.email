---
title: Amazon Delivery Notifications | BlueFox Email
description: AWS Delivery Notifications provide real-time feedback on the status of emails sent through Amazon SES, allowing senders to track successful deliveries and adjust sending strategies accordingly.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: AWS Delivery Notifications provide real-time feedback on the status of emails sent through Amazon SES, allowing senders to track successful deliveries and adjust sending strategies accordingly.
  - - meta
    - property: og:title
      content: Amazon Delivery Notifications | BlueFox Email
  - - meta
    - property: og:description
      content: AWS Delivery Notifications provide real-time feedback on the status of emails sent through Amazon SES, allowing senders to track successful deliveries and adjust sending strategies accordingly.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/delivery-notifications
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon Delivery Notifications | BlueFox Email
  - - meta
    - name: twitter:description
      content: AWS Delivery Notifications provide real-time feedback on the status of emails sent through Amazon SES, allowing senders to track successful deliveries and adjust sending strategies accordingly.
---
<GlossaryNavigation/>

# Amazon Delivery Notifications

**AWS Delivery Notifications** are event messages from [Amazon SES](/aws-concepts/ses) that confirm when emails have been successfully delivered to recipients' mail servers. These notifications are part of SES's event publishing system, providing senders with real-time feedback on email delivery status beyond just [bounce](/email-sending-concepts/bounces) and [complaint](/email-sending-concepts/complaints) information.

## What are Amazon Delivery Notifications?

AWS Delivery Notifications are **confirmation messages** generated when [Amazon SES](/aws-concepts/ses) successfully hands over an email to a recipient's mail server. Unlike bounce and complaint notifications (which indicate delivery failures or recipient dissatisfaction), delivery notifications provide **positive confirmation** that your message reached its intended destination's mail server. These notifications are transmitted through [Amazon SNS](/aws-concepts/sns) as **JSON-formatted events** that include detailed metadata about the delivery, including recipient email address, message ID, **timestamp of delivery**, processing time metrics, sending account details, and message tags with configuration set information. By enabling delivery notifications, you can build **comprehensive tracking systems** that monitor the full lifecycle of your messages from sending through delivery, helping to identify patterns in successful deliveries and potential optimizing opportunities.

## How Delivery Notifications Work

Delivery notifications are one component of Amazon SES's event publishing system. To receive these notifications, you need to:

1. Create an [SNS topic](/aws-concepts/sns-topics) to receive the notifications
2. Configure a SES [configuration set](https://docs.aws.amazon.com/ses/latest/dg/event-publishing-create-configuration-set.html) with event publishing enabled
3. Add an SNS event destination to the configuration set, specifically enabling delivery events
4. Include the configuration set name when sending emails
5. Set up appropriate [subscriptions](/aws-concepts/sns-subscription) to process the notification data

When an email sent with the specified configuration set is successfully delivered to the recipient's mail server, SES generates a delivery event and publishes it to the designated SNS topic. Your subscribed endpoints (like HTTP webhooks, Lambda functions, or SQS queues) then receive and process this data.

It's important to note that delivery notifications confirm delivery to the recipient's mail server, not to the recipient's inbox. The distinction matters because successful delivery to a mail server doesn't guarantee inbox placement, the message could still be filtered to spam or rejected by subsequent internal filters.

## Benefits of Using Delivery Notifications

Implementing delivery notifications provides several advantages for email senders:

- **Enhanced Reporting**: Calculate accurate delivery rates by combining delivery data with bounce and complaint metrics
- **Performance Optimization**: Use timing data to identify sending pattern improvements and infrastructure needs
- **Engagement Insights**: Compare delivery timestamps with open/click events to determine optimal sending times
- **Better Troubleshooting**: Distinguish between delivery failures and post-delivery filtering issues

## Monitoring and Managing Delivery Notifications

AWS offers multiple complementary approaches for processing delivery notification data, each suited to different operational and analytical needs.

To begin with, **CloudWatch Metrics Integration** aggregates delivery metrics across your sending activities, making it easier to visualize trends and set up alerts when delivery rates deviate from expected patterns. For deeper historical analysis, **Data Warehousing Solutions** can store the raw notification JSON data in databases, enabling teams to create detailed custom reports. Where immediate reaction is critical, **Real-time Stream Processing** with AWS Lambda functions allows for instant updates to application databases or the execution of follow-up workflows in response to delivery events Additionally, high-volume senders can leverage **Amazon Kinesis Data Firehose** to efficiently collect, process, and transform large streams of event data at scale. When these strategies are combined with the [AWS Delivery Policy](/aws-concepts/delivery-policy) feature for SNS, which controls retry behavior and ensures durability they help maintain reliable and timely delivery of notifications even during temporary processing disruptions.


## Frequently Asked Questions

### How quickly are delivery notifications generated?

Delivery notifications are typically generated within seconds of successful delivery to the recipient's mail server, though exact timing can vary based on recipient server responsiveness.

### How can I distinguish between different campaigns in delivery notifications?

Include unique message tags in your emails when sending through SES. These tags will be included in the delivery notification JSON, allowing you to filter and categorize notifications by campaign, message type, or other dimensions.

### Do delivery notifications guarantee the recipient received my message?

No, delivery notifications only confirm successful delivery to the recipient's mail server. The message could still be filtered to spam or blocked by internal filters after delivery.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SNS (Simple Notification Service)](/aws-concepts/sns)
- [AWS SNS Topics](/aws-concepts/sns-topics)
- [AWS SNS Subscription](/aws-concepts/sns-subscription)
<<<<<<< HEAD:aws-concepts/aws-delivery-notifications.md
- [AWS Delivery Policy](/aws-concepts/aws-delivery-policy)
=======
- [AWS Delivery Policy](/aws-concepts/delivery-policy)
>>>>>>> Deliverability-policy-notification:aws-concepts/delivery-notifications.md
- [Bounces](/email-sending-concepts/bounces)
- [Complaints](/email-sending-concepts/complaints)
- [Email Deliverability](/email-sending-concepts/deliverability)

<GlossaryCTA />
