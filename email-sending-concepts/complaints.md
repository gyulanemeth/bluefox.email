---
title: Complaints | BlueFox Email
description: Email complaints occur when recipients report messages as spam, triggering feedback loops and potentially damaging sender reputation if not properly managed.
thumbnail: /assets/glossary/email-sending-glossary.png
sidebar: false
layout: post
category: glossary

datePublished: "2025-07-26"
dateModified: "2025-07-30"

faqs:
  - question: "Can I keep sending to someone who marked my email as spam?"
    answer: "No. Once someone has submitted a spam complaint, you should immediately stop sending to that address across all your email programs. Continuing to send after a complaint can severely damage your sender reputation and potentially violate anti-spam regulations."
  - question: "What's a \"safe\" complaint rate?"
    answer: "Industry standards consider complaint rates below 0.1% (1 complaint per 1,000 emails) to be acceptable. Most email service providers, including Amazon SES, enforce limits in this range. However, top-performing senders typically maintain rates below 0.05%."
  - question: "Why would someone mark my email as spam instead of unsubscribing?"
    answer: "Recipients often choose the spam button because it's more visible and convenient than finding the unsubscribe link. They may not trust the unsubscribe mechanism, might not recall signing up for your emails, or want to send a stronger message than unsubscribing. For many users, it's also simply a habitual action for managing unwanted email."
  - question: "How do I get access to complaint data?"
    answer: "Most major ESPs provide complaint data through direct integrations with feedback loops, webhook notifications, API endpoints, and real-time notification services like Amazon SNS. Many platforms also offer aggregate reporting in their dashboard for tracking complaint metrics over time."
relatedContent:
  - title: Bounces
    url: /email-sending-concepts/bounces
  - title: Email Authentication
    url: /email-sending-concepts/email-authentication
  - title: SPF (Sender Policy Framework)
    url: /email-sending-concepts/spf
  - title: DKIM (DomainKeys Identified Mail)
    url: /email-sending-concepts/dkim
  - title: DMARC
    url: /email-sending-concepts/dmarc
  - title: Amazon SNS (Simple Notification Service)
    url: /aws-concepts/sns
  - title: Amazon SES (Simple Email Service)
    url: /aws-concepts/ses

head:
  - - meta
    - name: description
      content: Email complaints occur when recipients report messages as spam, triggering feedback loops and potentially damaging sender reputation if not properly managed.
  - - meta
    - property: og:title
      content: Complaints | BlueFox Email
  - - meta
    - property: og:description
      content: Email complaints occur when recipients report messages as spam, triggering feedback loops and potentially damaging sender reputation if not properly managed.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/email-complaints
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complaints | BlueFox Email
  - - meta
    - name: twitter:description
      content: Email complaints occur when recipients report messages as spam, triggering feedback loops and potentially damaging sender reputation if not properly managed.
---
<GlossaryNavigation/>

# Complaints

**Complaints** occur when recipients actively report an email as unwanted or spam through their email client or service provider. These reports directly impact sender reputation and [deliverability](/email-sending-concepts/deliverability), making complaint management essential for professional email operations. Understanding the nature and implications of complaints is crucial for maintaining a healthy sending program.

## What are Complaints?

