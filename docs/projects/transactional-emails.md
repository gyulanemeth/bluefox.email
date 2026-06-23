---
title: Transactional Emails | bluefox.email documentation
description: Learn how to create and manage transactional emails in bluefox.email. Explore integration, personalization, and advanced settings for essential communications like password resets and registration emails.
faqs:
  - question: "What are transactional emails in BlueFox Email?"
    answer: "Transactional emails are one-to-one emails sent in response to a specific user action, such as account registration, password resets, order confirmations, or purchase receipts. They are sent via the API directly to a specific email address and are not tied to any subscriber list."
  - question: "Can subscribers unsubscribe from transactional emails?"
    answer: "No. Transactional emails cannot include an unsubscribe link and subscribers cannot opt out of them, because they are triggered by the recipient's own actions and are considered necessary communications. They are sent to any email address regardless of subscription status."
  - question: "How are transactional emails different from triggered emails?"
    answer: "Transactional emails are sent to any email address via the API and are not tied to subscriber lists. Triggered emails are also API-sent but are tied to a subscriber list and will only be delivered to active subscribers on that list. Triggered emails require an unsubscribe link; transactional emails do not."
  - question: "Can I send attachments with transactional emails?"
    answer: "Yes. Transactional emails sent via the API support file attachments encoded as Base64. Each attachment requires a file name and the Base64-encoded content included in the API request body."
head:
  - - meta
    - name: description
      content: Learn how to create and manage transactional emails in bluefox.email. Explore integration, personalization, and advanced settings for essential communications like password resets and registration emails.
  - - meta
    - property: og:title
      content: Transactional Emails | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to create and manage transactional emails in bluefox.email. Explore integration, personalization, and advanced settings for essential communications like password resets and registration emails.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/transactional-emails
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Transactional Emails | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to create and manage transactional emails in bluefox.email. Explore integration, personalization, and advanced settings for essential communications like password resets and registration emails.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Transactional Emails

Transactional emails are essential emails needed for basic functions like registration or password resets. For example, if a user wants to register with their email address or reset a forgotten password, an email must be sent.

Users **can't unsubscribe** from transactional emails because they are necessary. Also, **transactional emails are not associated with any subscriber lists**. They are sent directly to specific email addresses.

You can find the transactional emails of a project under the `Transactional Emails` tab.

