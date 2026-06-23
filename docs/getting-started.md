---
title: Getting Started with bluefox.email
description: "Learn how to get started with bluefox.email in just four simple steps: register, create a project, connect AWS SES, and start sending emails."
faqs:
  - question: "Do I need a credit card to get started with bluefox.email?"
    answer: "No. BlueFox Email gives you 3,000 free sends (or 6,000 if you use BYO SES) when you register, with no credit card required. You can send real emails, explore all features, and build automations before you need to purchase a send pack."
  - question: "Do I need to set up Amazon SES before I can send emails?"
    answer: "No. BlueFox Email includes its own managed sending infrastructure. You can start sending immediately after registering. Optionally, you can connect your own Amazon SES account later if you want full control over your sending reputation and lower per-send costs at high volumes."
  - question: "What is Sandbox mode and when should I switch to Production?"
    answer: "New projects start in Sandbox mode, which restricts sending to verified email addresses only. This is ideal for testing your email templates and API integration without affecting deliverability. Switch to Production mode when you are ready to send to real subscribers at scale."
  - question: "Can I send transactional emails, triggered emails, and campaigns from the same project?"
    answer: "Yes. Every BlueFox Email project supports all three email types: transactional emails (API-triggered, not tied to subscriber lists), triggered emails (API-triggered to active subscribers with per-recipient data), and campaigns (scheduled or immediate sends to a subscriber list and optional segment)."
  - question: "How long does it take to get up and running with bluefox.email?"
    answer: "You can register and create your first project in a few minutes. Sending your first transactional or triggered email via the API requires adding your project API key to your request. Campaigns can be scheduled directly from the UI with no code required."
head:
  - - meta
    - name: description
      content: "Learn how to get started with bluefox.email in just four simple steps: register, create a project, connect AWS SES, and start sending emails."
  - - meta
    - property: og:title
      content: Getting Started with bluefox.email
  - - meta
    - property: og:description
      content: "Learn how to get started with bluefox.email in just four simple steps: register, create a project, connect AWS SES, and start sending emails."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/getting-started
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Getting Started with bluefox.email
  - - meta
    - name: twitter:description
      content: "Learn how to get started with bluefox.email in just four simple steps: register, create a project, connect AWS SES, and start sending emails."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Getting started with bluefox.email

1) Register at bluefox.email.
2) Create your first project. It will be in a Sandbox mode by default. 
3) Schedule campaigns or send transactional and triggered emails via our API.

That's it! Really!
