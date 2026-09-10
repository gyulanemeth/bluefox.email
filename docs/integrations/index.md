---
title: Integrations Overview | bluefox.email documentation
description: Explore BlueFox Email integrations for enhanced email control and real-time event tracking.
faqs:
  - question: "What integrations does BlueFox Email support?"
    answer: "BlueFox Email supports four integrations: webhooks for real-time email event tracking, Supabase for routing authentication emails through BlueFox Email SMTP, Zapier for connecting with thousands of apps without writing code, and an MCP server that lets an AI agent manage your project directly."
  - question: "What can I track with BlueFox Email webhooks?"
    answer: "Webhooks deliver real-time notifications for email events including sent, failed, open, click, bounce, complaint, and subscription changes such as subscribe, unsubscribe, pause, and resubscribe."
  - question: "How do I connect BlueFox Email to Supabase?"
    answer: "In Supabase, enable Custom SMTP under Project Settings and Authentication, then enter smtp.bluefox.email as the host, port 587, and your project API key as the password. Then create transactional email templates in BlueFox Email for each Supabase authentication email type you need."
  - question: "Do I need to write code to use the Zapier integration?"
    answer: "No. The Zapier integration requires no coding. You connect your BlueFox Email account using your project API key and project ID, then build Zaps by selecting triggers and actions from Zapier's visual interface."
  - question: "What can an AI agent do through the MCP server?"
    answer: "The MCP server exposes 52 tools covering emails, contacts, subscriber lists, signup forms, project settings, sending setup, and production access. It runs locally, so your API key never reaches the AI model, and creating a campaign or email always produces a draft - sending or scheduling is a separate explicit step."
head:
  - - meta
    - name: description
      content: Explore BlueFox Email integrations for enhanced email control and real-time event tracking.
  - - meta
    - property: og:title
      content: Integrations Overview | bluefox.email documentation
  - - meta
    - property: og:description
      content: Explore BlueFox Email integrations for enhanced email control and real-time event tracking.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/integrations
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Integrations Overview | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Explore BlueFox Email integrations for enhanced email control and real-time event tracking.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# The bluefox.email integrations

**Bluefox.email integrations** connect with various platforms to enhance email delivery, authentication, and real-time tracking. These integrations allow you to send authentication emails, notifications, and monitor email performance with detailed insights. Below are the key integration options:  
  
- **[Webhooks](/docs/integrations/webhooks)** – Receive real-time event notifications for email opens, clicks, bounces, complaints, and more, allowing seamless integration with your system.  

- **[Supabase](/docs/integrations/supabase)** – Send supabase authentication emails like signup confirmations, magic links, password resets, and user invitations using bluefox.email. Set up SMTP for reliable email delivery and customize transactional email templates with ease.

- **[Zapier](/docs/integrations/zapier)** – Automate workflows by connecting BlueFox Email with thousands of apps through Zapier. Trigger actions based on email events and streamline your processes without coding.

- **[MCP Server](/docs/integrations/mcp-server)** – Connect an AI agent to your project through the Model Context Protocol. Draft and schedule campaigns, manage contacts and subscriber lists, and inspect your sending setup from Claude, Cursor, Windsurf, or Cline.

Explore the integrations documentation to seamlessly integrate BlueFox Email into your workflows. 🚀
