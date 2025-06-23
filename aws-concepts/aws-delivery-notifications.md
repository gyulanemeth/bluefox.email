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
      content: https://bluefox.email/aws-concepts/aws-delivery-notifications
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

# AWS Delivery Notifications

**AWS Delivery Notifications** are event messages from [Amazon SES](/aws-concepts/aws-ses) that confirm when emails have been successfully delivered to recipients' mail servers. These notifications are part of SES's event publishing system, providing senders with real-time feedback on email delivery status beyond just [bounce](/email-sending-concepts/bounces) and [complaint](/email-sending-concepts/complaints) information.

## What are AWS Delivery Notifications?

AWS Delivery Notifications are confirmation messages generated when [Amazon SES](/aws-concepts/aws-ses) successfully hands over an email to a recipient's mail server. Unlike bounce and complaint notifications (which indicate delivery failures or recipient dissatisfaction), delivery notifications provide positive confirmation that your message reached its intended destination's mail server.

These notifications are transmitted through [Amazon SNS](/aws-concepts/aws-sns) as JSON-formatted events that include detailed metadata about the delivery, such as:

- Recipient email address
- Message ID
- Timestamp of delivery
- Processing time metrics
- Sending account details
- Message tags and configuration set information

By enabling delivery notifications, you can build comprehensive tracking systems that monitor the full lifecycle of your messages from sending through delivery, helping to identify patterns in successful deliveries and potential optimizing opportunities.

## How Delivery Notifications Work

Delivery notifications are one component of Amazon SES's event publishing system. To receive these notifications, you need to:

1. Create an [SNS topic](/aws-concepts/aws-sns-topics) to receive the notifications
2. Configure a SES [configuration set](https://docs.aws.amazon.com/ses/latest/dg/event-publishing-create-configuration-set.html) with event publishing enabled
3. Add an SNS event destination to the configuration set, specifically enabling delivery events
4. Include the configuration set name when sending emails
5. Set up appropriate [subscriptions](/aws-concepts/aws-sns-subscription) to process the notification data

When an email sent with the specified configuration set is successfully delivered to the recipient's mail server, SES generates a delivery event and publishes it to the designated SNS topic. Your subscribed endpoints (like HTTP webhooks, Lambda functions, or SQS queues) then receive and process this data.

It's important to note that delivery notifications confirm delivery to the recipient's mail server, not to the recipient's inbox. The distinction matters because successful delivery to a mail server doesn't guarantee inbox placement — the message could still be filtered to spam or rejected by subsequent internal filters.

## Benefits of Using Delivery Notifications

Implementing delivery notifications provides several advantages for email senders:

**Enhanced Reporting and Analytics** becomes possible by combining delivery data with bounce and complaint metrics to calculate accurate delivery rates across different campaigns, recipient segments, and sending periods. This complete delivery funnel visibility helps identify the true reach of your email communications.

**Performance Optimization** is supported through detailed timing data in delivery notifications, including how long message processing took. This information helps identify potential sending pattern optimizations or infrastructure improvements needed to enhance delivery speed.

**Recipient Engagement Tracking** becomes more precise when delivery timestamps are compared against open and click events. This reveals how quickly recipients engage with delivered messages and helps identify optimal sending times for different audience segments.

**Improved Troubleshooting** is possible because delivery notifications provide confirmation of successful handoff to recipient mail servers. When combined with recipient feedback about missing emails, this information helps distinguish between delivery failures and post-delivery filtering issues.

## Monitoring and Managing Delivery Notifications

AWS provides several approaches for processing delivery notification data:

Amazon CloudWatch metrics can be configured to aggregate delivery data across your sending activities, enabling trend visualization, alerting on delivery rate changes, and long-term performance monitoring. For more detailed analysis, the notification JSON can be parsed and stored in databases or data warehouses for custom reporting and historical analysis.

Stream processing can be implemented via AWS Lambda functions that receive notifications in real-time and update application databases or trigger follow-up actions based on delivery confirmation. For high-volume senders, Amazon Kinesis Data Firehose can be used to efficiently collect, transform, and load delivery event data into analytics systems.

When combined with the [AWS Delivery Policy](/aws-concepts/aws-delivery-policy) feature for SNS, you can ensure that even during temporary processing outages, your systems will eventually receive all delivery notifications according to your specified retry patterns.

## Frequently Asked Questions

### How quickly are delivery notifications generated?

Delivery notifications are typically generated within seconds of successful delivery to the recipient's mail server, though exact timing can vary based on recipient server responsiveness.

### Do delivery notifications count against my AWS SNS quota?

Yes, each delivery notification sent to SNS counts as a published message for quota and billing purposes, which is why selective implementation is recommended for high-volume senders.

### How can I distinguish between different campaigns in delivery notifications?

Include unique message tags in your emails when sending through SES. These tags will be included in the delivery notification JSON, allowing you to filter and categorize notifications by campaign, message type, or other dimensions.

### Do delivery notifications guarantee the recipient received my message?

No, delivery notifications only confirm successful delivery to the recipient's mail server. The message could still be filtered to spam or blocked by internal filters after delivery.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns)
- [AWS SNS Topics](/aws-concepts/aws-sns-topics)
- [AWS SNS Subscription](/aws-concepts/aws-sns-subscription)
- [AWS Delivery Policy](/aws-concepts/aws-delivery-policy)
- [Bounces](/email-sending-concepts/bounces)
- [Complaints](/email-sending-concepts/complaints)
- [Email Deliverability](/email-sending-concepts/deliverability)

<GlossaryCTA />
