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
      content: https://bluefox.email/aws-concepts/ses-sending-rate
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
<GlossaryNavigation/>
# Amazon SES Sending Rates

**Amazon SES sending rate** refers to the number of emails your account can send **per second**. This is separate from your **[sending quota](/aws-concepts/ses-sending-quota.md)**, which controls the total number of emails you can send over a 24-hour period. While the quota addresses volume, the send rate governs delivery speed and ensures emails are transmitted at a controlled pace.

## How Sending Rate Works

When you send emails using [Amazon SES](/aws-concepts/ses.md), the service evaluates each request against your **maximum send rate**, for example, 1 email per second in the [sandbox](/aws-concepts/ses-sandbox.md) environment. If your system tries to exceed that rate, SES doesn't queue or delay those messages. Instead, it responds with a **Throttling** error. It is your responsibility to catch these errors and retry the messages using techniques like **exponential backoff**.

Even in [production mode](/aws-concepts/ses-production-access.md), where the rate is significantly higher (typically starting at **14 emails per second** for new production accounts, and varying based on your specific use case), the same mechanism applies. AWS allows short-term bursts above the send rate, but only within reason. If sustained spikes continue, SES will actively throttle delivery attempts. This behavior helps prevent flooding email providers with sudden traffic and safeguards your sender reputation.

Importantly, SES tracks rate compliance independently of your daily quota. You might stay well below your quota and still get throttled if you send too fast. Also, note that the **send rate applies to total sending throughput**, not per connection. You can maintain multiple parallel SMTP or API connections, but their combined send speed must remain within your allowed rate.

## Why SES Enforces Per-Second Sending Rates

The primary reason AWS enforces sending rates is to ensure **stable delivery**, avoid **provider-level blacklisting**, and prevent **service abuse**. Sudden or erratic bursts in email volume are one of the biggest triggers for spam filters and temporary blocks by inbox providers like Gmail or Outlook. By encouraging a smooth, gradual send pattern, SES helps maintain higher inbox placement and keeps you in good standing with ISPs.

For Amazon itself, this throttling system also protects the **shared SES infrastructure**, ensuring one sender’s behavior doesn’t degrade performance for others. It’s a trust and safety mechanism, essential to maintaining Amazon SES's reputation across large-scale email ecosystems.

## Factors That Influence Sending Rate

Your sending rate is initially low (1 email/second in the [sandbox](/aws-concepts/ses-sandbox)) but increases when you move to **production mode** and can grow further based on your reputation. AWS evaluates several factors when adjusting your rate:

- Your history of successful deliveries over time
- Low **[bounce](/email-sending-concepts/bounce-rate)** and **[complaint](/email-sending-concepts/complaints)** rates
- Consistent compliance with the [AWS Acceptable Use Policy](https://aws.amazon.com/aup)
- The volume and pacing of your email traffic over time

AWS may automatically increase your sending rate based on these metrics, or you can request a manual rate increase through the AWS Support Center, especially before a planned high-volume campaign.

## Best Practices for Managing SES Send Rate

To avoid delivery issues due to throttling, you should design your system to **respect the rate limit** by spreading email delivery evenly over time while implementing proper **retry logic** with exponential backoff and jitter to handle throttling errors gracefully. Proactively monitor SES metrics through **CloudWatch** to detect when you're approaching your send rate limits, and consider leveraging **multiple AWS regions** if you need to increase total throughput, as each region maintains its own independent rate limit and quota.

:::tip BlueFox Email Benefit
BlueFox Email handles send queues automatically, so accidental bursts in sending volume are managed without any extra work on your part. The system intelligently delays messages when needed to respect AWS SES rate limits, eliminating the need to build your own throttling solution.
:::

## Frequently Asked Questions About AWS SES Sending Rates

### How can I view my current send rate?

You can check it in the **SES Account Dashboard**, or programmatically using the `GetSendQuota` API. It will display your per-second limit alongside your daily quota.

### Can I ask for a temporary rate increase?

Yes. For one-time campaigns or events, you can submit a support request explaining your need, timing, and projected volume. It’s recommended to submit such requests at least **2–3 weeks in advance**.

### What happens if I exceed my send rate?

SES returns a **Throttling** error, and the message is not accepted for delivery. It’s not queued. You must retry after a short delay. Repeatedly ignoring this behavior can affect your sender score and account status.

### Does the send rate limit apply to each connection?

No. The rate limit applies across your entire SES account, regardless of how many connections or sending threads you use. The aggregate throughput must stay within the allowed rate.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/ses)
- [Amazon SES Sending Quotas](/aws-concepts/ses-sending-quota.md)
- [AWS Sandbox](/aws-concepts/ses-sandbox.md)
- [Bounces](/email-sending-concepts/bounces.md)
- [Complaints](/email-sending-concepts/complaints.md)
- [Email Authentication](/email-sending-concepts/email-authentication.md)
- [SMTP](/email-sending-concepts/smtp.md)

<GlossaryCTA />
