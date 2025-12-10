---
title: Send Test Email | bluefox.email documentation
description: Learn how to send test emails in bluefox.email. Test your campaigns with individual contacts or subscriber lists before sending to your entire audience.
head:
  - - meta
    - name: description
      content: Learn how to send test emails in bluefox.email. Test your campaigns with individual contacts or subscriber lists before sending to your entire audience.
  - - meta
    - property: og:title
      content: Send Test Email | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to send test emails in bluefox.email. Test your campaigns with individual contacts or subscriber lists before sending to your entire audience.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/send-test-email
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Send Test Email | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to send test emails in bluefox.email. Test your campaigns with individual contacts or subscriber lists before sending to your entire audience.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Send Test Email

Before sending a campaign, triggered email, or transactional email to your entire audience, it's important to test it first. The send test email feature allows you to preview how your email will appear and verify that all personalization, links, and formatting are working correctly. You can send test emails to individual contacts or to an entire subscriber list, ensuring everything is perfect before hitting send.

## Why Test Emails Matter

Testing your emails before sending them to your full audience helps you:

- **Verify Content**: Ensure all text, images, and formatting display correctly across different email clients.
- **Check Personalization**: Confirm that merge tags and handlebars variables are rendering with actual data.
- **Test Links**: Validate that all links in your email are working and pointing to the correct destinations.
- **Review Layout**: Check how your email looks on different devices and screen sizes.
- **Catch Errors**: Identify and fix any spelling, grammar, or layout issues before they reach your audience.

## Accessing Send Test Email

You can access the send test email feature from your campaign, triggered email, or transactional email card. Look for the send test button or option in your email details.

![A screenshot of an email card with the send test button highlighted.](./project-send-test-email-button.webp)

## Sending a Test to an Individual Contact

To send a test email to a specific contact:

1. Click the **Send Test** button on your email card.
2. Select **Individual Contact** as the recipient type.
3. Enter the email address of the contact you want to test with.
4. Click **Send**.

The test email will be sent immediately to the specified email address. This is useful for testing emails with specific personalization data that exists in your system.

![A screenshot of the send test email dialog for individual contact.](./project-send-test-email-individual.webp)

::: info
When sending a test to an individual contact, if that contact exists in your system, bluefox.email will use their actual data for personalization. This allows you to see exactly how the email will appear with real subscriber information.
:::

## Sending a Test to a Subscriber List

To send a test email to an entire subscriber list:

1. Click the **Send Test** button on your email card.
2. Select **Subscriber List** as the recipient type.
3. Choose the subscriber list from the dropdown menu.
4. Click **Send**.

The test email will be sent to all active subscribers in the selected list. This is helpful when you want to verify how your email performs across multiple recipients and personalization scenarios.

![A screenshot of the send test email dialog for subscriber list.](./project-send-test-email-list.webp)

::: info
When sending a test to a subscriber list, only active subscribers will receive the email. Paused or unsubscribed contacts will not be included in the test send.
:::

## Testing with Personalization

When you send a test email, all personalization tags and variables are rendered with actual data. For example:

- For campaigns and triggered emails, merge tags like `{{subscriber.name}}` and `{{subscriber.email}}` will be replaced with the actual subscriber data.
- For transactional emails, any custom data you've defined in your merge tags will be used (if available in the test contact).

This allows you to verify that your personalization is working correctly and that the email content looks good with real data.

## Best Practices

- **Test Multiple Scenarios**: Send tests to different contacts or lists to ensure your email works across various personalization scenarios.
- **Check Different Email Clients**: While bluefox.email renders emails consistently, consider checking your test emails in different email clients (Gmail, Outlook, etc.) to ensure compatibility.
- **Review Before Campaigns**: Always send at least one test email before launching a campaign to catch any potential issues.
- **Test Links**: Click through the links in your test emails to ensure they're working correctly and tracking properly.
- **Verify Unsubscribe Links**: When testing campaigns or triggered emails, verify that unsubscribe and pause subscription links are functioning as expected.
