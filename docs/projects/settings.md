---
title: Project Settings | bluefox.email documentation
description: Learn how to configure project settings in bluefox.email, including AWS credentials, sender identities, bounce and complaint webhooks, and API keys.
head:
  - - meta
    - name: description
      content: Learn how to configure project settings in bluefox.email, including AWS credentials, sender identities, bounce and complaint webhooks, and API keys.
  - - meta
    - property: og:title
      content: Project Settings | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to configure project settings in bluefox.email, including AWS credentials, sender identities, bounce and complaint webhooks, and API keys.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/settings
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Project Settings | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to configure project settings in bluefox.email, including AWS credentials, sender identities, bounce and complaint webhooks, and API keys.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Project Settings

To enable all the functionality provided by bluefox.email, you need to fill in all the project settings. If you want to use different domains or sending emails for different environments (e.g., staging or production), create separate projects for each environment.

## Project Logo
Users can **add**, **update**, or **delete** a custom logo for their project. This logo will be displayed on the **subscription preferences page** and **double opt-in confirmation page success message** to provide branding consistency.

To manage the project logo:

- **Add or update**: Click upload, select an image, and save.

- **Delete**: Click remove logo and confirm.

![A screenshot of a project settings logo section.](./project-settings-project-logo.webp)

## Delivery Modes

Delivery modes determine how emails are sent from your project. So the default for every new project is **sandbox mode**. In this mode, you can start sending emails immediately but with some limitations. When you're ready for unrestricted sending, you can request to move your project to **production mode**. If you prefer to bring your own AWS SES account, you can do that too. 

For more details, see our [Delivery Modes documentation](/docs/projects/delivery-mode.md).

## Advanced Settings

The **Advanced Settings** feature, available in email cards for **Campaign**, **Transactional**, and **Triggered Emails**, allows you to customize key email-sending options, providing flexibility in managing sender identities and reply-to addresses.

![Advanced Settings](./project-settings-advanced-settings.webp)


### Sender Identity Selection

The **sender identity** field lets you choose the identity used to send the email. By default, the system automatically selects the **default identity**, but you can select another identity from the list of available options.


![Sender Identity Selection](./project-settings-advanced-settings-sender-identity.webp)


## Reply-To Email Address

The **reply-to email address** field allows you to specify where replies to your email should be sent.

![Reply-To Email Field](./project-settings-advanced-settings-reply-to.webp)

## API Keys

To work with our [API](/docs/api/) from the server side, create at least one API key.

Include our API keys in the `Authorization` header of your HTTP requests as a bearer token.

```
Authorization: Bearer <API_KEY>
```


For bounces and complaints, it is added as a query string.

Periodically rotate sensitive info like API keys for security reasons. We use different colors to indicate the age of the API key as a reminder:
- Green: less than a month old
- Yellow: 1-6 months old
- Red: more than 6 months old

![A screenshot of a project settings API keys section.](./project-settings-api-keys.webp)

::: danger Security Warning
Since an API key is very sensitive information, never use it in your frontend code. Always use it from your backend.
:::


## Domain Whitelist

The domain whitelist ensures that sign-up requests are only processed from authorized domains, enhancing security during the sign-up process. If your frontend is making requests, you must add its domain to the whitelist to authorize them.

::: info Security Note
  The domain whitelist applies only to frontend requests. If your requests are coming from a backend server, you should use **API keys** instead, as backend requests do not require domain whitelisting.
:::

- **To add a domain**: 
  Navigate to **project settings → domain whitelist**, click **create**, enter the `domain`, and save. This ensures that requests from the frontend are recognized and approved.
  ![A screenshot of a project settings domain whitelist section add domain.](./project-settings-domain-whitelist-create.webp)

- **To edit an existing domain**:
  Navigate to **project settings → domain whitelist**, locate the domain, and click on the edit icon. Make the necessary changes and save them.
  ![A screenshot of a project settings domain whitelist section edit domain.](./project-settings-domain-whitelist-edit.webp)

- **To delete a domain**: 
  Navigate to **project settings → domain whitelist**, find it in the domain whitelist, click the delete icon, and confirm the deletion. Once removed, any sign-up requests from that domain will no longer be authorized.
  ![A screenshot of a project settings domain whitelist section delete domain.](./project-settings-domain-whitelist-delete.webp)


## Contact Properties

Contact properties allow users to define custom attributes for contacts at the project level. These properties appear in the **contacts** table and can be filled when adding or editing a contact.

### Add new Property
To add a new property, navigate to **project settings → contact properties**, click **create**, enter the property `name` and `type`, then save. The property will be available in the contact management interface.

Each contact property includes:

- **Property Name**: The user-defined name.

- **API Name**: The system-generated name used when sending or retrieving data via API.

- **Type**: The data type of the property, which can be **string, boolean, date, or number**.

![A screenshot of a project settings contact properties section create property.](./project-settings-contact-properties-create.webp)

#### Reserved Properties
Some properties are reserved and cannot be created. These include `status`, `pausedUntil`, `email`, `accountId`, `projectId`, `customFields`, `contactId`, `subscriberListId`, `unsubscribeLink`, `pauseSubscriptionLink`.

### Delete Property
To delete a property, go to **project settings → contact properties**, locate the property in the table, and click the delete icon. Confirm the deletion, and the property will be removed from both the contacts table and the contact creation/editing interface.

![A screenshot of a project settings contact properties section delete property.](./project-settings-contact-properties-delete.webp)