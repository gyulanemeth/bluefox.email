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

The **Zapier integration** allows you to automate your email workflows by connecting BlueFox Email with thousands of apps available on the Zapier platform. This integration enables you to streamline processes such as managing contacts, sending emails, and handling subscriptions without any coding knowledge just create your Zapier accounts and start automating.

:::info Quick Note
For Zapier related documents and support, please refer to the official Zapier documentation and support channels. This document focuses on the integration aspects specific to BlueFox Email.
:::

## Authentication

To authenticate your BlueFox Email account in Zapier, you will need your BlueFox Email project API key and project ID. Follow these steps:

1. In the Zaps setup, when prompted for account connection either for triggers or actions, click on "Accounts".

![screenshot of connecting bluefox email account in zapier](./zapier-connect-account.webp)

2. Here select connect a new account.

3. A pop-up window will appear asking for your BlueFox Email project API key and project ID.

![screenshot of bluefox email api key and project id in zapier](./zapier-api-key-project-id.webp)

4. In your BlueFox Email Project Settings, navigate to the bottom of the page to find Zapier Integration section where you can copy your project API key and project ID.

![screenshot of bluefox email api key in project settings](./zapier-api-key-in-project-settings.webp)

7. Enter the project API key and project ID in that Zapier pop-up window from earlier, then click "Yes, Continue to BlueFox Email" to authorize Zapier to access your BlueFox Email project.

And thats it! Your BlueFox Email account is now connected to Zapier, and you can start creating Zaps using BlueFox Email triggers and actions. Lets explore the available triggers and actions.

## Available Triggers and Actions

### Triggers

Click on triggers to see the available options.
![screenshot of bluefox email triggers in zapier](./zapier-triggers.webp)

- **New Contact**: Triggered when a new contact is added to your project.
- **Contact Updated**: Triggered when an existing contact is updated in your project.
- **Contact Deleted**: Triggered when a contact is removed from your project.
- **New Subscription**: Triggered when a new contact subscribes to a subscription list.
- **Unsubscription**: Triggered when a contact unsubscribes from a subscription list.
- **Subscription Paused**: Triggered when a contact's subscription is paused.

Once you select a trigger, click "Continue" to set up and test the trigger.

Here once you select subscription based trigger and click continue you will be asked to select the subscription list for which you want to set up the trigger.

![screenshot of bluefox email subscription list selection in zapier](./zapier-subscription-list-selection.webp)

Hit continue and test the trigger.

### Actions
Click on actions to see the available options.
![screenshot of bluefox email actions in zapier](./zapier-actions.webp)

- **Send Transactional Email**: Send a transactional email to a specified contact.
- **Send Triggered Email**: Send a triggered email based on specific events.
- **Create Contact**: Add a new contact in your project.
- **Update Contact**: Update an existing contact's details in your project.
- **Delete Contact**: Remove a contact from your project.
- **Subscribe Email**: Subscribe a contact to a specific subscription list.
- **Unsubscribe Contact**: Unsubscribe a contact from a specific subscription list.
- **Pause Subscription**: Pause a contact's subscription to a subscription list.


### Send Transactional Email
Click on "Send Transactional Email" action to set it up. Here you can send a transactional email to a specified contact. You will need to provide email as mandatory and custom properties that you have in your project these are optional though.

![screenshot of bluefox email send transactional email action in zapier](./zapier-send-transactional-email-action.webp)

### Send Triggered Email
Click on "Send Triggered Email" action to set it up. Here you can send a triggered email based on specific events. You will need to provide email as mandatory and custom properties that you have in your project.

![screenshot of bluefox email send triggered email action in zapier](./zapier-send-triggered-email-action.webp)

### Create Contact and Update Contact

In these actions, you will be asked to provide contact details email being mandatory and other custom properties that you have in your project.
![screenshot of bluefox email add contact action in zapier](./zapier-add-contact-action.webp)

### Delete Contact
In this action, you will be asked to provide the contact email to delete the contact from your project.

![screenshot of bluefox email delete contact action in zapier](./zapier-delete-contact-action.webp)

### Subscribe Contact to List and Unsubscribe Contact from List

In these actions, you will be asked to provide the contact email and select the subscription list.
![screenshot of bluefox email subscribe contact to list action in zapier](./zapier-subscribe-contact-to-list-action.webp)

### Pause Subscription
In this action, you will be asked to provide the contact email and select the subscription list to pause the subscription and also date until when to pause the subscription.

![screenshot of bluefox email pause subscription action in zapier](./zapier-pause-subscription-action.webp)

After setting up the action, click "Continue" to test it. If the test is successful, you can turn on your Zap to start automating your workflows.


### Additional Resources

- [BlueFox Email API Documentation](https://bluefox.email/docs/api)
- [Zapier Help Center](https://zapier.com/help)