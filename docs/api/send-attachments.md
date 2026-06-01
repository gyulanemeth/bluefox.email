---
title: Send Attachments | bluefox.email documentation
description: Learn how to send attachments using bluefox.email. Discover the attachment object structure, required fields, and example implementations.
faqs:
  - question: "Which email types support file attachments in BlueFox Email?"
    answer: "Attachments are supported for both transactional emails and triggered emails sent via the API. Each attachment is passed as an object in the attachments array of the request body."
  - question: "How do I format attachments in the API request?"
    answer: "Each attachment is an object with two required fields: fileName (the file name including extension, for example report.pdf) and content (the file content encoded as a Base64 string). Include the attachments array in the same request body as the email and transactionalId or triggeredId fields."
  - question: "Is there a time limit for how long attachments are cached?"
    answer: "Yes. Attachments are cached for 1 hour. If your email sending process is expected to take longer than one hour to complete, contact BlueFox Email support to arrange uninterrupted delivery."
  - question: "Can I send multiple attachments in a single email?"
    answer: "Yes. The attachments field is an array, so you can include as many attachment objects as needed in a single request. Each object requires its own fileName and Base64-encoded content."
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
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Send Attachments | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to send attachments using bluefox.email. Discover the attachment object structure, required fields, and example implementations.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Send Attachments

Attachments in **bluefox.email** allow you to include files in your emails. These files are specified as an array of objects, with each object representing a single attachment. Attachments can be used in both [transactional](/docs/api/send-transactional-email) and [triggered emails](/docs/api/send-triggered-email).

::: warning
Attachments are cached for **1 hour**. If your email sending process is expected to take longer than an hour, please contact our support team to ensure uninterrupted [delivery](/email-sending-concepts/deliverability).
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

```

## API Responses  

| Code | Name               | Message                                                                 | Description                                                    | JSON Response Example |
|------|--------------------|-------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------|
| 400  | `VALIDATION_ERROR` | Invalid attachments format. Ensure each attachment has a filename with an extension and content type base64. | Attachments must have valid filenames and be encoded in base64. | ```json { "status": 400, "error": { "name": "VALIDATION_ERROR", "message": "Invalid attachments format. Ensure each attachment has a filename with an extension and content type base64." } } ``` |
