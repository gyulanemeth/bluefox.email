---
title: "Subscriber Lists API Reference | bluefox.email documentation"
description: "Every Subscriber Lists endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Subscriber Lists endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Subscriber Lists API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Subscriber Lists endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/subscriber-lists"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Subscriber Lists API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Subscriber Lists endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Subscriber Lists

Full reference for the **Subscriber Lists** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List subscriber lists

`GET /v1/projectId/{projectId}/subscriber-lists`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `limit` | query | integer |  | Max items per page. Capped at 30. |
| `skip` | query | integer |  | Number of items to skip, for pagination. |
| `sort` | query | string |  | Field to sort by. |
| `order` | query | string |  |  |
| `filter[&lt;field&gt;]` | query | string |  | Exact-match filter on a top-level field, e.g. filter[name]=Welcome. Repeatable for multiple fields. |

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
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |

</div>

## Create a subscriber list

`POST /v1/projectId/{projectId}/subscriber-lists`

doubleOptIn.emailId (if given) must be a transactional email belonging to this same project - a valid ID from a different project 404s. When doubleOptIn.active is true, that email's content must also include &#123;&#123;verifyLink&#125;&#125;.

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
| `name` | string | yes |  |
| `description` | string | yes |  |
| `private` | boolean |  |  |
| `doubleOptIn` | object |  | emailId is required when active is true. When active is true, the referenced transactional email's content must include &#123;&#123;verifyLink&#125;&#125; - the API rejects the request with a 400 otherwise, since that's the only way a contact can confirm their subscription. Replaces the whole object when given - to change just one field, GET the current value first and send all five back together. Do not include the GET response's doubleOptIn._id - it is Mongoose's own subdocument id, not a real field, and PATCH rejects it as unexpected. |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email - NOT a template ID, even though a template may look interchangeable. Its content must include &#123;&#123;verifyLink&#125;&#125; if active is true. If the user wants double opt-in but hasn't said which email to use, call GET /v1/projectId/&#123;projectId&#125;/transactional-emails first and ask them to choose from the real names. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `signupForm` | object |  | Replaces the whole object when given, not a per-field merge - GET the current value first and send back every field you want to keep alongside your changes. Do not include the GET response's signupForm._id - it is Mongoose's own subdocument id, not a real field, and PATCH rejects it as unexpected. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `description` | string |  |  |
| `private` | boolean |  |  |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `signupForm` | object |  |  |
| `signupForm.formLayout` | string |  |  |
| `signupForm.showCaptcha` | boolean |  |  |
| `signupForm.emailPlaceholder` | string |  |  |
| `signupForm.captchaPlaceholder` | string |  |  |
| `signupForm.formFontStyle` | string |  |  |
| `signupForm.formFontColor` | string |  |  |
| `signupForm.formFontSize` | string |  |  |
| `signupForm.btnLabel` | string |  |  |
| `signupForm.btnFont` | string |  |  |
| `signupForm.btnFontColor` | string |  |  |
| `signupForm.btnColor` | string |  |  |
| `signupForm.btnFontSize` | string |  |  |
| `signupForm.successMessage` | string |  |  |
| `signupForm.successFont` | string |  |  |
| `signupForm.successFontColor` | string |  |  |
| `signupForm.successFontSize` | string |  |  |
| `signupForm.propertiesStyle` | object |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single subscriber list

`GET /v1/projectId/{projectId}/subscriber-lists/{id}`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Subscriber Lists not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `description` | string |  |  |
| `private` | boolean |  |  |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `signupForm` | object |  |  |
| `signupForm.formLayout` | string |  |  |
| `signupForm.showCaptcha` | boolean |  |  |
| `signupForm.emailPlaceholder` | string |  |  |
| `signupForm.captchaPlaceholder` | string |  |  |
| `signupForm.formFontStyle` | string |  |  |
| `signupForm.formFontColor` | string |  |  |
| `signupForm.formFontSize` | string |  |  |
| `signupForm.btnLabel` | string |  |  |
| `signupForm.btnFont` | string |  |  |
| `signupForm.btnFontColor` | string |  |  |
| `signupForm.btnColor` | string |  |  |
| `signupForm.btnFontSize` | string |  |  |
| `signupForm.successMessage` | string |  |  |
| `signupForm.successFont` | string |  |  |
| `signupForm.successFontColor` | string |  |  |
| `signupForm.successFontSize` | string |  |  |
| `signupForm.propertiesStyle` | object |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Partially update a subscriber list