Complaints are formal reports made by recipients who consider a message to be unwanted, inappropriate, or deceptive. The most common form of complaint happens when a user clicks the **"Mark as Spam"** or **"Report Spam"** button in their email client. These actions trigger notifications through **Feedback Loops (FBLs)** that alert the sender about the complaint. According to [AWS guidelines](https://docs.aws.amazon.com/ses/latest/dg/reputationdashboardmessages.html#calculate-complaint), complaint rates should remain **below 0.1%** (1 complaint per 1,000 emails) to maintain good deliverability. Major mailbox providers like Gmail, Yahoo, and Microsoft use complaint rates as a primary metric when determining whether to deliver future emails to the inbox or the spam folder.

## How Complaints Work

The complaint process typically follows a specific workflow: a recipient receives an email they consider unwanted, they click **"Report Spam"** or a similar button in their email client, the mailbox provider records this action, and if the sender participates in Feedback Loops, the provider sends a notification back to the sender. The sender's email system then processes this complaint and takes appropriate action.

While mailbox providers like Yahoo and Microsoft provide traditional Feedback Loops (FBLs), **Gmail is a notable exception**. Instead, Gmail aggregates user engagement signals, including spam reports, and adjusts sender reputation accordingly without providing individual complaint data. This makes it even more important to monitor overall complaint trends across all providers. Most FBLs deliver notifications through **standardized Abuse Reporting Format (ARF) messages**, which contain metadata about the original message and the complaint. Services like [Amazon SES](/aws-concepts/ses) automatically process these ARF messages and make the complaint data available through [Amazon SNS](/aws-concepts/sns) notifications for integration with suppression lists and monitoring systems.

## Types of Complaints

Complaints can be categorized into several types, each with different implications:

- **Spam Reports**: The most common complaint type occurs when recipients mark messages as spam. These can happen for various reasons:

  - Content they perceive as promotional when they expected transactional
  - Messages that appear too frequent or irrelevant
  - Emails they don't remember signing up for
  - Legitimate messages that resemble common spam patterns

- **Direct Complaints**: Some recipients bypass the "mark as spam" button and directly contact:

  - The sending organization's abuse desk
  - The sender's ESP abuse team
  - Industry watchdog organizations
  - Government agencies like the FTC

- **Feedback Loop Sources**: Major email providers that offer feedback loops include:
  - Yahoo FBL
  - Microsoft SNDS (Smart Network Data Services)
  - AOL FBL
  - Comcast FBL

Notable exceptions include **Gmail**, which doesn't provide traditional FBL data but instead uses aggregate complaint metrics to influence sender reputation. Direct complaints often indicate **more severe compliance issues** requiring immediate attention and investigation.

## How Email Service Providers Handle Complaints

Email service providers (ESPs) monitor complaint activity by integrating feedback loop data into their infrastructure. When a complaint is triggered, ESPs like [Amazon SES](/aws-concepts/ses) parse the ARF message, typically delivered via [Amazon SNS Topics](/aws-concepts/sns-topics) and automatically suppress the recipient’s address to prevent future delivery attempts. These systems also compile complaint metrics into dashboards, helping senders analyze trends, correlate complaints with campaign segments, and identify deliverability issues early. To protect their overall network reputation, ESPs may further adjust sending privileges based on complaint volume.

:::::::tip Just a heads up
In BlueFox Email, we automatically handle complaints for you. Just follow our instructions on setting up complaint webhook in your project settings, and whenever a recipient marks your email as spam, we’ll notify you by email. You can then take any necessary action, such as removing the email address from your list or all lists. You can also view complaint details in your project dashboard.
:::::::

## Impact of Complaints on Email Deliverability

Email complaints have an **immediate and significant impact** on sender reputation and deliverability. A single spam complaint carries more negative weight than multiple [bounces](/email-sending-concepts/bounces) because complaints represent an active negative choice by the recipient. Unlike bounces, which can be technical or passive, complaints are deliberate actions that signal user dissatisfaction.

Mailbox providers use complaint rates to determine how to handle future emails from the same sender. This assessment works alongside proper [email authentication](/email-sending-concepts/email-authentication) to evaluate overall sending quality. High complaint rates typically trigger progressively more severe consequences:

1. **Reduced inbox placement** with more messages going to spam
2. **Throttling** of sending speed and volume
3. **Temporary blocks** at the domain or IP level
4. **Permanent blacklisting** in severe cases

Email service providers enforce strict complaint thresholds as protective measures. According to [AWS's official guidelines](https://docs.aws.amazon.com/ses/latest/dg/reputationdashboardmessages.html#calculate-complaint), AWS SES will place accounts under review when complaint rates approach 0.1% and may **suspend sending capabilities** if rates consistently exceed this threshold. Maintaining low complaint rates by quickly addressing user feedback is therefore essential for email program success.

## Frequently Asked Questions About Email Complaints

### Can I keep sending to someone who marked my email as spam?

No. Once someone has submitted a spam complaint, you should immediately stop sending to that address across all your email programs. Continuing to send after a complaint can severely damage your sender reputation and potentially violate anti-spam regulations.

### What's a "safe" complaint rate?

Industry standards consider complaint rates **below 0.1%** (1 complaint per 1,000 emails) to be acceptable. Most email service providers, including Amazon SES, enforce limits in this range. However, top-performing senders typically maintain rates below 0.05%.

### Why would someone mark my email as spam instead of unsubscribing?

Recipients often choose the spam button because it's more visible and convenient than finding the unsubscribe link. They may not trust the unsubscribe mechanism, might not recall signing up for your emails, or want to send a stronger message than unsubscribing. For many users, it's also simply a habitual action for managing unwanted email.

### How do I get access to complaint data?

Most major ESPs provide complaint data through direct integrations with feedback loops, webhook notifications, API endpoints, and real-time notification services like Amazon SNS. Many platforms also offer aggregate reporting in their dashboard for tracking complaint metrics over time.

## Related Content

- [Bounces](/email-sending-concepts/bounces)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [SPF (Sender Policy Framework)](/email-sending-concepts/spf)
- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim)
- [DMARC (Domain-based Message Authentication, Reporting, and Conformance)](/email-sending-concepts/dmarc)
- [Amazon SNS (Simple Notification Service)](/aws-concepts/sns)
- [Amazon SES (Simple Email Service)](/aws-concepts/ses)

<GlossaryCTA />

