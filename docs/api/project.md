---
title: "Project API Reference | bluefox.email documentation"
description: "Get and update BlueFox Email project settings over the REST API, including the sending status: sandbox, production, or BYO AWS SES."
head:
  - - meta
    - name: description
      content: "Get and update BlueFox Email project settings over the REST API, including the sending status: sandbox, production, or BYO AWS SES."
  - - meta
    - property: og:title
      content: "Project API Reference | bluefox.email documentation"
  - - meta
    - property: og:description
      content: "Get and update BlueFox Email project settings over the REST API, including the sending status: sandbox, production, or BYO AWS SES."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: "https://bluefox.email/docs/api/project"
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Project API Reference | bluefox.email documentation"
  - - meta
    - name: twitter:description
      content: "Get and update BlueFox Email project settings over the REST API, including the sending status: sandbox, production, or BYO AWS SES."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Project

Use the **Project** endpoints to read a project's settings, including its sending status, and to update them. The same settings are editable in the app under [Project Settings](/docs/projects/settings). See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.

## Get project settings

`GET /v1/projectId/{projectId}`

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
| `_id` | string |  |  |
| `name` | string |  |  |
| `logoUrl` | string |  |  |
| `customSubscriptionPreferencesUrl` | string |  | A subscriber-facing page you host yourself for managing subscription preferences. When set, unsubscribe and pause links in emails point here (with a token query param appended) instead of bluefox.email's default page. Stored and returned with a real http:// or https:// scheme - an explicit one you send is kept exactly as given (e.g. "http://localhost:3000/preferences" for local testing), otherwise https is assumed. |
| `designSystemId` | string |  |  |
| `status` | string (sandbox \| production \| byoAwsSes) |  | New projects start as "sandbox". Sandbox recipients are not restricted, but sending is rate-limited to a  low daily cap (a 405 once exceeded, see GET .../sandbox/deliverability) and gets automatically restricted  (see the restricted field) if bounce/complaint rates run high. To leave sandbox for real production sending,  verify a domain and POST .../production-access - approval is manual, see the Production Access endpoints below. |
| `restricted` | boolean |  | Read-only - set automatically (high bounce/complaint rates) or by bluefox.email staff, never by this API.  A restricted, non-byoAwsSes project cannot send at all, regardless of production-access status - applying for  or already having production access does not lift a restriction, since the restriction is on bluefox.email's  shared sending infrastructure specifically. The only way for a restricted project to resume sending is to  switch to BYO-AWS (PATCH .../projectId/&#123;projectId&#125; awsConfig + status: "byoAwsSes"), which uses the project's  own AWS account instead of the shared infrastructure. |
| `restrictedReason` | string |  | Read-only. Human-readable reason, present only when restricted is true. |
| `unengagedContactSegment` | object |  |  |
| `unengagedContactSegment.groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `unengagedContactSegment.groups[].conditions` | array of object |  |  |
| `unengagedContactSegment.groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `unengagedContactSegment.groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `unengagedContactSegment.groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `unengagedContactSegment.groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `awsConfig` | any |  |  |
| `monthlyLimit` | integer |  |  |
| `autoRemoveFromList` | any |  |  |
| `whiteList` | array of string |  | Domains (bare, e.g. "example.com" - no protocol) allowed to call certain endpoints (like the direct subscribe-to-list endpoint) straight from browser JavaScript, by Origin header, without an API key. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>

## Update project settings

`PATCH /v1/projectId/{projectId}`

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
| `name` | string |  |  |
| `logoUrl` | string |  | Pass an empty string to remove the logo. |
| `customSubscriptionPreferencesUrl` | string |  | A subscriber-facing page you host yourself for managing subscription preferences, used instead of bluefox.email's default page. Send with an explicit http:// or https:// scheme to have it kept exactly as given (e.g. "http://localhost:3000/preferences" for local testing) - otherwise https is assumed. Pass an empty string to revert to the default page. |
| `unengagedContactSegment` | object |  |  |
| `unengagedContactSegment.groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `unengagedContactSegment.groups[].conditions` | array of object |  |  |
| `unengagedContactSegment.groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `unengagedContactSegment.groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `unengagedContactSegment.groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `unengagedContactSegment.groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `awsConfig` | any |  |  |
| `status` | string (byoAwsSes) |  | Any other value is ignored - this can only be used to switch INTO byoAwsSes, not to set sandbox/production directly (those come from the production-access review flow). |
| `autoRemoveFromList` | any |  |  |
| `whiteList` | array of string |  | Replaces the whole list. Bare domains only (e.g. "example.com"), no protocol or path. |

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
| `_id` | string |  |  |
| `name` | string |  |  |
| `logoUrl` | string |  |  |
| `customSubscriptionPreferencesUrl` | string |  | A subscriber-facing page you host yourself for managing subscription preferences. When set, unsubscribe and pause links in emails point here (with a token query param appended) instead of bluefox.email's default page. Stored and returned with a real http:// or https:// scheme - an explicit one you send is kept exactly as given (e.g. "http://localhost:3000/preferences" for local testing), otherwise https is assumed. |
| `designSystemId` | string |  |  |
| `status` | string (sandbox \| production \| byoAwsSes) |  | New projects start as "sandbox". Sandbox recipients are not restricted, but sending is rate-limited to a  low daily cap (a 405 once exceeded, see GET .../sandbox/deliverability) and gets automatically restricted  (see the restricted field) if bounce/complaint rates run high. To leave sandbox for real production sending,  verify a domain and POST .../production-access - approval is manual, see the Production Access endpoints below. |
| `restricted` | boolean |  | Read-only - set automatically (high bounce/complaint rates) or by bluefox.email staff, never by this API.  A restricted, non-byoAwsSes project cannot send at all, regardless of production-access status - applying for  or already having production access does not lift a restriction, since the restriction is on bluefox.email's  shared sending infrastructure specifically. The only way for a restricted project to resume sending is to  switch to BYO-AWS (PATCH .../projectId/&#123;projectId&#125; awsConfig + status: "byoAwsSes"), which uses the project's  own AWS account instead of the shared infrastructure. |
| `restrictedReason` | string |  | Read-only. Human-readable reason, present only when restricted is true. |
| `unengagedContactSegment` | object |  |  |
| `unengagedContactSegment.groups` | array of object |  | OR-ed groups of AND-ed conditions - matches the segment builder in the app. |
| `unengagedContactSegment.groups[].conditions` | array of object |  |  |
| `unengagedContactSegment.groups[].conditions[].category` | string (contact-property \| engagement) |  |  |
| `unengagedContactSegment.groups[].conditions[].property` | string |  | A custom contact field name, or "createdAt". Required unless operator is "any" or a tag operator. |
| `unengagedContactSegment.groups[].conditions[].operator` | string (any \| equals \| does-not-equal \| contains \| does-not-contain \| is-empty \| is-not-empty \| is-true \| is-false \| greater-than \| greater-than-or-equal \| less-than \| less-than-or-equal \| has-tag \| does-not-have-tag \| opened \| not-opened \| clicked \| not-clicked \| received \| not-received \| date-equals \| date-before \| date-after \| date-in-last \| date-more-than) |  |  |
| `unengagedContactSegment.groups[].conditions[].value` | any |  | Type depends on operator/property - string, number, boolean, or date string. |
| `awsConfig` | any |  |  |
| `monthlyLimit` | integer |  |  |
| `autoRemoveFromList` | any |  |  |
| `whiteList` | array of string |  | Domains (bare, e.g. "example.com" - no protocol) allowed to call certain endpoints (like the direct subscribe-to-list endpoint) straight from browser JavaScript, by Origin header, without an API key. |
| `createdAt` | string |  |  |
| `updatedAt` | string |  |  |

</div>
