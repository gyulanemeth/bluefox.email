---
title: "Webhook API Reference | bluefox.email documentation"
description: "Every Webhook endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Webhook endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Webhook API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Webhook endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/webhook"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Webhook API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Webhook endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Webhook

Full reference for the **Webhook** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## Get the configured webhook

`GET /v1/projectId/{projectId}/webhook`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK, result is null if no webhook is configured |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string |  |  |
| `secretKey` | string |  |  |
| `bounce` | boolean |  |  |
| `complaint` | boolean |  |  |
| `click` | boolean |  |  |
| `open` | boolean |  |  |
| `sent` | boolean |  |  |
| `failed` | boolean |  |  |
| `subscription` | boolean |  |  |

</div>

## Create or replace the webhook configuration

`PATCH /v1/projectId/{projectId}/webhook`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes |  |
| `secretKey` | string | yes | Must match one of this project's existing API keys (managed in the app under Project Settings &gt; API Keys - not exposed via this API). |
| `bounce` | boolean |  |  |
| `complaint` | boolean |  |  |
| `click` | boolean |  |  |
| `open` | boolean |  |  |
| `sent` | boolean |  |  |
| `failed` | boolean |  |  |
| `subscription` | boolean |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string |  |  |
| `secretKey` | string |  |  |
| `bounce` | boolean |  |  |
| `complaint` | boolean |  |  |
| `click` | boolean |  |  |
| `open` | boolean |  |  |
| `sent` | boolean |  |  |
| `failed` | boolean |  |  |
| `subscription` | boolean |  |  |

</div>

## Remove the webhook configuration

`DELETE /v1/projectId/{projectId}/webhook`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | Deleted |
| 403 | Missing or invalid API key |
| 404 | Webhook not found |

</div>