![A screenshot of a project's transactional emails.](./project-transactionals-location.webp)

## Creating a Transactional Email

To create a new transactional email, click the `Create` button.

![A screenshot of a project's transactional emails - new button highlighted.](./project-transactionals-create-button.webp)

You can either paste a copied design, select a template from your design system, or start from scratch.

![A screenshot of a project's transactional emails - Copy and Past or Create from Scratch options.](./project-transactionals-options.webp)

Next (if starting from template), select a template category defined in your project's design system.

![A screenshot of a project's transactional emails - create: select template category.](./project-transactionals-create-select-category.webp)

You can also choose a pre-designed template:
![A screenshot of a project's transactional emails - create: select pre-designed template.](./project-transactionals-create-select-predesigned.webp)

Then, choose a template to start from, also defined in your design system. And then click Next.

![A screenshot of a project's transactional emails - create: template selection.](./project-transactionals-create-select-template.webp)

Enter the name, subject line, and preview text for your email. You can [personalize](#transactional-email-personalization) these with [merge tags](#transactional-email-personalization)!

![A screenshot of a project's transactional emails - create: enter data.](./project-transactionals-create-subject.webp)

::: info This form will appear as first step if you choose to start from scratch.
:::

After that, you will see a summary page. Click "Launch Editor".

![A screenshot of a project's transactional emails - create: summary.](./project-transactionals-create-summary.webp)

Finally, make changes in the drag-and-drop email editor:

![A screenshot of a project's transactional emails - create: edit.](./project-transactionals-create-editor.webp)

When you're done, click "Save & Close". You can make changes later as well.

## Transactional Email Integration

Every transactional email in bluefox.email has a unique URL for sending the email. Send an HTTP request to this endpoint. You can generate sample code in multiple programming languages by clicking this icon:

![A screenshot of a transactional email card, with the code button highlighted.](./project-transactionals-code-button.webp)

Copy the generated code to use it in your project:

![A screenshot of a transactional email's generated code, copy button highlighted.](./project-transactionals-code-dialog.webp)

::: danger Security Warning
Your bluefox.email API key is included in the request `Authorization` header. Never send these requests from your frontend!
:::

See our [API docs](/docs/api/) for more details.

## Transactional Email Personalization

You can personalize transactional emails with [handlebars](https://handlebarsjs.com/). The data you send to the transactional email's endpoint determines the available variables. For example, you can send a user's name:

```javascript
await fetch(yourEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
        email: 'joe@doe.com',
        transactionalId: 'EMAIL_ID',
        data: {
            name: 'Joe Doe'
        }
    })
})
```

You can use any handlebars variables in your email while editing. Click on the edit icon on the card:

![A screenshot of a transactional email card, edit button highlighted.](./project-transactionals-edit-button.webp)

Enter your variables with Handlebars syntax:

![A screenshot of a transactional email being edited, a merge tag is being added.](./project-transactionals-edit-merge-tag.webp)

You can also use merge tags in the email's `subject line` and `preview text`!

![A screenshot of a transactional email, with a merge tag being used in the subject and the preview text.](./project-transactionals-edit-subject-merge-tag.webp)

For more details, read our guide on [personalization with merge tags](/docs/email-personalization) and Handlebars.


## Transactional Email Statistics

Transactional emails are crucial for sending automated, one-to-one messages triggered by user actions, such as account registrations, order confirmations, and password resets. Tracking the performance of these emails is essential to ensure their effectiveness and timely delivery.

### Why Transactional Email Statistics Matter

Understanding how your transactional emails perform helps you:

- **Monitor Delivery Success**: Track delivery rates, opens, clicks, and bounces to ensure your emails reach your users.
- **Optimize Engagement**: By analyzing open rates and click-through rates, you can optimize your transactional email content and timing for better user engagement.
- **Identify Issues**: High bounce rates or low open rates could indicate deliverability issues, content problems, or poor list management, allowing you to take corrective action.
- **Improve Customer Experience**: Timely, well-performing transactional emails enhance the overall customer experience, increasing user satisfaction and retention.

### What Transactional Email Statistics Include

The transactional email statistics section includes the following key metrics:

- **Sent Emails**: Total number of transactional emails sent.
- **Opens**: Number of times the transactional emails were opened by recipients.
- **Unique Opens**: Number of individual recipients who opened your transactional emails (counts only one open per recipient).
- **Clicks**: Total number of clicks on links within the emails.
- **Unique Clicks**: Number of individual recipients who clicked on links within your transactional emails (counts only one click per recipient).
- **Bounces**: Number of emails that failed to be delivered.
- **Complaints**: Number of complaints (e.g., marked as spam).

By analyzing these metrics, you can ensure that your transactional email system is functioning properly and making the desired impact on your users.

You can access the **Transactional Email Statistics** by clicking the arrow icon:


![Advanced Settings Icon](./project-transactionals-stats-btn.webp)

For a detailed guide on using the **Transactional Email Statistics**, refer to the [Analatics Documentation](/docs/analytics).

## Data Feeds

Data feeds allow you to automatically pull in live content from external sources directly into your transactional email. This is useful when your email needs to include up-to-date content (such as recommended articles, product highlights, or status info) without manually updating the template.

::: tip
For a full guide on using feeds inside the template (loops, merge tags, dynamic images, required behavior), see the [Data Feeds documentation](/docs/projects/data-feeds).
:::

Supported feed types:
- **RSS / Atom XML**
- **JSON**

### Adding a Feed

To add a feed, locate the **Feeds** section on your email card, just below the Details section. Click the **+ Add Feed** button.

![A screenshot of a transactional email card with the Feeds section and Add Feed button highlighted.](./project-transactionals-feeds-add-button.webp)

This will expand a form where you can configure your feed:

![A screenshot of the Add Feed form expanded on a transactional email card.](./project-transactionals-feeds-form.webp)

Fill in the following fields:

- **Feed URL**: The URL of the feed you want to pull content from.
- **Feed Type**: Select the type of feed — RSS / Atom XML or JSON.
- **Variable Name**: The name you'll use to reference this feed's data inside your email template using Handlebars syntax.
- **Max Items**: The maximum number of items to pull in from the feed (defaults to 5).

You can also check the **Required** checkbox if the feed must be available for the email to send.

Once you've filled in the details, click **Preview** to verify the feed is working correctly, then click **Save** to store your configuration.

::: tip
You can add multiple feeds to a single transactional email by clicking **+ Add Feed** again after saving the first one.
:::

## Editing Details of a Transactional Email

You can edit every key detail of the transactional email like subject, preview text, from identity, etc. by clicking the edit icon on the email card:

![A screenshot of a transactional email card, edit button highlighted.](./project-transactionals-edit-details-button.webp)

After you finish editing just click the save icon and your changes will be saved or if you want to discard them just click the close icon respectively.

![A screenshot of a transactional email being edited, save button highlighted.](./project-transactionals-edit-details-save-button.webp)

## Advanced Settings

The **Advanced Settings** in transactional email cards allows you to customize key email-sending options, providing flexibility in managing sender identities and reply-to addresses.

![Advanced Settings](./project-settings-advanced-settings.webp)

### Sender Identity Selection

The **sender identity** field lets you choose the identity used to send the email. By default, the system automatically selects the **default identity**, but you can select another identity from the list of available options.

![Sender Identity Selection](./project-settings-advanced-settings-sender-identity.webp)

### Reply-To Email Address

The **reply-to email address** field allows you to specify where replies to your email should be sent.

![Reply-To Email Field](./project-settings-advanced-settings-reply-to.webp)
