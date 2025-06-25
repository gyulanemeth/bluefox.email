---
title: AWS SES Verified Identities | BlueFox Email
description: Learn about AWS SES Verified Identities - domains or email addresses that you've proven ownership of and can use for sending emails through Amazon SES.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

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

Unlike traditional email services where you simply register an account with a username and password, SES requires this additional verification step to ensure that only legitimate owners can send emails from specific addresses or domains. This helps **protect both senders and recipients** from potential email spoofing and phishing attacks.

## Types of Verified Identities

Amazon SES supports two types of verified identities:

### 1. Domain Identities
Domain identities allow you to send emails from **any address within a verified domain**. For example, verifying `yourdomain.com` enables sending from `any@yourdomain.com`, `support@yourdomain.com`, or any other address at that domain. Domain verification is performed by adding specific DNS records (TXT records) to your domain's configuration.

### 2. Email Address Identities
Email address identities are **individual email addresses** verified for sending. These are useful when you don't control an entire domain but need to send from a specific address. Verification occurs through a confirmation email with a verification link that must be clicked to complete the process.

## The Verification Process

### Domain Verification
To verify a domain identity, you must:
1. Add the **provided TXT records** to your domain's DNS settings
2. Configure **DKIM authentication** by adding CNAME records (recommended)
3. Optionally set up a **custom MAIL FROM domain** with MX records and SPF (TXT) records
4. Wait for AWS to **validate your DNS records** (typically within 72 hours)

### Email Address Verification
To verify an email address identity:
1. Request verification through the AWS SES console or API
2. Receive a **verification email** at the specified address
3. Click the **verification link** in the email
4. Confirmation is usually **immediate** after clicking the link

## Identity Status and Management

Each verified identity in AWS SES has a status that indicates its current verification state:
- **Pending** - Verification has been requested but not completed
- **Verified** - Successfully verified and ready for sending
- **Failed** - Verification attempt unsuccessful (e.g., DNS records not properly configured)
- **Temporary Failure** - Temporary issue with verification that may resolve automatically

Identity management features allow you to:
- **Track verification status** across all your identities
- Configure **sending authorizations** to permit other AWS accounts to send from your identities
- Set up **notification configurations** for bounces, complaints, and deliveries
- Implement **sending policies** to control which services can use your identities

## Verified Identities in Sandbox Mode

In [AWS SES sandbox mode](/aws-concepts/aws-sandbox), verified identities have additional restrictions:
- You can only **send to** other verified email addresses or domains
- [Sending quotas](/aws-concepts/aws-sending-quota) are limited to **200 emails per 24-hour period**
- [Sending rate](/aws-concepts/aws-sending-rate) is restricted to **1 email per second**

These limitations are removed once you request and receive [production access](/aws-concepts/aws-production-mode), but the requirement for sending from verified identities remains in place.

## Configuring Feedback Notifications

Verified identities serve as connection points for important email feedback mechanisms. For each identity, you can configure:
- **Bounce notifications** - Alert when emails can't be delivered
- **Complaint notifications** - Alert when recipients mark emails as spam
- **Delivery notifications** - Confirm when emails are successfully delivered

These notifications are typically sent to [Amazon SNS topics](/aws-concepts/aws-sns-topics), allowing you to process feedback events and maintain list hygiene. According to best practices documented in the [AWS SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html), properly handling these notifications is essential for maintaining a positive sender reputation.

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

- [Amazon SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SES Sandbox Mode](/aws-concepts/aws-sandbox)
- [AWS SES Production Mode](/aws-concepts/aws-production-mode)
- [AWS SES Sending Quotas](/aws-concepts/aws-sending-quota)
- [AWS SNS Topics](/aws-concepts/aws-sns-topics)
- [SPF (Sender Policy Framework)](/email-sending-concepts/spf)
- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim)

<GlossaryCTA />
