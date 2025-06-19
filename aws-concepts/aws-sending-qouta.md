---
title: Amazon SES Sending Quotas | BlueFox Email
description: Learn about AWS SES sending quotas, how they work, how to increase them, and best practices for managing your email sending limits.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn about AWS SES sending quotas, how they work, how to increase them, and best practices for managing your email sending limits.
  - - meta
    - property: og:title
      content: Amazon SES Sending Quotas | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about AWS SES sending quotas, how they work, how to increase them, and best practices for managing your email sending limits.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-sending-quota
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon SES Sending Quotas | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about AWS SES sending quotas, how they work, how to increase them, and best practices for managing your email sending limits.
---

# Amazon SES Sending Quotas

**Amazon SES sending quotas** define how many emails you can send in a 24-hour period and at what rate per second. These quotas help maintain the stability of [SES](/aws-concepts/aws-ses.md) infrastructure and protect sender reputation.

## Understanding SES Quotas

Each SES account has a **Daily Sending Quota** (e.g., [200 emails/day in sandbox](https://docs.aws.amazon.com/ses/latest/dg/quotas.html#limits-sending-emails)) and a **Maximum Send Rate** (e.g., [1 email/sec in sandbox](https://docs.aws.amazon.com/ses/latest/dg/quotas.html#limits-sending-emails)). These limits operate on a **rolling 24-hour window** and apply to the entire AWS SES account, not individual identities. Quotas differ between **sandbox** and **production** environments.

New accounts begin in the **sandbox**, where sending is restricted to verified email addresses or domains. To send freely, accounts must request production access via the [AWS Support Center](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html).

### Quota Increases

Requests for higher limits are evaluated based on **sending history**, **performance**, and **compliance**. Important thresholds include:

- **[Bounce rate](/email-sending-concepts/bounce-rate)** below 5%  
- **[Complaint rate](/email-sending-concepts/complaints)** under 0.1%  
- Strong content alignment with the [AWS Acceptable Use Policy](https://aws.amazon.com/aup/)

AWS also monitors accounts continuously and may **adjust quotas automatically** based on ongoing metrics and sender behavior.

### Regional Quotas

Quotas are **region-specific**, meaning limits are tracked independently per AWS region. This design allows you to **scale email operations** across regions, optimize throughput, and build redundancy.

## Why SES Imposes Sending Limits

Sending quotas help protect the **shared infrastructure**, reduce the risk of **spam and abuse**, and ensure fair usage across AWS customers. By gradually scaling limits for reputable senders, Amazon SES improves **deliverability and trust** across the platform.

## Best Practices for Managing SES Quotas

- **Track Usage**: Monitor limits and consumption using the **SES console**, **CloudWatch**, or the `GetSendQuota` API.  
- **Maintain Quality Metrics**: Keep bounce and complaint rates within AWS-recommended thresholds to preserve sending reputation.  
- **Prepare for Throttling**: SES throttles rather than blocks email if quotas are exceeded — implement retry logic in your sending system.  
- **Use Multiple Regions**: Distribute sending across AWS regions to boost total capacity and reduce risk of bottlenecks.

## Frequently Asked Questions

### How long does it take to get a quota increase?

Most requests are reviewed within **24–48 hours**, depending on your account history and requested volume.

### Can SES reduce my quota?

Yes. AWS may **lower your quota** or return your account to sandbox mode if your bounce/complaint rates are high or if policies are violated.

### How do I check my current quota?

Use the **SES console** or call the `GetSendQuota` API to view your current **daily limit** and **maximum send rate**.

### What changes after leaving the sandbox?

You gain higher daily and rate limits and are able to send to **any recipient**, not just verified addresses or domains.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns)
- [AWS SNS Topics](/aws-concepts/aws-sns-topics)
- [AWS SNS Subscription](/aws-concepts/aws-sns-subscription)
- [Email Bounces](/email-sending-concepts/bounce)
- [Email Complaints](/email-sending-concepts/email-complaints)
- [Email Authentication](/email-sending-concepts/email-authentication)

<GlossaryCTA />
