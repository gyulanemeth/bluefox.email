---
title: "Webhook API Reference"
description: "Configure the BlueFox Email project webhook via the REST API: the URL, the API key it sends, and which email events it receives."
head:
  - - meta
    - name: description
      content: "Configure the BlueFox Email project webhook via the REST API: the URL, the API key it sends, and which email events it receives."
  - - meta
    - property: og:title
      content: "Webhook API Reference | BlueFox Email"
  - - meta
    - property: og:description
      content: "Configure the BlueFox Email project webhook via the REST API: the URL, the API key it sends, and which email events it receives."
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
      content: "Webhook API Reference | BlueFox Email"
  - - meta
    - name: twitter:description
      content: "Configure the BlueFox Email project webhook via the REST API: the URL, the API key it sends, and which email events it receives."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Webhook API

Read, create or replace, and delete a project's webhook: the URL events are sent to, the API key sent with each request so your endpoint can verify it, and which events it receives (sent, failed, opens, clicks, bounces, complaints, and subscription changes). The key must be one of the project's existing API keys, which are managed in the app, not through the API. Send a synthetic event with the test webhook endpoint in [Sending Setup](/docs/api/sending-setup), and see [Webhooks](/docs/integrations/webhooks) for verifying requests. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

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
