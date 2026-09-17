---
title: "Suppression List API Reference | bluefox.email documentation"
description: "List and add suppressed email addresses in a BlueFox Email project via the REST API, so they are never emailed again."
head:
  - - meta
    - name: description
      content: "List and add suppressed email addresses in a BlueFox Email project via the REST API, so they are never emailed again."
  - - meta
    - property: og:title
      content: "Suppression List API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "List and add suppressed email addresses in a BlueFox Email project via the REST API, so they are never emailed again."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/suppression-list"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Suppression List API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "List and add suppressed email addresses in a BlueFox Email project via the REST API, so they are never emailed again."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Suppression List

Addresses on the suppression list are never emailed, whatever list they are on. See [Suppression Lists](/docs/projects/suppression-list) for importing and exporting the list in the app. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List suppression list

`GET /v1/projectId/{projectId}/suppression-list`

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

## Create a suppression list

`POST /v1/projectId/{projectId}/suppression-list`

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
| `reason` | string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 409 | The resource already exists |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `reason` | string |  |  |
| `createdAt` | string |  |  |

</div>
