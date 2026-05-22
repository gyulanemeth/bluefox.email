---
layout: page
sidebar: false
title: "BlueFox Email Features: Everything Included on Every Plan"
description: Complete feature set for BlueFox Email. Transactional emails, campaigns, automations, segments, email themes, analytics, API, webhooks, and more. All features on every plan.
head:
  - - meta
    - name: description
      content: Complete feature set for BlueFox Email. All features included on every plan, no tiers, no paywalls, no hidden upgrades.
  - - meta
    - property: og:title
      content: "BlueFox Email Features: Everything Included on Every Plan"
  - - meta
    - property: og:description
      content: 21 features across email sending, contacts, automations, design, analytics, API, and integrations. Every feature on every send pack.
  - - meta
    - property: og:url
      content: https://bluefox.email/features
faqs:
  - question: "Does BlueFox Email include all features on every plan?"
    answer: "Yes. Every feature is included on every send pack with no tiers or paywalls. Transactional emails, campaigns, automations, segments, email themes, API, webhooks, and more are all available from day one."
  - question: "What email types does BlueFox Email support?"
    answer: "BlueFox Email supports three email types: transactional emails (API-triggered, not tied to subscriber lists), triggered emails (API-triggered to active subscribers with per-recipient data overrides), and campaigns (scheduled or immediate sends to a subscriber list and optional segment)."
  - question: "Does BlueFox Email have a visual automation builder?"
    answer: "Yes. BlueFox Email includes a visual automation builder with nodes for triggers (contact added, contact updated, enter/leave segment), timers, audience filters, send email, notify, branching, set value, manage tags, and exit criteria."
  - question: "Can I bring my own AWS SES account?"
    answer: "Yes. BlueFox Email supports BYO AWS SES via Access Key or STS role. This gives you full deliverability control using your own AWS infrastructure while BlueFox Email handles the sending logic, templates, contacts, and automations."
  - question: "What integrations does BlueFox Email support?"
    answer: "BlueFox Email integrates with Zapier (6 triggers and 8 actions), supports webhooks for real-time event notifications (sent, opened, clicked, bounced, complained, and subscription events), Supabase auth emails via SMTP, and provides a full HTTP API for custom integrations."
  - question: "Does BlueFox Email have a free plan?"
    answer: "BlueFox Email includes 3,000 free sends with no credit card required. There is no monthly subscription, you buy send packs as needed (credits valid for 12 months). The Essential pack is $50 for 50,000 sends."
  - question: "How does segmentation work in BlueFox Email?"
    answer: "Segments in BlueFox Email are dynamic groups built with AND/OR logic. You can filter contacts by custom properties, tags, or email engagement (opened, not opened, clicked, not clicked within N days). Segments update automatically and can be used in campaigns, automations, and audience filters."
  - question: "What analytics does BlueFox Email provide?"
    answer: "BlueFox Email tracks opens, unique opens, clicks, unique clicks, bounces, complaints, sends, and failures per email. Subscription metrics include subscribed, resubscribed, unsubscribed, and paused. Data is shown in bar or line charts with time intervals, cumulative view, CSV export, and a filterable data table."
  - question: "Can I send emails with attachments?"
    answer: "Yes. Transactional and triggered emails sent via the API support file attachments encoded as Base64. Each attachment requires a file name and the Base64-encoded content."
  - question: "How does BlueFox Email handle bounce and complaint rates?"
    answer: "BlueFox Email monitors bounce and complaint rates continuously. Production access requires maintaining bounce rates below 2.5% and complaint rates below 0.05%. The platform provides alerts and reporting to help you stay within these thresholds."
---

<script setup>
import FeaturesGrid from './.vitepress/theme/FeaturesGrid.vue'
</script>

<FeaturesGrid />
