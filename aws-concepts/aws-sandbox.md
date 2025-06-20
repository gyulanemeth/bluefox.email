---
title: Amazon SES Sandbox | BlueFox Email
description: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
  - - meta
    - property: og:title
      content: Amazon SES Sandbox | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-sandbox
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon SES Sandbox | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
---

# Amazon SES Sandbox

The **Amazon SES sandbox** is a restricted environment where all new [Amazon SES](/aws-concepts/aws-ses) accounts begin. It allows users to explore SES capabilities in a controlled manner while protecting AWS’s infrastructure from misuse.

## Key Features of the Amazon SES Sandbox

- **Verified Recipients Only**: Emails can only be sent to verified email addresses or domains.
- **Sending Limits**: Restricted to [200 emails per 24 hours](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html).
- **Sending Rate**: Capped at [1 email per second](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html).
- **SMTP Access**: Full access to SES SMTP interface despite environment restrictions.
- **Production Access**: Requires manual approval to exit the sandbox.

## How the Amazon SES Sandbox Works

New AWS accounts automatically start in **sandbox mode**, allowing only email delivery to **verified recipients**. Verification requires either confirming individual addresses via a link or validating domain ownership through [DNS](/email-sending-concepts/dns) records.

While in this environment, accounts are limited to a **sending quota** of [200 emails per day](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) and a **sending rate** of [1 email per second](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html). Despite these limitations, all major SES features remain available for testing, including event tracking, bounce handling, and integration with AWS services.

Performance in the sandbox is monitored closely. Maintaining **good sending metrics** is essential for moving to production.

## Why Amazon Implements the SES Sandbox

The sandbox is designed as a **protective layer** for AWS and its users. By limiting the reach of new accounts, it reduces the risk of **spam and abuse**, preserving the **reputation of SES IP addresses** and supporting strong **deliverability rates** for all customers.

This environment also serves as a learning phase, allowing senders to understand and apply **email best practices**. Gradual access to broader sending capabilities ensures that only **responsible, compliant senders** transition to production.

## Understanding AWS SES Sandbox Exit Requirements

To move from sandbox to production, you must submit a request through the [AWS Support Center](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html). The request should include:

- Your **sending use case** (e.g., marketing, transactional, notifications)
- How recipients have **opted in** to receive emails
- Adoption of **email authentication** standards like SPF, DKIM, and DMARC
- Your systems for managing **[bounces](/email-sending-concepts/bounces)** and **[complaints](/email-sending-concepts/complaints)**

AWS evaluates whether your content is **professional and compliant**, including **unsubscribe options**, clear sender identity, and **opt-in consent**. Keeping bounce rates **below 5%** and complaint rates **under 0.1%** ([source](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html)) significantly increases the chance of approval.

## Frequently Asked Questions About AWS SES Sandbox

### How long does my account have to stay in the sandbox?

There is no minimum duration. You can request [production access](/aws-concepts/aws-production-mode.md) immediately, though a **history of compliant sending** may help expedite approval. Most requests are reviewed within **24–48 hours**.

### Can I still use SES effectively while in the sandbox?

Yes. While delivery is limited, the sandbox is **fully functional** for development and testing. You can explore features like bounce tracking, email templates, and event publishing.

### How do I verify a recipient email address?

In the SES console, go to **"Email Addresses"** and choose **"Verify a New Email Address"**. A confirmation link is sent to the address. Clicking the link completes verification.

### What happens if my production request is denied?

AWS provides a reason for rejection often due to **insufficient information**, questionable content, or poor opt-in practices. You can address the issues and reapply. Engaging AWS Support may help clarify what needs improvement.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SES Sending Quotas](/aws-concepts/aws-sending-quota.md)
- [AWS SES Sending Rates](/aws-concepts/aws-sending-rate.md)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns.md)
- [Bounces](/email-sending-concepts/bounces.md)
- [Complaints](/email-sending-concepts/complaints.md)
- [Email Authentication](/email-sending-concepts/email-authentication.md)
- [DNS Records](/email-sending-concepts/dns.md)

<GlossaryCTA />
