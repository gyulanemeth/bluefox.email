---
title: "Gallery API Reference | bluefox.email documentation"
description: "Every Gallery endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Gallery endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Gallery API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Gallery endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/gallery"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Gallery API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Gallery endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Gallery

Full reference for the **Gallery** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List gallery folders

`GET /v1/projectId/{projectId}/gallery/folders`

Lists the folders directly inside a given folder. By default (parentFolderId omitted) this is the top level of the gallery as this project sees it: this project's own top-level folders, PLUS any account-wide shared folder (one with no project of its own, e.g. "Company Logos" - visible to and usable from every project in the account). The project's own top level has no folder entry of its own - the response's galleryName field carries its name (the project name). Pass parentFolderId to list a subfolder's contents instead, which can be inside either your own tree or a shared one - but never inside a different project's own private tree.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `parentFolderId` | query | string |  | A folder _id to list the children of. Omit to list the top-level folders. |
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
| 404 | Parent folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | array |  |  |
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |
| `galleryName` | string |  | The name of this project's own gallery space (kept in sync with the project name). The project's top level has no folder entry of its own, so this is how a caller knows which gallery the listing belongs to. |

</div>

## Create a gallery folder

`POST /v1/projectId/{projectId}/gallery/folders`

Defaults to creating the folder at the top level of this project's own tree. Pass parentFolderId (your own or an account-wide shared folder's id) to nest it there instead.

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
| `parentFolderId` | string |  | An existing folder _id to nest the new folder under - either one from this project's own tree, or an account-wide shared folder. Omit to create it at the top level of this project's own tree. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Parent folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `parentFolderId` | string |  | The parent folder's _id, or null if this folder is at the top level (either this project's own top level, or an account-wide shared folder itself). The project's own top level is implicit and has no id of its own - it is never returned as a folder, only referenced by omitting parentFolderId. A shared folder, in contrast, is returned as a normal folder with a real id. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single gallery folder

`GET /v1/projectId/{projectId}/gallery/folders/{id}`

Works for a folder anywhere in this project's own tree, or in an account-wide shared tree. 404s for a folder that belongs to a different project's own (non-shared) tree.

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
| 404 | Folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `parentFolderId` | string |  | The parent folder's _id, or null if this folder is at the top level (either this project's own top level, or an account-wide shared folder itself). The project's own top level is implicit and has no id of its own - it is never returned as a folder, only referenced by omitting parentFolderId. A shared folder, in contrast, is returned as a normal folder with a real id. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Rename a gallery folder

`PATCH /v1/projectId/{projectId}/gallery/folders/{id}`

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
| `name` | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `parentFolderId` | string |  | The parent folder's _id, or null if this folder is at the top level (either this project's own top level, or an account-wide shared folder itself). The project's own top level is implicit and has no id of its own - it is never returned as a folder, only referenced by omitting parentFolderId. A shared folder, in contrast, is returned as a normal folder with a real id. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a gallery folder

`DELETE /v1/projectId/{projectId}/gallery/folders/{id}`

Recursively deletes every subfolder and image nested inside it too (including their files in storage) - there is no separate confirmation step, this cannot be undone.

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
| 404 | Folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `parentFolderId` | string |  | The parent folder's _id, or null if this folder is at the top level (either this project's own top level, or an account-wide shared folder itself). The project's own top level is implicit and has no id of its own - it is never returned as a folder, only referenced by omitting parentFolderId. A shared folder, in contrast, is returned as a normal folder with a real id. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## List gallery images

`GET /v1/projectId/{projectId}/gallery/images`

Lists the images directly inside a given folder - by default the top level of this project's own gallery (whose name is in the response's galleryName field). Pass parentFolderId to list a subfolder's contents instead.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `parentFolderId` | query | string |  | A folder _id to list the images inside. Omit to list the top-level images. |
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
| 404 | Parent folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | array |  |  |
| `count` | integer |  | Total matching items across all pages, not just this page. |
| `next` | string |  | Full URL (path + query string) of the next page, or null if this is the last page. |
| `galleryName` | string |  | The name of this project's own gallery space (kept in sync with the project name). The project's top level has no folder entry of its own, so this is how a caller knows which gallery the listing belongs to. |

</div>

## Upload a gallery image

`POST /v1/projectId/{projectId}/gallery/images`

A multipart/form-data upload (not JSON like other create endpoints, since it carries a binary file). Allowed types: image/jpeg, image/png, image/gif - any other type 400s.

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
| 201 | Created |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Parent folder not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `url` | string |  |  |
| `parentFolderId` | string |  | The containing folder's _id, or null if the image is at the top level of this project's gallery. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Get a single gallery image

`GET /v1/projectId/{projectId}/gallery/images/{id}`

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
| 404 | Image not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `url` | string |  |  |
| `parentFolderId` | string |  | The containing folder's _id, or null if the image is at the top level of this project's gallery. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Rename a gallery image

`PATCH /v1/projectId/{projectId}/gallery/images/{id}`

Renames the image record only - does not replace the uploaded file itself. Upload a new image and delete the old one to replace the file.

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
| `name` | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |
| 404 | Image not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `url` | string |  |  |
| `parentFolderId` | string |  | The containing folder's _id, or null if the image is at the top level of this project's gallery. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Delete a gallery image

`DELETE /v1/projectId/{projectId}/gallery/images/{id}`

Also deletes the underlying file in storage - this cannot be undone.

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
| 404 | Image not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `name` | string |  |  |
| `url` | string |  |  |
| `parentFolderId` | string |  | The containing folder's _id, or null if the image is at the top level of this project's gallery. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>
