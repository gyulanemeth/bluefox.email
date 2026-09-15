---
title: "Email Error Log API Reference | bluefox.email documentation"
description: "List the last 30 days of processing and delivery errors for a campaign, transactional, or triggered email with the BlueFox Email API."
head:
  - - meta
    - name: description
      content: "List the last 30 days of processing and delivery errors for a campaign, transactional, or triggered email with the BlueFox Email API."
  - - meta
    - property: og:title
      content: "Email Error Log API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "List the last 30 days of processing and delivery errors for a campaign, transactional, or triggered email with the BlueFox Email API."
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
      content: "List the last 30 days of processing and delivery errors for a campaign, transactional, or triggered email with the BlueFox Email API."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Email Error Log

When a send is accepted but fails later, during processing or delivery, the error is recorded against the email it belongs to. This endpoint lists those errors for one campaign, transactional email, or triggered email, newest first, covering the last 30 days. Reach for it when a [Send Email](/docs/api/send-email) call succeeded but the recipient never got the message, and keep an eye on bounce and complaint rates on the [project dashboard](/docs/projects/dashboard). See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

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
