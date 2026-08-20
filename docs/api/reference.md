---
title: API Reference | bluefox.email documentation
description: The full bluefox.email API reference - authentication, the standard response format, pagination, and every project resource (campaigns, transactional and triggered emails, templates, segments, subscriber lists, contacts, domains, sender identities, and more), generated live from our OpenAPI spec.
faqs:
  - question: "Is there a machine-readable spec AI agents and code generators can use?"
    answer: "Yes. The full OpenAPI 3.0 spec is served live at https://api.bluefox.email/v1/openapi.json. AI agents can call it directly to discover every endpoint, request/response schema, and error shape without needing access to this documentation site."
  - question: "How do I authenticate with the BlueFox Email API?"
    answer: "Include your project's API key as a Bearer token in the Authorization header of every request: Authorization: Bearer YOUR_API_KEY. Manage keys under Project Settings > API Keys in the app, or via the /v1/projectId/{projectId}/api-keys endpoints."
  - question: "What does a BlueFox Email API response look like?"
    answer: "Every response is wrapped as { \"status\": <http status code>, \"result\": ... } on success, or { \"status\": <http status code>, \"error\": { \"name\": ..., \"message\": ... } } on failure."
  - question: "How does pagination work?"
    answer: "List endpoints accept limit (default 10, max 30) and skip query parameters, and return count (the total number of matching items) and next (the full URL of the next page, or null if you're on the last page) alongside items."
head:
  - - meta
    - name: description
      content: The full bluefox.email API reference - authentication, the standard response format, pagination, and every project resource, generated live from our OpenAPI spec.
  - - meta
    - property: og:title
      content: API Reference | bluefox.email documentation
  - - meta
    - property: og:description
      content: The full bluefox.email API reference - authentication, the standard response format, pagination, and every project resource, generated live from our OpenAPI spec.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/api/reference
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: API Reference | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: The full bluefox.email API reference - authentication, the standard response format, pagination, and every project resource, generated live from our OpenAPI spec.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# API Reference

This page covers every resource in the bluefox.email API: projects, API keys, design systems, domains, sender identities,
webhooks, contacts, campaigns, transactional and triggered emails, templates, segments, subscriber lists, and the suppression
list. For the narrative guides on sending your first email or managing subscriptions, see the [API Overview](/docs/api/).

## For AI agents and code generators

The full <ApiSpecLink>OpenAPI 3.0 spec</ApiSpecLink> is served live from the API itself, so an agent can
fetch it directly and start calling endpoints without reading this page:

<pre><code>GET <ApiSpecLink /></code></pre>

It always reflects the current state of the API - every endpoint, request/response schema, and error shape below is
generated from that same document.

## Authentication

Every endpoint below is authenticated with a project API key, sent as a bearer token:

```
Authorization: Bearer YOUR_API_KEY
```

Create and manage keys under **Project Settings > API Keys** in the app, or via the `/v1/projectId/{projectId}/api-keys`
endpoints themselves. Never expose an API key in frontend/client-side code - call the API from your backend.

A few endpoints (documented in the "Subscriptions" and "Contacts" sections of the spec below) also accept requests from a
whitelisted browser Origin, for use directly from a signup form or widget without exposing an API key.

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
| `sort` | resource-specific | See each endpoint below for the allowed fields |
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
`/v1/signup-forms/{id}` - use an older flat URL and are documented separately in
[Contacts Management](/docs/api/contacts-management), [Subscriber List Management](/docs/api/subscriber-list-management),
[Send Transactional Email](/docs/api/send-transactional-email), and [Send Triggered Email](/docs/api/send-triggered-email).
They're also included in the spec below for completeness.

## Full reference

Every resource - Project, API Keys, Design Systems, Domains, Sender Identities, Webhook, Contacts, Campaigns,
Transactional Emails, Triggered Emails, Templates, Segments, Subscriber Lists, and Suppression List - has its own reference
page, generated live from the same OpenAPI spec AI agents use: every endpoint, parameter, request body, and response shape.

<PageCTA
  title="Browse the full API reference"
  description="Every resource, endpoint, request/response schema, and error shape, generated live from the OpenAPI spec."
  buttonText="Open the API reference"
  buttonUrl="/docs/api/reference/"
/>
