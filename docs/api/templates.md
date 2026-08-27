---
title: "Templates API Reference | bluefox.email documentation"
description: "Every Templates endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Templates endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Templates API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Templates endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/templates"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Templates API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Templates endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Templates

Full reference for the **Templates** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List templates

`GET /v1/projectId/{projectId}/templates`

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

## Create a template

`POST /v1/projectId/{projectId}/templates`

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
| `previewText` | string |  | On PATCH, pass an empty string to clear it. |
| `document` | any | yes | The template content document (Chamaileon JSON). |
| `tags` | array of string |  |  |
| `onProjectCreation` | string (do-nothing \| set-as-transactional \| set-as-triggered \| set-as-campaign) |  |  |

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
| `tags` | array of string |  |  |
| `onProjectCreation` | string (do-nothing \| set-as-transactional \| set-as-triggered \| set-as-campaign) |  |  |
| `usedVariables` | array of string |  |  |
| `usedComponents` | array of string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single template

`GET /v1/projectId/{projectId}/templates/{id}`

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
| 404 | Templates not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `tags` | array of string |  |  |
| `onProjectCreation` | string (do-nothing \| set-as-transactional \| set-as-triggered \| set-as-campaign) |  |  |
| `usedVariables` | array of string |  |  |
| `usedComponents` | array of string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Partially update a template

`PATCH /v1/projectId/{projectId}/templates/{id}`

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
| `previewText` | string |  | On PATCH, pass an empty string to clear it. |
| `document` | any |  | The template content document (Chamaileon JSON). |
| `tags` | array of string |  |  |
| `onProjectCreation` | string (do-nothing \| set-as-transactional \| set-as-triggered \| set-as-campaign) |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Templates not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `tags` | array of string |  |  |
| `onProjectCreation` | string (do-nothing \| set-as-transactional \| set-as-triggered \| set-as-campaign) |  |  |
| `usedVariables` | array of string |  |  |
| `usedComponents` | array of string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a template

`DELETE /v1/projectId/{projectId}/templates/{id}`

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
| 404 | Templates not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `subject` | string |  |  |
| `previewText` | string |  |  |
| `tags` | array of string |  |  |
| `onProjectCreation` | string (do-nothing \| set-as-transactional \| set-as-triggered \| set-as-campaign) |  |  |
| `usedVariables` | array of string |  |  |
| `usedComponents` | array of string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>
