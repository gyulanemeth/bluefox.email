# Send triggered email

[Quick quide](/docs/projects/triggered-emails.html#triggered-email-integration)

To send a [triggered email](/docs/projects/triggered-emails),  use the following URL pattern:

```
https://api.bluefox.email/v1/send-triggered
```

Replace the placeholders with your specific information:
 - `##EMAIL_ID##`
 - `##YOUR_API_KEY##`

You can find the IDs to replace by clicking on the code guide button on a triggered email card:
![Screenshot of the highlighted code guide button on a triggered email card.](./triggered-code-guide-button.webp)

In the code guide dialog, these values are automatically filled in. If you copy the code snippets, you need to replace the `##YOUR_API_KEY##`.

![Screenshot of a code guide dialog of a triggered email](./triggered-code-guide-dialog.webp)

Request body:
```json
{
  "emails": ["jon@doe.com"],
  "triggeredId": "##EMAIL_ID##",
  "data": {
    "example": "example merge tag value"
  },
  "attachments": [] //optional  
}
```

You can include personalization data (merge tags) in the data object. These tags are processed by [Handlebars](https://handlebarsjs.com/) when sent.

**cUrl**:
```bash
curl -X POST \
"https://api.bluefox.email/v1/send-triggered" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ##YOUR_API_KEY##" \
-d '{
  "emails": ["jon@doe.com"], // TODO change email addresses
  "triggeredId": ##EMAIL_ID##,
  "data": {
    // TODO add the merge tags values
  }
}'
```

**Javascript**:
```javascript
const url = 'https://api.bluefox.email/v1/send-triggered'
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ##YOUR_API_KEY##' // TODO change YOUR_APIKEY
  },
  body: JSON.stringify({
    emails: ['jon@doe.com'], // TODO change email address
    triggeredId: "##EMAIL_ID##",
    data: {
    // TODO add the merge tags values
    }
  })
})
```

**PHP**:
```php
$apiKey = "##YOUR_API_KEY##";

$url = "https://api.bluefox.email/v1/send-triggered";

$emails = ["jon@doe.com"]; // TODO change email addresses
$triggeredId = "##EMAIL_ID##"
$data = [
  // TODO add the merge tags values
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
