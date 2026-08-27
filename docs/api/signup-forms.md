---
title: "Signup Forms API Reference | bluefox.email documentation"
description: "Every Signup Forms endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Signup Forms endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Signup Forms API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Signup Forms endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/signup-forms"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Signup Forms API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Signup Forms endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Signup Forms

Full reference for the **Signup Forms** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List signup forms

`GET /v1/projectId/{projectId}/signup-forms`

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

## Create a signup form

`POST /v1/projectId/{projectId}/signup-forms`

doubleOptIn.emailId (if given) must be a transactional email belonging to this same project - a valid ID from a different project 404s. When doubleOptIn.active is true, that email's content must also include &#123;&#123;verifyLink&#125;&#125;. See also GET .../signup-forms/&#123;id&#125;/embed for the ready-to-paste HTML.

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
| `subscriberListIds` | array of string |  |  |
| `formLayout` | string |  |  |
| `showCaptcha` | boolean |  |  |
| `captchaType` | string (none \| svg \| turnstile) |  |  |
| `turnstileSiteKey` | string |  |  |
| `turnstileSecretKey` | string |  | Write-only - never returned. Encrypted at rest. |
| `turnstileTheme` | string (light \| dark \| auto) |  |  |
| `turnstileSize` | string (normal \| compact \| flexible) |  |  |
| `turnstileAppearance` | string (always \| execute \| interaction-only) |  |  |
| `emailPlaceholder` | string |  |  |
| `captchaPlaceholder` | string |  |  |
| `formFontStyle` | string |  |  |
| `formFontColor` | string |  |  |
| `formFontSize` | string |  |  |
| `btnLabel` | string |  |  |
| `btnFont` | string |  |  |
| `btnFontColor` | string |  |  |
| `btnColor` | string |  |  |
| `btnFontSize` | string |  |  |
| `successMessage` | string |  |  |
| `successFont` | string |  |  |
| `successFontColor` | string |  |  |
| `successFontSize` | string |  |  |
| `redirectLink` | string |  |  |
| `termsAndConditions` | object |  |  |
| `termsAndConditions.show` | boolean |  |  |
| `termsAndConditions.label` | string |  |  |
| `termsAndConditions.linkLabel` | string |  |  |
| `termsAndConditions.link` | string |  |  |
| `propertiesStyle` | object |  |  |
| `doubleOptIn` | object |  | Replaces the whole object when given - to change just one field, GET the current value first and send all five back together. Do not include the GET response's doubleOptIn._id - it is Mongoose's own subdocument id, not a real field, and PATCH rejects it as unexpected. |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  |  |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |

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
| `subscriberListIds` | array of string |  |  |
| `formLayout` | string |  |  |
| `showCaptcha` | boolean |  |  |
| `captchaType` | string (none \| svg \| turnstile) |  |  |
| `turnstileSiteKey` | string |  |  |
| `turnstileSecretKeyHint` | string |  | The real secret is never returned - this is a decrypt-and-mask hint showing it's set (e.g. "ab**...**yz"). |
| `turnstileTheme` | string (light \| dark \| auto) |  |  |
| `turnstileSize` | string (normal \| compact \| flexible) |  |  |
| `turnstileAppearance` | string (always \| execute \| interaction-only) |  |  |
| `emailPlaceholder` | string |  |  |
| `captchaPlaceholder` | string |  |  |
| `formFontStyle` | string |  |  |
| `formFontColor` | string |  |  |
| `formFontSize` | string |  |  |
| `btnLabel` | string |  |  |
| `btnFont` | string |  |  |
| `btnFontColor` | string |  |  |
| `btnColor` | string |  |  |
| `btnFontSize` | string |  |  |
| `successMessage` | string |  |  |
| `successFont` | string |  |  |
| `successFontColor` | string |  |  |
| `successFontSize` | string |  |  |
| `redirectLink` | string |  | Where a visitor lands immediately after submitting the form - used when double opt-in is off, or is on but not yet confirmed. Different from doubleOptIn.redirectLink below. |
| `termsAndConditions` | object |  |  |
| `termsAndConditions.show` | boolean |  |  |
| `termsAndConditions.label` | string |  |  |
| `termsAndConditions.linkLabel` | string |  |  |
| `termsAndConditions.link` | string |  |  |
| `propertiesStyle` | object |  | Per custom-contact-field display settings, keyed by field name: &#123; show, required, placeholder, order &#125;. |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  | Where a visitor lands after clicking the confirmation link in their email. Only relevant when active is true. Different from the top-level redirectLink above. |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. Its content must include &#123;&#123;verifyLink&#125;&#125;. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single signup form

