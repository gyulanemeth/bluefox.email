---
title: AWS SES Verified Identities | BlueFox Email
description: Learn about AWS SES Verified Identities - domains or email addresses that you've proven ownership of and can use for sending emails through Amazon SES.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

datePublished: "2025-07-25"
dateModified: "2025-07-25"

faqs:
  - question: "Can I use subdomains as verified identities?"
    answer: "Yes, you can verify specific subdomains separately from the parent domain. For example, you could verify `marketing.example.com` as its own identity, distinct from `example.com`."
  - question: "Do I need to verify identities in each AWS region separately?"
    answer: "Yes, identity verifications are region-specific. If you plan to send emails from multiple AWS regions, you must verify your domains and email addresses in each region you plan to use."
  - question: "What happens if I need to send from multiple domains?"
    answer: "You can verify as many domains and email addresses as needed within your AWS account. Each identity is verified and managed independently, with its own notification settings and sending authorizations."
  - question: "Can I delete a verified identity?"
    answer: "Yes, you can delete a verified identity at any time through the SES console or API. However, once deleted, you would need to go through the verification process again if you wish to use that identity for sending."

relatedContent:
  - title: Amazon SES (Simple Email Service)
    url: /aws-concepts/ses
  - title: AWS SES Sandbox Mode
    url: /aws-concepts/ses-sandbox
  - title: AWS SES Production Mode
    url: /aws-concepts/ses-production-access
  - title: AWS SES Sending Quotas
    url: /aws-concepts/ses-sending-quota
  - title: AWS SNS Topics
    url: /aws-concepts/sns-topics
  - title: SPF (Sender Policy Framework)
    url: /email-sending-concepts/spf
  - title: DKIM (DomainKeys Identified Mail)
    url: /email-sending-concepts/dkim

head:
  - - meta
    - name: description
      content: Learn about AWS SES Verified Identities - domains or email addresses that you've proven ownership of and can use for sending emails through Amazon SES.
  - - meta
    - property: og:title
      content: AWS SES Verified Identities | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about AWS SES Verified Identities - domains or email addresses that you've proven ownership of and can use for sending emails through Amazon SES.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-verified-identities
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: AWS SES Verified Identities | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about AWS SES Verified Identities - domains or email addresses that you've proven ownership of and can use for sending emails through Amazon SES.
---

# AWS SES Verified Identities

**AWS SES Verified Identities** are domains or email addresses that you've proven ownership of and are authorized to send emails from through Amazon Simple Email Service. These identities form the foundation of your AWS SES sending capability and are essential for maintaining sender authenticity and reputation.

## What are Verified Identities?

A verified identity in Amazon SES is either a **domain** or an **email address** that you have demonstrated ownership of through an AWS verification process. According to [AWS documentation](https://docs.aws.amazon.com/ses/latest/dg/verify-addresses-and-domains.html), this verification process is a **critical security measure** that prevents unauthorized users from sending emails using your domain or addresses.

Unlike traditional email services where you simply register an account with a username and password, [SES](/aws-concepts/ses.md) requires this additional verification step to ensure that only legitimate owners can send emails from specific addresses or domains. This helps **protect both senders and recipients** from potential email spoofing and phishing attacks.

## Types of Verified Identities

Amazon SES supports two types of verified identities, each with distinct characteristics and verification methods:

| Identity Type | Scope | Verification Method | Best For |
|---------------|-------|---------------------|----------|
| **Domain Identity** | Entire domain (`yourdomain.com`) | DNS records (TXT) | Organizations that need to send from multiple addresses in the same domain |
| **Email Address Identity** | Single address (`you@anydomain.com`) | Confirmation email with verification link | Individual users or when domain control is unavailable |


## Identity Status and Management

AWS SES assigns each verified identity a status indicator that reflects its verification state in the system:

- **Pending:** Verification has been requested but is not yet completed.
- **Verified:** The identity is successfully confirmed and ready for sending.
- **Failed:** Verification was unsuccessful, often due to issues like incorrect DNS configuration.
- **Temporary Failure:** There are temporary issues that may resolve automatically without user intervention.

The identity management system provides comprehensive tools to oversee your sending capabilities. You can track verification status across all identities, configure sending authorization for third-party AWS accounts, set up notifications for [bounces](/email-sending-concepts/bounces.md), [complaints](/email-sending-concepts/complaints.md), and delivery events, and implement [sending policies](/aws-concepts/sns-delivery-policy.md) that determine which services can use your verified identities.


## Verified Identities in Sandbox Mode

In [AWS SES sandbox mode](/aws-concepts/ses-sandbox), verified identities operate under specific restrictions: emails can only be sent to other verified addresses or domains, [sending quotas](/aws-concepts/ses-sending-quota) are capped at **200 emails per 24-hour period**, and [sending rates](/aws-concepts/ses-sending-rate) are limited to **1 email per second**. While these constraints are lifted once you obtain [production access](/aws-concepts/ses-production-access), the fundamental requirement to send only from properly verified identities remains permanent regardless of account status.

## Configuring Feedback Notifications

Verified identities function as integration points for critical email feedback loops, allowing you to configure **bounce notifications** (alerts for undeliverable emails), **complaint notifications** (alerts when recipients mark messages as spam), and **delivery notifications** (confirmations of successful delivery) for each identity. These notifications are routed to [Amazon SNS topics](/aws-concepts/sns-topics) where you can process them programmatically to maintain list hygiene and sender reputation, with the [AWS SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html) emphasizing that proper handling of these feedback mechanisms is fundamental to achieving optimal deliverability rates and maintaining trusted sender status.

## Frequently Asked Questions About Verified Identities

### Can I use subdomains as verified identities?
Yes, you can verify specific subdomains separately from the parent domain. For example, you could verify `marketing.example.com` as its own identity, distinct from `example.com`.

### Do I need to verify identities in each AWS region separately?
Yes, identity verifications are **region-specific**. If you plan to send emails from multiple AWS regions, you must verify your domains and email addresses in each region you plan to use.

### What happens if I need to send from multiple domains?
You can verify as many domains and email addresses as needed within your AWS account. Each identity is verified and managed independently, with its own notification settings and sending authorizations.

### Can I delete a verified identity?
Yes, you can delete a verified identity at any time through the SES console or API. However, once deleted, you would need to go through the verification process again if you wish to use that identity for sending.

## Related Content

- [Amazon SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SES Sandbox Mode](/aws-concepts/ses-sandbox)
- [AWS SES Production Mode](/aws-concepts/ses-production-access)
- [AWS SES Sending Quotas](/aws-concepts/ses-sending-quota)
- [AWS SNS Topics](/aws-concepts/sns-topics)
- [SPF (Sender Policy Framework)](/email-sending-concepts/spf)
- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim)

<GlossaryCTA />
