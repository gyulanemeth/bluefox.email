---
title: Amazon Delivery Policy | BlueFox Email
description: AWS Delivery Policies allow you to define how Amazon SNS retries message delivery when server-side errors occur or when messages cannot be delivered to specific endpoints.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: AWS Delivery Policies allow you to define how Amazon SNS retries message delivery when server-side errors occur or when messages cannot be delivered to specific endpoints.
  - - meta
    - property: og:title
      content: Amazon Delivery Policy | BlueFox Email
  - - meta
    - property: og:description
      content: AWS Delivery Policies allow you to define how Amazon SNS retries message delivery when server-side errors occur or when messages cannot be delivered to specific endpoints.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-delivery-policy
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon Delivery Policy | BlueFox Email
  - - meta
    - name: twitter:description
      content: AWS Delivery Policies allow you to define how Amazon SNS retries message delivery when server-side errors occur or when messages cannot be delivered to specific endpoints.
---

# Amazon Delivery Policy

**AWS Delivery Policy** is a configuration mechanism in [Amazon SNS](/aws-concepts/aws-sns) that defines how the service handles message delivery attempts when temporary failures occur. It enables fine-grained control over retry behavior for notifications, ensuring that important messages have the best chance of reaching their destinations even during transient issues.

## What is an Amazon Delivery Policy?

A delivery policy is a **JSON document** that specifies how AWS SNS should handle message delivery retries when server-side errors occur (such as service unavailability) or when messages cannot be delivered to specific endpoints (like **HTTP**, **Amazon SQS**, or **AWS Lambda**). The policy defines parameters like how many times to retry, how long to wait between attempts, and the backoff strategy to use.

By default, Amazon SNS uses a standard retry policy, but custom delivery policies provide greater flexibility for critical messaging scenarios where delivery assurance is paramount. You can configure delivery policies at both the [SNS topic](/aws-concepts/aws-sns-topics) level (applying to all subscriptions) or for individual [subscriptions](/aws-concepts/aws-sns-subscription) (overriding the topic-level policy).

## Key Components of Delivery Policies

Delivery policies contain these essential parameters that control retry behavior:

| Parameter | Description |
|-----------|-------------|
 **Maximum Delivery Attempts** | Total delivery attempts including initial try |
| **Retry Delay** | Time before first retry |
| **Maximum Delay** | Upper limit on time between retries |
| **Backoff Function** | Retry timing pattern |
| **Minimum Delay Retries** | Initial retries using minimum delay |

## How Delivery Policies Work with Email Notifications

When using Amazon SNS to handle [Amazon SES](/aws-concepts/aws-ses) feedback notifications (such as bounces, complaints, or delivery confirmations), delivery policies ensure these critical signals aren't lost due to temporary processing issues.

For example, if your system processes bounce notifications to maintain list hygiene, a robust delivery policy ensures that even if your endpoint is temporarily unavailable, SNS will continue retry attempts based on your configuration, preventing the permanent loss of important [deliverability](/email-sending-concepts/deliverability.md) data.

The delivery policy works alongside the [Amazon SNS Dead-Letter Queue (DLQ)](https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html) feature, which can capture messages that fail delivery after all retry attempts for later processing or analysis.

## Frequently Asked Questions

### Can delivery policies prevent message loss entirely?

No, while they significantly reduce the risk of message loss due to temporary issues, they can't guarantee delivery if permanent errors occur or if all retry attempts fail.

### Do delivery policies affect SNS pricing?

Yes, additional retry attempts count as message deliveries in the SNS pricing model, so aggressive retry policies may increase costs.

### Can I apply different policies to different types of notifications?

Yes, by using different SNS topics or by configuring subscription-level delivery policies that override the topic-level settings.

### How do delivery policies interact with SES event publishing?

SES publishes events to SNS once, but the delivery policy controls how SNS delivers those events to your endpoints, providing resilience for your email event processing.

## Related Content

- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns)
- [AWS SNS Topics](/aws-concepts/aws-sns-topics)
- [AWS SNS Subscription](/aws-concepts/aws-sns-subscription)
- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS Delivery Notifications](/aws-concepts/aws-delivery-notifications)
- [Bounces](/email-sending-concepts/bounces)
- [Complaints](/email-sending-concepts/complaints)

<GlossaryCTA />
