---
title: "Email Error Log API Reference | bluefox.email documentation"
description: "Every Email Error Log endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Email Error Log endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Email Error Log API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Email Error Log endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/email-error-log"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Email Error Log API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Email Error Log endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Email Error Log

Full reference for the **Email Error Log** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List processing/delivery errors for an email

`GET /v1/projectId/{projectId}/related-to/{relatedToId}/email-error-logs`

Merges send-processing errors and delivery failures from the last 30 days, newest first.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `relatedToId` | path | string | yes | The campaign/transactional/triggered email _id. |
| `limit` | query | integer |  |  |
| `skip` | query | integer |  |  |

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
| `items` | array |  |  |
| `count` | integer |  |  |
| `unseenCount` | integer |  | Items created after the last time this log was marked seen in the app. |

</div>
