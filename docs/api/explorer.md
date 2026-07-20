---
title: Interactive API Explorer | bluefox.email documentation
description: Browse every bluefox.email API endpoint, request/response schema, and example - generated live from our OpenAPI spec.
layout: page
sidebar: false
head:
  - - meta
    - name: description
      content: Browse every bluefox.email API endpoint, request/response schema, and example - generated live from our OpenAPI spec.
  - - meta
    - property: og:title
      content: Interactive API Explorer | bluefox.email documentation
  - - meta
    - property: og:description
      content: Browse every bluefox.email API endpoint, request/response schema, and example - generated live from our OpenAPI spec.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/api/explorer
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Interactive API Explorer | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Browse every bluefox.email API endpoint, request/response schema, and example - generated live from our OpenAPI spec.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

<div class="explorer-page">

# API Explorer

Pick a resource on the left to see just its endpoints. Generated live from the same <ApiSpecLink>OpenAPI spec</ApiSpecLink> AI agents use, so it's always in sync with the real API. See the [API Reference](/docs/api/reference) page for authentication, response format, and pagination.

<ClientOnly>
  <ApiExplorer />
</ClientOnly>

</div>

<style>
.explorer-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  color: var(--vp-c-text-1);
}

.explorer-page h1 {
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.explorer-page > p {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}
</style>
