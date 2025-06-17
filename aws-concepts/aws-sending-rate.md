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

**AWS SES sending rates** refer to the **maximum number of emails you can send per second** using [Amazon SES](/aws-concepts/aws-ses). This rate limit is distinct from the [sending quota](/aws-concepts/aws-sending-quota), which governs the total number of emails you can send in a 24-hour period.

## Key Features of AWS SES Sending Rates

- **Maximum Send Rate**: Limit on emails per second (1/second for sandbox accounts)
- **Burst Capability**: Short-term ability to exceed the standard rate for traffic spikes
- **Throttling Mechanism**: Automatically rejects excess sending attempts when rate is exceeded
- **Dynamic Adjustment**: Rates can increase based on sending history and email quality

## How AWS SES Sending Rates Work

New SES accounts in the "[sandbox](/aws-concepts/aws-sandbox)" environment are restricted to [1 email per second](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html). This rate limit works alongside the [200 emails per 24 hours](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) quota.

After moving to production status, AWS typically grants higher sending rates. These rates are determined based on:

- Your historical sending patterns
- The quality of your email content
- Your [bounce](/email-sending-concepts/bounce) and [complaint](/email-sending-concepts/email-complaints) metrics
- Your specific business needs as communicated to AWS

When you exceed your maximum send rate, AWS SES responds with a "**Throttling**" error. Your application must handle these errors by implementing appropriate backoff and retry mechanisms.

While SES limits emails per second, it does not restrict concurrent connections to the service. This allows you to maintain multiple connections while still respecting the rate limit.

## Why Amazon SES Enforces Sending Rates

Amazon SES implements sending rate limits to protect its infrastructure from being overwhelmed by any single sender. These limits play a crucial role in maintaining the service's overall reliability and performance. Rate limits also help establish and maintain a **positive sender reputation** with Internet Service Providers (ISPs) by gradually scaling up sending volumes rather than allowing sudden spikes that might appear suspicious. Furthermore, controlled sending rates can significantly improve **inbox placement** by avoiding behaviors that ISPs might flag as problematic. The rate limits serve as an important safeguard against potential service abuse, making it more difficult to use AWS SES for sending unsolicited bulk emails that could harm the platform's reputation and deliverability for all users.

## Understanding Amazon SES Rate Management

Managing your SES sending rate effectively requires understanding several key concepts that work together to ensure optimal email delivery. Regular monitoring of your actual sending volumes provides visibility into your usage patterns and helps you plan for when you might need increased capacity. AWS provides CloudWatch metrics that show throttling events when you approach or exceed your limits, allowing you to take proactive measures before issues arise. When SES returns throttling errors, implementing **exponential backoff with jitter** is recommended—this approach adds progressively longer delays between retries, with small random variations to prevent multiple senders from retrying simultaneously.

While [sending quotas](/aws-concepts/aws-sending-quota) (emails per 24 hours) and sending rates (emails per second) are related, they require different management strategies. Your email sending architecture needs to account for both metrics to ensure compliance with SES limits. Additionally, it's important to understand that each AWS region has **independent rate limits**. For applications requiring higher throughput, distributing sending across multiple regions can effectively increase your overall sending capacity while maintaining compliance with SES policies.

## Frequently Asked Questions About AWS SES Sending Rates

### How do I know my current maximum sending rate?

You can find your current maximum sending rate in the AWS SES console under "Account Dashboard," through the GetSendQuota API call, or by contacting AWS Support. The SES console will display your maximum emails per second alongside your daily sending quota.

### Can I request a temporary rate increase for a planned campaign?

Yes, for special events or large campaigns, you can request a temporary rate increase through AWS Support. Provide details about your planned sending volume, timing, and the purpose of the campaign. Submit these requests at least 2-3 weeks in advance to allow for review and implementation.

### How quickly will AWS increase my sending rate?

AWS typically reviews sending rate increase requests within 24-48 hours. However, meaningful increases generally require a proven sending history with good metrics. New accounts may need to demonstrate responsible sending practices over weeks or months before receiving significant rate increases.

### What happens if I consistently exceed my sending rate?

Consistently exceeding your sending rate will result in throttled requests and potentially **failed message delivery**. While occasional throttling is expected and handled through retries, persistent exceeding of limits may prompt AWS to review your sending patterns and potentially trigger **account reviews**.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SES Sending Quotas](/aws-concepts/aws-sending-quota)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns)
- [AWS Sandbox](/aws-concepts/aws-sandbox)
- [Email Bounces](/email-sending-concepts/bounce)
- [Email Complaints](/email-sending-concepts/email-complaints)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [SMTP](/email-sending-concepts/smtp)

<GlossaryCTA />