`GET /v1/projectId/{projectId}/signup-forms/{id}`

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
| 404 | Signup Forms not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subscriberListIds` | array of string |  |  |
| `formLayout` | string |  |  |
| `showCaptcha` | boolean |  |  |
| `captchaType` | string (none \| svg \| turnstile) |  |  |
| `turnstileSiteKey` | string |  |  |
| `turnstileSecretKeyHint` | string |  | The real secret is never returned - this is a decrypt-and-mask hint showing it's set (e.g. "ab**...**yz"). |
| `turnstileTheme` | string (light \| dark \| auto) |  |  |
| `turnstileSize` | string (normal \| compact \| flexible) |  |  |
| `turnstileAppearance` | string (always \| execute \| interaction-only) |  |  |
| `emailPlaceholder` | string |  |  |
| `captchaPlaceholder` | string |  |  |
| `formFontStyle` | string |  |  |
| `formFontColor` | string |  |  |
| `formFontSize` | string |  |  |
| `btnLabel` | string |  |  |
| `btnFont` | string |  |  |
| `btnFontColor` | string |  |  |
| `btnColor` | string |  |  |
| `btnFontSize` | string |  |  |
| `successMessage` | string |  |  |
| `successFont` | string |  |  |
| `successFontColor` | string |  |  |
| `successFontSize` | string |  |  |
| `redirectLink` | string |  | Where a visitor lands immediately after submitting the form - used when double opt-in is off, or is on but not yet confirmed. Different from doubleOptIn.redirectLink below. |
| `termsAndConditions` | object |  |  |
| `termsAndConditions.show` | boolean |  |  |
| `termsAndConditions.label` | string |  |  |
| `termsAndConditions.linkLabel` | string |  |  |
| `termsAndConditions.link` | string |  |  |
| `propertiesStyle` | object |  | Per custom-contact-field display settings, keyed by field name: &#123; show, required, placeholder, order &#125;. |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  | Where a visitor lands after clicking the confirmation link in their email. Only relevant when active is true. Different from the top-level redirectLink above. |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. Its content must include &#123;&#123;verifyLink&#125;&#125;. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Partially update a signup form

`PATCH /v1/projectId/{projectId}/signup-forms/{id}`

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
| `subscriberListIds` | array of string |  |  |
| `formLayout` | string |  |  |
| `showCaptcha` | boolean |  |  |
| `captchaType` | string (none \| svg \| turnstile) |  |  |
| `turnstileSiteKey` | string |  |  |
| `turnstileSecretKey` | string |  | Write-only - never returned. Encrypted at rest. |
| `turnstileTheme` | string (light \| dark \| auto) |  |  |
| `turnstileSize` | string (normal \| compact \| flexible) |  |  |
| `turnstileAppearance` | string (always \| execute \| interaction-only) |  |  |
| `emailPlaceholder` | string |  |  |
| `captchaPlaceholder` | string |  |  |
| `formFontStyle` | string |  |  |
| `formFontColor` | string |  |  |
| `formFontSize` | string |  |  |
| `btnLabel` | string |  |  |
| `btnFont` | string |  |  |
| `btnFontColor` | string |  |  |
| `btnColor` | string |  |  |
| `btnFontSize` | string |  |  |
| `successMessage` | string |  |  |
| `successFont` | string |  |  |
| `successFontColor` | string |  |  |
| `successFontSize` | string |  |  |
| `redirectLink` | string |  |  |
| `termsAndConditions` | object |  |  |
| `termsAndConditions.show` | boolean |  |  |
| `termsAndConditions.label` | string |  |  |
| `termsAndConditions.linkLabel` | string |  |  |
| `termsAndConditions.link` | string |  |  |
| `propertiesStyle` | object |  |  |
| `doubleOptIn` | object |  | Replaces the whole object when given - to change just one field, GET the current value first and send all five back together. Do not include the GET response's doubleOptIn._id - it is Mongoose's own subdocument id, not a real field, and PATCH rejects it as unexpected. |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  |  |
| `doubleOptIn.emailId` | string |  |  |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Signup Forms not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subscriberListIds` | array of string |  |  |
| `formLayout` | string |  |  |
| `showCaptcha` | boolean |  |  |
| `captchaType` | string (none \| svg \| turnstile) |  |  |
| `turnstileSiteKey` | string |  |  |
| `turnstileSecretKeyHint` | string |  | The real secret is never returned - this is a decrypt-and-mask hint showing it's set (e.g. "ab**...**yz"). |
| `turnstileTheme` | string (light \| dark \| auto) |  |  |
| `turnstileSize` | string (normal \| compact \| flexible) |  |  |
| `turnstileAppearance` | string (always \| execute \| interaction-only) |  |  |
| `emailPlaceholder` | string |  |  |
| `captchaPlaceholder` | string |  |  |
| `formFontStyle` | string |  |  |
| `formFontColor` | string |  |  |
| `formFontSize` | string |  |  |
| `btnLabel` | string |  |  |
| `btnFont` | string |  |  |
| `btnFontColor` | string |  |  |
| `btnColor` | string |  |  |
| `btnFontSize` | string |  |  |
| `successMessage` | string |  |  |
| `successFont` | string |  |  |
| `successFontColor` | string |  |  |
| `successFontSize` | string |  |  |
| `redirectLink` | string |  | Where a visitor lands immediately after submitting the form - used when double opt-in is off, or is on but not yet confirmed. Different from doubleOptIn.redirectLink below. |
| `termsAndConditions` | object |  |  |
| `termsAndConditions.show` | boolean |  |  |
| `termsAndConditions.label` | string |  |  |
| `termsAndConditions.linkLabel` | string |  |  |
| `termsAndConditions.link` | string |  |  |
| `propertiesStyle` | object |  | Per custom-contact-field display settings, keyed by field name: &#123; show, required, placeholder, order &#125;. |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  | Where a visitor lands after clicking the confirmation link in their email. Only relevant when active is true. Different from the top-level redirectLink above. |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. Its content must include &#123;&#123;verifyLink&#125;&#125;. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a signup form

