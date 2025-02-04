# Send attachments

Attachments in **bluefox.email** allow you to include files in your emails. These files are specified as an array of objects, with each object representing a single attachment. Attachments can be used in both **transactional** and **triggered emails**.

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
```
