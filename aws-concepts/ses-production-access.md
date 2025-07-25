---
title: Amazon SES Production Access | BlueFox Email
description: Learn about AWS SES production access, how it differs from sandbox mode, requirements for gaining production access, and best practices for maintaining production status.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

datePublished: 2025-06-30
dateModified: 2025-06-30

faqs:
  - question: How long does it take to get production access?
    answer: Most requests are reviewed within 24–48 hours. Complex cases or unusually high requested limits may require additional time.
  - question: Can my account be returned to sandbox status?
    answer: Yes. Accounts that consistently exceed bounce or complaint thresholds, or violate sending policies, may be reverted to sandbox mode or throttled.
  - question: Do I need to request production access for each AWS region?
    answer: Yes. SES production access is region-specific. You must apply separately for each region where you intend to send email.
  - question: How do I know if my account is in production mode?
    answer: The SES dashboard shows your account limits. If your quota exceeds 200 emails/day and you can send to unverified recipients, your account is in production.

relatedContent:
  - title: AWS SES (Simple Email Service)
    url: /aws-concepts/ses
  - title: AWS SES Sandbox
    url: /aws-concepts/ses-sandbox
  - title: AWS SES Sending Quotas
    url: /aws-concepts/ses-sending-quota
  - title: AWS SES Sending Rates
    url: /aws-concepts/ses-sending-rate
  - title: AWS SNS (Simple Notification Service)
    url: /aws-concepts/sns
  - title: Email Authentication
    url: /email-sending-concepts/email-authentication
  - title: Bounce Rate
    url: /email-sending-concepts/bounce-rate
  - title: Complaints
    url: /email-sending-concepts/complaints

head:
  - - meta
    - name: description
      content: Learn about AWS SES production access, how it differs from sandbox mode, requirements for gaining production access, and best practices for maintaining production status.
  - - meta
    - property: og:title
      content: Amazon SES Production Access | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about AWS SES production access, how it differs from sandbox mode, requirements for gaining production access, and best practices for maintaining production status.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/ses-production-access
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon SES Production Access | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about AWS SES production access, how it differs from sandbox mode, requirements for gaining production access, and best practices for maintaining production status.
---
<GlossaryNavigation/>
# Amazon SES Production Access

**Amazon SES Production Access** is the unrestricted operational state that follows the initial [sandbox environment](/aws-concepts/ses-sandbox) for [AWS SES](/aws-concepts/ses.md) accounts. It removes sandbox limitations and enables sending to any recipient with higher volume and throughput capabilities.

## What Production Access Offers

When your account is approved for production access, the most immediate change is the ability to send emails to any valid recipient, not just to verified addresses. This unlocks full-scale outreach, allowing businesses to launch live campaigns and operational communications without manual whitelisting.

Alongside this, SES raises your **[sending quota](/aws-concepts/ses-sending-quota.md)** from 200 emails per day to a significantly higher baseline that varies based on your specific use case. Initial production quotas can be substantial, and AWS may automatically increase them further as you establish a positive sending reputation. These expanded thresholds are essential for businesses that rely on timely bulk delivery, like newsletters, transactional updates, and service alerts.

Production access still provides **full access to both the SES API and [SMTP](/email-sending-concepts/smtp.md) interface**. Nothing is gated or restricted, meaning you can integrate SES deeply into your infrastructure, use advanced features like configuration sets and event publishing, and operate email pipelines at scale.

Importantly, moving to production doesn’t mean SES stops monitoring your activity. In fact, email metrics like [bounce rate](/email-sending-concepts/bounce-rate.md), [complaint rate](/email-sending-concepts/complaints.md), and sending patterns are evaluated continuously. If your performance remains healthy, AWS may increase your [quotas](/aws-concepts/ses-sending-quota.md) automatically. On the other hand, violations or deteriorating metrics can result in reduced privileges or sandbox reinstatement. The system is built to reward good senders with growth while protecting the shared infrastructure from abuse.

## How Production Access Works