`DELETE /v1/projectId/{projectId}/signup-forms/{id}`

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
| 404 | Signup Forms not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subscriberListIds` | array of string |  |  |
| `formLayout` | string |  |  |
| `showCaptcha` | boolean |  |  |
| `captchaType` | string (none \| svg \| turnstile) |  |  |
| `turnstileSiteKey` | string |  |  |
| `turnstileSecretKeyHint` | string |  | The real secret is never returned - this is a decrypt-and-mask hint showing it's set (e.g. "ab**...**yz"). |
| `turnstileTheme` | string (light \| dark \| auto) |  |  |
| `turnstileSize` | string (normal \| compact \| flexible) |  |  |
| `turnstileAppearance` | string (always \| execute \| interaction-only) |  |  |
| `emailPlaceholder` | string |  |  |
| `captchaPlaceholder` | string |  |  |
| `formFontStyle` | string |  |  |
| `formFontColor` | string |  |  |
| `formFontSize` | string |  |  |
| `btnLabel` | string |  |  |
| `btnFont` | string |  |  |
| `btnFontColor` | string |  |  |
| `btnColor` | string |  |  |
| `btnFontSize` | string |  |  |
| `successMessage` | string |  |  |
| `successFont` | string |  |  |
| `successFontColor` | string |  |  |
| `successFontSize` | string |  |  |
| `redirectLink` | string |  | Where a visitor lands immediately after submitting the form - used when double opt-in is off, or is on but not yet confirmed. Different from doubleOptIn.redirectLink below. |
| `termsAndConditions` | object |  |  |
| `termsAndConditions.show` | boolean |  |  |
| `termsAndConditions.label` | string |  |  |
| `termsAndConditions.linkLabel` | string |  |  |
| `termsAndConditions.link` | string |  |  |
| `propertiesStyle` | object |  | Per custom-contact-field display settings, keyed by field name: &#123; show, required, placeholder, order &#125;. |
| `doubleOptIn` | object |  |  |
| `doubleOptIn.active` | boolean |  |  |
| `doubleOptIn.redirectLink` | string |  | Where a visitor lands after clicking the confirmation link in their email. Only relevant when active is true. Different from the top-level redirectLink above. |
| `doubleOptIn.emailId` | string |  | A transactional email _id used to send the confirmation email. Its content must include &#123;&#123;verifyLink&#125;&#125;. |
| `doubleOptIn.confirmationTitle` | string |  |  |
| `doubleOptIn.confirmationMessage` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a signup form's embeddable HTML

`GET /v1/projectId/{projectId}/signup-forms/{id}/embed`

Returns the same self-contained HTML (styling, markup, and captcha/submit JS included) shown on the dashboard's "embed" tab - ready to paste as-is into an external site. Returns a raw HTML file (Content-Disposition attachment), not the usual &#123;status, result&#125; JSON envelope.

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
| 200 | HTML file |
| 403 | Missing or invalid API key |
| 404 | Signup form not found |

</div>
