---
title: API Overview | bluefox.email documentation
description: Explore the BlueFox Email API for managing subscriber lists, sending transactional and triggered emails and include attachments.
faqs:
  - question: "How do I authenticate with the BlueFox Email API?"
    answer: "Include your API key as a Bearer token in the Authorization header of every request: Authorization: Bearer YOUR_API_KEY. API keys are created in your project settings under the API Keys section. Never use your API key in frontend code; always call the API from your backend."
  - question: "What can I do with the BlueFox Email API?"
    answer: "The API lets you send transactional emails to any email address, send triggered emails to active subscribers on a list, manage contacts (create, read, update, delete), manage subscriber list subscriptions (subscribe, unsubscribe, pause, activate), and send file attachments with emails."
  - question: "What is the base URL for the BlueFox Email API?"
    answer: "The base URL for all BlueFox Email API endpoints is https://api.bluefox.email/v1. Each endpoint appends a specific path such as /send-transactional, /send-triggered, /subscriber-lists, or /contacts."
  - question: "Can I use the API to manage subscriber lists without sending emails?"
    answer: "Yes. The subscriber list management endpoints let you subscribe, unsubscribe, pause, activate, and list subscribers programmatically, independent of sending any email. This is useful for syncing subscription state from your own application."
head:
  - - meta
    - name: description
      content: Explore the BlueFox Email API for managing subscriber lists, sending transactional and triggered emails and include attachments.
  - - meta
    - property: og:title
      content: API Overview | bluefox.email documentation
  - - meta
    - property: og:description
      content: Explore the BlueFox Email API for managing subscriber lists, sending transactional and triggered emails and include attachments.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/api
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: API Overview | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Explore the BlueFox Email API for managing subscriber lists, sending transactional and triggered emails and include attachments.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# The bluefox.email API

The **bluefox.email API** allows you to manage subscriber lists, send transactional and triggered emails and include attachments. Below are the key API functionalities:  

- **[Subscriber List Management](/docs/api/subscriber-list-management)** – Programmatically subscribe, unsubscribe, pause, activate, and update subscribers in your lists.  
- **[Send Transactional Email](/docs/api/send-transactional-email)** – Deliver real-time, one-to-one emails such as password resets, order confirmations, and notifications.  
- **[Send Triggered Email](/docs/api/send-triggered-email)** – Automate email sequences based on user actions, such as onboarding emails or follow-ups.  
- **[Send Attachments](/docs/api/send-attachments)** – Attach files to your emails while ensuring proper formatting and size limitations.  

Explore the API documentation to seamlessly integrate BlueFox Email into your workflows. 🚀
