---
footer: false
title: "DMARC for SaaS: Aligning Multiple Senders Without Breaking Transactional Email"
description: "A SaaS-specific DMARC playbook: aligning DMARC across your app, your ESP, and support tools, using subdomains to isolate streams, and rolling from p=none to reject safely."
---

# DMARC for SaaS: Aligning Multiple Senders Without Breaking Transactional Email

If you just need the fundamentals — what DMARC is, and how SPF and DKIM feed into it — start with our [DMARC concept guide](/email-sending-concepts/dmarc). This page is about the part that actually trips up SaaS teams: you don't send from one place. Your app fires password resets, your ESP sends the newsletter, and Zendesk or Intercom answer tickets — all "from" your domain. DMARC only helps once *every one of those* is aligned.

## The real SaaS problem: alignment across many senders

DMARC passes only when SPF **or** DKIM not only passes but is *aligned* — the authenticated domain matches the domain your users actually see in the From address. The classic SaaS failure is "SPF passes but DMARC still fails," because your ESP's Return-Path sits on the ESP's own domain, not yours.

The fix is to authenticate each sender against *your* domain: a custom Return-Path / MAIL FROM and a DKIM key (`d=yourdomain.com`) for the app, the ESP, and every third-party tool. Before you enforce anything, write down every service that sends as you:

- **Your application** — transactional mail: password resets, receipts, email verification.
- **Your marketing / ESP platform** — newsletters, campaigns, lifecycle automation.
- **Support and back-office tools** — helpdesk, CRM, scheduling, invoicing, notifications.

Almost every SaaS underestimates this list, and the forgotten sender is what breaks when you turn on enforcement.

## Use subdomains to isolate your streams

Send transactional mail from a dedicated subdomain (for example `mail.yourapp.com`) and marketing from another. Two reasons this matters for a SaaS:

- A reputation problem on the marketing stream can't drag down password resets and other critical transactional mail.
- You can apply a stricter DMARC policy to the transactional subdomain sooner, because its sender list is small and fully under your control.

## Roll out enforcement in three stages

The goal is to reach `p=reject` **without ever sending a legitimate email to spam.** Do it in stages, not in one move.

1. **`p=none` (monitor).** Publish a DMARC record with a `rua=` reporting address and change nothing else. You are only collecting data — deliverability is unaffected.
2. **Read the aggregate reports.** They reveal every source sending under your domain, including the ones you forgot. Authenticate the legitimate senders; investigate the rest. The XML is dense, so use a [DMARC report analyzer](/tools/deliverability/dmarc-report-analyzer) to make sense of it.
3. **Move to `p=quarantine`, then `p=reject`.** Only once the reports show all your real senders aligned. Step up gradually — the `pct=` tag lets you enforce on a fraction of mail first — so a missed sender sends a handful of messages to spam instead of hard-failing your entire reset flow.

## Verify before and after each change

Check your published record at any point with the [DMARC checker](/tools/deliverability/dmarc-checker), and confirm SPF and DKIM alignment for each sender as you bring it online. Re-check after every policy change, not just at setup.

## Bottom line

For a SaaS sender, DMARC isn't a single DNS record — it's an inventory-and-alignment exercise across every system that emails your users, rolled out slowly enough that enforcement never blocks a password reset. Get the sender list right, isolate your streams with subdomains, and ramp from `none` to `reject` on the evidence in your reports.
