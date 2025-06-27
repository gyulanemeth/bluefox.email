---
title: Bounces | BlueFox Email
description: An email bounce occurs when an email is rejected by the recipient's server and returned to the sender, impacting deliverability and sender reputation.
thumbnail: /assets/glossary/email-sending-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: An email bounce occurs when an email is rejected by the recipient's server and returned to the sender, impacting deliverability and sender reputation.
  - - meta
    - property: og:title
      content: Bounces | BlueFox Email
  - - meta
    - property: og:description
      content: An email bounce occurs when an email is rejected by the recipient's server and returned to the sender, impacting deliverability and sender reputation.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/bounce
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Bounces | BlueFox Email
  - - meta
    - name: twitter:description
      content: An email bounce occurs when an email is rejected by the recipient's server and returned to the sender, impacting deliverability and sender reputation.
---
<GlossaryNavigation/>

# Bounces

An **email bounce** occurs when an email cannot be delivered to its intended recipient and is returned to the sender with an error message. Bounces are a natural part of email sending, but understanding their causes and implications is crucial for maintaining good deliverability and sender reputation.

## What is a Bounce?

An email bounce occurs when a recipient's mail server rejects a message and returns a notification to the sender. This notification contains standardized error codes explaining why delivery failed. Bounces directly reflect your list quality and sending practices. According to [Amazon SES enforcement guidelines](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html), industry standards recommend keeping [bounce rates](/email-sending-concepts/bounce-rate) below 2%. Higher rates trigger spam filters and damage sender reputation, potentially blocking future emails even to valid recipients.

## Types of Bounces

Email bounces fall into two main categories: **[hard bounces](/email-sending-concepts/hard-bounce.md)** and **[soft bounces](/email-sending-concepts/soft-bounce.md)**. Each type signals different underlying issues and requires different approaches.

| Characteristic      | Hard Bounces                                                                    | Soft Bounces                                                              |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Definition**      | Permanent delivery failures that cannot be resolved                             | Temporary delivery failures that may resolve with time                    |
| **Common Causes**   | Invalid email addresses, closed accounts, non-existent domains, blocked domains | Full mailboxes, server downtime, message size limits, greylisting         |
| **Required Action** | Immediate removal from mailing lists                                            | It doesn't need an action and will retry attempts (typically 24-72 hours) |

Email service providers typically automate suppression lists for hard bounces to prevent future sending attempts to these addresses. Persistent soft bounces across multiple campaigns may indicate abandoned accounts that should eventually be removed.

## Bounce Codes and Their Meaning

Bounce messages typically include SMTP response codes that provide specific information about the delivery failure:

- **5XX codes** (e.g., 550, 551) indicate permanent failures (hard bounces)
- **4XX codes** (e.g., 421, 450) indicate temporary issues (soft bounces)
- **Specific subcodes** provide more detailed information about the exact cause

Understanding these codes helps in properly categorizing bounces and taking appropriate action. For instance, a 550 "Mailbox not found" requires immediate address removal, while a 421 "Service not available" might warrant retry attempts.

## How Email Service Providers Handle Bounces

Modern email service providers like [Amazon SES](/aws-concepts/ses) automatically process bounce information by receiving notifications, classifying them as hard or soft based on response codes, and forwarding this data to senders through [Amazon SNS Topics](/aws-concepts/sns-topics). These notifications can then be consumed by webhooks, Lambda functions, or other services configured to subscribe to the SNS topics. For hard bounces, ESPs automatically add addresses to suppression lists to prevent future sending attempts. They also compile bounce metrics into reports so senders can monitor trends and identify potential deliverability issues before they escalate.

:::tip Just a heads up
In BlueFox Email, we automatically handle bounces for you. Just follow our instructions on setting up bounce webhook in your project settings, and whenever there is a **hard bounce**, we will automatically add the email address to the suppression list to prevent future sending attempts. You will also receive an email notification when a bounce occurs, allowing you to take necessary actions, such as removing the email address from your list or all lists. You can also view bounce reports in your dashboard to monitor trends.
:::

## How Bounces Impact Sender Reputation

Email bounces directly influence how mailbox providers like Gmail, Yahoo, and Outlook evaluate your sending quality. High bounce rates signal poor list hygiene and questionable acquisition practices, damaging your sender reputation and reducing inbox placement. Industry experts recommend maintaining bounce rates **below 2%** for optimal deliverability.

Email service providers enforce strict bounce thresholds as protective measures. Amazon SES, for example, requires bounces to stay **below 5%** to maintain unrestricted sending privileges. According to [Amazon](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html): "If your bounce rate is 5% or greater, we'll place your account under review. If your bounce rate is 10% or greater, we might pause your account's ability to send additional email." A damaged reputation from excessive bounces can affect your deliverability across the entire email ecosystem.

## Frequently Asked Questions About Email Bounces

### What happens when an email bounces?

The receiving server returns a notification containing standardized error codes and explanatory text about why delivery failed. This information is processed and made available to the sender through reports or notification systems.

### Why do valid email addresses sometimes bounce?

Valid addresses can bounce due to temporary server outages, full mailboxes, content filtering, or greylisting policies. These issues often resolve themselves on subsequent sending attempts.

### Do all bounces affect sender reputation equally?

No. Hard bounces for non-existent addresses damage reputation most severely as they indicate poor list quality. Soft bounces have minimal impact unless they persist across multiple sending attempts.

## Related Content

- [Complaints](/email-sending-concepts/complaints)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [SMTP Protocol](/email-sending-concepts/smtp)
- [Amazon SNS (Simple Notification Service)](/aws-concepts/sns)
- [Amazon SES (Simple Email Service)](/aws-concepts/ses)
- [Bounce Rate](/email-sending-concepts/bounce-rate)
- [Hard Bounce](/email-sending-concepts/hard-bounce)
- [Soft Bounce](/email-sending-concepts/soft-bounce)

<GlossaryCTA />
