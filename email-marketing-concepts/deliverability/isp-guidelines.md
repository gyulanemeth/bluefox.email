---
title: ISP Guidelines and Sending Practices
description: Mailbox providers like Gmail, Outlook, and Yahoo evaluate senders on volume patterns, engagement, and content quality. Understanding those signals helps keep your email program out of the spam folder.
---

# ISP Guidelines and Sending Practices

**ISP guidelines** are the sending practices and technical requirements that mailbox providers (commonly still called ISPs, short for Internet Service Providers, though the major ones today are really webmail platforms like Gmail, Outlook, and Yahoo) expect senders to follow. These aren't a single published rulebook so much as a combination of official requirements and inferred spam-filtering behavior. Following them closely is central to [email deliverability](/email-marketing-concepts/deliverability/) and works alongside [sender reputation](/email-marketing-concepts/deliverability/sender-reputation) and proper [email authentication](/email-marketing-concepts/deliverability/email-authentication) to determine inbox placement.

## How Mailbox Providers Evaluate Senders

Gmail, Outlook, and Yahoo each run their own spam-filtering systems, but they evaluate senders on broadly similar dimensions:

- **Authentication status**: whether SPF, DKIM, and DMARC pass and align
- **Sending reputation**: the sender's history of complaints, bounces, and engagement
- **Volume and frequency patterns**: whether sending behavior looks consistent or erratic
- **Recipient engagement**: whether people who receive the mail actually open, click, or reply to it
- **Content signals**: structure, links, formatting, and language in the message itself

No single signal decides placement on its own; filters weigh all of them together, which is why a sender can pass authentication checks and still land in spam if engagement or content signals are weak.

## Staying Within Volume and Frequency Norms

Mailbox providers watch for sending patterns that look automated or abusive rather than for any fixed numeric limit. In general terms, sudden spikes (going from a trickle of emails to a huge blast overnight) look abnormal even if every recipient technically opted in. The safer pattern is steady, predictable volume that grows gradually as your list and sending history grow with it. The same logic applies to frequency: subscribers who signed up expecting occasional updates and suddenly receive daily email are more likely to complain or disengage, both of which feed directly back into reputation.

## Content-Quality Signals Spam Filters Look At

Modern spam filters read the content of a message, not just its metadata, and weigh a range of structural and stylistic signals rather than a simple keyword blocklist. Commonly evaluated signals include:

- **Text-to-image ratio**: an email that's almost entirely one large image, with little real text, resembles a common spam pattern
- **Link quality and destination**: too many links, mismatched link text and destination, or links through generic URL shorteners can look suspicious to filters (see [why shortened links can send your emails to spam](/posts/why-shortened-links-send-your-emails-to-spam) for more detail on this specific issue)
- **Formatting and HTML quality**: broken HTML, excessive font colors/sizes, or code that resembles bulk-mail templates known to be abused
- **Subject line and language patterns**: excessive capitalization, punctuation, or classic spam-trigger phrasing
- **Personalization and relevance**: generic, one-size-fits-all content is more likely to be ignored or reported than content tailored to the recipient

None of these signals is disqualifying in isolation, but they compound. An email with a poor text-to-image ratio, a shortened link, and generic subject-line phrasing is far more likely to be filtered than one with just a single one of those issues.

## Why Warming Up a New Sending Domain or IP Matters

A brand-new sending domain or IP has no history for mailbox providers to evaluate, and no history reads as risk rather than neutrality. **Warming up** means starting with low, gradually increasing send volume to your most engaged subscribers, giving mailbox providers a chance to build a positive history before you send at full volume. Skipping this step (sending a full list's worth of email from day one on a new domain) is one of the most common causes of a new sending setup landing in spam immediately, independent of how well-configured authentication or content might be. Warm-up is typically a matter of weeks, not days, and should prioritize sending to recipients who are most likely to open and engage, since early engagement is what builds the positive signal.

## Engagement-Based Filtering

Increasingly, mailbox providers filter based less on the sender in isolation and more on how a specific recipient's own inbox behaves toward that sender. This is why the same sender can land in one person's inbox and another person's spam folder at the same time. Gmail in particular is known to personalize filtering based on an individual user's past interactions with a sender. Practically, this means engagement isn't just a vanity metric: consistently emailing people who don't open or click trains the mailbox provider that your mail is unwanted for that segment, which can suppress delivery even to engaged subscribers if disengaged segments make up too much of the send. Regularly removing or re-engaging cold segments, a core part of [list management](/email-marketing-concepts/list-management/), directly protects against this.

## Related Content

- [Email Deliverability](/email-marketing-concepts/deliverability/)
- [Sender Reputation](/email-marketing-concepts/deliverability/sender-reputation)
- [Email Authentication (SPF, DKIM, DMARC)](/email-marketing-concepts/deliverability/email-authentication)
- [List Management](/email-marketing-concepts/list-management/)
