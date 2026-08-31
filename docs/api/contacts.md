---
title: "Contacts API Reference | bluefox.email documentation"
description: "Every Contacts endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Contacts endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Contacts API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Contacts endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/contacts"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Contacts API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Contacts endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Contacts

Full reference for the **Contacts** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List custom contact fields

`GET /v1/projectId/{projectId}/contacts/fields`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |

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

## Create a custom contact field

`POST /v1/projectId/{projectId}/contacts/fields`

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
| `type` | string (string \| number \| boolean \| date) | yes |  |

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
| `name` | string | yes |  |
| `type` | string (string \| number \| boolean \| date) | yes |  |

</div>

## Delete a custom contact field

`DELETE /v1/projectId/{projectId}/contacts/fields/{name}`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `name` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | Deleted |
| 403 | Missing or invalid API key |
| 404 | Custom contact field not found |

</div>

## List contacts

`GET /v1/projectId/{projectId}/contacts`

Accepts an API key or a whitelisted Origin header.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `filter` | query | object |  | mongoose-crudl style filter object. |
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
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |

</div>

## Create a contact

`POST /v1/projectId/{projectId}/contacts`

Accepts an API key or a whitelisted Origin header (for client-side widget use).

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
| `name` | string |  |  |
| `tags` | array of string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a contact by email

`GET /v1/projectId/{projectId}/contacts/{email}`

Accepts an API key or a whitelisted Origin header.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `email` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Contact not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Update a contact

`PATCH /v1/projectId/{projectId}/contacts/{email}`

Accepts an API key or a whitelisted Origin header.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `email` | path | string | yes |  |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Contact not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a contact

`DELETE /v1/projectId/{projectId}/contacts/{email}`

Also removes the contact from every subscriber list. Accepts an API key or a whitelisted Origin header.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `email` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | Deleted |
| 403 | Missing or invalid API key |
| 404 | Contact not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## List contacts (legacy flat URL shape)

`GET /v1/contacts/{projectId}`

Legacy flat URL shape, kept for backward compatibility - identical behavior to GET /v1/projectId/&#123;projectId&#125;/contacts above.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `filter` | query | object |  | mongoose-crudl style filter object. |
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
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |

</div>

## Create a contact (legacy flat URL shape)

`POST /v1/contacts/{projectId}`

Legacy flat URL shape, kept for backward compatibility - identical behavior to POST /v1/projectId/&#123;projectId&#125;/contacts above. Accepts an API key or a whitelisted Origin header (for client-side widget use).

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
| `name` | string |  |  |
| `tags` | array of string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a contact by email (legacy flat URL shape)

`GET /v1/contacts/{projectId}/{email}`

Legacy flat URL shape, kept for backward compatibility - identical behavior to GET /v1/projectId/&#123;projectId&#125;/contacts/&#123;email&#125; above.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `email` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Contact not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Update a contact (legacy flat URL shape)

`PATCH /v1/contacts/{projectId}/{email}`

Legacy flat URL shape, kept for backward compatibility - identical behavior to PATCH /v1/projectId/&#123;projectId&#125;/contacts/&#123;email&#125; above. Accepts an API key or a whitelisted Origin header.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `email` | path | string | yes |  |

</div>

### Request body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Contact not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a contact (legacy flat URL shape)

`DELETE /v1/contacts/{projectId}/{email}`

Legacy flat URL shape, kept for backward compatibility - identical behavior to DELETE /v1/projectId/&#123;projectId&#125;/contacts/&#123;email&#125; above.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `email` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | Deleted |
| 403 | Missing or invalid API key |
| 404 | Contact not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `email` | string |  |  |
| `name` | string |  |  |
| `tags` | array of string |  |  |
| `_lists` | array of string |  | Names of subscriber lists this contact belongs to. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## List contacts

`GET /v1/projectId/{projectId}/contacts/tags`

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

## Create a contact

`POST /v1/projectId/{projectId}/contacts/tags`

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
| `value` | string | yes |  |

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
| `value` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single contact

`GET /v1/projectId/{projectId}/contacts/tags/{id}`

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
| 404 | Contacts not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `value` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Partially update a contact

`PATCH /v1/projectId/{projectId}/contacts/tags/{id}`

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
| `value` | string |  |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Contacts not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `value` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a contact

`DELETE /v1/projectId/{projectId}/contacts/tags/{id}`

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
| 404 | Contacts not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `value` | string |  |  |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Resend a double opt-in verification email

`POST /v1/projectId/{projectId}/subscriber-lists/{subscriberListId}/contacts/{email}/resend-verification-email`

Only works while the contact is still "unverified" on the given list, and only when double opt-in is enabled (either on the list, or on the signup form they originally used).

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `subscriberListId` | path | string | yes |  |
| `email` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Contact not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | boolean |  |  |

</div>
