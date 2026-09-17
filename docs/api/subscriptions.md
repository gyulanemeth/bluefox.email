---
title: "Subscriptions API Reference | bluefox.email documentation"
description: "Subscribe, update, pause, and one-click unsubscribe contacts on a BlueFox Email list, and submit signup forms, via the flat-URL API."
head:
  - - meta
    - name: description
      content: "Subscribe, update, pause, and one-click unsubscribe contacts on a BlueFox Email list, and submit signup forms, via the flat-URL API."
  - - meta
    - property: og:title
      content: "Subscriptions API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Subscribe, update, pause, and one-click unsubscribe contacts on a BlueFox Email list, and submit signup forms, via the flat-URL API."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/subscriptions"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Subscriptions API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Subscribe, update, pause, and one-click unsubscribe contacts on a BlueFox Email list, and submit signup forms, via the flat-URL API."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Subscriptions

The flat-URL subscription endpoints. Subscribing a contact, and reading or updating a single subscriber, accept either an API key or a whitelisted browser origin, so a signup form can call them without exposing a key; set up the whitelist under [API Keys and Domain Whitelist](/docs/projects/settings#api-keys-and-domain-whitelist). The [one-click unsubscribe](/email-sending-concepts/one-click-unsubscribe) endpoint instead takes the signed token from an email's List-Unsubscribe link. New server-side integrations should use [Subscriber Lists](/docs/api/subscriber-lists). See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List subscribers of a list

`GET /v1/subscriber-lists/{id}`

Legacy flat URL shape. Auth: API key (Authorization: Bearer) matching the list's project, OR an admin/account-owner JWT.  
Unlike GET /v1/projectId/&#123;projectId&#125;/contacts (where custom field values are flat top-level keys), here they are   
returned nested under a "customFields" object, e.g. `&#123; "email": "x@y.com", "customFields": &#123; "plan": "pro" &#125; &#125;`.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | yes | The subscriber list _id. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | array of object |  |  |
| `items[].email` | string |  |  |
| `items[].status` | string (unverified \| active \| unsubscribed \| paused) |  |  |
| `items[].customFields` | object |  | Custom contact field values, keyed by field name. |
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |

</div>

## Subscribe a contact to a list

`POST /v1/subscriber-lists/{id}`

Legacy flat URL shape. Creates the contact if it doesn't exist yet. Triggers double opt-in if enabled on the list. Auth: API key, or a whitelisted Origin (in which case a CAPTCHA is required unless the list disables it).

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | yes | The subscriber list _id. |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | yes |  |
| `name` | string |  |  |
| `status` | string (unverified \| active) |  |  |
| `captchaText` | string |  |  |
| `captchaProbe` | string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string |  |  |
| `email` | string |  |  |

</div>

## Get a subscriber by email

`GET /v1/subscriber-lists/{id}/{email}`

Legacy flat URL shape. Accepts an API key or a whitelisted Origin header.  
Unlike GET /v1/projectId/&#123;projectId&#125;/contacts/&#123;email&#125; (where custom field values are flat top-level keys), here they   
are returned nested under a "customFields" object, e.g. `&#123; "email": "x@y.com", "customFields": &#123; "plan": "pro" &#125; &#125;`.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | yes | The subscriber list _id. |
| `email` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Subscriber not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string |  |  |
| `status` | string (unverified \| active \| unsubscribed \| paused) |  |  |
| `customFields` | object |  | Custom contact field values, keyed by field name. |

</div>

## Update a subscriber (status, contact fields, pause/resubscribe)

`PATCH /v1/subscriber-lists/{id}/{email}`

Legacy flat URL shape. Setting status to "paused" requires pausedUntil (a future date). Accepts an API key or a whitelisted Origin header.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | yes | The subscriber list _id. |
| `email` | path | string | yes |  |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string |  |  |
| `status` | string (active \| paused \| unsubscribed) |  |  |
| `pausedUntil` | string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Subscriber not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

## One-click unsubscribe

`POST /v1/subscriber-lists/{id}/{email}/unsubscribe`

Legacy flat URL shape. Not API-key authenticated - requires a signed one-click-unsubscribe token (the ?token= query param from a dispatched email's List-Unsubscribe link).

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | yes | The subscriber list _id. |
| `email` | path | string | yes |  |
| `token` | query | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Subscriber not found |

</div>

## Submit a hosted/embedded signup form

`POST /v1/signup-forms/{id}`

Legacy flat URL shape. Not API-key authenticated - requires a whitelisted Origin header, and (depending on the form config) a CAPTCHA. Subscribes the contact to every list configured on the form.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | yes | The signup form _id. |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | yes |  |
| `name` | string |  |  |
| `captchaText` | string |  |  |
| `captchaProbe` | string |  |  |
| `turnstileToken` | string |  |  |
| `termsAccepted` | boolean |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |
| `redirectTo` | string |  |  |

</div>
