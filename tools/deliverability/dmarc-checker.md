---
title: Free DMARC Checker | Validate DMARC Policy 
description: Free online DMARC checker tool to validate your domain's DMARC policy, check alignment, and analyze email authentication settings for improved deliverability.
thumbnail: /assets/free-deliverability-tools.png
sidebar: false
aside: false
layout: post
category: tools

datePublished: "2025-08-01"
dateModified: "2025-08-01"

keywords:
  - DMARC checker
  - DMARC validation
  - DMARC policy
  - email authentication
  - domain alignment
  - email security
  - anti-spoofing
  - free tool
  - email deliverability
  - DNS validation
  - domain verification
  - DMARC analyzer
  - email protection

faqs:
  - question: "Why does the checker say I have no DMARC record even though I set one up?"
    answer: "DNS changes can take time to propagate, usually minutes but sometimes up to 48 hours depending on your provider's TTL settings. Double check the record was added to _dmarc.yourdomain.com and not the root domain."
  - question: "What does a yellow warning mean?"
    answer: "Yellow marks a setting that works but could be tightened, such as relaxed alignment or a policy of quarantine. Red is more serious: it flags something that leaves your domain exposed, such as p=none or a missing aggregate reporting address. Neither colour means mail is being blocked today, but red is the one to act on first."
  - question: "Can I check a subdomain?"
    answer: "Yes. Enter the full subdomain, such as mail.example.com, and the tool looks up its _dmarc record directly. Note that subdomain policy is often set via the sp tag on the parent domain's record rather than a separate record on the subdomain itself, so it's worth checking both."
  - question: "Do I need an account to use this tool?"
    answer: "No. Lookups run in real time and there's no account or sign-up required."

head:
  - - meta
    - name: description
      content: Free online DMARC checker tool to validate your domain's DMARC policy, check alignment, and analyze email authentication settings for improved deliverability.
  - - meta
    - property: og:title
      content: Free DMARC Checker | Validate DMARC Policy | BlueFox Email
  - - meta
    - property: og:description
      content: Free online DMARC checker tool to validate your domain's DMARC policy, check alignment, and analyze email authentication settings for improved deliverability.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/free-deliverability-tools.png
  - - meta
    - property: og:url
      content: https://bluefox.email/tools/deliverability/dmarc-checker
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Free DMARC Checker | Validate DMARC Policy | BlueFox Email
  - - meta
    - name: twitter:description
      content: Free online DMARC checker tool to validate your domain's DMARC policy, check alignment, and analyze email authentication settings for improved deliverability.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/free-deliverability-tools.png
---

<GlossaryNavigation link="/tools/deliverability" label="Back to deliverability Tools" />

<script setup>
import DmarcChecker from '../../.vitepress/theme/free-tools/DmarcChecker.vue'
</script>


# Free DMARC Checker

**Validate your [DMARC](/email-sending-concepts/dmarc) policy** and ensure your domain is protected against email spoofing with our comprehensive DMARC checker tool.

<DmarcChecker />

## What This Tool Checks

Enter any domain, and the checker looks up its DMARC record at `_dmarc.yourdomain.com`, parses every tag, and evaluates the policy for common misconfigurations. It reports:

- Whether a DMARC record exists at all.
- The enforcement policy: `none` (monitor only), `quarantine` (send to spam), or `reject` (block outright).
- The `pct` tag, if your record still carries one. RFC 9989 removed `pct` from the specification, so receivers now ignore it, but the checker still reports the value so you can clean it up.
- SPF and DKIM alignment mode, strict or relaxed.
- Whether aggregate (`rua`) and forensic (`ruf`) reporting addresses are configured.
- Deprecated or redundant tags that should be cleaned up.

## How to Use It

1. Type your domain into the input field. No `www` or protocol needed, just the bare domain, such as `example.com`.
2. Click **Check DMARC**. The domain is sent to our API, which performs the DNS lookup and returns the result to your browser.
3. Read the results. A green signal means that setting is configured well. A yellow or red signal flags something worth fixing.
4. Expand **Raw record** to see the exact DNS TXT record, or **Tag breakdown** for a plain-language explanation of every tag present.

## Understanding the Policy Levels

A domain with no DMARC record offers no protection: anyone can spoof it. `p=none` adds visibility through reports but does not stop spoofed mail from reaching inboxes. `p=quarantine` routes failing mail to spam. `p=reject` blocks it before delivery. Most teams start at `none`, review a few weeks of reports, then move to `quarantine` and eventually `reject` once they've confirmed all legitimate senders are properly authenticated.

## Example DMARC Record

```
v=DMARC1; p=reject; rua=mailto:reports@example.com; adkim=s; aspf=s
```

This record rejects unauthenticated mail outright, sends aggregate reports to the specified address, and requires strict alignment for both DKIM and SPF. Older examples often add `pct=100`; that tag was removed in RFC 9989 and is no longer needed.

## Frequently Asked Questions

### Why does the checker say I have no DMARC record even though I set one up?

DNS changes can take time to propagate, usually minutes but sometimes up to 48 hours depending on your provider's TTL settings. Double check the record was added to `_dmarc.yourdomain.com` and not the root domain.

### What does a yellow warning mean?

Yellow marks a setting that works but could be tightened, such as relaxed alignment or a policy of `quarantine`. Red is more serious: it flags something that leaves your domain exposed, such as `p=none` or a missing aggregate reporting address. Neither colour means mail is being blocked today, but red is the one to act on first.

### Can I check a subdomain?

Yes. Enter the full subdomain, such as `mail.example.com`, and the tool looks up its `_dmarc` record directly. Note that subdomain policy is often set via the `sp` tag on the parent domain's record rather than a separate record on the subdomain itself, so it's worth checking both.

### Do I need an account to use this tool?

No. Lookups run in real time and there's no account or sign-up required.
