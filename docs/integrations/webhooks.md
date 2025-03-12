---
title: Webhooks | bluefox.email documentation
description: Learn how to configure and use webhooks with bluefox.email. Get real-time notifications about email events such as opens, clicks, bounces, and more.
head:
  - - meta
    - name: description
      content: Learn how to configure and use webhooks with bluefox.email. Get real-time notifications about email events such as opens, clicks, bounces, and more.
  - - meta
    - property: og:title
      content: Webhooks | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to configure and use webhooks with bluefox.email. Get real-time notifications about email events such as opens, clicks, bounces, and more.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/integrations/webhooks
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: twitter:card
      content: summary_large_image
  - - meta
    - property: twitter:title
      content: Webhooks | bluefox.email documentation
  - - meta
    - property: twitter:description
      content: Learn how to configure and use webhooks with bluefox.email. Get real-time notifications about email events such as opens, clicks, bounces, and more.
  - - meta
    - property: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Webhooks

Webhooks allow your application to receive real-time notifications about email events such as opens, clicks, bounces, complaints, and subscriptions. By setting up a webhook, you can integrate email event data directly into your application for better tracking and automation.

## Features of Webhooks
- **Real-Time Updates**: Receive immediate notifications about email events.
- **Customizable Events**: Choose the specific events you wish to track.
- **Secure Communication**: Verify incoming requests using a secret key to ensure they are from a trusted source.
- **Easy Integration**: Seamlessly integrate webhook notifications into your app.

## Steps to Add a Webhook

1. **Navigate to the Webhooks Section**  
   Go to your project settings and scroll down to the Webhooks section.

2. **Add Webhook URL**  
   Enter the URL where you want to receive event notifications. Ensure your endpoint can handle `POST` requests.

3. **Select Events**  
   Choose the events you want to monitor, such as email opens, clicks, or bounces.

4. **Save and Obtain the Secret Key**  
   After saving, a **secret key** will be displayed. Copy and securely store this key, as it will be used to verify webhook requests in your endpoint.

5. **Test Webhook**  
   Use the "Test Webhook" feature to simulate a webhook request and verify your setup.

6. **Start Receiving Notifications**  
   Your endpoint will now receive real-time `POST` requests with event details.

## Verifying Webhook Requests
Webhook requests are authenticated using an API key sent in the `Authorization` header in Bearer token format. You can select in the project settings which API key you want to send with the request. This API key is used to verify the authenticity of the request.

### Request Headers
- **`Authorization`**: Contains the API key in the format `Bearer your-secret-key`.

### Steps to Verify Requests

1. **Extract the apikey**  
   Retrieve the apikey from the `Authorization` header.

2. **Compare the Token**  
   Simply compare the apikey with your predefined apikey

   #### Javascript:
   ```javascript
   
   function verifyRequest(req) {
    const apiKey = 'your-webhook-selected-apikey' // Your predefined API key
    const reqApiKey = req.headers['Authorization']?.split(' ')[1]; // Extract the API key
    if (!reqApiKey) {
        throw new Error('Missing Authorization header');
    }
     return reqApiKey === validApiKey // Check if the provided API key matches the predefined one
   }
    verifyRequest(req)

    ```

    #### PHP:
    ```php

    function verifyRequest($headers) {
      $validApiKey = 'your-webhook-selected-apikey'; // Your predefined API key

      if (!isset($headers['Authorization'])) {
          throw new Exception('Missing Authorization header');
      }

      $apiKey = str_replace('Bearer ', '', $headers['Authorization']); // Extract the API key

      return $apiKey === $validApiKey; // Check if the provided API key matches the predefined one
    }

    verifyRequest($request);

    ```
4. **Respond to the Webhook**  
   If the request is valid, respond with a `200 OK` status code.
::: warning Zero downtime API key rotation.
 To ensure a smooth transition when switching to a new API key, compare the request against multiple keys to prevent downtime.

   Below is a JavaScript code snippet to verify webhook:
   
   #### Javascript:
   ```javascript
   
    function verifyRequest(req) {
      const validKeys = ['your-webhook-selected-apikey', 'apikey']; // List of valid keys
      const apiKey = req.headers['Authorization']?.split(' ')[1]; // Extract apiKey
      if (!apiKey) {
          throw new Error('Missing Authorization header');
      }
      return validKeys.includes(apiKey);
    }
      verifyRequest(req)
      
   ```
  #### PHP:
  ```php

    function verifyRequest($headers) {
      $validKeys = ['your-webhook-selected-apikey', 'apikey']; // List of valid keys

      if (!isset($headers['Authorization'])) {
          throw new Exception('Missing Authorization header');
      }

      $apiKey = str_replace('Bearer ', '', $headers['Authorization']); // Extract apiKey

      return in_array($apiKey, $validKeys, true);
    }

    verifyRequest($request);

  ```
:::

## Example Webhook Event Payloads

When the webhook is triggered, the body of the request will contain information about the event. Here's an example of the payload you might receive:

### Sent event
```json
{
  "type": "sent",
  "account": { "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "emailData": {
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "referer": "https://www.example.com/some-page",
  "ipAddress": "203.0.113.195",
}
```

### Failed event
```json
{
  "type": "failed",
  "account": { "_id": "accountId", "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "_id": "projectId", "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "emailData": {
    "_id": "emailId",
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
  "errors": ["error object"],
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "referer": "https://www.example.com/some-page",
  "ipAddress": "203.0.113.195",
}
```

### Click event
```json
{
  "type": "click",
  "account": { "_id": "accountId", "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "_id": "projectId", "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "emailData": {
    "_id": "emailId",
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "referer": "https://www.example.com/some-page",
  "ipAddress": "203.0.113.195",
  "blockPosition": "Block position e.g. 1",
  "blockName": "Block name e.g. Hero",
  "link": "https://www.example.com/btn-link"
}
```

### Open event
```json
{
  "type": "open",
  "account": { "_id": "accountId", "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "_id": "projectId", "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "emailData": {
    "_id": "emailId",
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "referer": "https://www.example.com/some-page",
  "ipAddress": "203.0.113.195",
}
```

### Bounce event
```json
{
  "type": "bounce",
  "account": { "_id": "accountId", "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "_id": "projectId", "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "emailData": {
    "_id": "emailId",
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "referer": "https://www.example.com/some-page",
  "ipAddress": "203.0.113.195",
}
```

### Complaint event
```json
{
  "type": "complaint",
  "account": { "_id": "accountId", "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "_id": "projectId", "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "emailData": {
    "_id": "emailId",
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "referer": "https://www.example.com/some-page",
  "ipAddress": "203.0.113.195",
}
```

### Subscription event
```json
{
"type": "pause-subscription, unsubscribe, subscribe' or resubscribe",
  "account": { "name": "Account name", "urlFriendlyName": "UrlFriendlyName" },
  "project": { "name": "Project name "},
  "createdAt": "2025-01-06T13:27:32.017Z",
  "subscription": {
    "_id": "subscriberId",
    "name": "Subscriber name",
    "email": "subscriber@gmail.com",
    "status": "e.g. unsubscribed, paused, active or unverified",
    "subscriberList": {
      "name": "SubscriberList name",
      "_id": "subscriberListId",
      "private": "e.g. true or false"
    }
  },
  "emailData": {
    "_id": "emailId",
    "sentAt": "2025-01-06T13:27:32.017Z",
    "to": "test@gmail.com",
    "type": "e.g. transactional, triggered or campaign",
    "subject": "This is bluefox.email webhook test"
  },
}
```
