---
title: Zapier | BlueFox Email documentation
description: Automate your email workflows by connecting BlueFox Email with thousands of apps through Zapier. Manage contacts, send emails, and handle subscriptions automatically.
head:
  - - meta
    - name: description
      content: Automate your email workflows by connecting BlueFox Email with thousands of apps through Zapier. Manage contacts, send emails, and handle subscriptions automatically.
  - - meta
    - property: og:title
      content: Zapier | BlueFox Email documentation
  - - meta
    - property: og:description
      content: Automate your email workflows by connecting BlueFox Email with thousands of apps through Zapier. Manage contacts, send emails, and handle subscriptions automatically.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/integrations/zapier
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Zapier | BlueFox Email documentation
  - - meta
    - name: twitter:description
      content: Automate your email workflows by connecting BlueFox Email with thousands of apps through Zapier. Manage contacts, send emails, and handle subscriptions automatically.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Zapier Integration with BlueFox Email

The **Zapier integration** allows you to automate your email workflows by connecting BlueFox Email with thousands of apps available on the Zapier platform. This integration enables you to streamline processes such as managing contacts, sending emails, and handling subscriptions without any coding.

Before you begin, ensure you have a Zapier account and access to your BlueFox Email API key from your [BlueFox Email project settings](https://bluefox.email/dashboard/settings) and project ID from the [BlueFox Email dashboard](https://bluefox.email/dashboard).

:::info Quick Note
For Zapier related documents and support, please refer to the official Zapier documentation and support channels. This document focuses on the integration aspects specific to BlueFox Email.
:::

## A short overview of Zapier

Zapier is a powerful automation platform that connects your favorite apps and services to automate repetitive tasks. With Zapier, you can create "Zaps" that consist of a trigger and one or more actions. When the trigger event occurs in one app, Zapier automatically performs the specified actions in other connected apps. This allows you to streamline workflows, save time, and reduce manual effort across various applications.

## Setting up the BlueFox Email Zapier Integration

To set up the BlueFox Email integration with Zapier, follow these steps:

1. **Log in to Zapier**: Go to [Zapier](https://zapier.com/) and log in to your account. If you don't have an account, sign up for a free one.

2. **Create a New Zap**: Click on the "Make a Zap" button to start creating a new Zap.

3. **Choose a BlueFox Email Trigger**: In the "Trigger" section, search for "BlueFox Email" and select it as the trigger app. Choose the desired trigger event (e.g., "Contact Created", "Contact Updated") and click "Continue".

4. **Connect Your BlueFox Email Account**: Click on "Sign in to BlueFox Email" and enter your BlueFox Email API key and project ID when prompted. Follow the instructions to authorize Zapier to access your BlueFox Email account.

5. **Set Up the Trigger**: Configure any additional settings required for the trigger event and click "Continue". Test the trigger to ensure it's working correctly.

6. **Choose an Action App**: In the "Action" section, search for BlueFox Email and select it as the action app. Choose the desired action event (e.g., "Send Transactional Email", "Unsubscribe contact") and click "Continue".

7. **Set Up the Action**: Configure the action by mapping the necessary fields using data from the trigger event. Click "Continue" when done.

8. **Test the Action**: Test the action to ensure it works as expected. If the test is successful, click "Turn on Zap" to activate your Zap.

And that's it! Your BlueFox Email integration with Zapier is now set up and ready to automate your email workflows. You can create additional Zaps to further enhance your email management processes.

## Authentication

To authenticate your BlueFox Email account in Zapier, you will need your BlueFox Email API key and project ID. Follow these steps:

1. In the Zaps setup, when prompted for account connection either for triggers or actions, click on "Accounts".

![screenshot of connecting bluefox email account in zapier](./zapier-connect-account.webp)

2. Here select connect a new account.

3. A pop-up will appear asking for your BlueFox Email API key and project ID. You can find your API key in your [BlueFox Email project settings](https://bluefox.email/dashboard/settings) and your project ID in the [BlueFox Email Contacts](https://bluefox.email/contacts).

![screenshot of bluefox email api key and project id in zapier](./zapier-api-key-project-id.webp)

4. Enter the API key and project ID, then click "Yes, Continue" to authorize Zapier to access your BlueFox Email account.

## Available Triggers and Actions

### Triggers

Click on triggers to see the available options.
![screenshot of bluefox email triggers in zapier](./zapier-triggers.webp)

- **Contact Created**: Triggered when a new contact is added to your BlueFox Email account.
- **Contact Updated**: Triggered when an existing contact is updated in your BlueFox Email account.
- **Contact Deleted**: Triggered when a contact is removed from your BlueFox Email account.

Once you select a trigger, click "Continue" to set up and test the trigger.

![screenshot of bluefox email actions in zapier](./zapier-trigger-test.webp)

- **New Subscription**: Triggered when a contact subscribes to a mailing list.
- **Unsubscription**: Triggered when a contact unsubscribes from a mailing list.
- **Subscription Paused**: Triggered when a contact's subscription is paused.

Here once you select subscription based trigger and click continue you will be asked to select the subscription list for which you want to set up the trigger.

![screenshot of bluefox email subscription list selection in zapier](./zapier-subscription-list-selection.webp)

Hit continue and test the trigger.

### Actions
Click on actions to see the available options.
![screenshot of bluefox email actions in zapier](./zapier-actions.webp)

- **Send Transactional Email**: Send a transactional email to a specified contact.
- **Send Triggered Email**: Send a triggered email based on specific events.

While working with these actions, you will be asked to map various fields.
![screenshot of bluefox email send transactional email action in zapier](./zapier-send-transactional-email-action.webp)

These fields will change for triggered email action.
![screenshot of bluefox email send triggered email action in zapier](./zapier-send-triggered-email-action.webp)

- **Add**: Add a new contact in your BlueFox Email account.
- **Update Contact**: Update an existing contact's details in your BlueFox Email account.
- **Delete Contact**: Remove a contact from your BlueFox Email account

In these actions, you will be asked to provide contact details like email and name.
![screenshot of bluefox email add contact action in zapier](./zapier-add-contact-action.webp)

- **Subscribe Contact to List**: Subscribe a contact to a specific mailing list.
- **Unsubscribe Contact from List**: Unsubscribe a contact from a specific mailing list.
- **Pause Contact Subscription**: Pause a contact's subscription to a mailing list.

In these actions, you will be asked to provide the contact email and select the subscription list.
![screenshot of bluefox email subscribe contact to list action in zapier](./zapier-subscribe-contact-to-list-action.webp)

### Additional Resources

- [BlueFox Email API Documentation](https://bluefox.email/docs/api)
- [Zapier Help Center](https://zapier.com/help)