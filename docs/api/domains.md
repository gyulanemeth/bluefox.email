---
title: "Domains API Reference | bluefox.email documentation"
description: "Every Domains endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Domains endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Domains API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Domains endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/domains"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Domains API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Domains endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Domains

Full reference for the **Domains** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## List sending domains

`GET /v1/projectId/{projectId}/domains`

Not paginated - always returns every domain on the project (there are only ever a handful). Supports filter[&lt;field&gt;]=value exact-match filtering (e.g. filter[domain]=example.com) to look one up directly instead of scanning the full list.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `filter[&lt;field&gt;]` | query | string |  | Exact-match filter on a top-level field, e.g. filter[domain]=example.com or filter[region]=eu-north-1. Repeatable for multiple fields. |

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

## Add a sending domain

`POST /v1/projectId/{projectId}/domains`

Production-access projects only. Returns the required DNS records to add before the domain can send.

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
| `domain` | string | yes |  |
| `region` | string | yes |  |

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
| `domain` | string |  |  |
| `region` | string |  |  |
| `tenant` | object |  |  |
| `tenant.name` | string |  |  |
| `tenant.configurationSet` | string |  |  |
| `requiredDns` | object |  | DNS records (DKIM CNAMEs, SPF, MX, DMARC) the domain owner must add. |
| `observed` | object |  | Last-checked DNS verification state, per record. |
| `observed.spf` | object |  |  |
| `observed.spf.present` | boolean |  |  |
| `observed.spf.raw` | string |  |  |
| `observed.spf.checkedAt` | string |  |  |
| `observed.dmarc` | object |  |  |
| `observed.dmarc.present` | boolean |  |  |
| `observed.dmarc.raw` | string |  |  |
| `observed.dmarc.checkedAt` | string |  |  |
| `observed.mx` | object |  |  |
| `observed.mx.present` | boolean |  |  |
| `observed.mx.raw` | string |  |  |
| `observed.mx.checkedAt` | string |  |  |
| `observed.dkim` | object |  |  |
| `observed.dkim.selectors` | array of string |  |  |
| `observed.dkim.allOk` | boolean |  |  |
| `observed.dkim.checkedAt` | string |  |  |
| `observed.allOk` | boolean |  | True only when SPF, DMARC, MX, and DKIM are all present/verified. |

</div>

## Get a single domain

`GET /v1/projectId/{projectId}/domains/{domainId}`

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `domainId` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Domain not found |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `domain` | string |  |  |
| `region` | string |  |  |
| `tenant` | object |  |  |
| `tenant.name` | string |  |  |
| `tenant.configurationSet` | string |  |  |
| `requiredDns` | object |  | DNS records (DKIM CNAMEs, SPF, MX, DMARC) the domain owner must add. |
| `observed` | object |  | Last-checked DNS verification state, per record. |
| `observed.spf` | object |  |  |
| `observed.spf.present` | boolean |  |  |
| `observed.spf.raw` | string |  |  |
| `observed.spf.checkedAt` | string |  |  |
| `observed.dmarc` | object |  |  |
| `observed.dmarc.present` | boolean |  |  |
| `observed.dmarc.raw` | string |  |  |
| `observed.dmarc.checkedAt` | string |  |  |
| `observed.mx` | object |  |  |
| `observed.mx.present` | boolean |  |  |
| `observed.mx.raw` | string |  |  |
| `observed.mx.checkedAt` | string |  |  |
| `observed.dkim` | object |  |  |
| `observed.dkim.selectors` | array of string |  |  |
| `observed.dkim.allOk` | boolean |  |  |
| `observed.dkim.checkedAt` | string |  |  |
| `observed.allOk` | boolean |  | True only when SPF, DMARC, MX, and DKIM are all present/verified. |

</div>

## Remove a domain

`DELETE /v1/projectId/{projectId}/domains/{domainId}`

Fails while a sender identity still uses this domain/region.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `domainId` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | Deleted |
| 403 | Missing or invalid API key |
| 404 | Domain not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |

</div>

## Re-check DNS verification status for a domain

`POST /v1/projectId/{projectId}/domains/{domainId}/check`

Re-reads the DKIM/SPF/MX/DMARC DNS records for the domain. Auto-creates a default sender identity (no-reply@domain) the first time verification succeeds.

### Parameters

<div class="api-ref-table api-ref-table--params">

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectId` | path | string | yes | The project _id, found in the app under Project Settings. |
| `domainId` | path | string | yes |  |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 403 | Missing or invalid API key |
| 404 | Domain not found |
| 405 | The operation is blocked by a business rule (e.g. the resource is still in use) |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string |  |  |
| `domain` | string |  |  |
| `region` | string |  |  |
| `tenant` | object |  |  |
| `tenant.name` | string |  |  |
| `tenant.configurationSet` | string |  |  |
| `requiredDns` | object |  | DNS records (DKIM CNAMEs, SPF, MX, DMARC) the domain owner must add. |
| `observed` | object |  | Last-checked DNS verification state, per record. |
| `observed.spf` | object |  |  |
| `observed.spf.present` | boolean |  |  |
| `observed.spf.raw` | string |  |  |
| `observed.spf.checkedAt` | string |  |  |
| `observed.dmarc` | object |  |  |
| `observed.dmarc.present` | boolean |  |  |
| `observed.dmarc.raw` | string |  |  |
| `observed.dmarc.checkedAt` | string |  |  |
| `observed.mx` | object |  |  |
| `observed.mx.present` | boolean |  |  |
| `observed.mx.raw` | string |  |  |
| `observed.mx.checkedAt` | string |  |  |
| `observed.dkim` | object |  |  |
| `observed.dkim.selectors` | array of string |  |  |
| `observed.dkim.allOk` | boolean |  |  |
| `observed.dkim.checkedAt` | string |  |  |
| `observed.allOk` | boolean |  | True only when SPF, DMARC, MX, and DKIM are all present/verified. |

</div>
