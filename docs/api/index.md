---
title: API Overview | bluefox.email documentation
description: Explore the BlueFox Email API - authentication, the standard response format, pagination, and every project resource for managing subscriber lists, sending transactional and triggered emails, and more.
faqs:
  - question: "How do I authenticate with the BlueFox Email API?"
    answer: "Include your project's API key as a Bearer token in the Authorization header of every request: Authorization: Bearer YOUR_API_KEY. Manage keys under Project Settings > API Keys in the app; keys are not exposed through the API itself. Never use your API key in frontend code; always call the API from your backend."
  - question: "What can I do with the BlueFox Email API?"
    answer: "The API lets you manage every resource in your project - campaigns, templates, segments, domains, sender identities, contacts, subscriber lists, and more - and send transactional and triggered emails, with file attachments."
  - question: "What is the base URL for the BlueFox Email API?"
    answer: "The base URL for all BlueFox Email API endpoints is https://api.bluefox.email. Most resources are shaped as /v1/projectId/{projectId}/{resource}; a handful of older endpoints predate that shape and use a flat URL instead - see the legacy endpoints below."
  - question: "Can I use the API to manage subscriber lists without sending emails?"
    answer: "Yes. The subscriber list management endpoints let you subscribe, unsubscribe, pause, activate, and list subscribers programmatically, independent of sending any email. This is useful for syncing subscription state from your own application."
  - question: "Is there a machine-readable spec AI agents and code generators can use?"
    answer: "Yes. The full OpenAPI 3.0 spec is served live at https://api.bluefox.email/v1/openapi.json. AI agents can call it directly to discover every endpoint, request/response schema, and error shape without needing access to this documentation site."
  - question: "What does a BlueFox Email API response look like?"
    answer: "Every response is wrapped as { \"status\": <http status code>, \"result\": ... } on success, or { \"status\": <http status code>, \"error\": { \"name\": ..., \"message\": ... } } on failure."
  - question: "How does pagination work?"
    answer: "List endpoints accept limit (default 10, max 30) and skip query parameters, and return count (the total number of matching items) and next (the full URL of the next page, or null if you're on the last page) alongside items."
head:
  - - meta
    - name: description
      content: Explore the BlueFox Email API - authentication, the standard response format, pagination, and every project resource for managing subscriber lists, sending transactional and triggered emails, and more.
  - - meta
    - property: og:title
      content: API Overview | bluefox.email documentation
  - - meta
    - property: og:description
      content: Explore the BlueFox Email API - authentication, the standard response format, pagination, and every project resource for managing subscriber lists, sending transactional and triggered emails, and more.
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
      content: Explore the BlueFox Email API - authentication, the standard response format, pagination, and every project resource for managing subscriber lists, sending transactional and triggered emails, and more.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# The bluefox.email API

The **bluefox.email API** lets you manage every resource in your project - campaigns, templates, segments, domains,
sender identities, contacts, subscriber lists, and more - and send transactional and triggered emails with attachments.

## For AI agents and code generators

The full <ApiSpecLink>OpenAPI 3.0 spec</ApiSpecLink> is served live from the API itself, so an agent can
fetch it directly and start calling endpoints without reading this page:

<pre><code>GET <ApiSpecLink /></code></pre>

It always reflects the current state of the API - every endpoint, request/response schema, and error shape on every
resource's reference page (see the sidebar) is generated from that same document.

## Authentication

Every endpoint is authenticated with a project API key, sent as a bearer token:

```
Authorization: Bearer YOUR_API_KEY
```

Create and manage keys under **Project Settings > API Keys** in the app. Keys are not exposed through the API itself. Never expose an API key in frontend/client-side code - call the API from your backend.

A few endpoints (documented on the [Subscriptions](/docs/api/subscriptions) and [Contacts](/docs/api/contacts) reference
pages) also accept requests from a whitelisted browser Origin, for use directly from a signup form or widget without
exposing an API key.

## Response format

Every response is wrapped the same way:

```json
// success
{ "status": 200, "result": { "...": "..." } }

// error
{ "status": 400, "error": { "name": "VALIDATION_ERROR", "message": "Missing required field: name" } }
```

## Pagination

