---
title: Hard Bounce | BlueFox Email
description: A hard bounce is a permanent email delivery failure that indicates the email address is invalid or no longer exists, requiring immediate removal from mailing lists.
thumbnail: /assets/glossary/email-sending-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: A hard bounce is a permanent email delivery failure that indicates the email address is invalid or no longer exists, requiring immediate removal from mailing lists.
  - - meta
    - property: og:title
      content: Hard Bounce | BlueFox Email
  - - meta
    - property: og:description
      content: A hard bounce is a permanent email delivery failure that indicates the email address is invalid or no longer exists, requiring immediate removal from mailing lists.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/hard-bounce
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Hard Bounce | BlueFox Email
  - - meta
    - name: twitter:description
      content: A hard bounce is a permanent email delivery failure that indicates the email address is invalid or no longer exists, requiring immediate removal from mailing lists.
---
<GlossaryNavigation/>

# Hard Bounce

A **hard bounce** is a **permanent email delivery failure** that occurs when an email cannot be delivered due to persistent, unresolvable issues with the recipient's address. Unlike [soft bounces](/email-sending-concepts/soft-bounce) which may be temporary, hard bounces represent definitive delivery failures requiring immediate action from senders.

## What Causes Hard Bounces?

Hard bounces occur for several specific reasons related to permanent delivery obstacles:

- **Invalid email address**: The email address contains typos or formatting errors (e.g., missing the @ symbol, incorrect domain spelling)
- **Non-existent address**: The username portion of the address doesn't exist at the specified domain
- **Closed or deleted account**: The recipient's account once existed but has since been terminated
- **Non-existent domain**: The domain portion of the address no longer exists or has expired
- **Blocked recipient**: The recipient's mailbox has explicitly blocked messages from your sending domain
- **Permanent administrative prohibition**: The receiving mail server has implemented policies that permanently prevent delivery

Each of these causes results in a permanent failure notification, typically accompanied by a 5XX SMTP error code. For example, a 550 error with a message like "Mailbox not found" or "User unknown" definitively indicates a hard bounce condition.

## Why Hard Bounces Matter

Hard bounces are critically important because they **directly impact sender reputation** with mailbox providers like Gmail, Yahoo, and Outlook. These providers analyze hard [bounce rates](/email-sending-concepts/bounce-rate.md) as a primary indicator of list quality and sending practices. According to [AWS SES guidelines](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html), maintaining hard bounce rates below **2%** is essential for optimal deliverability, with rates approaching 5% triggering account reviews and potential sending restrictions. Major email providers implement **progressively stricter delivery filtering** as hard bounce rates increase, leading to decreased inbox placement even for messages sent to valid addresses. The consequences extend beyond deliverability issues, as repeatedly sending to known hard bounce addresses may constitute negligent list management under regulations like CAN-SPAM and GDPR, potentially increasing legal liability.

## Hard Bounce Error Codes

Hard bounces are typically identified by their SMTP response codes in the 5XX range, indicating permanent failures:

| SMTP Code | Common Description          | Example Message                                    |
| --------- | --------------------------- | -------------------------------------------------- |
| 550       | Mailbox unavailable         | "550 Mailbox not found" or "550 User unknown"      |
| 551       | User not local              | "551 User not local; please try forward-path"      |
| 552       | Exceeded storage allocation | "552 Mailbox size limit exceeded" (when permanent) |
| 553       | Mailbox name invalid        | "553 Mailbox name not allowed"                     |
| 554       | Transaction failed          | "554 Transaction failed"                           |

These 5XX codes specifically indicate that the server has determined the failure condition is permanent and repeated delivery attempts will not succeed.

## Handling Hard Bounces

Hard bounces demand **immediate removal** of affected addresses from all active mailing lists and their addition to a **permanent suppression list**. Unlike soft bounces, these addresses won't benefit from retry attempts and keeping them on your lists risks serious damage to your sender reputation. The most effective strategy is implementing **real-time validation** at collection points to prevent invalid addresses from entering your system in the first place, significantly reducing future hard bounce incidents.

Professional senders should regularly **analyze bounce patterns** to identify potential issues with specific list segments or acquisition sources. While most Email Service Providers automatically handle suppression and blocking of hard bounced addresses, maintaining proper **compliance documentation** of removals remains the sender's responsibility. This dual approach of prevention and meticulous management creates a robust defense against the deliverability and reputation challenges that hard bounces present.

:::tip Just a heads up
In BlueFox Email, we automatically handle bounces for you. Just follow our instructions on setting up bounce webhook in your project settings, and whenever there is a **hard bounce**, we will automatically add the email address to the suppression list to prevent future sending attempts. You will also receive an email notification when a bounce occurs, allowing you to take necessary actions, such as removing the email address from your list or all lists. You can also view bounce reports in your dashboard to monitor trends.
:::

## Frequently Asked Questions About Hard Bounces

### How are hard bounces different from soft bounces?

Hard bounces represent permanent, unresolvable delivery failures (like non-existent addresses), while soft bounces are temporary issues (like full mailboxes) that may resolve with time. Hard bounces require immediate list removal, whereas soft bounces typically trigger retry attempts.

### Can a hard bounced email address ever become deliverable again?

Generally, no. Once an address has generated a hard bounce due to being invalid, non-existent, or closed, it typically remains undeliverable. In rare cases, if a domain temporarily disappeared but was restored, an address might become valid again, but this is uncommon and not worth the reputation risk of continued sending attempts.

### What is an acceptable hard bounce rate?

Industry standards consider hard bounce rates below 0.5% to be excellent, while rates between 0.5-2% are acceptable but suggest list hygiene opportunities. Hard bounce rates above 2% indicate serious list quality issues that require immediate attention. Most ESPs have even stricter thresholds for enforcement actions.

### How quickly should I remove hard bounced addresses from my list?

Hard bounced addresses should be removed immediately upon the first bounce occurrence. There is no benefit to waiting or attempting redelivery, as the failure condition is permanent. Modern email systems typically handle this automatically through suppression list management.

## Related Content

- [Bounces](/email-sending-concepts/bounces)
- [Soft Bounce](/email-sending-concepts/soft-bounce)
- [Bounce Rate](/email-sending-concepts/bounce-rate)
- [SMTP](/email-sending-concepts/smtp)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [Amazon SNS (Simple Notification Service)](/aws-concepts/aws-sns)

<GlossaryCTA />
