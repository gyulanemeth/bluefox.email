---
title: SPF
description: Learn what SPF is and how it works to protect your email domain.
thumbnail: /assets/articles/spf-thumbnail.webp

layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn what SPF is and how it works to protect your email domain.
  - - meta
    - property: og:title
      content: SPF | Email Glossary | BlueFox Email
  - - meta
    - property: og:description
      content: Learn what SPF is and how it works to protect your email domain.
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: SPF | Email Glossary | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn what SPF is and how it works to protect your email domain.

lastUpdated: true
published: 2025-05-16
sidebar: false
---

# SPF (Sender Policy Framework)

**SPF** stands for **Sender Policy Framework**.

It is an email authentication method that helps prevent email spoofing by allowing domain owners to specify which mail servers are authorized to send email on behalf of their domain.

## How SPF Works

SPF works by creating a specific DNS TXT record that lists all the authorized mail servers for your domain. When an email server receives a message that claims to be from your domain, it checks this SPF record to verify if the sending server is allowed to send emails from your domain.

1. The sender's mail server sends an email claiming to be from your domain
2. The recipient's mail server checks the Return-Path header in the email
3. It looks up the SPF record in DNS for the domain in the Return-Path
4. If the sending server's IP address is listed in the SPF record → **SPF = PASS** ✅
5. If not → **SPF = FAIL** ❌

## Example SPF Record

```
v=spf1 include:_spf.example.com ip4:192.0.2.0/24 -all
```

- `v=spf1` → SPF version 1
- `include:_spf.example.com` → Include authorized servers defined at _spf.example.com
- `ip4:192.0.2.0/24` → Authorize this IP range
- `-all` → Fail if sender not matched (strict policy)

## SPF Mechanisms

SPF records use several mechanisms to identify authorized mail servers:

| Mechanism | Description |
|-----------|-------------|
| `a` | Authorize the A record of domain |
| `mx` | Authorize mail exchangers for domain |
| `ip4:` | Authorize IPv4 addresses or ranges |
| `ip6:` | Authorize IPv6 addresses or ranges |
| `include:` | Include another domain's SPF rules |
| `exists:` | Check if domain has an A record |

## Summary

| SPF stands for | **Sender Policy Framework** |
|----------------|----------------------------|
| Used for | Specifying authorized email sending servers |
| Type of DNS record | `TXT` record at the domain root |
| Helps protect against | Email spoofing and phishing attacks |
| Works with | DKIM, DMARC, DNS, SMTP |
