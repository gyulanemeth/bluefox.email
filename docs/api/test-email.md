---
title: "Test Email API Reference | bluefox.email documentation"
description: "Every Test Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Test Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Test Email API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Test Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/test-email"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Test Email API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Test Email endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Test Email

Full reference for the **Test Email** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## Send a test email

`POST /v1/projectId/{projectId}/test-email/{id}`

Sends a campaign, triggered, or transactional email to a single recipient (by email or by picking a contact from a private subscriber list) without affecting real send stats or contact state.  
  
Sending fails with a 405 if the account is out of email credit ("Insufficient credits available") - there is no public endpoint to check remaining balance ahead of time, only in the app. It also fails with a 405 if a sandbox project's daily send cap is exceeded, or if bounce/complaint rates have triggered automatic restriction (see Project.status and GET .../sandbox/deliverability).

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The campaign/triggered-email/transactional-email _id. |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string (campaign \| triggered \| transactional) | yes |  |
| `email` | string |  | Required unless subscriberListId is given. |
| `subscriberListId` | string |  | A private subscriber list to send to (picks a subscriber from it). Required unless email is given. |
| `data` | any |  | Template variables to render into the email. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK, queued for sending |
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