`PATCH /v1/projectId/{projectId}/subscriber-lists/{id}`

Merges the given fields into the existing document - omitted fields are left unchanged. Nothing is required (unlike create) since every field is optional on a partial update.  
  
doubleOptIn.emailId and the &#123;&#123;verifyLink&#125;&#125; content requirement are re-validated the same way as create.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes |  |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string |  |  |
| `description` | string |  |  |
| `private` | boolean |  |  |
| `doubleOptIn` | object |  | emailId is required when active is true. When active is true, the referenced transactional email's content must include &#123;&#123;verifyLink&#125;&#125; - the API rejects the request with a 400 otherwise, since that's the only way a contact can confirm their subscription. Replaces the whole object when given - to change just one field, GET the current value first and send all five back together. Do not include the GET response's doubleOptIn._id - it is Mongoose's own subdocument id, not a real field, and PATCH rejects it as unexpected. |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email - NOT a template ID, even though a template may look interchangeable. Its content must include &#123;&#123;verifyLink&#125;&#125; if active is true. If the user wants double opt-in but hasn't said which email to use, call GET /v1/projectId/&#123;projectId&#125;/transactional-emails first and ask them to choose from the real names. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `signupForm` | object |  | Replaces the whole object when given, not a per-field merge - GET the current value first and send back every field you want to keep alongside your changes. Do not include the GET response's signupForm._id - it is Mongoose's own subdocument id, not a real field, and PATCH rejects it as unexpected. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Subscriber Lists not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `description` | string |  |  |
| `private` | boolean |  |  |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `signupForm` | object |  |  |
| `signupForm.formLayout` | string |  |  |
| `signupForm.showCaptcha` | boolean |  |  |
| `signupForm.emailPlaceholder` | string |  |  |
| `signupForm.captchaPlaceholder` | string |  |  |
| `signupForm.formFontStyle` | string |  |  |
| `signupForm.formFontColor` | string |  |  |
| `signupForm.formFontSize` | string |  |  |
| `signupForm.btnLabel` | string |  |  |
| `signupForm.btnFont` | string |  |  |
| `signupForm.btnFontColor` | string |  |  |
| `signupForm.btnColor` | string |  |  |
| `signupForm.btnFontSize` | string |  |  |
| `signupForm.successMessage` | string |  |  |
| `signupForm.successFont` | string |  |  |
| `signupForm.successFontColor` | string |  |  |
| `signupForm.successFontSize` | string |  |  |
| `signupForm.propertiesStyle` | object |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a subscriber list

`DELETE /v1/projectId/{projectId}/subscriber-lists/{id}`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | Deleted |
| 403 | Missing or invalid API key |
| 404 | Subscriber Lists not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `description` | string |  |  |
| `private` | boolean |  |  |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `signupForm` | object |  |  |
| `signupForm.formLayout` | string |  |  |
| `signupForm.showCaptcha` | boolean |  |  |
| `signupForm.emailPlaceholder` | string |  |  |
| `signupForm.captchaPlaceholder` | string |  |  |
| `signupForm.formFontStyle` | string |  |  |
| `signupForm.formFontColor` | string |  |  |
| `signupForm.formFontSize` | string |  |  |
| `signupForm.btnLabel` | string |  |  |
| `signupForm.btnFont` | string |  |  |
| `signupForm.btnFontColor` | string |  |  |
| `signupForm.btnColor` | string |  |  |
| `signupForm.btnFontSize` | string |  |  |
| `signupForm.successMessage` | string |  |  |
| `signupForm.successFont` | string |  |  |
| `signupForm.successFontColor` | string |  |  |
| `signupForm.successFontSize` | string |  |  |
| `signupForm.propertiesStyle` | object |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get stats for a single subscriber list

