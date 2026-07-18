---
title: Email Authentication (SPF, DKIM, DMARC)
description: SPF, DKIM, and DMARC are the three authentication standards that prove an email really came from your domain. Together, they're the baseline mailbox providers now expect from every sender.
---

# Email Authentication (SPF, DKIM, DMARC)

**Email authentication** is the set of technical standards that let a mailbox provider verify an email genuinely came from the domain it claims to be from, rather than from someone spoofing that domain. The three standards that matter (SPF, DKIM, and DMARC) work together, and each covers a gap the others leave open. Authentication is one of the strongest levers you have over [sender reputation](/email-marketing-concepts/deliverability/sender-reputation) and is foundational to [email deliverability](/email-marketing-concepts/deliverability/) generally. For a deeper technical walkthrough with real header examples, see [How SPF, DKIM, and DMARC Actually Work (With Real Examples)](/posts/how-spf-dkim-and-dmarc-actually-work-with-real-examples).

## SPF: Sender Policy Framework

**SPF** is a DNS record that lists which mail servers are allowed to send email on behalf of your domain. When a receiving server gets an email, it checks the sending server's IP address against the SPF record published for the domain in the message's envelope sender (the Return-Path address), not necessarily the visible "From" address a recipient sees. If the IP isn't on the list, the email fails SPF.

SPF's main limitation is that it only validates the server that sent the message, not the message itself. It also breaks easily when email is forwarded, because the forwarding server usually isn't on the original sender's approved list.

## DKIM: DomainKeys Identified Mail

**DKIM** adds a cryptographic signature to each outgoing email, generated using a private key that only the sending domain controls. The receiving server looks up the corresponding public key in DNS and verifies the signature. If any part of the signed content was altered in transit, the signature fails to validate.

Unlike SPF, DKIM travels with the message itself and generally survives forwarding, which makes it a more durable form of proof. Its limitation is that it verifies message integrity and origin, but on its own it doesn't tell the receiving server what to do if verification fails: that's DMARC's job.

## DMARC: Domain-based Message Authentication, Reporting, and Conformance

**DMARC** ties SPF and DKIM together and adds two things neither has alone: a published policy telling receiving servers what to do with mail that fails authentication (monitor, quarantine, or reject), and a reporting mechanism that sends the domain owner data on who is sending mail using their domain. DMARC requires that a message pass SPF or DKIM (or both), and that the passing identifier align with the visible "From" domain. See [DMARC for SaaS](/email-best-practices-for-saas/dmarc) for a closer look at setting a DMARC policy specifically for a SaaS sending domain.

## Why All Three Need to Work Together

Each protocol closes a gap the others leave open:

| Protocol | What it proves | What it misses |
|---|---|---|
| SPF | This server is allowed to send for this domain | Breaks on forwarding; doesn't verify message content |
| DKIM | This message wasn't altered and came from a key holder | Doesn't define what to do on failure |
| DMARC | Ties SPF/DKIM to the visible From address, sets enforcement policy | Depends on SPF and/or DKIM being correctly configured first |

A domain with only SPF can still be spoofed by forwarded or altered mail. A domain with only DKIM has no enforcement policy telling receivers to reject spoofed mail. Only when all three are configured, and aligned with each other, does a domain have real protection against being impersonated in phishing attempts, and real credibility in the eyes of spam filters.

## Why Authentication Is Effectively Required Now

Major inbox providers, including Gmail and Yahoo, have moved from treating SPF, DKIM, and DMARC as best practice to treating them as a baseline requirement, particularly for anyone sending at meaningful volume. Senders without proper authentication increasingly see messages rejected outright or routed straight to spam, regardless of how well-crafted the content is. This shift reflects the same logic driving reputation systems generally: authentication is what allows a mailbox provider to reliably attribute mail to a sender in the first place, and without that attribution, reputation and content signals have nothing solid to attach to.

Getting authentication right typically means: publishing an SPF record covering every legitimate sending source, enabling DKIM signing through your email service provider, and publishing a DMARC record, starting at a monitoring-only policy before moving to enforcement once you've confirmed all legitimate mail passes. You can check your own domain's current setup with the free checkers at [BlueFox's deliverability tools](/tools/deliverability/).

## Related Content

- [Sender Reputation](/email-marketing-concepts/deliverability/sender-reputation)
- [ISP Guidelines and Sending Practices](/email-marketing-concepts/deliverability/isp-guidelines)
- [How SPF, DKIM, and DMARC Actually Work (With Real Examples)](/posts/how-spf-dkim-and-dmarc-actually-work-with-real-examples)
- [Deliverability Tools](/tools/deliverability/)
