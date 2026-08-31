---
title: "Transactional Emails API Reference | bluefox.email documentation"
description: "Every Transactional Emails endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Transactional Emails endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Transactional Emails API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Transactional Emails endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/transactional-emails"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Transactional Emails API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Transactional Emails endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Transactional Emails

Full reference for the **Transactional Emails** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List transactional emails

`GET /v1/projectId/{projectId}/transactional-emails`

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

## Create a transactional email

`POST /v1/projectId/{projectId}/transactional-emails`

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
| `subject` | string | yes |  |
| `previewText` | string |  | Optional, but meaningfully affects open rates - if the user hasn't given you one, ask what they'd like it to say rather than leaving it blank. |
| `senderIdentity` | string |  | A sender identity _id. If the user hasn't told you which one to use, call GET /v1/projectId/&#123;projectId&#125;/sender-identities first and ask them to choose from the real email addresses returned - don't ask them for a raw ID. |
| `replyTo` | string |  |  |
| `type` | string (html \| text) |  | Omit to keep using the visual (Chamaileon) editor document. Set to "html" or "text" to author document as a raw Handlebars template string instead (see the document field). |
| `document` | any |  | The email content. When type is omitted, this is opaque Chamaileon visual-editor JSON - not meant to be hand-authored.  When type is "html" or "text", this is a plain string rendered with Handlebars at send time, and can use merge tags:   - `&#123;&#123;contact.email&#125;&#125;`, `&#123;&#123;contact.name&#125;&#125;`, and `&#123;&#123;contact.&lt;yourCustomFieldName&gt;&#125;&#125;` for any field from GET /v1/projectId/&#123;projectId&#125;/contacts/fields.   - `&#123;&#123;unsubscribeLink&#125;&#125;` and `&#123;&#123;pauseSubscriptionLink&#125;&#125;` - available for campaign/triggered/automation emails (subscriber-list-bound), NOT for transactional emails.   - Any feed's variableName (see the feeds field) as a loop, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;...&#123;&#123;this.title&#125;&#125;...&#123;&#123;/each&#125;&#125;`.   - Standard `&#123;&#123;#if&#125;&#125;`/`&#123;&#123;#unless&#125;&#125;`, plus custom helpers AND, OR, NOT, EQ, INCLUDES, CAPITALIZE, TRUNCATE, DEFAULT, usable like `&#123;&#123;#if (EQ contact.plan "pro")&#125;&#125;...&#123;&#123;/if&#125;&#125;`. For transactional/triggered sends, whatever object is passed as `data` on POST /v1/projectId/&#123;projectId&#125;/send-transactional or /v1/projectId/&#123;projectId&#125;/send-triggered is merged directly into the TOP LEVEL of the template context (not nested under a "data" key) - so sending `data: &#123; "orderId": 123 &#125;` makes `&#123;&#123;orderId&#125;&#125;` available, not `&#123;&#123;data.orderId&#125;&#125;`. |
| `feeds` | array of object |  | RSS/Atom/JSON feeds to pull into this email - see variableName on each feed for how to reference it from document. |
| `feeds[].url` | string | yes |  |
| `feeds[].feedType` | string (rss-xml \| json) | yes | "rss-xml" covers both RSS and Atom XML feeds - which one it actually is gets auto-detected from the feed content itself, which changes the array key inside the template (see variableName below). |
| `feeds[].variableName` | string | yes | No spaces allowed. This becomes a top-level Handlebars variable in the document (see the `document` field on  the parent email for the templating syntax). The feed's parsed items are NOT directly at `&#123;&#123;variableName&#125;&#125;` -  they're nested under a feed-shape-dependent array key you loop over with the custom `each` helper:   - feedType "rss-xml" that turns out to be RSS: `&#123;&#123;#each &lt;variableName&gt;.item&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is the literal word "item", singular)   - feedType "rss-xml" that turns out to be Atom: `&#123;&#123;#each &lt;variableName&gt;.entry&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is "entry")   - feedType "json": the array key is whatever field the source JSON actually uses for its list (e.g. "items", "articles") - inspect the feed's JSON to find it, it is not fixed. Inside the loop, each item's own fields are whatever the feed provides (e.g. RSS gives `&#123;&#123;this.title&#125;&#125;`, `&#123;&#123;this.link&#125;&#125;`, `&#123;&#123;this.pubDate&#125;&#125;`) - there is no fixed schema, it mirrors the feed's actual content one-to-one. |
| `feeds[].maxItems` | integer |  | Informational only - NOT enforced when the email is sent. To actually limit how many items render, pass limit (and optionally skip) as hash arguments on the each tag itself, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;`. |
| `feeds[].required` | boolean |  |  |
| `feeds[].availableFields` | array of string |  | Informational only, for the app UI - not enforced or used when rendering. |

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
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `senderIdentity` | string |  |  |
| `replyTo` | string |  |  |
| `type` | string (chamaileon \| html \| text) |  |  |
| `feeds` | array of object |  |  |
| `feeds[].url` | string | yes |  |
| `feeds[].feedType` | string (rss-xml \| json) | yes | "rss-xml" covers both RSS and Atom XML feeds - which one it actually is gets auto-detected from the feed content itself, which changes the array key inside the template (see variableName below). |
| `feeds[].variableName` | string | yes | No spaces allowed. This becomes a top-level Handlebars variable in the document (see the `document` field on  the parent email for the templating syntax). The feed's parsed items are NOT directly at `&#123;&#123;variableName&#125;&#125;` -  they're nested under a feed-shape-dependent array key you loop over with the custom `each` helper:   - feedType "rss-xml" that turns out to be RSS: `&#123;&#123;#each &lt;variableName&gt;.item&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is the literal word "item", singular)   - feedType "rss-xml" that turns out to be Atom: `&#123;&#123;#each &lt;variableName&gt;.entry&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is "entry")   - feedType "json": the array key is whatever field the source JSON actually uses for its list (e.g. "items", "articles") - inspect the feed's JSON to find it, it is not fixed. Inside the loop, each item's own fields are whatever the feed provides (e.g. RSS gives `&#123;&#123;this.title&#125;&#125;`, `&#123;&#123;this.link&#125;&#125;`, `&#123;&#123;this.pubDate&#125;&#125;`) - there is no fixed schema, it mirrors the feed's actual content one-to-one. |
| `feeds[].maxItems` | integer |  | Informational only - NOT enforced when the email is sent. To actually limit how many items render, pass limit (and optionally skip) as hash arguments on the each tag itself, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;`. |
| `feeds[].required` | boolean |  |  |
| `feeds[].availableFields` | array of string |  | Informational only, for the app UI - not enforced or used when rendering. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single transactional email

`GET /v1/projectId/{projectId}/transactional-emails/{id}`

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
| 404 | Transactional Emails not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `senderIdentity` | string |  |  |
| `replyTo` | string |  |  |
| `type` | string (chamaileon \| html \| text) |  |  |
| `feeds` | array of object |  |  |
| `feeds[].url` | string | yes |  |
| `feeds[].feedType` | string (rss-xml \| json) | yes | "rss-xml" covers both RSS and Atom XML feeds - which one it actually is gets auto-detected from the feed content itself, which changes the array key inside the template (see variableName below). |
| `feeds[].variableName` | string | yes | No spaces allowed. This becomes a top-level Handlebars variable in the document (see the `document` field on  the parent email for the templating syntax). The feed's parsed items are NOT directly at `&#123;&#123;variableName&#125;&#125;` -  they're nested under a feed-shape-dependent array key you loop over with the custom `each` helper:   - feedType "rss-xml" that turns out to be RSS: `&#123;&#123;#each &lt;variableName&gt;.item&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is the literal word "item", singular)   - feedType "rss-xml" that turns out to be Atom: `&#123;&#123;#each &lt;variableName&gt;.entry&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is "entry")   - feedType "json": the array key is whatever field the source JSON actually uses for its list (e.g. "items", "articles") - inspect the feed's JSON to find it, it is not fixed. Inside the loop, each item's own fields are whatever the feed provides (e.g. RSS gives `&#123;&#123;this.title&#125;&#125;`, `&#123;&#123;this.link&#125;&#125;`, `&#123;&#123;this.pubDate&#125;&#125;`) - there is no fixed schema, it mirrors the feed's actual content one-to-one. |
| `feeds[].maxItems` | integer |  | Informational only - NOT enforced when the email is sent. To actually limit how many items render, pass limit (and optionally skip) as hash arguments on the each tag itself, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;`. |
| `feeds[].required` | boolean |  |  |
| `feeds[].availableFields` | array of string |  | Informational only, for the app UI - not enforced or used when rendering. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Partially update a transactional email

`PATCH /v1/projectId/{projectId}/transactional-emails/{id}`

Merges the given fields into the existing document - omitted fields are left unchanged. Nothing is required (unlike create) since every field is optional on a partial update.

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
| `subject` | string |  |  |
| `previewText` | string |  | Optional, but meaningfully affects open rates - if the user hasn't given you one, ask what they'd like it to say rather than leaving it blank. |
| `senderIdentity` | string |  | A sender identity _id. If the user hasn't told you which one to use, call GET /v1/projectId/&#123;projectId&#125;/sender-identities first and ask them to choose from the real email addresses returned - don't ask them for a raw ID. |
| `replyTo` | string |  |  |
| `type` | string (html \| text) |  | Omit to keep using the visual (Chamaileon) editor document. Set to "html" or "text" to author document as a raw Handlebars template string instead (see the document field). |
| `document` | any |  | The email content. When type is omitted, this is opaque Chamaileon visual-editor JSON - not meant to be hand-authored.  When type is "html" or "text", this is a plain string rendered with Handlebars at send time, and can use merge tags:   - `&#123;&#123;contact.email&#125;&#125;`, `&#123;&#123;contact.name&#125;&#125;`, and `&#123;&#123;contact.&lt;yourCustomFieldName&gt;&#125;&#125;` for any field from GET /v1/projectId/&#123;projectId&#125;/contacts/fields.   - `&#123;&#123;unsubscribeLink&#125;&#125;` and `&#123;&#123;pauseSubscriptionLink&#125;&#125;` - available for campaign/triggered/automation emails (subscriber-list-bound), NOT for transactional emails.   - Any feed's variableName (see the feeds field) as a loop, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;...&#123;&#123;this.title&#125;&#125;...&#123;&#123;/each&#125;&#125;`.   - Standard `&#123;&#123;#if&#125;&#125;`/`&#123;&#123;#unless&#125;&#125;`, plus custom helpers AND, OR, NOT, EQ, INCLUDES, CAPITALIZE, TRUNCATE, DEFAULT, usable like `&#123;&#123;#if (EQ contact.plan "pro")&#125;&#125;...&#123;&#123;/if&#125;&#125;`. For transactional/triggered sends, whatever object is passed as `data` on POST /v1/projectId/&#123;projectId&#125;/send-transactional or /v1/projectId/&#123;projectId&#125;/send-triggered is merged directly into the TOP LEVEL of the template context (not nested under a "data" key) - so sending `data: &#123; "orderId": 123 &#125;` makes `&#123;&#123;orderId&#125;&#125;` available, not `&#123;&#123;data.orderId&#125;&#125;`. |
| `feeds` | array of object |  | RSS/Atom/JSON feeds to pull into this email - see variableName on each feed for how to reference it from document. |
| `feeds[].url` | string |  |  |
| `feeds[].feedType` | string (rss-xml \| json) |  | "rss-xml" covers both RSS and Atom XML feeds - which one it actually is gets auto-detected from the feed content itself, which changes the array key inside the template (see variableName below). |
| `feeds[].variableName` | string |  | No spaces allowed. This becomes a top-level Handlebars variable in the document (see the `document` field on  the parent email for the templating syntax). The feed's parsed items are NOT directly at `&#123;&#123;variableName&#125;&#125;` -  they're nested under a feed-shape-dependent array key you loop over with the custom `each` helper:   - feedType "rss-xml" that turns out to be RSS: `&#123;&#123;#each &lt;variableName&gt;.item&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is the literal word "item", singular)   - feedType "rss-xml" that turns out to be Atom: `&#123;&#123;#each &lt;variableName&gt;.entry&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is "entry")   - feedType "json": the array key is whatever field the source JSON actually uses for its list (e.g. "items", "articles") - inspect the feed's JSON to find it, it is not fixed. Inside the loop, each item's own fields are whatever the feed provides (e.g. RSS gives `&#123;&#123;this.title&#125;&#125;`, `&#123;&#123;this.link&#125;&#125;`, `&#123;&#123;this.pubDate&#125;&#125;`) - there is no fixed schema, it mirrors the feed's actual content one-to-one. |
| `feeds[].maxItems` | integer |  | Informational only - NOT enforced when the email is sent. To actually limit how many items render, pass limit (and optionally skip) as hash arguments on the each tag itself, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;`. |
| `feeds[].required` | boolean |  |  |
| `feeds[].availableFields` | array of string |  | Informational only, for the app UI - not enforced or used when rendering. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Transactional Emails not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `senderIdentity` | string |  |  |
| `replyTo` | string |  |  |
| `type` | string (chamaileon \| html \| text) |  |  |
| `feeds` | array of object |  |  |
| `feeds[].url` | string | yes |  |
| `feeds[].feedType` | string (rss-xml \| json) | yes | "rss-xml" covers both RSS and Atom XML feeds - which one it actually is gets auto-detected from the feed content itself, which changes the array key inside the template (see variableName below). |
| `feeds[].variableName` | string | yes | No spaces allowed. This becomes a top-level Handlebars variable in the document (see the `document` field on  the parent email for the templating syntax). The feed's parsed items are NOT directly at `&#123;&#123;variableName&#125;&#125;` -  they're nested under a feed-shape-dependent array key you loop over with the custom `each` helper:   - feedType "rss-xml" that turns out to be RSS: `&#123;&#123;#each &lt;variableName&gt;.item&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is the literal word "item", singular)   - feedType "rss-xml" that turns out to be Atom: `&#123;&#123;#each &lt;variableName&gt;.entry&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is "entry")   - feedType "json": the array key is whatever field the source JSON actually uses for its list (e.g. "items", "articles") - inspect the feed's JSON to find it, it is not fixed. Inside the loop, each item's own fields are whatever the feed provides (e.g. RSS gives `&#123;&#123;this.title&#125;&#125;`, `&#123;&#123;this.link&#125;&#125;`, `&#123;&#123;this.pubDate&#125;&#125;`) - there is no fixed schema, it mirrors the feed's actual content one-to-one. |
| `feeds[].maxItems` | integer |  | Informational only - NOT enforced when the email is sent. To actually limit how many items render, pass limit (and optionally skip) as hash arguments on the each tag itself, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;`. |
| `feeds[].required` | boolean |  |  |
| `feeds[].availableFields` | array of string |  | Informational only, for the app UI - not enforced or used when rendering. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a transactional email

`DELETE /v1/projectId/{projectId}/transactional-emails/{id}`

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
| 404 | Transactional Emails not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `senderIdentity` | string |  |  |
| `replyTo` | string |  |  |
| `type` | string (chamaileon \| html \| text) |  |  |
| `feeds` | array of object |  |  |
| `feeds[].url` | string | yes |  |
| `feeds[].feedType` | string (rss-xml \| json) | yes | "rss-xml" covers both RSS and Atom XML feeds - which one it actually is gets auto-detected from the feed content itself, which changes the array key inside the template (see variableName below). |
| `feeds[].variableName` | string | yes | No spaces allowed. This becomes a top-level Handlebars variable in the document (see the `document` field on  the parent email for the templating syntax). The feed's parsed items are NOT directly at `&#123;&#123;variableName&#125;&#125;` -  they're nested under a feed-shape-dependent array key you loop over with the custom `each` helper:   - feedType "rss-xml" that turns out to be RSS: `&#123;&#123;#each &lt;variableName&gt;.item&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is the literal word "item", singular)   - feedType "rss-xml" that turns out to be Atom: `&#123;&#123;#each &lt;variableName&gt;.entry&#125;&#125;...&#123;&#123;/each&#125;&#125;` (array key is "entry")   - feedType "json": the array key is whatever field the source JSON actually uses for its list (e.g. "items", "articles") - inspect the feed's JSON to find it, it is not fixed. Inside the loop, each item's own fields are whatever the feed provides (e.g. RSS gives `&#123;&#123;this.title&#125;&#125;`, `&#123;&#123;this.link&#125;&#125;`, `&#123;&#123;this.pubDate&#125;&#125;`) - there is no fixed schema, it mirrors the feed's actual content one-to-one. |
| `feeds[].maxItems` | integer |  | Informational only - NOT enforced when the email is sent. To actually limit how many items render, pass limit (and optionally skip) as hash arguments on the each tag itself, e.g. `&#123;&#123;#each news.item limit=5 skip=0&#125;&#125;`. |
| `feeds[].required` | boolean |  |  |
| `feeds[].availableFields` | array of string |  | Informational only, for the app UI - not enforced or used when rendering. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get stats for a single transactional email