`GET /v1/projectId/{projectId}/subscriber-lists/{id}/stats`

Aggregate counts only, never a per-recipient list - response size and query cost are bounded regardless of how much activity actually happened, since every count is a single indexed query scoped to this one resource. For the actual list of recipients (who received/opened/clicked/bounced/unsubscribed), see GET /v1/projectId/&#123;projectId&#125;/subscriber-lists/&#123;id&#125;/recipients.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The subscriber list _id. |
| `from` | query | string |  | Only count events at or after this date/time. |
| `to` | query | string |  | Only count events at or before this date/time. If both from and to are given, the range between them cannot exceed 366 days. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Subscriber Lists not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | integer |  |  |
| `paused` | integer |  |  |
| `unsubscribed` | integer |  |  |
| `unverified` | integer |  |  |
| `subscribed` | integer |  | subscribe events in range. |
| `unsubscribedEvents` | integer |  |  |
| `pausedEvents` | integer |  |  |
| `unpausedEvents` | integer |  |  |
| `bounce` | integer |  |  |
| `complaint` | integer |  |  |

</div>

## List subscribers on a list, with their contact data

`GET /v1/projectId/{projectId}/subscriber-lists/{id}/subscribers`

Project-scoped equivalent of GET /v1/subscriber-lists/&#123;id&#125; (which is a legacy flat URL shape kept for hosted signup   
forms and one-click-unsubscribe links). Each item merges the subscriber's per-list status with their contact data -   
custom field values come back nested under a "customFields" object here, not flattened onto top-level keys like   
GET /v1/projectId/&#123;projectId&#125;/contacts.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The subscriber list _id. |
| `limit` | query | integer |  | Max items per page. Capped at 30. |
| `skip` | query | integer |  | Number of items to skip, for pagination. |
| `sort` | query | string |  | Field to sort by. |
| `order` | query | string |  |  |
| `filter[&lt;field&gt;]` | query | string |  | Exact-match filter on a top-level field, e.g. filter[name]=Welcome. Repeatable for multiple fields. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Subscriber list not found |

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

`POST /v1/projectId/{projectId}/subscriber-lists/{id}/subscribers`

Project-scoped equivalent of POST /v1/subscriber-lists/&#123;id&#125; (which is a legacy flat URL shape kept for hosted   
signup forms - it also accepts a whitelisted Origin header and CAPTCHA, neither of which apply here since this   
route is API-key only). Creates the contact if it doesn't exist yet. Triggers double opt-in if enabled on the   
list, unless status is explicitly set to "active".

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The subscriber list _id. |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | yes |  |
| `name` | string |  |  |
| `status` | string (unverified \| active) |  |  |
| `tags` | array of string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Subscriber list not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string |  |  |
| `status` | string (unverified \| active \| unsubscribed \| paused) |  |  |
| `customFields` | object |  | Custom contact field values, keyed by field name. |

</div>

## Get a single subscriber's status and contact data on a list

`GET /v1/projectId/{projectId}/subscriber-lists/{id}/subscribers/{email}`

Project-scoped equivalent of GET /v1/subscriber-lists/&#123;id&#125;/&#123;email&#125; (which is a legacy flat URL shape kept for hosted   
signup forms and one-click-unsubscribe links). Custom field values come back nested under a "customFields" object   
here, not flattened onto top-level keys like GET /v1/projectId/&#123;projectId&#125;/contacts/&#123;email&#125;.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
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

`PATCH /v1/projectId/{projectId}/subscriber-lists/{id}/subscribers/{email}`

Project-scoped equivalent of PATCH /v1/subscriber-lists/&#123;id&#125;/&#123;email&#125; (which is a legacy flat URL shape kept for   
hosted signup forms). Setting status to "paused" requires pausedUntil (a future date).

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
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

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string |  |  |
| `status` | string (unverified \| active \| unsubscribed \| paused) |  |  |
| `customFields` | object |  | Custom contact field values, keyed by field name. |

</div>
