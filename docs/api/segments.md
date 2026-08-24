---
title: "Segments API Reference | bluefox.email documentation"
description: "Every Segments endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Segments endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Segments API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Segments endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/segments"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Segments API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Segments endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Segments

Full reference for the **Segments** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List segments

`GET /v1/projectId/{projectId}/segments`

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

## Create a segment

`POST /v1/projectId/{projectId}/segments`

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
| `groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `groups[].conditions` | array of object |  |  |
| `groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |

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
| `groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `groups[].conditions` | array of object |  |  |
| `groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single segment

`GET /v1/projectId/{projectId}/segments/{id}`

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
| 404 | Segments not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `groups[].conditions` | array of object |  |  |
| `groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Partially update a segment

`PATCH /v1/projectId/{projectId}/segments/{id}`

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
| `groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `groups[].conditions` | array of object |  |  |
| `groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Segments not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `groups[].conditions` | array of object |  |  |
| `groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a segment

`DELETE /v1/projectId/{projectId}/segments/{id}`

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
| 404 | Segments not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `groups[].conditions` | array of object |  |  |
| `groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>
