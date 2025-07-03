---
title: Bounce Rate | BlueFox Email
description: Bounce rate measures the percentage of emails that couldn't be delivered to recipients, serving as a critical metric for email deliverability and sender reputation.
thumbnail: /assets/glossary/email-sending-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Bounce rate measures the percentage of emails that couldn't be delivered to recipients, serving as a critical metric for email deliverability and sender reputation.
  - - meta
    - property: og:title
      content: Bounce Rate | BlueFox Email
  - - meta
    - property: og:description
      content: Bounce rate measures the percentage of emails that couldn't be delivered to recipients, serving as a critical metric for email deliverability and sender reputation.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/bouncing-rate
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Bounce Rate | BlueFox Email
  - - meta
    - name: twitter:description
      content: Bounce rate measures the percentage of emails that couldn't be delivered to recipients, serving as a critical metric for email deliverability and sender reputation.
---

<SchemaMarkup
  type="TechArticle"
  title="Bounce Rate | BlueFox Email"
  description="Bounce rate measures the percentage of emails that couldn't be delivered to recipients, serving as a critical metric for email deliverability and sender reputation."
  url="https://bluefox.email/email-sending-concepts/bouncing-rate"
  image="https://bluefox.email/assets/glossary/email-sending-glossary.png"
  datePublished="2023-01-01"
  dateModified="2025-07-02"
  termName="Bounce Rate"
  termDescription="A critical email deliverability metric that measures the percentage of emails that failed to reach recipients' inboxes and were returned to the sender."
  :breadcrumbs="[
    { name: 'Email Sending Concepts', url: 'https://bluefox.email/email-sending-concepts/' },
    { name: 'Bounce Rate', url: 'https://bluefox.email/email-sending-concepts/bouncing-rate' }
  ]"
  :faqs="[
    {
      question: 'What\'s the difference between bounce rate and delivery rate?',
      answer: 'Bounce rate measures failed deliveries (percentage of emails that couldn\'t be delivered), while delivery rate measures successful deliveries (percentage of emails that reached recipients\' mail servers). They are inversely related: Delivery Rate (%) = 100% - Bounce Rate (%).'
    },
    {
      question: 'Do soft bounces count in bounce rate calculations?',
      answer: 'Most ESPs include soft bounces in bounce rate calculations only after retry attempts have failed (typically after 24-72 hours), but specific handling varies by provider. AWS SES, for example, only includes soft bounces in bounce metrics when it\'s no longer attempting delivery.'
    },
    {
      question: 'How quickly should I remove hard-bouncing addresses?',
      answer: 'Hard bounces should be removed immediately after the first occurrence. Continued sending to these addresses can significantly damage sender reputation.'
    },
    {
      question: 'Can temporary factors cause bounce rate spikes?',
      answer: 'Yes, external factors like major ISP outages, mailbox provider policy changes, or technical issues can cause temporary bounce rate increases. Monitor industry news and differentiate between systemic issues and list problems.'
    },
    {
      question: 'How do authentication protocols like DKIM and SPF affect bounce rates?',
      answer: 'While authentication doesn\'t directly reduce bounces caused by invalid addresses, proper implementation can improve overall deliverability and prevent legitimate emails from being rejected due to security concerns, potentially decreasing certain types of soft bounces.'
    }
  ]"
/>

<GlossaryNavigation />

# Bounce Rate

**Bounce rate** is a critical email deliverability metric that measures the percentage of emails that failed to reach recipients' inboxes and were returned to the sender. This metric serves as a direct indicator of list quality, sending practices, and overall email program health.

## Understanding Bounce Rate

Bounce rate is calculated by dividing the number of bounced emails by the total number of emails sent, then multiplying by 100 to get a percentage:

```
Bounce Rate (%) = (Number of Bounced Emails ÷ Total Emails Sent) × 100
```

For example, if you send 10,000 emails and 200 bounce, your bounce rate is 2%.

While bounce rate typically encompasses both [hard bounces](/email-sending-concepts/hard-bounce) and [soft bounces](/email-sending-concepts/soft-bounce), email service providers (ESPs) often handle them differently:

- **Hard bounce rate** includes only permanent failures (non-existent addresses, blocked domains)
- **Total bounce rate** combines both hard and soft bounces in the calculation
- **Adjusted bounce rate** may exclude specific soft bounce types or include only bounces after retry attempts fail

Each ESP defines bounce rate calculation slightly differently, so it's important to understand how your specific provider measures this metric.

## Industry Standards and Thresholds

Email providers and inbox placement algorithms use bounce rates as key indicators of sender quality. According to [AWS SES documentation](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html), here are the generally accepted thresholds:

