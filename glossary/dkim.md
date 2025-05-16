---
title: DKIM
description: Learn what DKIM is and how it works to secure your emails.
thumbnail: /assets/articles/dkim-thumbnail.webp

layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn what DKIM is and how it works to secure your emails.
  - - meta
    - property: og:title
      content: DKIM | Email Glossary | BlueFox Email
  - - meta
    - property: og:description
      content: Learn what DKIM is and how it works to secure your emails.
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: DKIM | Email Glossary | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn what DKIM is and how it works to secure your emails.

lastUpdated: true
published: 2025-05-16
sidebar: false
---

# DKIM (DomainKeys Identified Mail)

**DKIM** stands for **DomainKeys Identified Mail**.

It is an email authentication method that allows the **sender to digitally sign emails** using a private key. The receiving server can then verify the email's authenticity using the sender's **public key published in DNS**.

DKIM helps ensure that the email was not **altered in transit** and truly comes from the claimed domain.

## How DKIM Works

1. The sender's mail server adds a **DKIM-Signature** header to the email
2. That header includes a **hash of the message** and metadata, signed using the domain's private key
3. The recipient's mail server looks up the **public key in DNS** (via a TXT record at `selector._domainkey.example.com`)
4. It uses the public key to verify the signature and check the integrity of the email

If the signature matches → **DKIM = PASS** ✅

## Example DKIM DNS Record

```dns
selector._domainkey.example.com. IN TXT "v=DKIM1; k=rsa; p=MIGfMA0G..."
```

- `selector` → a label that identifies which key to use
- `v=DKIM1` → DKIM version
- `p=...` → the base64-encoded public key

## Summary

| DKIM stands for       | **DomainKeys Identified Mail**                          |
|------------------------|----------------------------------------------------------|
| Used for               | Signing outgoing emails to verify authenticity          |
| Type of DNS record     | `TXT` at `selector._domainkey.yourdomain.com`           |
| Helps protect against  | Tampering and spoofing                                   |
| Works with             | DMARC, DNS, SMTP                                         |
