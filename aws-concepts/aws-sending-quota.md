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

**Amazon SES sending quotas** define how many emails your account is allowed to send over a rolling 24-hour period. These limits are in place to protect recipient inboxes, maintain AWS infrastructure stability, and build long-term sender reputation.

## Understanding SES Quotas

Each [Amazon SES](/aws-concepts/ses) account has a **Daily Sending Quota**, which determines the maximum number of emails that can be sent in a 24-hour window. In [sandbox mode](/aws-concepts/ses-sandbox), this is typically [200 emails per day](https://docs.aws.amazon.com/ses/latest/dg/quotas.html#limits-sending-emails).

New accounts begin in the **sandbox**, where sending is limited to verified identities. To unlock higher limits and unrestricted recipients, you must request [production access](/aws-concepts/ses-production-access) through the [AWS Support Center](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html).

## Why AWS Sets Sending Quotas

AWS implements sending quotas to benefit the entire email ecosystem by helping senders gradually ramp up activity while **reducing [deliverability](/email-sending-concepts/deliverability) issues** from sudden volume spikes. These limits protect recipients from unsolicited or spam-like traffic and safeguard SES infrastructure from potential misuse while maintaining trusted relationships with major mailbox providers. According to [AWS documentation](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html), these quotas _"help to maintain the trusted relationship between Amazon SES and email providers"_ and are essential for preserving the overall health of the system.

## Quota Increases

You can request a quota increase based on your account’s **sending performance**, **history**, and **compliance**. To qualify:

- Keep **[bounce rates](/email-sending-concepts/bounce-rate)** below 5%
- Keep **[complaint rates](/email-sending-concepts/complaints)** under 0.1%
- Follow the [AWS Acceptable Use Policy](https://aws.amazon.com/aup) and send relevant, permission based content

AWS may also adjust quotas automatically based on your usage and email metrics over time.

## Regional Quotas

SES quotas are applied **per AWS region**, meaning each region tracks and enforces its own limits. You can use this to your advantage by distributing email traffic across multiple regions to improve throughput and create redundancy.

## Best Practices for Managing SES Quotas

Effective quota management requires **actively monitoring usage** through the SES Console, `GetSendQuota` API, or CloudWatch while maintaining strong sender reputation by staying within AWS recommended bounce and **complaint thresholds**. Implement robust throttling logic that **queues and retries messages** when SES throttles (rather than blocks) excessive sending attempts, and consider distributing email load across multiple AWS regions to achieve higher aggregate capacity and improved resilience.

## Frequently Asked Questions

### How long does it take to get a quota increase?

Requests are usually reviewed within **24–48 hours**, depending on volume and account reputation.

### Can SES reduce my quota?

Yes. If your sending metrics deteriorate or you violate policies, AWS may reduce your quota or return your account to sandbox mode.

### How do I check my current quota?

Use the SES console or `GetSendQuota` API to view your current daily sending limit and send rate.

### What changes after leaving the sandbox?

Once in [production mode](/aws-concepts/ses-production-access), you're allowed to send to unverified recipients and receive significantly increased sending limits. The actual quotas vary based on your specific use case and may increase automatically over time as you establish a positive sending reputation.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SNS (Simple Notification Service)](/aws-concepts/sns)
- [AWS SNS Topics](/aws-concepts/sns-topics)
- [AWS SNS Subscription](/aws-concepts/sns-subscription)
- [Bounces](/email-sending-concepts/bounces)
- [Complaints](/email-sending-concepts/complaints)
- [Email Authentication](/email-sending-concepts/email-authentication)

<GlossaryCTA />
