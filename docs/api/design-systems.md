---
title: "Design Systems API Reference | bluefox.email documentation"
description: "Every Design Systems endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Design Systems endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Design Systems API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Design Systems endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/design-systems"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Design Systems API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Design Systems endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Design Systems

Full reference for the **Design Systems** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List the project's design system (merged with its overrides)

`GET /v1/projectId/{projectId}/design-systems`

Always a single-item list (or empty) - the design system this project is currently using (project.designSystemId), merged with the project's overrides (designSystemParams). Kept as a list for consistency with other resources.

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

## Set or reset design system overrides for this project

`PATCH /v1/projectId/{projectId}/design-systems/{id}`

Batch operation: setOverrides upserts one or more variable/font/component overrides by name, resetOverrides removes them (falling back to the base design system value). id must be the project's own design system (project.designSystemId) - this endpoint cannot be used to switch a project to a different design system, even one belonging to the same account.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `id` | path | string | yes | The design system _id - must equal project.designSystemId. |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `setOverrides` | array of object |  |  |
| `setOverrides[].category` | string (variables \| font \| components) | yes |  |
| `setOverrides[].key` | string | yes | variables: colors\|fontStacks\|images\|links\|texts. font: resources\|stacks. components: buttons\|texts\|images\|dividers. |
| `setOverrides[].name` | string | yes |  |
| `setOverrides[].value` | any | yes | Any value - shape depends on category/key. |
| `setOverrides[].main` | boolean |  |  |
| `setOverrides[].description` | string |  |  |
| `resetOverrides` | array of object |  |  |
| `resetOverrides[].category` | string (variables \| font \| components) | yes |  |
| `resetOverrides[].key` | string | yes |  |
| `resetOverrides[].name` | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Design system not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `variables` | object |  |  |
| `variables.colors` | array |  |  |
| `variables.fontStacks` | array |  |  |
| `variables.images` | array |  |  |
| `variables.links` | array |  |  |
| `variables.texts` | array |  |  |
| `font` | object |  |  |
| `font.resources` | array |  |  |
| `font.stacks` | array |  |  |
| `components` | object |  |  |
| `components.buttons` | array |  |  |
| `components.texts` | array |  |  |
| `components.images` | array |  |  |
| `components.dividers` | array |  |  |

</div>