| Bounce Rate | Classification | Consequence                                            |
| ----------- | -------------- | ------------------------------------------------------ |
| <2%         | Healthy        | Good sending reputation                                |
| 2-5%        | Concerning     | Potential deliverability issues and flags              |
| >5%         | Problematic    | High risk of blocks, throttling, or account suspension |
| >10%        | Critical       | Almost certain sending restrictions or blockages       |

Email providers like Gmail, Yahoo, and Microsoft apply their own internal thresholds, but generally align with these industry standards. AWS SES specifically enforces a 5% maximum bounce rate for [production sending](/aws-concepts/ses-production-access.md), accounts exceeding this face potential review and restrictions.

## Impact of High Bounce Rates

High bounce rates can trigger a cascade of negative consequences for email senders:

1. **Damaged Sender Reputation**: Email providers interpret high bounce rates as indicators of poor list management
2. **Reduced Deliverability**: Messages may be filtered to spam folders or rejected outright
3. **IP/Domain Blocking**: Persistent high bounce rates can lead to blacklisting
4. **Resource Waste**: Sending to invalid addresses wastes time, money and computing resources
5. **ESP Penalties**: Many providers suspend or throttle accounts with excessive bounces

According to [AWS SES documentation](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html), "excessively high bounce and complaint rates may jeopardize your ability to send emails" through their service.

## Strategies for Reducing Bounce Rates

Maintaining healthy bounce rates requires proactive list hygiene and sending practices:

### Immediate Actions

Addressing elevated bounce rates requires decisive intervention through **immediate list hygiene**. Start by permanently removing all hard bounces from your database, as continued sending damages reputation. Create a dedicated re-engagement campaign for consistently soft-bouncing addresses before potential removal. Implement **double opt-in verification** for all new sign-ups to confirm address validity before adding to your active list. Consider leveraging **email validation services** that screen addresses for deliverability issues before sending, particularly for large imported lists or high-value campaigns.

### Ongoing Practices

Maintaining healthy bounce rates requires consistent **list maintenance** as a cornerstone practice. Regularly purge inactive subscribers after appropriate re-engagement attempts, focusing on engagement signals rather than mere list size. Implement **progressive profiling** to gather accurate contact information incrementally rather than overwhelming new subscribers. Establish systems to **monitor bounce patterns** across different domains and campaigns to identify emerging deliverability issues. Ensure proper **authentication setup** ([SPF](/email-sending-concepts/spf.md), [DKIM](/email-sending-concepts/dkim.md), [DMARC](/email-sending-concepts/dmarc.md)) as foundational protection against certain technical bounces, and register for **feedback loops** with major email providers to receive bounce notifications directly.

## Bounce Rate Monitoring Best Practices

Effective bounce management depends on comprehensive **measurement systems** that track different bounce types separately while establishing **proactive thresholds** that trigger alerts before rates become problematic. Implement **domain segmentation** in your analytics to identify provider-specific delivery issues, as patterns often emerge with specific email services before affecting your entire program. Conduct regular **campaign analysis** comparing bounce rates across different message types and sending patterns, while maintaining **trend analysis** to spot gradual degradation in list quality or engagement that might otherwise go unnoticed between campaigns.

## Frequently Asked Questions

### What's the difference between bounce rate and delivery rate?

Bounce rate measures failed deliveries (percentage of emails that couldn't be delivered), while delivery rate measures successful deliveries (percentage of emails that reached recipients' mail servers). They are inversely related: `Delivery Rate (%) = 100% - Bounce Rate (%)`.

### Do soft bounces count in bounce rate calculations?

Most ESPs include soft bounces in bounce rate calculations only after retry attempts have failed (typically after 24-72 hours), but specific handling varies by provider. AWS SES, for example, only includes soft bounces in bounce metrics when it's no longer attempting delivery.

### How quickly should I remove hard-bouncing addresses?

Hard bounces should be removed immediately after the first occurrence. Continued sending to these addresses can significantly damage sender reputation.

### Can temporary factors cause bounce rate spikes?

Yes, external factors like major ISP outages, mailbox provider policy changes, or technical issues can cause temporary bounce rate increases. Monitor industry news and differentiate between systemic issues and list problems.

### How do authentication protocols like DKIM and SPF affect bounce rates?

While authentication doesn't directly reduce bounces caused by invalid addresses, proper implementation can improve overall deliverability and prevent legitimate emails from being rejected due to security concerns, potentially decreasing certain types of soft bounces.

## Related Content

- [Bounces](/email-sending-concepts/bounces)
- [Hard Bounce](/email-sending-concepts/hard-bounce)
- [Soft Bounce](/email-sending-concepts/soft-bounce)
- [SMTP](/email-sending-concepts/smtp)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [Amazon SNS (Simple Notification Service)](/aws-concepts/sns)

<GlossaryCTA />