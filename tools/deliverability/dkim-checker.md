---
title: Free DKIM Checker | Validate DKIM Signatures 
description: Free online DKIM checker tool to validate DomainKeys Identified Mail signatures, verify DNS records, and analyze email authentication for improved deliverability.
thumbnail: /assets/free-deliverability-tools.png
sidebar: false
aside: false
layout: post
category: tools

datePublished: "2024-08-01"
dateModified: "2025-08-01"

keywords:
  - DKIM checker
  - DKIM validation
  - email authentication
  - DNS validation
  - email deliverability
  - domain verification
  - email security
  - free tool
  - DKIM signatures
  - email infrastructure
  - DomainKeys Identified Mail
  - email validation tool

head:
  - - meta
    - name: description
      content: Free online DKIM checker tool to validate DomainKeys Identified Mail signatures, verify DNS records, and analyze email authentication for improved deliverability.
  - - meta
    - property: og:title
      content: Free DKIM Checker | Validate DKIM Signatures | BlueFox Email
  - - meta
    - property: og:description
      content: Free online DKIM checker tool to validate DomainKeys Identified Mail signatures, verify DNS records, and analyze email authentication for improved deliverability.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/free-deliverability-tools.png
  - - meta
    - property: og:url
      content: https://bluefox.email/tools/deliverability/dkim-checker
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Free DKIM Checker | Validate DKIM Signatures | BlueFox Email
  - - meta
    - name: twitter:description
      content: Free online DKIM checker tool to validate DomainKeys Identified Mail signatures, verify DNS records, and analyze email authentication for improved deliverability.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/free-deliverability-tools.png
      
---

<GlossaryNavigation link="/tools/deliverability" label="Back to deliverability Tools" />

<script setup>
import DkimChecker from '../../.vitepress/theme/free-tools/DkimChecker.vue'   
</script>

# Free DKIM Checker

**Validate your [DKIM](/email-sending-concepts/dkim) signatures** and ensure your email authentication is working correctly with our comprehensive DKIM checker tool.


<DkimChecker />

## What This Tool Checks

Enter a domain and selector, and the checker looks up the DKIM public key record and evaluates it:

- Whether a DKIM record exists at the given selector.
- Key type (`k` tag, typically `rsa`).
- Approximate key length in bits, calculated from the public key (`p` tag).
- Every tag present in the record, with a plain-language description and a one-click copy for each value.

## Why You Need a Selector

Unlike SPF and DMARC, which live at a single fixed location per domain, DKIM records are published per selector, at `selector._domainkey.yourdomain.com`. The selector is a name your mail provider chooses, so there's no universal record to look up. Common selectors include `default`, `google`, `selector1`, and `mail`, but yours may differ depending on which email service you use. Check your email provider's DKIM setup instructions for the exact selector they assign you, it's usually shown right next to the DNS record they ask you to add.

## How to Use It

1. Enter your domain.
2. Enter the selector your mail provider uses. If you leave it blank, the tool checks `default`.
3. Click **Check DKIM** and review the key type and approximate key length.
4. Expand the tag breakdown to see what each part of the record means, and copy any value with one click.

## Understanding Key Length

DKIM keys shorter than 1024 bits are considered weak and are rejected outright by some providers, including Google and Yahoo, as of their 2024 sender requirements. 1024-bit keys still work in many places but are being phased out. 2048-bit keys are the current recommended minimum for new setups. The length shown here is approximate, calculated from the encoded public key, since base64 encoding doesn't map to bit length with perfect precision.

## Example DKIM Record

```
default._domainkey.example.com. TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..."
```

This publishes an RSA public key under the `default` selector, which receiving servers use to verify signatures on outgoing mail from `example.com`.

## Frequently Asked Questions

### I don't know my DKIM selector. How do I find it?

Check the DKIM setup page in your email service provider's dashboard, it lists the exact selector and record to publish. Alternatively, look at the `DKIM-Signature` header of an email you've sent; it contains an `s=` field with the selector used.

### Can a domain have multiple DKIM selectors?

Yes, and it's common. Different sending services (your email marketing tool, your helpdesk, your transactional email provider) often each get their own selector, since they each sign mail with a different key.

### What does it mean if the record isn't found?

Either DKIM hasn't been set up for that selector, the selector name is wrong, or the DNS change hasn't propagated yet. Try the selector your provider specifies, and confirm the record was added at `selector._domainkey.yourdomain.com`, not the root domain.

### Does a valid DKIM record guarantee my email is authenticated?

No. DKIM only proves the message was signed by someone holding the private key, it doesn't check alignment with the visible "From" domain. [DMARC](/tools/deliverability/dmarc-checker) is what enforces that alignment.
