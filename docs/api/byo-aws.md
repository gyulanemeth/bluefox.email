---
title: "BYO AWS API Reference | bluefox.email documentation"
description: "Every BYO AWS endpoint in the bluefox.email API: parameters, request body, and response schemas."
head:
  - - meta
    - name: description
      content: "Every BYO AWS endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:title
      content: "BYO AWS API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Every BYO AWS endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/byo-aws"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "BYO AWS API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Every BYO AWS endpoint in the bluefox.email API: parameters, request body, and response schemas."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# BYO AWS

Full reference for the **BYO AWS** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## Validate BYO-AWS credentials

`POST /v1/projectId/{projectId}/aws-check`

Checks credentials directly against SES - confirms they work, every sender identity is actually verified in SES, and the requested limit is within the account's max send rate. Does not persist anything - pair with PATCH /v1/projectId/&#123;projectId&#125; to save. Only relevant for BYO-AWS projects; calling this with nothing stored and no override fields will fail since there is nothing to check - that is not itself a sign anything is misconfigured, most projects simply do not use BYO-AWS. Use GET .../production-access for a project on bluefox.email's shared infrastructure instead.

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
| `roleArn` | string |  |  |
| `accessKeyId` | string |  |  |
| `secretAccessKey` | string |  |  |
| `region` | string |  |  |
| `limit` | integer |  |  |
| `senderIdentities` | array of object |  |  |
| `senderIdentities[]._id` | string |  |  |
| `senderIdentities[].name` | string |  |  |
| `senderIdentities[].email` | string |  |  |

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
| `success` | boolean |  |  |

</div>

## Get the BYO-AWS CloudFormation setup link

`GET /v1/projectId/{projectId}/cloudformation-link`

Generates (once, then reuses) the project's external ID and returns a CloudFormation quick-create link for the STS role bluefox.email needs to send through the project's own AWS account.

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
| `link` | string |  | CloudFormation quick-create URL for the STS role bluefox.email needs to send through this project's own AWS account. |

</div>
