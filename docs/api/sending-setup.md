---
title: "Sending Setup API Reference | bluefox.email documentation"
description: "Every Sending Setup endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Sending Setup endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Sending Setup API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Sending Setup endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/sending-setup"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Sending Setup API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Sending Setup endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Sending Setup

Full reference for the **Sending Setup** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List AWS regions available for production sending

`GET /v1/projectId/{projectId}/regions`

The valid values for a domain's or sender identity's region field when adding one for a production (non-BYO) project.

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
| 200 | OK |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `regions` | array of string |  |  |

</div>

## Get sandbox sending deliverability

`GET /v1/projectId/{projectId}/sandbox/deliverability`

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
| 200 | OK |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `sentCount` | integer |  | Sandbox sends today. |
| `productionAccessReqStatus` | string |  |  |
| `bounce` | any |  |  |
| `complaint` | any |  |  |

</div>

## Get production sending deliverability

`GET /v1/projectId/{projectId}/production/deliverability`

Worst bounce/complaint rate over the last 7/30/90 days, a per-verified-domain breakdown, and this month's send count against the monthly limit.

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
| 200 | OK |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bounce` | any |  |  |
| `complaint` | any |  |  |
| `domains` | array of object |  | Only verified (DKIM-passing) domains. |
| `domains[].domain` | string |  |  |
| `domains[].region` | string |  |  |
| `domains[].sent` | integer |  |  |
| `domains[].bounces` | integer |  |  |
| `domains[].complaints` | integer |  |  |
| `monthly` | object |  |  |
| `monthly.sent` | integer |  |  |
| `monthly.limit` | integer |  |  |

</div>

## Send a synthetic test webhook event

`GET /v1/projectId/{projectId}/test-webhook`

Fires a synthetic event of the given type at the project's configured webhook URL, to confirm it's reachable and correctly signed. 503 if the webhook endpoint itself rejects or errors on the test request.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `type` | query | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |

</div>

## Export a domain's required DNS records as CSV

`GET /v1/projectId/{projectId}/domains/{domainId}/export/csv`

Returns a raw CSV file (Content-Disposition attachment), not the usual &#123;status, result&#125; JSON envelope.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `domainId` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | CSV file |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |

</div>
