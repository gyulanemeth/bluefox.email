---
title: DKIM (DomainKeys Identified Mail) | BlueFox Email
description: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
thumbnail: /assets/glossary/email-sending-glossary.png

layout: post
category: glossary
sidebar: false

datePublished: "2023-07-05"
dateModified: "2023-07-05"

faqs:
  - question: "What is DKIM?"
    answer: "DKIM (DomainKeys Identified Mail) is an email authentication method that adds a digital signature to messages, allowing receiving mail servers to verify if the message was sent by an authorized sender and wasn't altered in transit."
  - question: "Why is DKIM important?"
    answer: "DKIM is important because it helps prevent email spoofing and phishing by verifying the authenticity of email messages. It improves email deliverability and sender reputation, and works alongside SPF and DMARC to form a comprehensive email authentication system."
  - question: "How does DKIM work?"
    answer: "DKIM works by adding a digital signature to the email header using a private key that only the sender has access to. When the email is received, the receiving server can verify this signature using the public key published in the sender's DNS records. If the signature is valid, the email passed DKIM authentication."
  - question: "How do I set up DKIM for my domain?"
    answer: "To set up DKIM, you need to: 1) Generate a public/private key pair, 2) Publish the public key in your domain's DNS as a TXT record, 3) Configure your mail server or ESP to sign outgoing messages with the private key, and 4) Test your implementation using online DKIM verification tools."
relatedContent:
  - title: SPF (Sender Policy Framework)
    url: /email-sending-concepts/spf
  - title: DMARC
    url: /email-sending-concepts/dmarc
  - title: Email Authentication
    url: /email-sending-concepts/email-authentication
  - title: DNS (Domain Name System)
    url: /email-sending-concepts/dns
  - title: TXT Records
    url: /email-sending-concepts/txt-record
  - title: Email Spoofing
    url: /email-sending-concepts/email-spoofing
  - title: Deliverability
    url: /email-sending-concepts/deliverability

head:
  - - meta
    - name: description
      content: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
  - - meta
    - property: og:title
      content: DKIM (DomainKeys Identified Mail) | BlueFox Email
  - - meta
    - property: og:description
      content: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/dkim
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: DKIM (DomainKeys Identified Mail) | BlueFox Email
  - - meta
    - name: twitter:description
      content: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
---
<GlossaryNavigation/>

# DKIM (DomainKeys Identified Mail)

When starting with email marketing, it's essential to pay attention to DKIM. This isn't just a task for your tech team. It significantly influences whether your emails reach inboxes or end up in spam folders. Consider DKIM as your domain's signature on every email you send. Without it, mailbox providers such as Gmail or Outlook may doubt the authenticity of your emails.

## What is DKIM?

DKIM, or DomainKeys Identified Mail, establishes a trustworthy link between the domains sending emails and the messages themselves using cryptographic authentication. Think of it as a digital wax seal that not only identifies the sender but also ensures the message remains unchanged during delivery.

This system uses asymmetric cryptography, which involves two keys: a **private key** that is safely kept on the sending server to sign each outgoing email, and a **public key** that is available in [DNS](/email-sending-concepts/dns) for receiving servers to verify the signature.

When properly configured, each message contains a unique DKIM signature header that looks similar to this:

```
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=2021;
 t=1632735932; bh=2jUSOH9NhtVGCQWNr9BrIAPreKQjO6Sn7XIkfJVOzv8=;
 h=From:To:Subject:Date;
 b=AuUoFEfDxTDkHlLXSZEpZj79LICEps6eda7W3deTVFOk4yAUoqOB4nujc3jUZipdMes0pOT8QTr
 TlaPuauPvCTvXoPnXOEJ+YbEgEgy4pkCqCsY/+IrbG7i3gQsKQhcS7Ls8H5jQx7xQmyfeKdE9pm8O
 1v5a8JxG8In4qFwreJA=
```

## How Does DKIM Work?

It functions seamlessly in the background, ensuring that your emails are both trusted and free from tampering. When an email is dispatched via [SMTP](/email-sending-concepts/smtp.md), the sending mail server generates a digital signature that verifies the message's authenticity and integrity.

Here’s a detailed overview of the process:

**On the Sending Side:**

1. The server generates a hash of specific email headers along with the message body.
2. This hash is then encrypted using a private DKIM key that is securely stored on the server.
3. The resulting digital signature is appended to the email’s headers.

**On the Receiving Side:**

1. The recipient's server reads the DKIM signature and retrieves the domain and selector information.
2. It conducts a DNS lookup to obtain the corresponding public key (`selector._domainkey.domain.com`).
3. Using this public key, the server decrypts the signature from the email.
4. It recalculates the hash from the received message.
5. Finally, it compares both hashes to verify that the message has not been altered during transit.

When the signatures align, the email is considered **authentic**, indicating that it comes from an authorized domain and that the content has **not been altered** since it was sent. This validation process is swift, usually requiring only milliseconds, and is crucial for the filtering decisions made by inbox providers.

The selector in DKIM serves as a pointer to the appropriate key. This functionality allows organizations to periodically rotate keys for enhanced security or to assign different keys to various email platforms, such as distinguishing between marketing tools and transactional systems, without disrupting email delivery. Hence, **implementing DKIM is not just advisable; it is imperative**.

## Why Does DKIM Matter?

DKIM (DomainKeys Identified Mail) enhances the authenticity of your emails, fostering trust with email providers and your audience. It verifies that messages remain unaltered during transit, **preventing tampering** and **blocking scammers** from impersonating your domain without your private key. Leading email services, such as Gmail and Yahoo, utilize DKIM results to determine inbox [deliverability](/email-sending-concepts/deliverability). Additionally, **DKIM is vital for supporting [DMARC](/email-sending-concepts/dmarc.md)** policies, making it a critical component of email security and brand protection.

## Frequently Asked Questions About DKIM

### Does DKIM prevent spam?

Not directly, DKIM verifies authenticity, not content quality. However, properly configured DKIM makes it less likely that your emails will be marked as spam.

### Can I have multiple DKIM keys?

Yes. You can use different selectors to manage multiple keys, especially if you're sending from multiple sources (e.g., your ESP and internal systems).

### What happens if DKIM fails?

If DKIM fails, the email might still be delivered depending on the recipient's DMARC policy. But failing consistently can damage your sender reputation over time.

## Related Content

:::tip Practical Guide
**[How SPF, DKIM, and DMARC Actually Work (With Real Examples)](/posts/how-spf-dkim-and-dmarc-actually-work-with-real-examples)** — See real email headers and learn how to investigate DKIM signatures with practical examples.
:::

- [SPF (Sender Policy Framework)](/email-sending-concepts/spf)
- [DMARC (Domain-based Message Authentication, Reporting, and Conformance)](/email-sending-concepts/dmarc)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [Email Spoofing](/email-sending-concepts/email-spoofing)
- [SMTP (Simple Mail Transfer Protocol)](/email-sending-concepts/smtp)
- [DNS (Domain Name System)](/email-sending-concepts/dns)

<GlossaryCTA />
