---
title: Amazon SES Sending Rates | BlueFox Email
description: Learn about AWS SES sending rates, how they differ from quotas, factors that influence them, and best practices for optimal email delivery.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn about AWS SES sending rates, how they differ from quotas, factors that influence them, and best practices for optimal email delivery.
  - - meta
    - property: og:title
      content: Amazon SES Sending Rates | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about AWS SES sending rates, how they differ from quotas, factors that influence them, and best practices for optimal email delivery.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-sending-rate
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon SES Sending Rates | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about AWS SES sending rates, how they differ from quotas, factors that influence them, and best practices for optimal email delivery.
---

# Amazon SES Sending Rates

**AWS SES sending rates** refer to the **maximum number of emails you can send per second** using [Amazon SES](/aws-concepts/aws-ses). This limit is distinct from the [sending quota](/aws-concepts/aws-sending-quota.md), which controls how many emails you can send over a 24-hour period.

## Key Features of AWS SES Sending Rates

- **Maximum Send Rate**: The per-second sending limit, such as [1 email per second in the sandbox environment](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html).
- **Burst Capability**: Short-term ability to exceed the rate during traffic surges.
- **Throttling Mechanism**: Excess sends are temporarily blocked with a *Throttling* error.
- **Dynamic Adjustment**: Rates may increase automatically based on reputation and engagement.

## How AWS SES Sending Rates Work

New accounts in the [sandbox](/aws-concepts/aws-sandbox) are limited to a [maximum of 1 email per second](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html) and [200 emails per 24 hours](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html). Once an account is moved to production, AWS typically lifts these limits based on various criteria.

Rate increases are determined by:

- **Historical sending volume and frequency**
- **Email content quality and compliance**
- **[Bounce](/email-sending-concepts/bounce-rate)** and **[complaint](/email-sending-concepts/complaints)** rates
- **Justification of business needs** during support requests

If you exceed your current rate, SES returns a **Throttling** error. Your application should implement exponential backoff and retry logic to avoid delivery failures.

It's important to note that SES limits **sending rate**, not **concurrent connections**. You can open multiple SMTP or API connections as long as the combined sending rate stays within your allowed threshold.

## Why Amazon SES Enforces Sending Rates

SES enforces sending rate limits to maintain **infrastructure stability**, prevent **system abuse**, and preserve **sender reputation**. Gradual increases based on proven reliability prevent sudden volume spikes that could trigger spam filters. These rate limits also reduce the chances of email bounces and promote better **inbox placement** by maintaining a steady, trusted traffic profile.

## Understanding Amazon SES Rate Management

Managing your SES send rate effectively means understanding how **throttling**, **monitoring**, and **region-specific limits** interact. Use **CloudWatch metrics** to detect when throttling occurs, and adjust your email pacing accordingly. AWS recommends implementing **exponential backoff with jitter** to avoid retry collisions and improve delivery resilience.

Although sending quotas and sending rates work together, they require **separate management strategies**. Your infrastructure should respect both limits to avoid delivery issues. For applications needing higher throughput, you can send from **multiple AWS regions**, since each region has **independent rate limits**.

## Frequently Asked Questions About AWS SES Sending Rates

### How do I know my current maximum sending rate?

You can check your current rate in the SES **Account Dashboard**, via the `GetSendQuota` API, or by contacting AWS Support. It is listed alongside your daily sending quota.

### Can I request a temporary rate increase for a planned campaign?

Yes. You may request a temporary rate boost by submitting a support case in advance. Clearly describe the event, expected volume, and timeline. AWS recommends submitting such requests **2–3 weeks ahead**.

### How quickly will AWS increase my sending rate?

Typical reviews occur within **24–48 hours**, but significant increases often require a strong sending history with low bounce and complaint rates. **New accounts** must build credibility over time.

### What happens if I consistently exceed my sending rate?

Repeated rate violations lead to **throttled delivery attempts**. If the issue persists, AWS may flag your account for review, especially if the retries result in degraded sender metrics or policy violations.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SES Sending Quotas](/aws-concepts/aws-sending-quota.md)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns.md)
- [AWS Sandbox](/aws-concepts/aws-sandbox.md)
- [Bounces](/email-sending-concepts/bounces.md)
- [Complaints](/email-sending-concepts/complaints.md)
- [Email Authentication](/email-sending-concepts/email-authentication.md)
- [SMTP](/email-sending-concepts/smtp.md)

<GlossaryCTA />
