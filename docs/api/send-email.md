---
title: "Send Email API Reference | bluefox.email documentation"
description: "Every Send Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Send Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Send Email API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Send Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/send-email"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Send Email API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Send Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Send Email

Full reference for the **Send Email** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## Send a transactional email

`POST /v1/projectId/{projectId}/send-transactional`

The project is resolved from transactionalId, not just the URL - the URL's projectId must match the transactional email's own project, or this 404s.  
  
Sending fails with a 405 if the account is out of email credit ("Insufficient credits available") - there is no public endpoint to check remaining balance ahead of time, only in the app. It also fails with a 405 if a sandbox project's daily send cap is exceeded, or if bounce/complaint rates have triggered automatic restriction (see Project.status and GET .../sandbox/deliverability).

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
| `email` | string | yes |  |
| `transactionalId` | string | yes | A transactional email _id, from GET /v1/projectId/&#123;projectId&#125;/transactional-emails - NOT a template ID. |
| `data` | any |  | Template variables to render into the email. |
| `attachments` | array of object |  |  |
| `attachments[].filename` | string |  |  |
| `attachments[].content` | string |  | Base64-encoded file content. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK, queued for sending |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Transactional email not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |

</div>

## Send a triggered email

`POST /v1/projectId/{projectId}/send-triggered`

The project is resolved from triggeredId, not just the URL - the URL's projectId must match the triggered email's own project, or this 404s.  
  
Sending fails with a 405 if the account is out of email credit ("Insufficient credits available") - there is no public endpoint to check remaining balance ahead of time, only in the app. It also fails with a 405 if a sandbox project's daily send cap is exceeded, or if bounce/complaint rates have triggered automatic restriction (see Project.status and GET .../sandbox/deliverability).

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
| `triggeredId` | string | yes | A triggered email _id, from GET /v1/projectId/&#123;projectId&#125;/triggered-emails - NOT a template ID. |
| `emails` | array of string |  | Defaults to every active subscriber on the triggered email's subscriber list when omitted. |
| `data` | any |  | Template variables to render into the email. |
| `attachments` | array of object |  |  |
| `attachments[].filename` | string |  |  |
| `attachments[].content` | string |  | Base64-encoded file content. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK, queued for sending |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Triggered email not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |

</div>

## Send a transactional email (legacy flat URL shape)

`POST /v1/send-transactional`

Legacy flat URL shape, kept for backward compatibility - identical behavior to POST /v1/projectId/&#123;projectId&#125;/send-transactional above (which is the same handler; there is no projectId in this URL because the project is resolved entirely from transactionalId).  
  
Sending fails with a 405 if the account is out of email credit ("Insufficient credits available") - there is no public endpoint to check remaining balance ahead of time, only in the app. It also fails with a 405 if a sandbox project's daily send cap is exceeded, or if bounce/complaint rates have triggered automatic restriction (see Project.status and GET .../sandbox/deliverability).

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | yes |  |
| `transactionalId` | string | yes | A transactional email _id, from GET /v1/projectId/&#123;projectId&#125;/transactional-emails - NOT a template ID. |
| `data` | any |  | Template variables to render into the email. |
| `attachments` | array of object |  |  |
| `attachments[].filename` | string |  |  |
| `attachments[].content` | string |  | Base64-encoded file content. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK, queued for sending |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Transactional email not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |

</div>

## Send a triggered email (legacy flat URL shape)

`POST /v1/send-triggered`

Legacy flat URL shape, kept for backward compatibility - identical behavior to POST /v1/projectId/&#123;projectId&#125;/send-triggered above (which is the same handler; there is no projectId in this URL because the project is resolved entirely from triggeredId).  
  
Sending fails with a 405 if the account is out of email credit ("Insufficient credits available") - there is no public endpoint to check remaining balance ahead of time, only in the app. It also fails with a 405 if a sandbox project's daily send cap is exceeded, or if bounce/complaint rates have triggered automatic restriction (see Project.status and GET .../sandbox/deliverability).

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `triggeredId` | string | yes | A triggered email _id, from GET /v1/projectId/&#123;projectId&#125;/triggered-emails - NOT a template ID. |
| `emails` | array of string |  | Defaults to every active subscriber on the triggered email's subscriber list when omitted. |
| `data` | any |  | Template variables to render into the email. |
| `attachments` | array of object |  |  |
| `attachments[].filename` | string |  |  |
| `attachments[].content` | string |  | Base64-encoded file content. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK, queued for sending |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Triggered email not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |

</div>