`GET /v1/projectId/{projectId}/transactional-emails/{id}/stats`

Aggregate counts only, never a per-recipient list - response size and query cost are bounded regardless of how much activity actually happened, since every count is a single indexed query scoped to this one resource. For the actual list of recipients (who received/opened/clicked/bounced/unsubscribed), see GET /v1/projectId/&#123;projectId&#125;/transactional-emails/&#123;id&#125;/recipients.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The transactional email _id. |
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
| 404 | Transactional Emails not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `opens` | integer |  | Total open events (a single recipient opening twice counts twice). |
| `clicks` | integer |  | Total click events. |
| `uniqueOpens` | integer |  | Number of distinct dispatched emails with at least one open. |
| `uniqueClicks` | integer |  | Number of distinct dispatched emails with at least one click. |
| `sent` | integer |  |  |
| `failed` | integer |  |  |
| `bounce` | integer |  |  |
| `complaint` | integer |  |  |

</div>

## List recipients of a single transactional email

`GET /v1/projectId/{projectId}/transactional-emails/{id}/recipients`

One row per actual recipient - who received it, how many times they opened/clicked, and whether they bounced/complained/unsubscribed/paused/subscribed/resubscribed as a result of this specific send. Supports the usual filter[&lt;field&gt;] exact-match filtering (e.g. filter[unsubscribed]=true, filter[status]=failed), plus two convenience filters not tied to a literal field: filter[opened]=true/false and filter[clicked]=true/false.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The transactional email _id. |
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
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Transactional Emails not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | array |  |  |
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |

</div>
