# Transactional Emails

Transactional emails are essential emails needed for basic functions like registration or password resets. For example, if a user wants to register with their email address or reset a forgotten password, an email must be sent.

Users **can't unsubscribe** from transactional emails because they are necessary. Also, **transactional emails are not associated with any subscriber lists**. They are sent directly to specific email addresses.

You can find the transactional emails of a project under the `Transactional Emails` tab.

![A screenshot of a project's transactional emails.](./project-transactionals.webp)

## Creating a Transactional Email

To create a new transactional email, click the `Create` button.

![A screenshot of a project's transactional emails - new button highlighted.](./project-transactionals-create-button.webp)

Next, select a template category defined in your project's design system.

![A screenshot of a project's transactional emails - create: select template category.](./project-transactionals-create-select-category.webp)

Then, choose a template to start from, also defined in your design system.

![A screenshot of a project's transactional emails - create: template selection.](./project-transactionals-create-select-template.webp)

Enter the name, subject line, and preview text for your email. You can [personalize](#transactional-email-personalization) these with [merge tags](#transactional-email-personalization)!

![A screenshot of a project's transactional emails - create: enter data.](./project-transactionals-create-subject.webp)

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

For more details, read our guide on [personalization with merge tags](/docs/personalization) and Handlebars.



## Advanced Settings

The **Advanced Settings** feature allows you to customize key email-sending options, such as configuring sender identities and reply-to addresses. 

You can access the **Advanced Settings** by clicking the gear icon:

![Advanced Settings Icon](./project-transactionals-advanced-settings-btn.webp)

For a detailed guide on using the **Advanced Settings**, refer to the [Advanced Settings Documentation](/docs/projects/settings.html#advanced-settings).

