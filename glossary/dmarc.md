---
title: DMARC
description: Learn what DMARC is and how it works with SPF and DKIM to protect your domain from email spoofing.
thumbnail: /assets/articles/dmarc-thumbnail.webp

layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn what DMARC is and how it works with SPF and DKIM to protect your domain from email spoofing.
  - - meta
    - property: og:title
      content: DMARC | Email Glossary | BlueFox Email
  - - meta
    - property: og:description
      content: Learn what DMARC is and how it works with SPF and DKIM to protect your domain from email spoofing.
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: DMARC | Email Glossary | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn what DMARC is and how it works with SPF and DKIM to protect your domain from email spoofing.

lastUpdated: true
published: 2025-05-16
sidebar: false
---

# DMARC (Domain-based Message Authentication, Reporting, and Conformance)

**DMARC** stands for **Domain-based Message Authentication, Reporting, and Conformance**.

It is an email authentication protocol that builds on SPF and DKIM to protect your domain from unauthorized use (spoofing) and provides a way to receive reports about emails sent from your domain.

## How DMARC Works

DMARC works by leveraging both SPF and DKIM authentication results, adding domain alignment checks, and giving domain owners control over what happens to emails that fail authentication:

1. The recipient's mail server receives an email claiming to be from your domain
2. It checks both SPF and DKIM authentication results
3. It verifies that the domains in the SPF and DKIM results "align" with the domain in the From header that users see
4. It checks your published DMARC policy to determine what to do if authentication fails
5. It sends reports back to you about emails claiming to be from your domain

DMARC passes if:
- SPF **or** DKIM passes
- **AND** the domain used in SPF or DKIM aligns with the domain in the "From:" header

## Example DMARC Record

```
v=DMARC1; p=quarantine; rua=mailto:reports@example.com; ruf=mailto:forensic@example.com; pct=100
```

- `v=DMARC1` → DMARC version
- `p=quarantine` → Policy (what to do with failed emails)
- `rua=mailto:reports@example.com` → Where to send aggregate reports
- `ruf=mailto:forensic@example.com` → Where to send forensic reports
- `pct=100` → Apply policy to 100% of failed messages

## DMARC Policies

DMARC offers three policy options (`p=`) for handling emails that fail authentication:

| Policy | Description |
|--------|-------------|
| `none` | Take no action, just monitor (good for starting out) |
| `quarantine` | Send to spam/junk folder |
| `reject` | Completely block the email |

## DMARC Reporting

A key benefit of DMARC is the reporting feature:

- **Aggregate reports (rua)**: XML files sent daily with overall statistics
- **Forensic reports (ruf)**: Detailed information about specific failures

## Summary

| DMARC stands for | **Domain-based Message Authentication, Reporting, and Conformance** |
|------------------|-------------------------------------------------------------------|
| Used for | Extending SPF and DKIM with domain alignment and feedback mechanisms |
| Type of DNS record | `TXT` record at `_dmarc.yourdomain.com` |
| Helps protect against | Email spoofing, phishing, and domain reputation damage |
| Works with | SPF, DKIM, DNS, SMTP |
