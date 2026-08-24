---
title: "Production Access API Reference | bluefox.email documentation"
description: "Every Production Access endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every Production Access endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "Production Access API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every Production Access endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/production-access"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Production Access API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every Production Access endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Production Access

Full reference for the **Production Access** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## Get production access status

`GET /v1/projectId/{projectId}/production-access`

Combined view of the project's production-access request status and domain verification readiness.

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
| `requestStatus` | string (none \| pending \| approved \| declined \| revoked) |  | "none" means no request has been submitted yet. |
| `domainStatus` | string (none \| pending \| verified) |  |  |
| `verifiedDomain` | string |  | Empty string if none is verified yet. |
| `monthlyLimit` | integer |  |  |
| `sendingRates` | array of object |  |  |
| `sendingRates[].region` | string |  |  |
| `sendingRates[].ratePerSecond` | integer |  |  |
| `limitIncreases` | array |  |  |
| `restricted` | boolean |  | True if the project is currently blocked from sending on bluefox.email's shared infrastructure (see Project.restricted). Approval here does not lift a restriction - switch to BYO-AWS instead if this is true. |
| `restrictedReason` | string |  |  |

</div>

## Apply for production access

`POST /v1/projectId/{projectId}/production-access`

The standard way to move a project past sandbox limits while still sending through bluefox.email's shared infrastructure - no AWS account of its own required. (PATCH .../projectId/&#123;projectId&#125; awsConfig is the separate, less common path for a project that wants to send through its own AWS account instead.) Requires at least one domain with SPF, MX, and DKIM all verified (see the Domains endpoints) - resubmitting after a decline only requires DKIM to still be verified. Approval is manual and not part of this API.

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
| `volume` | integer | yes | Expected monthly sending volume. |
| `whyBluefox` | string | yes |  |
| `typeOfEmails` | string | yes |  |
| `contactsSource` | string | yes |  |
| `productDescription` | string | yes |  |
| `website` | string | yes |  |

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
| `status` | string (pending) |  |  |

</div>

## Request a sending-limit increase

`POST /v1/projectId/{projectId}/production-access/limit-increase`

Production projects only, and only once a production-access request already exists. Fails if a limit-increase is already pending.

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
| `monthlyLimit` | integer | yes | Must be higher than the project's current monthlyLimit, except 0 which is always accepted (used to reset/clear the limit). |
| `reason` | string | yes | At least 10 characters. |

</div>

### Responses

<div class="api-ref-table api-ref-table--responses">

| Status | Description |
| --- | --- |
| 200 | OK |
| 400 | Invalid request body or query - every violation found (missing/invalid/unexpected fields) is reported in one response, semicolon-separated, not just the first one hit. |
| 403 | Missing or invalid API key |

</div>

### Response body

<div class="api-ref-table api-ref-table--body">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `requestStatus` | string (none \| pending \| approved \| declined \| revoked) |  | "none" means no request has been submitted yet. |
| `domainStatus` | string (none \| pending \| verified) |  |  |
| `verifiedDomain` | string |  | Empty string if none is verified yet. |
| `monthlyLimit` | integer |  |  |
| `sendingRates` | array of object |  |  |
| `sendingRates[].region` | string |  |  |
| `sendingRates[].ratePerSecond` | integer |  |  |
| `limitIncreases` | array |  |  |
| `restricted` | boolean |  | True if the project is currently blocked from sending on bluefox.email's shared infrastructure (see Project.restricted). Approval here does not lift a restriction - switch to BYO-AWS instead if this is true. |
| `restrictedReason` | string |  |  |

</div>
