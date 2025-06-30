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
      content: https://bluefox.email/aws-concepts/ses-sandbox
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
<GlossaryNavigation/>
# Amazon SES Sandbox

The **Amazon SES sandbox** is a restricted environment where all new [Amazon SES](/aws-concepts/ses) accounts begin. It allows users to explore SES capabilities in a controlled manner while protecting AWS’s infrastructure from misuse.

## What the Sandbox Environment Includes

In the sandbox, you can only send emails to **verified recipients**, meaning you must first confirm ownership of an email address or domain before using it as a destination. This restriction ensures that new accounts cannot be used for spam or abuse, while still allowing safe and realistic testing.

To prevent large-scale misuse, the sandbox enforces both a **sending quota** and a **sending rate**. The quota limits you to [200 emails per 24 hours](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html), while the rate restricts sending to [1 email per second](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html). These limits encourage careful pacing and discourage aggressive or careless mass sending during the early stages of use.

Despite these constraints, the SES sandbox gives you **full access to features** such as SMTP sending, event publishing, bounce/complaint tracking, and email templates. This makes it ideal for development and integration work, letting teams validate their email infrastructure in a safe environment.

To move beyond the sandbox and reach unverified recipients or higher volumes, users must apply for **[production access](/aws-concepts/ses-production-access.md)** by submitting a request through the [AWS Support Center](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html).

:::tip Practical Guide
Learn how to successfully apply and maintain AWS SES production access with our detailed [step-by-step guide](/posts/how-to-get-and-maintain-production-access-to-amazon-ses).
:::

## How the Amazon SES Sandbox Works

When your account is created, it automatically begins in sandbox mode. Emails can only be sent to domains or email addresses you’ve verified. Address verification is done via a confirmation email link, while domain verification requires adding DNS records.

Your daily sending quota is **capped at 200 emails**, and your sending rate is restricted to **1 message per second**. These numbers are not adjustable in the sandbox and are enforced globally across your SES usage. However, all core SES functionality is available, making the sandbox a complete but limited version of the service.

If you attempt to exceed the send rate, SES will return a **Throttling** error. And if you try to send to an unverified recipient, SES will block the request. These safeguards help ensure only intentional, approved usage during the sandbox phase.

## Why Amazon Implements the SES Sandbox

Amazon SES uses the sandbox model as a **reputation safeguard** for both AWS and the wider email ecosystem. It minimizes the risk of new users causing spam, phishing, or policy violations that could harm AWS's [deliverability](/email-sending-concepts/deliverability) with major mailbox providers.

It also acts as a **staging ground** for users to build confidence with SES. While the sending limits may feel restrictive, they provide a safe space to test features, verify setup (e.g., [SPF, DKIM, DMARC](/email-sending-concepts/email-authentication.md)), and monitor delivery feedback. This gradual ramp-up process ensures that only **compliant, trusted senders** are allowed into production.

## Understanding AWS SES Sandbox Exit Requirements

To move your SES account from sandbox to production, you must submit a formal request through the [AWS Support Center](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html). Your request should explain how you collect opt-in consent, what types of content you send (e.g., transactional or marketing), and how you handle **[bounces](/email-sending-concepts/bounces)** and **[complaints](/email-sending-concepts/complaints)**.

AWS will also evaluate whether you follow authentication best practices and whether your email content meets professional standards. Including an **unsubscribe mechanism**, a **valid reply-to address**, and clear sender identity increases the chances of approval. Maintaining a **bounce rate below 5%** and a **complaint rate under 0.1%** is strongly recommended for a smooth review process.

## Frequently Asked Questions About AWS SES Sandbox

### How long does my account have to stay in the sandbox?

There’s no mandatory waiting period. You can apply for production access immediately, but a short history of successful test sending can help demonstrate readiness.

### Can I still use SES effectively while in the sandbox?

Yes. The sandbox includes full access to SES capabilities, so it’s suitable for development, integration, and validation of your sending system even if delivery is limited to verified addresses.

### How do I verify a recipient email address?

Go to the SES console, select **"Email Addresses"**, and click **"Verify a New Email Address"**. An email with a confirmation link will be sent. Once clicked, the address becomes verified.

### What happens if my production request is denied?

AWS typically provides a reason such as lack of opt-in evidence or missing unsubscribe links. You can revise your setup and reapply. If needed, AWS Support may clarify next steps.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SES Sending Quotas](/aws-concepts/ses-sending-quota)
- [AWS SES Sending Rates](/aws-concepts/ses-sending-rate)
- [AWS SNS (Simple Notification Service)](/aws-concepts/sns.md)
- [Bounces](/email-sending-concepts/bounces.md)
- [Complaints](/email-sending-concepts/complaints.md)
- [Email Authentication](/email-sending-concepts/email-authentication.md)
- [DNS Records](/email-sending-concepts/dns.md)

<GlossaryCTA />
