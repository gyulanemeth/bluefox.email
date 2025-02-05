---
title: Send Triggered Email | bluefox.email documentation
description: Learn how to send triggered emails using the bluefox.email API. Follow the integration guide, use the provided code snippets, and personalize emails with merge tags.
head:
  - - meta
    - name: description
      content: Learn how to send triggered emails using the bluefox.email API. Follow the integration guide, use the provided code snippets, and personalize emails with merge tags.
  - - meta
    - property: og:title
      content: Send Triggered Email | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to send triggered emails using the bluefox.email API. Follow the integration guide, use the provided code snippets, and personalize emails with merge tags.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/api/send-triggered-email
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: twitter:card
      content: summary_large_image
  - - meta
    - property: twitter:title
      content: Send Triggered Email | bluefox.email documentation
  - - meta
    - property: twitter:description
      content: Learn how to send triggered emails using the bluefox.email API. Follow the integration guide, use the provided code snippets, and personalize emails with merge tags.
  - - meta
    - property: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Send Triggered Email
[Quick guide](/docs/projects/triggered-emails.html#triggered-email-integration)

To send a [triggered email](/docs/projects/triggered-emails), use the following URL pattern:

```
https://api.bluefox.email/v1/send-triggered
```

Replace the placeholders with your specific information:
- `##EMAIL_ID##`
- `##YOUR_API_KEY##`

You can find the required IDs by clicking the **Code Guide** button on a triggered email card:

![Screenshot of the highlighted code guide button on a triggered email card.](./triggered-code-guide-button.webp)

In the **Code Guide** dialog, these values are automatically filled in. If you copy the code snippets, make sure to replace `##YOUR_API_KEY##`.

![Screenshot of a code guide dialog for a triggered email](./triggered-code-guide-dialog.webp)

## Request Body
```json
{
  "emails": ["jon@doe.com"],
  "triggeredId": "##EMAIL_ID##",
  "data": {
    "example": "example merge tag value"
  },
  "attachments": [] // optional  
}
```

You can include personalization data (merge tags) in the `data` object. These tags are processed by [Handlebars](https://handlebarsjs.com/) when the email is sent.

## cURL Example
```bash
curl -X POST \
"https://api.bluefox.email/v1/send-triggered" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ##YOUR_API_KEY##" \
-d '{
  "emails": ["jon@doe.com"], // TODO: Change email addresses
  "triggeredId": "##EMAIL_ID##",
  "data": {
    // TODO: Add merge tag values
  }
}'
```

## JavaScript Example
```javascript
const url = 'https://api.bluefox.email/v1/send-triggered';

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ##YOUR_API_KEY##' // TODO: Replace ##YOUR_API_KEY##
  },
  body: JSON.stringify({
    emails: ['jon@doe.com'], // TODO: Change email address
    triggeredId: "##EMAIL_ID##",
    data: {
      // TODO: Add merge tag values
    }
  })
});
```

## PHP Example
```php
$apiKey = "##YOUR_API_KEY##";

$url = "https://api.bluefox.email/v1/send-triggered";

$emails = ["jon@doe.com"]; // TODO: Change email addresses
$triggeredId = "##EMAIL_ID##";
$data = [
  // TODO: Add merge tag values
];

$payload = json_encode([
  "emails" => $emails,
  "triggeredId" => $triggeredId,
  "data" => $data
]);

$options = [
  "http" => [
    "header"  => [
      "Content-Type: application/json",
      "Authorization: Bearer $apiKey"
    ],
    "method"  => "POST",
    "content" => $payload,
  ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
```