List endpoints accept:

| Parameter | Default | Notes |
| --- | --- | --- |
| `limit` | 10 | Capped at 30 |
| `skip` | 0 | |
| `sort` | resource-specific | See each resource's reference page (in the sidebar) for the allowed fields |
| `order` | `desc` | `asc` or `desc` |
| `filter[<field>]` | - | Exact-match filter on a top-level field, e.g. `filter[name]=Welcome` |

...and return `count` (the total number of matching items, not just this page) and `next` (the full URL of the next page,
or `null` on the last page) alongside `items`.

## Base URL

```
https://api.bluefox.email
```

Every project-scoped resource is shaped as `/v1/projectId/{projectId}/{resource}`. A handful of endpoints that predate this
shape - `/v1/contacts/{projectId}`, `/v1/send-transactional`, `/v1/send-triggered`, `/v1/subscriber-lists/{id}`, and
`/v1/signup-forms/{id}` - use an older flat URL and are documented separately below. They're also included in the spec for
completeness.

## API Reference

Every resource has its own reference page, generated from the same OpenAPI spec AI agents use: every endpoint, parameter,
request body, and response shape.

**Project setup**

- [Project](/docs/api/project) – Read and update project settings and sending status.
- [Sender Identities](/docs/api/sender-identities) – Manage the From addresses your emails are sent from.
- [Domains](/docs/api/domains) – Add a sending domain, get its DNS records, and verify it.
- [Webhook](/docs/api/webhook) – Configure the project webhook.
- [Sending Setup](/docs/api/sending-setup) – AWS regions, deliverability figures, test webhook events, and DNS record export.
- [Production Access](/docs/api/production-access) – Leave sandbox mode and request higher sending limits.
- [BYO AWS](/docs/api/byo-aws) – Validate your own Amazon SES credentials.
- [Design Systems](/docs/api/design-systems) – Read and override the project's email design system.

**Email content and sending**

- [Templates](/docs/api/templates) – Create and manage reusable email templates.
- [Campaigns](/docs/api/campaigns) – Create campaigns and fetch their stats and recipients.
- [Transactional Emails](/docs/api/transactional-emails) – Manage one-to-one emails like password resets and receipts.
- [Triggered Emails](/docs/api/triggered-emails) – Manage emails sent to list subscribers on demand.
- [Send Email](/docs/api/send-email) – Send transactional and triggered emails.
- [Test Email](/docs/api/test-email) – Send a test before going live.
- [Email Error Log](/docs/api/email-error-log) – Debug sends that were accepted but never arrived.
- [Gallery](/docs/api/gallery) – Upload and organize images for your emails.

**Contacts and audience**

- [Contacts](/docs/api/contacts) – Manage contacts, custom fields, and tags.
- [Segments](/docs/api/segments) – Build dynamic groups of contacts.
- [Subscriber Lists](/docs/api/subscriber-lists) – Manage lists and subscribe contacts.
- [Subscriptions](/docs/api/subscriptions) – Browser-safe subscribe, pause, and unsubscribe endpoints.
- [Signup Forms](/docs/api/signup-forms) – Manage signup forms and get their embed HTML.
- [Suppression List](/docs/api/suppression-list) – Keep addresses from ever being emailed.

### Legacy endpoints

These older, flat-URL endpoints still work and are documented separately, but new integrations should use the resources
listed in the sidebar instead:

- **[Contacts Management](/docs/api/contacts-management)** – Create, retrieve, update, and delete contacts programmatically, independent of any list.  
- **[Subscriber List Management](/docs/api/subscriber-list-management)** – Programmatically subscribe, unsubscribe, pause, activate, and update subscribers in your lists.  
- **[Send Transactional Email](/docs/api/send-transactional-email)** – Deliver real-time, one-to-one emails such as password resets, order confirmations, and notifications.  
- **[Send Triggered Email](/docs/api/send-triggered-email)** – Automate email sequences based on user actions, such as onboarding emails or follow-ups.  
- **[Send Attachments](/docs/api/send-attachments)** – Attach files to your emails while ensuring proper formatting and size limitations.  

Explore the API documentation to seamlessly integrate BlueFox Email into your workflows. 🚀
