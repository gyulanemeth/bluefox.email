---
title: SPF (Sender Policy Framework) | BlueFox Email
description: SPF is an email authentication method that specifies which mail servers are authorized to send emails on behalf of your domain, helping prevent email spoofing and improving deliverability.
thumbnail: /assets/glossary/email-sending-glossary.png

layout: post
category: glossary
sidebar: false
datePublished: "2023-02-10"
dateModified: "2023-10-05"
termName: "SPF (Sender Policy Framework)"
termDescription: "An email authentication protocol that allows domain owners to specify which mail servers are authorized to send email on behalf of their domain, helping to prevent email spoofing and improve deliverability."
faqs:
  - question: "What is SPF in email?"
    answer: "SPF (Sender Policy Framework) is an email authentication protocol that allows domain owners to specify which mail servers are authorized to send email on behalf of their domain. It creates a DNS record that lists authorized sending servers, helping receiving mail servers verify if an email claiming to be from your domain is legitimate."
  - question: "How does SPF work?"
    answer: "SPF works by publishing a DNS TXT record that lists all authorized IP addresses and servers that can send email from your domain. When a receiving mail server gets an email claiming to be from your domain, it checks the sending server's IP against your published SPF record. If the IP is listed, the email passes SPF authentication."
  - question: "What does an SPF record look like?"
    answer: "A basic SPF record looks like this: v=spf1 ip4:192.168.1.1 include:_spf.example.com ~all. This specifies SPF version 1, authorizes the IP address 192.168.1.1, includes all IPs authorized for example.com, and suggests a soft fail (~all) for all other sources."
  - question: "Why is SPF important for email deliverability?"
    answer: "SPF improves email deliverability by helping prevent your domain from being used in spoofing and phishing attacks. Emails that pass SPF checks are less likely to be marked as spam. Many email providers consider SPF authentication when determining whether to deliver emails to the inbox or spam folder."

head:
  - - meta
    - name: description
      content: SPF is an email authentication method that specifies which mail servers are authorized to send emails on behalf of your domain, helping prevent email spoofing and improving deliverability.
  - - meta
    - property: og:title
      content: SPF (Sender Policy Framework) | BlueFox Email
  - - meta
    - property: og:description
      content: SPF is an email authentication method that specifies which mail servers are authorized to send emails on behalf of your domain, helping prevent email spoofing and improving deliverability.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/spf
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: SPF (Sender Policy Framework) | BlueFox Email
  - - meta
    - name: twitter:description
      content: SPF is an email authentication method that specifies which mail servers are authorized to send emails on behalf of your domain, helping prevent email spoofing and improving deliverability.
---
<GlossaryNavigation/>

# SPF (Sender Policy Framework)

When sending an email on behalf of your company or brand, it is essential to ensure that it reaches the recipient's inbox instead of being diverted to their spam folder or blocked entirely. One of the key mechanisms to achieve this is the **Sender Policy Framework (SPF)**.

This protocol functions as a **gatekeeper for your email domain**, specifying which mail servers are authorized to send emails using your domain name. If an email is received from a server not listed in the SPF record, the recipient's email system may choose to reject it or mark it as suspicious.

For those sending emails at scale, whether for marketing, transactional communications, or customer support, establishing this authentication method should be one of your initial priorities.

## What is SPF?

This framework enables domain owners to **specify which mail servers are authorized** to send emails on their behalf.

This authorization information is stored in the domain's **[DNS](/email-sending-concepts/dns) settings as a [TXT record](/email-sending-concepts/txt-record)**. When an email is received from your domain, the recipient's email system verifies the SPF record to ensure that the sending server is permitted.

In the absence of proper authentication, unauthorized individuals could send emails impersonating your domain, a common method employed in [phishing attacks](/email-sending-concepts/email-spoofing). Implementing proper verification clarifies the legitimate entities authorized to represent your brand through email communications.

## How Does SPF Work?

At its core, this protocol enables receiving mail servers to confirm if an incoming email originates from an **authorized source** within the sender's domain. This verification occurs automatically during delivery in a fraction of a second.

Upon sending an email, the sending server uses the [return-path](/email-sending-concepts/return-path) address for identification. The recipient's server retrieves the SPF record for that domain from DNS. This TXT record includes a list of permitted IP addresses and domains authorized to send emails on behalf of the domain owner.

The recipient server compares the sending server's IP address against the SPF record. If there is a match, the email **passes SPF verification**. If not, it may be flagged or rejected based on the recipient's policies.

`v=spf1 ip4:192.0.2.0/24 include:thirdparty.com include:_spf.google.com ~all`

Let's break it down:

- `v=spf1`: Specifies SPF version 1.
- `ip4:192.0.2.0/24`: Authorizes all IPs within this IPv4 range.
- `include:thirdparty.com`: Allows third-party services specified in their SPF record.
- `include:_spf.google.com`: Permits Google Workspace servers.
- `~all`: Applies a soft fail for any sources not listed.

This configuration functions like a **guest list**. If a sending server is not included, the receiving server can choose to accept, flag, or reject the message. Proper SPF setup enhances email [deliverability](/email-sending-concepts/deliverability) and protects your domain from misuse.

## Why is SPF Important?

It is essential for two primary reasons:

**First**, it **safeguards your brand against impersonation**. In the absence of SPF, cybercriminals can easily send fraudulent emails using your domain, which can undermine trust and result in security vulnerabilities.

**Second**, it **enhances your email deliverability**. Email platforms such as Gmail, Outlook, and Yahoo evaluate SPF records to decide whether an email should be directed to the inbox or the spam folder. Emails that successfully pass SPF checks have a significantly higher chance of reaching the inbox.

In summary, SPF fosters trust with email providers, protects your audience from fraudulent activities, and ensures that your legitimate emails are delivered to the appropriate destination.

## Frequently Asked Questions About SPF

### What is the main purpose of SPF?

SPF (Sender Policy Framework) helps prevent spoofing by specifying which mail servers are allowed to send emails on behalf of your domain.

### Does SPF protect the "From" address?

No. SPF checks the return-path (envelope sender), not the visible From address seen by recipients.

### What happens if SPF fails?

If SPF fails, the receiving server may mark the message as spam, reject it, or ignore the result depending on its local policy and [DMARC](/email-sending-concepts/dmarc) settings.

### Can SPF break email forwarding?

Yes. When an email is forwarded, the forwarder's IP may not be authorized in the original domain's SPF record, causing SPF to fail unless SRS (Sender Rewriting Scheme) is used.

## Related Content

:::tip Practical Guide
**[How SPF, DKIM, and DMARC Actually Work (With Real Examples)](/posts/how-spf-dkim-and-dmarc-actually-work-with-real-examples)** — Learn how to verify SPF records with the `dig` command and understand how they're checked in real email scenarios.
:::

- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim)
- [DMARC (Domain-based Message Authentication, Reporting, and Conformance)](/email-sending-concepts/dmarc)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [Email Spoofing](/email-sending-concepts/email-spoofing)
- [Return Path](/email-sending-concepts/return-path)

<GlossaryCTA />
