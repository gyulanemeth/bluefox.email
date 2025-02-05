---
title: Send Attachments | bluefox.email documentation
description: Learn how to send attachments using bluefox.email. Discover the attachment object structure, required fields, and example implementations.
head:
  - - meta
    - name: description
      content: Learn how to send attachments using bluefox.email. Discover the attachment object structure, required fields, and example implementations.
  - - meta
    - property: og:title
      content: Send Attachments | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to send attachments using bluefox.email. Discover the attachment object structure, required fields, and example implementations.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/api/send-attachments
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: twitter:card
      content: summary_large_image
  - - meta
    - property: twitter:title
      content: Send Attachments | bluefox.email documentation
  - - meta
    - property: twitter:description
      content: Learn how to send attachments using bluefox.email. Discover the attachment object structure, required fields, and example implementations.
  - - meta
    - property: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Send Attachments

Attachments in **bluefox.email** allow you to include files in your emails. These files are specified as an array of objects, with each object representing a single attachment. Attachments can be used in both [transactional](/docs/api/send-transactional-email) and [triggered emails](/docs/api/send-triggered-email).

::: warning
Attachments are cached for **1 hour**. If your email sending process is expected to take longer than an hour, please contact our support team to ensure uninterrupted delivery.
:::

## Attachment Object Structure

Each attachment object includes the following fields:

| Field      | Type   | Description                                                      | Required |
|------------|--------|------------------------------------------------------------------|----------|
| `fileName` | String | The name of the file, including the file extension (e.g., `report.pdf`). | Yes      |
| `content`  | String | The file content encoded in Base64 format.                      | Yes      |

## Example

Here’s an example of how to structure attachments:

```json
{
  "attachments": [
    {
      "fileName": "example.txt",
      "content": "Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh"
    }
  ]
}