Access to production access must be formally requested through the [AWS Support Center](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html). During the review process, AWS evaluates whether your use case aligns with their policies and whether you’ve adopted responsible sending practices. This includes having verifiable opt-in processes, using [SPF](/email-sending-concepts/spf), [DKIM](/email-sending-concepts/dkim), and [DMARC](/email-sending-concepts/dmarc), and maintaining low bounce and complaint rates.

After approval, SES updates your account with new quota and rate values. These limits are **region-specific**, so if you're sending from multiple AWS regions, each one needs separate production access.

From that point forward, your account operates with full SES capability, subject to ongoing compliance.

:::tip Practical Guide
Learn how to successfully apply and maintain AWS SES production access with our detailed [step-by-step guide](/posts/how-to-get-and-maintain-production-access-to-amazon-ses).
:::

## Benefits of Production Access

Transitioning to production access is a key milestone for any email sender using SES. It removes the friction of manual testing and lets you engage with real users at real scale. Faster delivery throughput helps ensure that time-sensitive messages like password resets or security alerts reach inboxes promptly. Higher daily quotas allow for marketing and engagement at full volume, without artificial constraints.

Additionally, production access **supports better testing and optimization** across email clients and domains. You can observe how your emails behave across different providers and tune content accordingly. It also unlocks access to more sophisticated tooling in AWS, including feedback loops, delivery metrics via CloudWatch, and integration with [SNS](/aws-concepts/sns) for real-time event handling.

Ultimately, production access provides the stability and scalability needed for reliable email delivery, while still requiring adherence to best practices to maintain sender reputation and eligibility.

## Requirements for Production Access Approval

To move from [sandbox](/aws-concepts/ses-sandbox) to production, AWS expects a combination of technical readiness and policy compliance. Your use case should be clearly defined, whether it's marketing, transactional messaging, or system alerts and backed by an opt-in process that ensures recipients have agreed to receive communication.

Your email system should implement **robust [authentication](/email-sending-concepts/email-authentication.md)** via SPF, DKIM, and preferably DMARC, and include an unsubscribe link where applicable. AWS also looks for complaint and bounce handling mechanisms, typically using SES’s built-in feedback loop support through [SNS](/aws-concepts/sns) or your own monitoring tools.

The approval process strongly favors accounts with clean delivery metrics. A bounce rate under 5% and a complaint rate under 0.1% are often considered baseline indicators of responsible sending.

## Maintaining Production Status

After gaining production access, it’s important to maintain good sending behavior to preserve it. AWS continuously evaluates sender health using bounce and complaint metrics, email content quality, and delivery patterns. Violations, including high error rates or spam-like behavior, can result in reduced quotas or return to sandbox status.

Proactive maintenance includes regularly cleaning your mailing list to remove invalid or disengaged addresses, implementing backoff strategies for throttling errors, and analyzing bounce notifications in real time. Monitoring tools like CloudWatch can help you detect issues early and correct course before they affect your reputation.

If you plan a high-volume campaign, scale gradually rather than sending millions of emails all at once. Sudden traffic spikes, even if technically within quota, can damage [deliverability](/email-sending-concepts/deliverability) or trigger temporary throttling. Controlled growth signals trustworthiness to inbox providers and helps preserve your SES standing.

## Frequently Asked Questions About Production Mode

### How long does it take to get production access?

Most requests are reviewed within **24–48 hours**. Complex cases or unusually high requested limits may require additional time.

### Can my account be returned to sandbox status?

Yes. Accounts that consistently exceed bounce or complaint thresholds, or violate sending policies, may be reverted to sandbox mode or throttled.

### Do I need to request production access for each AWS region?

Yes. SES production access is region-specific. You must apply separately for each region where you intend to send email.

### How do I know if my account is in production mode?

The SES dashboard shows your account limits. If your quota exceeds 200 emails/day and you can send to unverified recipients, your account is in production.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SES Sandbox](/aws-concepts/ses-sandbox)
- [AWS SES Sending Quotas](/aws-concepts/ses-sending-quota)
- [AWS SES Sending Rates](/aws-concepts/ses-sending-rate)
- [AWS SNS (Simple Notification Service)](/aws-concepts/sns)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [Bounce Rate](/email-sending-concepts/bounce-rate)
- [Complaints](/email-sending-concepts/complaints)

<GlossaryCTA />
