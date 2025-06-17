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

**Amazon SES sending quotas** define the number of emails an account can send in a 24-hour period and the rate per second. These limits are essential for preserving SES infrastructure performance and sender reputation.

## Key Features of Amazon SES Sending Quotas

- **Daily Sending Quota**: Number of emails allowed in a rolling 24-hour period (200 in sandbox)
- **Maximum Send Rate**: Emails per second (1/sec in sandbox)
- **Rolling Window**: Quotas reset on a rolling 24-hour basis, not by calendar day
- **Account-Wide Limits**: Quotas apply to the entire AWS SES account, not individual senders

## How Amazon SES Sending Quotas Work

- **Sandbox vs. Production**: New SES accounts begin in a sandbox with restricted limits: [200 emails per day](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) and 1 email per day. Sandbox accounts can only send to verified email addresses or domains.

- **Quota Increase Process**: Quota increases are requested via the AWS Support Center and evaluated based on:

  - Historical sending volume and reputation
  - [Bounce rate](/email-sending-concepts/bounce) — target **below 5%** ([AWS guidelines](https://docs.aws.amazon.com/ses/latest/dg/monitor-sender-reputation.html))
  - [Complaint rate](/email-sending-concepts/email-complaints) — target **below 0.1%** [AWS reference](https://docs.aws.amazon.com/ses/latest/dg/reputationdashboardmessages.html#calculate-complaint)
  - Content quality and compliance with AWS's acceptable use policy

- **Ongoing Monitoring**: AWS automatically monitors your email activity and may adjust quotas over time based on performance and metrics.

- **Region-Specific Limits**: Quotas are maintained per AWS region, allowing you to scale independently across different SES regions.

## Why Sending Quotas Exist

These limits help ensure:

- High deliverability across the SES platform
- Protection against abuse and spam
- Gradual scaling for trustworthy senders
- Prevention of accidental overuse

SES sending quotas are designed to safeguard the email ecosystem and maintain global sending integrity.

## Best Practices for Managing SES Quotas

**1. Monitor Usage Regularly**  
Use the SES console, CloudWatch, or the `GetSendQuota` API to track your current limits and usage patterns.

**2. Stay Within Quality Thresholds**  
Maintain bounce rates under 5% and complaint rates under 0.1% to increase your chance of receiving higher limits.

**3. Plan for Throttling Behavior**  
Exceeding quotas causes SES to throttle sending rather than failing outright. Implement retries in your sending logic.

**4. Leverage Regional Sending**  
Distribute email traffic across multiple regions to increase total capacity and isolate risks.

## Frequently Asked Questions

### How long does it take to get a quota increase?

Most quota requests are reviewed within 24–48 hours. Approval depends on your history and requested volume.

### Can SES reduce my quota?

Yes. High bounce/complaint rates or policy violations may result in a reduced quota or a return to sandbox status.

### How do I check my current quota?

Use the SES console or the `GetSendQuota` API. You’ll see both your daily limit and your maximum sending rate.

### What changes when I leave the sandbox?

Your daily sending and rate limits increase. You can also send to any recipient, not just verified addresses.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns)
- [AWS SNS Topics](/aws-concepts/aws-sns-topics)
- [AWS SNS Subscription](/aws-concepts/aws-sns-subscription)
- [Email Bounces](/email-sending-concepts/bounce)
- [Email Complaints](/email-sending-concepts/email-complaints)
- [Email Authentication](/email-sending-concepts/email-authentication)

<GlossaryCTA />
