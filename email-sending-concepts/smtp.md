---
title: SMTP (Simple Mail Transfer Protocol) | BlueFox Email
description: "Learn how the Simple Mail Transfer Protocol (SMTP) works, its role in email delivery, common ports, and how modern security extensions protect email in transit."
thumbnail: /assets/glossary/email-sending-glossary.png

layout: post
category: glossary
sidebar: false

datePublished: "2025-06-30"
dateModified: "2025-06-30"

faqs:
  - question: "Is SMTP secure?"
    answer: "By default, SMTP does not encrypt messages. However, most modern servers use STARTTLS on port 587 to encrypt the connection, and authentication protocols like SPF, DKIM, and DMARC to verify sender identity and prevent abuse. For sensitive data, consider using end-to-end encryption."
  - question: "What's the difference between SMTP, IMAP, and POP3?"
    answer: "SMTP is used for sending emails. IMAP and POP3 are used for retrieving emails from a server to your device. Most email clients use SMTP to send and IMAP or POP3 to receive."
  - question: "Why do emails sometimes get stuck in the outbox?"
    answer: "Common reasons include incorrect SMTP settings, authentication failures, network issues, or the recipient's server unavailability. Check your configuration and internet connection if you encounter this problem."

relatedContent:
  - /email-sending-concepts/tls
  - /email-sending-concepts/email-authentication
  - /email-sending-concepts/spf
  - /email-sending-concepts/dkim
  - /email-sending-concepts/dkim
  - /email-sending-concepts/mx-record

head:
  - - meta
    - name: description
      content: "Learn how the Simple Mail Transfer Protocol (SMTP) works, its role in email delivery, common ports, and how modern security extensions protect email in transit."
  - - meta
    - property: og:title
      content: "SMTP (Simple Mail Transfer Protocol) | BlueFox Email"
  - - meta
    - property: og:description
      content: "Understand how SMTP enables email transmission across the internet and the security extensions that protect modern email communications."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/email-sending-glossary.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/email-sending-concepts/smtp"
  - - meta
    - name: twitter:card
      content: "summary_large_image"
  - - meta
    - name: twitter:title
      content: "SMTP (Simple Mail Transfer Protocol) | BlueFox Email"
  - - meta
    - name: twitter:description
      content: "Learn how the Simple Mail Transfer Protocol works and why it's essential for email delivery across the internet."
---
<GlossaryNavigation/>

# SMTP (Simple Mail Transfer Protocol)

**Simple Mail Transfer Protocol** is the **backbone of email delivery** on the internet. Every time you hit **send**, SMTP quietly takes over, moving your message from your outbox to the recipient's inbox. While most users never see it in action, SMTP is one of the oldest and most essential protocols in the world of email.

## What is SMTP?

**SMTP** is a protocol that enables the **transfer of email messages between servers**. When you send an email, SMTP is responsible for relaying your message from your email client or server to the recipient's mail server. It's a **push** protocol, meaning it only handles sending, not retrieving emails.

SMTP uses plain text commands and operates over the internet's TCP/IP infrastructure. It's designed to be **simple, reliable, and universally compatible**, which is why it's still in use decades after its creation.

## How Does SMTP Work?

When you send an email, your client (like Outlook or Gmail) connects to your outgoing mail server using **SMTP**. The process starts with a handshake (using commands like HELO or EHLO), then specifies the sender and recipient addresses, and finally transmits the message content.

The sending server then tries to deliver the message directly to the recipient's mail server, again using SMTP. If the recipient's server is temporarily unavailable, the sending server will keep retrying for a set period before giving up and returning an error. This temporary failure and retry process is known as a **soft bounce**. When a recipient address doesn't exist or the server permanently rejects the message, it's called a **hard bounce**. In this case, the message is immediately returned to the sender with an error notification.

SMTP typically uses **port 25** for server-to-server communication, but **port 587** is now standard for client-to-server submission, and **port 465** is used for secure connections via [SSL/TLS](/email-sending-concepts/tls). By itself, SMTP does not encrypt messages, which is why modern email relies on extensions like **STARTTLS** for encryption and integrates with authentication protocols such as [SPF](/email-sending-concepts/spf), [DKIM](/email-sending-concepts/dkim), and [DMARC](/email-sending-concepts/dmarc).

| SMTP Port | Primary Use | Security | Status | Best For |
|-----------|------------|----------|--------|----------|
| **465** | Implicit SSL/TLS | Encryption from connection start | Originally deprecated, now reinstated | Maximum security needs |
| **587** | Message submission | STARTTLS (explicit encryption) | Current standard | Most email clients and services |

## Why is SMTP Important?

**SMTP** is the **universal language of email transmission**. Without it, email as we know it wouldn't exist. Its simplicity and reliability have made it the standard for decades, allowing messages to flow seamlessly between different systems and providers.

SMTP's extensibility has allowed it to evolve with the times. Security enhancements like **STARTTLS** and authentication checks with **SPF**, **DKIM**, and **DMARC** have kept SMTP relevant and secure, even as threats have grown more sophisticated.

For businesses, a properly configured SMTP setup means **reliable delivery**, fewer bounced emails, better [deliverability](/email-sending-concepts/deliverability), and better protection against spam and [email spoofing](/email-sending-concepts/email-spoofing). Whether you're sending a single message or millions, SMTP is the protocol that makes it happen.

## Frequently Asked Questions About SMTP

### Is SMTP secure?
By default, SMTP does not encrypt messages. However, most modern servers use STARTTLS on port 587 to encrypt the connection, and authentication protocols like SPF, DKIM, and DMARC to verify sender identity and prevent abuse. For sensitive data, consider using end-to-end encryption.

### What's the difference between SMTP, IMAP, and POP3?
SMTP is used for sending emails. IMAP and POP3 are used for retrieving emails from a server to your device. Most email clients use SMTP to send and IMAP or POP3 to receive.

### Why do emails sometimes get stuck in the outbox?
Common reasons include incorrect SMTP settings, authentication failures, network issues, or the recipient's server unavailability. Check your configuration and internet connection if you encounter this problem.


## Related Content

- [TLS (Transport Layer Security)](/email-sending-concepts/tls)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [SPF (Sender Policy Framework)](/email-sending-concepts/spf)
- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim)
- [MX Record](/email-sending-concepts/mx-record)

<GlossaryCTA />
